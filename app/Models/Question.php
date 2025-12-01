<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'questions';

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'serial',
        'class_id',
        'subject_name',   // <-- match your DB column
        'chapter_id',
        'topic_id',
        'hardness_id',
        'question',
        'options',
        'explanation',
        'created_by',
    ];

    /**
     * Cast 'options' JSON to array automatically
     */
    protected $casts = [
        'options' => 'array',
    ];

    /**
     * Optional relationships
     */
    public function chapter()
    {
        return $this->belongsTo(Chapter::class, 'chapter_id');
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

    public function hardness()
    {
        return $this->belongsTo(Hardness::class, 'hardness_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
