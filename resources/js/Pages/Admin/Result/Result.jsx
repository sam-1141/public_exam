import React, { useEffect, useState } from "react";
import Layout from "../../../layouts/Layout";
import Pagination from "../../../components/Pagination/Pagination";
import AnswerSheetModal from "./AnswerSheetModal";
import axios from "axios";
import { route } from "ziggy-js";

const ExamResult = ({ coursesInfo, exams }) => {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedExam, setSelectedExam] = useState("");
    const [searchStudentId, setSearchStudentId] = useState("");
    const [showAnswerSheet, setShowAnswerSheet] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [answerSheetLoading, setAnswerSheetLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [courses, setCourses] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        if (coursesInfo && coursesInfo.length > 0) {
            const transformedCourses = coursesInfo.map((course) => ({
                id: course.slug,
                name: course.course_name,
            }));
            setCourses(transformedCourses);
        }
    }, [coursesInfo]);

    useEffect(() => {
        // if (selectedCourse) {
        //     fetchResults();
        // } else {
        //     setResults([]);
        //     setSelectedExam("");
        //     setSearchStudentId("");
        // }

        fetchResults();
    }, [selectedCourse, searchStudentId, selectedExam]);

    const fetchResults = async () => {
        if (!selectedCourse) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                route("admin.exam.results.list", {
                    courseSlug: selectedCourse,
                }),
                {
                    params: {
                        exam_id: selectedExam || undefined,
                        student_id: searchStudentId || undefined,
                    },
                }
            );
            setResults(response.data.examResults.data || []);
        } catch (error) {
            console.error("Failed to fetch exam results", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
        setCurrentPage(1);
    };

    const handleExamChange = (e) => {
        setSelectedExam(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchStudentId(e.target.value);
        setCurrentPage(1);
    };

    const handleViewAnswerSheet = async (student) => {
        setAnswerSheetLoading(true);
        try {
            const response = await axios.get(
                route("admin.student.answer.sheet", {
                    studentId: student.studentId,
                    examSlug: student.liveExamSlug,
                })
            );

            setSelectedStudent({
                ...student,
                answerSheet: response.data.info,
            });
            setShowAnswerSheet(true);
        } catch (error) {
            setSelectedStudent(student);
            setShowAnswerSheet(true);
        } finally {
            setAnswerSheetLoading(false);
        }
    };

    const handleCloseAnswerSheet = () => {
        setShowAnswerSheet(false);
        setSelectedStudent(null);
    };

    const handleReset = () => {
        setSelectedCourse("");
        setSelectedExam("");
        setSearchStudentId("");
        setCurrentPage(1);
        setResults([]);
    };

    // Pagination logic
    const totalPages = Math.ceil(results.length / itemsPerPage);
    const currentItems = results.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <div className="container-fluid py-4">
                <h3 className="h3 font-semibold mb-2">Exam Results</h3>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <select
                            id="courseSelect"
                            className="form-select"
                            value={selectedCourse}
                            onChange={handleCourseChange}
                        >
                            <option value="">Select a course</option>
                            {/* <option value="all">All Courses</option> */}
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Exam filter */}
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row g-3">
                            {/* Exam filter */}
                            <div className="col-md-6">
                                <select
                                    id="examSelect"
                                    className="form-select"
                                    value={selectedExam}
                                    onChange={handleExamChange}
                                    disabled={!selectedCourse}
                                >
                                    <option value="">
                                        {selectedCourse
                                            ? "All Exams"
                                            : "Select a course first to filter exams"}{" "}
                                    </option>
                                    {exams.map((exam) => (
                                        <option key={exam.slug} value={exam.id}>
                                            {exam.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Search by student id */}
                            <div className="col-md-4">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Student ID"
                                        value={searchStudentId}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>

                            {/* Add Reset Button */}
                            <div className="col-md-2">
                                <button
                                    className="btn btn-outline-secondary w-100"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {!selectedCourse ? (
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center py-5">
                                    <div className="mb-3">
                                        <i className="bi bi-journal-text fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="card-title mb-3">
                                        Select a Course
                                    </h5>
                                    <p className="card-text text-muted">
                                        Please select a course to view exam
                                        results.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : loading ? (
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-center py-5">
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading results...
                                    </span>
                                </div>
                                <span className="ms-2">Loading results...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="border rounded-3 bg-white">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">
                                                        Student ID
                                                    </th>
                                                    <th scope="col">
                                                        Exam Name
                                                    </th>
                                                    <th scope="col">
                                                        Total Marks
                                                    </th>
                                                    <th scope="col">
                                                        Submission Time
                                                    </th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.length > 0 ? (
                                                    currentItems.map(
                                                        (student) => (
                                                            <tr
                                                                key={`${student.studentId}-${student.liveExamSlug}`}
                                                            >
                                                                <td>
                                                                    {
                                                                        student.studentId
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        student.liveExamName
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <span className="font-semibold">
                                                                        {
                                                                            student.studentTotalMarks
                                                                        }
                                                                        /
                                                                        {
                                                                            student.examTotalMarks
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    {student.examSubmitTime
                                                                        ? new Date(
                                                                              student.examSubmitTime
                                                                          ).toLocaleString()
                                                                        : new Date(
                                                                              student.studentExamEndTime
                                                                          ).toLocaleString()}
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-sm btn-outline-primary"
                                                                        onClick={() =>
                                                                            handleViewAnswerSheet(
                                                                                student
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            answerSheetLoading
                                                                        }
                                                                    >
                                                                        View
                                                                        Answers
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="5"
                                                            className="text-center py-4"
                                                        >
                                                            No results found for
                                                            this course.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination Component */}
                        {results.length > itemsPerPage && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                itemsPerPage={itemsPerPage}
                                totalItems={results.length}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </>
                )}

                {/* Answer Sheet Modal */}
                <AnswerSheetModal
                    show={showAnswerSheet}
                    onClose={handleCloseAnswerSheet}
                    student={selectedStudent}
                    course={courses.find((c) => c.id === selectedCourse)}
                    loading={answerSheetLoading}
                    fetchResults={fetchResults}
                />
            </div>
        </>
    );
};

ExamResult.layout = (page) => <Layout children={page} />;
export default ExamResult;
