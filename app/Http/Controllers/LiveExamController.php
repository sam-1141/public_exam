<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LiveExamController extends Controller
{
    public function loadLiveExamPage()
    {
        return Inertia::render('Student/LiveExam/LiveExamPage');
    }
}
