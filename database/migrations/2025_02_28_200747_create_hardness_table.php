<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHardnessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hardness', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name', 255)->unique(); // Name of the hardness level
            $table->unsignedBigInteger('created_by'); // User ID who created the hardness level
            $table->timestamps(); // created_at and updated_at timestamps

            
        });

        Schema::create('question_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tag_id'); // Foreign key for tags table
            $table->unsignedBigInteger('question_id'); // Foreign key for questions table

            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hardness');
        Schema::dropIfExists('question_tags');
    }
}