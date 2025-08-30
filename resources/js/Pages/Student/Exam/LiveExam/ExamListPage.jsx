import Layout from "../../../../layouts/Layout";
import LiveExamCard from "./LiveExamCard";
import ParticipationModal from "./ParticipationModal";
import PageHeader from "../../../../components/Student/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import LiveExamSection from "./LiveExamSection"; // Import the new component
import UpcomingExamSection from "./UpcomingExamSection"; // Import the new component

const ExamListPage = ({ allExam, errors }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentExam, setCurrentExam] = useState(null);
  const [examState, setExamState] = useState("notice");
  const [error, setError] = useState(null);

    useEffect(() => {
        console.log('errors:', errors);
    }, [errors]);

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
      {errors && (
        <div className="alert alert-danger alert-dismissible fade show mx-3 mt-3" role="alert">
            {errors.errors}
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
        <LiveExamSection exams={liveExams} onExamClick={handleExamClick} />

        {/* Upcoming Exams Section */}
        <UpcomingExamSection exams={upcomingExams} onExamClick={handleExamClick} />
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
