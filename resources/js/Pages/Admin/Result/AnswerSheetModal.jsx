import React from "react";

const AnswerSheetModal = ({
    show,
    onClose,
    student,
    courseName,
    answerSheets,
}) => {
    if (!show || !student) return null;

    const studentAnswers = answerSheets[student.id] || [];

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {student.name}'s Answer Sheet - {courseName}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Summary Section */}
                        <div className="row mb-4">
                            <div className="col-md-3">
                                <div className="card bg-success text-white text-center">
                                    <div className="card-body py-3">
                                        <h4 className="card-title mb-0">
                                            {student.correct}
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
                                            {student.incorrect}
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
                                            {student.unattempted}
                                        </h4>
                                        <p className="card-text mb-0">
                                            Unattempted
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card bg-primary text-white text-center">
                                    <div className="card-body py-3">
                                        <h4 className="card-title mb-0">
                                            {student.total}
                                        </h4>
                                        <p className="card-text mb-0">
                                            Total Questions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Questions and Options */}
                        <div className="answer-sheet-container">
                            {studentAnswers.map((item) => (
                                <QuestionItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Separate component for each question
const QuestionItem = ({ item }) => {
    return (
        <div
            className={`card mb-3 ${
                item.status === "correct" ? "border-success" : "border-danger"
            }`}
        >
            <div className="card-header d-flex justify-content-between align-items-center">
                <p className="fw-bold">
                    Q{item.id}:{" "}
                    <span className="card-text fw-semibold mb-2">
                        {item.question}
                    </span>
                </p>
                <span
                    className={`badge ${
                        item.status === "correct" ? "bg-success" : "bg-danger"
                    }`}
                >
                    {item.status === "correct" ? "Correct" : "Incorrect"}
                </span>
            </div>
            <div className="card-body">
                {/* Options  */}
                <div className="row">
                    {item.options.map((option, index) => (
                        <OptionItem
                            key={option.id}
                            option={option}
                            item={item}
                            className={index < 2 ? "mb-3" : ""}
                        />
                    ))}
                </div>

                {item.status === "incorrect" && (
                    <div className="mt-2 p-2 bg-light rounded">
                        <small className="text-muted">
                            <strong>Explanation:</strong> The correct answer is{" "}
                            {item.correctAnswer.toUpperCase()} -{" "}
                            {
                                item.options.find(
                                    (opt) => opt.id === item.correctAnswer
                                )?.text
                            }
                        </small>
                    </div>
                )}
            </div>
        </div>
    );
};

// Separate component for each option
const OptionItem = ({ option, item, className }) => {
    const isStudentAnswer = option.id === item.studentAnswer;
    const isCorrectAnswer = option.id === item.correctAnswer;

    let optionClass = "option-item p-3 rounded ";
    if (isCorrectAnswer) {
        optionClass += "bg-success bg-opacity-10 border border-success ";
    } else if (isStudentAnswer && !isCorrectAnswer) {
        optionClass += "bg-danger bg-opacity-10 border border-danger ";
    } else {
        optionClass += "bg-light ";
    }

    return (
        <div className={`col-md-6 ${className}`}>
            <div className={optionClass}>
                <div className="form-check d-flex align-items-center h-100">
                    {/* <input
                        className="form-check-input me-3"
                        type="radio"
                        checked={isStudentAnswer}
                        readOnly
                    /> */}
                    <label className="form-check-label flex-grow-1">
                        <span className="fw-bold me-2">
                            {option.id.toUpperCase()}.
                        </span>
                        {option.text}
                    </label>
                    {isCorrectAnswer && (
                        <span className="badge bg-success ms-2">Correct</span>
                    )}
                    {isStudentAnswer && !isCorrectAnswer && (
                        <span className="badge bg-danger ms-2">
                            Student's Choice
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnswerSheetModal;
