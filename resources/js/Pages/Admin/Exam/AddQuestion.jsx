import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const AddQuestionModal = ({ show, onClose, examId }) => {
    const { data, setData, post, processing, errors } = useForm({
        question: "",
        question_image: null,
        description: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        correct_option: "",
        solution_description: "",
        solution_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.exam.questions.store", { exam: examId }), {
            onSuccess: () => {
                onClose();
                // Optionally refresh questions list
            },
        });
    };

    const handleFileChange = (e, field) => {
        setData(field, e.target.files[0]);
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
                        <h5 className="modal-title font-semibold text-xl">
                            Add New Question
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Question</label>
                                <textarea
                                    className={`form-control ${
                                        errors.question ? "is-invalid" : ""
                                    }`}
                                    value={data.question}
                                    onChange={(e) =>
                                        setData("question", e.target.value)
                                    }
                                    rows={3}
                                    required
                                />
                                {errors.question && (
                                    <div className="invalid-feedback">
                                        {errors.question}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Question Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) =>
                                        handleFileChange(e, "question_image")
                                    }
                                    accept="image/*"
                                />
                                <small className="text-muted">Optional</small>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows={2}
                                />
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Option 1
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            errors.option_1 ? "is-invalid" : ""
                                        }`}
                                        value={data.option_1}
                                        onChange={(e) =>
                                            setData("option_1", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.option_1 && (
                                        <div className="invalid-feedback">
                                            {errors.option_1}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Option 2
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            errors.option_2 ? "is-invalid" : ""
                                        }`}
                                        value={data.option_2}
                                        onChange={(e) =>
                                            setData("option_2", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.option_2 && (
                                        <div className="invalid-feedback">
                                            {errors.option_2}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Option 3
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data.option_3}
                                        onChange={(e) =>
                                            setData("option_3", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Option 4
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data.option_4}
                                        onChange={(e) =>
                                            setData("option_4", e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Correct Option
                                </label>
                                <select
                                    className={`form-select ${
                                        errors.correct_option
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    value={data.correct_option}
                                    onChange={(e) =>
                                        setData(
                                            "correct_option",
                                            e.target.value
                                        )
                                    }
                                    required
                                >
                                    <option value="">
                                        Select correct answer
                                    </option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                    <option value="4">Option 4</option>
                                </select>
                                {errors.correct_option && (
                                    <div className="invalid-feedback">
                                        {errors.correct_option}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Solution Description
                                </label>
                                <textarea
                                    className="form-control"
                                    value={data.solution_description}
                                    onChange={(e) =>
                                        setData(
                                            "solution_description",
                                            e.target.value
                                        )
                                    }
                                    rows={3}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Solution Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) =>
                                        handleFileChange(e, "solution_image")
                                    }
                                    accept="image/*"
                                />
                                <small className="text-muted">Optional</small>
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
                                disabled={processing}
                            >
                                {processing ? "Saving..." : "Save Question"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddQuestionModal;
