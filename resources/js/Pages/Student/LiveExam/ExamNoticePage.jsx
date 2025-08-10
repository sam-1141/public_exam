import Layout from "../../../layouts/Layout"
import LiveExamCard from "./LiveExamCard"
import ParticipationModal from "./ParticipationModal"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"
import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"

const ExamNoticePage = ({ allExam }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [currentExam, setCurrentExam] = useState(null)
  const [examState, setExamState] = useState("notice")

  console.log("ExamNoticePage props:", { allExam })

  const handleExamClick = (exam) => {
    setSelectedExam(exam)
    setShowModal(true)
  }

  // Filter out exams that have ended
  const activeExams = allExam.filter((e) => {
    const now = new Date()
    const start = new Date(e.start_time)
    const end = new Date(e.end_time)
    return now < end // Only exams that have not ended yet
  })

  const handleConfirmParticipation = (exam) => {
    router.get(
      route("student.live.exam.main"),
      { examId: exam.id },
      {
        preserveState: true,
        onSuccess: () => {
          setCurrentExam(exam)
          setExamState("exam")
          setShowModal(false)
        },
        onError: (errors) => {
          console.error("Exam participation error:", errors)
        },
      }
    )
  }

  return (
    <div className="flex-grow-1 d-flex flex-column font-baloo">
      <main className="flex-grow-1 p-1 bg-light mt-2">
        <div>
          <div className="justify-content-center mb-4">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h3 className="fw-bold text-dark mb-1">চলমান পরীক্ষাসমূহ</h3>
                  <p className="text-muted mb-0">এখনই অংশগ্রহণ করুন এবং আপনার দক্ষতা যাচাই করুন</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-success me-2">🔴</span>
                  <span className="small text-muted">{activeExams.length} টি লাইভ</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="col-12">
              {activeExams.length > 0 ? (
                <div className="row">
                  {activeExams.map((exam) => (
                    <LiveExamCard key={exam.id} exam={exam} onClick={handleExamClick} />
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">বর্তমানে কোনো লাইভ পরীক্ষা চলমান নেই</div>
              )}
            </div>
          </div>
        </div>
      </main>

      {selectedExam && (
        <ParticipationModal
          show={showModal}
          onHide={() => setShowModal(false)}
          exam={selectedExam}
          onConfirm={handleConfirmParticipation}
        />
      )}
    </div>
  )
}


ExamNoticePage.layout = (page) => <Layout children={page} />
export default ExamNoticePage
