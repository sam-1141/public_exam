import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";

function QuestionCard({ question, auth }) {
    const options = JSON.parse(question?.options || "[]");
    const userRole = auth?.role;

    // if you want to show single questions details just move this state to the parent component and pass it as props
    const [activeQuestionId, setActiveQuestionId] = useState(null);

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this question?")) {
            router.delete(route("delete.mcq", question?.id));
        }
    };

    const handleReview = () => {
        router.get(route("review.mcq", question?.id));
    };

    const toggleActiveQuestion = (id) => {
        setActiveQuestionId((prevId) => (prevId === id ? null : id));
    };

    const isActive = activeQuestionId === question?.id;

    return (
        <div
            className="card mb-4"
            style={{
                borderRadius: 8,
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div className="card-body" style={{ padding: 20 }}>
                <div className="d-flex mb-2 align-items-center">
                    <span
                        className="badge text-success border border-success me-2 px-2 py-1.5 rounded-pill"
                        style={{
                            fontSize: 12,
                            backgroundColor: "#e8f5e9",
                        }}
                    >
                        Class: {question?.class?.name}
                    </span>
                    <span
                        className="badge text-success border border-success me-2 px-2 py-1.5 rounded-pill"
                        style={{
                            fontSize: 12,
                            backgroundColor: "#e8f5e9",
                        }}
                    >
                        Subject: {question?.subject?.name}
                    </span>
                    {question?.chapter && (
                        <span
                            className="badge text-success border border-success me-2 px-2 py-1.5 rounded-pill"
                            style={{
                                fontSize: 12,
                                backgroundColor: "#e8f5e9",
                            }}
                        >
                            Chapter: {question?.chapter?.name}
                        </span>
                    )}
                    {question?.hardness && (
                        <span
                            className="badge text-success border border-success me-2 px-2 py-1.5 rounded-pill"
                            style={{
                                fontSize: 12,
                                backgroundColor: "#e8f5e9",
                            }}
                        >
                            Hardness: {question?.hardness?.name}
                        </span>
                    )}
                    <div className="ms-auto d-flex align-items-center">
                        <Link
                            href={route("edit.mcq", question?.id)}
                            data-bs-toggle="tooltip"
                            title="Edit Question"
                        >
                            <button
                                className="btn btn-outline-primary btn-sm me-2"
                                style={{
                                    borderRadius: 20,
                                    padding: "5px 10px",
                                }}
                            >
                                <i className="fas fa-edit" />
                            </button>
                        </Link>
                        {userRole === "admin" && (
                            <button
                                className="btn btn-outline-danger btn-sm me-2"
                                style={{
                                    borderRadius: 20,
                                    padding: "5px 10px",
                                }}
                                onClick={handleDelete}
                            >
                                <i className="fas fa-trash" />
                            </button>
                        )}
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            style={{
                                borderRadius: 20,
                                padding: "5px 10px",
                            }}
                            onClick={() => toggleActiveQuestion(question?.id)}
                        >
                            {isActive ? (
                                <i className="fas fa-eye-slash"></i>
                            ) : (
                                <i className="fas fa-eye"></i>
                            )}
                        </button>
                    </div>
                </div>
                <div className="d-flex mb-3 align-items-center">
                    <span
                        className="badge text-success border border-success px-2 py-1.5 rounded-pill"
                        style={{
                            fontSize: 12,
                            backgroundColor: "#e8f5e9",
                        }}
                    >
                        Topic:{" "}
                        {question?.topic ? question?.topic?.name : "No Topic"}
                    </span>
                </div>

                <div
                    className="mb-3 p-3 border rounded-3 shadow-sm"
                    style={{
                        backgroundColor: "#ffffff",
                        borderLeft: "5px solid #2196f3",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <h5
                        className="font-weight-bold pb-1"
                        style={{ color: "#333" }}
                    >
                        Question:
                    </h5>
                    <p
                        className="p-3"
                        style={{
                            backgroundColor: "#f3f4f6",
                            borderRadius: 4,
                            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                            fontSize: "1rem",
                            color: "#555",
                            cursor: "pointer",
                        }}
                        onClick={() => toggleActiveQuestion(question?.id)} // No changes here
                        dangerouslySetInnerHTML={{ __html: question?.question }}
                    />
                </div>
                {isActive && (
                    <div
                        className={`transition-all duration-200 ${
                            isActive
                                ? "max-h-screen opacity-100"
                                : "max-h-0 opacity-0"
                        } overflow-hidden`}
                    >
                        {/* Options Section */}
                        <div className="mb-3">
                            <div className="row">
                                {options?.map((option, index) => (
                                    <div className="col-6 mb-2" key={index}>
                                        <div
                                            className="card border-2"
                                            style={{
                                                borderColor: option?.ans
                                                    ? "#4caf50"
                                                    : "#ddd",
                                                borderRadius: 8,
                                            }}
                                        >
                                            <div className="card-body">
                                                <p
                                                    className="card-text"
                                                    dangerouslySetInnerHTML={{
                                                        __html: option?.option,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tags Section */}
                {question?.tags?.length > 0 && (
                    <>
                        <h6 className="font-medium text-gray-900 mb-2">
                            Tags:
                        </h6>
                        <div className="flex flex-wrap gap-2">
                            {question.tags.map((tag) => (
                                <span
                                    key={tag?.id}
                                    className="px-2 py-1 bg-gray-100 border border-secondary rounded-md text-sm"
                                >
                                    {tag?.tag?.name}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default QuestionCard;
