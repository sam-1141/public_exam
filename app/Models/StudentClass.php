<?php

namespace App\Models;

use App\Models\Chapter;
use App\Models\Subject;
use App\Models\Question;
use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model
{
    protected $connection = 'CoreDB';

    public function subjects()
    {
        return $this->hasMany(Subject::class, 'class_id', 'id');
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class, 'class_id', 'id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'class_id', 'id');
    }
    
}
