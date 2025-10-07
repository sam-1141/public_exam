<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
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
                $query->where('live_exams.for_all_student', 1)
                    ->orWhere(function ($subQuery) use ($permittedCourses) {
                        $subQuery->where('live_exams.for_all_student', 0)
                            ->whereIn('course_exam.course_id', $permittedCourses);
                    });
            })
            ->get();

        return Inertia::render('Student/Exam/LiveExam/ExamListPage', [
            'allExam' => $exam,
        ]);
    }

    public function loadExamNoticePage(Request $request)
    {
        $examSlug = $request->query('examSlug');

        $exam = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->first();

        return Inertia::render('Student/Exam/ExamNotice', [
            'exam' => $exam,
        ]);
    }

    public function loadExamMainPage(Request $request)
    {
        $studentId = auth()->id();
        $examSlug = $request->query('examSlug');

        $exam = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->first();

        if (!$exam) {
            return redirect()->route('student.live.exam.list')->withErrors(['errors' => 'Exam not found.']);
        }

        if($exam->exam_type === 0 && $exam->practise_trans_status === null && $exam->end_time > now()){
            if($exam->by_link == 0 && $exam->for_all_student == 0){
                $courseIds = DB::table('course_exam')
                    ->where('exam_id', $exam->id)
                    ->pluck('course_id')
                    ->unique()
                    ->values()
                    ->all();

                $permittedCourse = DB::connection('Webapp')
                    ->table('course_student')
                    ->where('student_id', $studentId)
                    ->whereIn('course_id', $courseIds)
                    ->exists();

                if (!$permittedCourse) {
                    return redirect()->route('student.live.exam.list')->withErrors(['errors' => 'You are not permitted to take this exam.']);
                }
            }

            $questions = DB::table('questions')
                ->join('exam_question', 'questions.id', '=', 'exam_question.question_id')
                ->where('exam_question.exam_id', $exam->id)
                ->orderBy('questions.serial', 'desc')
                ->select('questions.*')
                ->get();

            $exists = DB::table('student_exam_attendance')
                ->where('student_id', $studentId)
                ->where('exam_id', $exam->id)
                ->first();

            if ($exists) {
                if ($exists->student_exam_end_time < now() || $exists->submit_status !== null) {
                    return redirect()
                        ->route('student.live.exam.list')
                        ->withErrors(['errors' => 'You have already taken this exam.']);
                }

                return Inertia::render('Student/Exam/LiveExam/ExamMainPage', [
                    'exam' => $exam,
                    'questions' => $questions,
                ]);
            }

            $inserted = DB::table('student_exam_attendance')->insert([
                'student_id' => $studentId,
                'exam_id' => $exam->id,
                'exam_type' => false,
                'exam_start_time' => $exam->start_time,
                'exam_end_time' => $exam->end_time,
                'result_publish_time' => $exam->result_publish_time,
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

            if($inserted){
                return Inertia::render('Student/Exam/LiveExam/ExamMainPage', [
                    'exam' => $exam,
                    'questions' => $questions,
                ]);
            } else {
                return redirect()->route('student.live.exam.list')->withErrors(['errors' => 'Failed to start the exam.']);
            }
        }else{
            $questions = DB::table('questions')
                ->join('exam_question', 'questions.id', '=', 'exam_question.question_id')
                ->where('exam_question.exam_id', $exam->id)
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
        $data = $request->validate([
            'examId'     => ['required','integer'],
            'submit_status' => ['required','integer'],
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
        return Inertia::render('Student/Exam/LiveExam/ExamSuccessPage');
    }

    public function answerStore(Request $request)
    {
        $data = $request->validate([
            'exam_id'     => ['required','integer'],
            'question_id' => ['required','integer'],
            'ans_given'   => ['required','string'],
            'correct_ans'   => ['required'],
            'is_correct'   => ['required'],
            'single_question_mark'   => ['required'],
        ]);

        $studentId  = auth()->id();
        $examId     = (int) $data['exam_id'];
        $questionId = (int) $data['question_id'];
        $ansGiven   = (string) $data['ans_given'];
        $correctAns = $data['correct_ans'];
        $isCorrect  = $data['is_correct'];
        $answerMark  = $data['single_question_mark'];

        $seaId = DB::table('student_exam_attendance')
            ->where('student_id', $studentId)
            ->where('exam_id', $examId)
            ->value('id');

        $previousAnswer = DB::table('sea_answer')
            ->where('student_id', $studentId)
            ->where('exam_id', $examId)
            ->where('question_id', $questionId)
            ->first();

        DB::table('sea_answer')->updateOrInsert(
            [
                'student_id'  => $studentId,
                'exam_id'     => $examId,
                'question_id' => $questionId,
            ],
            [
                'sea_id'      => $seaId,
                'ans_given'   => $ansGiven,
                'correct_ans' => $correctAns,
                'is_correct'  => $isCorrect,
            ]
        );

        if ($previousAnswer) {
            $prevCorrect = (bool) $previousAnswer->is_correct;
            $newCorrect  = (bool) $isCorrect;

            if ($prevCorrect !== $newCorrect) {
                if ($prevCorrect) {
                    // Was correct, now wrong: subtract mark and correct count
                    DB::table('student_exam_attendance')
                        ->where('id', $seaId)
                        ->decrement('student_total_mark', $answerMark);
                    DB::table('student_exam_attendance')
                        ->where('id', $seaId)
                        ->decrement('total_correct_answers');
                } else {
                    // Was wrong, now correct: add mark and correct count
                    DB::table('student_exam_attendance')
                        ->where('id', $seaId)
                        ->increment('student_total_mark', $answerMark);
                    DB::table('student_exam_attendance')
                        ->where('id', $seaId)
                        ->increment('total_correct_answers');

                    // Undo previously deducted negative mark
                    DB::table('student_exam_attendance')
                        ->where('id', $seaId)
                        ->increment('student_total_mark', DB::raw('IFNULL(negative_marks_value, 0)'));
                }
            }
        } else {
            // First time answering this question
            DB::table('student_exam_attendance')
                ->where('student_id', $studentId)
                ->where('exam_id', $examId)
                ->update([
                    'student_total_mark' => DB::raw(
                        $isCorrect
                            ? "IFNULL(student_total_mark, 0) + $answerMark"
                            : "IFNULL(student_total_mark, 0) - IFNULL(negative_marks_value, 0)"
                    ),
                    'total_correct_answers' => DB::raw(
                        'IFNULL(total_correct_answers, 0) + ' . ($isCorrect ? 1 : 0)
                    ),
                    'total_skipped_answers' => DB::raw(
                        'IFNULL(total_skipped_answers, 0) - 1'
                    ),
                ]);
        }

        return response()->json(['ok' => true]);
    }

    public function submitTabSwitchCount($exam)
    {
        $studentId = auth()->id();

        DB::table('student_exam_attendance')
            ->where('student_id', $studentId)
            ->where('exam_id', $exam)
            ->increment('tab_switch_count');

        return response()->json(['ok' => true]);
    }
}
