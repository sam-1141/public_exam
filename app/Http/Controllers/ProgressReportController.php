<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProgressReportController extends Controller
{
    public function loadProgressReport()
    {
        return Inertia::render('Student/ProgressReportPage/ProgressReportPage');
    }
}
