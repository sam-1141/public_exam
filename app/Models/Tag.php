<?php

namespace App\Models;

use App\Models\QuestionTag;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    //
    use HasFactory;

    protected $guarded = [];

    public function questionTag(){
        return $this->hasMany(QuestionTag::class, 'tag_id','id');
    }
}
