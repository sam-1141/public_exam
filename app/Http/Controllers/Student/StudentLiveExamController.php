<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentLiveExamController extends Controller
{
    public function loadExamNoticePage()
    {
        $exam = DB::table('live_exams')->where('exam_type', 0)->get();
        return Inertia::render('Student/Exam/LiveExam/ExamNoticePage', [
            'allExam' => $exam,
        ]);
    }

    public function loadExamMainPage(Request $request)
    {
        $examSlug = $request->query('examSlug');
        $exam = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->firstOrFail();

        if (!$exam) {
            return redirect()->route('student.live.exam.notice');
        }

        $questions = DB::table('questions')
            ->join('exam_question', 'questions.id', '=', 'exam_question.question_id')
            ->where('exam_question.exam_id', $exam->id)
            ->select('questions.*')
            ->get();

        return Inertia::render('Student/Exam/LiveExam/ExamMainPage', [
            'exam' => $exam,
            'questions' => $questions,
        ]);
    }

    public function loadExamSuccessPage()
    {
        return Inertia::render('Student/Exam/LiveExam/ExamSuccessPage');
    }
}
