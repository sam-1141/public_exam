import React, { useState, useEffect } from "react";
import axios from "axios";
import { route } from "ziggy-js";

export const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Handle invalid dates
    if (isNaN(date.getTime())) return "";
    // Convert to local datetime string format for input[type=datetime-local]
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date - offset).toISOString().slice(0, 16);
    return localISOTime;
};

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
                course_id: exam.course_id ? String(exam.course_id) : "",
                subject_id: exam.subject_id ? String(exam.subject_id) : "",
                description: exam.description || "",
                total_questions: exam.totalQuestions
                    ? String(exam.totalQuestions)
                    : "",
                has_negative_marks: exam.hasNegativeMarks === 1 ? true : false,
                negative_marks_value: exam.negativeMarksValue
                    ? String(exam.negativeMarksValue)
                    : "",
                total_marks: exam.totalMarks ? String(exam.totalMarks) : "",
                question_type: exam.questionType || "random",
                publish_instant: exam.publishInstant === 1 ? true : false,
                privacy: exam.privacy || "everyone",
                duration: exam.duration ? String(exam.duration) : "",
                start_time: formatDateTime(exam.startTime),
                end_time: formatDateTime(exam.endTime),
                result_publish_time: formatDateTime(exam.result_publish_time),
                for_all_student: exam.forAllStudent == 1 ? true : false,
                by_link: exam.byLink == 1 ? true : false,
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

    const updateFormData = (data) => {
        const updateData = {
            name: data.name,
            description: data.description,
            question_type: data.question_type,
            privacy: data.privacy,
            course_id: data.course_id ? parseInt(data.course_id, 10) : null,
            subject_id: data.subject_id ? parseInt(data.subject_id, 10) : null,
            total_questions: data.total_questions
                ? parseInt(data.total_questions, 10)
                : null,
            total_marks: data.total_marks
                ? parseInt(data.total_marks, 10)
                : null,
            duration: data.duration ? parseInt(data.duration, 10) : null,
            // Convert boolean to 1/0 for API
            has_negative_marks: data.has_negative_marks ? 1 : 0,
            publish_instant: data.publish_instant ? 1 : 0,
            negative_marks_value: data.negative_marks_value
                ? parseFloat(data.negative_marks_value)
                : 0,
            for_all_student: data.for_all_student,
            by_link: data.by_link,
        };

        // Handle datetime fields
        if (data.start_time && data.start_time.trim() !== "") {
            updateData.start_time = data.start_time;
        }

        if (data.end_time && data.end_time.trim() !== "") {
            updateData.end_time = data.end_time;
        }

        if (
            data.result_publish_time &&
            data.result_publish_time.trim() !== ""
        ) {
            updateData.result_publish_time = data.result_publish_time;
        }

        return updateData;
    };

    const handleSubmitForUpdate = async (e) => {
        e.preventDefault();
        if (!formData) return;

        setSubmitting(true);
        setErrors({});

        // Prepare data with correct types
        const updateData = updateFormData(formData);

        try {
            await axios.put(
                route("update.single.exam", { slug: exam.slug }),
                updateData,
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );

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
                    setErrors({
                        general:
                            err.response.data.message ||
                            "Something went wrong!",
                    });
                }
            } else {
                setErrors({ general: "Network error. Please try again." });
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (!show || !exam || !formData) return null;

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
                        <form onSubmit={handleSubmitForUpdate}>
                            {errors.general && (
                                <div className="alert alert-danger">
                                    {errors.general}
                                </div>
                            )}
                            <div className="row g-2">
                                <div className="col-md-12">
                                    <div className={"mb-2"}>
                                        <label className="form-label">
                                            Name:{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                errors.name ? "is-invalid" : ""
                                            }`}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"mb-2"}>
                                        <label className="form-label">
                                            Course:{" "}
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
                                            required
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
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"mb-2"}>
                                        <label className="form-label">
                                            Subject:{" "}
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
                                            required
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
                                </div>

                                <div className={"col-md-6"}>
                                    <div className={"mb-2"}>
                                        <label className="form-label">
                                            Total Questions:{" "}
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
                                            min="1"
                                            required
                                        />
                                        {errors.total_questions && (
                                            <div className="invalid-feedback">
                                                {errors.total_questions[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"mb-2"}>
                                        <label className="form-label">
                                            Total Marks:{" "}
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
                                            min="1"
                                            required
                                        />
                                        {errors.total_marks && (
                                            <div className="invalid-feedback">
                                                {errors.total_marks[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"mb-2"}>
                                        <label className="form-label">
                                            Duration (minutes):{" "}
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
                                            min="1"
                                            required
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
                                {/*    <div className={"mb-2"}>*/}
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
                                    <div className={"mb-2"}>
                                        <label className="form-label">
                                            Negative Marks:
                                        </label>

                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input mb-2"
                                                type="checkbox"
                                                id="negativeMarksSwitch"
                                                checked={
                                                    formData.has_negative_marks
                                                }
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        has_negative_marks:
                                                            e.target.checked,
                                                        negative_marks_value: e
                                                            .target.checked
                                                            ? formData.negative_marks_value ||
                                                              "0.25"
                                                            : "",
                                                    });
                                                }}
                                                name="has_negative_marks"
                                                style={{
                                                    width: "3em",
                                                    height: "1.5em",
                                                }}
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
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            negative_marks_value:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="0.25"
                                                    name="negative_marks_value"
                                                />
                                                <small className="text-muted">
                                                    marks per wrong answer
                                                </small>
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
                                    <div className={"mb-2"}>
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
                            </div>

                            <hr />
                            <h6 className="my-3 font-semibold text-lg">
                                Advanced Settings
                            </h6>
                            <div className={"row g-2"}>
                                {/*<div className="col-md-6">*/}
                                {/*    <div className={"mb-2"}>*/}
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
                                {/*    <div className={"mb-2"}>*/}
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
                                {/*            value={*/}
                                {/*                formData.publish_instant*/}
                                {/*                    ? "1"*/}
                                {/*                    : "0"*/}
                                {/*            }*/}
                                {/*            onChange={(e) => {*/}
                                {/*                setFormData({*/}
                                {/*                    ...formData,*/}
                                {/*                    publish_instant:*/}
                                {/*                        e.target.value ===*/}
                                {/*                        "1",*/}
                                {/*                });*/}
                                {/*            }}*/}
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
                                    <div className={"mb-2"}>
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
                                    <div className={"mb-2"}>
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
                                    <div className={"mb-2"}>
                                        <label className="form-label">
                                            Result Publish Time:
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className={`form-control ${
                                                errors.result_publish_time
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="result_publish_time"
                                            value={formData.result_publish_time}
                                            onChange={handleChange}
                                        />

                                        {errors.result_publish_time && (
                                            <div className="invalid-feedback">
                                                {errors.result_publish_time[0]}
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
                                            onChange={(e) => handleChange(e)}
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
                                            onChange={(e) => handleChange(e)}
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
                                    {submitting ? "Updating..." : "Update Exam"}
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
