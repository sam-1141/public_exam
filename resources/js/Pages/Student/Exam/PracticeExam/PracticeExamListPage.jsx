import { useState, useEffect } from "react"
import Layout from "../../../../layouts/Layout"
import { router } from "@inertiajs/react"
import { courses, subjectsByCourse } from "../../../../utils/ExamQuestion/PracticeExamQuestions"

const PracticeExamListPage = ({allExam}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const examsPerPage = 9

    useEffect(() => {
        console.log('allExam', allExam)
    }, [allExam]);

    // Sort exams from newest to oldest (assuming newer exams have higher IDs)
    const sortedExams = [...allExam].sort((a, b) => b.id - a.id)

    // Get current exams for pagination
    const indexOfLastExam = currentPage * examsPerPage
    const indexOfFirstExam = indexOfLastExam - examsPerPage
    const currentExams = sortedExams.slice(indexOfFirstExam, indexOfLastExam)
    const totalPages = Math.ceil(sortedExams.length / examsPerPage)

    const handleExamClick = (exam) => {
        router.get(route('student.practice.exam', { exam: exam.slug}))
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
        <div className="flex-grow-1 d-flex flex-column font-baloo">
            <main className="flex-grow-1 p-1 bg-light">
                <div className="">
                    <div className=" justify-content-center">
                        <div className="col-12">
                            {/* Page Header */}
                            <div className="mb-4">
                                <h3 className="fw-bold text-dark mb-1">প্র্যাকটিস পরীক্ষা</h3>
                                <p className="text-muted mb-0">সকল প্র্যাকটিস পরীক্ষা ({sortedExams.length} টি)</p>
                            </div>

                            {/* Exams Grid */}
                            {currentExams.length > 0 ? (
                                <>
                                    <div className="row">
                                        {currentExams.map((exam) => (
                                            <div key={exam.id} className="col-12 col-md-6 col-lg-4 mb-2">
                                                <div className="card  border-0 shadow-sm">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                                            <h5 className="card-title fw-bold mb-0">{exam.name}</h5>
                                                            {/* <span className={`badge bg-${getDifficultyColor(exam.difficulty)}`}>
                                                                {exam.difficulty}
                                                            </span> */}
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="mb-2">
                                                                {/* <p className="text-muted small mb-1">বর্ণনা:</p> */}
                                                                <p className="mb-0 text-wrap" style={{ fontSize: '0.9rem' }}>
                                                                    {exam.description}
                                                                </p>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span className="text-muted small">মোট নম্বর:</span>
                                                                <span className="fw-semibold">{exam.total_marks}</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span className="text-muted small">সময়:</span>
                                                                <span className="fw-semibold">{exam.duration} মিনিট</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span className="text-muted small">প্রশ্ন:</span>
                                                                <span className="fw-semibold">{exam.total_questions} টি</span>
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

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <nav className="mt-4">
                                            <ul className="pagination justify-content-center">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                    >
                                                        পূর্ববর্তী
                                                    </button>
                                                </li>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            onClick={() => setCurrentPage(number)}
                                                        >
                                                            {number}
                                                        </button>
                                                    </li>
                                                ))}

                                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        পরবর্তী
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    )}
                                </>
                            ) : (
                                /* No Exams Available */
                                <div className="text-center py-5">
                                    <div
                                        className="bg-secondary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                        style={{ width: "100px", height: "100px" }}
                                    >
                                        <span className="fs-1">📝</span>
                                    </div>
                                    <h4 className="fw-bold text-muted mb-2">কোনো পরীক্ষা নেই</h4>
                                    <p className="text-muted mb-0">বর্তমানে কোনো প্র্যাকটিস পরীক্ষা উপলব্ধ নেই</p>
                                </div>
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