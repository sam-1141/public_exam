import { useState } from "react"
import Layout from "../../../../layouts/Layout"
import { router } from "@inertiajs/react"
import {route} from "ziggy-js";

const PracticeExamListPage = ({allExam}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedCourses, setExpandedCourses] = useState({})
    const examsPerPage = 9

    const sortedExams = [...allExam].sort((a, b) => b.id - a.id)

    // Group exams by course
    const examsByCourse = {};
    sortedExams.forEach(exam => {
        if (exam.courseInfo && exam.courseInfo.length > 0) {
            const courseId = exam.courseInfo[0].id;
            const courseName = exam.courseInfo[0].course_name;

            if (!examsByCourse[courseId]) {
                examsByCourse[courseId] = {
                    name: courseName,
                    exams: []
                };
            }

            examsByCourse[courseId].exams.push(exam);
        }
    });

    // Get current courses for pagination
    const courseIds = Object.keys(examsByCourse);
    const indexOfLastCourse = currentPage * examsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - examsPerPage;
    const currentCourseIds = courseIds.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(courseIds.length / examsPerPage);

    const handleExamClick = (exam) => {
        router.get(route('student.exam.notice', { examSlug: exam.slug}))
    }

    const toggleCourse = (courseId) => {
        setExpandedCourses(prev => ({
            ...prev,
            [courseId]: !prev[courseId]
        }));
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

                            {/* Courses with Exams */}
                            {currentCourseIds.length > 0 ? (
                                <>
                                    <div className="row">
                                        {currentCourseIds.map(courseId => {
                                            const course = examsByCourse[courseId];
                                            const isExpanded = expandedCourses[courseId];

                                            return (
                                                <div key={courseId} className="col-12 mb-3">
                                                    {/* Course Header */}
                                                    <div
                                                        className="card border-0 shadow-sm mb-2 cursor-pointer"
                                                        onClick={() => toggleCourse(courseId)}
                                                    >
                                                        <div className="card-body py-3">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <h5 className="card-title fw-bold mb-0">{course.name}</h5>
                                                                <span className="ms-2">
                                                                    {isExpanded ? '▲' : '▼'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Exams for this course */}
                                                    {isExpanded && (
                                                        <div className="row">
                                                            {course.exams.map((exam) => (
                                                                <div key={exam.id} className="col-12 col-md-6 col-lg-4 mb-2">
                                                                    <div className="card border-0 shadow-sm">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                                                <h5 className="card-title fw-bold mb-0">{exam.name}</h5>
                                                                            </div>

                                                                            <div className="mb-3">
                                                                                <div className="mb-2">
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
                                                    )}
                                                </div>
                                            );
                                        })}
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
