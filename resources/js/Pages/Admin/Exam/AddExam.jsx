import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "../../../layouts/Layout";
import { route } from "ziggy-js";

const AddExam = () => {
    return (
        <div className="container py-4">
            <h1 className="h3 font-semibold mb-4">Exam Management</h1>

            <div className="row g-3">
                {/* Live Exam Card */}
                <div className="col-md-6">
                    <Link
                        href={route("admin.add.live.exam")}
                        className="text-decoration-none"
                    >
                        <div className="card h-100 border-start border-primary border-4 hover-shadow">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="text-primary"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="h5 card-title mb-0 text-dark">
                                        Live Exams
                                    </h2>
                                </div>
                                <p className="card-text text-muted mb-3">
                                    Access and manage scheduled live exams.
                                    Create new exams, monitor ongoing ones, and
                                    review results.
                                </p>
                                <div className="text-primary fw-medium d-flex align-items-center">
                                    Manage Live Exams
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="ms-1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Practice Exam Card */}
                <div className="col-md-6">
                    <Link
                        href={route("admin.add.practice.exam")}
                        className="text-decoration-none"
                    >
                        <div className="card h-100 border-start border-success border-4 hover-shadow">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="text-success"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="h5 card-title mb-0 text-dark">
                                        Practice Exams
                                    </h2>
                                </div>
                                <p className="card-text text-muted mb-3">
                                    Manage practice exams and question banks.
                                    Create self-paced learning materials for
                                    students.
                                </p>
                                <div className="text-success fw-medium d-flex align-items-center">
                                    Manage Practice Exams
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="ms-1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

AddExam.layout = (page) => <Layout children={page} />;
export default AddExam;
