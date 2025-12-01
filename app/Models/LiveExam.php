<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveExam extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'total_questions',
        'has_negative_marks',
        'negative_marks_value',
        'total_marks',
        'duration',
        'start_time',
        'end_time',
        'result_publish_time',
    ];
}
