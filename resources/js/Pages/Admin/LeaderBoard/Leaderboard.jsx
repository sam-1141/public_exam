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

    // Pagination logic
    const currentLeaderboard = selectedExam
        ? leaderboardData[selectedExam]
        : [];
    const totalPages = Math.ceil(currentLeaderboard.length / itemsPerPage);
    const currentItems = currentLeaderboard.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Placeholder download functions
    const downloadAsDoc = () => {
        console.log("Download as DOC");
    };

    const downloadAsExcel = () => {
        console.log("Download as Excel");
    };

    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-md-8">
                    <h3 className="h3 font-semibold mb-3">
                        Course Leaderboard
                    </h3>
                    <div className="d-flex ">
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
                        <div className="d-flex justify-content-end mb-3 gap-2">
                            <button
                                className="btn btn-success d-flex align-items-center gap-2"
                                onClick={downloadAsExcel}
                            >
                                <Icon icon="vscode-icons:file-type-excel" />
                                Export to CSV
                            </button>
                            {/* <button
                                className="btn btn-primary d-flex align-items-center gap-2"
                                onClick={downloadAsDoc}
                            >
                                <Icon icon="vscode-icons:file-type-word" />
                                Export to Word
                            </button> */}
                        </div>

                        <div className="table-responsive border rounded shadow-sm">
                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "10%" }}>Rank</th>
                                        <th style={{ width: "25%" }}>
                                            Participant
                                        </th>
                                        <th style={{ width: "25%" }}>
                                            Institute
                                        </th>
                                        <th style={{ width: "10%" }}>Score</th>
                                        <th style={{ width: "10%" }}>Time</th>
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
                                            <td>
                                                <div className="d-flex align-items-center gap-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="rounded-circle"
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <span
                                                        className={`${
                                                            item.rank <= 3
                                                                ? "fw-bold"
                                                                : ""
                                                        }`}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>{item.institute}</td>
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
