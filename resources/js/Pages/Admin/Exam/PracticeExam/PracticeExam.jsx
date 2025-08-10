import React, {useEffect, useState} from "react";
import { Link } from "@inertiajs/react";
import Layout from "../../../../layouts/Layout";
import { route } from "ziggy-js";
import { exams, practiceExams } from "../exam";

import ExamCard from "../../../../components/Exam/ExamCard";
import axios from "axios";
import {toast} from "react-toastify";

const PracticeExam = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const [editExamSlug, setEditExamSlug] = useState(null);
    const [editExamData, setEditExamData] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editLoading, setEditLoading] = useState(false);


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
        // console.log("Fetching exam list...", exams);
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
                <h2 className="mb-4 font-semibold text-2xl text-center">
                    Practice Exams
                </h2>
            </div>

            {/* Exams list */}
            <div className="row">
                {exams.map((exam) => (
                    <ExamCard
                        key={exam.id}
                        exam={exam}
                        examType="practice"
                        setEditExamSlug={setEditExamSlug}
                    />
                ))}
            </div>

            {/* Empty state */}
            {exams.length === 0 && (
                <div className="text-center py-5">
                    <div className="mb-3">
                        <i className="fas fa-calendar-times fa-3x text-muted"></i>
                    </div>
                    <h4 className="mb-2">No Live Exams Found</h4>
                    <p className="text-muted mb-4">
                        You haven't created any live exams yet
                    </p>
                </div>
            )}
        </div>
    );
};

PracticeExam.layout = (page) => <Layout children={page} />;
export default PracticeExam;
