"use client"

import { useState, useEffect } from "react"
import ExamTimer from "./ExamTimer"
import QuestionCard from "./QuestionCard"
import { liveExams } from "../../../utils/ExamQuestion/ExamQuestions"
import Layout from "../../../layouts/Layout"
import { router } from "@inertiajs/react"

const ExamMainPage = ({ examId }) => {
  const [answers, setAnswers] = useState({})
  
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [exam, setExam] = useState(null)
  // Anti-cheat / focus warnings
  const [warningCount, setWarningCount] = useState(0)
  const [showFocusWarning, setShowFocusWarning] = useState(false)
  const [lastWarningReason, setLastWarningReason] = useState(null)
  const MAX_WARNINGS = 3

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

  // Focus / tab switch / minimize detection
  useEffect(() => {
    let lastEventAt = 0

    const triggerWarning = (reason) => {
      // Avoid double-count (visibility + blur firing together)
      const now = Date.now()
      if (now - lastEventAt < 800) return
      lastEventAt = now

      setWarningCount((prev) => {
        const next = prev + 1
        if (next <= MAX_WARNINGS) {
          setLastWarningReason(reason)
          setShowFocusWarning(true)
          // Auto-hide after 5s
          setTimeout(() => setShowFocusWarning(false), 5000)
        }
        // Optional: auto submit after max warnings
        if (next >= MAX_WARNINGS) {
          // Give a very brief moment to show message then submit
          setTimeout(() => {
            if (exam) {
              handleSubmit(true) // silent flag
            }
          }, 1200)
        }
        return next
      })
    }

    const handleVisibility = () => {
      if (document.hidden) {
        triggerWarning('tab-change')
      }
    }

    const handleBlur = () => {
      // Window lost focus (could be alt-tab or minimize)
      if (!document.hidden) {
        // Still visible but blurred (e.g., OS-level overlay) – treat as potential minimize/other
        triggerWarning('window-blur')
      }
    }

    window.addEventListener('blur', handleBlur)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam])

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

  const handleAnswerSelect = (questionId, answerIndex) => {
    if (answers[questionId] !== undefined) return // Already answered

    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleTimeUp = () => {
    handleSubmit()
  }

  const handleSubmit = (isAuto = false) => {
    if (!exam) return
    router.get(route('student.live.exam.success'), {
      examId: exam.id,
      answers: answers,
      auto: isAuto,
      warnings: warningCount
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
      {/* Focus / Proctoring Warning Banner */}
      {showFocusWarning && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-2" style={{ zIndex: 1080, maxWidth: 480, width: '100%' }}>
          <div className={`alert mb-0 shadow-sm border-0 ${warningCount >= MAX_WARNINGS ? 'alert-danger' : 'alert-warning'}`}>
            <div className="d-flex align-items-start">
              <div className="me-2 fs-4">⚠️</div>
              <div className="flex-grow-1">
                <strong>সতর্কবার্তা {warningCount}/{MAX_WARNINGS}:</strong>{' '}
                {warningCount < MAX_WARNINGS && (
                  <span>পরীক্ষার সময় অন্য ট্যাবে যাওয়া বা মিনিমাইজ করা নিষিদ্ধ। আরও {MAX_WARNINGS - warningCount} বার করলে পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হবে।</span>
                )}
                {warningCount >= MAX_WARNINGS && (
                  <span>সর্বোচ্চ সতর্কবার্তা পৌঁছেছে। আপনার পরীক্ষা জমা দেওয়া হচ্ছে...</span>
                )}
                <div className="small text-muted mt-1">কারণ: {lastWarningReason === 'tab-change' ? 'ট্যাব পরিবর্তন / মিনিমাইজ' : 'উইন্ডো ফোকাস হারানো'}</div>
              </div>
              <button type="button" className="btn-close ms-2" onClick={() => setShowFocusWarning(false)}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

ExamMainPage.layout = (page) => <Layout children={page} />
export default ExamMainPage