<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        
        // Validate examId if needed
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
        
        // Validate examId if needed
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

    
    public function loadViewExamDetails($examId)
    {
        return Inertia::render('Admin/Exam/ViewDetails',[
            'exam' => $examId, 
            
        ]);
    }
}
