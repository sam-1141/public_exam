"use client"

import { useState, useEffect } from "react"
import Layout from "../../../layouts/Layout"
import ExamTimer from "../LiveExam/ExamTimer"
import QuestionCard from "../LiveExam/QuestionCard"
import { router, usePage } from "@inertiajs/react"

const PracticeExamPage = () => {
  const { examId } = usePage().props;
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  useEffect(() => {
    // Simulate loading exam data (replace with actual API call if needed)
    const loadExamData = () => {
      // Generate a practice exam based on examId
      const practiceExam = {
        id: examId,
        name: "প্র্যাকটিস পরীক্ষা",
        subject: "পদার্থবিজ্ঞান", // Default subject
        totalQuestions: 10,
        totalMarks: 50,
        duration: 1800, // 30 minutes in seconds
        questions: generateSampleQuestions(10, "পদার্থবিজ্ঞান")
      }
      setExam(practiceExam)
      setLoading(false)
    }

    loadExamData()
  }, [examId])

  const generateSampleQuestions = (count, subject) => {
    const sampleQuestions = {
      পদার্থবিজ্ঞান: [
        {
          id: 1,
          text: "নিউটনের প্রথম সূত্র কী?",
          options: ["বস্তু স্থির থাকলে স্থির থাকবে", "ক্রিয়া ও প্রতিক্রিয়া সমান", "বল = ভর × ত্বরণ", "উপরের সবগুলো"],
          correctAnswer: 0,
          marks: 5,
        },
        {
          id: 2,
          text: "আলোর বেগ কত?",
          options: ["৩×১০⁸ মিটার/সেকেন্ড", "৩×১০⁶ মিটার/সেকেন্ড", "৩×১০¹⁰ মিটার/সেকেন্ড", "৩×১০⁴ মিটার/সেকেন্ড"],
          correctAnswer: 0,
          marks: 5,
        },
      ],
      রসায়ন: [
        {
          id: 1,
          text: "পানির রাসায়নিক সংকেত কী?",
          options: ["H2O", "H2O2", "HO2", "H3O"],
          correctAnswer: 0,
          marks: 5,
        },
      ],
      বাংলা: [
        {
          id: 1,
          text: "রবীন্দ্রনাথ ঠাকুর কত সালে নোবেল পুরস্কার পান?",
          options: ["১৯১২", "১৯১৩", "১৯১৪", "১৯১৫"],
          correctAnswer: 1,
          marks: 5,
        },
      ],
    }

    const questions = sampleQuestions[subject] || sampleQuestions["পদার্থবিজ্ঞান"]

    // Generate enough questions to meet the count requirement
    const generatedQuestions = []
    for (let i = 0; i < count; i++) {
      const baseQuestion = questions[i % questions.length]
      generatedQuestions.push({
        ...baseQuestion,
        id: i + 1 // Ensure unique IDs
      })
    }

    return generatedQuestions
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
    if (!exam || !exam.id) {
      console.error("Exam ID is missing!");
      return;
    }

    const results = calculateResults(exam, answers);
    console.log("Exam ID:", exam?.id);

    router.post(route('student.practice.exam.result', { exam: exam.id }), {
      examName: exam.name,
      subject: exam.subject,
      totalMarks: exam.totalMarks,
      answers: answers,
      results: results,
    }, {
      preserveScroll: true,
      preserveState: false, // Important to reset component state
      onSuccess: () => {
        // No need to navigate manually
      },
      onError: (errors) => {
        console.error('Submission failed:', errors);
      }
    });
  }


  const calculateResults = (exam, answers) => {
    let correctAnswers = 0
    let wrongAnswers = 0
    let skippedQuestions = 0
    let obtainedMarks = 0

    exam.questions.forEach((question) => {
      const userAnswer = answers[question.id]
      if (userAnswer === undefined || userAnswer === null) {
        skippedQuestions++
      } else if (userAnswer === question.correctAnswer) {
        correctAnswers++
        obtainedMarks += question.marks || 5
      } else {
        wrongAnswers++
      }
    })

    const percentage = Math.round((obtainedMarks / exam.totalMarks) * 100)
    let grade = "F"
    if (percentage >= 80) grade = "A+"
    else if (percentage >= 70) grade = "A"
    else if (percentage >= 60) grade = "A-"
    else if (percentage >= 50) grade = "B"
    else if (percentage >= 40) grade = "C"
    else if (percentage >= 33) grade = "D"

    return {
      correctAnswers,
      wrongAnswers,
      skippedQuestions,
      obtainedMarks,
      percentage,
      grade,
    }
  }

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
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
  const progressPercentage = (answeredCount / exam.questions.length) * 100

  return (
    <div className="min-vh-100 bg-light">
      {/* Exam Header */}
      <div className="bg-white border-bottom sticky-top">
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
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
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
                  <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "80px", height: "80px" }}>
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