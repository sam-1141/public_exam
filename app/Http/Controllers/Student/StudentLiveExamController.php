<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentLiveExamController extends Controller
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
}
