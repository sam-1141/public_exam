import React from "react";

const AnswerSheetModal = ({ show, onClose, student, courseName, loading }) => {
    if (!show || !student) return null;

    const answerSheet = student.answerSheet;

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Student ID: {student.studentId} - {courseName}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

// Question Item Component
const QuestionItem = ({ question, index, studentAnswer }) => {
    const isCorrect =
        studentAnswer && studentAnswer.ans_given === question.correct_answer;

    return (
        <div
            className={`card mb-3 ${
                isCorrect ? "border-success" : "border-danger"
            }`}
        >
            <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                    Q{index + 1}: {question.question}
                </h6>
                <span
                    className={`badge ${
                        isCorrect ? "bg-success" : "bg-danger"
                    }`}
                >
                    {isCorrect ? "Correct" : "Incorrect"}
                </span>
            </div>
            <div className="card-body">
                <div className="row">
                    {["option_a", "option_b", "option_c", "option_d"].map(
                        (optionKey) => (
                            <OptionItem
                                key={optionKey}
                                option={question[optionKey]}
                                optionKey={optionKey}
                                isCorrect={
                                    question.correct_answer === optionKey
                                }
                                isStudentAnswer={
                                    studentAnswer &&
                                    studentAnswer.ans_given === optionKey
                                }
                            />
                        )
                    )}
                </div>

                {!isCorrect && studentAnswer && (
                    <div className="mt-3 p-2 bg-light rounded">
                        <p className="mb-1">
                            <strong>Student's Answer:</strong>{" "}
                            {studentAnswer.answer}
                        </p>
                        <p className="mb-0">
                            <strong>Correct Answer:</strong>{" "}
                            {question.correct_answer}
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

    let optionClass = "col-md-6 mb-2 p-2 rounded ";
    if (isCorrect) {
        optionClass += "bg-success bg-opacity-10 border border-success ";
    } else if (isStudentAnswer) {
        optionClass += "bg-danger bg-opacity-10 border border-danger ";
    } else {
        optionClass += "bg-light ";
    }

    return (
        <div className={optionClass}>
            <div className="d-flex align-items-center">
                <span className="fw-bold me-2">
                    {optionKey.replace("option_", "").toUpperCase()}.
                </span>
                <span>{option}</span>
                {isCorrect && (
                    <span className="badge bg-success ms-2">Correct</span>
                )}
                {isStudentAnswer && !isCorrect && (
                    <span className="badge bg-danger ms-2">
                        Student's Choice
                    </span>
                )}
            </div>
        </div>
    );
};

export default AnswerSheetModal;
