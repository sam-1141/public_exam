<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_exam_attendance', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('student_id');
            $table->bigInteger('exam_id');
            // $table->boolean('exam_type')->nullable()->comment('0=live_exam, 1=practice_exam');
            $table->timestamp('exam_start_time')->nullable();
            $table->timestamp('exam_end_time')->nullable();
            // $table->timestamp('result_publish_time')->nullable();
            $table->timestamp('student_exam_start_time')->nullable();
            $table->timestamp('student_exam_end_time')->nullable();
            $table->timestamp('submit_time')->nullable();
            $table->tinyInteger('submit_status')->nullable()->comment('1=by_student, 2=time_expired, 3=forced_exit');
            $table->integer('exam_total_questions')->nullable();
            $table->integer('exam_total_mark')->default(0)->nullable();
            $table->float('negative_marks_value')->nullable();
            $table->float('student_total_mark')->default(0)->nullable();
            $table->integer('total_correct_answers')->default(0)->nullable();
            $table->integer('total_skipped_answers')->default(0)->nullable();
            $table->integer('tab_switch_count')->default(0)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_exam_attendance');
    }
};
