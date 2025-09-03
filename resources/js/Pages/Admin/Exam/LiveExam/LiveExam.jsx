import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddLiveExamModal from "./AddLiveExam";
import ExamCard from "../../../../components/Exam/ExamCard";
import Layout from "../../../../layouts/Layout";
import EditExamModal from "../../../../Pages/Admin/Exam/EditExam.jsx";
import ExamSearch from "../../../../components/Exam/ExamSearch.jsx";

const LiveExam = ({ courses, subjects }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const [editExamSlug, setEditExamSlug] = useState(null);
    const [editExamData, setEditExamData] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    // Add filters state
    const [filters, setFilters] = useState({
        course: "",
        subject: "",
        search: "",
    });

    const fetchExams = (url = null) => {
        setLoading(true);
        let requestUrl = url ?? route("show.exam.list");

        // Add query parameters if filters are applied
        if (!url && (filters.course || filters.subject || filters.search)) {
            const params = new URLSearchParams();
            if (filters.course) params.append("course", filters.course);
            if (filters.subject) params.append("subject", filters.subject);
            if (filters.search) params.append("search", filters.search);

            requestUrl = `${requestUrl}?${params.toString()}`;
        }

        axios
            .get(requestUrl)
            .then((res) => {
                setExams(res.data.exams || []);
            })
            .catch(() => {
                toast.error("Failed to load exams");
                setExams([]);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchExams();
    }, [refresh, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (url) => {
        if (!url) return;
        fetchExams(url);
    };

    const onClose = () => {
        setEditExamSlug(null);
        setEditExamData(null);
        setEditModalOpen(false);
    };

    useEffect(() => {
        if (editExamSlug) {
            setEditExamData(null);
            setEditLoading(true);
            axios
                .get(route("get.single.exam", { slug: editExamSlug }))
                .then((res) => {
                    setEditExamData(res.data.exam);
                    setEditModalOpen(true);
                })
                .catch(() => {
                    toast.error("Failed to load exam");
                    setEditModalOpen(false);
                })
                .finally(() => setEditLoading(false));
        } else {
            setEditModalOpen(false);
            setEditExamData(null);
        }
    }, [editExamSlug]);

    const handleExamCreated = () => {
        setRefresh((prev) => !prev);
        toast.success("Exam created successfully!");
    };

    const handleExamUpdated = () => {
        setRefresh((prev) => !prev);
        setEditModalOpen(false);
        setEditExamSlug(null);
        toast.success("Exam updated successfully!");
    };

    return (
        <div className="container py-4">
            <ToastContainer position="top-right" autoClose={2500} />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link href={route("admin.add.exam")} className="btn btn-sm ">
                    <i className="fas fa-arrow-left me-1"></i>Back
                </Link>
                <h2 className="font-semibold text-2xl text-center">
                    Live Exams
                </h2>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowAddModal(true)}
                >
                    <i className="ti ti-plus me-1"></i>Add Exam
                </button>
            </div>

            {/*  ExamSearch component */}
            <ExamSearch
                courses={courses}
                subjects={subjects}
                onFilterChange={handleFilterChange}
            />

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
                                examType="live"
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
                            <h4 className="mb-2">No Live Exams Found</h4>
                            <p className="text-muted mb-4">
                                You haven't created any live exams yet
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

            <AddLiveExamModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={handleExamCreated}
                courses={courses}
                subjects={subjects}
            />

            {editModalOpen && editExamData && (
                <EditExamModal
                    show={true}
                    onClose={onClose}
                    exam={editExamData}
                    loading={editLoading}
                    onSuccess={handleExamUpdated}
                    courses={courses}
                    subjects={subjects}
                />
            )}
        </div>
    );
};

LiveExam.layout = (page) => <Layout children={page} />;
export default LiveExam;
