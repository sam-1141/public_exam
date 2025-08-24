import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

function CourseWiseExams({ liveExams, loading }) {
    const [expandedCourses, setExpandedCourses] = useState({});

    // Function to check if live exam is still active
    const isExamLive = (endTime) => {
        if (!endTime) return true;
        const now = new Date();
        const examEndTime = new Date(endTime);
        return now < examEndTime;
    };

    // Filter live exams to only show active ones
    const activeLiveExams = liveExams.filter((exam) =>
        isExamLive(exam.endTime)
    );

    // Group active live exams by course
    const groupExamsByCourse = (exams) => {
        const grouped = {};

        exams.forEach((exam) => {
            const courseInfo =
                exam.courseInfo && exam.courseInfo.length > 0
                    ? exam.courseInfo[0]
                    : { course_name: "Uncategorized", id: "uncategorized" };

            const courseKey = courseInfo.course_name || "Uncategorized";

            if (!grouped[courseKey]) {
                grouped[courseKey] = {
                    courseId: courseInfo.id,
                    courseName: courseKey,
                    exams: [],
                };
            }

            grouped[courseKey].exams.push(exam);
        });

        return grouped;
    };

    const liveExamsByCourse = groupExamsByCourse(activeLiveExams);

    // Toggle course expansion
    const toggleCourseExpansion = (courseName) => {
        setExpandedCourses((prev) => ({
            ...prev,
            [courseName]: !prev[courseName],
        }));
    };

    // Render course section
    const renderCourseSection = () => {
        const courseNames = Object.keys(liveExamsByCourse);

        if (loading.live) {
            return (
                <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        if (courseNames.length === 0) {
            return (
                <div className="text-center py-5 text-muted">
                    <i className="fas fa-inbox fa-2x mb-3 d-block"></i>
                    No courses have any live exams right now
                </div>
            );
        }

        return courseNames.map((courseName) => {
            const courseData = liveExamsByCourse[courseName];
            const isExpanded = expandedCourses[courseName];
            const displayedExams = isExpanded
                ? courseData.exams
                : courseData.exams.slice(0, 3);

            return (
                <div key={courseName} className="mb-3 border rounded">
                    {/* Course Header */}
                    <div
                        className="bg-light p-3 border-bottom cursor-pointer d-flex justify-content-between align-items-center"
                        onClick={() => toggleCourseExpansion(courseName)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="d-flex align-items-center">
                            <div>
                                <h6 className="mb-1 font-semibold text-primary">
                                    {courseData.courseName}
                                </h6>
                                <small className="text-muted">
                                    {courseData.exams.length} live exam
                                    {courseData.exams.length !== 1 ? "s" : ""}
                                </small>
                            </div>
                        </div>
                        <i
                            className={`fas fa-chevron-${
                                isExpanded ? "up" : "down"
                            } text-muted`}
                        ></i>
                    </div>

                    {/* Exams List */}
                    <div className="list-group list-group-flush">
                        {displayedExams.map((exam) => (
                            <Link
                                key={exam.id}
                                href={route("admin.exam.details", {
                                    exam: exam.slug,
                                    type: "live",
                                })}
                                className="list-group-item list-group-item-action border-0"
                            >
                                <div className="d-flex w-100 justify-content-between align-items-start">
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-1">
                                            {/* <div className="me-3">
                                                <span className="position-relative">
                                                    <span className="position-absolute top-0 start-0 badge bg-danger rounded-pill animate-pulse fs-6">
                                                        <i className="fas fa-circle opacity-75 me-1"></i>
                                                        LIVE
                                                    </span>
                                                </span>
                                            </div> */}
                                            <h6 className="font-semibold text-gray-700 mb-0">
                                                {exam.name}
                                            </h6>
                                        </div>

                                        <p className="text-muted mb-1 small">
                                            {exam.description?.substring(
                                                0,
                                                80
                                            ) || "No description available"}
                                            {exam.description?.length > 80
                                                ? "..."
                                                : ""}
                                        </p>
                                        <div className="d-flex gap-3 text-xs text-muted">
                                            <span>
                                                <i className="fas fa-question-circle me-1"></i>
                                                {exam.totalQuestions || 0}{" "}
                                                questions
                                            </span>
                                            <span>
                                                <i className="fas fa-bullseye me-1"></i>
                                                {exam.totalMarks || 0} marks
                                            </span>
                                            <span>
                                                <i className="fas fa-clock me-1"></i>
                                                {exam.duration || 0} min
                                            </span>
                                            {exam.startTime && (
                                                <span>
                                                    <i className="fas fa-calendar me-1"></i>
                                                    {new Date(
                                                        exam.startTime
                                                    ).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <small className="text-muted ms-3">
                                        <i className="fas fa-chevron-right"></i>
                                    </small>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Show More Button */}
                    {courseData.exams.length > 3 && !isExpanded && (
                        <div className="text-center p-2 bg-light border-top">
                            <button
                                className="btn btn-link btn-sm text-decoration-none"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCourseExpansion(courseName);
                                }}
                            >
                                Show {courseData.exams.length - 3} more exams
                            </button>
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="mb-4">
            <div className="card">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <h2 className="text-xl font-semibold mb-0">
                                Course Wise Live Exams
                            </h2>
                        </div>

                        {/* Live Exam Count */}
                        <div>
                            <span className="badge bg-danger">
                                {activeLiveExams.length} Active
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-body p-3">
                    {renderCourseSection()}

                    {/* Custom CSS for pulse animation */}
                    <style jsx>{`
                        @keyframes pulse {
                            0% {
                                transform: scale(1);
                                opacity: 1;
                            }
                            50% {
                                transform: scale(1.1);
                                opacity: 0.7;
                            }
                            100% {
                                transform: scale(1.2);
                                opacity: 0;
                            }
                        }

                        .animate-pulse {
                            animation: pulse 2s infinite;
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
}

export default CourseWiseExams;
