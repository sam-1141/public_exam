<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LiveExam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PractiseExamController extends Controller
{
    public function loadAddPracticeExamPage()
    {
        return Inertia::render('Admin/Exam/PracticeExam/PracticeExam');
    }


    public function showAllExam()
    {
        $exams = LiveExam::where(function ($query){
            $query->where('exam_type', 1)
                ->orWhere('end_time', '<', now());
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->through(function ($exam) {
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
                    'status'  => $exam->status,
                    'exam_type' => $exam->exam_type,
                ];
            });

        return response()->json(['exams' => $exams], 200);
    }
}
