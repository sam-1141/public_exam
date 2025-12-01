<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentExamAttendance extends Model
{
    use HasFactory;

    protected $table = 'student_exam_attendance';

    protected $fillable = [
        'student_id',
        'exam_id',
        'exam_start_time',
        'exam_end_time',
        'student_exam_start_time',
        'student_exam_end_time',
        'submit_time',
        'submit_status',
        'exam_total_questions',
        'exam_total_mark',
        'negative_marks_value',
        'student_total_mark',
        'total_correct_answers',
        'total_skipped_answers',
        'tab_switch_count',
    ];

    protected $casts = [
        'exam_start_time' => 'datetime',
        'exam_end_time' => 'datetime',
        'student_exam_start_time' => 'datetime',
        'student_exam_end_time' => 'datetime',
        'submit_time' => 'datetime',
    ];

    /**
     * A student attendance belongs to a student (User).
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * A student attendance belongs to an exam.
     */
    public function exam()
    {
        return $this->belongsTo(Exam::class, 'exam_id');
    }
}
