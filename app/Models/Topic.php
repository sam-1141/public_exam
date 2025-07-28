<?php

namespace App\Models;

use App\Models\Chapter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Topic extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function chapter(){
        return $this->belongsTo(Chapter::class, 'chapter_id','id');
    }
}
