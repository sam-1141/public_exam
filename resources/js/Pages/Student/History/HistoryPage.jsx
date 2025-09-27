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
        if (examsInfo.length > 0 && courses.length > 0) {
            const firstCourseId = getAvailableCourses()[0]?.id;
            if (firstCourseId) {
                setSelectedCourse(firstCourseId.toString());
            }
        }
    }, [examsInfo, courses]);

    const getAvailableCourses = () => {
        const courseIdsWithExams = new Set();

        examsInfo.forEach((exam) => {
            if (typeof exam.relatedCourseIds === "string" && exam.relatedCourseIds.trim() !== "") {
                exam.relatedCourseIds.split(",").forEach((courseId) => {
                    courseIdsWithExams.add(courseId.trim());
                });
            }
        });

        return courses.filter((course) =>
            courseIdsWithExams.has(course.id.toString())
        );
    };

    const transformExamData = useMemo(() => {
        const availableCourses = getAvailableCourses();
        const result = {};

        availableCourses.forEach((course) => {
            const courseId = course.id.toString();
            result[courseId] = { live: [] };

            const examsByDate = {};

            examsInfo.forEach((exam) => {
                if (
                    typeof exam.relatedCourseIds === "string" &&
                    exam.relatedCourseIds.split(",").map(id => id.trim()).includes(courseId)
                ) {
                    // ✅ Handle null or invalid examSubmitTime
                    let datePart = "Not Submitted";
                    let timePart = "00:00:00";

                    if (
                        typeof exam.examSubmitTime === "string" &&
                        exam.examSubmitTime.includes(" ")
                    ) {
                        [datePart, timePart] = exam.examSubmitTime.split(" ");
                    } else if (
                        typeof exam.studentExamAttendTime === "string" &&
                        exam.studentExamAttendTime.includes(" ")
                    ) {
                        // Fallback to attend time if submit time is null
                        [datePart, timePart] = exam.studentExamAttendTime.split(" ");
                    }

                    if (!examsByDate[datePart]) {
                        examsByDate[datePart] = [];
                    }

                    examsByDate[datePart].push({
                        id: exam.id || Math.random(),
                        name: exam.liveExamName,
                        duration: exam.liveExamDuration,
                        attendTime: exam.studentExamAttendTime,
                        submitTime: exam.examSubmitTime,
                        score: exam.studentTotalMarks,
                        totalMarks: exam.examTotalMarks,
                        time: timePart,
                        liveExamSlug: exam.liveExamSlug,
                    });
                }
            });

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
            .sort((a, b) => new Date(b) - new Date(a))
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
        courses.find((c) => c.id.toString() === selectedCourse)?.course_name || "";

    const getBanglaDate = (dateStr) => {
        const englishToBangla = {
            0: "০", 1: "১", 2: "২", 3: "৩", 4: "৪",
            5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯",
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
        const day = d.getDate().toString().replace(/\d/g, (num) => englishToBangla[num]);
        const month = monthNames[d.toLocaleDateString("en-US", { month: "long" })];
        const year = d.getFullYear().toString().replace(/\d/g, (num) => englishToBangla[num]);

        return `${day} ${month}, ${year}`;
    };

    const availableCourses = getAvailableCourses();

    return (
        <div className="d-flex flex-column font-baloo">
            <PageHeader title="ইতিহাস" />
            <main className="flex-grow-1 mt-2 bg-light">
                <div className="col-12">
                    {availableCourses.length > 0 && (
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-3">
                                <label className="form-label fw-semibold mb-2">
                                    কোর্স নির্বাচন করুন
                                </label>
                                <select
                                    className="form-select"
                                    value={selectedCourse}
                                    onChange={(e) => handleCourseChange(e.target.value)}
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

                    {selectedCourse && (
                        <h4 className="fw-bold text-dark mb-4">
                            {selectedCourseName}
                        </h4>
                    )}

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
