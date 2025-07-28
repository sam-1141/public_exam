import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react"; // Import useForm from Inertia

function TopicSection({ topics, classes, subjects, chapters }) {
    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        id: "",
        class_id: "",
        subject_id: "",
        chapter_id: "",
        name: "",
    });

    // State for filtered subjects and chapters
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [filteredChapters, setFilteredChapters] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false); // Track if updating

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

        // Reset subject and chapter only if not updating
        if (!isUpdate) {
            setData("subject_id", "");
            setData("chapter_id", "");
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

        // Reset chapter only if not updating
        if (!isUpdate) {
            setData("chapter_id", "");
        }
    }, [data.subject_id]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            put(route("update.topic", data.id), {
                onSuccess: () => {
                    resetForm();
                },
            });
        } else {
            post(route("add.topics"), {
                onSuccess: () => {
                    resetForm();
                },
            });
        }
    };

    // Handle delete
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this topic?")) {
            destroy(route("delete.topic", id));
        }
    };

    // Handle edit
    const handleEdit = (topic) => {
        setIsUpdate(true);
        setData({
            id: topic.id,
            class_id: topic.chapter.subject.class.id,
            subject_id: topic.chapter.subject.id,
            chapter_id: topic.chapter.id,
            name: topic.name,
        });

        // Set filtered subjects and chapters for update mode
        const filteredSubjects = subjects.filter(
            (subject) => subject.class_id == topic.chapter.subject.class.id
        );
        setFilteredSubjects(filteredSubjects);

        const filteredChapters = chapters.filter(
            (chapter) => chapter.subject_id == topic.chapter.subject.id
        );
        setFilteredChapters(filteredChapters);
    };

    // Reset form
    const resetForm = () => {
        setIsUpdate(false);
        setData({
            id: "",
            class_id: "",
            subject_id: "",
            chapter_id: "",
            name: "",
        });
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">{isUpdate ? "Update Topic" : "Add Topics"}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Class Select */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Class Name</label>
                                            <select
                                                className="form-control"
                                                name="class_id"
                                                value={data.class_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "class_id",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={isUpdate} // Disable during update
                                            >
                                                <option value="">Select Class</option>
                                                {classes.map((cls) => (
                                                    <option
                                                        key={cls.id}
                                                        value={cls.id}
                                                    >
                                                        {cls.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.class_id && (
                                                <div className="text-danger mt-2">
                                                    {errors.class_id}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subject Select */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Subject Name</label>
                                            <select
                                                className="form-control"
                                                name="subject_id"
                                                value={data.subject_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={!data.class_id && !isUpdate} // Disable if no class is selected
                                            >
                                                <option value="">Select Subject</option>
                                                {filteredSubjects.map(
                                                    (subject) => (
                                                        <option
                                                            key={subject.id}
                                                            value={subject.id}
                                                        >
                                                            {subject.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            {errors.subject_id && (
                                                <div className="text-danger mt-2">
                                                    {errors.subject_id}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Chapter Select */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Chapter Name</label>
                                            <select
                                                className="form-control"
                                                name="chapter_id"
                                                value={data.chapter_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "chapter_id",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={!data.subject_id && !isUpdate} // Disable if no subject is selected
                                            >
                                                <option value="">Select Chapter</option>
                                                {filteredChapters.map(
                                                    (chapter) => (
                                                        <option
                                                            key={chapter.id}
                                                            value={chapter.id}
                                                        >
                                                            {chapter.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            {errors.chapter_id && (
                                                <div className="text-danger mt-2">
                                                    {errors.chapter_id}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Topic Input */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Topic Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter Topic name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.name && (
                                                <div className="text-danger mt-2">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-md-12 text-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Submitting..."
                                                : isUpdate
                                                    ? "Update"
                                                    : "Submit"}
                                        </button>
                                        {isUpdate && (
                                            <button
                                                type="button"
                                                className="btn btn-secondary ms-2"
                                                onClick={resetForm}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Topic List Table */}
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Topic List</h5>
                        </div>
                        <div className="card-body table-border-style">
                            <div className="table-responsive">
                                <table className="table" id="pc-dt-simple">
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>Subject Name</th>
                                            <th>Chapter Name</th>
                                            <th>Topic</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topics.map((topic) => (
                                            <tr key={topic.id}>
                                                <td>
                                                    {
                                                        topic?.chapter?.subject
                                                            .class.name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        topic?.chapter?.subject
                                                            .name
                                                    }
                                                </td>
                                                <td>{topic?.chapter?.name}</td>
                                                <td>{topic.name}</td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(topic)
                                                        }
                                                        className="btn btn-link"
                                                    >
                                                        <i className="ti ti-edit f-20" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                topic.id
                                                            )
                                                        }
                                                        className="btn btn-link text-danger"
                                                    >
                                                        <i className="ti ti-trash f-20" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopicSection;
