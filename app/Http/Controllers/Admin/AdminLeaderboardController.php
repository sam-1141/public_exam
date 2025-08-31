<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminLeaderboardController extends Controller
{
    public function loadAdminLeaderBoardPage()
    {
        $allExam = DB::table("live_exams")
            ->select('id', 'name', 'slug')
            ->get();

        return Inertia::render('Admin/LeaderBoard/Leaderboard', [
            'examsInfo' => $allExam,
        ]);
    }

    public function loadAdminLeaderBoardList($examSlug)
    {
        $examInfo = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->select('id', 'name', 'slug')
            ->first();

        $perPage = 10;
        $attendanceInfo = DB::connection('ExamDB')
            ->table('student_exam_attendance')
            ->join('ft_core.users as students', 'student_exam_attendance.student_id', '=', 'students.id')
            ->where('student_exam_attendance.exam_id', $examInfo->id)
            ->orderBy('student_exam_attendance.student_total_mark', 'desc')
            ->select(
                'student_exam_attendance.*',
                'students.name as student_name',
                'students.institute as student_institute',
            )
            ->paginate($perPage);

        // Serial number logic
        $serialStart = ($attendanceInfo->currentPage() - 1) * $attendanceInfo->perPage() + 1;

        // Add serial number to each item
        foreach ($attendanceInfo as $index => $item) {
            $item->serial = $serialStart + $index;
        }

        return response()->json([
            'examInfo' => $examInfo,
            'attendanceInfo' => $attendanceInfo,
        ]);
    }

    public function loadAdminLeaderBoardListForExcel($examSlug)
    {
        $examInfo = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->select('id', 'name', 'slug')
            ->first();

        $attendanceInfo = DB::connection('ExamDB')
            ->table('student_exam_attendance')
            ->join('ft_core.users as students', 'student_exam_attendance.student_id', '=', 'students.id')
            ->where('student_exam_attendance.exam_id', $examInfo->id)
            ->orderBy('student_exam_attendance.student_total_mark', 'desc')
            ->select(
                'student_exam_attendance.*',
                'students.name as student_name',
                'students.institute as student_institute',
            )
            ->get();

        // Add serial number to each item
        foreach ($attendanceInfo as $index => $item) {
            $item->serial = $index;
        }

        return response()->json([
            'examInfo' => $examInfo,
            'attendanceInfo' => $attendanceInfo,
        ]);
    }

}
