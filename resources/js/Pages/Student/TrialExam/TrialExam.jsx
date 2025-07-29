import { useState } from "react"
import SubjectCard from "./SubjectCard"
import PresetExamCard from "./PresetExamCard"
import ExamModal from "./ExamModal"
import Layout from "../../../layouts/Layout"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"

const TrialExam = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)

  const subjects = [
    { name: "পদার্থবিজ্ঞান", questionCount: 25, totalQuestions: 10126, color: "info" },
    { name: "উচ্চতর গণিত", questionCount: 30, totalQuestions: 8500, color: "info" },
    { name: "ভর্তি ও মোকাবেলা প্রস্তুতি", questionCount: 45, totalQuestions: 12000, color: "warning" },
    { name: "English", questionCount: 25, totalQuestions: 7568, color: "warning" },
    { name: "পরিসংখ্যান", questionCount: 20, totalQuestions: 5000, color: "warning" },
    { name: "রসায়ন", questionCount: 25, totalQuestions: 11826, color: "info" },
    { name: "জীববিজ্ঞান", questionCount: 40, totalQuestions: 14556, color: "info" },
    { name: "বাংলা", questionCount: 30, totalQuestions: 9962, color: "warning" },
    { name: "সাধারণ জ্ঞান", questionCount: 35, totalQuestions: 15000, color: "warning" },
  ]

  const presetExams = [
    "চারি 'ক'",
    "SUST A",
    "ভার্সি এ",
    "বুয়েট প্রিলি",
    "RU A",
    "কৃষি শাখা",
    "KUET",
    "RUET preli",
    "মেডিকেল",
    "চুরি বিজ্ঞান",
    "রাবি গ (বিজ্ঞান)",
    "শুধু ক (বিজ্ঞান)",
    "জারি ডি",
    "CUET",
  ]

  const examData = {
    "চারি 'ক'": {
      title: "চারি 'ক'",
      subjects: [
        { name: "পদার্থবিজ্ঞান", questions: 15 },
        { name: "রসায়ন", questions: 15 },
      ],
      maxSelection: 2,
      selectableSubjects: [
        { id: "bangla", name: "বাংলা" },
        { id: "english", name: "English" },
        { id: "higher_math", name: "উচ্চতর গণিত" },
        { id: "biology", name: "জীববিজ্ঞান" },
      ],
      duration: 45,
    },
    "জারি ডি": {
      title: "জারি ডি",
      subjects: [
        { name: "বাংলা", questions: 4 },
        { name: "English", questions: 4 },
        { name: "বোটানি", questions: 22 },
        { name: "জুওলজি", questions: 22 },
        { name: "রসায়ন", questions: 24 },
        { name: "মানসিক দক্ষতা", questions: 4 },
      ],
      duration: 55,
    },
    "SUST A": {
      title: "SUST A",
      subjects: [
        { name: "পদার্থবিজ্ঞান", questions: 20 },
        { name: "রসায়ন", questions: 20 },
        { name: "গণিত", questions: 20 },
        { name: "ইংরেজি", questions: 20 },
      ],
      duration: 60,
    },
  }

  const handleSubjectClick = (subject) => {
    console.log("Subject clicked:", subject)
  }

  const handlePresetExamClick = (examName) => {
    const exam = examData[examName]
    if (exam) {
      setSelectedExam(exam)
      setShowModal(true)
    } else {
      console.log("Preset exam clicked:", examName)
    }
  }

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <PageHeader
        title="ট্রায়াল পরীক্ষা"
        streak={5}
      />

      <main className="flex-grow-1 p-3 bg-light">
        <div className="container-fluid">
          {/* Main Question */}
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-lg-10">
              <h3 className="text-center fw-bold text-dark mb-4">কোন বিষয়ে পরীক্ষা দিতে চাও?</h3>
            </div>
          </div>

          {/* Subject Cards */}
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-10">
              <div className="row">
                {subjects.map((subject, index) => (
                  <SubjectCard
                    key={index}
                    subject={subject.name}
                    questionCount={subject.questionCount}
                    totalQuestions={subject.totalQuestions}
                    color={subject.color}
                    onClick={() => handleSubjectClick(subject)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preset Exams */}
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <h4 className="fw-bold text-dark mb-4">প্রিসেট পরীক্ষা</h4>
              <div className="row">
                {presetExams.map((exam, index) => (
                  <PresetExamCard key={index} examName={exam} onClick={() => handlePresetExamClick(exam)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <ExamModal show={showModal} onHide={() => setShowModal(false)} examData={selectedExam} />
    </div>
  )
}

TrialExam.layout = (page) => <Layout children={page} />;
export default TrialExam
