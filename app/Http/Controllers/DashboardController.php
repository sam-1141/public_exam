<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
         if($user->role == 'admin') {
            return Inertia::render('Admin/Dashboard/Dashboard');
        }else {
             $userId = auth()->id();

             $permittedCourses = DB::connection('Webapp')
                 ->table('course_student')
                 ->where('student_id', $userId)
                 ->pluck('course_id')
                 ->toArray();

             $totalExam = DB::table('live_exams')
                 ->where('exam_type', 0)
                 ->whereIn('course_exam.course_id', $permittedCourses)
                 ->join('course_exam', 'live_exams.id', '=', 'course_exam.exam_id')
                 ->count();

             $totalAttended = DB::table('student_exam_attendance')
                 ->where('student_id', $userId)
                 ->count();

             $runningExams = DB::table('live_exams')
                 ->where('exam_type', 0)
                 ->where('start_time', '<', now())
                 ->where('end_time', '>', now())
                 ->whereIn('course_exam.course_id', $permittedCourses)
                 ->join('course_exam', 'live_exams.id', '=', 'course_exam.exam_id')
                 ->count();

             $upcomingExams = DB::table('live_exams')
                 ->where('exam_type', 0)
                 ->where('start_time', '>', now())
                 ->whereIn('course_exam.course_id', $permittedCourses)
                 ->join('course_exam', 'live_exams.id', '=', 'course_exam.exam_id')
                 ->count();

            return Inertia::render('Student/Dashboard/Dashboard', [
                'totalExam' => $totalExam,
                'totalAttended' => $totalAttended,
                'runningExams' => $runningExams,
                'upcomingExams' => $upcomingExams,
            ]);
        }
    }

    public function about()
    {
        return Inertia::render('About');
    }


}
