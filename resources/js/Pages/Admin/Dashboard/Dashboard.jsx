import React from "react";
import Layout from "../../../layouts/Layout";
import { exams, practiceExams } from "../Exam/exam";
import { route } from "ziggy-js";
import { Link } from "@inertiajs/react";

function AdminDashboard() {
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
                <div className="col-lg-3 col-md-6">
                    <div className="card card-statistic bg-primary text-white">
                        <div className="card-body">
                            <h5 className="card-title">Total Questions</h5>
                            <h2 className="mb-0">12,450</h2>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 ">
                    <div className="card card-statistic bg-success text-white">
                        <div className="card-body">
                            <h5 className="card-title">Total Exams</h5>
                            <h2 className="mb-0">
                                {exams.length + practiceExams.length}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Row */}
            <div className="row mb-4">
                <div className="col-12">
                    <h4 className="mb-3 text-xl font-semibold">
                        Quick Actions
                    </h4>
                </div>

                <div className="col-md-3 col-sm-6 ">
                    <Link
                        href="/add-questions"
                        className="card quick-action-card"
                    >
                        <div className="card-body text-center">
                            <div className="action-icon mb-2">
                                <i className="fas fa-plus-circle text-primary"></i>
                            </div>
                            <h6 className="mb-0">Add New Question</h6>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 col-sm-6">
                    <Link
                        href="/admin/add-exam/live-exam"
                        className="card quick-action-card"
                    >
                        <div className="card-body text-center">
                            <div className="action-icon mb-2">
                                <i className="fas fa-file-alt text-success"></i>
                            </div>
                            <h6 className="mb-0">Create Exam</h6>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Exams Section */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title font-bold text-xl">
                                Live Exams
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {exams.map((exam) => (
                                    <div key={exam.id} className="col-md-12 ">
                                        <Link
                                            href={route("admin.exam.details", {
                                                exam: exam.id,
                                                type: "live",
                                            })}
                                            className="card exam-card "
                                        >
                                            <div className="card-body">
                                                <h5 className="card-title font-semibold text-lg">
                                                    {exam.title}
                                                </h5>
                                                <p className="card-text text-muted">
                                                    {exam.description.substring(
                                                        0,
                                                        100
                                                    )}
                                                    ...
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title font-bold text-xl">
                                Practice Exams
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {practiceExams.map((exam) => (
                                    <div key={exam.id} className="col-md-12">
                                        <Link
                                            href={route("admin.exam.details", {
                                                exam: exam.id,
                                                type: "practice",
                                            })}
                                            className="card exam-card"
                                        >
                                            <div className="card-body">
                                                <h5 className="card-title font-semibold text-lg">
                                                    {exam.title}
                                                </h5>
                                                <p className="card-text text-muted">
                                                    {exam.description.substring(
                                                        0,
                                                        100
                                                    )}
                                                    ...
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AdminDashboard.layout = (page) => <Layout children={page} />;
export default AdminDashboard;
