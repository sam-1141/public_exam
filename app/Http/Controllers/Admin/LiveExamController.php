<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LiveExam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LiveExamController extends Controller
{
    public function loadExamNoticePage()
    {
        return Inertia::render('Student/LiveExam/ExamNoticePage');
    }

    public function loadExamMainPage(Request $request)
    {
        $examId = $request->query('examId');

        if (!$examId) {
            return redirect()->route('student.live.exam.notice');
        }

        return Inertia::render('Student/LiveExam/ExamMainPage', [
            'examId' => $examId
        ]);
    }

    public function loadExamSuccessPage(Request $request)
    {
        $examId = $request->query('examId');

        if (!$examId) {
            return redirect()->route('student.live.exam.notice');
        }

        return Inertia::render('Student/LiveExam/ExamSuccessPage', [
            'examId' => $examId
        ]);
    }

    public function loadAddExamPage()
    {
        return Inertia::render('Admin/Exam/AddExam');
    }

    public function loadAddLiveExamPage()
    {
        return Inertia::render('Admin/Exam/LiveExam/LiveExam');
    }


    public function loadAddPracticeExamPage()
    {
        return Inertia::render('Admin/Exam/PracticeExam/PracticeExam');
    }


    public function loadViewExamDetails($type, $examId)
    {
        return Inertia::render('Admin/Exam/ViewDetails',[
            'exam' => $examId,
            'examType' => $type

        ]);
    }

    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'You must be logged in to create an exam.'
            ], 401);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'description' => 'nullable|string',
            'total_questions' => 'required|integer|min:1',
            'has_negative_marks' => 'boolean',
            'negative_marks_value' => 'nullable|numeric|min:0',
            'total_marks' => 'required|integer|min:1',
            'duration' => 'required|integer|min:1',
            'question_type' => 'nullable|in:random,shuffle',
            'privacy' => 'nullable|in:everyone,link',
            'publish_instant' => 'nullable|boolean',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);


        $slug = Str::slug($validated['name']);
        $examUrl = "https://demo.com/exams/{$slug}";

        $exam = new LiveExam();
        $exam->name = $request->name;
        $exam->slug = $slug;
        $exam->subject = $request->subject;
        $exam->description = $request->description;
        $exam->total_questions = $request->total_questions;
        $exam->has_negative_marks = $request->has_negative_marks ?? false;
        $exam->negative_marks_value = $request->negative_marks_value;
        $exam->total_marks = $request->total_marks;
        $exam->duration = $request->duration;
        $exam->question_type = $request->question_type;
        $exam->privacy = $request->privacy;
        $exam->publish_instant = $request->publish_instant ?? false;
        $exam->start_time = $request->start_time;
        $exam->end_time = $request->end_time;
        $exam->exam_url = $examUrl;
        $exam->created_by = Auth::id();
        $exam->save();

        return response()->json([
            'message' => 'Exam created successfully',
            'exam' => $exam
        ], 201);
    }

    public function showAllExam()
    {
        $exams = LiveExam::orderBy('created_at', 'desc')->get()->map(function ($exam) {
            return [
                'id' => $exam->id,
                'name' => $exam->name,
                'slug' => $exam->slug,
                'subject' => $exam->subject,
                'description' => $exam->description,
                'totalQuestions' => $exam->total_questions,
                'hasNegativeMarks' => $exam->has_negative_marks, // boolean
                'negativeMarksValue' => $exam->negative_marks_value,
                'totalMarks' => $exam->total_marks,
                'duration' => $exam->duration,
                'questionType' => $exam->question_type,
                'privacy' => $exam->privacy,
                'publishInstant' => $exam->publish_instant,
                'startTime' => $exam->start_time ? $exam->start_time->format('Y-m-d H:i') : null,
                'endTime' => $exam->end_time ? $exam->end_time->format('Y-m-d H:i') : null,
                'examUrl' => $exam->exam_url,
            ];
        });

        return response()->json(['exams' => $exams], 200);
    }

    public function getSingleExam($slug)
    {
        $exam = LiveExam::where('slug', $slug)->firstOrFail();
        return response()->json([
            'exam' => [
                'id' => $exam->id,
                'slug' => $exam->slug,
                'name' => $exam->name,
                'subject' => $exam->subject,
                'description' => $exam->description,
                'totalQuestions' => $exam->total_questions,
                'hasNegativeMarks' => $exam->has_negative_marks,
                'negativeMarksValue' => $exam->negative_marks_value,
                'totalMarks' => $exam->total_marks,
                'duration' => $exam->duration,
                'questionType' => $exam->question_type,
                'privacy' => $exam->privacy,
                'publishInstant' => $exam->publish_instant,
                'startTime' => $exam->start_time ? $exam->start_time->format('Y-m-d\TH:i') : null,
                'endTime' => $exam->end_time ? $exam->end_time->format('Y-m-d\TH:i') : null,
                'examUrl' => $exam->exam_url,
            ]
        ]);
    }

    public function updateExam(Request $request, $slug)
    {
        $exam = LiveExam::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'description' => 'nullable|string',
            'totalQuestions' => 'required|integer|min:1',
            'hasNegativeMarks' => 'boolean',
            'negativeMarksValue' => 'nullable|numeric|min:0',
            'totalMarks' => 'required|integer|min:1',
            'duration' => 'required|integer|min:1',
            'questionType' => 'nullable|in:random,shuffle',
            'privacy' => 'nullable|in:everyone,link',
            'publishInstant' => 'nullable|boolean',
            'startTime' => 'required|date',
            'endTime' => 'required|date|after:startTime',
        ]);

        $exam->name = $validated['name'];
        $exam->slug = \Str::slug($validated['name']);
        $exam->subject = $validated['subject'];
        $exam->description = $validated['description'];
        $exam->total_questions = $validated['totalQuestions'];
        $exam->has_negative_marks = $validated['hasNegativeMarks'];
        $exam->negative_marks_value = $validated['negativeMarksValue'];
        $exam->total_marks = $validated['totalMarks'];
        $exam->duration = $validated['duration'];
        $exam->question_type = $validated['questionType'];
        $exam->privacy = $validated['privacy'];
        $exam->publish_instant = $validated['publishInstant'];
        $exam->start_time = $validated['startTime'];
        $exam->end_time = $validated['endTime'];
        $exam->exam_url = "https://demo.com/exams/{$exam->slug}";
        $exam->save();

        return response()->json(['message' => 'Exam updated successfully']);
    }
}
