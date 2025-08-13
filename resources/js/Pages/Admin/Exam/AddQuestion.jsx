import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

const AddQuestionModal = ({ show, onClose, examId }) => {
    const [noCorrectAnswerError, setNoCorrectAnswerError] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        examId,
        question: "",
        options: [
            { option: "", ans: false },
            { option: "", ans: false },
            { option: "", ans: false },
            { option: "", ans: false },
        ],
        explanation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if at least one option is marked as correct
        const hasCorrectAnswer = data.options.some((option) => option.ans);

        if (!hasCorrectAnswer) {
            setNoCorrectAnswerError(true);
            return;
        }

        setNoCorrectAnswerError(false);

        post(route("admin.exam.questions.store"), {
            onSuccess: () => {
                setData({
                    examId,
                    question: "",
                    options: [
                        { option: "", ans: false },
                        { option: "", ans: false },
                        { option: "", ans: false },
                        { option: "", ans: false },
                    ],
                    explanation: "",
                });
                onClose();
            },
        });
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

    return (
        <div
            className="modal fade show "
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title font-semibold text-xl mb-0">
                            Add New Question
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
                            className="modal-body"
                            style={{ maxHeight: "70vh", overflowY: "auto" }}
                        >
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
                                        apiKey="your-tinymce-api-key"
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
                                <h5 className="mb-3 fw-semibold">Options</h5>
                                <div className="space-y-4">
                                    {data.options.map((opt, index) => (
                                        <div
                                            key={index}
                                            className="relative mb-2"
                                        >
                                            <div
                                                className={`flex items-start gap-4 p-3 rounded-lg border ${
                                                    errors[
                                                        `option_${index + 1}`
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
                                                        checked={opt.ans}
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
                                                <div className="flex-1 min-w-0">
                                                    <Editor
                                                        apiKey="your-tinymce-api-key"
                                                        value={opt.option}
                                                        onEditorChange={(
                                                            newValue
                                                        ) =>
                                                            handleOptionTextChange(
                                                                index,
                                                                newValue
                                                            )
                                                        }
                                                        init={{
                                                            height: 120,
                                                            menubar: false,
                                                            plugins: [
                                                                "advlist autolink lists link image charmap",
                                                                "searchreplace code",
                                                                "insertdatetime media table paste wordcount",
                                                            ],
                                                            toolbar:
                                                                "undo redo | bold italic underline | forecolor | alignleft aligncenter alignright | bullist numlist | link image | code",
                                                            content_style:
                                                                "body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; }",
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {errors[`option_${index + 1}`] && (
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
                                    checking the boxes.
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
                                    apiKey="your-tinymce-api-key"
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
                                        Saving...
                                    </>
                                ) : (
                                    "Save Question"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddQuestionModal;
