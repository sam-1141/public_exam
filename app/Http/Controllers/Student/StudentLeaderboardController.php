<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentLeaderboardController extends Controller
{
    public function loadLeaderBoardPage()
    {
        return Inertia::render('Student/LeaderBoardPage/LeaderBoardPage');
    }
}
