<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChapterLecture extends Model
{
    protected $fillable = [
    'chapter',
    'lecture_number',
    'lecture_link',
];

}
