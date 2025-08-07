import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Layout from "../../../../layouts/Layout";
import { route } from "ziggy-js";
import { exams } from "../exam";
import AddLiveExamModal from "./AddLiveExam";
import ExamCard from "../../../../components/Exam/ExamCard";

const LiveExam = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        description: "",
        totalQuestions: "",
        negativeMarks: "no",
        totalMarks: "",
        duration: "",
        questionType: "random",
        timerRestriction: "off",
        privacy: "everyone",
        publishInstant: "no",
        batch: "all",
        startTime: "",
        endTime: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        setShowAddModal(false);
        // Reset form or keep data as needed
    };

    return (
        <div className="container py-4">
            {/* Header with buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link href={route("admin.add.exam")} className="btn btn-sm ">
                    <i className="fas fa-arrow-left me-1"></i>Back
                </Link>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowAddModal(true)}
                >
                    <i className="ti ti-plus me-1"></i>Add Exam
                </button>
            </div>

            {/* Page title */}
            <h2 className="mb-4 font-semibold text-2xl text-center">
                Live Exams
            </h2>

            {/* Exams list */}
            <div className="row">
                {exams.map((exam) => (
                    <ExamCard key={exam.id} exam={exam} examType="live" />
                ))}
            </div>

            {/* Empty state */}
            {exams.length === 0 && (
                <div className="text-center py-3">
                    <div className="mb-3">
                        <i className="fas fa-calendar-times fa-3x text-muted"></i>
                    </div>
                    <h4 className="mb-2">No Live Exams Found</h4>
                    <p className="text-muted mb-4">
                        You haven't created any live exams yet
                    </p>
                    <Link href="/exams/live/create" className="btn btn-primary">
                        <i className="fas fa-plus me-2"></i>Create Your First
                        Live Exam
                    </Link>
                </div>
            )}

            {/* Modal Component */}
            <AddLiveExamModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
};

LiveExam.layout = (page) => <Layout children={page} />;
export default LiveExam;
