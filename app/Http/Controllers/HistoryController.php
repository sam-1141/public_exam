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
            ->join('course_exam', 'student_exam_attendance.exam_id', '=', 'course_exam.exam_id')
            ->groupBy(
                'student_exam_attendance.exam_type',
                'student_exam_attendance.exam_total_questions',
                'student_exam_attendance.exam_total_mark',
                'student_exam_attendance.student_total_mark',
                'student_exam_attendance.student_exam_start_time',
                'student_exam_attendance.student_exam_end_time',
                'student_exam_attendance.submit_time',
                'live_exams.name',
                'live_exams.duration'
            )
            ->get([
                'student_exam_attendance.exam_type as studentExamType',
                'student_exam_attendance.exam_total_questions as examTotalQuestions',
                'student_exam_attendance.exam_total_mark as examTotalMarks',
                'student_exam_attendance.student_total_mark as studentTotalMarks',
                'student_exam_attendance.student_exam_start_time as studentExamAttendTime',
                'student_exam_attendance.student_exam_end_time as studentExamEndTime',
                'student_exam_attendance.submit_time as examSubmitTime',

                'live_exams.name as liveExamName',
                'live_exams.duration as liveExamDuration',

                DB::raw('GROUP_CONCAT(course_exam.course_id) as relatedCourseIds'),
            ]);

        return Inertia::render('Student/History/HistoryPage',
            [
                'courses' => $allCourseInfo,
                'examsInfo' => $studentExams,
            ]
        );
    }
    public function loadAnswerSheetPage($examSlug)
    {
        $examSlug = 'test-exam';

        $examId = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->firstOrFail('id');

//        dd($examId);

//        $studentExamsAttendance = DB::table('student_exam_attendance')
//            ->where('student_exam_attendance.student_id', auth()->id())
//            ->where('student_exam_attendance.exam_id', $examId)
//            // after dynamic this section uncomment this line
////            ->where('student_exam_attendance.result_publish_time', '<', now())
//            ->join('live_exams', 'student_exam_attendance.exam_id', '=', 'live_exams.id')
//            ->join('course_exam', 'student_exam_attendance.exam_id', '=', 'course_exam.exam_id')
//            ->groupBy(
//                'student_exam_attendance.exam_type',
//                'student_exam_attendance.exam_total_questions',
//                'student_exam_attendance.exam_total_mark',
//                'student_exam_attendance.student_total_mark',
//                'student_exam_attendance.student_exam_start_time',
//                'student_exam_attendance.student_exam_end_time',
//                'student_exam_attendance.submit_time',
//                'live_exams.name',
//                'live_exams.duration'
//            )
//            ->get([
//                'student_exam_attendance.exam_type as studentExamType',
//                'student_exam_attendance.exam_total_questions as examTotalQuestions',
//                'student_exam_attendance.exam_total_mark as examTotalMarks',
//                'student_exam_attendance.student_total_mark as studentTotalMarks',
//                'student_exam_attendance.student_exam_start_time as studentExamAttendTime',
//                'student_exam_attendance.student_exam_end_time as studentExamEndTime',
//                'student_exam_attendance.submit_time as examSubmitTime',
//
//                'live_exams.name as liveExamName',
//                'live_exams.duration as liveExamDuration',
//            ]);
//
//        dd($studentExamsAttendance);

        return Inertia::render('Student/AnswerSheet/AnswerSheetPage');
    }



    /* Admin- Exam Results */
    public function loadExamResults()
    {
        return Inertia::render('Admin/Result/Result');
    }
}
