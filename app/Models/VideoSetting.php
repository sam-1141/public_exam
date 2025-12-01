<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoSetting extends Model
{
    protected $fillable = ['title', 'video_url', 'message', 'purchase_link','deadline','exam_description_bn','exam_url'];
}
