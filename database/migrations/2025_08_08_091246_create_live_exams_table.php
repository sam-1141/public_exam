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
            $table->boolean('exam_type')->default(true)->comment("0 for live, 1 for practice");
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->integer('total_questions');
            $table->boolean('has_negative_marks')->default(false);
            $table->float('negative_marks_value')->nullable();
            $table->integer('total_marks');
            $table->integer('duration');
            $table->enum('question_type', ['random', 'shuffle'])->nullable();
            $table->boolean('add_question_bank')->default(false)->comment("1 for add in questions bank, o for don't");
            $table->enum('privacy', ['everyone', 'link'])->nullable();
            $table->boolean('publish')->default(true)->comment("0 for unpublish, 1 for publish");
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('exam_url')->nullable();
            $table->bigInteger('created_by')->nullable();
            $table->integer('practise_trans_status',)->nullable()->comment("0 for by forcefully by admin/teacher, 1 for after exam, for live exam this field will null");
            $table->bigInteger('practise_trans_by')->nullable()->comment("user id for forcefully by admin, null for after live exam");
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
