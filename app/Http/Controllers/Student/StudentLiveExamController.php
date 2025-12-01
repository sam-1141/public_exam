<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StudentLiveExamController extends Controller
{
    public function loadExamListPage()
    {
        $userId = auth()->id();

        $permittedCourses = DB::connection('Webapp')
            ->table('course_student')
            ->where('student_id', $userId)
            ->pluck('course_id')
            ->toArray();

        $exam = DB::table('live_exams')
            ->leftJoin('course_exam', 'live_exams.id', '=', 'course_exam.exam_id')
            ->where('live_exams.exam_type', 0)
            ->where('live_exams.publish', 1)
            ->where('live_exams.by_link', 0)
            ->where(function ($query) use ($permittedCourses) {
                $query
                    ->where('live_exams.for_all_student', 1)
                    ->orWhere(function ($subQuery) use ($permittedCourses) {
                        $subQuery
                            ->where('live_exams.for_all_student', 0)
                            ->whereIn('course_exam.course_id', $permittedCourses);
                    });
            })
            ->get();

        return Inertia::render('Student/Exam/LiveExam/ExamListPage', [
            'allExam' => $exam,
        ]);
    }

    public function loadExamNoticePage()
    {
        $user = Auth::user();
        if ($user->logged_in == 0) {
            return redirect()->route('force.logout');
        }
        $exam = DB::table('live_exams')
            ->latest('updated_at')
            ->first();

        return Inertia::render('Student/Exam/ExamNotice', [
            'description' => $exam->description,
        ]);
    }

    public function loadExamMainPage(Request $request)
    {
        $user = Auth::user();
        if ($user->logged_in == 0) {
            return redirect()->route('force.logout');
        }
        $studentId = auth()->id();
        $examSlug = $request->query('examSlug');

        $exam = DB::table('live_exams')->latest()->first();

        // dump($exam);
        if (!$exam) {
            return redirect()->route('student.live.exam.list')->withErrors(['errors' => 'Exam not found.']);
        }

        if ($exam->end_time > now()) {
            // if($exam->by_link == 0 && $exam->for_all_student == 0){
            //     $courseIds = DB::table('course_exam')
            //         ->where('exam_id', $exam->id)
            //         ->pluck('course_id')
            //         ->unique()
            //         ->values()
            //         ->all();

            //     $permittedCourse = DB::connection('Webapp')
            //         ->table('course_student')
            //         ->where('student_id', $studentId)
            //         ->whereIn('course_id', $courseIds)
            //         ->exists();

            //     if (!$permittedCourse) {
            //         return redirect()->route('student.live.exam.list')->withErrors(['errors' => 'You are not permitted to take this exam.']);
            //     }
            // }

            $questions = DB::table('questions')
                ->select('questions.*')
                ->get();
            $exists = DB::table('student_exam_attendance')
                ->where('student_id', $studentId)
                ->where('exam_id', $exam->id)
                ->first();

            if ($exists) {
                if ($exists->student_exam_end_time < now() || $exists->submit_status !== null) {
                    return redirect()
                        ->route('student.live.exam.success')
                        ->withErrors(['errors' => 'You have already taken this exam.']);
                }
                if ($user->logged_in) {
                    // $endTime = Carbon::parse($exists->student_exam_end_time)->setTimezone('Asia/Dhaka');
                    // $now = Carbon::now('Asia/Dhaka');

                    // $durationMinutes = max(
                    //     0,
                    //     round($endTime->diffInRealMinutes($now))
                    // );
                    // Safety: ensure valid numeric student_id
                    $studentId = (int) $user->id;

                    // Delete all related exam activity using clean conditional queries
                    DB::table('student_exam_attendance')
                        ->where('student_id', $studentId)
                        ->where('exam_id', $exam->id)
                        ->update([
                            'total_correct_answers' => null,
                            'total_skipped_answers' => $exam->total_questions,
                            'student_total_mark' => null,
                            'updated_at' => now(),
                        ]);

                    \DB::table('see_answer')
                        ->where('student_id', $studentId)
                        ->delete();

                    // $exam->duration = $durationMinutes;
                }
                $endTime = Carbon::parse($exists->student_exam_end_time, 'Asia/Dhaka');
                $now = Carbon::now('Asia/Dhaka');

                // Calculate the difference in seconds first
                $diffSeconds = $endTime->timestamp - $now->timestamp;

                // Convert to full minutes, non-negative
                $durationMinutes = max(0, intdiv($diffSeconds, 60));

                // dd($endTime, $now, $durationMinutes);

                $exam->duration = $durationMinutes;
                return Inertia::render('Student/Exam/LiveExam/ExamMainPage', [
                    'exam' => $exam,
                    'questions' => $questions,
                ]);
            }

            $inserted = DB::table('student_exam_attendance')->insert([
                'student_id' => $studentId,
                'exam_id' => $exam->id,
                'exam_start_time' => $exam->start_time,
                'exam_end_time' => $exam->end_time,
                // 'result_publish_time' => $exam->result_publish_time,
                'student_exam_start_time' => now(),
                'student_exam_end_time' => now()->addMinutes($exam->duration),
                'submit_time' => null,
                'submit_status' => null,
                'exam_total_questions' => $exam->total_questions,
                'exam_total_mark' => $exam->total_marks,
                'negative_marks_value' => $exam->negative_marks_value,
                'student_total_mark' => null,
                'total_correct_answers' => null,
                'total_skipped_answers' => $exam->total_questions,
                'tab_switch_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            if ($inserted) {
                return Inertia::render('Student/Exam/LiveExam/ExamMainPage', [
                    'exam' => $exam,
                    'questions' => $questions,
                ]);
            } else {
                return redirect()->route('student.live.exam.list')->withErrors(['errors' => 'Failed to start the exam.']);
            }
        } else {
            $questions = DB::table('questions')
                ->select('questions.*')
                ->get();

            return Inertia::render('Student/Exam/PracticeExam/PracticeExamPage', [
                'exam' => $exam,
                'questions' => $questions,
            ]);
        }
    }

    public function submitExamMainPage(Request $request)
    {
        $user = Auth::user();
        if ($user->logged_in == 0) {
            return redirect()->route('force.logout');
        }
        $data = $request->validate([
            'examId' => ['required', 'integer'],
            'submit_status' => ['required', 'integer'],
        ]);

        $studentId = auth()->user()->id;

        DB::table('student_exam_attendance')
            ->where('student_id', $studentId)
            ->where('exam_id', $request->examId)
            ->update([
                'submit_time' => now(),
                'submit_status' => $data['submit_status'],
            ]);

        return response()->json([
            'type' => 'success',
            'message' => 'Exam updated successfully.'
        ]);
    }

    public function loadExamSuccessPage()
    {
        $studentName = Auth::user()->name;
        return Inertia::render('Student/Exam/LiveExam/ExamSuccessPage', [
            'studentName' => $studentName,
        ]);
    }

    public function answerStore(Request $request)
    {
        $user = Auth::user();
        if ($user->logged_in == 0) {
            return redirect()->route('force.logout');
        }
        $data = $request->validate([
            'exam_id' => ['required', 'integer'],
            'question_id' => ['required', 'integer'],
            'ans_given' => ['required', 'string'],
            'correct_ans' => ['required'],
            'is_correct' => ['required'],
            'single_question_mark' => ['required'],
        ]);

        $studentId = auth()->id();
        $examId = (int) $data['exam_id'];
        $questionId = (int) $data['question_id'];
        $ansGiven = (string) $data['ans_given'];
        $correctAns = $data['correct_ans'];
        $isCorrect = $data['is_correct'];
        $answerMark = $data['single_question_mark'];

        // Get exam negative mark (non-blocking read)
        $exam = DB::table('live_exams')->where('id', $examId)->first();
        $negativeMark = $exam->negative_marks_value ?? 0;

        // Use a transaction and lock the attendance & answer rows to avoid race conditions.
        DB::transaction(function () use (
            $studentId, $examId, $questionId, $ansGiven, $correctAns,
            $isCorrect, $answerMark, $negativeMark
        ) {
            // Lock the attendance row for update (short-lived lock)
            $attendance = DB::table('student_exam_attendance')
                ->where('student_id', $studentId)
                ->where('exam_id', $examId)
                ->lockForUpdate()
                ->first();

            $seaId = $attendance->id ?? null;

            // Lock the existing answer row (if any)
            $previousAnswer = DB::table('see_answer')
                ->where('student_id', $studentId)
                ->where('exam_id', $examId)
                ->where('question_id', $questionId)
                ->lockForUpdate()
                ->first();

            // CASE 1: previous answer exists AND same answer given again (or ans_given == -1) -> treat as delete / skipped
            if ($previousAnswer && ($previousAnswer->ans_given == $ansGiven || $ansGiven == -1)) {
                DB::table('see_answer')->where([
                    'student_id' => $studentId,
                    'exam_id' => $examId,
                    'question_id' => $questionId,
                ])->delete();

                // Compute combined deltas so we do a single update on attendance
                if ($previousAnswer->is_correct) {
                    // was correct -> remove the answer mark and decrement total_correct_answers; increment skipped
                    $markDelta = -1 * $answerMark;  // subtract answer mark
                    $correctDelta = -1;  // decrement correct count
                    $skippedDelta = 1;  // increment skipped
                } else {
                    // was wrong -> undo the negative penalty by adding negativeMark; skipped++
                    $markDelta = $negativeMark;  // add back the penalty
                    $correctDelta = 0;
                    $skippedDelta = 1;
                }

                if ($seaId) {
                    DB::table('student_exam_attendance')
                        ->where('id', $seaId)
                        ->update([
                            'student_total_mark' => DB::raw("IFNULL(student_total_mark, 0) + ($markDelta)"),
                            'total_correct_answers' => DB::raw("IFNULL(total_correct_answers, 0) + ($correctDelta)"),
                            'total_skipped_answers' => DB::raw("IFNULL(total_skipped_answers, 0) + ($skippedDelta)")
                        ]);
                }

                return;  // transaction callback ends -> commit
            }

            // ELSE: insert / update answer
            DB::table('see_answer')->updateOrInsert(
                [
                    'student_id' => $studentId,
                    'exam_id' => $examId,
                    'question_id' => $questionId,
                ],
                [
                    'see_id' => $seaId,
                    'ans_given' => $ansGiven,
                    'correct_ans' => $correctAns,
                    'is_correct' => $isCorrect,
                ]
            );

            // If previousAnswer exists, check correctness flip
            if ($previousAnswer) {
                $prevCorrect = ((int) $previousAnswer->is_correct) === 1;
                $newCorrect = ((int) $isCorrect) === 1;

                if ($prevCorrect !== $newCorrect) {
                    if ($prevCorrect) {
                        // Was correct, now wrong: subtract (answerMark + negativeMark), decrement correct count
                        $markDelta = -1 * ($answerMark + $negativeMark);
                        $correctDelta = -1;
                    } else {
                        // Was wrong, now correct: add (answerMark + negativeMark), increment correct count
                        $markDelta = ($answerMark + $negativeMark);
                        $correctDelta = 1;
                    }

                    if ($seaId) {
                        DB::table('student_exam_attendance')
                            ->where('id', $seaId)
                            ->update([
                                'student_total_mark' => DB::raw("IFNULL(student_total_mark, 0) + ($markDelta)"),
                                'total_correct_answers' => DB::raw("IFNULL(total_correct_answers, 0) + ($correctDelta)")
                            ]);
                    }
                }

                return;  // done for the branch where previousAnswer existed
            }

            // ELSE: first time answering this question (no previous answer)
            // Follow original logic exactly: add answerMark when correct, subtract negative_marks_value when wrong,
            // increment total_correct_answers if correct, and decrement total_skipped_answers by 1.
            if ($seaId) {
                $markExpr = $isCorrect
                    ? "IFNULL(student_total_mark, 0) + $answerMark"
                    : 'IFNULL(student_total_mark, 0) - IFNULL(negative_marks_value, 0)';

                $correctExpr = 'IFNULL(total_correct_answers, 0) + ' . ($isCorrect ? 1 : 0);
                $skippedExpr = 'IFNULL(total_skipped_answers, 0) - 1';

                DB::table('student_exam_attendance')
                    ->where('id', $seaId)
                    ->update([
                        'student_total_mark' => DB::raw($markExpr),
                        'total_correct_answers' => DB::raw($correctExpr),
                        'total_skipped_answers' => DB::raw($skippedExpr),
                    ]);
            }

            // transaction callback ends -> commit
        });

        return response()->json(['ok' => true]);
    }

    public function submitTabSwitchCount($exam)
    {
        $user = Auth::user();
        if ($user->logged_in == 0) {
            return redirect()->route('force.logout');
        }
        $studentId = auth()->id();

        DB::table('student_exam_attendance')
            ->where('student_id', $studentId)
            ->where('exam_id', $exam)
            ->increment('tab_switch_count');

        return response()->json(['ok' => true]);
    }

    public function deleteAllExamData()
    {
        $user = Auth::user();
        if ($user->logged_in == 0) {
            return redirect()->route('force.logout');
        }
        // Delete all records + reset AUTO_INCREMENT
        DB::table('student_exam_attendance')->truncate();
        DB::table('see_answer')->truncate();

        return response()->json([
            'message' => 'All records deleted successfully.',
        ]);
    }
}
