const SubjectCard = ({ subject, questionCount, totalQuestions, color = "info", onClick }) => {
  const colorClasses = {
    info: "bg-info bg-opacity-20 border-info",
    warning: "bg-warning bg-opacity-20 border-warning",
    success: "bg-success bg-opacity-20 border-success",
  }

  return (
    <div className="col-12 col-md-6 mb-3">
      <button
        className={`btn w-100 text-start p-3 border-2 rounded-3 ${colorClasses[color] || colorClasses.info}`}
        onClick={onClick}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="fw-semibold text-dark mb-1">{subject}</div>
            <div
              className={`small border-start border-3 ps-2 ${color === "info" ? "border-info" : color === "warning" ? "border-warning" : "border-success"}`}
            >
              {questionCount} / {totalQuestions} টি প্রশ্ন
            </div>
        </div>
      </button>
    </div>
  )
}

export default SubjectCard
