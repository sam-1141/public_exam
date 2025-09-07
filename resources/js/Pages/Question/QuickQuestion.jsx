import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "@inertiajs/react";
import Layout from "../../layouts/Layout";
import { toast, ToastContainer } from "react-toastify";
import { TINYMCE_API_KEY } from "../../helper/constants";

function QuickQuestion({ flash, errors, classData, subjectData }) {
    const { data, setData, post, processing } = useForm({
        class_id: classData.id, // Include class_id
        subject_id: subjectData.id, // Include subject_id
        question: "",
        options: [
            { option: "", ans: false },
            { option: "", ans: false },
            { option: "", ans: false },
            { option: "", ans: false },
        ],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("execute.submit.quick.question"), {
            onSuccess: () => {
                setData({
                    class_id: classData.id,
                    subject_id: subjectData.id,
                    question: "",
                    options: [
                        { option: "", ans: false },
                        { option: "", ans: false },
                        { option: "", ans: false },
                        { option: "", ans: false },
                    ],
                });
            },
        });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...data.options];
        updatedOptions[index].option = value;
        setData("options", updatedOptions);
    };

    const handleCorrectOptionChange = (index) => {
        const updatedOptions = [...data.options];
        updatedOptions[index].ans = !updatedOptions[index].ans;
        setData("options", updatedOptions);
    };

    return (
        <div>
            <ToastContainer />
            <div className="row mt-3 mb-4">
                <div className="d-flex gap-2 justify-content-center">
                    {/* Display Class Name */}
                    <span className="badge text-primary border border-primary px-3 py-2 rounded-pill">
                        Class: {classData.name}
                    </span>

                    {/* Display Subject Name */}
                    <span className="badge text-success border border-success px-3 py-2 rounded-pill">
                        Subject: {subjectData.name}
                    </span>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <h4 className="mb-2 mt-4">Question:</h4>
                            <Editor
                                apiKey={TINYMCE_API_KEY}
                                value={data.question}
                                onEditorChange={(newValue) =>
                                    setData("question", newValue)
                                }
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        "advlist autolink lists link image charmap print preview anchor",
                                        "searchreplace visualblocks code fullscreen",
                                        "insertdatetime media table paste code help wordcount",
                                    ],
                                    toolbar:
                                        "undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help",
                                }}
                            />
                        </div>

                        <div className="container mt-4">
                            <h4 className="mb-4 mt-4">Options:</h4>
                            <div className="row">
                                {data.options.map((opt, index) => (
                                    <div className="col-12 mb-3" key={index}>
                                        <div className="d-flex align-items-center">
                                            <label
                                                className="me-4"
                                                style={{ fontSize: 20 }}
                                            >
                                                {String.fromCharCode(65 + index)}{" "}
                                                {/* A, B, C, D */}
                                            </label>
                                            <div style={{ flex: 1 }}>
                                                <Editor
                                                    apiKey={TINYMCE_API_KEY}
                                                    value={opt.option}
                                                    onEditorChange={(newValue) =>
                                                        handleOptionChange(
                                                            index,
                                                            newValue
                                                        )
                                                    }
                                                    init={{
                                                        height: 150,
                                                        menubar: false,
                                                        plugins: [
                                                            "advlist autolink lists link image charmap print preview anchor",
                                                            "searchreplace visualblocks code fullscreen",
                                                            "insertdatetime media table paste code help wordcount",
                                                        ],
                                                        toolbar:
                                                            "undo redo | formatselect | bold italic backcolor | \
                                                            alignleft aligncenter alignright alignjustify | \
                                                            bullist numlist outdent indent | removeformat | help",
                                                    }}
                                                />
                                                <div className="mt-2">
                                                    <div className="d-flex align-items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={opt.ans}
                                                            onChange={() =>
                                                                handleCorrectOptionChange(index)
                                                            }
                                                            style={{
                                                                transform: "scale(1.5)",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                        <label
                                                            className="ms-2"
                                                            style={{
                                                                fontSize: "1rem",
                                                            }}
                                                        >
                                                            Correct Answer
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center mt-4">
                                    <button
                                        className="btn btn-primary"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Submitting..."
                                            : "Add Quick Question"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

QuickQuestion.layout = (page) => <Layout children={page} />;
export default QuickQuestion;