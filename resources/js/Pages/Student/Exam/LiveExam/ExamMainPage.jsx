import {useState, useEffect, useRef} from "react"
import ExamTimer from "./ExamTimer"
import QuestionCard from "./QuestionCard"
import Layout from "../../../../layouts/Layout"
import FocusWarning from "../../../../components/FocusWarning"
import { route } from "ziggy-js";

const ExamMainPage = ({ exam, questions }) => {
    const beforeUnloadRef = useRef(null);
    const popStateRef = useRef(null);
  const [answers, setAnswers] = useState({})
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)


    useEffect(() => {
        beforeUnloadRef.current = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };

        popStateRef.current = (e) => {
            e.preventDefault();
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("beforeunload", beforeUnloadRef.current);
        window.addEventListener("popstate", popStateRef.current);
        window.history.pushState(null, "", window.location.href);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadRef.current);
            window.removeEventListener("popstate", popStateRef.current);
        };
    }, []);


    const handleAnswerSelect = async (questionId, answerIndex) => {
    // Calculate the additional data points
    const question = questions.find(q => q.id === questionId);
    let parsedOptions = [];
    try {
      parsedOptions = JSON.parse(question.options || "[]");
    } catch (error) {
    }

    // Find correct answers (can be multiple)
    const correctAnswers = parsedOptions
      .map((opt, idx) => (opt.ans ? idx : -1))
      .filter(idx => idx !== -1);

    // Check if user's answer is correct
    const isCorrect = correctAnswers.includes(answerIndex);

    // Calculate per question mark
      const singleQuestionMark = exam.total_marks / exam.total_questions;

      setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        answerIndex,
        correct_ans: correctAnswers,
        is_correct: isCorrect,
        single_question_mark: singleQuestionMark
      },
    }));

    try {
      await axios.post(route('student.exam.answer.store'), {
        exam_id: exam.id,
        question_id: questionId,
        ans_given: String(answerIndex),
        correct_ans: correctAnswers.join(','),
        is_correct: isCorrect,
        single_question_mark: singleQuestionMark
      })
    } catch (err) {
      // console.error('Answer save failed:', err)
    }
  };

  const handleSubmitByStudent = async (submitStatus) => {
      window.removeEventListener("beforeunload", beforeUnloadRef.current);
      window.removeEventListener("popstate", popStateRef.current);
    try {
      const response = await axios.post(route('student.live.exam.main.submit'), {
        examId: exam.id,
        submit_status: submitStatus,
      });

      if (response.data.type === 'success') {
          window.location.href = route('student.live.exam.success');
      }

    } catch (error) {
      if (error.response) {
        setShowSubmitModal(false);
        setShowErrorModal(true);
      }
    }
  }

  const handleSubmit = async (isAuto = false) => {
      window.removeEventListener("beforeunload", beforeUnloadRef.current);
      window.removeEventListener("popstate", popStateRef.current);
    if (typeof isAuto !== 'boolean') {
      isAuto = false
    }
    if (!exam) return
      const response = await axios.post(route('student.live.exam.main.submit'), {
          examId: exam.id,
          submit_status: 3,
      });

      if (response.data.type === 'success') {
          window.location.href = route('student.live.exam.success');
      }
  }

  if (!exam) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center font-baloo">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  const answeredCount = Object.keys(answers).length
  const progressPercentage = (answeredCount / questions.length) * 100

  return (
    <div className="position-relative min-vh-100 bg-light font-baloo">
      {/* Exam Header */}
      <div className="bg-white border-bottom top-0 custom-sticky-top rounded">
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h4 className="mb-0 fw-bold">{exam.name}</h4>
              <small className="text-muted">মোট নম্বর: {exam.totalMarks}</small>
            </div>
            <div className="col-md-4 text-center">
              <ExamTimer duration={exam.duration} onTimeUp={handleSubmitByStudent} />
            </div>
            <div className="col-md-4 text-end">
              <div className="d-flex align-items-center justify-content-end">
                <span className="me-3 small text-muted">
                  উত্তর দেওয়া: {answeredCount}/{questions.length}
                </span>
                <button className="btn btn-success fw-semibold" onClick={() => setShowSubmitModal(true)}>
                  জমা দিন
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="row mt-2">
            <div className="col-12">
              <div className="progress" style={{ height: "4px" }}>
                <div className="progress-bar bg-success" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className=" py-4">
        <div className=" justify-content-center">
          <div className="col-12 ">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                questionNumber={index + 1}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswer={answers[question.id]?.answerIndex}
                isAnswered={answers[question.id] !== undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">পরীক্ষা জমা দিন</h5>
                </div>
                <div className="modal-body text-center py-4">
                  <div className="mb-4">
                    <div
                      className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <span className="fs-1">⚠️</span>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">আপনি কি নিশ্চিত?</h5>
                    <p className="text-muted mb-3">
                      আপনি {answeredCount}টি প্রশ্নের উত্তর দিয়েছেন {questions.length}টির মধ্যে।
                    </p>
                    <p className="text-muted small">জমা দেওয়ার পর আর পরিবর্তন করা যাবে না।</p>
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <button
                        className="btn btn-outline-secondary w-100 py-2"
                        onClick={() => setShowSubmitModal(false)}
                      >
                        বাতিল
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-success w-100 py-2 fw-semibold" onClick={() => handleSubmitByStudent(1)}>
                        জমা দিন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">ত্রুটি</h5>
                </div>
                <div className="modal-body text-center py-4">
                  <div className="mb-4">
                    <div
                      className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <span className="fs-1 text-danger">⚠️</span>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">জমা দেওয়া যায়নি</h5>
                    <p className="text-muted mb-3">
                      পরীক্ষা জমা দেওয়ার সময় একটি সমস্যা হয়েছে।
                    </p>
                    <p className="text-muted small">দয়া করে আবার চেষ্টা করুন।</p>
                  </div>

                  <div className="row g-2">
                    <div className="col-12">
                      <button
                        className="btn btn-danger w-100 py-2"
                        onClick={() => setShowErrorModal(false)}
                      >
                        ঠিক আছে
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <FocusWarning
        maxWarnings={3}
        active={!!exam}
        onMaxWarnings={() => handleSubmit(true)}
        examId={exam.id}
      />
    </div>
  )
}

ExamMainPage.layout = (page) => <Layout children={page} />
export default ExamMainPage
