import React, {useEffect, useState} from "react";
import Layout from "../../../layouts/Layout";
import Pagination from "../../../components/Pagination/Pagination";
import { answerSheets, examResults } from "./result.data";
import AnswerSheetModal from "./AnswerSheetModal";
import { Icon } from "@iconify/react";
import styles from "../LeaderBoard/Leaderboard.module.css";

const ExamResult = ({ coursesInfo }) => {
    const [selectedCourse, setSelectedCourse] = useState("math");
    const [showAnswerSheet, setShowAnswerSheet] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        console.log("Courses Info:", coursesInfo);
    }, [coursesInfo]);

    const courses = [
        { id: "math", name: "Mathematics", students: 24 },
        { id: "physics", name: "Physics", students: 18 },
        { id: "chemistry", name: "Chemistry", students: 22 },
        { id: "biology", name: "Biology", students: 15 },
    ];

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
        setCurrentPage(1);
    };

    const handleViewAnswerSheet = (student) => {
        setSelectedStudent(student);
        setShowAnswerSheet(true);
    };

    const handleCloseAnswerSheet = () => {
        setShowAnswerSheet(false);
        setSelectedStudent(null);
    };

    const getScoreVariant = (score) => {
        if (score >= 90) return "success";
        if (score >= 70) return "warning";
        return "danger";
    };

    // Calculate statistics
    const currentResults = examResults[selectedCourse] || [];
    const averageScore = currentResults.length
        ? Math.round(
              currentResults.reduce((sum, student) => sum + student.score, 0) /
                  currentResults.length
          )
        : 0;
    const topScore = currentResults.length
        ? Math.max(...currentResults.map((s) => s.score))
        : 0;

    // Pagination logic
    const totalPages = Math.ceil(currentResults.length / itemsPerPage);
    const currentItems = currentResults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <div className="container-fluid py-4">
                <div className="row mb-4">
                    <div className="col">
                        <h3 className="h3 font-semibold mb-3">
                            All Exam Results
                        </h3>
                    </div>
                </div>

                <div className="row mb-4 align-items-end">
                    <div className="col-md-6">
                        <label
                            htmlFor="courseSelect"
                            className="form-label fw-semibold"
                        >
                            Select Course
                        </label>
                        <select
                            id="courseSelect"
                            className="form-select"
                            value={selectedCourse}
                            onChange={handleCourseChange}
                        >
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6 mt-2 mt-md-0">
                        <div className="d-flex flex-wrap gap-2">
                            <span className="badge bg-light text-dark p-2">
                                <i className="bi bi-people-fill me-1"></i>{" "}
                                {currentResults.length} Students
                            </span>
                            <span className="badge bg-light text-dark p-2">
                                <i className="bi bi-check-circle-fill me-1"></i>{" "}
                                Average: {averageScore}%
                            </span>
                            <span className="badge bg-light text-dark p-2">
                                <i className="bi bi-trophy-fill me-1"></i> Top
                                Score: {topScore}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <div className="border rounded-3 bg-white">
                            <div className="p-3 border-bottom bg-light">
                                <h5 className="mb-0 text-dark">
                                    {
                                        courses.find(
                                            (c) => c.id === selectedCourse
                                        )?.name
                                    }{" "}
                                    Exam Results
                                </h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" className="ps-4">
                                                Rank
                                            </th>
                                            <th scope="col">Student Name</th>
                                            <th scope="col">Score</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((student) => (
                                            <tr key={student.id}>
                                                <td className="ps-4">
                                                    <div className="d-flex align-items-center gap-2">
                                                        {student.rank === 1 && (
                                                            <Icon
                                                                icon="emojione:1st-place-medal"
                                                                className={`${styles.medalIcon} ${styles.gold}`}
                                                            />
                                                        )}
                                                        {student.rank === 2 && (
                                                            <Icon
                                                                icon="emojione:2nd-place-medal"
                                                                className={`${styles.medalIcon} ${styles.silver}`}
                                                            />
                                                        )}
                                                        {student.rank === 3 && (
                                                            <Icon
                                                                icon="emojione:3rd-place-medal"
                                                                className={`${styles.medalIcon} ${styles.bronze}`}
                                                            />
                                                        )}
                                                        <span
                                                            className={`fw-bold ${
                                                                student.rank <=
                                                                3
                                                                    ? "fs-5"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {student.rank}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>{student.name}</td>
                                                <td>
                                                    <span className="font-semibold">
                                                        {student.score}/
                                                        {student.total}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            handleViewAnswerSheet(
                                                                student
                                                            )
                                                        }
                                                    >
                                                        View Answers
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination Component */}
                {currentResults.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        totalItems={currentResults.length}
                        onPageChange={setCurrentPage}
                    />
                )}

                {/* Answer Sheet Modal */}
                <AnswerSheetModal
                    show={showAnswerSheet}
                    onClose={handleCloseAnswerSheet}
                    student={selectedStudent}
                    courseName={
                        courses.find((c) => c.id === selectedCourse)?.name
                    }
                    answerSheets={answerSheets}
                />
            </div>
        </>
    );
};

ExamResult.layout = (page) => <Layout children={page} />;
export default ExamResult;
