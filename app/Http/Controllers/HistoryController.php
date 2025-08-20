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

        $studentExams = DB::table('student_exam_attendance')
            ->where('student_exam_attendance.student_id', auth()->id())
            // after dynamic this section uncomment this line
//            ->where('student_exam_attendance.result_publish_time', '<', now())
            ->join('live_exams', 'student_exam_attendance.exam_id', '=', 'live_exams.id')
            ->get([
                'student_exam_attendance.exam_type as studentExamType',
                'student_exam_attendance.exam_total_questions as examTotalQuestions',
                'student_exam_attendance.exam_total_mark as examTotalMarks',
                'student_exam_attendance.student_total_mark as studentTotalMarks',

                'student_exam_attendance.student_exam_start_time as studentExamAttendTime',
                'student_exam_attendance.student_exam_end_time as studentExamEndTime',

                'live_exams.name as liveExamName',
                'live_exams.duration as liveExamDuration',
            ]);

        return Inertia::render('Student/History/HistoryPage',
            [
                'courses' => $allCourseInfo,
                'examsInfo' => $studentExams,
            ]
        );
    }
    public function loadAnswerSheetPage()
    {
        return Inertia::render('Student/AnswerSheet/AnswerSheetPage');
    }
}
