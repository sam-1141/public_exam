<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function loadHistoryPage()
    {
        $allCourseInfo = DB::connection('Webapp')
            ->table('courses')
            ->get(['id','course_name']);

//        $studentExams = DB::table('student_exam_attendance')
//            ->where('student_id', auth()->id())
//            ->where('student_exam_attendance.result_publish_time', '<', now())
//            ->join('live_exams', 'student_exam_attendance.exam_id', '=', 'live_exams.id')
//            ->get([
//                'student_exam_attendance.id as studentExamId',
//                'student_exam_attendance.exam_type as studentExamType',
//                'student_exam_attendance.name as studentExamName',
//                'student_exam_attendance.total_questions as studentExamTotalQuestions',
//                'student_exam_attendance.total_marks as studentExamTotalMarks',
//                'student_exam_attendance.duration as studentExamDuration',
//
//                'live_exams.id as liveExamId',
//                'live_exams.name as liveExamName',
//            ]);

        return Inertia::render('Student/History/HistoryPage',
            [
                'courses' => $allCourseInfo,
//                'exams' => $studentExams,
            ]
        );
    }
    public function loadAnswerSheetPage()
    {
        return Inertia::render('Student/AnswerSheet/AnswerSheetPage');
    }
}
