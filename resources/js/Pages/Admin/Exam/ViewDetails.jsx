import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "../../../layouts/Layout";
import { exams, practiceExams } from "./exam";
import { route } from "ziggy-js";
import AddQuestionModal from "./AddQuestion";
import QuestionList from "./QuiestionList";

const ExamDetails = ({ examType = "live" }) => {
    const { props } = usePage();
    const examId = parseInt(props.exam);
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

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
                    className="btn  btn-sm"
                >
                    <i className="fas fa-arrow-left me-1"></i>Back
                </Link>
                <h2 className="mb-0 h4 font-semibold">Exam Details</h2>
                {isPracticeExam && (
                    <span className="badge bg-info text-dark">
                        Practice Exam
                    </span>
                )}
            </div>

            {/* Exam Card - Matching ExamCard styling */}
            <div className="card shadow-sm mb-4">
                <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h3 className="h5 card-title mb-1">
                                    {exam.title}
                                </h3>
                                <p className="card-text text-muted text-truncate-2">
                                    {exam.description}
                                </p>
                            </div>
                            <span className="badge bg-success">Published</span>
                        </div>
                    </div>

                    <div className="row mt-2">
                        {/* First Column */}
                        <div className="col-6">
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <i className="fas fa-question-circle fa-lg text-success"></i>
                                    </div>
                                    <div>
                                        <div className="fw-bold">Questions</div>
                                        <small>
                                            {exam.questionList.length}
                                        </small>
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
                                        <small>{exam.negativeMarks}</small>
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

                        {/* Second Column */}
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
                </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-2 mb-4">
                <button className="btn btn-warning btn-sm">
                    <i className="fas fa-eye-slash me-1"></i>Unpublish
                </button>
                {!isPracticeExam && (
                    <>
                        <button className="btn btn-info btn-sm">
                            <i className="fas fa-sync-alt me-1"></i>Update
                            Results
                        </button>
                        <button className="btn btn-secondary btn-sm">
                            <i className="fas fa-copy me-1"></i>Copy to Practice
                        </button>
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                                copyToClipboard(
                                    `${window.location.origin}/exams/${exam.id}`
                                )
                            }
                        >
                            <i className="fas fa-link me-1"></i>Copy Link
                        </button>
                        <button className="btn btn-outline-warning btn-sm">
                            <i className="fas fa-trophy me-1"></i>Leaderboard
                        </button>
                        <button
                            onClick={() => setShowAddQuestionModal(true)}
                            className="btn btn-warning btn-sm"
                        >
                            <i className="fas fa-plus-circle me-1"></i>Add
                            Question
                        </button>
                    </>
                )}
            </div>

            <QuestionList
                questions={exam.questionList}
                examId={exam.id}
                examType={examType}
            />

            <AddQuestionModal
                show={showAddQuestionModal}
                onClose={() => setShowAddQuestionModal(false)}
                examId={exam.id}
                examType={examType}
            />
        </div>
    );
};

ExamDetails.layout = (page) => <Layout children={page} />;
export default ExamDetails;
