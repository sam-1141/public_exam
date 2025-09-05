<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function loadExamResults()
    {
        $allCourseInfo = DB::connection('Webapp')
            ->table('courses')
            ->get(['id','course_name', 'slug']);

        $exams = DB::table('live_exams')->get();

        return Inertia::render('Admin/Result/Result', [
            'coursesInfo' => $allCourseInfo,
            'exams' => $exams,
        ]);
    }

    public function loadExamResultsListByCourse($courseSlug)
    {
        $course = DB::connection('Webapp')
            ->table('courses')
            ->where('slug', $courseSlug)
            ->first(['id']);

        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
        }

        $examId = request()->query('exam_id');
        $studentId = request()->query('student_id');

        $query = DB::table('student_exam_attendance')
            ->join('live_exams', 'student_exam_attendance.exam_id', '=', 'live_exams.id')
            ->join('course_exam', 'course_exam.exam_id', '=', 'live_exams.id')
            ->where('course_exam.course_id', $course->id);

        if (!empty($examId)) {
            $query->where('student_exam_attendance.exam_id', $examId);
        }

        if (!empty($studentId)) {
            $query->where('student_exam_attendance.student_id', 'like', '%' . $studentId . '%');
        }

        $examResults = $query->select(
            'student_exam_attendance.student_id as studentId',
            'student_exam_attendance.exam_type as studentExamType',
            'student_exam_attendance.exam_total_questions as examTotalQuestions',
            'student_exam_attendance.exam_total_mark as examTotalMarks',
            'student_exam_attendance.student_total_mark as studentTotalMarks',
            'student_exam_attendance.student_exam_start_time as studentExamAttendTime',
            'student_exam_attendance.student_exam_end_time as studentExamEndTime',
            'student_exam_attendance.submit_time as examSubmitTime',

            'live_exams.id as examId',
            'live_exams.name as liveExamName',
            'live_exams.slug as liveExamSlug',
            'live_exams.duration as liveExamDuration',
        )->paginate(100);

        return response()->json([
            'course' => $course,
            'examResults' => $examResults,
        ]);
    }


    public function loadStudentAnswerSheetPage($studentId, $examSlug)
    {
        $exam = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->firstOrFail('id');

        $studentExamsAttendance = DB::table('student_exam_attendance')
            ->where('student_exam_attendance.student_id', $studentId)
            ->where('student_exam_attendance.exam_id', $exam->id)
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
                'student_exam_attendance.result_publish_time as resultPublishTime',


                'live_exams.name as liveExamName',
                'live_exams.duration as liveExamDuration',
            ]);

        $questions = DB::table('questions')
            ->join('exam_question', 'questions.id', '=', 'exam_question.question_id')
            ->where('exam_question.exam_id', $exam->id)
            ->select('questions.*')
            ->get();

        $studentsExamAnswers = DB::table('sea_answer')
            ->where('student_id', $studentId)
            ->where('exam_id', $exam->id)
            ->get();

        $info = [
            'studentExamsAttendance' => $studentExamsAttendance,
            'questions' => $questions,
            'studentsExamAnswers' => $studentsExamAnswers,
        ];

        return response()->json([
            'info' => $info,
        ], 200);
    }

    public function answerSheetReset($studentId, $examId)
    {
        try {
            DB::beginTransaction();

            $attendanceDeleted = DB::table('student_exam_attendance')
                ->where('student_id', $studentId)
                ->where('exam_id', $examId)
                ->delete();

            $answersDeleted = DB::table('sea_answer')
                ->where('student_id', $studentId)
                ->where('exam_id', $examId)
                ->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Answer sheet reset successfully.',
                'attendanceDeleted' => $attendanceDeleted,
                'answersDeleted' => $answersDeleted
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Could not reset answer sheet.'
            ], 500);
        }
    }
}
