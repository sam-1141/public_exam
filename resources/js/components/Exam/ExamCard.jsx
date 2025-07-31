import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import EditExamModal from "../../Pages/Admin/Exam/LiveExam/EditLiveExam";

const ExamCard = ({ exam }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div className="col-md-12 mb-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    {/* Exam title and description */}
                    <div className="mb-3">
                        <h3 className="h5 card-title">{exam.title}</h3>
                        <p className="card-text text-muted">
                            {exam.description}
                        </p>
                    </div>

                    <div className="row">
                        {/* Exam details */}
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Questions</span>
                                    <span className="badge bg-primary rounded-pill">
                                        {exam.questions}
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

                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Duration</span>
                                    <span>{exam.duration}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Start Time</span>
                                    <span>{exam.startTime}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>End Time</span>
                                    <span>{exam.endTime}</span>
                                </li>
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
                            href={`/exams/live/${exam.id}`}
                            className="btn btn-primary"
                        >
                            <i className="fas fa-eye me-1"></i> View Details
                        </Link>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <EditExamModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                exam={exam}
            />
        </div>
    );
};

export default ExamCard;
