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
        Schema::table('questions', function (Blueprint $table) {
            $table->unsignedBigInteger('chapter_id')->nullable()->change();
            $table->unsignedBigInteger('topic_id')->nullable()->change();
            $table->unsignedBigInteger('hardness_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->unsignedBigInteger('chapter_id')->nullable(false)->change();
            $table->unsignedBigInteger('topic_id')->nullable(false)->change();
            $table->unsignedBigInteger('hardness_id')->nullable(false)->change();
        });
    }
};
