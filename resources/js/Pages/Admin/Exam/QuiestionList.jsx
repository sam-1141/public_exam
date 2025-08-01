import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const QuestionList = ({ questions, examId }) => {
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const handleDelete = (questionId) => {
        if (confirm("Are you sure you want to delete this question?")) {
            console.log(`Deleting question with ID: ${questionId}`);
        }
    };

    const toggleQuestion = (questionId) => {
        setExpandedQuestion(
            expandedQuestion === questionId ? null : questionId
        );
    };

    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold mb-3 text-center">
                Questions ({questions.length})
            </h3>

            <div className="accordion" id="questionsAccordion">
                {questions.map((question, index) => (
                    <div
                        key={question.id}
                        className="accordion-item mb-3 border rounded"
                    >
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button ${
                                    expandedQuestion === question.id
                                        ? ""
                                        : "collapsed"
                                }`}
                                type="button"
                                onClick={() => toggleQuestion(question.id)}
                                aria-expanded={expandedQuestion === question.id}
                            >
                                <span className="me-2 font-medium">
                                    Q{index + 1}:
                                </span>
                                <span className="truncate">
                                    {question.question.substring(0, 50)}
                                    {question.question.length > 50 ? "..." : ""}
                                </span>
                            </button>
                        </h2>
                        <div
                            className={`accordion-collapse collapse ${
                                expandedQuestion === question.id ? "show" : ""
                            }`}
                        >
                            <div className="accordion-body p-4">
                                {/* Question Content */}
                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium">
                                            Question:
                                        </h4>
                                        <div className="flex space-x-2 gap-2">
                                            <Link
                                                href=""
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                <i className="fas fa-edit me-1"></i>{" "}
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(question.id)
                                                }
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                <i className="fas fa-trash me-1"></i>{" "}
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <p className="whitespace-pre-line">
                                        {question.question}
                                    </p>

                                    {question.question_image && (
                                        <div className="mt-2">
                                            <img
                                                src={`/storage/${question.question_image}`}
                                                alt="Question"
                                                className="max-w-full h-auto max-h-60 rounded"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Options */}
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">
                                        Options:
                                    </h4>
                                    <ul className="list-group">
                                        {[1, 2, 3, 4].map((optNum) => (
                                            <li
                                                key={optNum}
                                                className={`list-group-item ${
                                                    question.correct_option ==
                                                    optNum
                                                        ? "bg-success bg-opacity-10"
                                                        : ""
                                                }`}
                                            >
                                                <div className="flex items-center">
                                                    <span className="font-medium me-2">
                                                        Option {optNum}:
                                                    </span>
                                                    <span>
                                                        {
                                                            question[
                                                                `option_${optNum}`
                                                            ]
                                                        }
                                                    </span>
                                                    {question.correct_option ==
                                                        optNum && (
                                                        <span className="ms-auto badge bg-success">
                                                            Correct Answer
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Solution */}
                                {question.solution_description && (
                                    <div className="mb-4">
                                        <h4 className="font-medium">
                                            Solution:
                                        </h4>
                                        <p className="whitespace-pre-line">
                                            {question.solution_description}
                                        </p>

                                        {question.solution_image && (
                                            <div className="mt-2">
                                                <img
                                                    src={`/storage/${question.solution_image}`}
                                                    alt="Solution"
                                                    className="max-w-full h-auto max-h-60 rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Description */}
                                {question.description && (
                                    <div className="mb-4">
                                        <h4 className="font-medium">
                                            Description:
                                        </h4>
                                        <p className="whitespace-pre-line">
                                            {question.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionList;
