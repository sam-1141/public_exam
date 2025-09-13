import Layout from "../../../../layouts/Layout"
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"
import {route} from "ziggy-js";

const PracticeExamResult = ({ submission }) => {
    const [examData, setExamData] = useState(null)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (submission) {
            // Format exam data
            const formattedExam = {
                examName: submission.examName,
                totalGivenTime: submission.exam?.duration || 60, // minutes
                submissionTime: Math.floor(submission.exam?.duration * 0.75), // dummy calculation
                totalQuestions: submission.questions?.length || 0,
                answeredQuestions: submission.results.correctAnswers + submission.results.wrongAnswers,
                skippedQuestions: submission.results.skippedQuestions,
                correctAnswers: submission.results.correctAnswers,
                wrongAnswers: submission.results.wrongAnswers,
                totalScore: submission.totalMarks,
                obtainedScore: submission.results.obtainedMarks,
                grade: submission.results.grade,
                percentage: submission.results.percentage,
                timeSpent: submission.spentTime,
                timeSpentFormatted: submission.timeSpentFormatted,
            }

            // Format questions with user answers
            const formattedQuestions = submission.questions?.map(question => {
                const options = JSON.parse(question.options || "[]")
                return {
                    id: question.id,
                    text: question.question,
                    options: options.map(opt => opt.option),
                    correctAnswer: options.findIndex(opt => opt.ans === true),
                    userAnswer: submission.answers[question.id],
                    marks: 1, // Default marks per question
                    explanation: question.explanation
                }
            })

            setExamData(formattedExam)
            setQuestions(formattedQuestions)
        }
    }, [submission])

    const handleBackClick = () => {
        router.visit(route('student.practice.exam.list'))
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes} মিনিট ${secs} সেকেন্ড`
    }

    if (!submission || !examData) {
        return (
            <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h5 className="text-muted">উত্তরপত্র লোড হচ্ছে...</h5>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-grow-1 d-flex flex-column font-baloo">
            {/* Header */}
            <div className="bg-white border-bottom py-3">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="fw-bold text-dark mb-0">উত্তরপত্র</h3>
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary">
                                {examData.obtainedScore}/{examData.totalScore}
                            </span>
                            <span className="badge bg-success">
                                {examData.grade} ({examData.percentage.toFixed(2)}%)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow-1 px-0 py-2 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {/* Exam Summary */}
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-12 mb-4">
                                            <h3 className="fw-bold text-dark mb-2">{examData.examName}</h3>
                                            <div className="d-flex flex-wrap gap-4 text-muted">
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2">⏰</span>
                                                    <span>সময় লেগেছে: {formatTime(examData.timeSpent)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-6 col-md-3">
                                            <div className="text-center px-2 py-3 bg-primary bg-opacity-10 rounded-3">
                                                <div className="fw-bold fs-4 text-primary">{examData.totalQuestions}</div>
                                                <div className="small text-muted">মোট প্রশ্ন</div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-3">
                                            <div className="text-center px-2 py-3 bg-success bg-opacity-10 rounded-3">
                                                <div className="fw-bold fs-4 text-success">{examData.correctAnswers}</div>
                                                <div className="small text-muted">সঠিক উত্তর</div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-3">
                                            <div className="text-center px-2 py-3 bg-danger bg-opacity-10 rounded-3">
                                                <div className="fw-bold fs-4 text-danger">{examData.wrongAnswers}</div>
                                                <div className="small text-muted">ভুল উত্তর</div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-3">
                                            <div className="text-center px-2 py-3 bg-warning bg-opacity-10 rounded-3">
                                                <div className="fw-bold fs-4 text-warning">{examData.skippedQuestions}</div>
                                                <div className="small text-muted">স্কিপ</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Questions Review */}
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h4 className="fw-bold text-dark mb-0">প্রশ্ন পর্যালোচনা</h4>
                                <div className="d-flex align-items-center gap-3 small">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-success rounded me-2" style={{ width: "12px", height: "12px" }}></div>
                                        <span>সঠিক</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-danger rounded me-2" style={{ width: "12px", height: "12px" }}></div>
                                        <span>ভুল</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-warning rounded me-2" style={{ width: "12px", height: "12px" }}></div>
                                        <span>স্কিপ</span>
                                    </div>
                                </div>
                            </div>

                            {questions.map((question, index) => (
                                <QuestionReview
                                    key={question.id}
                                    question={question}
                                    questionNumber={index + 1}
                                />
                            ))}

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-center gap-3 mt-4">
                                <button
                                    className="btn btn-outline-primary px-4 py-2"
                                    onClick={handleBackClick}
                                >
                                    প্র্যাকটিস লিস্টে ফিরে যান
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

// Question Review Component
const QuestionReview = ({ question, questionNumber }) => {
    const getQuestionBgColor = () => {
        if (question.userAnswer === undefined || question.userAnswer === null) return "border-warning" // Skipped
        if (question.userAnswer === question.correctAnswer) return "border-success" // Correct
        return "border-danger" // Wrong
    }

    const getStatusIcon = () => {
        if (question.userAnswer === undefined || question.userAnswer === null) return "⏭️" // Skipped
        if (question.userAnswer === question.correctAnswer) return "✅" // Correct
        return "❌" // Wrong
    }

    const getStatusText = () => {
        if (question.userAnswer === undefined || question.userAnswer === null) return "স্কিপ করা হয়েছে"
        if (question.userAnswer === question.correctAnswer) return "সঠিক উত্তর"
        return "ভুল উত্তর"
    }

    const getStatusColor = () => {
        if (question.userAnswer === undefined || question.userAnswer === null) return "text-warning"
        if (question.userAnswer === question.correctAnswer) return "text-success"
        return "text-danger"
    }

    return (
        <div className={`card mb-4 border-2 ${getQuestionBgColor()}`}>
            <div className="card-body p-2 p-md-4">
                {/* Question Header */}
                <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="d-flex align-items-start">
                        <span className="badge bg-primary me-3 fs-6">{questionNumber}</span>
                        <div>
                            <h6 className="mb-2 fw-semibold" dangerouslySetInnerHTML={{ __html: question.text }}></h6>
                            <div className="d-flex align-items-center">
                                <span className="me-2">{getStatusIcon()}</span>
                                <span className={`small fw-semibold ${getStatusColor()}`}>{getStatusText()}</span>
                                <span className="ms-3 small text-muted">নম্বর: {question.marks}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="row g-2 mb-3">
                    {question.options.map((option, index) => {
                        const isCorrect = index === question.correctAnswer
                        const isUserAnswer = index === question.userAnswer
                        const isWrongUserAnswer = isUserAnswer && !isCorrect

                        let optionClass = "btn w-100 text-start p-3 border rounded-3"

                        if (isCorrect) {
                            optionClass += " border-success"
                        } else if (isWrongUserAnswer) {
                            optionClass += " border-danger"
                        } else {
                            optionClass += " btn-outline-secondary"
                        }

                        return (
                            <div key={index} className="col-12 col-md-6">
                                <button className={optionClass} disabled>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="fw-semibold me-2">{String.fromCharCode(65 + index)}.</span>
                                            <span dangerouslySetInnerHTML={{ __html: option }}></span>
                                        </div>
                                        <div>
                                            {isCorrect && <span className="ms-2">✓</span>}
                                            {isWrongUserAnswer && <span className="ms-2">✗</span>}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        )
                    })}
                </div>

                {/* Answer Details and Explanation */}
                <div className="row">
                    <div className="col-12">
                        <div className="bg-light rounded-3 p-3">
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <div className="small">
                                        <span className="text-muted">সঠিক উত্তর:</span>
                                        <span className="fw-semibold text-success ms-2">
                                            {String.fromCharCode(65 + question.correctAnswer)}.
                                            <span dangerouslySetInnerHTML={{ __html: question.options[question.correctAnswer] }}></span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Explanation Section - Only shown if explanation exists */}
                            {question.explanation && question.explanation.trim() !== '<p></p>' && (
                                <div className="mt-3 pt-3 border-top">
                                    <div className="d-flex align-items-start">
                                        <span className="text-primary me-2">💡</span>
                                        <div>
                                            <div className="fw-semibold text-primary small mb-1">ব্যাখ্যা:</div>
                                            <div
                                                className="small text-dark"
                                                dangerouslySetInnerHTML={{ __html: question.explanation }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

PracticeExamResult.layout = (page) => <Layout children={page} />
export default PracticeExamResult
