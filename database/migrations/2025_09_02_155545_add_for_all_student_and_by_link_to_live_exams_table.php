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
            $table->boolean('for_all_student')->default(false)->after('practise_trans_by')->comment('If true, the exam is open to all students');
            $table->boolean('by_link')->default(false)->after('for_all_student')->comment('If true, the exam can be accessed via link');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('live_exams', function (Blueprint $table) {
            $table->dropColumn(['for_all_student', 'by_link']);
        });
    }
};
