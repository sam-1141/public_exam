import React, { useState, useEffect } from "react";
import axios from "axios";
import { route } from "ziggy-js";

const AddLiveExamModal = ({ show, onClose, onSuccess, courses, subjects }) => {
    const [formData, setFormData] = useState({
        name: "",
        course_id: "",
        subject_id: "",
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
        result_publish_time: "",
        for_all_student: false,
        by_link: false,
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        try {
            await axios.post(route("execute.store.exam"), formData, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });
            setFormData({
                name: "",
                course_id: "",
                subject_id: "",
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
                result_publish_time: "",
                for_all_student: false,
                by_link: false,
            });
            onClose();
            if (onSuccess) onSuccess();
        } catch (err) {
            if (err.response) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else if (err.response.status === 401) {
                    setErrors({
                        general: "You must be logged in to create an exam.",
                    });
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
        <div className="modal fade show d-block bg-dark bg-opacity-50">
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
                                <div className="alert alert-danger">
                                    {errors.general}
                                </div>
                            )}
                            <div className="row g-2">
                                <div className={"col-md-12"}>
                                    <div className={"mb-2"}>
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
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-2">
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
                                            <div className="invalid-feedback">
                                                {errors.course_id[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-2">
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
                                            <div className="invalid-feedback">
                                                {errors.subject_id[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Total Questions:
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                errors.total_questions
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
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
                                <div className={"col-md-6"}>
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Total Marks:
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                errors.total_marks
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
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
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-2">
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
                                </div>
                                {/*this field is for future*/}
                                {/*<div className={"col-md-6"}>*/}
                                {/*    <div className="mb-2">*/}
                                {/*        <label className="form-label">*/}
                                {/*            Question Type:*/}
                                {/*        </label>*/}
                                {/*        <select*/}
                                {/*            className={`form-select ${*/}
                                {/*                errors.question_type*/}
                                {/*                    ? "is-invalid"*/}
                                {/*                    : ""*/}
                                {/*            }`}*/}
                                {/*            name="question_type"*/}
                                {/*            value={formData.question_type}*/}
                                {/*            onChange={handleChange}*/}
                                {/*        >*/}
                                {/*            <option value="random">*/}
                                {/*                Random*/}
                                {/*            </option>*/}
                                {/*            <option value="shuffle">*/}
                                {/*                Shuffle*/}
                                {/*            </option>*/}
                                {/*        </select>*/}
                                {/*        {errors.question_type && (*/}
                                {/*            <div className="invalid-feedback">*/}
                                {/*                {errors.question_type[0]}*/}
                                {/*            </div>*/}
                                {/*        )}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className={"col-md-12"}>
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Negative Marks:
                                        </label>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input mb-2 checkbox-large"
                                                type="checkbox"
                                                id="negativeMarksSwitch"
                                                checked={
                                                    formData.has_negative_marks
                                                }
                                                onChange={(e) => {
                                                    handleChange({
                                                        target: {
                                                            name: "has_negative_marks",
                                                            type: "checkbox",
                                                            checked:
                                                                e.target
                                                                    .checked,
                                                        },
                                                    });
                                                    // Only set default value when enabling
                                                    if (
                                                        e.target.checked &&
                                                        !formData.negative_marks_value
                                                    ) {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            negative_marks_value:
                                                                "",
                                                        }));
                                                    }
                                                }}
                                                name="has_negative_marks"
                                            />
                                            <label
                                                className="form-check-label ml-2"
                                                htmlFor="negativeMarksSwitch"
                                            >
                                                {formData.has_negative_marks
                                                    ? "Yes"
                                                    : "No"}
                                            </label>
                                        </div>
                                        {formData.has_negative_marks && (
                                            <div style={{ width: "100%" }}>
                                                <input
                                                    type="number"
                                                    className={`form-control ${
                                                        errors.negative_marks_value
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    min="0.25"
                                                    step="0.25"
                                                    value={
                                                        formData.negative_marks_value
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="0.25"
                                                    name="negative_marks_value"
                                                />
                                                <span className="text-sm text-gray-500">
                                                    marks per wrong answer
                                                </span>
                                                {errors.negative_marks_value && (
                                                    <div className="invalid-feedback">
                                                        {
                                                            errors
                                                                .negative_marks_value[0]
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
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

                                <hr className="my-4" />
                                <div className="col-12">
                                    <h6 className="font-semibold text-lg">
                                        Advanced Settings
                                    </h6>
                                </div>
                                <div className={"row g-2"}>
                                    {/*this field is for future*/}
                                    {/*<div className="col-md-6">*/}
                                    {/*    <div className="mb-2">*/}
                                    {/*        <label className="form-label">*/}
                                    {/*            Privacy:*/}
                                    {/*        </label>*/}
                                    {/*        <select*/}
                                    {/*            className={`form-select ${*/}
                                    {/*                errors.privacy*/}
                                    {/*                    ? "is-invalid"*/}
                                    {/*                    : ""*/}
                                    {/*            }`}*/}
                                    {/*            name="privacy"*/}
                                    {/*            value={formData.privacy}*/}
                                    {/*            onChange={handleChange}*/}
                                    {/*        >*/}
                                    {/*            <option value="">Select</option>*/}
                                    {/*            <option value="everyone">*/}
                                    {/*                Everyone*/}
                                    {/*            </option>*/}
                                    {/*            <option value="link">*/}
                                    {/*                By Link Only*/}
                                    {/*            </option>*/}
                                    {/*        </select>*/}
                                    {/*        {errors.privacy && (*/}
                                    {/*            <div className="invalid-feedback">*/}
                                    {/*                {errors.privacy[0]}*/}
                                    {/*            </div>*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*this field is for future*/}
                                    {/*<div className="col-md-6">*/}
                                    {/*    <div className="mb-2">*/}
                                    {/*        <label className="form-label">*/}
                                    {/*            Publish Instant?*/}
                                    {/*        </label>*/}
                                    {/*        <select*/}
                                    {/*            className={`form-select ${*/}
                                    {/*                errors.publish_instant*/}
                                    {/*                    ? "is-invalid"*/}
                                    {/*                    : ""*/}
                                    {/*            }`}*/}
                                    {/*            name="publish_instant"*/}
                                    {/*            value={formData.publish_instant}*/}
                                    {/*            onChange={handleChange}*/}
                                    {/*        >*/}
                                    {/*            <option value="0">NO</option>*/}
                                    {/*            <option value="1">YES</option>*/}
                                    {/*        </select>*/}
                                    {/*        {errors.publish_instant && (*/}
                                    {/*            <div className="invalid-feedback">*/}
                                    {/*                {errors.publish_instant[0]}*/}
                                    {/*            </div>*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="col-md-6">
                                        <div className="mb-2">
                                            <label className="form-label">
                                                Exam Start Time:
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className={`form-control ${
                                                    errors.start_time
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
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
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-2">
                                            <label className="form-label">
                                                Exam End Time:
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className={`form-control ${
                                                    errors.end_time
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
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
                                    <div className="col-md-6">
                                        <div className="mb-2">
                                            <label className="form-label">
                                                Exam Result Publish Time:
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className={`form-control ${
                                                    errors.result_publish_time
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                name="result_publish_time"
                                                value={
                                                    formData.result_publish_time
                                                }
                                                onChange={handleChange}
                                            />
                                            {errors.result_publish_time && (
                                                <div className="invalid-feedback">
                                                    {
                                                        errors
                                                            .result_publish_time[0]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={"col-md-12"}>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input mb-2 checkbox-large"
                                                type="checkbox"
                                                id="for_all_student"
                                                checked={
                                                    formData.for_all_student
                                                }
                                                onChange={handleChange}
                                                name="for_all_student"
                                            />
                                            <label
                                                className="form-check-label ml-2"
                                                htmlFor="for_all_student"
                                            >
                                                {"For all students (Listed)"}
                                            </label>
                                        </div>
                                    </div>
                                    <div className={"col-md-12"}>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input mb-2 checkbox-large"
                                                type="checkbox"
                                                id="by_link"
                                                checked={
                                                    formData.by_link
                                                }
                                                onChange={handleChange}
                                                name="by_link"
                                            />
                                            <label
                                                className="form-check-label ml-2"
                                                htmlFor="by_link"
                                            >
                                                {"By link only (unlisted)"}
                                            </label>
                                        </div>
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
