<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TempUser extends Model
{
    protected $connection = 'CoreDB';

    protected $guarded = [];
}
