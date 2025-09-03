import { router } from "@inertiajs/react"
import {route} from "ziggy-js";

const ExamHistoryCard = ({ exam, date }) => {
    
  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return "text-success"
    if (percentage >= 60) return "text-warning"
    return "text-danger"
  }

  // Calculate time spent between attend time and submit time
  const calculateTimeSpent = () => {
    if (!exam.attendTime || !exam.submitTime) return "N/A";
    
    try {
      const attendTime = new Date(exam.attendTime);
      const submitTime = new Date(exam.submitTime);
      
      const timeDiff = submitTime - attendTime; // difference in milliseconds
      const minutes = Math.floor(timeDiff / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      return `${minutes} মিনিট ${seconds} সেকেন্ড`;
    } catch (error) {
      // console.error("Error calculating time spent:", error);
      return "N/A";
    }
  }

  return (
    <div className="card-body p-3 mb-3 shadow-sm bg-white rounded-md">
      <div className="row align-items-center d-flex flex-column flex-md-row">
        <div className="col-12 col-md-6 mb-2 mb-md-0 text-center text-md-start">
          <h6 className="fw-semibold mb-1">{exam.name}</h6>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start text-muted small">
            <span className="me-3">⏱️ {calculateTimeSpent()}</span>
            <span className="me-3">⏰ {date}</span>
          </div>
        </div>

        <div className="col-12 col-md-3 mb-2 mb-md-0 text-center">
          <div className={`fw-bold fs-5 ${getScoreColor(exam.score, exam.totalMarks)}`}>
            {exam.score || 0}/{exam.totalMarks}
          </div>
        </div>

        <div className="col-12 col-md-3 d-flex gap-2 justify-content-center justify-content-md-end">

            <a
                className="btn btn-outline-primary btn-sm"
                href={route("student.answer.sheet", { examSlug: exam.liveExamSlug })}
            >
                উত্তরপত্র
            </a>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => router.get(route("student.leaderboard.single.exam", exam.liveExamSlug))}
          >
            লিডারবোর্ড
          </button>
        </div>
      </div>
    </div>

  )
}

export default ExamHistoryCard