<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentLectureProgress extends Model
{
    use HasFactory;

    protected $table = 'student_lecture_progress';

    protected $fillable = [
        'student_id',
        'subject',
        'chapter',
        'lecture_number',
        'status_of_completion',
    ];

    // Relationship to User
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    // Relationship to ChapterLecture
    public function lecture()
    {
        return $this->belongsTo(ChapterLecture::class, 'lecture_number', 'lecture_number')
                    ->where('chapter', $this->chapter);
    }
}
