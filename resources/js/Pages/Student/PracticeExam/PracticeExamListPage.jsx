import { useState, useEffect } from "react"
import Layout from "../../../layouts/Layout"
import { router } from "@inertiajs/react"
import { courses, subjectsByCourse } from "../../../utils/ExamQuestion/PracticeExamQuestions"

const PracticeExamListPage = () => {
    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedSubject, setSelectedSubject] = useState("")
    const [availableSubjects, setAvailableSubjects] = useState([])
    const [practiceExams, setPracticeExams] = useState([])

    const allPracticeExams = {
        physics: [
            {
                id: "phy_practice_1",
                name: "নিউটনের সূত্র - প্র্যাকটিস টেস্ট",
                subject: "পদার্থবিজ্ঞান",
                totalMarks: 50,
                duration: 30,
                totalQuestions: 10,
                difficulty: "সহজ",
                questions: [
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
            },
            {
                id: "phy_practice_2",
                name: "তাপ ও তাপগতিবিদ্যা",
                subject: "পদার্থবিজ্ঞান",
                totalMarks: 75,
                duration: 45,
                totalQuestions: 15,
                difficulty: "মধ্যম",
                questions: [],
            },
        ],
        chemistry: [
            {
                id: "chem_practice_1",
                name: "জৈব রসায়ন মৌলিক",
                subject: "রসায়ন",
                totalMarks: 60,
                duration: 40,
                totalQuestions: 12,
                difficulty: "সহজ",
                questions: [],
            },
        ],
        math: [
            {
                id: "math_practice_1",
                name: "ক্যালকুলাস প্রাথমিক",
                subject: "উচ্চতর গণিত",
                totalMarks: 80,
                duration: 60,
                totalQuestions: 16,
                difficulty: "কঠিন",
                questions: [],
            },
        ],
        bangla: [
            {
                id: "bangla_practice_1",
                name: "বাংলা সাহিত্য পরিচিতি",
                subject: "বাংলা",
                totalMarks: 40,
                duration: 30,
                totalQuestions: 8,
                difficulty: "সহজ",
                questions: [],
            },
        ],
    }

    useEffect(() => {
        if (selectedCourse) {
            setAvailableSubjects(subjectsByCourse[selectedCourse] || [])
            setSelectedSubject("")
            setPracticeExams([])
        } else {
            setAvailableSubjects([])
            setSelectedSubject("")
            setPracticeExams([])
        }
    }, [selectedCourse])

    useEffect(() => {
        if (selectedSubject) {
            setPracticeExams(allPracticeExams[selectedSubject] || [])
        } else {
            setPracticeExams([])
        }
    }, [selectedSubject])

    const handleExamClick = (exam) => {
        router.get(route('student.practice.exam', { exam: exam.id}))
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "সহজ":
                return "success"
            case "মধ্যম":
                return "warning"
            case "কঠিন":
                return "danger"
            default:
                return "primary"
        }
    }

    return (
        <div className="flex-grow-1 d-flex flex-column">
            {/* <PageHeader
        title="প্র্যাকটিস পরীক্ষা"
      /> */}

            <main className="flex-grow-1 p-3 bg-light">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10">
                            {/* Page Header */}
                            <div className="mb-4">
                                <h3 className="fw-bold text-dark mb-1">প্র্যাকটিস পরীক্ষা</h3>
                                <p className="text-muted mb-0">আপনার পছন্দের বিষয়ে অনুশীলন করুন এবং দক্ষতা বৃদ্ধি করুন</p>
                            </div>

                            {/* Filter Section */}
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    <h5 className="fw-semibold mb-3">ফিল্টার করুন</h5>
                                    <div className="row g-3">
                                        <div className="col-12 col-md-6">
                                            <label className="form-label fw-medium">কোর্স নির্বাচন করুন</label>
                                            <select
                                                className="form-select"
                                                value={selectedCourse}
                                                onChange={(e) => setSelectedCourse(e.target.value)}
                                            >
                                                <option value="">-- কোর্স নির্বাচন করুন --</option>
                                                {courses.map((course) => (
                                                    <option key={course.id} value={course.id}>
                                                        {course.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label fw-medium">বিষয় নির্বাচন করুন</label>
                                            <select
                                                className="form-select"
                                                value={selectedSubject}
                                                onChange={(e) => setSelectedSubject(e.target.value)}
                                                disabled={!selectedCourse}
                                            >
                                                <option value="">-- বিষয় নির্বাচন করুন --</option>
                                                {availableSubjects.map((subject) => (
                                                    <option key={subject.id} value={subject.id}>
                                                        {subject.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            {!selectedCourse && !selectedSubject ? (
                                /* Empty State - No Selection */
                                <div className="text-center py-5">
                                    <div
                                        className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                        style={{ width: "120px", height: "120px" }}
                                    >
                                        <span className="fs-1">📚</span>
                                    </div>
                                    <h4 className="fw-bold text-muted mb-2">প্র্যাকটিস শুরু করুন</h4>
                                    <p className="text-muted mb-0">উপরের ড্রপডাউন থেকে কোর্স এবং বিষয় নির্বাচন করে প্র্যাকটিস পরীক্ষা দেখুন</p>
                                </div>
                            ) : selectedCourse && !selectedSubject ? (
                                /* Course Selected but No Subject */
                                <div className="text-center py-5">
                                    <div
                                        className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                        style={{ width: "100px", height: "100px" }}
                                    >
                                        <span className="fs-1">📖</span>
                                    </div>
                                    <h4 className="fw-bold text-muted mb-2">বিষয় নির্বাচন করুন</h4>
                                    <p className="text-muted mb-0">
                                        {courses.find((c) => c.id === selectedCourse)?.name} কোর্স থেকে একটি বিষয় নির্বাচন করুন
                                    </p>
                                </div>
                            ) : practiceExams.length === 0 ? (
                                /* No Exams Available */
                                <div className="text-center py-5">
                                    <div
                                        className="bg-secondary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                        style={{ width: "100px", height: "100px" }}
                                    >
                                        <span className="fs-1">📝</span>
                                    </div>
                                    <h4 className="fw-bold text-muted mb-2">কোনো পরীক্ষা নেই</h4>
                                    <p className="text-muted mb-0">
                                        {availableSubjects.find((s) => s.id === selectedSubject)?.name} বিষয়ে এই মুহূর্তে কোনো প্র্যাকটিস পরীক্ষা
                                        উপলব্ধ নেই
                                    </p>
                                </div>
                            ) : (
                                /* Show Practice Exams */
                                <>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div>
                                            <h4 className="fw-bold text-dark mb-1">
                                                {availableSubjects.find((s) => s.id === selectedSubject)?.name} - প্র্যাকটিস পরীক্ষা
                                            </h4>
                                            <p className="text-muted mb-0">{practiceExams.length} টি পরীক্ষা উপলব্ধ</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {practiceExams.map((exam) => (
                                            <div key={exam.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                                <div className="card h-100 border-0 shadow-sm">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                                            <h5 className="card-title fw-bold mb-0">{exam.name}</h5>
                                                            <span className={`badge bg-${getDifficultyColor(exam.difficulty)}`}>
                                                                {exam.difficulty}
                                                            </span>
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span className="text-muted small">বিষয়:</span>
                                                                <span className="fw-semibold">{exam.subject}</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span className="text-muted small">মোট নম্বর:</span>
                                                                <span className="fw-semibold">{exam.totalMarks}</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span className="text-muted small">সময়:</span>
                                                                <span className="fw-semibold">{exam.duration} মিনিট</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span className="text-muted small">প্রশ্ন:</span>
                                                                <span className="fw-semibold">{exam.totalQuestions} টি</span>
                                                            </div>
                                                        </div>

                                                        <button className="btn btn-primary w-100 fw-semibold" onClick={() => handleExamClick(exam)}>
                                                            পরীক্ষা শুরু করুন
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

PracticeExamListPage.layout = (page) => <Layout children={page} />;
export default PracticeExamListPage
