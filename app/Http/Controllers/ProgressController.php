<?php

namespace App\Http\Controllers;

use App\Models\ChapterLecture;
use App\Models\Progresses; 
use App\Models\StudentLectureProgress;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProgressController extends Controller
{
    function calculateRemainingTime($createdAt, $durationDays)
{
    // 1️⃣ Ensure created_at is a Carbon instance
    $createdAt = $createdAt instanceof Carbon
        ? $createdAt
        : Carbon::parse($createdAt);

    // 2️⃣ Normalize to UTC first to prevent double conversion issues
    $createdAt = $createdAt->clone()->setTimezone('UTC');
    $now = now('UTC');

    // 3️⃣ Convert both to app timezone (consistent local display)
    $appTimezone = config('app.timezone', 'UTC');
    $createdAt = $createdAt->copy()->setTimezone($appTimezone);
    $now = $now->copy()->setTimezone($appTimezone);

    // 4️⃣ Ensure duration_days is valid
    $durationDays = max(0, (int) ($durationDays ?? 0));

    // 5️⃣ Calculate end time
    $endTime = $createdAt->copy()->addDays($durationDays);

    // 6️⃣ Calculate remaining seconds (respect sign)
    $remainingSeconds = max(0, $now->diffInSeconds($endTime, false));

    // 7️⃣ Convert to D:HH format
    $days = floor($remainingSeconds / 86400);
    $hours = floor(($remainingSeconds % 86400) / 3600);

    return sprintf('%d:%02d', $days, $hours);
}

    protected function getStudentLectureProgressMap($studentId)
    {

        // Fetch all lecture progress for the student
        $progressRecords = StudentLectureProgress::where('student_id', $studentId)->get();

        // Map as 'chapter_lectureNumber' => status
        $map = [];
        foreach ($progressRecords as $record) {
            $key = $record->chapter.'_'.$record->lecture_number;
            $map[$key] = $record->status_of_completion;
        }

        return $map;
    }

    /**
     * Fetch student progress grouped by subject with lecture links & completion status
     */
    public function getStudentProgress()
{
    $student_id = Auth::id();

    // Fetch all progress entries for this student
    $progresses = Progresses::where('student_id', $student_id)->get();

    // Pre-fetch lecture completion statuses (optimization)
    $lectureStatusMap = $this->getStudentLectureProgressMap($student_id);

    // Ensure every lecture has a record in lecture progress table
    foreach ($progresses as $progress) {
        $chapterName = $progress->chapter;

        // Get all lectures for this chapter
        $lectureRows = ChapterLecture::where('chapter', $chapterName)->get();

        foreach ($lectureRows as $lecture) {
            $key = $chapterName . '_' . $lecture->lecture_number;

            // If lecture progress doesn't exist, create it
            if (!isset($lectureStatusMap[$key])) {
                $newRecord = StudentLectureProgress::create([
                    'student_id' => $student_id,
                    'subject' => $progress->subject,
                    'chapter' => $chapterName,
                    'lecture_number' => $lecture->lecture_number,
                    'status_of_completion' => false,
                ]);

                // Update the map so it's available immediately
                $lectureStatusMap[$key] = false;
            }
        }
    }

    // Group progresses by subject
    $grouped = $progresses->groupBy('subject')->map(function ($subjectProgresses) use ($lectureStatusMap) {
        return $subjectProgresses->map(function ($progress) use ($lectureStatusMap) {
            $chapterName = $progress->chapter;

            // Get all lecture links for this chapter
            $lectureRows = ChapterLecture::where('chapter', $chapterName)->get();

            $lecturesList = $lectureRows->groupBy('lecture_number')->map(function ($lectures, $num) use ($chapterName, $lectureStatusMap) {
                $key = $chapterName.'_'.$num;
                $status = $lectureStatusMap[$key] ?? false;

                return [
                    'lecture_number' => $num,
                    'links' => $lectures->pluck('lecture_link')->toArray(),
                    'status_of_completion' => $status,
                ];
            })->values()->toArray();

            $remainingTime = $progress->startedtime
                ? $this->calculateRemainingTime($progress->startedtime, $progress->duration_days) 
                : null;

            return [
                'chapter' => $chapterName,
                'lectures' => $progress->lectures,
                'duration_days' => $progress->duration_days,
                'remaining_days' => $remainingTime,
                'lectures_list' => $lecturesList,
            ];
        })->values()->toArray();
    })->toArray();

    // Return via Inertia
    return Inertia::render('ProgressDashboard', [
        'progressData' => [
            'student_id' => $student_id,
            'subjects' => $grouped,
        ],
    ]);
}


    /**
     * Toggle lecture completion status for the logged-in student
     */
    public function apiToggleLecture(Request $request)
{
    $request->validate([
        'subject' => 'required|string',
        'chapter' => 'required|string',
        'lecture_number' => 'required|integer',
    ]);

    $student_id = Auth::id();

    $progress = StudentLectureProgress::where('student_id', $student_id)
        ->where('subject', $request->subject)
        ->where('chapter', $request->chapter)
        ->where('lecture_number', $request->lecture_number)
        ->firstOrFail(); // Throws 404 if not found

    $progress->status_of_completion = ! $progress->status_of_completion;
    $progress->save();

    return redirect()->route('student.progress'); // or url('/progress')
 // <-- No JSON, no redirect page
}


    public function apiStartProgress(Request $request)
{
    $request->validate([
        'subject' => 'required|string',
        'chapter' => 'required|string',
    ]);

    $student_id = Auth::id();

    // Update existing progress or create new one
    Progresses::updateOrCreate(
        [
            'student_id' => $student_id,
            'subject' => $request->subject,
            'chapter' => $request->chapter,
        ],
        [
            'startedtime' => now(),
        ]
    );

    return back();
}


}
