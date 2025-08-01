<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LiveExamController extends Controller
{
    public function loadLiveExamPage()
    {
        return Inertia::render('Student/LiveExam/LiveExamPage');
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
}
