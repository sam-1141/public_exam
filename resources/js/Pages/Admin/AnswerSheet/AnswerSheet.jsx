import React, { useEffect } from "react";

const AnswerSheet = ({ examType, exam, questions }) => {
    const isPracticeExam = examType === "practice";

    // Helper function to parse options
    const parseOptions = (optionsString) => {
        try {
            return JSON.parse(optionsString);
        } catch (e) {
            return [];
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0 h4 font-semibold">Answer Sheet</h2>
            </div>

            {/* Exam Info Card - Same as ExamDetails */}
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
                        </div>
                    </div>

                    {/* Course and Subject display */}
                    <div className="row mt-2 mb-3">
                        <div className="col-6">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <i className="fas fa-book fa-lg text-primary"></i>
                                </div>
                                <div>
                                    <div className="fw-bold">Courses</div>
                                    <small className=" d-block">
                                        {exam.courseInfo
                                            ? exam?.courseInfo
                                                  .map((c) => c.course_name)
                                                  .join(", ")
                                            : "No Course"}
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
                                    <small className="text-truncate d-block">
                                        {exam.subjectInfo
                                            ? exam?.subjectInfo
                                                  .map(
                                                      (subject) => subject.name
                                                  )
                                                  .join(", ")
                                            : "No Subject"}
                                    </small>
                                </div>
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
                                            <i className="fas fa-hourglass-half fa-lg text-gray-600"></i>
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

            {/* Questions with Answers  */}
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <h5 className="mb-0">
                        <i className="fas fa-list-alt me-2"></i>Questions &
                        Answers
                    </h5>
                </div>
                <div className="card-body">
                    {questions && questions.length > 0 ? (
                        <div className="questions-container">
                            {questions.map((question, index) => {
                                const options = parseOptions(question.options);

                                return (
                                    <div
                                        key={question.id}
                                        className="question-item mb-2 pb-2 border-bottom"
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div className="text-lg question-number mb-0 d-flex align-items-start">
                                                <span className="me-2 font-medium">
                                                    Q{index + 1}:
                                                </span>
                                                <div
                                                    className="text-lg font-semibold"
                                                    dangerouslySetInnerHTML={{
                                                        __html: question.question,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Options */}
                                        <div className="options mb-3">
                                            <h6 className="font-medium mb-2">
                                                Options:
                                            </h6>
                                            {options.length > 0 ? (
                                                <ul className="list-group ">
                                                    {options.map(
                                                        (option, optIndex) => (
                                                            <li
                                                                key={optIndex}
                                                                className={`list-group-item m-1 ${
                                                                    option.ans
                                                                        ? "border-2 border-success "
                                                                        : "border-1"
                                                                }`}
                                                            >
                                                                <div className="d-flex align-items-center">
                                                                    <span className="font-medium me-2">
                                                                        {String.fromCharCode(
                                                                            65 +
                                                                                optIndex
                                                                        )}
                                                                        :
                                                                    </span>

                                                                    <div
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: option.option,
                                                                        }}
                                                                    />

                                                                    {option.ans && (
                                                                        <span className="ms-auto badge bg-success text-white">
                                                                            Correct
                                                                            Answer
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            ) : (
                                                <p className="text-muted">
                                                    No options available
                                                </p>
                                            )}
                                        </div>

                                        {/* Explanation (if available) */}
                                        {question.explanation && (
                                            <div className="explanation">
                                                <h6 className="text-info mb-2">
                                                    <i className="fas fa-lightbulb me-1"></i>
                                                    Explanation
                                                </h6>
                                                <div className="p-3 bg-info bg-opacity-10 rounded">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: question.explanation,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <i className="fas fa-question-circle fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">
                                No Questions Available
                            </h5>
                            <p className="text-muted">
                                This exam doesn't have any questions yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnswerSheet;
