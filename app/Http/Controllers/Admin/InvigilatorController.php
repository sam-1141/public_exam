<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentExamAttendance;
use App\Models\User;
use Illuminate\Http\Request;

class InvigilatorController extends Controller
{
    public function index()
    {
        $students = User::select('id', 'name', 'email', 'phone', 'logged_in')
            ->where('role', 'student')
            ->get()
            ->map(function ($user) {
                $attendance = StudentExamAttendance::where('student_id', $user->id)->first();
                $user->submit_status = $attendance ? $attendance->submit_status : null;
                return $user;
            });

        return inertia('Admin/InvigilatorPage', [
            'students' => $students
        ]);
    }

    public function toggleLogin($id)
    {
        // Run everything inside a safe DB transaction
        \DB::transaction(function () use ($id) {
            $user = User::findOrFail($id);

            // Toggle logged_in status
            $user->logged_in = $user->logged_in ? 0 : 1;
            $user->save();

            // If user is being logged out → delete exam activity
            if ($user->logged_in === 0) {
                // Delete attendance
                \DB::table('student_exam_attendance')
                    ->where('student_id', $id)
                    ->delete();

                // Delete answers
                \DB::table('see_answer')
                    ->where('student_id', $id)
                    ->delete();
            }
        });

        return back()->with('success', 'Student login status updated successfully.');
    }

    public function toggleSubmitStatus($studentId)
    {
        $record = StudentExamAttendance::where('student_id', $studentId)->first();

        if ($record) {
            $record->submit_status = $record->submit_status === null ? 3 : null;
            $record->save();
        }

        return back();
    }
}
