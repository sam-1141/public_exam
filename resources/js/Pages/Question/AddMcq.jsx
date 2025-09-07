import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "@inertiajs/react"; // For form submission
import Layout from "../../layouts/Layout";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { TINYMCE_API_KEY } from "../../helper/constants";


function AddMcq({
    classes,
    subject,
    chapter,
    hardness,
    topics,
    tags,
    flash,
    errors,
}) {
    // Form state using useForm
    const { data, setData, post, processing } = useForm({
        class_id: classes.id,
        subject_id: subject.id,
        chapter_id: chapter.id,
        topic_id: "",
        hardness_id: "",
        tags: [],
        question: "",
        options: [
            { option: "", ans: false },
            { option: "", ans: false },
            { option: "", ans: false },
            { option: "", ans: false },
        ],
        explanation: "",
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("execute.submit.add.mcq.form"), {
            onSuccess: () => {
                // Reset form fields
                setData({
                    ...data,
                    topic_id: "",
                    hardness_id: "",
                    tags: [],
                    question: "",
                    options: [
                        { option: "", ans: false },
                        { option: "", ans: false },
                        { option: "", ans: false },
                        { option: "", ans: false },
                    ],
                    explanation: "",
                });
            },
        });
    };

    // Handle option text change
    const handleOptionTextChange = (index, value) => {
        const updatedOptions = [...data.options];
        updatedOptions[index].option = value;
        setData("options", updatedOptions);
    };

    // Handle correct option selection
    const handleCorrectOptionChange = (index) => {
        const updatedOptions = [...data.options];
        updatedOptions[index].ans = !updatedOptions[index].ans;
        setData({ ...data, options: updatedOptions });
    };

    useEffect(() => {
        // show success message
        if (flash.success) {
            toast.success(flash.success);
            flash.success = null;
        }

        // Show error message
        if (flash.error) {
            toast.error(flash.error);
            flash.error = null;
        }

        if (errors) {
            Object.values(errors).forEach((error) => {
                toast.error(error);
            });
            errors = null;
        }
    }, [flash, errors]);

    return (
        <div>
            <ToastContainer />
            <div className="row mt-3 mb-4">
                <div className="d-flex gap-2 justify-content-center">
                    {/* Display Class Name */}
                    <span className="badge text-primary border border-primary px-3 py-2 rounded-pill">
                        Class: {classes.name}
                    </span>

                    {/* Display Subject Name */}
                    <span className="badge text-success border border-success px-3 py-2 rounded-pill">
                        Subject: {subject.name}
                    </span>

                    {/* Display Chapter Name */}
                    <span
                        className="badge text-purple border border-purple px-3 py-2 rounded-pill"
                        style={{
                            color: "purple",
                            borderColor: "purple !important",
                        }}
                    >
                        Chapter: {chapter.name}
                    </span>
                </div>
            </div>

            {/* Hidden Fields for IDs */}
            <input type="hidden" name="class_id" value={classes.id} />
            <input type="hidden" name="subject_id" value={subject.id} />
            <input type="hidden" name="chapter_id" value={chapter.id} />

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        {/* Topic Dropdown */}
                        <div className="col-md-8 col-sm-6 col-12 mb-3">
                            <label className="form-label" htmlFor="topic">
                                Topic
                            </label>
                            <select
                                className="form-select"
                                id="topic"
                                value={data.topic_id}
                                onChange={(e) =>
                                    setData("topic_id", e.target.value)
                                }
                            >
                                <option value="">Select Topic</option>
                                {topics.map((topic) => (
                                    <option key={topic.id} value={topic.id}>
                                        {topic.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Hardness Dropdown */}
                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <label className="form-label" htmlFor="hardness">
                                Hardness
                            </label>
                            <select
                                className="form-select"
                                id="hardness"
                                value={
                                    data.hardness_id ||
                                    hardness.find((h) => h.name === "Easy")?.id
                                }
                                onChange={(e) =>
                                    setData("hardness_id", e.target.value)
                                }
                            >
                                {hardness.map((h) => (
                                    <option key={h.id} value={h.id}>
                                        {h.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    {/* Tags Select Box */}
                    <div className="col-md-12 col-sm-6 col-12 mb-3">
                        <label className="form-label" htmlFor="tags">
                            Tags
                        </label>
                        <Select
                            id="tags"
                            isMulti
                            options={tags.map((tag) => ({
                                value: tag.id,
                                label: tag.name,
                            }))}
                            value={tags
                                .filter((tag) => data.tags.includes(tag.id))
                                .map((tag) => ({
                                    value: tag.id,
                                    label: tag.name,
                                }))}
                            onChange={(selectedOptions) =>
                                setData(
                                    "tags",
                                    selectedOptions.map(
                                        (option) => option.value
                                    )
                                )
                            }
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    zIndex: 1050, // Bootstrap z-index range (1050 should be enough)
                                    position: "absolute", // Ensure the dropdown is positioned correctly
                                }),
                            }}
                        />
                    </div>

                    <div>
                        <p>Question</p>
                        <Editor
                            apiKey={TINYMCE_API_KEY}
                            value={data.question}
                            onEditorChange={(newValue) =>
                                setData("question", newValue)
                            }
                            init={{
                                height: 300,
                                selector: "textarea#open-source-plugins",
                                plugins:
                                    "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                                editimage_cors_hosts: ["picsum.photos"],
                                menubar:
                                    "file edit view insert format tools table help",
                                toolbar:
                                    "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                                autosave_ask_before_unload: true,
                                autosave_interval: "30s",
                                autosave_prefix: "{path}{query}-{id}-",
                                autosave_restore_when_empty: false,
                                autosave_retention: "2m",
                                image_advtab: true,
                            }}
                        />
                    </div>

                    <div className="container mt-4">
                        <h4 className="mb-4 mt-4">Options</h4>
                        <div className="row">
                            {data.options.map((opt, index) => (
                                <div
                                    className="col-12 d-flex align-items-center mb-3"
                                    key={index}
                                >
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
                                                handleOptionTextChange(
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
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={opt.ans}
                                        onChange={() =>
                                            handleCorrectOptionChange(index)
                                        }
                                        style={{
                                            transform: "scale(2)",
                                            marginTop: "0.2rem",
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container mt-4">
                        <h4 className="mb-4 mt-4">Explanation</h4>
                        <Editor
                            apiKey={TINYMCE_API_KEY}
                            value={data.explanation}
                            onEditorChange={(newValue) =>
                                setData("explanation", newValue)
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

                    <div className="container">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center mt-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                    disabled={processing}
                                >
                                    {processing ? "Submitting..." : "Add MCQ"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddMcq.layout = (page) => <Layout children={page} />;
export default AddMcq;
