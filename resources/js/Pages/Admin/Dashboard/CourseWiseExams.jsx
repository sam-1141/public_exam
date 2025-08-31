import React, { useState, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

function CourseWiseExams({ liveExams, practiceExams, loading }) {
    // State management
    const [expandedCourses, setExpandedCourses] = useState({});
    const [selectedCourse, setSelectedCourse] = useState(""); // Changed from "all" to empty string
    const [examType, setExamType] = useState("live");

    // Get current exam list based on type (with null safety)
    const currentExams =
        examType === "live" ? liveExams || [] : practiceExams || [];

    // Extract unique courses and subjects for filters
    const { courses, subjects } = useMemo(() => {
        const courseSet = new Set();
        const subjectSet = new Set();

        // Ensure currentExams is an array before iterating
        if (Array.isArray(currentExams)) {
            currentExams.forEach((exam) => {
                // Extract course information
                if (exam.courseInfo && exam.courseInfo.length > 0) {
                    exam.courseInfo.forEach((course) => {
                        courseSet.add(course.course_name);
                    });
                }

                // Extract subject information
                if (exam.subjectInfo && exam.subjectInfo.length > 0) {
                    exam.subjectInfo.forEach((subject) => {
                        subjectSet.add(subject.name);
                    });
                }
            });
        }

        return {
            courses: Array.from(courseSet).sort(),
            subjects: Array.from(subjectSet).sort(),
        };
    }, [currentExams]);

    // Filter exams based on selected course
    const filteredExams = useMemo(() => {
        if (!Array.isArray(currentExams)) {
            return [];
        }

        // If no course is selected, return empty array
        if (!selectedCourse) {
            return [];
        }

        if (selectedCourse === "all") {
            return currentExams;
        }

        return currentExams.filter((exam) => {
            return (
                exam.courseInfo &&
                exam.courseInfo.some(
                    (course) => course.course_name === selectedCourse
                )
            );
        });
    }, [currentExams, selectedCourse]);

    // Group exams by course
    const groupedExams = useMemo(() => {
        const grouped = {};

        filteredExams.forEach((exam) => {
            // Handle course grouping
            const courses =
                exam.courseInfo && exam.courseInfo.length > 0
                    ? exam.courseInfo
                    : [{ id: "uncategorized", course_name: "Uncategorized" }];

            courses.forEach((course) => {
                const courseKey = course.course_name;

                if (!grouped[courseKey]) {
                    grouped[courseKey] = {
                        courseId: course.id,
                        courseName: courseKey,
                        exams: [],
                    };
                }

                grouped[courseKey].exams.push(exam);
            });
        });

        return grouped;
    }, [filteredExams]);

    // Toggle course expansion
    const toggleCourseExpansion = (courseKey) => {
        setExpandedCourses((prev) => ({
            ...prev,
            [courseKey]: !prev[courseKey],
        }));
    };

    // Reset filters
    const resetFilters = () => {
        setSelectedCourse("");
    };

    // Calculate total exam count
    const totalExams = Object.values(groupedExams).reduce((total, course) => {
        return total + course.exams.length;
    }, 0);

    // Get subject names for an exam
    const getSubjectNames = (exam) => {
        if (exam.subjectInfo && exam.subjectInfo.length > 0) {
            return exam.subjectInfo.map((subject) => subject.name).join(", ");
        }
        return "No Subject";
    };

    // Render individual exam item
    const renderExamItem = (exam) => {
        return (
            <Link
                key={exam.id}
                href={route("admin.exam.details", {
                    exam: exam.slug,
                    type: examType,
                })}
                className="list-group-item list-group-item-action border-0 py-3"
            >
                <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                        {/* Exam Title */}
                        <h6 className="fw-semibold text-dark mb-1">
                            {exam.name}
                        </h6>

                        {/* Subject Name */}
                        <div className="mb-2">
                            <span className="badge bg-info text-dark text-sm me-2 ">
                                {getSubjectNames(exam)}
                            </span>
                        </div>

                        {/* Exam Description */}
                        {exam.description && (
                            <p className="text-muted mb-0 ">
                                {exam.description}
                            </p>
                        )}
                    </div>

                    {/* Arrow Icon */}
                    <div className="ms-3">
                        <i className="fas fa-chevron-right text-muted"></i>
                    </div>
                </div>
            </Link>
        );
    };

    // Render course section
    const renderCourseSection = (courseKey, courseData) => {
        const isCourseExpanded = expandedCourses[courseKey];
        const displayedExams = isCourseExpanded
            ? courseData.exams
            : courseData.exams.slice(0, 3);

        return (
            <div key={courseKey} className="mb-3 border rounded">
                {/* Course Header */}
                <div
                    className="p-3 d-flex justify-content-between align-items-center pe-auto"
                    onClick={() => toggleCourseExpansion(courseKey)}
                >
                    <div>
                        <h5 className="h5 mb-1 fw-bold">
                            Course: {courseData.courseName}
                        </h5>
                        <small className="opacity-75">
                            {courseData.exams.length} exam
                            {courseData.exams.length !== 1 ? "s" : ""}
                        </small>
                    </div>
                    <i
                        className={`fas fa-chevron-${
                            isCourseExpanded ? "up" : "down"
                        }`}
                    ></i>
                </div>

                {/* Exams List  */}
                {isCourseExpanded && (
                    <div className="list-group list-group-flush">
                        {displayedExams.map(renderExamItem)}
                    </div>
                )}

                {/* Show More Button  */}
                {isCourseExpanded &&
                    courseData.exams.length > 3 &&
                    displayedExams.length < courseData.exams.length && (
                        <div className="text-center p-2 bg-light border-top">
                            <button
                                className="btn btn-link btn-sm text-decoration-none"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedCourses((prev) => ({
                                        ...prev,
                                        [courseKey]: "full",
                                    }));
                                }}
                            >
                                Show {courseData.exams.length - 3} more exams
                            </button>
                        </div>
                    )}
            </div>
        );
    };

    // Main render function
    const renderMainContent = () => {
        const isLoading =
            (examType === "live" && loading?.live) ||
            (examType === "practice" && loading?.practice);

        if (isLoading) {
            return (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">
                        Loading {examType} exams...
                    </p>
                </div>
            );
        }

        // Show selection prompt if no course is selected
        if (!selectedCourse) {
            return (
                <div className="text-center py-5">
                    <i className="fas fa-graduation-cap fa-3x text-primary mb-3"></i>
                    <h5 className="text-dark mb-3">
                        Select a Course to View Exams
                    </h5>
                    <p className="text-muted mb-4">
                        Please select a specific course or "All Courses" from
                        the dropdown above to view available {examType} exams.
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => setSelectedCourse("all")}
                        >
                            <i className="fas fa-list me-2"></i>
                            View All Courses
                        </button>
                    </div>
                </div>
            );
        }

        const courseKeys = Object.keys(groupedExams);

        if (courseKeys.length === 0) {
            return (
                <div className="text-center py-5">
                    <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">No {examType} exams found</h5>
                    <p className="text-muted">
                        {selectedCourse !== "all"
                            ? "No exams found for the selected course"
                            : `No ${examType} exams are available at the moment`}
                    </p>
                </div>
            );
        }

        return courseKeys.map((courseKey) =>
            renderCourseSection(courseKey, groupedExams[courseKey])
        );
    };

    return (
        <div className="mb-4">
            <div className="card shadow-sm">
                {/* Header */}
                <div className="card-header bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="h4 mb-1 fw-bold text-dark">
                                Course Wise Exams
                            </h2>
                        </div>
                        {selectedCourse && (
                            <span
                                className={`badge fs-6 ${
                                    examType === "live"
                                        ? "bg-danger"
                                        : "bg-success"
                                }`}
                            >
                                {totalExams}{" "}
                                {examType === "live" ? "Live" : "Practice"} Exam
                                {totalExams !== 1 ? "s" : ""}
                            </span>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="card-body border-bottom bg-light">
                    <div className="row g-3">
                        {/* Course Filter */}
                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={selectedCourse}
                                onChange={(e) =>
                                    setSelectedCourse(e.target.value)
                                }
                            >
                                <option value="">Select a Course</option>
                                <option value="all">All Courses</option>
                                {courses.map((course, index) => (
                                    <option key={index} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Exam Type Filter */}
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={examType}
                                onChange={(e) => setExamType(e.target.value)}
                            >
                                <option value="live">Live Exams</option>
                                <option value="practice">Practice Exams</option>
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        <div className="col-md-3">
                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={resetFilters}
                                disabled={!selectedCourse}
                            >
                                <i className="fas fa-times me-1"></i>
                                Clear Selection
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="card-body p-4">{renderMainContent()}</div>
            </div>
        </div>
    );
}

export default CourseWiseExams;
