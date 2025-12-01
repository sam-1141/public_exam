import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import LoadingSpinner from "../LoadingSpinner";
import { TINYMCE_API_KEY } from "../../helper/constants";

const QuestionModal = ({
    show,
    onClose,
    examId,
    questionData,
    mode = "add",
    onSuccess,
}) => {
    // console.log(examId+" this  is exam id");
    const [noCorrectAnswerError, setNoCorrectAnswerError] = useState(false);

    // Define default options structure
    const defaultOptions = [
        { option: "", ans: false },
        { option: "", ans: false },
        { option: "", ans: false },
        { option: "", ans: false },
        { option: "", ans: false },
    ];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        examId,
        subject_name: "", // <<---- SUBJECT ADDED
        question: "",
        options: defaultOptions,
        explanation: "",
    });

    const [loading, setLoading] = useState(true);

    // Parse options from string to array if needed
    const parseOptions = (options) => {
        if (Array.isArray(options)) {
            return options;
        }

        try {
            if (typeof options === "string") {
                return JSON.parse(options);
            }
            return defaultOptions;
        } catch (e) {
            return defaultOptions;
        }
    };

    // Initialize form data when modal opens or when questionData changes
    useEffect(() => {
        if (show) {
            setLoading(true);
            setNoCorrectAnswerError(false); // Clear any previous error state

            if (mode === "edit" && questionData) {
                // For edit mode, set the question data
                setData({
                    examId,
                    subject_name: questionData.subject_name || "", // <<---- added
                    question: questionData.question || "",
                    options: parseOptions(questionData.options),
                    explanation: questionData.explanation || "",
                });
            } else {
                // For add mode, reset to default
                setData({
                    examId,
                    subject_name: "", // <<---- added
                    question: "",
                    options: [...defaultOptions],
                    explanation: "",
                });
            }

            // Set a small timeout to ensure proper rendering
            const timer = setTimeout(() => {
                setLoading(false);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [show, questionData, mode, examId]); // Added dependencies

    // Also reset when modal closes
    useEffect(() => {
        if (!show) {
            setNoCorrectAnswerError(false);
            // Reset form
            reset({
                examId,
                subject_name: "", // <<---- added
                question: "",
                options: [...defaultOptions],
                explanation: "",
            });
        }
    }, [show, examId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if at least one option is marked as correct
        const hasCorrectAnswer = data.options.some((option) => option.ans);

        if (!hasCorrectAnswer) {
            setNoCorrectAnswerError(true);
            return;
        }

        // Filter out empty options
        const filteredOptions = data.options.filter(
            (opt) => opt.option.trim() !== ""
        );

        if (filteredOptions.length < 2) {
            alert("Please add at least 2 options");
            return;
        }

        setNoCorrectAnswerError(false);

        // Update data with filtered options
        const submitData = { ...data, options: filteredOptions };

        if (mode === "add") {
            post(route("admin.exam.questions.store"), {
                data: submitData,
                onSuccess: () => {
                    if (onSuccess) {
                        onSuccess({
                            id: Math.random(), // Temporary ID
                            ...submitData,
                            options: JSON.stringify(submitData.options),
                        });
                    }
                    reset({
                        examId,
                        subject_name: "", // <<---- added
                        question: "",
                        options: [...defaultOptions],
                        explanation: "",
                    });
                    onClose();
                },
            });
        } else {
            if (questionData.id) {
                put(route("admin.exam.questions.update", questionData.id), {
                    data: submitData,
                    onSuccess: () => {
                        if (onSuccess) {
                            onSuccess({
                                ...questionData,
                                ...submitData,
                                options: JSON.stringify(submitData.options),
                            });
                        }
                        reset({
                            examId,
                            subject_name: "", // <<---- added
                            question: "",
                            options: [...defaultOptions],
                            explanation: "",
                        });
                        onClose();
                    },
                });
            } else {
                alert(
                    "Something is missing for edit operation. Please reload the page and try again."
                );
            }
        }
    };

    // Handle option text change
    const handleOptionTextChange = (index, value) => {
        const updatedOptions = [...data.options];
        updatedOptions[index].option = value;
        setData("options", updatedOptions);
    };

    // Handle correct option selection (multiple can be selected)
    const handleCorrectOptionChange = (index) => {
        const updatedOptions = [...data.options];
        updatedOptions[index].ans = !updatedOptions[index].ans;
        setData("options", updatedOptions);
    };

    if (!show) return null;

    if (loading) {
        return (
            <div className="modal fade show d-block bg-dark bg-opacity-50 ">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body d-flex justify-content-center align-items-center py-5">
                            <div className="text-center">
                                <LoadingSpinner />
                                <p className="mt-2 mb-0">
                                    Loading question editor...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal fade show d-block bg-dark bg-opacity-50 ">
            <div className="modal-dialog modal-xl modal-dialog-centered ">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title font-semibold text-xl mb-0">
                            {mode === "add"
                                ? "Add New Question"
                                : "Edit Question"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div
                            className="modal-body overflow-auto"
                            style={{ maxHeight: "70vh" }}
                        >

                            {/* ====================== SUBJECT DROPDOWN ADDED HERE ====================== */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    Subject
                                </label>
                                <select
                                    className="form-select"
                                    value={data.subject_name}
                                    onChange={(e) =>
                                        setData("subject_name", e.target.value)
                                    }
                                >
                                    <option value="">Select Subject</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Higher Math">Higher Math</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Biology">Biology</option>
                                    <option value="Bangla">Bangla</option>
                                    <option value="English">English</option>
                                    <option value="ICT">ICT</option>
                                </select>
                                {errors.subject_name && (
                                    <div className="text-danger small mt-1">
                                        {errors.subject_name}
                                    </div>
                                )}
                            </div>
                            {/* ====================== END SUBJECT DROPDOWN ====================== */}


                            {/* Question Section */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold mb-3">
                                    <h5 className="mb-0">Question</h5>
                                </label>
                                <div
                                    className={
                                        errors.question
                                            ? "border border-danger rounded"
                                            : ""
                                    }
                                >
                                    <Editor
                                        apiKey={TINYMCE_API_KEY}
                                        value={data.question}
                                        onEditorChange={(newValue) =>
                                            setData("question", newValue)
                                        }
                                        init={{
                                            height: 200,
                                            menubar: false,
                                            plugins: [
                                                "advlist autolink lists link image charmap preview anchor",
                                                "searchreplace visualblocks code fullscreen",
                                                "insertdatetime media table paste code help wordcount",
                                            ],
                                            toolbar:
                                                "undo redo | formatselect | bold italic underline | forecolor backcolor | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | link image | removeformat | code preview",
                                        }}
                                    />
                                </div>
                                {errors.question && (
                                    <div className="text-danger small mt-1">
                                        {errors.question}
                                    </div>
                                )}
                            </div>

                            {/* Options Section */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-semibold mb-0">
                                        Options
                                    </h5>
                                </div>
                                <div className="space-y-4">
                                    {Array.isArray(data.options) &&
                                        data.options.map((opt, index) => (
                                            <div
                                                key={index}
                                                className="relative mb-2"
                                            >
                                                <div
                                                    className={`flex items-start gap-4 p-3 rounded-lg border ${
                                                        errors[
                                                            `option_${
                                                                index + 1
                                                            }`
                                                        ]
                                                            ? "border-danger"
                                                            : "border-gray-200"
                                                    } ${
                                                        opt.ans
                                                            ? "bg-blue-50 border-blue-200"
                                                            : "bg-white"
                                                    }`}
                                                >
                                                    {/* Checkbox */}
                                                    <div className="flex items-center h-5 mt-1">
                                                        <input
                                                            id={`correct_${index}`}
                                                            name={`correct_${index}`}
                                                            type="checkbox"
                                                            checked={
                                                                opt.ans || false
                                                            }
                                                            onChange={() =>
                                                                handleCorrectOptionChange(
                                                                    index
                                                                )
                                                            }
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                    </div>

                                                    {/* Option Label */}
                                                    <div className="flex-shrink-0">
                                                        <span
                                                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                                                opt.ans
                                                                    ? "bg-blue-600 text-white"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }`}
                                                        >
                                                            {String.fromCharCode(
                                                                65 + index
                                                            )}
                                                        </span>
                                                    </div>

                                                    {/* Option Editor */}
                                                    <div className="flex-1 min-w-0 position-relative">
                                                        <Editor
                                                            apiKey={TINYMCE_API_KEY}
                                                            value={
                                                                opt.option || ""
                                                            }
                                                            onEditorChange={(
                                                                newValue
                                                            ) =>
                                                                handleOptionTextChange(
                                                                    index,
                                                                    newValue
                                                                )
                                                            }
                                                            init={{
                                                                height: 180,
                                                                menubar: false,
                                                                plugins: [
                                                                    "advlist autolink lists link image charmap",
                                                                    "searchreplace code",
                                                                    "insertdatetime media table paste wordcount",
                                                                ],
                                                                toolbar:
                                                                    "undo redo | formatselect | bold italic underline | forecolor backcolor | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | link image | removeformat | code preview",
                                                                content_style:
                                                                    "body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; }",
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {errors[
                                                    `option_${index + 1}`
                                                ] && (
                                                    <p className="mt-1 text-sm text-danger">
                                                        {
                                                            errors[
                                                                `option_${
                                                                    index + 1
                                                                }`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                </div>

                                {noCorrectAnswerError && (
                                    <div className="alert alert-danger mb-3">
                                        <i className="fas fa-exclamation-circle me-2"></i>
                                        Please select at least one correct
                                        answer!
                                    </div>
                                )}

                                <div className="mt-3 text-sm text-gray-500">
                                    <i className="fas fa-info-circle me-1"></i>
                                    Select one or more correct answers by
                                    checking the boxes. You can add up to 6
                                    options.
                                </div>
                            </div>

                            {/* Explanation Section */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold mb-3">
                                    <h5 className="mb-0">
                                        Explanation{" "}
                                        <small className="text-muted fw-normal">
                                            (Optional)
                                        </small>
                                    </h5>
                                </label>
                                <Editor
                                    apiKey={TINYMCE_API_KEY}
                                    value={data.explanation}
                                    onEditorChange={(newValue) =>
                                        setData("explanation", newValue)
                                    }
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: [
                                            "advlist autolink lists link image charmap preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | bold italic underline | forecolor backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | link image | removeformat | code preview",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="modal-footer border-top bg-light ">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        {mode === "add"
                                            ? "Saving..."
                                            : "Updating..."}
                                    </>
                                ) : mode === "add" ? (
                                    "Save Question"
                                ) : (
                                    "Update Question"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuestionModal;
