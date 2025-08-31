<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    protected $connection = 'CoreDB';

    protected $fillable = [
        'year',
        'status',
        'author',
    ];


}
