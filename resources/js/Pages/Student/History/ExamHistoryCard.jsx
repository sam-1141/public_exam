import { router } from "@inertiajs/react"

const ExamHistoryCard = ({ exam, onAnswerSheet, onLeaderboard, date }) => {
  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return "text-success"
    if (percentage >= 60) return "text-warning"
    return "text-danger"
  }

  const formatTime = (time) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const handleLeaderboardClick = () => {
    router.get(route('student.leaderboard', { examId: exam.id }));
  };

  const handleAnswerSheetClick = () => {
    router.get(route('student.answer.sheet', { examId: exam.id }));
  };

  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="card-body p-3">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-2 mb-md-0">
            <h6 className="fw-semibold mb-1">{exam.name}</h6>
            <div className="d-flex align-items-center text-muted small">
              <span className="me-3">⏱️ {exam.duration} মিনিট</span>
              <span className="me-3">⏰ {date}</span>
              {/* <span>👥 {exam.participants} জন</span> */}
            </div>
          </div>
          <div className="col-12 col-md-3 mb-2 mb-md-0">
            <div className="text-center">
              <div className={`fw-bold fs-5 ${getScoreColor(exam.score, exam.totalMarks)}`}>
                {exam.score}/{exam.totalMarks}
              </div>
              {/* <small className="text-muted">
                {Math.round((exam.score / exam.totalMarks) * 100)}% | র‍্যাঙ্ক #{exam.rank}
              </small> */}
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="d-flex gap-2 justify-content-md-end">
              <button
                className="btn btn-outline-primary btn-sm flex-fill flex-md-grow-0"
                onClick={handleAnswerSheetClick}
              >
                উত্তরপত্র
              </button>
              <button
                className="btn btn-outline-success btn-sm flex-fill flex-md-grow-0"
                onClick={handleLeaderboardClick}
              >
                লিডারবোর্ড
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamHistoryCard
