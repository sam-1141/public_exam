import { Link } from "@inertiajs/react";
import React, {useEffect} from "react";
import { route } from "ziggy-js";

const ExamCard = ({ exam, examType = "live", setEditExamSlug }) => {
    const isPracticeExam = examType === "practice";

    const negativeMarksDisplay = exam.hasNegativeMarks
        ? exam.negativeMarksValue !== null &&
          exam.negativeMarksValue !== undefined
            ? `Yes (-${exam.negativeMarksValue} per wrong)`
            : "Yes"
        : "No";

    const handleDeleteExam = () => {
        if (window.confirm("Are you sure you want to delete this exam?")) {
            axios
                // .delete(route("delete.exam", { slug: exam.slug }))
                .then(() => {
                    toast.success("Exam deleted successfully");
                    setRefresh((prev) => !prev);
                })
                .catch(() => {
                    toast.error("Failed to delete exam");
                });
        }
    };

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
                            <div>
                                {exam.forAllStudent == 1 ? (
                                    <span className="badge bg-success me-1">
                                        For All
                                    </span>
                                ) : ''}
                                {exam.byLink == 1 ? (
                                    <span className="badge bg-success me-1">
                                        By Link
                                    </span>
                                ) : ''}
                                {exam.publishInstant === 1 ? (
                                    <span className="badge bg-success">
                                        Published
                                    </span>
                                ) : (
                                    <span className="badge bg-danger">
                                        Unpublished
                                    </span>
                                )}
                            </div>
                        </div>
                        {exam.description && (
                            <p className="card-text text-muted mt-2 text-truncate-2">
                                {exam.description}
                            </p>
                        )}
                    </div>

                    {/* Course and Subject display */}
                    <div className="row mt-2 mb-2">
                        <div className="col-6">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <i className="fas fa-book fa-lg text-primary"></i>
                                </div>
                                <div>
                                    <div className="fw-bold">Courses</div>
                                    <small className="text-truncate d-block truncate-small">
                                        {exam.courseInfo.length > 0
                                            ? exam.courseInfo
                                                  .map(
                                                      (course) =>
                                                          course.course_name
                                                  )
                                                  .join(", ")
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
                                    <small className="text-truncate d-block truncate-small">
                                        {exam.subjectInfo.length > 0
                                            ? exam.subjectInfo
                                                  .map(
                                                      (subject) => subject.name
                                                  )
                                                  .join(", ")
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
                                            <small>
                                                {exam.startTime
                                                    ? exam.startTime
                                                    : "Not Set"}
                                            </small>
                                        </div>
                                    </div>
                                )}
                                {!isPracticeExam && (
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <i className="fas fa-hourglass-half  fa-lg text-gray-600"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">
                                                Result Publish Time
                                            </div>
                                            <small>
                                                {exam.resultPublishTime ||
                                                exam.result_publish_time
                                                    ? exam.resultPublishTime ||
                                                      exam.result_publish_time
                                                    : "Not Set"}
                                            </small>
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
                                        <small>
                                            {exam.duration
                                                ? exam.duration
                                                : "Not Set"}
                                        </small>
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
                                            <small>
                                                {exam.endTime
                                                    ? exam.endTime
                                                    : "Not set"}
                                            </small>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between mt-auto pt-3">
                        {/*<button*/}
                        {/*    onClick={() => handleDeleteExam(exam.slug)}*/}
                        {/*    className="btn btn-outline-danger btn-sm me-2"*/}
                        {/*>*/}
                        {/*    <i className="fas fa-trash me-1"></i> Delete*/}
                        {/*</button>*/}
                        <div>
                            {!isPracticeExam && (
                                <button
                                    onClick={() => setEditExamSlug(exam.slug)}
                                    className="btn btn-outline-warning btn-sm me-2"
                                >
                                    <i className="fas fa-edit me-1"></i> Edit
                                </button>
                            )}
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
        </div>
    );
};

export default ExamCard;
