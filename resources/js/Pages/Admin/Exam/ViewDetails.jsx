import React, { useEffect, useState } from "react";
// import { Link, router, usePage } from "@inertiajs/react";
// import Layout from "../../../layouts/Layout";
import { route } from "ziggy-js";
import QuestionList from "./QuestionList/QuiestionList";
import QuestionModal from "../../../components/Questions/QuestionModal";

const ExamDetails = ({ examType, exam, questions }) => {
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

    // const isPracticeExam = examType === "practice";

    // const copyToClipboard = (text) => {
    //     navigator.clipboard.writeText(text);
    //     alert("Exam link copied to clipboard!");
    // };

    // const toggleStatus = (id, currentStatus) => {
    //     router.put(route("exams.status.toggle", id), {
    //         publish: currentStatus ? 0 : 1,
    //     });
    // };

    // const toggleExamType = (id, currentExamType) => {
    //     router.put(route("exams.type.toggle", id), {
    //         examType: currentExamType ? 0 : 1,
    //     });
    // };

    return (
        <div className="container py-4">
            {/* <div className="d-flex justify-content-between align-items-center mb-4">
                <Link
                    href={route(
                        isPracticeExam
                            ? "admin.add.practice.exam"
                            : "admin.add.live.exam"
                    )}
                    className="btn btn-sm"
                >
                    <i className="fas fa-arrow-left me-1"></i>Back
                </Link>
                <h2 className="mb-0 h4 font-semibold">Exam Details</h2>
                {exam.exam_type === 1 && (
                    <span className="badge bg-info text-dark">
                        Practice Examb
                    </span>
                )}
            </div> */}

            {/* Exam Card  */}
            <div className="card shadow-sm mb-4">
                <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h3 className="h5 card-title mb-1">
                                    {exam.name}
                                </h3>
                                <p className="card-text text-muted text-truncate-2">
                                    {exam.description}
                                </p>
                            </div>

                            {/* {exam.publishInstant === 1 ? (
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
                            )} */}
                        </div>
                    </div>
                    {/* Course and Subject display */}
                    <div className="row mt-2 mb-3">
                        <div className="col-6">
                            {/* <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <i className="fas fa-book fa-lg text-primary"></i>
                                </div>
                                <div>
                                    <div className="fw-bold">Courses</div>
                                    <small
                                        className=" d-block"
                                        // style={{ maxWidth: "150px" }}
                                    >
                                        {exam.courseInfo
                                            ? exam?.courseInfo
                                                  .map((c) => c.course_name)
                                                  .join(", ")
                                            : "No Course"}
                                    </small>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-6">
                            <div className="d-flex align-items-center">
                                {/* <div className="me-3">
                                    <i className="fas fa-book-open fa-lg text-secondary"></i>
                                </div> */}
                                {/* <div>
                                    <div className="fw-bold">Subjects</div>
                                    <small
                                        className="text-truncate d-block"
                                        style={{ maxWidth: "150px" }}
                                    >
                                        {exam.subjectInfo
                                            ? exam?.subjectInfo
                                                  .map(
                                                      (subject) => subject.name
                                                  )
                                                  .join(", ")
                                            : "No Subject"}
                                    </small>
                                </div> */}
                            </div>
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
                                            {exam.totalQuestions
                                                ? exam.totalQuestions
                                                : "No questions"}
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
                                        <small>
                                            {exam.hasNegativeMarks
                                                ? `Yes (-${exam.negativeMarksValue} per wrong)`
                                                : "No"}
                                        </small>
                                    </div>
                                </div>

                                {(
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <i className="fas fa-calendar-alt fa-lg text-warning"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">
                                                Start Time
                                            </div>
                                            <small>
                                                {exam.startTime
                                                    ? exam.startTime
                                                    : "Not Set"}
                                            </small>
                                        </div>
                                    </div>
                                )}
                                {(
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <i className="fas fa-hourglass-half  fa-lg text-gray-600"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">
                                                Result Publish Time
                                            </div>
                                            <small>
                                                {exam.resultPublishTime
                                                    ? exam.resultPublishTime
                                                    : "Not Set"}
                                            </small>
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
                                        <small>
                                            {exam.totalMarks
                                                ? exam.totalMarks
                                                : "Not Set"}
                                        </small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <i className="fas fa-clock fa-lg text-warning"></i>
                                    </div>
                                    <div>
                                        <div className="fw-bold">Duration</div>
                                        <small>
                                            {exam.duration
                                                ? exam.duration
                                                : "Not Set"}
                                        </small>
                                    </div>
                                </div>

                                {(
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <i className="fas fa-calendar-times fa-lg text-danger"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">
                                                End Time
                                            </div>
                                            <small>
                                                {exam.endTime
                                                    ? exam.endTime
                                                    : "Not Set"}
                                            </small>
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
                {/* <button
                    className={`btn btn-${
                        exam.publishInstant ? "warning" : "success"
                    } btn-sm`}
                    onClick={() => toggleStatus(exam.id, exam.publishInstant)}
                >
                    {exam.publishInstant === 1 ? (
                        <>
                            <i className="fas fa-eye-slash me-1"></i>Unpublish
                        </>
                    ) : (
                        <>
                            <i className="fas fa-eye me-1"></i>Publish
                        </>
                    )}
                </button> */}
                {/* <button
                    className={`btn btn-success btn-sm`}
                    onClick={() => toggleExamType(exam.id, exam.exam_type)}
                >
                    {exam.exam_type === 1 ? (
                        <>
                            <i className="fas fa-copy me-1"></i>Make it Live
                            Exam
                        </>
                    ) : (
                        <>
                            <i className="fas fa-copy me-1"></i>Make it Practice
                            Exam
                        </>
                    )}
                </button> */}
                { (
                    <>
                        {/*<button className="btn btn-info btn-sm">*/}
                        {/*    <i className="fas fa-sync-alt me-1"></i>Update*/}
                        {/*    Results*/}
                        {/*</button>*/}

                        {/* <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => copyToClipboard(exam.examUrl ?? ``)}
                        >
                            <i className="fas fa-link me-1"></i>Copy Link
                        </button> */}
                        {/*<button className="btn btn-outline-warning btn-sm">*/}
                        {/*    <i className="fas fa-trophy me-1"></i>Leaderboard*/}
                        {/*</button>*/}
                        <button
                            onClick={() => setShowAddQuestionModal(true)}
                            className="btn btn-warning btn-sm"
                        >
                            <i className="fas fa-plus-circle me-1"></i>Add
                            Question
                        </button>

                        {/* <a
                            href={route("admin.answer.sheet", {
                                type: examType,
                                examSlug: exam.slug,
                            })}
                            className="btn btn-info btn-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fas fa-file-alt me-1"></i>View
                            AnswerSheet
                        </a> */}
                    </>
                )}
            </div>

            <QuestionList questions={questions}  /> 
             {/* examType={examType} */}

            <QuestionModal
                show={showAddQuestionModal}
                onClose={() => setShowAddQuestionModal(false)}
                examId={exam.id}
                examType={examType}
                mode="add"
            />
        </div>
    );
};

// ExamDetails.layout = (page) => <Layout children={page} />;
export default ExamDetails;
