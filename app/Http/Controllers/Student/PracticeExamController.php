<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PracticeExamController extends Controller
{
    public function loadPracticeExamListPage()
    {
        $exam = DB::table('live_exams')->where('exam_type', 1)->get();

        return Inertia::render('Student/Exam/PracticeExam/PracticeExamListPage', [
            'allExam' => $exam,
        ]);
    }

    public function loadPracticeExamPage($examSlug)
    {

        $exam = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->firstOrFail();

        if (!$exam) {
            return redirect()->route('student.live.exam.list');
        }

        $questions = DB::table('questions')
            ->join('exam_question', 'questions.id', '=', 'exam_question.question_id')
            ->where('exam_question.exam_id', $exam->id)
            ->select('questions.*')
            ->get();

        return Inertia::render('Student/Exam/PracticeExam/PracticeExamPage', [
            'exam' => $exam,
            'questions' => $questions,
        ]);
    }

    public function loadPracticeExamResult(Request $request, $exam)
    {
        $results = $request->input('results');
        $examName = $request->input('examName');
        $subject = $request->input('subject');
        $totalMarks = $request->input('totalMarks');
        $answers = $request->input('answers');

        return Inertia::render('Student/Exam/PracticeExam/PracticeExamResult', [
            'submission' => [
            'examId' => $exam,
            'examName' => $request->input('examName'),
            'subject' => $request->input('subject'),
            'totalMarks' => $request->input('totalMarks'),
            'answers' => $request->input('answers'),
            'results' => $request->input('results'),
            'submittedAt' => now()->toISOString(),
            ]
        ]);
    }
}
