import Layout from "../../../layouts/Layout";
import { useState, useMemo, useEffect } from "react";
import HistoryPagination from "./HistoryPagination";
import PageHeader from "../../../components/Student/PageHeader/PageHeader";
import ExamHistoryCard from "./ExamHistoryCard";

const HistoryPage = ({ courses, examsInfo }) => {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // Set initial selected course to the first available course from exams
        if (examsInfo.length > 0 && courses.length > 0) {
            const firstCourseId = getAvailableCourses()[0]?.id;
            if (firstCourseId) {
                setSelectedCourse(firstCourseId.toString());
            }
        }
    }, [examsInfo, courses]);

    // Get available courses that have exams
    const getAvailableCourses = () => {
        const courseIdsWithExams = new Set();

        examsInfo.forEach((exam) => {
            if (exam.relatedCourseIds && exam.relatedCourseIds !== null) {
                // if null, skip
                exam.relatedCourseIds?.split(",").forEach((courseId) => {
                    courseIdsWithExams.add(courseId.trim());
                });
            }
        });

        return courses.filter((course) =>
            courseIdsWithExams.has(course.id.toString())
        );
    };

    // Transform examsInfo to match the expected format
    const transformExamData = useMemo(() => {
        const availableCourses = getAvailableCourses();
        const result = {};

        availableCourses.forEach((course) => {
            const courseId = course.id.toString();
            result[courseId] = { live: [] };

            // Group exams by date for this course
            const examsByDate = {};

            examsInfo.forEach((exam) => {
                if (
                    exam.relatedCourseIds &&
                    exam.relatedCourseIds !== null && // if null, skip
                    exam.relatedCourseIds.includes(courseId)
                ) {
                    const examDate = exam.examSubmitTime.split(" ")[0]; // Get date part

                    if (!examsByDate[examDate]) {
                        examsByDate[examDate] = [];
                    }

                    examsByDate[examDate].push({
                        id: exam.id || Math.random(),
                        name: exam.liveExamName,
                        duration: exam.liveExamDuration,
                        attendTime: exam.studentExamAttendTime,
                        submitTime: exam.examSubmitTime,
                        score: exam.studentTotalMarks,
                        totalMarks: exam.examTotalMarks,
                        time: exam.examSubmitTime.split(" ")[1],
                        liveExamSlug: exam.liveExamSlug,
                    });
                }
            });

            // Convert to the expected format
            Object.keys(examsByDate).forEach((date) => {
                result[courseId].live.push({
                    date: date,
                    exams: examsByDate[date],
                });
            });
        });

        return result;
    }, [examsInfo, courses]);

    const currentExamData = transformExamData[selectedCourse]?.live || [];

    // Group & sort exams (newest date first, then time descending)
    const groupedExams = useMemo(() => {
        const grouped = currentExamData.reduce((acc, dateGroup) => {
            acc[dateGroup.date] = dateGroup.exams.sort(
                (a, b) =>
                    new Date(`2000-01-01 ${b.time}`) -
                    new Date(`2000-01-01 ${a.time}`)
            );
            return acc;
        }, {});

        return Object.keys(grouped)
            .sort((a, b) => new Date(b) - new Date(a)) // sort newest date first
            .map((date) => ({ date, exams: grouped[date] }));
    }, [currentExamData]);

    const totalPages = Math.ceil(groupedExams.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = groupedExams.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handleCourseChange = (courseId) => {
        setSelectedCourse(courseId);
        setCurrentPage(1);
    };

    const selectedCourseName =
        courses.find((c) => c.id.toString() === selectedCourse)?.course_name ||
        "";

    // Bangla date formatter
    const getBanglaDate = (dateStr) => {
        const englishToBangla = {
            0: "০",
            1: "১",
            2: "২",
            3: "৩",
            4: "৪",
            5: "৫",
            6: "৬",
            7: "৭",
            8: "৮",
            9: "৯",
        };
        const monthNames = {
            January: "জানুয়ারি",
            February: "ফেব্রুয়ারি",
            March: "মার্চ",
            April: "এপ্রিল",
            May: "মে",
            June: "জুন",
            July: "জুলাই",
            August: "আগস্ট",
            September: "সেপ্টেম্বর",
            October: "অক্টোবর",
            November: "নভেম্বর",
            December: "ডিসেম্বর",
        };

        const d = new Date(dateStr);
        const day = d
            .getDate()
            .toString()
            .replace(/\d/g, (num) => englishToBangla[num]);
        const month =
            monthNames[d.toLocaleDateString("en-US", { month: "long" })];
        const year = d
            .getFullYear()
            .toString()
            .replace(/\d/g, (num) => englishToBangla[num]);

        return `${day} ${month}, ${year}`;
    };

    const availableCourses = getAvailableCourses();

    return (
        <div className="d-flex flex-column font-baloo">
            <PageHeader title="ইতিহাস" />

            <main className="flex-grow-1 mt-2 bg-light">
                <div className="col-12">
                    {/* Course Selector */}
                    {availableCourses.length > 0 && (
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-3">
                                <label className="form-label fw-semibold mb-2">
                                    কোর্স নির্বাচন করুন
                                </label>
                                <select
                                    className="form-select"
                                    value={selectedCourse}
                                    onChange={(e) =>
                                        handleCourseChange(e.target.value)
                                    }
                                >
                                    {availableCourses.map((course) => (
                                        <option
                                            key={course.id}
                                            value={course.id.toString()}
                                        >
                                            {course.course_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Summary */}
                    {selectedCourse && (
                        <h4 className="fw-bold text-dark mb-4">
                            {selectedCourseName}
                        </h4>
                    )}

                    {/* Exam History */}
                    {currentPageData.length > 0 ? (
                        <>
                            {currentPageData.map((dateGroup, index) => (
                                <div key={index} className=" ms-3">
                                    {dateGroup.exams.map((exam, idx) => (
                                        <ExamHistoryCard
                                            key={idx}
                                            exam={exam}
                                            date={getBanglaDate(dateGroup.date)}
                                        />
                                    ))}
                                </div>
                            ))}

                            {totalPages > 1 && (
                                <HistoryPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                    totalItems={groupedExams.length}
                                    itemsPerPage={itemsPerPage}
                                />
                            )}
                        </>
                    ) : (
                        <div className="text-center py-5">
                            <div
                                className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                style={{ width: "80px", height: "80px" }}
                            >
                                <span className="fs-1">📚</span>
                            </div>
                            <h5 className="fw-bold text-muted mb-2">
                                কোনো পরীক্ষার ইতিহাস নেই
                            </h5>
                            <p className="text-muted">
                                {availableCourses.length === 0
                                    ? "কোনো কোর্সে পরীক্ষা দেওয়া হয়নি"
                                    : `${selectedCourseName} এর লাইভ পরীক্ষায় এখনো অংশগ্রহণ করেননি।`}
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

HistoryPage.layout = (page) => <Layout>{page}</Layout>;
export default HistoryPage;
