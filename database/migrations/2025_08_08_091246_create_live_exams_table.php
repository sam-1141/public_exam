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
        Schema::create('live_exams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->bigInteger('subject_id');
            $table->bigInteger('course_id');
            $table->text('description')->nullable();
            $table->integer('total_questions');
            $table->boolean('has_negative_marks')->default(false);
            $table->float('negative_marks_value')->nullable();
            $table->integer('total_marks');
            $table->integer('duration');
            $table->enum('question_type', ['random', 'shuffle'])->nullable();
            $table->enum('privacy', ['everyone', 'link'])->nullable();
            $table->boolean('publish_instant')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('exam_url')->nullable();
            $table->bigInteger('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_exams');
    }
};
