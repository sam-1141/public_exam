import React, { useState, useEffect } from "react";

import QuestionCard from "../../components/Questions/QuestionCard";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import Layout from "../../layouts/Layout";

function McqBank({
    questions,
    flash,
    errors,
    classes,
    subjects,
    chapters,
    topics,
    hardness,
    tags,
    auth,
}) {
    const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [filteredChapters, setFilteredChapters] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [filters, setFilters] = useState({
        class_id: "",
        subject_id: "",
        chapter_id: "",
        topic_id: "",
        hardness_id: "",
        tag_id: "",
    });

    const applyFilters = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const resetFilters = () => {
        setFilters({
            class_id: "",
            subject_id: "",
            chapter_id: "",
            topic_id: "",
            hardness_id: "",
            tag_id: "",
        });
        setSearchQuery("");
        setCurrentPage(1);
    };

    useEffect(() => {
        if (filters.class_id) {
            const filtered = subjects.filter(
                (subject) => subject.class_id == filters.class_id
            );
            setFilteredSubjects(filtered);
        } else {
            setFilteredSubjects([]);
        }

        setFilters((prev) => ({
            ...prev,
            subject_id: "",
            chapter_id: "",
            topic_id: "",
        }));
    }, [filters.class_id]);

    useEffect(() => {
        if (filters.subject_id) {
            const filtered = chapters.filter(
                (chapter) => chapter.subject_id == filters.subject_id
            );
            setFilteredChapters(filtered);
        } else {
            setFilteredChapters([]);
        }

        setFilters((prev) => ({
            ...prev,
            chapter_id: "",
            topic_id: "",
        }));
    }, [filters.subject_id]);

    useEffect(() => {
        if (filters.chapter_id) {
            const filtered = topics.filter(
                (topic) => topic.chapter_id == filters.chapter_id
            );
            setFilteredTopics(filtered);
        } else {
            setFilteredTopics([]);
        }

        setFilters((prev) => ({
            ...prev,
            topic_id: "",
        }));
    }, [filters.chapter_id]);

    // Show success/error messages
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
            flash.success = null;
        }
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <ToastContainer />
            <div>
                <div
                    className="container mt-4"
                    style={{ maxWidth: 1200, margin: "0 auto" }}
                >
                    {/* Button to toggle Advance Search visibility */}
                    <button
                        className="btn btn-primary mb-3"
                        id="toggleSearchButton"
                        style={{
                            fontSize: 16,
                            padding: "10px 20px",
                            borderRadius: 8,
                            backgroundColor: "#4CAF50",
                            border: "none",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}
                    >
                        <i
                            className="fas fa-search-plus"
                            style={{ marginRight: 8 }}
                        />{" "}
                        {showAdvanceSearch
                            ? "Hide Advance Search"
                            : "Show Advance Search"}
                    </button>

                    {/* Advance Search Section */}
                    {showAdvanceSearch && (
                        <div
                            id="advanceSearchSection"
                            style={{
                                display: showAdvanceSearch ? "block" : "none",
                            }}
                        >
                            <div
                                className="card shadow-sm p-4"
                                style={{
                                    borderRadius: 12,
                                    backgroundColor: "#ffffff",
                                }}
                            >
                                <div className="card-body">
                                    <div className="row g-3">
                                        {/* Class Select */}
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Class
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="class_id"
                                                    value={filters.class_id}
                                                    onChange={
                                                        handleFilterChange
                                                    }
                                                >
                                                    <option value="">
                                                        Select Class
                                                    </option>
                                                    {classes.map((cls) => (
                                                        <option
                                                            key={cls.id}
                                                            value={cls.id}
                                                        >
                                                            {cls.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Subject Select */}
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Subject
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="subject_id"
                                                    value={filters.subject_id}
                                                    onChange={
                                                        handleFilterChange
                                                    }
                                                    disabled={!filters.class_id}
                                                >
                                                    <option value="">
                                                        Select Subject
                                                    </option>
                                                    {filteredSubjects.map(
                                                        (subject) => (
                                                            <option
                                                                key={subject.id}
                                                                value={
                                                                    subject.id
                                                                }
                                                            >
                                                                {subject.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Chapter Select */}
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Chapter
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="chapter_id"
                                                    value={filters.chapter_id}
                                                    onChange={
                                                        handleFilterChange
                                                    }
                                                    disabled={
                                                        !filters.subject_id
                                                    }
                                                >
                                                    <option value="">
                                                        Select Chapter
                                                    </option>
                                                    {filteredChapters.map(
                                                        (chapter) => (
                                                            <option
                                                                key={chapter.id}
                                                                value={
                                                                    chapter.id
                                                                }
                                                            >
                                                                {chapter.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Topic Select */}
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Topic
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="topic_id"
                                                    value={filters.topic_id}
                                                    onChange={
                                                        handleFilterChange
                                                    }
                                                    disabled={
                                                        !filters.chapter_id
                                                    }
                                                >
                                                    <option value="">
                                                        Select Topic
                                                    </option>
                                                    {filteredTopics.map(
                                                        (topic) => (
                                                            <option
                                                                key={topic.id}
                                                                value={topic.id}
                                                            >
                                                                {topic.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Hardness Select */}
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Hardness
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="hardness_id"
                                                    value={filters.hardness_id}
                                                    onChange={
                                                        handleFilterChange
                                                    }
                                                >
                                                    <option value="">
                                                        Select Hardness
                                                    </option>
                                                    {hardness.map((h) => (
                                                        <option
                                                            key={h.id}
                                                            value={h.id}
                                                        >
                                                            {h.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Tag Select */}
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Tag
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="tag_id"
                                                    value={filters.tag_id}
                                                    onChange={
                                                        handleFilterChange
                                                    }
                                                >
                                                    <option value="">
                                                        Select Tag
                                                    </option>
                                                    {tags.map((tag) => (
                                                        <option
                                                            key={tag.id}
                                                            value={tag.id}
                                                        >
                                                            {tag.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Search Input */}
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Search Question
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search for a question..."
                                                    value={searchQuery}
                                                    onChange={
                                                        handleSearchChange
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* Search and Reset Buttons */}
                                        <div className="col-md-12 text-end">
                                            <button
                                                type="button"
                                                className="btn btn-primary me-2"
                                                onClick={applyFilters}
                                            >
                                                Search
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={resetFilters}
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* [ Main Content ] start */}
                <div
                    className="container mt-4"
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        padding: "10px 0",
                    }}
                >
                    {isLoading && <LoadingSpinner />}

                    {!isLoading && (
                        <div className="alert alert-warning" role="alert">
                            No results found!
                        </div>
                    )}

                    {!isLoading &&
                        questions.map((question) => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                auth={auth.user}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}
McqBank.layout = (page) => <Layout children={page} />;
export default McqBank;
