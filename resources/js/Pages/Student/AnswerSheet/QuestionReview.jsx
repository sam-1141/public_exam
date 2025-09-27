const QuestionReview = ({ question, questionNumber }) => {
    const getQuestionBgColor = () => {
        if (question.userAnswer === null) return " border-warning"
        if (question.userAnswer === question.correctAnswer) return " border-success"
        return " border-danger"
    }

    const getStatusIcon = () => {
        if (question.userAnswer === null) return "⏭️"
        if (question.userAnswer === question.correctAnswer) return "✅"
        return "❌"
    }

    const getStatusText = () => {
        if (question.userAnswer === null) return "স্কিপ"
        if (question.userAnswer === question.correctAnswer) return "সঠিক উত্তর"
        return "ভুল উত্তর"
    }

    const getStatusColor = () => {
        if (question.userAnswer === null) return "text-warning"
        if (question.userAnswer === question.correctAnswer) return "text-success"
        return "text-danger"
    }

    return (
        <div className={`card mb-4 border-2 font-baloo ${getQuestionBgColor()}`}>
            <div className="card-body p-2 p-md-4">
                <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="d-flex align-items-start">
                        <span className="badge bg-primary me-3 fs-6">{questionNumber}</span>
                        <div>
                            <h6 className="mb-2 fw-semibold" dangerouslySetInnerHTML={{ __html: question.text }} />
                            <div className="d-flex align-items-center">
                                <span className="me-2">{getStatusIcon()}</span>
                                <span className={`small fw-semibold ${getStatusColor()}`}>{getStatusText()}</span>
                                <span className="ms-3 small text-muted">নম্বর: {question.marks}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-2 mb-3">
                    {question.options.map((option, index) => {
                        const isCorrect = index === question.correctAnswer
                        const isUserAnswer = index === question.userAnswer
                        const isWrongUserAnswer = isUserAnswer && !isCorrect

                        let optionClass = "btn w-100 text-start p-3 border rounded-3"

                        if (isCorrect) {
                            optionClass += " border-success bg-opacity-10"
                        } else if (isWrongUserAnswer) {
                            optionClass += " border-danger bg-opacity-10"
                        } else {
                            optionClass += " btn-outline-secondary"
                        }

                        return (
                            <div key={index} className="col-12 col-md-6">
                                <button className={optionClass} disabled>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="fw-semibold me-2">{String.fromCharCode(65 + index)}.</span>
                                            <div dangerouslySetInnerHTML={{ __html: option }} />
                                        </div>
                                        <div>
                                            {isCorrect && <span className="ms-2 text-success">✓</span>}
                                            {isWrongUserAnswer && <span className="ms-2 text-danger">✗</span>}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        )
                    })}
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="bg-light rounded-3 p-3">
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <div className="small">
                                        <span className="text-muted">সঠিক উত্তর:</span>
                                        <span className="fw-semibold text-success ms-2">
                      {String.fromCharCode(65 + question.correctAnswer)}. <span dangerouslySetInnerHTML={{ __html: question.options[question.correctAnswer] }} />
                    </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="small">
                                        <span className="text-muted">আপনার উত্তর:</span>
                                        {question.userAnswer !== null ? (
                                            <span className={`fw-semibold ms-2 ${getStatusColor()}`}>
                        {String.fromCharCode(65 + question.userAnswer)}. <span dangerouslySetInnerHTML={{ __html: question.options[question.userAnswer] }} />
                      </span>
                                        ) : (
                                            <span className="fw-semibold text-warning ms-2">স্কিপ করা</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {question.teacherNote && (
                                <div className="mt-3 pt-3 border-top">
                                    <div className="d-flex align-items-start">
                                        <span className="text-primary me-2">💡</span>
                                        <div>
                                            <div className="fw-semibold text-primary small mb-1">নোট:</div>
                                            <div
                                                className="small text-dark"
                                                dangerouslySetInnerHTML={{ __html: question.teacherNote || "" }}
                                            ></div>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionReview
