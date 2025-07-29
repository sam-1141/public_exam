<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function loadLeaderBoardPage()
    {
        return Inertia::render('Student/LeaderBoardPage/LeaderBoardPage');
    }
}
