import Layout from "../../../../layouts/Layout";
import LiveExamCard from "./LiveExamCard";
import ParticipationModal from "./ParticipationModal";
import PageHeader from "../../../../components/Student/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const ExamListPage = ({ allExam }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentExam, setCurrentExam] = useState(null);
  const [examState, setExamState] = useState("notice");
  const [error, setError] = useState(null);

  console.log("ExamNoticePage props:", { allExam });

  const handleExamClick = (exam) => {
    setSelectedExam(exam);
    setShowModal(true);
    setError(null);
  };

  // Categorize exams into live and upcoming
  const now = new Date();
  
  const liveExams = allExam
    .filter((exam) => {
      const start = new Date(exam.start_time);
      const end = new Date(exam.end_time);
      return now >= start && now <= end;
    })
    .sort((a, b) => new Date(b.start_time) - new Date(a.start_time)); // Newest first

  const upcomingExams = allExam
    .filter((exam) => {
      const start = new Date(exam.start_time);
      return now < start;
    })
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time)); // Soonest first

  const handleConfirmParticipation = (exam) => {
    router.get(
      route("student.live.exam.main"),
      { examSlug: exam.slug },
      {
        preserveState: true,
        onSuccess: () => {
          setCurrentExam(exam);
          setExamState("exam");
          setShowModal(false);
        },
        onError: (errors) => {
          console.error("Exam participation error:", errors);
          setError(errors.error || "Failed to join exam");
          setShowModal(false);
        },
      }
    );
  };

  return (
    <div className="flex-grow-1 d-flex flex-column font-baloo">
      {error && (
        <div className="alert alert-danger alert-dismissible fade show mx-3 mt-3" role="alert">
          আপনি ইতিমধ্যে এই পরীক্ষাটি দিয়েছেন
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}
      <main className="flex-grow-1 p-1 bg-light mt-2">
        {/* Live Exams Section */}
        <div className="mb-5">
          <div className="justify-content-center mb-4">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h3 className="fw-bold text-dark mb-1">চলমান পরীক্ষাসমূহ</h3>
                  <p className="text-muted mb-0">এখনই অংশগ্রহণ করুন এবং আপনার দক্ষতা যাচাই করুন</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-success me-2">🔴</span>
                  <span className="small text-muted">{liveExams.length} টি লাইভ</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="col-12">
              {liveExams.length > 0 ? (
                <div className="row">
                  {liveExams.map((exam) => (
                    <LiveExamCard key={exam.id} exam={exam} onClick={handleExamClick} />
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">বর্তমানে কোনো লাইভ পরীক্ষা চলমান নেই</div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Exams Section */}
        <div>
          <div className="justify-content-center mb-4">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h3 className="fw-bold text-dark mb-1">আসন্ন পরীক্ষাসমূহ</h3>
                  <p className="text-muted mb-0">আপনার পরীক্ষার জন্য প্রস্তুত হোন</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-warning me-2">⏰</span>
                  <span className="small text-muted">{upcomingExams.length} টি আসন্ন</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="col-12">
              {upcomingExams.length > 0 ? (
                <div className="row">
                  {upcomingExams.map((exam) => (
                    <LiveExamCard key={exam.id} exam={exam} onClick={handleExamClick} />
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">বর্তমানে কোনো আসন্ন পরীক্ষা নেই</div>
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
  );
};

ExamListPage.layout = (page) => <Layout children={page} />;
export default ExamListPage;