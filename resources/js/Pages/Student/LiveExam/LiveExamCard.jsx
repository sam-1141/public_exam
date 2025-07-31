"use client"

const LiveExamCard = ({ exam, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "success"
      case "starting-soon":
        return "warning"
      default:
        return "secondary"
    }
  }

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title fw-bold mb-0">{exam.name}</h5>
            <span className={`badge bg-${getStatusColor(exam.status)} pulse`}>
              {exam.status === "live" ? "🔴 LIVE" : "⏰ শীঘ্রই"}
            </span>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">মোট নম্বর:</span>
              <span className="fw-semibold">{exam.totalMarks}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">সময়:</span>
              <span className="fw-semibold">{exam.duration} মিনিট</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">প্রশ্ন:</span>
              <span className="fw-semibold">{exam.totalQuestions} টি</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">অংশগ্রহণকারী:</span>
              <span className="fw-semibold">{exam.participants}</span>
            </div>
          </div>

          <button
            className={`btn w-100 fw-semibold ${exam.status === "live" ? "btn-success" : "btn-warning"}`}
            onClick={() => onClick(exam)}
            disabled={exam.status !== "live"}
          >
            {exam.status === "live" ? "অংশগ্রহণ করুন" : "শীঘ্রই শুরু"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LiveExamCard
