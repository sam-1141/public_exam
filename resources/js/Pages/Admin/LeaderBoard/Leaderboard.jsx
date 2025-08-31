import React, { useState, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import { Icon } from "@iconify/react";
import styles from "./Leaderboard.module.css";
import Pagination from "../../../components/Pagination/Pagination";
import { route } from "ziggy-js";
import axios from "axios";
import { exportLeaderboardToCSV } from "./csvExporter";

const Leaderboard = ({ examsInfo }) => {
    const [selectedExam, setSelectedExam] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [examInfo, setExamInfo] = useState(null);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [allRankedData, setAllRankedData] = useState([]); // Store all ranked data
    const itemsPerPage = 10;

    const handleExamSelect = (e) => {
        setSelectedExam(e.target.value);
        setCurrentPage(1);
        setLeaderboardData([]); // Clear previous data
        setAllRankedData([]); // Clear all ranked data when exam changes
    };

    useEffect(() => {}, [examsInfo]);

    // Get exam names from examsInfo
    const examNames = examsInfo.map((item) => ({
        name: item.name,
        slug: item.slug,
    }));

    // Fetch leaderboard data when exam changes
    useEffect(() => {
        if (selectedExam) {
            setIsLoading(true);
            axios
                .get(
                    route("admin.leaderboard.list", {
                        examSlug: selectedExam,
                        page: currentPage,
                    })
                )
                .then((res) => {
                    console.log("Full API Response:", res.data);
                    // Set exam info
                    setExamInfo(res.data.examInfo);
                    // Set leaderboard data
                    setLeaderboardData(res.data.attendanceInfo?.data || []);
                    // Set pagination info
                    setPaginationInfo({
                        current_page:
                            res.data.attendanceInfo?.current_page || 1,
                        last_page: res.data.attendanceInfo?.last_page || 1,
                        total: res.data.attendanceInfo?.total || 0,
                        from: res.data.attendanceInfo?.from || 0,
                        to: res.data.attendanceInfo?.to || 0,
                    });
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch leaderboard:", err);
                    console.error("Error details:", err.response?.data);
                    console.error("Error status:", err.response?.status);
                    setIsLoading(false);
                });
        }
    }, [selectedExam, currentPage]);

    // Calculate global ranks based on the current page and pagination info
    const calculateRanks = (data, page, itemsPerPage) => {
        if (!data.length) return [];

        // Calculate the starting rank for this page
        const startRank = (page - 1) * itemsPerPage + 1;

        // Add rank property starting from the correct position
        return data.map((item, index) => ({
            ...item,
            rank: startRank + index,
        }));
    };

    // Get selected exam details
    const selectedExamDetails =
        examInfo || examsInfo.find((exam) => exam.slug === selectedExam);

    // Calculate ranks for the current page data
    const rankedData = calculateRanks(
        leaderboardData,
        currentPage,
        itemsPerPage
    );

    // Calculate statistics
    const totalParticipants = paginationInfo.total || rankedData.length;

    const downloadAsCSV = () => {
        if (rankedData.length === 0) {
            alert("No data to export");
            return;
        }

        axios
            .get(
                route("admin.leaderboard.list.export", {
                    examSlug: selectedExam,
                })
            )
            .then((res) => {
                exportLeaderboardToCSV(res.data.attendanceInfo, selectedExamDetails?.name);
            })
            .catch(() => {
                alert('Failed to fetch leaderboard data for CSV export.');
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top when page changes
    };

    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-md-8">
                    <h3 className="h3 font-semibold mb-3">Exam Leaderboard</h3>
                    <div className="d-flex">
                        <select
                            className="form-select w-75"
                            value={selectedExam}
                            onChange={handleExamSelect}
                            required
                        >
                            <option value="">Select an exam...</option>
                            {examNames.map((exam, index) => (
                                <option key={index} value={exam.slug}>
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
                        Please select an exam to view the leaderboard
                    </h3>
                </div>
            ) : (
                <div className="row">
                    <div className="col-12">
                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="text-center my-4">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        )}

                        {!isLoading && (
                            <>
                                {/* Exam Details Card */}
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-8">
                                                <h4 className="h5 card-title mb-1 font-semibold">
                                                    {selectedExamDetails?.name}
                                                </h4>
                                                <p className="card-text text-muted mb-2">
                                                    Exam Slug:{" "}
                                                    {selectedExamDetails?.slug}
                                                </p>
                                                <div className="d-flex gap-4">
                                                    <div>
                                                        <span className="text-muted">
                                                            Participants:
                                                        </span>
                                                        <span className="fw-bold ms-2">
                                                            {totalParticipants}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted">
                                                            Top Score:
                                                        </span>
                                                        <span className="fw-bold ms-2">
                                                          {'00'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                                <button
                                                    className="btn btn-success d-inline-flex align-items-center gap-2"
                                                    onClick={downloadAsCSV}
                                                    disabled={
                                                        rankedData.length === 0
                                                    }
                                                >
                                                    <Icon icon="vscode-icons:file-type-excel" />
                                                    Export to CSV
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Leaderboard Table */}
                                {leaderboardData.length > 0 ? (
                                    <>
                                        <div className="table-responsive border rounded shadow-sm">
                                            <table className="table align-middle">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th
                                                            style={{
                                                                width: "15%",
                                                            }}
                                                        >
                                                            Rank
                                                        </th>
                                                        <th
                                                            style={{
                                                                width: "25%",
                                                            }}
                                                        >
                                                            Name
                                                        </th>
                                                        <th
                                                            style={{
                                                                width: "20%",
                                                            }}
                                                        >
                                                            Score
                                                        </th>
                                                        <th
                                                            style={{
                                                                width: "15%",
                                                            }}
                                                        >
                                                            Submit Time
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {leaderboardData.map(
                                                        (item, index) => (
                                                            <tr
                                                                key={item?.serial}
                                                                className={`
                                                                ${
                                                                    item?.serial ===
                                                                    1
                                                                        ? styles.goldRow
                                                                        : ""
                                                                }
                                                                ${
                                                                    item?.serial ===
                                                                    2
                                                                        ? styles.silverRow
                                                                        : ""
                                                                }
                                                                ${
                                                                    item?.serial ===
                                                                    3
                                                                        ? styles.bronzeRow
                                                                        : ""
                                                                }
                                                            `}
                                                            >
                                                                <td>
                                                                    <div className="d-flex align-items-center gap-2">

                                                                        <span
                                                                            className={`fw-bold ${
                                                                                item?.serial <=
                                                                                3
                                                                                    ? "fs-5"
                                                                                    : ""
                                                                            }`}
                                                                        >
                                                                            {
                                                                                item?.serial
                                                                            }
                                                                        </span>
                                                                        {item?.serial ===
                                                                            1 && (
                                                                            <Icon
                                                                                icon="emojione:1st-place-medal"
                                                                                className={`${styles.medalIcon} ${styles.gold}`}
                                                                            />
                                                                        )}
                                                                        {item?.serial ===
                                                                            2 && (
                                                                            <Icon
                                                                                icon="emojione:2nd-place-medal"
                                                                                className={`${styles.medalIcon} ${styles.silver}`}
                                                                            />
                                                                        )}
                                                                        {item?.serial ===
                                                                            3 && (
                                                                            <Icon
                                                                                icon="emojione:3rd-place-medal"
                                                                                className={`${styles.medalIcon} ${styles.bronze}`}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    className={`${
                                                                        item?.serial <=
                                                                        3
                                                                            ? "fw-bold"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    {
                                                                        item.student_name
                                                                    }
                                                                </td>
                                                                <td
                                                                    className={`fw-bold ${
                                                                        item.serial <=
                                                                        3
                                                                            ? "fs-5"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    {
                                                                        item.student_total_mark ?? 0
                                                                    }
                                                                    /
                                                                    {
                                                                        item.exam_total_mark
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.submit_time ?? "N/A"
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        <Pagination
                                            currentPage={
                                                paginationInfo.current_page || 1
                                            }
                                            totalPages={
                                                paginationInfo.last_page || 1
                                            }
                                            itemsPerPage={itemsPerPage}
                                            totalItems={
                                                paginationInfo.total || 0
                                            }
                                            onPageChange={handlePageChange}
                                        />
                                    </>
                                ) : (
                                    <div className="card card-body p-4 text-center">
                                        <h5 className="card-text text-muted">
                                            No participants found for this exam
                                        </h5>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

Leaderboard.layout = (page) => <Layout children={page} />;
export default Leaderboard;
