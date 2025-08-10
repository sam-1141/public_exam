<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\LiveExam;
use Illuminate\Http\Request;

class PractiseExamController extends Controller
{
    public function showAllExam()
    {
        $exams = LiveExam::orderBy('created_at', 'desc')->where('exam_type', 1)->get()->map(function ($exam) {
            return [
                'id' => $exam->id,
                'name' => $exam->name,
                'slug' => $exam->slug,
                'subject' => $exam->subject_id,
                'description' => $exam->description,
                'totalQuestions' => $exam->total_questions,
                'hasNegativeMarks' => $exam->has_negative_marks, // boolean
                'negativeMarksValue' => $exam->negative_marks_value,
                'totalMarks' => $exam->total_marks,
                'duration' => $exam->duration,
                'questionType' => $exam->question_type,
                'privacy' => $exam->privacy,
                'publishInstant' => $exam->publish_instant,
                'startTime' => $exam->start_time ? $exam->start_time->format('Y-m-d H:i') : null,
                'endTime' => $exam->end_time ? $exam->end_time->format('Y-m-d H:i') : null,
                'examUrl' => $exam->exam_url,
                'status' => $exam->status,
                'exam_type' => $exam->exam_type,
            ];
        });

        return response()->json(['exams' => $exams], 200);
    }
}
