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
            ->where('student_exam_attendance.result_publish_time', '<', now())
            ->leftJoin('live_exams', 'student_exam_attendance.exam_id', '=', 'live_exams.id')
            ->leftJoin('course_exam', 'student_exam_attendance.exam_id', '=', 'course_exam.exam_id')
            ->groupBy(
                'student_exam_attendance.exam_type',
                'student_exam_attendance.exam_total_questions',
                'student_exam_attendance.exam_total_mark',
                'student_exam_attendance.student_total_mark',
                'student_exam_attendance.student_exam_start_time',
                'student_exam_attendance.student_exam_end_time',
                'student_exam_attendance.submit_time',
                'live_exams.name',
                'live_exams.slug',
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
                'live_exams.slug as liveExamSlug',
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
        $exam = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->firstOrFail('id');

        $studentExamsAttendance = DB::table('student_exam_attendance')
            ->where('student_exam_attendance.student_id', auth()->id())
            ->where('student_exam_attendance.exam_id', $exam->id)
            ->where('student_exam_attendance.result_publish_time', '<', now())
            ->join('live_exams', 'student_exam_attendance.exam_id', '=', 'live_exams.id')
            ->firstOrFail([
                'student_exam_attendance.exam_type as studentExamType',
                'student_exam_attendance.exam_total_questions as examTotalQuestions',
                'student_exam_attendance.total_correct_answers as totalCorrectAnswers',
                'student_exam_attendance.total_skipped_answers as totalSkippedAnswers',
                'student_exam_attendance.exam_total_mark as examTotalMarks',
                'student_exam_attendance.student_total_mark as studentTotalMarks',
                'student_exam_attendance.student_exam_start_time as studentExamAttendTime',
                'student_exam_attendance.student_exam_end_time as studentExamEndTime',
                'student_exam_attendance.submit_time as examSubmitTime',

                'live_exams.name as liveExamName',
                'live_exams.duration as liveExamDuration',
            ]);

        $questions = DB::table('questions')
            ->join('exam_question', 'questions.id', '=', 'exam_question.question_id')
            ->where('exam_question.exam_id', $exam->id)
            ->select('questions.*')
            ->get();

        $studentsExamAnswers = DB::table('sea_answer')
            ->where('student_id', auth()->id())
            ->where('exam_id', $exam->id)
            ->get();

        $info = [
            'studentExamsAttendance' => $studentExamsAttendance,
            'questions' => $questions,
            'studentsExamAnswers' => $studentsExamAnswers,
        ];

        return Inertia::render('Student/AnswerSheet/AnswerSheetPage', [
            'info' => $info,
        ]);
    }

    public function loadSingleExamLeaderBoardPage($examSlug)
    {
        return Inertia::render('Student/History/SingleExamLeaderboard', [
            'examSlug' => $examSlug,
        ]);
    }
}
