<?php

namespace App\Http\Controllers;

use App\Models\StudentLectureProgress;
use App\Models\Progresses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CalculatorController extends Controller
{
    public function show()
    {
        
        $subjects = config('student_subjects');

        return Inertia::render('Calculator', [
            'subjects' => $subjects,
        ]);
    }

    public function calculate(Request $request)
    {
        $selected = $request->input('selected', []); // nested object

        \Log::info('Selected payload', ['selected' => $selected]);

        $studentId = Auth::id();

        foreach ($selected as $subject => $chapters) {
            foreach ($chapters as $chapterName => $info) {
                Progresses::where([
                    'student_id' => $studentId,
                    'subject' => $subject,
                    'chapter' => $chapterName,
                ])->delete();

                Progresses::create([
                    'student_id' => $studentId,
                    'subject' => $subject,
                    'chapter' => $chapterName,
                    'lectures' => $info['lectures'] ?? 0,
                    'duration_days' => $info['duration_days'] ?? 0,
                ]);

            }
        }


        return redirect()->route('student.progress');
    }

    public function freshStart()
{
    $studentId = Auth::id();

    if (! $studentId) {
        return back()->with([
            'type' => 'error',
            'message' => 'Unauthorized access. Please log in first.',
        ]);
    }

    // Delete from Progresses
    $existingProgresses = Progresses::where('student_id', $studentId)->count();
    if ($existingProgresses > 0) {
        $deletedProgresses = Progresses::where('student_id', $studentId)->delete();
        \Log::info('Fresh start: deleted progress', [
            'student_id' => $studentId,
            'deleted_records' => $deletedProgresses,
        ]);
    } else {
        \Log::info('Fresh start: no progress records found', ['student_id' => $studentId]);
    }

    // Delete from StudentLectureProgress
    $existingLectures = StudentLectureProgress::where('student_id', $studentId)->count();
    if ($existingLectures > 0) {
        $deletedLectures = StudentLectureProgress::where('student_id', $studentId)->delete();
        \Log::info('Fresh start: deleted student lecture progress', [
            'student_id' => $studentId,
            'deleted_records' => $deletedLectures,
        ]);
    } else {
        \Log::info('Fresh start: no lecture progress records found', ['student_id' => $studentId]);
    }

    // Redirect back with success flash message
    return back();
}
}
