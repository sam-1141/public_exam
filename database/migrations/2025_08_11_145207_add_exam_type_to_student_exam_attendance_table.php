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
        Schema::table('student_exam_attendance', function (Blueprint $table) {
            $table->boolean('exam_type', 50)->nullable()->after('exam_id')->comment('0=live_exam, 1=practice_exam');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_exam_attendance', function (Blueprint $table) {
            $table->dropColumn('exam_type');
        });
    }
};
