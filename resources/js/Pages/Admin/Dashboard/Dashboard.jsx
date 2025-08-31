import React, { useEffect, useState } from "react";
import Layout from "../../../layouts/Layout";
import { route } from "ziggy-js";
import { Link } from "@inertiajs/react";
import axios from "axios";
import CourseWiseExams from "./CourseWiseExams";

function AdminDashboard({ courseInfo }) {
    const [liveExams, setLiveExams] = useState([]);
    const [practiceExams, setPracticeExams] = useState([]);
    const [loading, setLoading] = useState({
        live: true,
        practice: true,
    });
    const [showAllLive, setShowAllLive] = useState(false);
    const [showAllPractice, setShowAllPractice] = useState(false);

    // Fetch live exams
    useEffect(() => {
        setLoading((prev) => ({ ...prev, live: true }));
        axios
            .get(route("show.exam.list"))
            .then((res) => {
                setLiveExams(
                    Array.isArray(res.data.exams?.data)
                        ? res.data.exams.data
                        : []
                );
            })
            .catch(() => {
                setLiveExams([]);
            })
            .finally(() => setLoading((prev) => ({ ...prev, live: false })));
    }, []);

    // Fetch practice exams
    useEffect(() => {
        setLoading((prev) => ({ ...prev, practice: true }));
        axios
            .get(route("show.practise.exam.list"))
            .then((res) => {
                setPracticeExams(
                    Array.isArray(res.data.exams?.data)
                        ? res.data.exams.data
                        : Array.isArray(res.data.exams)
                        ? res.data.exams
                        : []
                );
            })
            .catch(() => {
                setPracticeExams([]);
            })
            .finally(() =>
                setLoading((prev) => ({ ...prev, practice: false }))
            );
    }, []);

    // Show only 5 items initially, or all if showAll is true
    const displayedLiveExams = showAllLive ? liveExams : liveExams.slice(0, 5);
    const displayedPracticeExams = showAllPractice
        ? practiceExams
        : practiceExams.slice(0, 5);

    const totalQuestions =
        displayedLiveExams.reduce(
            (acc, exam) => acc + exam?.totalQuestions || 0,
            0
        ) +
        displayedPracticeExams.reduce(
            (acc, exam) => acc + exam?.totalQuestions || 0,
            0
        );

    return (
        <div className="container-fluid py-4">
            {/* Quick Stats Row */}
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="mb-4 h3 font-semibold">
                        Dashboard Overview
                    </h2>
                </div>

                {/* Stats Cards */}
                <div className="col-12">
                    <div className="card card-statistic bg-blue-400 ">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="h5 card-title text-white">
                                Total Questions
                            </h5>
                            <h2 className="mb-0 text-white">
                                {totalQuestions}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/*Course Wise Exams Component */}
            <CourseWiseExams
                liveExams={liveExams}
                practiceExams={practiceExams}
                loading={loading}
            />

            {/* Exams Section */}
            {/* Live Exams Section */}
            <div className="mb-2">
                <div className="card ">
                    <div className="card-header ">
                        <h2 className="text-xl font-semibold mb-0">
                            Live Exams ({liveExams.length})
                        </h2>
                    </div>
                    <div className="card-body p-0">
                        {loading.live ? (
                            <div className="text-center py-4">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="list-group list-group-flush">
                                    {displayedLiveExams.map((exam, index) => (
                                        <Link
                                            key={exam.id}
                                            href={route("admin.exam.details", {
                                                exam: exam.slug,
                                                type: "live",
                                            })}
                                            className="list-group-item list-group-item-action border-0"
                                        >
                                            <div className="d-flex w-100 justify-content-between align-items-start ">
                                                <div className="flex-grow-1">
                                                    <h5 className="h4 font-semibold text-lg  text-gray-700">
                                                        {exam.name}
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        {exam.description?.substring(
                                                            0,
                                                            100
                                                        ) ||
                                                            "No description available"}
                                                        {exam.description
                                                            ?.length > 100
                                                            ? "..."
                                                            : ""}
                                                    </p>
                                                </div>
                                                <small className="text-muted ms-3">
                                                    <i className="fas fa-chevron-right"></i>
                                                </small>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {liveExams.length > 5 && (
                                    <div className="card-footer text-center bg-light">
                                        <Link
                                            href={route("admin.add.live.exam")}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            See All Live Exams (
                                            {liveExams.length})
                                        </Link>
                                    </div>
                                )}

                                {liveExams.length === 0 && !loading.live && (
                                    <div className="text-center py-5 text-muted">
                                        <i className="fas fa-inbox fa-2x mb-3 d-block"></i>
                                        No live exams found
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Practice Exams Section */}
            <div className="mb-2">
                <div className="card ">
                    <div className="card-header ">
                        <h2 className="text-xl font-semibold mb-0">
                            Practice Exams ({practiceExams.length})
                        </h2>
                    </div>
                    <div className="card-body p-0">
                        {loading.practice ? (
                            <div className="text-center py-4">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="list-group list-group-flush">
                                    {displayedPracticeExams.map((exam) => (
                                        <Link
                                            key={exam.id}
                                            href={route("admin.exam.details", {
                                                exam: exam.slug,
                                                type: "practice",
                                            })}
                                            className="list-group-item list-group-item-action border-0"
                                        >
                                            <div className="d-flex w-100 justify-content-between align-items-start ">
                                                <div className="flex-grow-1">
                                                    <h5 className="font-semibold text-lg text-gray-700">
                                                        {exam.name}
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        {exam.description?.substring(
                                                            0,
                                                            100
                                                        ) ||
                                                            "No description available"}
                                                        {exam.description
                                                            ?.length > 100
                                                            ? "..."
                                                            : ""}
                                                    </p>
                                                </div>
                                                <small className="text-muted ms-3">
                                                    <i className="fas fa-chevron-right"></i>
                                                </small>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {practiceExams.length > 5 && (
                                    <div className="card-footer text-center bg-light">
                                        <Link
                                            href={route(
                                                "admin.add.practice.exam"
                                            )}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            See All Practice Exams (
                                            {practiceExams.length})
                                        </Link>
                                    </div>
                                )}

                                {practiceExams.length === 0 &&
                                    !loading.practice && (
                                        <div className="text-center py-5 text-muted">
                                            <i className="fas fa-inbox fa-2x mb-3 d-block"></i>
                                            No practice exams found
                                        </div>
                                    )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

AdminDashboard.layout = (page) => <Layout children={page} />;
export default AdminDashboard;
