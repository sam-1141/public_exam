import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";

const ExamCard = ({ exam, examType = "live", setEditExamSlug }) => {
    const isPracticeExam = examType === "practice";

    const negativeMarksDisplay = exam.hasNegativeMarks
        ? (exam.negativeMarksValue !== null && exam.negativeMarksValue !== undefined)
            ? `-${exam.negativeMarksValue} per wrong`
            : "Yes"
        : "No";

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
                            <span className="badge bg-success">Published</span>
                        </div>
                        {exam.description && (
                            <p className="card-text text-muted mt-2 text-truncate-2">
                                {exam.description}
                            </p>
                        )}
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
                                        <div className="fw-bold">Negative Marks</div>
                                        <small>{negativeMarksDisplay}</small>
                                    </div>
                                </div>

                                {!isPracticeExam && (
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <i className="fas fa-calendar-alt fa-lg text-warning"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">Start Time</div>
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
                                        <div className="fw-bold">Total Marks</div>
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
                                            <div className="fw-bold">End Time</div>
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
                                exam: exam.id,
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
