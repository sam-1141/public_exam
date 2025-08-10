import React, { useState, useEffect } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import { courses } from "./LiveExam/courses";

const EditExamModal = ({
    show,
    onClose,
    exam,
    loading,
    onSuccess,
    subjects = [],
    courses = [],
}) => {
    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (exam) {
            setFormData({
                name: exam.name || "",
                course_id: exam.course_id || "",
                subject_id: exam.subject_id || "",
                description: exam.description || "",
                totalQuestions: exam.totalQuestions || "",
                hasNegativeMarks: exam.hasNegativeMarks || false,
                negativeMarksValue: exam.negativeMarksValue || "",
                totalMarks: exam.totalMarks || "",
                duration: exam.duration || "",
                questionType: exam.questionType || "random",
                privacy: exam.privacy || "everyone",
                publishInstant: exam.publishInstant || "1",
                startTime: exam.startTime || "",
                endTime: exam.endTime || "",
            });
            setErrors({});
        }
    }, [exam]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) return;
        setSubmitting(true);
        setErrors({});

        try {
            await axios.put(
                route("update.single.exam", { slug: exam.slug }),
                formData,
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );
            setSubmitting(false);
            onClose();
            if (onSuccess) onSuccess();
        } catch (err) {
            if (err.response) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else if (err.response.status === 401) {
                    setErrors({
                        general: "You must be logged in to update the exam.",
                    });
                } else {
                    setErrors({ general: "Something went wrong!" });
                }
            } else {
                setErrors({ general: "Network error." });
            }
            setSubmitting(false);
        }
    };

    if (!show || !exam || !formData) return null;

    if (loading) {
        return (
            <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div
                            className="modal-body d-flex justify-content-center align-items-center"
                            style={{ minHeight: 300 }}
                        >
                            <div
                                className="spinner-border text-primary"
                                style={{ width: "3rem", height: "3rem" }}
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-xl font-semibold">
                            Edit Live Exam: {exam.name}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={submitting}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {errors.general && (
                                <div className="alert alert-danger">
                                    {errors.general}
                                </div>
                            )}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                errors.name ? "is-invalid" : ""
                                            }`}
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
                                        <label className="form-label">
                                            Course:
                                        </label>
                                        <select
                                            className={`form-select ${
                                                errors.course_id
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="course_id"
                                            value={formData.course_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select a course
                                            </option>
                                            {courses.map((course) => (
                                                <option
                                                    key={course.id}
                                                    value={course.id}
                                                >
                                                    {course.course_name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.course_id && (
                                            <div className="invalid-feedback d-block">
                                                {errors.course_id[0]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Subject:
                                        </label>
                                        <select
                                            className={`form-select ${
                                                errors.subject_id
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="subject_id"
                                            value={formData.subject_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select a subject
                                            </option>
                                            {subjects.map((subject) => (
                                                <option
                                                    key={subject.id}
                                                    value={subject.id}
                                                >
                                                    {subject.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.subject_id && (
                                            <div className="invalid-feedback d-block">
                                                {errors.subject_id[0]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Description:
                                        </label>
                                        <textarea
                                            className={`form-control ${
                                                errors.description
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
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
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Total Questions:
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                errors.totalQuestions
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="totalQuestions"
                                            value={formData.totalQuestions}
                                            onChange={handleChange}
                                        />
                                        {errors.totalQuestions && (
                                            <div className="invalid-feedback">
                                                {errors.totalQuestions[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Total Marks:
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                errors.totalMarks
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="totalMarks"
                                            value={formData.totalMarks}
                                            onChange={handleChange}
                                        />
                                        {errors.totalMarks && (
                                            <div className="invalid-feedback">
                                                {errors.totalMarks[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Duration (min):
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                errors.duration
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
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
                                        <label className="form-label">
                                            Question Type:
                                        </label>
                                        <select
                                            className={`form-select ${
                                                errors.questionType
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="questionType"
                                            value={formData.questionType}
                                            onChange={handleChange}
                                        >
                                            <option value="random">
                                                Random
                                            </option>
                                            <option value="shuffle">
                                                Shuffle
                                            </option>
                                        </select>
                                        {errors.questionType && (
                                            <div className="invalid-feedback">
                                                {errors.questionType[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Negative Marks:
                                        </label>
                                        <div className="d-flex align-items-center gap-3">
                                            {formData.hasNegativeMarks ? (
                                                <>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="negativeMarksCheckbox"
                                                            checked={true}
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    hasNegativeMarks:
                                                                        e.target
                                                                            .checked,
                                                                    negativeMarksValue:
                                                                        e.target
                                                                            .checked
                                                                            ? formData.negativeMarksValue
                                                                            : "0",
                                                                });
                                                            }}
                                                            name="hasNegativeMarks"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="negativeMarksCheckbox"
                                                        >
                                                            Yes
                                                        </label>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: "200px",
                                                        }}
                                                    >
                                                        <input
                                                            type="number"
                                                            className={`form-control ${
                                                                errors.negativeMarksValue
                                                                    ? "is-invalid"
                                                                    : ""
                                                            }`}
                                                            min="0.0"
                                                            step="0.25"
                                                            value={
                                                                formData.negativeMarksValue
                                                            }
                                                            onChange={(e) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    negativeMarksValue:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            placeholder="Enter marks"
                                                            name="negativeMarksValue"
                                                        />
                                                        <span className="text-sm text-gray-500">
                                                            marks per wrong
                                                            answer
                                                        </span>
                                                        {errors.negativeMarksValue && (
                                                            <div className="invalid-feedback">
                                                                {
                                                                    errors
                                                                        .negativeMarksValue[0]
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-gray-600">
                                                    No
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <hr />
                                    <h6 className="my-3 font-semibold text-lg">
                                        Advanced Settings
                                    </h6>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Privacy:
                                        </label>
                                        <select
                                            className={`form-select ${
                                                errors.privacy
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="privacy"
                                            value={formData.privacy}
                                            onChange={handleChange}
                                        >
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
                                        <label className="form-label">
                                            Publish Instant?
                                        </label>
                                        <select
                                            className={`form-select ${
                                                errors.publishInstant
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="publishInstant"
                                            value={
                                                formData.publishInstant === 1
                                                    ? 1
                                                    : 0
                                            }
                                            onChange={handleChange}
                                        >
                                            <option value={0}>NO</option>
                                            <option value={1}>YES</option>
                                        </select>
                                        {errors.publishInstant && (
                                            <div className="invalid-feedback">
                                                {errors.publishInstant[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Exam Start Time:
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className={`form-control ${
                                                errors.startTime
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                        />
                                        {errors.startTime && (
                                            <div className="invalid-feedback">
                                                {errors.startTime[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Exam End Time:
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className={`form-control ${
                                                errors.endTime
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                        />
                                        {errors.endTime && (
                                            <div className="invalid-feedback">
                                                {errors.endTime[0]}
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
                                    {submitting ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditExamModal;
