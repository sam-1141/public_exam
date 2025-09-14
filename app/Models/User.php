<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    protected $connection = 'CoreDB';

    use HasFactory, Notifiable;

    protected $fillable = [
        'mongodb_id',
        'name',
        'email',
        'password',
        'role',
        'status',
        'remember_token',
        'mobile',
        'otp',
        'isVerified',
        'institute',
        'class',
        'batch',
        'group',
        'otp_expires_at',
        'solver_department',
        'guardian_name',
        'guardian_mobile',
        'relation_with_guardian',
        'fb_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the system user or create one if not exists
     */
    // public static function systemUser()
    // {
    //     return static::firstOrCreate(
    //         ['id' => 1],
    //         [
    //             'name' => 'System',
    //             'email' => 'system@ft.com',
    //             'password' => bcrypt(Str::random(32)),
    //             'role' => 'admin',
    //             'status' => '1',
    //             'isVerified' => '1'
    //         ]
    //     );
    // }

    /**
     * Find user or fallback to system user
     */
//    public static function findOrSystem($id = null)
//    {
//        if ($id === null && auth()->check()) {
//            return auth()->user();
//        }
//
//        return static::find($id) ?? static::systemUser();
//    }

//    public function courses()
//    {
//        return $this->belongsToMany(Course::class, 'course_student', 'student_id', 'course_id');
//    }

//    public function coupons(): BelongsToMany
//    {
//        return $this->belongsToMany(
//            Coupon::class,
//            'WebappDB.coupon_student',
//            'student_id',
//            'coupon_id'
//        )
//            ->using(CouponStudentPivot::class)
//            ->withTimestamps();
//    }
}
