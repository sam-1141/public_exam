import { useEffect, useState } from "react";
import ExamSummary from "./ExamSummary";
import QuestionReview from "./QuestionReview";
import Layout from "../../../layouts/Layout";
import PageHeader from "../../../components/Student/PageHeader/PageHeader";

const AnswerSheetPage = ({ info }) => {
    const [examData, setExamData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!info || !info.studentExamsAttendance || !info.questions || !info.studentsExamAnswers) return;

        const attendance = info.studentExamsAttendance;
        const answers = info.studentsExamAnswers;
        const attendTime = new Date(attendance.studentExamAttendTime);
        const submitTime = new Date(attendance.examSubmitTime);
        const timeSpentMs = submitTime - attendTime;
        const submissionTimeMinutes = Math.floor(timeSpentMs / (1000 * 60));

        const correctAnswers = answers.filter((a) => a.is_correct === 1).length;
        const wrongAnswers = answers.filter((a) => a.is_correct === 0 && a.ans_given !== null).length;
        const skippedAnswers = info.questions.length - (correctAnswers + wrongAnswers);

        setExamData({
            examName: attendance.liveExamName,
            totalGivenTime: attendance.liveExamDuration,
            submissionTime: submissionTimeMinutes,
            totalQuestions: attendance.examTotalQuestions,
            skippedQuestions: skippedAnswers,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            totalScore: attendance.examTotalMarks,
            obtainedScore: attendance.studentTotalMarks,
        });

        const transformedQuestions = info.questions.map((q, index) => {
            const studentAnswer = info.studentsExamAnswers.find((ans) => ans.question_id === q.id);

            let options = [];
            try {
                const parsed = JSON.parse(q.options);
                parsed.map((opt) => {
                    options.push(opt.option || "");
                });
            } catch (err) {
                options = ["Option 1", "Option 2", "Option 3", "Option 4"];
            }

            let correctAnswerIndex = -1;
            try {
                const parsed = JSON.parse(q.options);
                correctAnswerIndex = parsed.findIndex((opt) => opt.ans === true);
            } catch (err) {
                correctAnswerIndex = -1;
            }

            return {
                id: q.id,
                text: q.question,
                options: options,
                correctAnswer: correctAnswerIndex,
                userAnswer: studentAnswer ? parseInt(studentAnswer.ans_given) : null,
                marks: 1,
                teacherNote: q.explanation,
            };
        });

        setQuestions(transformedQuestions);
        setLoading(false);
    }, [info]);

    const handleBackClick = () => {
        window.history.back();
    };

    if (loading || !examData) {
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
            <PageHeader title="উত্তরপত্র" />

            <main className="flex-grow-1 px-0 py-2 bg-light">
                <div className="">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <ExamSummary examData={examData} attendanceData={info?.studentExamsAttendance} />

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

                            <div className="text-center mt-4">
                                <button className="btn btn-primary px-4 py-2 fw-semibold" onClick={handleBackClick}>
                                    ফিরে যান
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

AnswerSheetPage.layout = (page) => <Layout>{page}</Layout>;
export default AnswerSheetPage;
