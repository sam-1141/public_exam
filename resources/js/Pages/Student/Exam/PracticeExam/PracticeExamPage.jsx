import { useState, useEffect } from "react"
import Layout from "../../../../layouts/Layout"
import { router } from "@inertiajs/react"
import QuestionCard from "./QuestionCard"
import ExamTimer from "./ExamTimer"
import {route} from "ziggy-js";

const PracticeExamPage = ({ exam, questions }) => {
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState({})
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [spentTime, setSpentTime] = useState(0)

  const parsedQuestions = questions.map(question => {
    const options = JSON.parse(question.options || "[]")
    return {
      id: question.id,
      text: question.question,
      options: options,
      correctAnswer: options.findIndex(option => option.ans === true),
      marks: question.marks || 1
    }
  })

  const formattedExam = {
    ...exam,
    questions: parsedQuestions,
    totalMarks: exam.total_marks || parsedQuestions.length,
    totalQuestions: exam.total_questions || parsedQuestions.length,
    hasNegativeMarks: exam.has_negative_marks || false,
    negativeMarksValue: exam.negative_marks_value || 0
  }

  // Prevent page reload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [])

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleTimeUp = () => {
    handleExamSubmit(answers)
  }

  const handleExamSubmit = (answers) => {
    const results = calculateResults(formattedExam, answers)

    router.post(route('student.practice.exam.result', { exam: exam.id }), {
      examData: exam,
      questions: questions,
      examName: exam.name,
      totalMarks: formattedExam.totalMarks,
      answers: answers,
      results: results,
      spentTime: spentTime,
    }, {
      preserveScroll: true,
      preserveState: false,
      onSuccess: () => { },
      onError: (errors) => {
        // console.error('Submission failed:', errors)
      }
    })
  }

  const calculateResults = (exam, answers) => {
    let correctAnswers = 0
    let wrongAnswers = 0
    let skippedQuestions = 0
    let obtainedMarks = 0
    let totalMarks = exam.totalMarks

    exam.questions.forEach((question) => {
      const userAnswer = answers[question.id]

      if (userAnswer === undefined || userAnswer === null) {
        skippedQuestions++
      } else if (userAnswer === question.correctAnswer) {
        correctAnswers++
        obtainedMarks += question.marks
      } else {
        wrongAnswers++
        // Apply negative marking if enabled
        if (exam.hasNegativeMarks) {
          obtainedMarks -= exam.negativeMarksValue
        }
      }
    })

    // Ensure obtained marks don't go below zero
    obtainedMarks = Math.max(0, obtainedMarks)

    const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0

    return {
      correctAnswers,
      wrongAnswers,
      skippedQuestions,
      obtainedMarks,
      totalMarks,
      percentage,
      grade: calculateGrade(percentage)
    }
  }

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'A-'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C'
    if (percentage >= 40) return 'D'
    return 'F'
  }

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center font-baloo">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted">প্র্যাকটিস পরীক্ষা লোড হচ্ছে...</h5>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div
            className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: "80px", height: "80px" }}
          >
            <span className="fs-1 text-danger">⚠️</span>
          </div>
          <h4 className="fw-bold text-danger mb-2">পরীক্ষা পাওয়া যায়নি</h4>
          <p className="text-muted mb-3">দুঃখিত, এই প্র্যাকটিস পরীক্ষাটি খুঁজে পাওয়া যায়নি।</p>
          <button className="btn btn-primary" onClick={() => window.history.back()}>
            ফিরে যান
          </button>
        </div>
      </div>
    )
  }

  const answeredCount = Object.keys(answers).length
  const progressPercentage = (answeredCount / formattedExam.questions.length) * 100

  return (
    <div className="position-relative min-vh-100 bg-light">
      {/* Exam Header */}
      <div className="bg-white border-bottom top-0 custom-sticky-top rounded">
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h4 className="mb-0 fw-bold">{formattedExam.name}</h4>
              <small className="text-muted">মোট নম্বর: {formattedExam.totalMarks}</small>
              {formattedExam.hasNegativeMarks && (
                <small className="text-danger ms-2">(নেগেটিভ মার্কিং: -{formattedExam.negativeMarksValue})</small>
              )}
            </div>
            <div className="col-md-4 text-center">
              <ExamTimer
                duration={formattedExam.duration}
                onTimeUp={handleTimeUp}
                onTimeChange={(secondsSpent) => setSpentTime(secondsSpent)}
              />
            </div>
            <div className="col-md-4 text-end">
              <div className="d-flex align-items-center justify-content-end">
                <span className="me-3 small text-muted">
                  উত্তর দেওয়া: {answeredCount}/{formattedExam.questions.length}
                </span>
                <button
                  className="btn btn-success fw-semibold"
                  onClick={() => setShowSubmitModal(true)}
                  disabled={answeredCount === 0}
                >
                  জমা দিন
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="row mt-2">
            <div className="col-12">
              <div className="progress" style={{ height: "4px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="py-4">
        <div className="justify-content-center">
          <div className="col-12">
            {formattedExam.questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                questionNumber={index + 1}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswer={answers[question.id]}
                isAnswered={answers[question.id] !== undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">পরীক্ষা জমা দিন</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSubmitModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center py-4">
                <div className="mb-4">
                  <div
                    className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <span className="fs-1">⚠️</span>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">আপনি কি নিশ্চিত?</h5>
                  <p className="text-muted mb-3">
                    আপনি {answeredCount}টি প্রশ্নের উত্তর দিয়েছেন {formattedExam.questions.length}টির মধ্যে।
                  </p>
                  {formattedExam.hasNegativeMarks && (
                    <p className="text-danger small mb-0">
                      মনে রাখবেন: ভুল উত্তরের জন্য {formattedExam.negativeMarksValue} নম্বর কাটা যাবে
                    </p>
                  )}
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <button
                      className="btn btn-outline-secondary w-100 py-2"
                      onClick={() => setShowSubmitModal(false)}
                    >
                      বাতিল
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-success w-100 py-2 fw-semibold"
                      onClick={() => {
                        handleExamSubmit(answers)
                        setShowSubmitModal(false)
                      }}
                    >
                      জমা দিন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

PracticeExamPage.layout = (page) => <Layout children={page} />
export default PracticeExamPage
