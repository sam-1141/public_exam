import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "../../../layouts/Layout";
import { exams, practiceExams } from "./exam"; // Import both exam examTypes
import { route } from "ziggy-js";
import QuestionList from "./QuiestionList";
import AddQuestionModal from "./AddQuestion";

const ExamDetails = ({ examType = "live" }) => {
    const { props } = usePage();
    const examId = parseInt(props.exam);
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

    // Select the appropriate exam data based on examType
    const exam =
        examType === "practice"
            ? practiceExams.find((e) => e.id === examId)
            : exams.find((e) => e.id === examId);

    const isPracticeExam = examType === "practice";

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Exam link copied to clipboard!");
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Link
                    href={
                        isPracticeExam
                            ? route("admin.add.practice.exam")
                            : route("admin.add.live.exam")
                    }
                    className="btn btn-outline-secondary"
                >
                    <i className="fas fa-arrow-left me-2"></i>Back to Exams
                </Link>
                <h2 className="mb-0 font-semibold text-2xl">Exam Details</h2>
                {isPracticeExam && (
                    <span className="badge bg-info text-dark">
                        Practice Exam
                    </span>
                )}
            </div>

            {/* Exam Card */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="mb-3">
                        <h3 className="h4 card-title">{exam.title}</h3>
                        <p className="card-text text-muted">
                            {exam.description}
                        </p>
                    </div>

                    <div className="row">
                        {/* Common fields for both exam examTypes */}
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Questions</span>
                                    <span className="badge bg-primary rounded-pill">
                                        {exam.questionList.length}
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

                                {/* Status field */}
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Status</span>
                                    <span className="badge bg-success">
                                        Published
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-2 mb-4">
                <button className="btn btn-warning">
                    <i className="fas fa-eye-slash me-2"></i>Unpublish
                </button>
                {!isPracticeExam && (
                    <>
                        <button className="btn btn-info">
                            <i className="fas fa-sync-alt me-2"></i>Update
                            Results
                        </button>
                        <button className="btn btn-secondary">
                            <i className="fas fa-copy me-2"></i>Copy to Practice
                            Exam
                        </button>
                        <button
                            className="btn btn-outline-primary"
                            onClick={() =>
                                copyToClipboard(
                                    `${window.location.origin}/exams/${exam.id}`
                                )
                            }
                        >
                            <i className="fas fa-link me-2"></i>Copy Link
                        </button>

                        <button className="btn btn-primary">
                            <i className="fas fa-trophy me-2"></i>Leaderboard
                        </button>

                        <button
                            onClick={() => setShowAddQuestionModal(true)}
                            className="btn btn-success"
                        >
                            <i className="fas fa-plus-circle me-2"></i> Add
                            Question
                        </button>
                    </>
                )}
            </div>

            <QuestionList
                questions={exam.questionList}
                examId={exam.id}
                examexamType={examType}
            />

            <AddQuestionModal
                show={showAddQuestionModal}
                onClose={() => setShowAddQuestionModal(false)}
                examId={exam.id}
                examexamType={examType}
            />
        </div>
    );
};

ExamDetails.layout = (page) => <Layout children={page} />;
export default ExamDetails;
