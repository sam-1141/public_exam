<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StudentLeaderboardController extends Controller
{
    public function loadLeaderBoardPage()
    {
        $allExam = DB::table("live_exams")
            ->select('id', 'name', 'slug')
            ->get();

        return Inertia::render('Student/LeaderBoardPage/LeaderBoardPage', [
            'examsInfo' => $allExam,
        ]);
    }
}
