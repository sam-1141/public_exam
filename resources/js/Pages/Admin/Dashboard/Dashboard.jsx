import { Link } from "@inertiajs/react";
import React from "react";
import Layout from "../../../layouts/Layout";

function AdminDashboard() {
    return (
        <div className="container-fluid py-4">
            {/* Quick Stats Row */}
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="mb-4 text-2xl font-semibold">
                        Dashboard Overview
                    </h2>
                </div>

                {/* Stats Cards */}
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card card-statistic bg-primary text-white">
                        <div className="card-body">
                            <h5 className="card-title">Total Questions</h5>
                            <h2 className="mb-0">12,450</h2>
                            <div className="d-flex justify-content-between mt-2">
                                <small>Last 7 days: +320</small>
                                <i className="fas fa-question-circle"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card card-statistic bg-success text-white">
                        <div className="card-body">
                            <h5 className="card-title">Active Exams</h5>
                            <h2 className="mb-0">24</h2>
                            <div className="d-flex justify-content-between mt-2">
                                <small>Upcoming: 5</small>
                                <i className="fas fa-clipboard-list"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card card-statistic bg-warning text-dark">
                        <div className="card-body">
                            <h5 className="card-title">Total Students</h5>
                            <h2 className="mb-0">3,842</h2>
                            <div className="d-flex justify-content-between mt-2">
                                <small>New today: 42</small>
                                <i className="fas fa-users"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card card-statistic bg-info text-white">
                        <div className="card-body">
                            <h5 className="card-title">Pending Actions</h5>
                            <h2 className="mb-0">8</h2>
                            <div className="d-flex justify-content-between mt-2">
                                <small>Reviews: 5</small>
                                <i className="fas fa-tasks"></i>
                            </div>
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

                <div className="col-md-3 col-sm-6 mb-3">
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

                <div className="col-md-3 col-sm-6 mb-3">
                    <Link
                        href="/add-questions"
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

                <div className="col-md-3 col-sm-6 mb-3">
                    <Link href="/" className="card quick-action-card">
                        <div className="card-body text-center">
                            <div className="action-icon mb-2">
                                <i className="fas fa-user-cog text-warning"></i>
                            </div>
                            <h6 className="mb-0">Manage Users</h6>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                    <Link href="/" className="card quick-action-card">
                        <div className="card-body text-center">
                            <div className="action-icon mb-2">
                                <i className="fas fa-chart-bar text-info"></i>
                            </div>
                            <h6 className="mb-0">View Reports</h6>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

AdminDashboard.layout = (page) => <Layout children={page} />;
export default AdminDashboard;
