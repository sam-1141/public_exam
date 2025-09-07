import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "@inertiajs/react";

import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import Layout from "../../layouts/Layout";

import { TINYMCE_API_KEY } from "../../helper/constants";

function EditMcq({
    classes,
    subjects,
    chapters,
    topics,
    hardness,
    tags,
    flash,
    errors,
    question, // Pass the question details as a prop
}) {
    // Form state using useForm
    const { data, setData, put, processing } = useForm({
        class_id: question.class_id,
        subject_id: question.subject_id,
        chapter_id: question.chapter_id,
        topic_id: question.topic_id,
        hardness_id: question.hardness_id,
        tags: question.tags.map((tag) => tag.tag_id),
        question: question.question,
        options: JSON.parse(question.options),
        explanation: question.explanation,
    });

    // State for filtered subjects, chapters, and topics
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [filteredChapters, setFilteredChapters] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);

    // Filter subjects based on selected class
    useEffect(() => {
        if (data.class_id) {
            const filtered = subjects.filter(
                (subject) => subject.class_id == data.class_id
            );
            setFilteredSubjects(filtered);
        } else {
            setFilteredSubjects([]);
        }
    }, [data.class_id]);

    // Filter chapters based on selected subject
    useEffect(() => {
        if (data.subject_id) {
            const filtered = chapters.filter(
                (chapter) => chapter.subject_id == data.subject_id
            );
            setFilteredChapters(filtered);
        } else {
            setFilteredChapters([]);
        }
    }, [data.subject_id]);

    // Filter topics based on selected chapter
    useEffect(() => {
        if (data.chapter_id) {
            const filtered = topics.filter(
                (topic) => topic.chapter_id == data.chapter_id
            );
            setFilteredTopics(filtered);
        } else {
            setFilteredTopics([]);
        }
    }, [data.chapter_id]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("update.mcq", question.id));
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
        // Show success message
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
                        Class: {question.class.name}
                    </span>

                    {/* Display Subject Name */}
                    <span className="badge text-success border border-success px-3 py-2 rounded-pill">
                        Subject: {question.subject.name}
                    </span>

                    {/* Display Chapter Name */}
                    <span
                        className="badge text-purple border border-purple px-3 py-2 rounded-pill"
                        style={{
                            color: "purple",
                            borderColor: "purple !important",
                        }}
                    >
                        Chapter: {question.chapter.name}
                    </span>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        {/* Class Dropdown */}
                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <label className="form-label" htmlFor="class">
                                Class
                            </label>
                            <select
                                className="form-select"
                                id="class"
                                value={data.class_id}
                                onChange={(e) =>
                                    setData("class_id", e.target.value)
                                }
                            >
                                <option value="">Select Class</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subject Dropdown */}
                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <label className="form-label" htmlFor="subject">
                                Subject
                            </label>
                            <select
                                className="form-select"
                                id="subject"
                                value={data.subject_id}
                                onChange={(e) =>
                                    setData("subject_id", e.target.value)
                                }
                                disabled={!data.class_id}
                            >
                                <option value="">Select Subject</option>
                                {filteredSubjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Chapter Dropdown */}
                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <label className="form-label" htmlFor="chapter">
                                Chapter
                            </label>
                            <select
                                className="form-select"
                                id="chapter"
                                value={data.chapter_id}
                                onChange={(e) =>
                                    setData("chapter_id", e.target.value)
                                }
                                disabled={!data.subject_id}
                            >
                                <option value="">Select Chapter</option>
                                {filteredChapters.map((chapter) => (
                                    <option key={chapter.id} value={chapter.id}>
                                        {chapter.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Topic Dropdown */}
                        <div className="col-md-4 col-sm-6 col-12 mb-3">
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
                                disabled={!data.chapter_id}
                            >
                                <option value="">Select Topic</option>
                                {filteredTopics.map((topic) => (
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
                                value={data.hardness_id}
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
                                    zIndex: 1050,
                                    position: "absolute",
                                }),
                            }}
                        />
                    </div>

                    <p>Question</p>
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
                                    {processing ? "Updating..." : "Update MCQ"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

EditMcq.layout = (page) => <Layout children={page} />;
export default EditMcq;
