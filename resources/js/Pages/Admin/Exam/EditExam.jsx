import React, { useState } from "react";

const EditExamModal = ({
    show,
    onClose,
    exam,
    onSubmit,
    examType = "live",
}) => {
    const [formData, setFormData] = useState({
        name: exam.title || "",
        subject: exam.subject || "",
        description: exam.description || "",
        totalQuestions: exam.questions || "",
        hasNegativeMarks: exam.negativeMarks === "yes" || false,
        negativeMarksValue: exam.negativeMarksValue || "",
        totalMarks: exam.totalMarks || "",
        duration: exam.duration || "",
        questionType: exam.questionType || "random",
        timerRestriction: exam.timerRestriction || "off",
        privacy: exam.privacy || "everyone",
        publishInstant: exam.publishInstant || "no",
        batch: exam.batch || "all",
        startTime: exam.startTime || "",
        endTime: exam.endTime || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value !== "" ? Math.max(0, parseFloat(value)) : "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = {
            ...formData,
            negativeMarks: formData.hasNegativeMarks ? "yes" : "no",
        };
        onSubmit(submitData);
    };

    if (!show) return null;

    // Determine if this is a practice exam
    const isPracticeExam = examType === "practice";

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-xl font-semibold">
                            {isPracticeExam
                                ? "Edit Practice Exam"
                                : "Edit Live Exam"}{" "}
                            : {exam.title || "Exam Details"}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                {/* Basic Information */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter exam name"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Subject:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Enter exam subject"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Description:
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Enter exam description"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Total Questions:
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="totalQuestions"
                                            value={formData.totalQuestions}
                                            onChange={handleChange}
                                            placeholder="How many questions do you want to add?"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Total Marks:
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="any"
                                            className="form-control"
                                            name="totalMarks"
                                            value={formData.totalMarks}
                                            onChange={handleChange}
                                            placeholder="Enter exam total marks"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Duration (min):
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="any"
                                            className="form-control"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            placeholder="Enter exam duration"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Question Type:
                                        </label>
                                        <select
                                            className="form-select"
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
                                    </div>

                                    {/* Negative Marking Section */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Negative Marks:
                                        </label>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="negativeMarksCheckbox"
                                                    checked={
                                                        formData.hasNegativeMarks
                                                    }
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            hasNegativeMarks:
                                                                e.target
                                                                    .checked,
                                                            negativeMarksValue:
                                                                e.target.checked
                                                                    ? formData.negativeMarksValue ||
                                                                      ""
                                                                    : "",
                                                        });
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="negativeMarksCheckbox"
                                                >
                                                    Yes
                                                </label>
                                            </div>

                                            {formData.hasNegativeMarks && (
                                                <div style={{ width: "200px" }}>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        min="0"
                                                        step="any"
                                                        name="negativeMarksValue"
                                                        value={
                                                            formData.negativeMarksValue ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Enter marks"
                                                    />
                                                    <span>
                                                        marks per wrong answer
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Advanced Settings */}
                                <div className="col-12">
                                    <hr />
                                    <h6 className="my-3 text-xl font-semibold">
                                        Advanced Settings
                                    </h6>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Privacy:
                                        </label>
                                        <select
                                            className="form-select"
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
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Publish Instant?
                                        </label>
                                        <select
                                            className="form-select"
                                            name="publishInstant"
                                            value={formData.publishInstant}
                                            onChange={handleChange}
                                        >
                                            <option value="no">NO</option>
                                            <option value="yes">YES</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    {!isPracticeExam && (
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Exam Start Time:
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    name="startTime"
                                                    value={formData.startTime}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Exam End Time:
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    name="endTime"
                                                    value={formData.endTime}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save Changes
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
