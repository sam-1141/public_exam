import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";

const ExamCard = ({ exam, examType = "live", setEditExamSlug }) => {
    console.log("Exam card", exam);

    const isPracticeExam = examType === "practice";

    const negativeMarksDisplay = exam.hasNegativeMarks
        ? exam.negativeMarksValue !== null &&
          exam.negativeMarksValue !== undefined
            ? `Yes (-${exam.negativeMarksValue} per wrong)`
            : "Yes"
        : "No";

    // // Function to display course names
    // const displayCourses = () => {
    //     if (!exam.courses) return "No courses";
    //     if (Array.isArray(exam.courses)) {
    //         return exam.courses.length > 0
    //             ? exam.courses.map((c) => c.course_name || c.name).join(", ")
    //             : "No courses";
    //     }
    //     return exam.courses;
    // };

    // // Function to display subject names
    // const displaySubjects = () => {
    //     if (!exam.subjects) return "No subjects";
    //     if (Array.isArray(exam.subjects)) {
    //         return exam.subjects.length > 0
    //             ? exam.subjects.map((s) => s.name).join(", ")
    //             : "No subjects";
    //     }
    //     return exam.subjects;
    // };

    return (
        <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h3 className="h5 card-title mb-1 text-wrap">
                                    {exam.name}
                                </h3>
                                {isPracticeExam && (
                                    <span className="badge bg-info text-dark">
                                        Practice Exam
                                    </span>
                                )}
                            </div>
                            {exam.publishInstant === 1 ? (
                                <>
                                    <span className="badge bg-success">
                                        Published
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="badge bg-danger">
                                        Unpublished
                                    </span>
                                </>
                            )}
                        </div>
                        {exam.description && (
                            <p className="card-text text-muted mt-2 text-truncate-2">
                                {exam.description}
                            </p>
                        )}
                    </div>

                    {/* Course and Subject display */}
                    <div className="row mt-2 mb-3">
                        <div className="col-6">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <i className="fas fa-book fa-lg text-primary"></i>
                                </div>
                                <div>
                                    <div className="fw-bold">Courses</div>
                                    <small
                                        className="text-truncate d-block"
                                        style={{ maxWidth: "150px" }}
                                    >
                                        {exam.course
                                            ? exam.course.name
                                            : "No courses"}
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <i className="fas fa-book-open fa-lg text-secondary"></i>
                                </div>
                                <div>
                                    <div className="fw-bold">Subjects</div>
                                    <small
                                        className="text-truncate d-block"
                                        style={{ maxWidth: "150px" }}
                                    >
                                        {exam.subject
                                            ? exam.subject.name
                                            : "No subjects"}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-6">
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <i className="fas fa-question-circle fa-lg text-success"></i>
                                    </div>
                                    <div>
                                        <div className="fw-bold">Questions</div>
                                        <small>{exam.totalQuestions}</small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <i className="fas fa-times-circle fa-lg text-danger"></i>
                                    </div>
                                    <div>
                                        <div className="fw-bold">
                                            Negative Marks
                                        </div>
                                        <small>{negativeMarksDisplay}</small>
                                    </div>
                                </div>

                                {!isPracticeExam && (
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <i className="fas fa-calendar-alt fa-lg text-warning"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">
                                                Start Time
                                            </div>
                                            <small>{exam.startTime}</small>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <i className="fas fa-check-circle fa-lg text-info"></i>
                                    </div>
                                    <div>
                                        <div className="fw-bold">
                                            Total Marks
                                        </div>
                                        <small>{exam.totalMarks}</small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <i className="fas fa-clock fa-lg text-warning"></i>
                                    </div>
                                    <div>
                                        <div className="fw-bold">Duration</div>
                                        <small>{exam.duration}</small>
                                    </div>
                                </div>

                                {!isPracticeExam && (
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <i className="fas fa-calendar-times fa-lg text-danger"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">
                                                End Time
                                            </div>
                                            <small>{exam.endTime}</small>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-auto pt-3">
                        <button
                            onClick={() => setEditExamSlug(exam.slug)}
                            className="btn btn-outline-warning btn-sm me-2"
                        >
                            <i className="fas fa-edit me-1"></i> Edit
                        </button>
                        <Link
                            href={route("admin.exam.details", {
                                exam: exam.slug,
                                type: examType,
                            })}
                            className="btn btn-warning btn-sm"
                        >
                            <i className="fas fa-eye me-1"></i> View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamCard;
