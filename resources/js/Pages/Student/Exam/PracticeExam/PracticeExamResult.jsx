import { useEffect, useState } from "react"
import { router, usePage } from '@inertiajs/react'
import Layout from "../../../../layouts/Layout"

const PracticeExamResult = ({ examId, results, exam, answers }) => {
    const { submission } = usePage().props
    console.log('Submission props', submission)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    if (submission) {
      setResult({
        ...submission,
        submittedAt: submission.submittedAt || new Date().toISOString(),
      })
    }
    setLoading(false)
  }, [submission])


    const handleBackToPracticeList = () => {
        router.visit(route('student.practice.list'))
    }

    const handleTryAgain = () => {
        router.visit(route('student.practice.exam', { exam: examId }))
    }

    if (loading) {
        return (
            <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h5 className="text-muted">ফলাফল লোড হচ্ছে...</h5>
                </div>
            </div>
        )
    }

    if (!result) {
        return (
            <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center font-baloo">
                <div className="text-center">
                    <div
                        className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{ width: "80px", height: "80px" }}
                    >
                        <span className="fs-1 text-danger">⚠️</span>
                    </div>
                    <h4 className="fw-bold text-danger mb-2">ফলাফল পাওয়া যায়নি</h4>
                    <p className="text-muted mb-3">দুঃখিত, পরীক্ষার ফলাফল প্রদর্শন করা যাচ্ছে না।</p>
                    <button
                        className="btn btn-primary"
                        onClick={handleBackToPracticeList}
                    >
                        প্র্যাকটিস লিস্টে ফিরে যান
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-vh-100 bg-light">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white border-0 text-center py-4">
                                <h3 className="fw-bold text-primary mb-2">{result.examName}</h3>
                                <p className="text-muted mb-0">{result.subject}</p>
                            </div>
                            <div className="card-body p-4">
                                {/* Result Summary */}
                                <div className="text-center mb-5">
                                    <div className="d-inline-flex align-items-center justify-content-center mb-3">
                                        <div className="position-relative">
                                            <svg width="120" height="120" viewBox="0 0 36 36" className="circular-chart">
                                                <path
                                                    className="circle-bg"
                                                    d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="#eee"
                                                    strokeWidth="3"
                                                />
                                                <path
                                                    className="circle"
                                                    strokeDasharray={`${result.percentage}, 100`}
                                                    d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="#4CAF50"
                                                    strokeWidth="3"
                                                />
                                            </svg>
                                            <div className="position-absolute top-50 start-50 translate-middle text-center">
                                                <span className="fs-1 fw-bold d-block">{result.percentage}%</span>
                                                <span className="text-muted small">স্কোর</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className={`fw-bold mb-3 ${getGradeColor(result.grade)}`}>
                                        {result.grade}
                                    </h2>
                                    <p className="lead">
                                        আপনি পেয়েছেন <strong>{result.obtainedMarks}</strong> নম্বর {result.totalMarks} এর মধ্যে
                                    </p>
                                </div>

                                {/* Detailed Stats */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-4">
                                        <div className="p-3 bg-success bg-opacity-10 rounded text-center">
                                            <h5 className="fw-bold text-success">{result.correctAnswers}</h5>
                                            <p className="mb-0 small text-muted">সঠিক উত্তর</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-3 bg-danger bg-opacity-10 rounded text-center">
                                            <h5 className="fw-bold text-danger">{result.wrongAnswers}</h5>
                                            <p className="mb-0 small text-muted">ভুল উত্তর</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-3 bg-warning bg-opacity-10 rounded text-center">
                                            <h5 className="fw-bold text-warning">{result.skippedQuestions}</h5>
                                            <p className="mb-0 small text-muted">উত্তর দেওয়া হয়নি</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-grid gap-3 d-md-flex justify-content-md-center mt-4">
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={handleBackToPracticeList}
                                    >
                                        প্র্যাকটিস লিস্টে ফিরে যান
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleTryAgain}
                                    >
                                        আবার চেষ্টা করুন
                                    </button>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-0 text-center py-3">
                                <small className="text-muted">
                                    জমা দেওয়ার সময়: {new Date(result.submittedAt).toLocaleString()}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper function to get color based on grade
const getGradeColor = (grade) => {
    switch (grade) {
        case 'A+': return 'text-success'
        case 'A': return 'text-success'
        case 'A-': return 'text-primary'
        case 'B': return 'text-info'
        case 'C': return 'text-warning'
        case 'D': return 'text-warning'
        default: return 'text-danger'
    }
}

PracticeExamResult.layout = (page) => <Layout children={page} />
export default PracticeExamResult