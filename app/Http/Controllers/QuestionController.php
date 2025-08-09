<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use App\Models\Topic;
use App\Models\Chapter;
use App\Models\Subject;
use App\Models\Hardness;
use App\Models\Question;
use App\Models\QuestionTag;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function addQuestions()
    {
        $classes = StudentClass::all();
        $subjects = Subject::all();
        $chapters = Chapter::all();
        return Inertia::render('Question/AddQuestion', ['classes' => $classes, 'subjects' => $subjects, 'chapters' => $chapters]);
    }

    public function create($class = null, $subject = null, $chapter = null)
    {
        $classesArr = StudentClass::where("id", $class)->first();
        $subjectArr = Subject::where("id", $subject)->first();
        $chapterArr = Chapter::where("id", $chapter)->first();
        $topics = Topic::where("chapter_id", $chapter)->get();
        $hardness = Hardness::all();
        $tags = Tag::all();
        // return $tags;
        return Inertia::render('Question/AddMcq', ['classes' => $classesArr, 'subject' => $subjectArr, 'chapter' => $chapterArr, 'topics' => $topics, 'hardness' => $hardness, 'tags' => $tags]);
    }

    public function store(Request $req)
    {
        $validatedData = $req->validate([
            'class_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'chapter_id' => 'required|integer',
            'topic_id' => 'nullable|integer', // Allow nullable topic
            'hardness_id' => 'integer|nullable',
            'tags' => 'array|nullable', // Allow nullable tags
            'question' => 'required|string',
            'options' => 'required|array',
            'explanation' => 'nullable|string',
        ]);

        // If hardness_id is empty, set it to "Easy"
        if (empty($validatedData['hardness_id'])) {
            $easyHardness = Hardness::where('name', 'Easy')->first();
            $validatedData['hardness_id'] = $easyHardness ? $easyHardness->id : null;
        }

        // Ensure topic_id is NULL if not selected
        $validatedData['topic_id'] = $validatedData['topic_id'] ?? null;

        $validatedData['options'] = json_encode($validatedData['options']);

        // Insert question into the database
        $question = Question::create([
            'class_id' => $validatedData['class_id'],
            'subject_id' => $validatedData['subject_id'],
            'chapter_id' => $validatedData['chapter_id'],
            'topic_id' => $validatedData['topic_id'],
            'hardness_id' => $validatedData['hardness_id'],
            'question' => $validatedData['question'],
            'options' => $validatedData['options'],
            'created_by' => Auth::id(),
            'explanation' => $validatedData['explanation'] ?? null,
        ]);

        // Insert tags only if they exist and are not empty
        if (!empty($validatedData['tags'])) {
            foreach ($validatedData['tags'] as $tagId) {
                if (!empty($tagId)) { // Ensure it's not an empty string
                    QuestionTag::create([
                        'question_id' => $question->id,
                        'tag_id' => $tagId,
                    ]);
                }
            }
        }

        return redirect()->route('page.add.mcq', [
            'class' => $validatedData['class_id'],
            'subject' => $validatedData['subject_id'],
            'chapter' => $validatedData['chapter_id'],
        ])->with('success', 'Question added successfully!');
    }

    public function mcqBank()
    {
        $questions = Question::with(['tags' => function ($q) {
            return $q->with('tag');
        }, 'class', 'subject', 'chapter', 'topic', 'hardness'])
            ->whereNull('deleted_at')
            ->get();

        $classes = StudentClass::all();
        $subjects = Subject::all();
        $chapters = Chapter::all();
        $topics = Topic::all();
        $hardness = Hardness::all();
        $tags = Tag::all();
        // return $questions;
        return Inertia::render('Question/McqBank', [
            'questions' => $questions,
            'classes' => $classes,
            'subjects' => $subjects,
            'chapters' => $chapters,
            'topics' => $topics,
            'hardness' => $hardness,
            'tags' => $tags
        ]);
    }


    // delete mcq
    public function deleteMcq($id)
    {
        try {
            // Find the question by ID
            $question = Question::find($id);

            $questions = Question::with([
                'tags' => function ($q) {
                    return $q->with('tag');
                },
                'class',
                'subject',
                'chapter',
                'topic',
                'hardness',
            ])
                ->whereNull('deleted_at')
                ->get();

            if (!$question) {
                return redirect()->route('mcq.bank', [
                    'questions' => $questions,
                ])->with('warning', 'Question not found!');
            }

            // Soft delete the question
            $question->delete();


            return redirect()->route('mcq.bank', [
                'questions' => $questions,
            ])->with('success', 'Question moved to trash!');
        } catch (\Exception $e) {
            // Return an error response
            return redirect()->route('mcq.bank')->with('error', 'An error occurred while deleting the question. Please try again.');
        }
    }

    public function editMcq($id)
    {
        // Find the question by ID
        $question = Question::with([
            'tags' => function ($q) {
                return $q->with('tag');
            },
            'class',
            'subject',
            'chapter',
            'topic',
            'hardness',
        ])->find($id);

        if (!$question) {
            return redirect()->route('mcq.bank')->with('warning', 'Question not found!');
        }
        // return $question;
        // Get all the classes
        $classes = StudentClass::all();

        // Get all the subjects
        $subjects = Subject::all();

        // Get all the chapters
        $chapters = Chapter::all();

        // Get all the topics
        $topics = Topic::all();

        // Get all the hardness levels
        $hardnesses = Hardness::all();

        // Get all the tags
        $tags = Tag::all();

        return Inertia::render('Question/EditMcq', [
            'question' => $question,
            'classes' => $classes,
            'subjects' => $subjects,
            'chapters' => $chapters,
            'topics' => $topics,
            'hardness' => $hardnesses,
            'tags' => $tags,
        ]);
    }

    public function updateMcq(Request $req, $questionId)
    {

        $validatedData = $req->validate([
            'class_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'chapter_id' => 'required|integer',
            'topic_id' => 'nullable|integer',
            'hardness_id' => 'integer|nullable',
            'tags' => 'array|nullable',
            'question' => 'required|string',
            'options' => 'required|array',
            'explanation' => 'nullable|string',
        ]);


        $question = Question::find($questionId);

        if (!$question) {
            return redirect()->back()->with('error', 'Question not found!');
        }

        // If hardness_id is empty, set it to "Easy"
        if (empty($validatedData['hardness_id'])) {
            $easyHardness = Hardness::where('name', 'Easy')->first();
            $validatedData['hardness_id'] = $easyHardness ? $easyHardness->id : null;
        }


        $validatedData['topic_id'] = $validatedData['topic_id'] ?? null;


        $validatedData['options'] = json_encode($validatedData['options']);

        // Update the question in the database
        $question->update([
            'class_id' => $validatedData['class_id'],
            'subject_id' => $validatedData['subject_id'],
            'chapter_id' => $validatedData['chapter_id'],
            'topic_id' => $validatedData['topic_id'],
            'hardness_id' => $validatedData['hardness_id'],
            'question' => $validatedData['question'],
            'options' => $validatedData['options'],
            'explanation' => $validatedData['explanation'] ?? null,
        ]);

        // Delete existing tags for the question
        QuestionTag::where('question_id', $question->id)->delete();

        // Insert new tags only if they exist and are not empty
        if (!empty($validatedData['tags'])) {
            foreach ($validatedData['tags'] as $tagId) {
                if (!empty($tagId)) {
                    QuestionTag::create([
                        'question_id' => $question->id,
                        'tag_id' => $tagId,
                    ]);
                }
            }
        }



        return redirect()->route('edit.mcq', [
            'id' => $question->id,
        ])->with('success', 'Question updated successfully!');
    }

    public function quickQuestion(Request $request)
    {
        $class = StudentClass::find($request->class);
        $subject = Subject::find($request->subject);

        if (!$class || !$subject) {
            return redirect()->route('add.questions')->with('error', 'Invalid class or subject selected.');
        }

        return Inertia::render('Question/QuickQuestion', [
            'classData' => $class,
            'subjectData' => $subject,
        ]);
    }

    public function storeQuickQuestion(Request $req)
    {
        $validatedData = $req->validate([
            // 'class_id' => 'required|integer|exists:student_classes,id',
            // 'subject_id' => 'required|integer|exists:subjects,id',
            'class_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'question' => 'required|string',
            'options' => 'required|array',
        ]);

        $validatedData['options'] = json_encode($validatedData['options']);

        Question::create([
            'class_id' => $validatedData['class_id'],
            'subject_id' => $validatedData['subject_id'],
            'question' => $validatedData['question'],
            'options' => $validatedData['options'],
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('page.quick.question', [
            'class' => $validatedData['class_id'],
            'subject' => $validatedData['subject_id'],
        ])->with('success', 'Quick question added successfully!');
    }
}
