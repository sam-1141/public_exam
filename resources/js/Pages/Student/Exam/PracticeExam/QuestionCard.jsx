const QuestionCard = ({ question, questionNumber, onAnswerSelect, selectedAnswer, isAnswered }) => {
  // Handle both string and already-parsed options
  let options = [];
  try {
    options = typeof question.options === 'string' 
      ? JSON.parse(question.options || "[]")
      : question.options;
  } catch (error) {
    // console.error("Invalid options format", error);
    options = [];
  }

  return (
    <div className={`card mb-4 shadow-sm font-baloo ${isAnswered ? "border-2 border-success" : ""}`}>
      <div className="card-body p-4">
        {/* Question Number & Text */}
        <div className="d-flex align-items-start mb-3">
          <span className="badge bg-primary me-3 fs-6">{questionNumber}</span>
          <h6
            className="mb-0 fw-semibold"
            dangerouslySetInnerHTML={{ __html: question.text || question.question }}
          />
        </div>

        {/* Answer Options */}
        <div className="row g-2">
          {options.map((opt, index) => (
            <div key={index} className="col-12 col-md-6">
              <button
                className={`btn w-100 text-start p-3 border rounded-3 ${
                  selectedAnswer === index ? "border-success" : "btn-outline-secondary"
                }`}
                onClick={() => onAnswerSelect(question.id, index)}
              >
                <span className="fw-semibold me-2">{String.fromCharCode(65 + index)}.</span>
                <span dangerouslySetInnerHTML={{ __html: opt.option || opt }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard