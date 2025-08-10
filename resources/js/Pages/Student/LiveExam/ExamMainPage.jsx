"use client"

import { useState, useEffect } from "react"
import ExamTimer from "./ExamTimer"
import QuestionCard from "./QuestionCard"
import { liveExams } from "../../../utils/ExamQuestion/ExamQuestions"
import Layout from "../../../layouts/Layout"
import { router } from "@inertiajs/react"
import FocusWarning from "../../../components/FocusWarning"

const ExamMainPage = ({ examId, questions }) => {
  const [answers, setAnswers] = useState({})

  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [exam, setExam] = useState(null)
  // (Focus warning logic moved into FocusWarning component)


    useEffect(() => {
        console.log('questions', questions)
    }, [questions]);

  // Get exam data by ID
  useEffect(() => {
    const examData = liveExams.find(e => e.id == examId)
    if (examData) {
      setExam(examData)
    } else {
      // Redirect back to notice page if exam not found
      window.location.href = '/student/live-exam'
    }
  }, [examId])

  // (Detection moved into FocusWarning component)

  // Prevent page reload and navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ""
    }

    const handlePopState = (e) => {
      e.preventDefault()
      window.history.pushState(null, "", window.location.href)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("popstate", handlePopState)

    // Push initial state
    window.history.pushState(null, "", window.location.href)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const handleAnswerSelect = async (questionId, answerIndex) => {
    // Update local state immediately
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));

    // Send answer to server immediately
    try {
      await fetch(`/api/exams/${examId}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId,
          answerIndex,
        }),
      });
    } catch (error) {
      console.error("Failed to save answer:", error);
    }
  };


  const handleTimeUp = () => {
    handleSubmit()
  }

  const handleSubmit = (isAuto = false) => {
    if (!exam) return
    router.get(route('student.live.exam.success'), {
      examId: exam.id,
      answers: answers,
      auto: isAuto
    }, {
      preserveState: true,
      onBefore: () => {
        // Could set a submitting state here
      }
    })
  }

  if (!exam) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center font-baloo">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  const answeredCount = Object.keys(answers).length
  const progressPercentage = (answeredCount / exam.questions.length) * 100

  return (
    <div className="position-relative min-vh-100 bg-light font-baloo">
      {/* Exam Header */}
      <div className="bg-white border-bottom top-0 custom-sticky-top rounded">
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h4 className="mb-0 fw-bold">{exam.name}</h4>
              <small className="text-muted">মোট নম্বর: {exam.totalMarks}</small>
            </div>
            <div className="col-md-4 text-center">
              <ExamTimer duration={exam.duration} onTimeUp={handleTimeUp} />
            </div>
            <div className="col-md-4 text-end">
              <div className="d-flex align-items-center justify-content-end">
                <span className="me-3 small text-muted">
                  উত্তর দেওয়া: {answeredCount}/{exam.questions.length}
                </span>
                <button className="btn btn-success fw-semibold" onClick={() => setShowSubmitModal(true)}>
                  জমা দিন
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="row mt-2">
            <div className="col-12">
              <div className="progress" style={{ height: "4px" }}>
                <div className="progress-bar bg-success" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className=" py-4">
        <div className=" justify-content-center">
          <div className="col-12 ">
            {exam.questions.map((question, index) => (
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
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">পরীক্ষা জমা দিন</h5>
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
                      আপনি {answeredCount}টি প্রশ্নের উত্তর দিয়েছেন {exam.questions.length}টির মধ্যে।
                    </p>
                    <p className="text-muted small">জমা দেওয়ার পর আর পরিবর্তন করা যাবে না।</p>
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
                      <button className="btn btn-success w-100 py-2 fw-semibold" onClick={handleSubmit}>
                        জমা দিন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <FocusWarning
        maxWarnings={3}
        active={!!exam}
        onMaxWarnings={() => handleSubmit(true)}
      />
    </div>
  )
}

ExamMainPage.layout = (page) => <Layout children={page} />
export default ExamMainPage
