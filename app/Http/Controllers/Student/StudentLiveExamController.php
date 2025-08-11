<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentLiveExamController extends Controller
{
    public function loadExamNoticePage()
    {
        $exam = DB::table('live_exams')->where('exam_type', 0)->get();
        return Inertia::render('Student/Exam/LiveExam/ExamListPage', [
            'allExam' => $exam,
        ]);
    }

    public function loadExamMainPage(Request $request)
    {
        $examSlug = $request->query('examSlug');
        $exam = DB::table('live_exams')
            ->where('slug', $examSlug)
            ->firstOrFail();

        if (!$exam) {
            return redirect()->route('student.live.exam.list');
        }

        $questions = DB::table('questions')
            ->join('exam_question', 'questions.id', '=', 'exam_question.question_id')
            ->where('exam_question.exam_id', $exam->id)
            ->select('questions.*')
            ->get();


        $studentId = auth()->user()->id;

        $exists = DB::table('student_exam_attendance')
            ->where('student_id', $studentId)
            ->where('exam_id', $exam->id)
            ->exists();

        if($exists) {
            return redirect()->route('student.live.exam.list')->withErrors(['error' => 'Already give this exam.']);
        }

        $inserted = DB::table('student_exam_attendance')->insert([
            'student_id' => $studentId,
            'exam_id' => $exam->id,
            'exam_type' => false,
            'exam_start_time' => $exam->start_time,
            'exam_end_time' => $exam->end_time,
            'student_exam_start_time' => now(),
            'student_exam_end_time' => now()->addMinutes($exam->duration),
            'submit_time' => null,
            'submit_status' => null,
            'exam_total_mark' => $exam->total_marks,
            'student_total_mark' => null,
            'total_correct_answers' => null,
            'total_skipped_answers' => null,
            'tab_switch_count' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

//        dd($inserted);

        if($inserted){
            return Inertia::render('Student/Exam/LiveExam/ExamMainPage', [
                'exam' => $exam,
                'questions' => $questions,
            ]);
        } else {
            return redirect()->route('student.live.exam.list')->withErrors(['error' => 'Failed to start the exam.']);
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
        ]);

        $studentId  = auth()->id();
        $examId     = (int) $data['exam_id'];
        $questionId = (int) $data['question_id'];
        $ansGiven   = (string) $data['ans_given'];

        $seaId = DB::table('student_exam_attendance')
            ->where('student_id', $studentId)
            ->where('exam_id', $examId)
            ->value('id');

        $correctAns = null;
        $isCorrect  = null;

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

        return response()->json(['ok' => true]);
    }
}
