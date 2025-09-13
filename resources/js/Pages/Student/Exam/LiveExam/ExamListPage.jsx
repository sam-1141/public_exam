import Layout from "../../../../layouts/Layout";
import { router } from "@inertiajs/react";
import LiveExamSection from "./LiveExamSection";
import UpcomingExamSection from "./UpcomingExamSection";
import {route} from "ziggy-js";

const ExamListPage = ({ allExam, errors }) => {
  const handleExamClick = (exam) => {
      router.get(route("student.exam.notice"), { examSlug: exam.slug});
  };

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

  return (
    <div className="flex-grow-1 d-flex flex-column font-baloo">
      {errors.errors && (
        <div className="alert alert-danger alert-dismissible fade show mx-3 mt-3" role="alert">
            {errors.errors}
        </div>
      )}
      <main className="flex-grow-1 p-1 bg-light mt-2">
        {/* Live Exams Section */}
        <LiveExamSection exams={liveExams} onExamClick={handleExamClick} />

        {/* Upcoming Exams Section */}
        <UpcomingExamSection exams={upcomingExams} onExamClick={handleExamClick} />
      </main>
    </div>
  );
};

ExamListPage.layout = (page) => <Layout children={page} />;
export default ExamListPage;
