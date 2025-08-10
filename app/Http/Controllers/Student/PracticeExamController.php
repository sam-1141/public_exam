<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PracticeExamController extends Controller
{
    public function loadPracticeExamListPage()
    {
        return Inertia::render('Student/PracticeExam/PracticeExamListPage');
    }

    public function loadPracticeExamPage($examId)
    {
        return Inertia::render('Student/PracticeExam/PracticeExamPage', [
            'examId' => $examId,
        ]);
    }

    public function loadPracticeExamResult(Request $request, $exam)
    {
        $results = $request->input('results');
        $examName = $request->input('examName');
        $subject = $request->input('subject');
        $totalMarks = $request->input('totalMarks');
        $answers = $request->input('answers');

        return Inertia::render('Student/PracticeExam/PracticeExamResult', [
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
