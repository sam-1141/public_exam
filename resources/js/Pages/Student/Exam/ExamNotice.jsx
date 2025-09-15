import React, {useEffect, useState} from "react";
import Layout from "./../../../layouts/Layout"
import { router } from "@inertiajs/react";
import {route} from "ziggy-js";

const ExamNotice = ({ exam }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleStartNow = () => {
        setShowConfirmationModal(true);
    };

    const confirmStartExam = () => {
        setShowConfirmationModal(false);
        router.get(route('student.live.exam.main', { examSlug: exam.slug}))
    };

    const handleLater = () => {
        router.get(route("dashboard"));
    };

    return (
        <div className="container py-2 font-baloo">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {/* Header */}
                    <h2 className="text-center mb-4 text-primary fw-bold">
                        পরীক্ষার নোটিশ বোর্ড
                    </h2>

                    {/* Main Card */}
                    <div className="card shadow-sm border-0">
                        {/* Exam Info Section */}
                        <div className="card-header bg-primary bg-opacity-10 border-bottom">
                            <h5 className="card-title mb-0 text-primary">
                                {exam.name}
                            </h5>
                        </div>

                        <div className="card-body">
                            <div className="mb-4 p-3 bg-light rounded">
                                <p className="mb-1">
                                    <span className="fw-semibold">
                                        পরীক্ষা শুরু:
                                    </span>{" "}
                                    {new Date(exam.start_time).toLocaleString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                                </p>
                                <p className="mb-1">
                                    <span className="fw-semibold">
                                        পরীক্ষা শেষ:
                                    </span>{" "}
                                    {new Date(exam.end_time).toLocaleString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                                </p>
                                <p className="mb-0">
                                    <span className="fw-semibold">
                                        পরীক্ষার সময়কাল:
                                    </span>{" "}
                                    {exam.duration.toLocaleString('bn-BD')} মিনিট (একবার শুরু করলে)
                                </p>
                            </div>

                            {/* Instructions Section */}
                            <div>
                                <h5 className="mb-3 fw-semibold text-dark">
                                    পরীক্ষার নির্দেশাবলী
                                </h5>
                                <ul className="list-group list-group-flush mb-4">
                                    <li className="list-group-item d-flex align-items-start border-0 px-0 py-2">
                                        <span className="badge bg-primary me-2">
                                            ১
                                        </span>
                                        পরীক্ষা দেওয়ার সময়সীমা: {new Date(exam.start_time).toLocaleString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                                        থেকে {new Date(exam.end_time).toLocaleString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                                    </li>
                                    <li className="list-group-item d-flex align-items-start border-0 px-0 py-2">
                                        <span className="badge bg-primary me-2">
                                            ২
                                        </span>
                                        এই {Math.floor((new Date(exam.end_time) - new Date(exam.start_time)) / (1000 * 60 * 60)).toLocaleString('bn-BD')} ঘণ্টার মধ্যে যে কোনো সময় পরীক্ষা
                                        শুরু করতে পারবে
                                    </li>
                                    <li className="list-group-item d-flex align-items-start border-0 px-0 py-2">
                                        <span className="badge bg-primary me-2">
                                            ৩
                                        </span>
                                        একবার শুরু করলে অবশ্যই {exam.duration.toLocaleString('bn-BD')} মিনিটের মধ্যে
                                        শেষ করতে হবে
                                    </li>
                                    <li className="list-group-item d-flex align-items-start border-0 px-0 py-2">
                                        <span className="badge bg-primary me-2">
                                            ৪
                                        </span>
                                        পরীক্ষার সময় ইন্টারনেট সংযোগ স্থির
                                        রাখবে
                                    </li>
                                    <li className="list-group-item d-flex align-items-start border-0 px-0 py-2">
                                        <span className="badge bg-primary me-2">
                                            ৫
                                        </span>
                                        সময় শেষ হওয়ার আগেই উত্তর জমা দেয়ার
                                        চেষ্টা করবে
                                    </li>
                                </ul>

                                {/* Action Buttons */}
                                <div className="d-grid gap-3 d-md-flex justify-content-md-center mt-4">
                                    <button
                                        onClick={handleStartNow}
                                        className="btn btn-success px-4 py-2 fw-medium d-flex align-items-center"
                                    >
                                        <i className="bi bi-play-fill me-2"></i>
                                        এখনই শুরু করো
                                    </button>
                                    <button
                                        onClick={handleLater}
                                        className="btn btn-secondary px-4 py-2 fw-medium d-flex align-items-center"
                                    >
                                        <i className="bi bi-clock me-2"></i>
                                        পরে দেব
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <div
                className={`modal fade ${
                    showConfirmationModal ? "show d-block" : ""
                }`}
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                পরীক্ষা শুরু করার নিশ্চিতকরণ
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowConfirmationModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                তুমি কি নিশ্চিত যে তুমি পরীক্ষা শুরু করতে চাও?
                                পরীক্ষা শুরু করলে ৪০ মিনিটের মধ্যে শেষ করতে হবে।
                                <br />
                            </p>
                            <p className="fw-semibold">নিশ্চিত?</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowConfirmationModal(false)}
                            >
                                বাতিল
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={confirmStartExam}
                            >
                                শুরু
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmationModal && (
                <div className="modal-backdrop fade show"></div>
            )}
        </div>
    );
};

ExamNotice.layout = (page) => <Layout children={page} />;
export default ExamNotice;
