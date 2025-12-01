import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import QuestionReorderModal from "./QuestionReorderModal";
import QuestionModal from "../../../../components/Questions/QuestionModal";

const QuestionList = ({
    questions: initialQuestions,
    examId,
    onQuestionDeleted,
    onQuestionAdded,
    onQuestionUpdated,
}) => {
    console.log("here from questionlist"+ examId);
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [questions, setQuestions] = useState(initialQuestions);
    const [showReorderModal, setShowReorderModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    useEffect(() => {
        setQuestions(initialQuestions);
    }, [initialQuestions]);

    const handleSaveOrder = async (reorderedQuestions) => {
        setQuestions(reorderedQuestions);
        setShowReorderModal(false);
        try {
            const response = await axios.post(route('live.exam.reorder.questions'), {
                questions: reorderedQuestions
            });

            // console.log('response', response);
            console.log(examId+"from qustionlist");
            alert("Order saved successfully!");
        } catch (error) {
            alert("Failed to save order");
        }
    };

    const handleDelete = async (questionId) => {
        if (confirm("Are you sure you want to delete this question?")) {
            try {
                await axios.delete(
                    route("admin.exam.questions.destroy", questionId),
                    {
                        headers: {
                            "X-CSRF-TOKEN": document
                                .querySelector('meta[name="csrf-token"]')
                                .getAttribute("content"),
                        },
                    }
                );
                // Remove the question from local state
                const updatedQuestions = questions.filter(
                    (q) => q.id !== questionId
                );
                setQuestions(updatedQuestions);

                // Call the parent callback if provided
                if (onQuestionDeleted) {
                    onQuestionDeleted(questionId);
                }
                alert("Question deleted successfully!");
            } catch (error) {
                alert("Failed to delete question");
            }
        }
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        setShowQuestionModal(true);
    };

    const handleQuestionAdded = (newQuestion) => {
        setQuestions([...questions, newQuestion]);
        setShowQuestionModal(false);

        if (onQuestionAdded) {
            onQuestionAdded(newQuestion);
        }
    };

    const handleQuestionUpdated = (updatedQuestion) => {
        const updatedQuestions = questions.map((q) =>
            q.id === updatedQuestion.id ? updatedQuestion : q
        );
        setQuestions(updatedQuestions);
        setShowQuestionModal(false);

        if (onQuestionUpdated) {
            onQuestionUpdated(updatedQuestion);
        }
    };

    const toggleQuestion = (questionId) => {
        setExpandedQuestion(
            expandedQuestion === questionId ? null : questionId
        );
    };

    const parseOptions = (optionsString) => {
        

        try {
            return JSON.parse(optionsString);
        } catch (e) {
            return [];
        }
    };

    return (
        <div className="mt-2">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-center">
                    Questions ({questions.length})
                </h3>
                <div className="flex gap-2">
                    {questions.length > 1 && (
                        <button
                            onClick={() => setShowReorderModal(true)}
                            className="btn btn-sm btn-outline-primary"
                        >
                            Reorder Questions
                        </button>
                    )}
                </div>
            </div>

            <div className="accordion" id="questionsAccordion">

    {/* Group questions by subject_name */}
    {Object.entries(
        questions.reduce((acc, q) => {
            if (!acc[q.subject_name]) acc[q.subject_name] = [];
            acc[q.subject_name].push(q);
            return acc;
        }, {})
    ).map(([subjectName, subjectQuestions]) => (
        <div key={subjectName} className="mb-4">

            {/* Subject Title + Count */}
            <h2 className="text-lg font-semibold mb-2">
                {subjectName} ({subjectQuestions.length})
            </h2>

            {/* Render all questions under this subject */}
            {subjectQuestions.map((question, index) => {
                const options = parseOptions(question.options);

                return (
                    <div
                        key={question.id}
                        className="accordion-item mb-2 border rounded"
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
                                aria-expanded={
                                    expandedQuestion === question.id
                                }
                            >
                                <span className="me-2 font-medium">
                                    Q{index + 1}: 
                                </span>

                                <div
                                    className="font-sans"
                                    dangerouslySetInnerHTML={{
                                        __html: `
                                            <div className="truncate">
                                                ${question.question.substring(
                                                    0,
                                                    80
                                                )}
                                                ${
                                                    question.question.length > 80
                                                        ? "..."
                                                        : ""
                                                }
                                            </div>
                                        `,
                                    }}
                                />
                            </button>
                        </h2>

                        <div
                            className={`accordion-collapse collapse ${
                                expandedQuestion === question.id ? "show" : ""
                            }`}
                        >
                            <div className="accordion-body p-4">
                                {/* ORIGINAL CONTENT UNTOUCHED */}

                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium">
                                            Question:
                                        </h4>
                                        <div className="flex space-x-2 gap-2">
                                            <button
                                                onClick={() =>
                                                    handleEdit(question)
                                                }
                                                className="btn btn-sm btn-outline-warning"
                                            >
                                                <i className="fas fa-pen me-1"></i>{" "}
                                                Edit
                                            </button>
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

                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: question.question,
                                        }}
                                    />

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

                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">
                                        Options:
                                    </h4>
                                    alert(options)
                                    <ul className="list-group">
                                        {options.map((option, index) => (
                                            <li
                                                key={index}
                                                className={`list-group-item ${
                                                    option.ans
                                                        ? "border-2 border-success"
                                                        : "border-1"
                                                }`}
                                            >
                                                <div className="flex items-center">
                                                    <span className="font-medium me-2">
                                                        Option {index + 1}:
                                                    </span>

                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: option.option,
                                                        }}
                                                    />

                                                    {option.ans && (
                                                        <span className="ms-auto badge bg-success text-white">
                                                            Correct
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {question.explanation && (
                                    <div className="mb-4">
                                        <h4 className="font-medium">
                                            Explanation:
                                        </h4>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: question.explanation,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    ))}
</div>


            {showReorderModal && (
                <QuestionReorderModal
                    questions={questions}
                    onClose={() => setShowReorderModal(false)}
                    onSave={handleSaveOrder}
                />
            )}

            {showQuestionModal && (
                <QuestionModal
                    show={showQuestionModal}
                    onClose={() => setShowQuestionModal(false)}
                    examId={examId}
                    questionData={editingQuestion}
                    mode="edit"
                    onSuccess={handleQuestionUpdated}
                />
            )}
        </div>
    );
};

export default QuestionList;
