"use client"

const QuestionCard = ({ question, questionNumber, onAnswerSelect, selectedAnswer, isAnswered }) => {
  return (
    <div className={`card mb-4 border-0 shadow-sm ${isAnswered ? "bg-success-subtle border border-success-subtle" : ""}`}>
      <div className="card-body p-4">
        <div className="d-flex align-items-start mb-3">
          <span className="badge bg-primary me-3 fs-6">{questionNumber}</span>
          <h6 className="mb-0 fw-semibold">{question.text}</h6>
        </div>

        {/* Question Images */}
        {question.images && question.images.length > 0 && (
          <div className="mb-4">
            {question.images.length === 1 ? (
              // Single image - full width
              <div className="text-center">
                <img
                  src={question.images[0].url}
                  alt={question.images[0].alt || `Question ${questionNumber} image`}
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
                {question.images[0].caption && (
                  <p className="text-muted small mt-2 mb-0">{question.images[0].caption}</p>
                )}
              </div>
            ) : (
              // Multiple images - grid layout
              <div className="row g-3">
                {question.images.map((image, index) => (
                  <div key={index} className={`col-12 ${question.images.length === 2 ? 'col-md-6' : question.images.length === 3 ? 'col-md-4' : 'col-md-3'}`}>
                    <div className="text-center">
                      <img
                        src={image.url}
                        alt={image.alt || `Question ${questionNumber} image ${index + 1}`}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "600px", objectFit: "contain", width: "100%" }}
                      />
                      {image.caption && (
                        <p className="text-muted small mt-2 mb-0">{image.caption}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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