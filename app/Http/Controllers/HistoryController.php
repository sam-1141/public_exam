<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HistoryController extends Controller
{
    public function loadHistoryPage()
    {
        return Inertia::render('Student/History/HistoryPage');
    }
}
