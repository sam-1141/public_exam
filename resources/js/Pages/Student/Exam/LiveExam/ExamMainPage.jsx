"use client"

import { useState, useEffect } from "react"
import ExamTimer from "./ExamTimer"
import QuestionCard from "./QuestionCard"
import Layout from "../../../../layouts/Layout"
import { router } from "@inertiajs/react"
import FocusWarning from "../../../../components/FocusWarning"
import {route} from "ziggy-js";

const ExamMainPage = ({ exam, questions }) => {
  const [answers, setAnswers] = useState({})

  const [showSubmitModal, setShowSubmitModal] = useState(false)


    useEffect(() => {
      console.log('ExamMainPage props:', { exam, questions })
    }, [questions]);


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
    window.history.pushState(null, "", window.location.href)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const handleAnswerSelect = async (questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));

      try {
          await axios.post(route('student.exam.answer.store'), {
              exam_id: exam.id,
              question_id: questionId,
              ans_given: String(answerIndex),
          })
      } catch (err) {
          console.error('Answer save failed:', err)
      }

  };

  const handleSubmitByStudent = async (submitStatus) => {
      console.log("Submitting exam with status:", submitStatus)
      try {
          const response = await axios.post(route('student.live.exam.main.submit'), {
              examId: exam.id,
              submit_status: submitStatus,
          });
          console.log("Submit response:", response);

          if (response.data.type === 'success') {
              // Redirect to success page
              console.log(response.data.message);
          }

      } catch (error) {
          if (error.response) {
              // give general error message in modal (static text)
              console.error('Error status:', error.response.status);
              console.error('Error data:', error.response.data);
          }
      }

  }

  const handleSubmit = (isAuto = false) => {
    if (typeof isAuto !== 'boolean') {
      isAuto = false
    }
    console.log("Typeof isAuto:", typeof isAuto, "Value:", isAuto)
    if (!exam) return
    console.log("Submitting exam with answers:", answers)
    router.get(route('student.live.exam.success'), {
      examId: exam.id,
      auto: isAuto
    }, {
      preserveState: true,
      onBefore: async () => {
          const response = await axios.post(route('student.live.exam.main.submit'), {
              examId: exam.id,
              submit_status: 3,
          });

          if (response.data.type === 'success') {
              // Redirect to success page (with warning message);
              console.log(response.data.message);
          }
      }
    })

    console.log("Route hitted")
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
  const progressPercentage = (answeredCount / questions.length) * 100

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
              <ExamTimer duration={exam.duration} onTimeUp={handleSubmitByStudent} />
            </div>
            <div className="col-md-4 text-end">
              <div className="d-flex align-items-center justify-content-end">
                <span className="me-3 small text-muted">
                  উত্তর দেওয়া: {answeredCount}/{questions.length}
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
            {questions.map((question, index) => (
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
                      আপনি {answeredCount}টি প্রশ্নের উত্তর দিয়েছেন {questions.length}টির মধ্যে।
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
                      <button className="btn btn-success w-100 py-2 fw-semibold" onClick={() => handleSubmitByStudent(1)}>
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
