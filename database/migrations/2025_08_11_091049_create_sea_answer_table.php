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
        Schema::create('sea_answer', function (Blueprint $table) {
            $table->bigInteger('sea_id');
            $table->bigInteger('student_id');
            $table->bigInteger('exam_id');
            $table->bigInteger('question_id');
            $table->string('ans_given', 100);
            $table->string('correct_ans', 100)->nullable();
            $table->boolean('is_correct')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sea_answer');
    }
};
