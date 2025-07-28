<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name', 255)->unique(); // Name of the tag
            $table->unsignedBigInteger('created_by'); // User ID who created the tag
            $table->timestamps(); // created_at and updated_at timestamps

            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tags');
    }
}