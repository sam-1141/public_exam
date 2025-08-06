import { Link } from "@inertiajs/react";
import React, { useState } from "react";

import { route } from "ziggy-js";
import EditExamModal from "../../Pages/Admin/Exam/EditExam";

const ExamCard = ({ exam, examType = "live" }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const isPracticeExam = examType === "practice";

    return (
        <div className="col-md-12 ">
            <div className="card shadow-sm">
                <div className="card-body">
                    {/* Exam title and description */}
                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="h4 card-title mb-0">
                                {exam.title}
                                {isPracticeExam && (
                                    <span className="badge bg-info text-dark mx-2">
                                        Practice Exam
                                    </span>
                                )}
                            </h3>
                            <span className="badge bg-success">Published</span>
                        </div>
                        <p className="card-text text-muted mt-2">
                            {exam.description}
                        </p>
                    </div>

                    <div className="row">
                        {/* Exam details - Common fields */}
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Questions</span>
                                    <span className="badge bg-primary rounded-pill">
                                        {exam.questionList?.length ||
                                            exam.questions}
                                    </span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Total marks</span>
                                    <span className="badge bg-primary rounded-pill">
                                        {exam.totalMarks}
                                    </span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Negative Marks</span>
                                    <span>{exam.negativeMarks}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Exam details - Conditional fields */}
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Duration</span>
                                    <span>{exam.duration}</span>
                                </li>

                                {/* Only show time fields for live exams */}
                                {!isPracticeExam && (
                                    <>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Start Time</span>
                                            <span>{exam.startTime}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>End Time</span>
                                            <span>{exam.endTime}</span>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="d-flex justify-content-end mt-3">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="btn btn-outline-primary me-2"
                        >
                            <i className="fas fa-edit me-1"></i> Edit
                        </button>
                        <Link
                            href={route("admin.exam.details", {
                                exam: exam.id,
                                type: examType, // Pass exam type to details page
                            })}
                            className="btn btn-primary"
                        >
                            <i className="fas fa-eye me-1"></i> View Details
                        </Link>
                    </div>
                </div>
            </div>

            {/* Edit Modal - Pass examType to handle different forms */}
            <EditExamModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                exam={exam}
                examType={examType}
            />
        </div>
    );
};

export default ExamCard;
