import React, { useState, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import { Icon } from "@iconify/react";
import styles from "./Leaderboard.module.css";

const Leaderboard = () => {
    const [selectedExam, setSelectedExam] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sample data with user images
    const leaderboardData = [
        {
            id: 1,
            name: "John Doe",
            rank: 1,
            institute: "Harvard University",
            score: 98,
            time: "1:23:45",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
            id: 2,
            name: "Jane Smith",
            rank: 2,
            institute: "Stanford University",
            score: 95,
            time: "1:25:12",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        {
            id: 3,
            name: "Alex Johnson",
            rank: 3,
            institute: "MIT",
            score: 93,
            time: "1:26:33",
            image: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
            id: 4,
            name: "Sarah Williams",
            rank: 4,
            institute: "Cambridge University",
            score: 90,
            time: "1:28:45",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
            id: 5,
            name: "Michael Brown",
            rank: 5,
            institute: "Oxford University",
            score: 88,
            time: "1:30:12",
            image: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
            id: 6,
            name: "Emily Davis",
            rank: 6,
            institute: "Yale University",
            score: 85,
            time: "1:32:33",
            image: "https://randomuser.me/api/portraits/women/3.jpg",
        },
    ];

    // Exams data
    const exams = [
        { id: "math", name: "Mathematics Olympiad" },
        { id: "science", name: "Science Challenge" },
        { id: "coding", name: "Coding Competition" },
    ];

    // Continuous confetti effect
    useEffect(() => {
        const timer = setInterval(() => {
            // This keeps the confetti animation running continuously
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const handleExamSelect = (e) => {
        setSelectedExam(e.target.value);
        setCurrentPage(1);
    };

    // Pagination logic
    const totalPages = Math.ceil(leaderboardData.length / itemsPerPage);
    const currentItems = leaderboardData.slice(
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
        <div className={styles.container}>
            {/* Continuous confetti animation */}
            {/* <div className={styles.confettiContainer}>
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.confetti}
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            backgroundColor: `hsl(${
                                Math.random() * 360
                            }, 100%, 50%)`,
                        }}
                    />
                ))}
            </div> */}

            <div>
                <h1 className={styles.title}>Course Leaderboard</h1>
                <div className={styles.examSelector}>
                    <select
                        className={styles.formSelect}
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

            {!selectedExam ? (
                <div className="card card-body p-4 text-center my-5">
                    <h3 className="card-text">
                        Please select a course to view the leaderboard
                    </h3>
                </div>
            ) : (
                <div className={styles.content}>
                    <div className={styles.downloadButtons}>
                        <button
                            className={`${styles.downloadBtn} ${styles.excelBtn}`}
                            onClick={downloadAsExcel}
                        >
                            <Icon
                                icon="vscode-icons:file-type-excel"
                                className={styles.btnIcon}
                            />
                            Export to Excel
                        </button>
                        <button
                            className={`${styles.downloadBtn} ${styles.docBtn}`}
                            onClick={downloadAsDoc}
                        >
                            <Icon
                                icon="vscode-icons:file-type-word"
                                className={styles.btnIcon}
                            />
                            Export to Word
                        </button>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Institute</th>
                                    <th>Score</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={
                                            item.rank === 1
                                                ? styles.firstPlace
                                                : item.rank === 2
                                                ? styles.secondPlace
                                                : item.rank === 3
                                                ? styles.thirdPlace
                                                : ""
                                        }
                                    >
                                        <td>
                                            <div className={styles.rankCell}>
                                                {item.rank === 1 && (
                                                    <>
                                                        <div
                                                            className={
                                                                styles.confettiContainer
                                                            }
                                                        >
                                                            {[...Array(20)].map(
                                                                (_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={
                                                                            styles.confetti
                                                                        }
                                                                        style={{
                                                                            left: `${
                                                                                Math.random() *
                                                                                100
                                                                            }%`,
                                                                            animationDelay: `${
                                                                                Math.random() *
                                                                                2
                                                                            }s`,
                                                                            backgroundColor: `hsl(${
                                                                                Math.random() *
                                                                                360
                                                                            }, 100%, 50%)`,
                                                                        }}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                        <Icon
                                                            icon="emojione:1st-place-medal"
                                                            className={`${styles.medalIcon} ${styles.gold}`}
                                                        />
                                                    </>
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
                                                    className={
                                                        styles.rankNumber
                                                    }
                                                >
                                                    {item.rank}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.userCell}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className={styles.userImage}
                                                />
                                                {item.name}
                                            </div>
                                        </td>
                                        <td>{item.institute}</td>
                                        <td className={styles.scoreCell}>
                                            {item.score}
                                        </td>
                                        <td>{item.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    className={`${styles.pageButton} ${
                                        currentPage === i + 1
                                            ? styles.activePage
                                            : ""
                                    }`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

Leaderboard.layout = (page) => <Layout children={page} />;
export default Leaderboard;
