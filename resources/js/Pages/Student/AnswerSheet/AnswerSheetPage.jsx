import ExamSummary from "./ExamSummary"
import QuestionReview from "./QuestionReview"
import Layout from "../../../layouts/Layout"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"
import { questions } from "../../../utils/AnswerSheet/questions"

const AnswerSheetPage = () => {
  // Dummy exam data
  const examData = {
    examName: "পদার্থবিজ্ঞান মডেল টেস্ট - ২",
    totalGivenTime: 60, // minutes
    submissionTime: 45, // minutes
    totalQuestions: 10,
    answeredQuestions: 8,
    skippedQuestions: 2,
    correctAnswers: 6,
    wrongAnswers: 2,
    totalScore: 100,
    obtainedScore: 60,
  }

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <PageHeader
        title="উত্তরপত্র"
        streak={8}
      />

      <main className="flex-grow-1 px-0 py-2 bg-light">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              {/* Exam Summary */}
              <ExamSummary examData={examData} />

              {/* Questions Review */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="fw-bold text-dark mb-0">প্রশ্ন পর্যালোচনা</h4>
                <div className="d-flex align-items-center gap-3 small">
                  <div className="d-flex align-items-center">
                    <div className="bg-success rounded me-2" style={{ width: "12px", height: "12px" }}></div>
                    <span>সঠিক</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-danger rounded me-2" style={{ width: "12px", height: "12px" }}></div>
                    <span>ভুল</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-warning rounded me-2" style={{ width: "12px", height: "12px" }}></div>
                    <span>স্কিপ</span>
                  </div>
                </div>
              </div>

              {questions.map((question, index) => (
                <QuestionReview key={question.id} question={question} questionNumber={index + 1} />
              ))}

              {/* Back Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary px-4 py-2 fw-semibold" onClick={handleBackClick}>ফিরে যান</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

AnswerSheetPage.layout = (page) => <Layout children={page} />;
export default AnswerSheetPage
