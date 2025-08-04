import Layout from "../../../layouts/Layout"
import LiveExamCard from "./LiveExamCard"
import ParticipationModal from "./ParticipationModal"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"
import { useState } from "react"
import { liveExams } from "../../../utils/ExamQuestion/ExamQuestions"
import { router } from "@inertiajs/react"

const ExamNoticePage = ({ isMobile, showMobileSidebar, setShowMobileSidebar, isCollapsed, setIsCollapsed }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)

  const handleExamClick = (exam) => {
    setSelectedExam(exam)
    setShowModal(true)
  }

  const handleConfirmParticipation = (exam) => {
  // Client-side navigation with Inertia
  router.get(route('student.live.exam.main'), { 
    examId: exam.id 
  }, {
    preserveState: true,
    onSuccess: () => {
      setCurrentExam(exam)
      setExamState("exam")
      setShowModal(false)
    }
  })
}

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <PageHeader
        title="লাইভ পরীক্ষা"
        streak={7}
      />

      <main className="flex-grow-1 p-1 bg-light">
        <div className="container-fluid">
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-lg-10">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h3 className="fw-bold text-dark mb-1">চলমান পরীক্ষাসমূহ</h3>
                  <p className="text-muted mb-0">এখনই অংশগ্রহণ করুন এবং আপনার দক্ষতা যাচাই করুন</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-success me-2">🔴</span>
                  <span className="small text-muted">{liveExams.filter((e) => e.status === "live").length} টি লাইভ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="row">
                {liveExams.map((exam) => (
                  <LiveExamCard key={exam.id} exam={exam} onClick={handleExamClick} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ParticipationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        exam={selectedExam}
        onConfirm={handleConfirmParticipation}
      />
    </div>
  )
}

ExamNoticePage.layout = (page) => <Layout children={page} />
export default ExamNoticePage