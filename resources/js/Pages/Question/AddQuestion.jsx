import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast, ToastContainer } from "react-toastify";

function AddQuestion({ classes, subjects, chapters, errors, flash }) {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedChapter, setSelectedChapter] = useState("");
    const [showDetailedForm, setShowDetailedForm] = useState(true); // State to toggle visibility
    // const [showQuickForm, setShowQuickForm] = useState(false); // State for Quick Question

    const [filteredSubjects, setFilteredSubjects] = useState([]);

    useEffect(() => {
        if (selectedClass) {
            const filtered = subjects.filter(
                (subject) => subject.class_id === selectedClass
            );
            setFilteredSubjects(filtered);
        } else {
            setFilteredSubjects([]);
        }
        setSelectedSubject("");
    }, [selectedClass, subjects]);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
            flash.success = null;
        }

        if (flash.error) {
            toast.error(flash.error);
            flash.error = null;
        }

        if (errors) {
            Object.values(errors).forEach((error) => {
                toast.error(error);
            });
            errors = null;
        }
    }, [flash, errors]);

    return (
        <>
            <ToastContainer />
            <h4 className="h3 font-semibold mb-4">Add Question</h4>
            <div className="card">
                <div className="card-body">
                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            {/* Detailed Question Button */}
                            {/* <button
                                className="btn btn-primary me-3"
                                onClick={() => {
                                    setShowDetailedForm(true);
                                    // setShowQuickForm(false);
                                }}
                            >
                                Detailed Question
                            </button> */}
                            {/* Quick Question Button */}
                            {/* <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setShowQuickForm(true);
                                    setShowDetailedForm(false);
                                }}
                            >
                                Quick Question
                            </button> */}
                        </div>
                    </div>

                    {/* Show form for Detailed Question */}
                    {showDetailedForm && (
                        <>
                            <div className="row mt-2">
                                {/* Class Dropdown */}
                                <div className="col-md-4 col-sm-6 col-12 mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="classSelect1"
                                    >
                                        Class
                                    </label>
                                    <select
                                        className="form-select"
                                        id="classSelect1"
                                        value={selectedClass}
                                        onChange={(e) =>
                                            setSelectedClass(e.target.value)
                                        }
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map((cls) => (
                                            <option key={cls.id} value={cls.id}>
                                                {cls.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subject Dropdown */}
                                <div className="col-md-4 col-sm-6 col-12 mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="classSelect2"
                                    >
                                        Subject
                                    </label>
                                    <select
                                        className="form-select"
                                        id="classSelect2"
                                        value={selectedSubject}
                                        onChange={(e) =>
                                            setSelectedSubject(e.target.value)
                                        }
                                        disabled={!selectedClass}
                                    >
                                        <option value="">Select Subject</option>
                                        {filteredSubjects.map((subject) => (
                                            <option
                                                key={subject.id}
                                                value={subject.id}
                                            >
                                                {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Chapter Dropdown */}
                                <div className="col-md-4 col-sm-6 col-12 mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="classSelect3"
                                    >
                                        Chapter
                                    </label>
                                    <select
                                        className="form-select"
                                        id="classSelect3"
                                        value={selectedChapter}
                                        onChange={(e) =>
                                            setSelectedChapter(e.target.value)
                                        }
                                        disabled={!selectedSubject}
                                    >
                                        <option value="">Select Chapter</option>
                                        {chapters.map((chapter) => (
                                            <option
                                                key={chapter.id}
                                                value={chapter.id}
                                            >
                                                {chapter.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="row mt-3">
                                <div className="col-12 text-center">
                                    <Link
                                        href={route("page.add.mcq", {
                                            class: selectedClass,
                                            subject: selectedSubject,
                                            chapter: selectedChapter,
                                        })}
                                    >
                                        <button
                                            className="btn btn-success"
                                            disabled={
                                                !selectedClass ||
                                                !selectedSubject ||
                                                !selectedChapter
                                            }
                                        >
                                            Proceed to Add Question
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

AddQuestion.layout = (page) => <Layout children={page} />;
export default AddQuestion;
