import ExamSummary from "./ExamSummary"
import QuestionReview from "./QuestionReview"
import Layout from "../../../layouts/Layout"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"

const AnswerSheetPage = ({ info }) => {
  // Transform backend data to frontend format
  const transformExamData = () => {
    const attendance = info.studentExamsAttendance;
    const questions = info.questions;
    const answers = info.studentsExamAnswers;

    // Calculate time spent
    const attendTime = new Date(attendance.studentExamAttendTime);
    const submitTime = new Date(attendance.examSubmitTime);
    const timeSpentMs = submitTime - attendTime;
    const submissionTimeMinutes = Math.floor(timeSpentMs / (1000 * 60));

    // Count answers
    const correctAnswers = answers.filter(answer => answer.is_correct === 1).length;
    const wrongAnswers = answers.filter(answer => answer.is_correct === 0 && answer.ans_given !== null).length;
    const skippedAnswers = answers.filter(answer => answer.ans_given === null).length;
    // const answeredQuestions = correctAnswers + wrongAnswers;

    return {
      examName: attendance.liveExamName,
      totalGivenTime: attendance.liveExamDuration,
      submissionTime: submissionTimeMinutes,
      totalQuestions: attendance.examTotalQuestions,
      // answeredQuestions: answeredQuestions,
      skippedQuestions: skippedAnswers,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
      totalScore: attendance.examTotalMarks,
      obtainedScore: attendance.studentTotalMarks,
    };
  };

  // Transform questions data
  const transformQuestions = () => {
    if (!info?.questions || !info?.studentsExamAnswers) {
      return [];
    }

    return info.questions.map((question, index) => {
      const studentAnswer = info.studentsExamAnswers.find(ans => ans.question_id === question.id);
      
      // Parse options from JSON string
      let options = [];
      try {
        const parsedOptions = JSON.parse(question.options);
        options = parsedOptions.map(opt => {
          // Extract text from HTML if needed
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = opt.option;
          return tempDiv.textContent || tempDiv.innerText || '';
        });
      } catch (error) {
        options = ["Option 1", "Option 2", "Option 3", "Option 4"];
      }

      // Find correct answer index
      let correctAnswerIndex = -1;
      try {
        const parsedOptions = JSON.parse(question.options);
        correctAnswerIndex = parsedOptions.findIndex(opt => opt.ans === true);
      } catch (error) {
        // console.error("Error finding correct answer:", error);
      }

      return {
        id: question.id,
        text: question.question,
        options: options,
        correctAnswer: correctAnswerIndex,
        userAnswer: studentAnswer ? parseInt(studentAnswer.ans_given) : null,
        marks: 1, // Assuming each question carries 1 mark
        teacherNote: question.explanation
      };
    });
  };

  const examData = transformExamData();
  const transformedQuestions = transformQuestions();

  const handleBackClick = () => {
    window.history.back();
  };

  if (!examData) {
    return (
      <div className="flex-grow-1 d-flex flex-column font-baloo">
        <PageHeader title="উত্তরপত্র" />
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">ডেটা লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow-1 d-flex flex-column font-baloo">
      <PageHeader
        title="উত্তরপত্র"
      />

      <main className="flex-grow-1 px-0 py-2 bg-light">
        <div className="">
          <div className="row justify-content-center">
            <div className="col-12 ">
              {/* Exam Summary */}
              <ExamSummary examData={examData} attendanceData={info?.studentExamsAttendance} />

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

              {transformedQuestions.map((question, index) => (
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