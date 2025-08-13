import React, { useState, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import { Icon } from "@iconify/react";
import { leaderboardData, exams } from "./leaderboardData";
import styles from "./Leaderboard.module.css";
import Pagination from "../../../components/Pagination/Pagination";

const Leaderboard = () => {
    const [selectedExam, setSelectedExam] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleExamSelect = (e) => {
        setSelectedExam(e.target.value);
        setCurrentPage(1);
    };

    // Get selected exam details
    const selectedExamDetails = exams.find((exam) => exam.id === selectedExam);

    // Pagination logic
    const currentLeaderboard = selectedExam
        ? leaderboardData[selectedExam]
        : [];
    const totalPages = Math.ceil(currentLeaderboard.length / itemsPerPage);
    const currentItems = currentLeaderboard.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const downloadAsCSV = () => {
        const csvUrl = "/leaderboard.xlsx";
        const link = document.createElement("a");
        link.href = csvUrl;
        link.download = "leaderboard.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-md-8">
                    <h3 className="h3 font-semibold mb-3">
                        Course Leaderboard
                    </h3>
                    <div className="d-flex">
                        <select
                            className="form-select w-75"
                            value={selectedExam}
                            onChange={handleExamSelect}
                            required
                        >
                            <option value="">Select a course...</option>
                            {exams.map((exam) => (
                                <option key={exam.id} value={exam.id}>
                                    {exam.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {!selectedExam ? (
                <div className="card card-body p-4 text-center my-5">
                    <h3 className="card-text text-muted">
                        Please select a course to view the leaderboard
                    </h3>
                </div>
            ) : (
                <div className="row">
                    <div className="col-12">
                        {/* Course Details Card */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <h4 className="h5 card-title mb-1 font-semibold">
                                            {selectedExamDetails?.name}
                                        </h4>
                                        <p className="card-text text-muted mb-2">
                                            {selectedExamDetails?.description ||
                                                "Course description not available"}
                                        </p>
                                        <div className="d-flex gap-4">
                                            <div>
                                                <span className="text-muted">
                                                    Participants:
                                                </span>
                                                <span className="fw-bold ms-2">
                                                    {currentLeaderboard.length}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-muted">
                                                    Top Score:
                                                </span>
                                                <span className="fw-bold ms-2">
                                                    {currentLeaderboard[0]
                                                        ?.score || 0}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-muted">
                                                    Average Score:
                                                </span>
                                                <span className="fw-bold ms-2">
                                                    {Math.round(
                                                        currentLeaderboard.reduce(
                                                            (acc, curr) =>
                                                                acc +
                                                                curr.score,
                                                            0
                                                        ) /
                                                            currentLeaderboard.length
                                                    ) || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                        <button
                                            className="btn btn-success d-inline-flex align-items-center gap-2"
                                            onClick={downloadAsCSV}
                                        >
                                            <Icon icon="vscode-icons:file-type-excel" />
                                            Export to CSV
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive border rounded shadow-sm">
                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "15%" }}>Rank</th>
                                        <th style={{ width: "35%" }}>
                                            Participant
                                        </th>
                                        <th style={{ width: "25%" }}>Score</th>
                                        <th style={{ width: "25%" }}>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={`
                                                ${
                                                    item.rank === 1
                                                        ? styles.goldRow
                                                        : ""
                                                }
                                                ${
                                                    item.rank === 2
                                                        ? styles.silverRow
                                                        : ""
                                                }
                                                ${
                                                    item.rank === 3
                                                        ? styles.bronzeRow
                                                        : ""
                                                }
                                            `}
                                        >
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    {item.rank === 1 && (
                                                        <Icon
                                                            icon="emojione:1st-place-medal"
                                                            className={`${styles.medalIcon} ${styles.gold}`}
                                                        />
                                                    )}
                                                    {item.rank === 2 && (
                                                        <Icon
                                                            icon="emojione:2nd-place-medal"
                                                            className={`${styles.medalIcon} ${styles.silver}`}
                                                        />
                                                    )}
                                                    {item.rank === 3 && (
                                                        <Icon
                                                            icon="emojione:3rd-place-medal"
                                                            className={`${styles.medalIcon} ${styles.bronze}`}
                                                        />
                                                    )}
                                                    <span
                                                        className={`fw-bold ${
                                                            item.rank <= 3
                                                                ? "fs-5"
                                                                : ""
                                                        }`}
                                                    >
                                                        {item.rank}
                                                    </span>
                                                </div>
                                            </td>
                                            <td
                                                className={`${
                                                    item.rank <= 3
                                                        ? "fw-bold"
                                                        : ""
                                                }`}
                                            >
                                                {item.name}
                                            </td>
                                            <td
                                                className={`fw-bold ${
                                                    item.rank <= 3 ? "fs-5" : ""
                                                }`}
                                            >
                                                {item.score}
                                            </td>
                                            <td>{item.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}
                            totalItems={currentLeaderboard.length}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

Leaderboard.layout = (page) => <Layout children={page} />;
export default Leaderboard;
