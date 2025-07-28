<?php

namespace App\Models;

use App\Models\Chapter;
use App\Models\Question;
use App\Models\StudentClass;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $connection = 'CoreDB';
    
    public function chapters()
    {
        return $this->hasMany(Chapter::class, 'subject_id', 'id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'subject_id', 'id');
    }

    public function class()
    {
        return $this->belongsTo(StudentClass::class, 'class_id', 'id');
    }
}
