<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('class_id')->nullable();
            $table->bigInteger('subject_id')->nullable();
            $table->bigInteger('chapter_id')->nullable();
            $table->bigInteger('topic_id')->nullable();
            $table->bigInteger('hardness_id')->nullable();
            $table->longText('question');
            $table->json('options');
            $table->longText('explanation')->nullable();
            $table->unsignedBigInteger('created_by');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
