import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import Layout from "../../../../layouts/Layout";
import { route } from "ziggy-js";
import ExamCard from "../../../../components/Exam/ExamCard";
import axios from "axios";
import { toast } from "react-toastify";

const PracticeExam = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const [editExamSlug, setEditExamSlug] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(route("show.practise.exam.list"))
            .then((res) => {
                setExams(res.data.exams || []);
            })
            .catch(() => {
                toast.error("Failed to load exams");
                setExams([]);
            })
            .finally(() => setLoading(false));
    }, [refresh]);

    return (
        <div className="container py-4">
            {/* Header with buttons */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <Link
                        href={route("admin.add.exam")}
                        className="btn btn-sm "
                    >
                        <i className="fas fa-arrow-left me-1"></i>Back
                    </Link>
                </div>
                {/* Page title */}
                <h2 className="font-semibold text-2xl text-center">
                    Practice Exams
                </h2>
            </div>

            {/* Exams list */}
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-25">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* Exam data */}
                    <div className="row">
                        {exams?.data?.map((exam) => (
                            <ExamCard
                                key={exam.id}
                                exam={exam}
                                examType="practice"
                                setEditExamSlug={setEditExamSlug}
                            />
                        ))}
                    </div>

                    {/* Empty state */}
                    {exams?.data?.length === 0 && (
                        <div className="card-body bg-white text-center py-5 mt-5">
                            <div className="mb-3">
                                <i className="fas fa-calendar-times fa-3x text-muted"></i>
                            </div>
                            <h4 className="mb-2">No Practice Exams Found</h4>
                            <p className="text-muted mb-4">
                                You haven't created any practice exams yet
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {exams.data.length > 0 && (
                        <div>
                            {exams.links.length > 0 && (
                                <nav className="d-flex justify-content-center mt-4">
                                    <ul className="pagination">
                                        {exams.links.length > 0 && (
                                            <nav className="d-flex justify-content-center mt-4">
                                                <ul className="pagination">
                                                    {exams.links.map(
                                                        (link, i) => (
                                                            <li
                                                                key={i}
                                                                className={`page-item ${
                                                                    link.active
                                                                        ? "active"
                                                                        : ""
                                                                } ${
                                                                    !link.url
                                                                        ? "disabled"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {link.url ? (
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() =>
                                                                            handlePageChange(
                                                                                link.url
                                                                            )
                                                                        }
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: link.label,
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <span
                                                                        className="page-link"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: link.label,
                                                                        }}
                                                                    />
                                                                )}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </nav>
                                        )}
                                    </ul>
                                </nav>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

PracticeExam.layout = (page) => <Layout children={page} />;
export default PracticeExam;
