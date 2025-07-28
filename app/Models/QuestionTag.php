<?php

namespace App\Models;

use App\Models\Tag;
use App\Models\Question;
use Illuminate\Database\Eloquent\Model;

class QuestionTag extends Model
{
    protected $guarded = [];

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id','id');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class, 'tag_id','id');
    }
}
