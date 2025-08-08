import React, { useState } from "react";
import axios from "axios";
import {route} from "ziggy-js";

const AddLiveExamModal = ({show, onClose, onSuccess}) => {
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        description: "",
        total_questions: "",
        has_negative_marks: false,
        negative_marks_value: "",
        total_marks: "",
        duration: "",
        question_type: "random",
        privacy: null,
        publish_instant: "1",
        start_time: "",
        end_time: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "privacy" && value === "" ? null
                : type === "checkbox" ? checked
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        try {
            await axios.post(
                route('execute.store.exam'),
                formData,
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                }
            );
            setFormData({
                name: "",
                subject: "",
                description: "",
                total_questions: "",
                has_negative_marks: false,
                negative_marks_value: "",
                total_marks: "",
                duration: "",
                question_type: "random",
                privacy: null,
                publish_instant: "1",
                start_time: "",
                end_time: "",
            });
            onClose();
            if (onSuccess) onSuccess();
        } catch (err) {
            if (err.response) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else if (err.response.status === 401) {
                    setErrors({ general: "You must be logged in to create an exam." });
                } else {
                    setErrors({ general: "Something went wrong!" });
                }
            } else {
                setErrors({ general: "Network error." });
            }
        }
        setSubmitting(false);
    };

    if (!show) return null;

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-xl font-semibold">
                            Create New Live Exam
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {errors.general && (
                                <div className="alert alert-danger">{errors.general}</div>
                            )}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Name:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Subject:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                        {errors.subject && (
                                            <div className="invalid-feedback">
                                                {errors.subject[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description:</label>
                                        <textarea
                                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="3"
                                        ></textarea>
                                        {errors.description && (
                                            <div className="invalid-feedback">
                                                {errors.description[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Total Questions:</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.total_questions ? "is-invalid" : ""}`}
                                            name="total_questions"
                                            value={formData.total_questions}
                                            onChange={handleChange}
                                        />
                                        {errors.total_questions && (
                                            <div className="invalid-feedback">
                                                {errors.total_questions[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Total Marks:</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.total_marks ? "is-invalid" : ""}`}
                                            name="total_marks"
                                            value={formData.total_marks}
                                            onChange={handleChange}
                                        />
                                        {errors.total_marks && (
                                            <div className="invalid-feedback">
                                                {errors.total_marks[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Duration (min):</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.duration ? "is-invalid" : ""}`}
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                        />
                                        {errors.duration && (
                                            <div className="invalid-feedback">
                                                {errors.duration[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Question Type:</label>
                                        <select
                                            className={`form-select ${errors.question_type ? "is-invalid" : ""}`}
                                            name="question_type"
                                            value={formData.question_type}
                                            onChange={handleChange}
                                        >
                                            <option value="random">Random</option>
                                            <option value="shuffle">Shuffle</option>
                                        </select>
                                        {errors.question_type && (
                                            <div className="invalid-feedback">
                                                {errors.question_type[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Negative Marks:</label>
                                        <div className="d-flex align-items-center gap-5">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="negativeMarksCheckbox"
                                                    checked={formData.has_negative_marks}
                                                    onChange={handleChange}
                                                    name="has_negative_marks"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="negativeMarksCheckbox"
                                                >
                                                    Yes
                                                </label>
                                            </div>
                                            {formData.has_negative_marks && (
                                                <div style={{ width: "200px" }}>
                                                    <input
                                                        type="number"
                                                        className={`form-control ${errors.negative_marks_value ? "is-invalid" : ""}`}
                                                        min="0"
                                                        step="any"
                                                        value={formData.negative_marks_value}
                                                        onChange={e => setFormData({ ...formData, negative_marks_value: e.target.value })}
                                                        placeholder="Enter marks"
                                                        name="negative_marks_value"
                                                    />
                                                    <span>marks per wrong answer</span>
                                                    {errors.negative_marks_value && (
                                                        <div className="invalid-feedback">
                                                            {errors.negative_marks_value[0]}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Advanced Settings */}
                                <div className="col-12">
                                    <hr />
                                    <h6 className="my-3 font-semibold text-lg">
                                        Advanced Settings
                                    </h6>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Privacy:</label>
                                        <select
                                            className={`form-select ${errors.privacy ? "is-invalid" : ""}`}
                                            name="privacy"
                                            value={formData.privacy}
                                            onChange={handleChange}
                                        >
                                            <option value="everyone">
                                                Select
                                            </option>
                                            <option value="everyone">
                                                Everyone
                                            </option>
                                            <option value="link">
                                                By Link Only
                                            </option>
                                        </select>
                                        {errors.privacy && (
                                            <div className="invalid-feedback">
                                                {errors.privacy[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Publish Instant?</label>
                                        <select
                                            className={`form-select ${errors.publish_instant ? "is-invalid" : ""}`}
                                            name="publish_instant"
                                            value={formData.publish_instant}
                                            onChange={handleChange}
                                        >
                                            <option value="0">NO</option>
                                            <option value="1">YES</option>
                                        </select>
                                        {errors.publish_instant && (
                                            <div className="invalid-feedback">
                                                {errors.publish_instant[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Exam Start Time:</label>
                                        <input
                                            type="datetime-local"
                                            className={`form-control ${errors.start_time ? "is-invalid" : ""}`}
                                            name="start_time"
                                            value={formData.start_time}
                                            onChange={handleChange}
                                        />
                                        {errors.start_time && (
                                            <div className="invalid-feedback">
                                                {errors.start_time[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Exam End Time:</label>
                                        <input
                                            type="datetime-local"
                                            className={`form-control ${errors.end_time ? "is-invalid" : ""}`}
                                            name="end_time"
                                            value={formData.end_time}
                                            onChange={handleChange}
                                        />
                                        {errors.end_time && (
                                            <div className="invalid-feedback">
                                                {errors.end_time[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={submitting}
                                >
                                    {submitting ? "Creating..." : "Create Exam"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLiveExamModal;
