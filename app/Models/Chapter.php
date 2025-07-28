<?php

namespace App\Models;

use App\Models\Question;
use App\Models\Subject;
use App\Models\StudentClass;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    protected $connection = 'CoreDB';
    
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'chapter_id', 'id');
    }

}
