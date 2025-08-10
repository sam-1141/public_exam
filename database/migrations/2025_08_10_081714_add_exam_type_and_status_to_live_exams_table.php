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
        Schema::table('live_exams', function (Blueprint $table) {
            Schema::table('live_exams', function (Blueprint $table) {
                $table->boolean('exam_type')->default(true)->after('id')->comment("0 for live, 1 for practice");
                $table->boolean('status',)->default(false)->after('created_by')->comment("0 for unpublish, 1 for publish");
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('live_exams', function (Blueprint $table) {
            $table->dropColumn(['exam_type', 'status']);
        });
    }
};
