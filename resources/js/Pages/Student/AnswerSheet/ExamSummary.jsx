const ExamSummary = ({ examData }) => {
  const {
    examName,
    totalGivenTime,
    submissionTime,
    totalQuestions,
    answeredQuestions,
    skippedQuestions,
    correctAnswers,
    wrongAnswers,
    totalScore,
    obtainedScore,
  } = examData

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours} ঘন্টা ${mins} মিনিট`
    }
    return `${mins} মিনিট`
  }

  const getPercentage = (value, total) => {
    return Math.round((value / total) * 100)
  }

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="row">
          <div className="col-12 mb-4">
            <h3 className="fw-bold text-dark mb-2">{examName}</h3>
            <div className="d-flex flex-wrap gap-4 text-muted">
              <div className="d-flex align-items-center">
                <span className="me-2">⏰</span>
                <span>নির্ধারিত সময়: {formatTime(totalGivenTime)}</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-2">⏱️</span>
                <span>জমা দেওয়ার সময়: {formatTime(submissionTime)}</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-2">📊</span>
                <span className="fw-semibold text-primary">
                  {obtainedScore}/{totalScore} ({getPercentage(obtainedScore, totalScore)}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-6 col-md-3">
            <div className="text-center px-2 py-3 bg-primary bg-opacity-10 rounded-3">
              <div className="fw-bold fs-4 text-primary">{totalQuestions}</div>
              <div className="small text-muted">মোট প্রশ্ন</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="text-center px-2 py-3 bg-success bg-opacity-10 rounded-3">
              <div className="fw-bold fs-4 text-success">{correctAnswers}</div>
              <div className="small text-muted">সঠিক উত্তর</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="text-center px-2 py-3 bg-danger bg-opacity-10 rounded-3">
              <div className="fw-bold fs-4 text-danger">{wrongAnswers}</div>
              <div className="small text-muted">ভুল উত্তর</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="text-center px-2 py-3 bg-warning bg-opacity-10 rounded-3">
              <div className="fw-bold fs-4 text-warning">{skippedQuestions}</div>
              <div className="small text-muted">স্কিপ</div>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        {/* <div className="row mt-4">
          <div className="col-12">
            <div className="mb-2">
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>সঠিক উত্তর</span>
                <span>{getPercentage(correctAnswers, totalQuestions)}%</span>
              </div>
              <div className="progress mb-2" style={{ height: "6px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${getPercentage(correctAnswers, totalQuestions)}%` }}
                ></div>
              </div>
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>ভুল উত্তর</span>
                <span>{getPercentage(wrongAnswers, totalQuestions)}%</span>
              </div>
              <div className="progress mb-2" style={{ height: "6px" }}>
                <div
                  className="progress-bar bg-danger"
                  style={{ width: `${getPercentage(wrongAnswers, totalQuestions)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>স্কিপ করা</span>
                <span>{getPercentage(skippedQuestions, totalQuestions)}%</span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${getPercentage(skippedQuestions, totalQuestions)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ExamSummary
