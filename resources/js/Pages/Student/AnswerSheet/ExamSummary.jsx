const ExamSummary = ({ examData, attendanceData }) => {
  const {
    examName,
    totalQuestions,
    skippedQuestions,
    correctAnswers,
    wrongAnswers,
    totalScore,
    obtainedScore,
  } = examData

  const calculateSpendTime = () => {
    try {
      const attendTime = new Date(attendanceData.studentExamAttendTime);
      const submitTime = new Date(attendanceData.examSubmitTime);
      const timeSpentMs = submitTime - attendTime;

      const totalSeconds = Math.floor(timeSpentMs / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return { minutes, seconds };
    } catch (error) {
      return { minutes: 0, seconds: 0 };
    }
  }

  const spendTime = calculateSpendTime();

  const formatTime = (minutes, seconds = 0) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours > 0) {
      return `${hours} ঘন্টা ${mins} মিনিট ${seconds} সেকেন্ড`
    }
    if (minutes > 0) {
      return `${mins} মিনিট ${seconds} সেকেন্ড`
    }
    return `${seconds} সেকেন্ড`
  }

  const formatGivenTime = (minutes) => {
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
    <div className="card border-0 shadow-sm mb-4 font-baloo">
      <div className="card-body p-4">
        <div className="row">
          <div className="col-12 mb-4">
            <h3 className="fw-bold text-dark mb-2">{examName}</h3>
            <div className="d-flex flex-wrap gap-4 text-muted">
              <div className="d-flex align-items-center">
                <span className="me-2">⏰</span>
                <span>নির্ধারিত সময়: {formatGivenTime(examData.totalGivenTime)}</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-2">⏱️</span>
                <span>মোট সময়: {formatTime(spendTime.minutes, spendTime.seconds)}</span>
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
      </div>
    </div>
  )
}

export default ExamSummary
