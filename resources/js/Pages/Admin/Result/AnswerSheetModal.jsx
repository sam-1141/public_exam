import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { route } from "ziggy-js";

const AnswerSheetModal = ({
    show,
    onClose,
    student,
    course,
    loading,
    fetchResults,
}) => {
    if (!show || !student) return null;

    const answerSheet = student.answerSheet;

    const handleResetClick = async () => {
        if (
            window.confirm(
                "Are you sure you want to reset this student's answers? This action cannot be undone."
            )
        ) {
            try {
                const response = await axios.delete(
                    route("answer.sheet.reset", {
                        studentId: student?.studentId,
                        examId: student?.examId,
                    })
                );

                if (response.data?.success) {
                    onClose();
                    fetchResults();
                    alert("Answer sheet has been reset successfully.");
                } else {
                    alert("Reset failed. Server did not confirm success.");
                }
            } catch (error) {
                alert("Failed to reset answer sheet. Please try again.");
            }
        }
    };

    return (
        <div
            className="modal fade show d-block bg-dark bg-opacity-50 "
            tabIndex="-1"
            style={{ overflowY: "auto" }}
        >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Answer Sheet - {course?.name}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={loading}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {loading ? (
                            <div className="text-center py-4">
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading answer sheet...
                                    </span>
                                </div>
                                <p className="mt-2">Loading answer sheet...</p>
                            </div>
                        ) : answerSheet ? (
                            <>
                                {/* Student Details Section */}
                                <div className="row mb-4">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header bg-light">
                                                <h6 className="mb-0">
                                                    Student Details
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="mb-1">
                                                            <strong>
                                                                Student ID:
                                                            </strong>{" "}
                                                            {student.studentId}
                                                        </p>
                                                        <p className="mb-1">
                                                            <strong>
                                                                Exam:
                                                            </strong>{" "}
                                                            {
                                                                student.liveExamName
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="mb-1">
                                                            <strong>
                                                                Score:
                                                            </strong>{" "}
                                                            {student.studentTotalMarks ??
                                                                0}
                                                            /
                                                            {
                                                                student.examTotalMarks
                                                            }
                                                        </p>
                                                        <p className="mb-0">
                                                            <strong>
                                                                Submitted:
                                                            </strong>{" "}
                                                            {student.examSubmitTime
                                                                ? new Date(
                                                                      student.examSubmitTime
                                                                  ).toLocaleString()
                                                                : new Date(
                                                                      student.studentExamEndTime
                                                                  ).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Section */}
                                <div className="row mb-4">
                                    <div className="col-md-3">
                                        <div className="card bg-success text-white text-center">
                                            <div className="card-body py-3">
                                                <h4 className="card-title mb-0">
                                                    {answerSheet
                                                        .studentExamsAttendance
                                                        ?.totalCorrectAnswers ||
                                                        0}
                                                </h4>
                                                <p className="card-text mb-0">
                                                    Correct Answers
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card bg-danger text-white text-center">
                                            <div className="card-body py-3">
                                                <h4 className="card-title mb-0">
                                                    {(answerSheet
                                                        .studentExamsAttendance
                                                        ?.examTotalQuestions ||
                                                        0) -
                                                        (answerSheet
                                                            .studentExamsAttendance
                                                            ?.totalCorrectAnswers ||
                                                            0) -
                                                        (answerSheet
                                                            .studentExamsAttendance
                                                            ?.totalSkippedAnswers ||
                                                            0)}
                                                </h4>
                                                <p className="card-text mb-0">
                                                    Wrong Answers
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card bg-secondary text-white text-center">
                                            <div className="card-body py-3">
                                                <h4 className="card-title mb-0">
                                                    {answerSheet
                                                        .studentExamsAttendance
                                                        ?.totalSkippedAnswers ||
                                                        0}
                                                </h4>
                                                <p className="card-text mb-0">
                                                    Skipped Answers
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card bg-primary text-white text-center">
                                            <div className="card-body py-3">
                                                <h4 className="card-title mb-0">
                                                    {answerSheet
                                                        .studentExamsAttendance
                                                        ?.examTotalQuestions ||
                                                        0}
                                                </h4>
                                                <p className="card-text mb-0">
                                                    Total Questions
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Questions and Answers */}
                                <h6 className="mb-3">Questions & Answers</h6>
                                {answerSheet.questions &&
                                answerSheet.questions.length > 0 ? (
                                    answerSheet.questions.map(
                                        (question, index) => {
                                            const studentAnswer =
                                                answerSheet.studentsExamAnswers?.find(
                                                    (ans) =>
                                                        ans.question_id ===
                                                        question.id
                                                );

                                            return (
                                                <QuestionItem
                                                    key={question.id}
                                                    question={question}
                                                    index={index}
                                                    studentAnswer={
                                                        studentAnswer
                                                    }
                                                />
                                            );
                                        }
                                    )
                                ) : (
                                    <div className="alert alert-info">
                                        No questions data available.
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="alert alert-warning">
                                No answer sheet data available for this student.
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Close
                        </button>

                        <button
                            className="btn btn-outline-danger "
                            onClick={handleResetClick}
                            disabled={loading}
                        >
                            Reset Answers
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Question Item Component
const QuestionItem = ({ question, index, studentAnswer }) => {
    const options = JSON.parse(question.options || "[]");
    const correctOptionIndex = options.findIndex((opt) => opt.ans === true);
    const correctOptionKey = correctOptionIndex.toString();

    // Handle skipped answers (null or empty)
    const isSkipped =
        !studentAnswer ||
        studentAnswer.ans_given === null ||
        studentAnswer.ans_given === "";
    const isCorrect =
        !isSkipped && studentAnswer.ans_given === correctOptionKey;

    return (
        <div
            className={`card mb-3 ${
                isCorrect
                    ? "border-success"
                    : isSkipped
                    ? "border-warning"
                    : "border-danger"
            }`}
        >
            <div className="card-header d-flex justify-content-between align-items-start">
                <h6 className="d-flex align-items-start flex-grow-1 me-3">
                    <span className="me-2 flex-shrink-0">Q{index + 1}:</span>
                    <div
                        className="flex-grow-1"
                        style={{
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                        }}
                        dangerouslySetInnerHTML={{ __html: question.question }}
                    />
                </h6>
                <span
                    className={`badge flex-shrink-0 ${
                        isCorrect
                            ? "bg-success"
                            : isSkipped
                            ? "bg-warning"
                            : "bg-danger"
                    }`}
                >
                    {isCorrect
                        ? "Correct"
                        : isSkipped
                        ? "Skipped"
                        : "Incorrect"}
                </span>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    {options.map((option, idx) => {
                        const optionKey = idx.toString();
                        return (
                            <OptionItem
                                key={optionKey}
                                option={option.option}
                                optionKey={optionKey}
                                isCorrect={option.ans}
                                isStudentAnswer={
                                    !isSkipped &&
                                    studentAnswer.ans_given === optionKey
                                }
                            />
                        );
                    })}
                </div>

                {!isCorrect && !isSkipped && studentAnswer && (
                    <div className="mt-2 p-2 bg-light rounded">
                        <p className="mb-1">
                            <strong>Student's Answer:</strong>{" "}
                            {options[parseInt(studentAnswer.ans_given)]
                                ?.option ? (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: options[
                                            parseInt(studentAnswer.ans_given)
                                        ].option,
                                    }}
                                />
                            ) : (
                                "No answer provided"
                            )}
                        </p>
                        <p className="mb-0">
                            <strong>Correct Answer:</strong>{" "}
                            {options[correctOptionIndex]?.option ? (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: options[correctOptionIndex]
                                            .option,
                                    }}
                                />
                            ) : (
                                "No correct answer"
                            )}
                        </p>
                    </div>
                )}

                {isSkipped && (
                    <div className="mt-2 p-2 bg-light rounded">
                        <p className="mb-0 text-warning">
                            <strong>
                                This question was skipped by the student.
                            </strong>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Option Item Component
const OptionItem = ({ option, optionKey, isCorrect, isStudentAnswer }) => {
    if (!option) return null;

    let optionClass =
        "col-md-6 p-2 rounded d-flex align-items-center justify-content-between";
    if (isCorrect) {
        optionClass += " bg-success bg-opacity-10 border border-success";
    } else if (isStudentAnswer) {
        optionClass += " bg-danger bg-opacity-10 border border-danger";
    } else {
        optionClass += " bg-light";
    }

    return (
        <div className={optionClass}>
            <div className="d-flex align-items-center flex-grow-1">
                <span className="fw-bold me-2">
                    {String.fromCharCode(65 + parseInt(optionKey))}.
                </span>
                <span
                    className="flex-grow-1"
                    dangerouslySetInnerHTML={{ __html: option }}
                />
            </div>
            <div className="ms-2">
                {isCorrect && (
                    <span className="badge bg-success ms-2">Correct</span>
                )}
                {isStudentAnswer && !isCorrect && (
                    <span className="badge bg-danger ms-2">Wrong</span>
                )}
            </div>
        </div>
    );
};

export default AnswerSheetModal;
