<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\LiveExam;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class LiveExamController extends Controller
{
    public function create()
{
    $latestExam = LiveExam::latest()->first();

    return Inertia::render('Admin/LiveExams/Create', [
        'exam' => $latestExam
    ]);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'total_questions' => ['required', 'integer', 'min:1'],
            'has_negative_marks' => ['required', 'boolean'],
            'negative_marks_value' => ['nullable', 'numeric', 'min:0'],
            'total_marks' => ['nullable', 'integer', 'min:0'],
            'duration' => ['nullable', 'integer', 'min:1'],
            'start_time' => ['nullable', 'date'],
            'end_time' => ['nullable', 'date', 'after_or_equal:start_time'],
            'result_publish_time' => ['nullable', 'date'],
        ]);

        $validated['has_negative_marks'] = filter_var($validated['has_negative_marks'], FILTER_VALIDATE_BOOLEAN);


        LiveExam::create($validated);

        return redirect()
            ->route('admin.live-exams.create')
            ->with('success', 'Live exam created successfully.');
    }

    public function loadViewExamDetails()
    {
        $exam = LiveExam::latest()->first();

        // $courseExam = DB::table('course_exam')
        //     ->where('exam_id', $exam->id)
        //     ->pluck('course_id')
        //     ->toArray();

        // $courseInfo = DB::connection('Webapp')
        //     ->table('courses')
        //     ->whereIn('id', $courseExam)
        //     ->get(['id','course_name']);

        // $examSubject = DB::table('exam_subject')
        //     ->where('exam_id', $exam->id)
        //     ->pluck('subject_id')
        //     ->toArray();

        // $subjectInfo = DB::connection('CoreDB')
        //     ->table('subjects')
        //     ->whereIn('id', $examSubject)
        //     ->get(['id', 'name']);

        $questions = DB::table('questions')
    
    ->select('questions.*')
    ->get();
    

      

      

    

        return Inertia::render('Admin/Exam/ViewDetails', [
            'exam' => [
                'id' => $exam->id,
                'name' => $exam->name,
                // 'courseInfo' => $courseInfo,//
                // 'subjectInfo' => $subjectInfo,//
                'slug' => $exam->slug,//
                'description' => $exam->description,
                'totalQuestions' => $exam->total_questions,
                'hasNegativeMarks' => $exam->has_negative_marks,
                'negativeMarksValue' => $exam->negative_marks_value,
                'totalMarks' => $exam->total_marks,
                'duration' => $exam->duration,
                // 'questionType' => $exam->question_type,//
                // 'privacy' => $exam->privacy,//
                // 'publishInstant' => $exam->publish,//
                'startTime' => optional($exam->start_time)->format('Y-m-d H:i'),
                'endTime' => optional($exam->end_time)->format('Y-m-d H:i'),
                'resultPublishTime' => optional($exam->result_publish_time)->format('Y-m-d H:i'),
                // 'examUrl' => $exam->exam_url,//
                // 'exam_type' => $exam->exam_type,//
            ],
            'examType' => "live",
            'questions' => $questions,
        ]);
    }

    public function updateExamQuestion(Request $request, $id)
    {
        $data = $request->validate([
            'question'   => ['required', 'string'],
            'options'    => ['required', 'array'],
            'explanation'=> ['nullable', 'string'],
        ]);

        try {
            DB::table('questions')->where('id', $id)->update([
                'question'    => $data['question'],
                'options'     => json_encode($data['options']),
                'explanation' => $data['explanation'],
                'updated_at'  => now(),
            ]);

            return back()->with('success', 'Question updated.');
        } catch (\Throwable $e) {
            return back()->withErrors(['failed' => "Question couldn't be updated."]);
        }
    }


    public function storeExamQuestion(Request $request)
    {
        $data = $request->validate([
            'examId'             => ['required', 'integer'],
            'question'            => ['required', 'string'],
            'options'             => ['required', 'array'],
            'explanation'         => ['nullable', 'string'],
            'subject_name'        =>['nullable', 'string'],
        ]);
        // dd($data);
        // $data['subject_name']='ok';

        DB::beginTransaction();
        try {
            $questionId = DB::table('questions')->insertGetId([
                'subject_name'        =>$data['subject_name'],
                'question'    => $data['question'],
                'options'     => json_encode($data['options']),
                'explanation' => $data['explanation'],
                'created_by'  => auth()->id(),
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);

            // DB::table('exam_question')->insert([
            //     'exam_id'     => (int) $data['examId'],
            //     'question_id' => (int) $questionId,
            // ]);

            DB::commit();
            return back()->with('success', 'Question added.');
        } catch (\Throwable $e) {
            DB::rollBack();
            report($e);
            return back()->withErrors(['failed' => "Question couldn't be added."]);
        }
    }

    public function destroyExamQuestion($id)
    {
        DB::table('questions')->where('id', $id)->delete();

        return response()->json(['success' => true, 'message' => 'Question deleted successfully']);
    }
    public function reorderQuestions(Request $request)
    {
        $questions = $request->questions;

        if (!is_array($questions)) {
            return response()->json(['message' => 'Invalid payload format.'], 400);
        }

        foreach ($questions as $index => $question) {
            if (!isset($question['id'])) continue;

            DB::table('questions')
                ->where('id', $question['id'])
                ->update(['serial' => $index + 1]);
        }

        return response()->json(['message' => 'Serials updated successfully.']);
    }


}
