<?php

namespace App\Models;

use App\Models\Chapter;
use App\Models\Subject;
use App\Models\QuestionTag;
use App\Models\StudentClass;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    public function tags(){
        return $this->hasMany(QuestionTag::class, 'question_id','id');
    }

    public function class(){
        return $this->belongsTo(StudentClass::class, 'class_id','id');
    }

    public function subject(){
        return $this->belongsTo(Subject::class, 'subject_id','id');
    }

    public function chapter(){
        return $this->belongsTo(Chapter::class, 'chapter_id','id');
    }

    public function topic(){
        return $this->belongsTo(Topic::class, 'topic_id','id');
    }

    public function hardness(){
        return $this->belongsTo(Hardness::class, 'hardness_id','id');
    }
}
