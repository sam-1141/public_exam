<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LiveExam extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'subject',
        'description',
        'total_questions',
        'has_negative_marks',
        'negative_marks_value',
        'total_marks',
        'duration',
        'question_type',
        'privacy',
        'publish_instant',
        'start_time',
        'end_time',
        'exam_url',
        'created_by',
        'exam_type',
        'status',
        'result_publish_time',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'result_publish_time' => 'datetime',
    ];
}
