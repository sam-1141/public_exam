"use client"

const QuestionCard = ({ question, questionNumber, onAnswerSelect, selectedAnswer, isAnswered }) => {
  return (
    <div className={`card mb-4 border-0 shadow-sm ${isAnswered ? "bg-success-subtle border border-success-subtle" : ""}`}>
      <div className="card-body p-4">
        <div className="d-flex align-items-start mb-3">
          <span className="badge bg-primary me-3 fs-6">{questionNumber}</span>
          <h6 className="mb-0 fw-semibold">{question.text}</h6>
        </div>

        <div className="row g-2">
          {question.options.map((option, index) => (
            <div key={index} className="col-12 col-md-6">
              <button
                className={`btn w-100 text-start p-3 border rounded-3 ${
                  selectedAnswer === index ? "btn-success text-white" : "btn-outline-secondary"
                }`}
                onClick={() => onAnswerSelect(question.id, index)}
                disabled={isAnswered}
              >
                <span className="fw-semibold me-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
