<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TrialExamController extends Controller
{
    public function loadTrialExamPage()
    {
        return Inertia::render('Student/TrialExam/TrialExam');
    }
}
