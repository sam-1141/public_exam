<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\LiveExam;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PracticeExamController extends Controller
{
    public function loadPracticeExamListPage()
    {
        $allCourseInfo = DB::connection('Webapp')
            ->table('courses')
            ->get(['id','course_name']);

        $exams = DB::table('live_exams')
            ->where(function ($query){
                $query->where('exam_type', 1)
                    ->orWhere('end_time', '<', now());
            })
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($exam) {
                $courseExam = DB::table('course_exam')
                    ->where('exam_id', $exam->id)
                    ->pluck('course_id')
                    ->toArray();

                $courseInfo = DB::connection('Webapp')
                    ->table('courses')
                    ->whereIn('id', $courseExam)
                    ->get(['id','course_name']);

                $examSubject = DB::table('exam_subject')
                    ->where('exam_id', $exam->id)
                    ->pluck('subject_id')
                    ->toArray();

                $subjectInfo = DB::connection('CoreDB')
                    ->table('subjects')
                    ->whereIn('id', $examSubject)
                    ->get(['id', 'name']);

                return [
                    'id' => $exam->id,
                    'name' => $exam->name,
                    'courseInfo' => $courseInfo,
                    'subjectInfo' => $subjectInfo,
                    'slug' => $exam->slug,
                    'description' => $exam->description,
                    'totalQuestions' => $exam->total_questions,
                    'hasNegativeMarks' => $exam->has_negative_marks,
                    'negativeMarksValue' => $exam->negative_marks_value,
                    'totalMarks' => $exam->total_marks,
                    'duration' => $exam->duration,
                    'questionType' => $exam->question_type,
                    'privacy' => $exam->privacy,
                    'publishInstant' => $exam->publish,
                    'startTime' => optional($exam->start_time)->format('Y-m-d H:i'),
                    'endTime'   => optional($exam->end_time)->format('Y-m-d H:i'),
                    'examUrl' => $exam->exam_url,
                    'exam_type' => $exam->exam_type,
                ];
            });

        return Inertia::render('Student/Exam/PracticeExam/PracticeExamListPage', [
            'allExam' => $exams,
            'allCourseInfo' => $allCourseInfo,
        ]);
    }

    public function loadPracticeExamPage(Request $request)
    {
        $examSlug = $request->query('examSlug');
        $exam = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->firstOrFail();

        if (!$exam) {
            return redirect()->route('student.live.exam.list');
        }

        $questions = DB::table('questions')
            ->join('exam_question', 'questions.id', '=', 'exam_question.question_id')
            ->where('exam_question.exam_id', $exam->id)
            ->select('questions.*')
            ->get();

        return Inertia::render('Student/Exam/PracticeExam/PracticeExamPage', [
            'exam' => $exam,
            'questions' => $questions,
        ]);
    }

    public function loadPracticeExamResult(Request $request, $exam)
    {
        return Inertia::render('Student/Exam/PracticeExam/PracticeExamResult', [
            'submission' => [
                'examId' => $exam,
                'exam' => $request->input('examData'),
                'questions' => $request->input('questions'),
                'examName' => $request->input('examName'),
                'subject' => $request->input('subject'),
                'totalMarks' => $request->input('totalMarks'),
                'answers' => $request->input('answers'),
                'results' => $request->input('results'),
                'spentTime' => $request->input('spentTime'),
                'submittedAt' => now()->toISOString(),
            ]
        ]);
    }
}
