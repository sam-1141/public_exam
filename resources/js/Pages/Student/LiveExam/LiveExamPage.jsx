import Layout from "../../../layouts/Layout"
import LiveExamCard from "./LiveExamCard"
import ParticipationModal from "./ParticipationModal"
import ExamInterface from "./ExamInterface"
import ExamSubmission from "./ExamSubmission"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"
import { useState } from "react"
import { liveExams } from "../../../utils/ExamQuestion/ExamQuestions"

const LiveExamPage = ({ isMobile, showMobileSidebar, setShowMobileSidebar, isCollapsed, setIsCollapsed }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [examState, setExamState] = useState("list") // list, exam, submitted
  const [currentExam, setCurrentExam] = useState(null)

  // const liveExams = [
  //   {
  //     id: 1,
  //     name: "পদার্থবিজ্ঞান মডেল টেস্ট",
  //     totalMarks: 100,
  //     duration: 60,
  //     totalQuestions: 25,
  //     participants: 1247,
  //     status: "live",
  //     questions: [
  //       {
  //         id: 1,
  //         text: "নিউটনের প্রথম সূত্র কী?",
  //         options: ["বস্তু স্থির থাকলে স্থির থাকবে", "ক্রিয়া ও প্রতিক্রিয়া সমান", "বল = ভর × ত্বরণ", "উপরের সবগুলো"],
  //       },
  //       {
  //         id: 2,
  //         text: "আলোর বেগ কত?",
  //         options: ["৩×১০⁸ মিটার/সেকেন্ড", "৩×১০⁶ মিটার/সেকেন্ড", "৩×১০¹⁰ মিটার/সেকেন্ড", "৩×১০⁴ মিটার/সেকেন্ড"],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "রসায়ন লাইভ এক্সাম",
  //     totalMarks: 80,
  //     duration: 45,
  //     totalQuestions: 20,
  //     participants: 892,
  //     status: "live",
  //     questions: [
  //       {
  //         id: 1,
  //         text: "পানির রাসায়নিক সংকেত কী?",
  //         options: ["H2O", "H2O2", "HO2", "H3O"],
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "গণিত প্র্যাকটিস টেস্ট",
  //     totalMarks: 120,
  //     duration: 90,
  //     totalQuestions: 30,
  //     participants: 654,
  //     status: "starting-soon",
  //     questions: [],
  //   },
  // ]

  const handleExamClick = (exam) => {
    setSelectedExam(exam)
    setShowModal(true)
  }

  const handleConfirmParticipation = (exam) => {
    setCurrentExam(exam)
    setExamState("exam")
    setShowModal(false)
  }

  const handleExamSubmit = (answers) => {
    console.log("Exam submitted with answers:", answers)
    setExamState("submitted")
  }

  const handleBackToHome = () => {
    setExamState("list")
    setCurrentExam(null)
    setSelectedExam(null)
  }

  if (examState === "exam" && currentExam) {
    return <ExamInterface exam={currentExam} onSubmit={handleExamSubmit} />
  }

  if (examState === "submitted" && currentExam) {
    return <ExamSubmission exam={currentExam} onBackToHome={handleBackToHome} />
  }

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <PageHeader
        title="লাইভ পরীক্ষা"
        streak={7}
      />

      <main className="flex-grow-1 p-3 bg-light">
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

LiveExamPage.layout = (page) => <Layout children={page} />;
export default LiveExamPage;