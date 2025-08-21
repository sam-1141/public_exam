import React, { useState, useEffect } from "react";
import QuestionCard from "../../components/Questions/QuestionCard";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import Layout from "../../layouts/Layout";
import { Icon } from "@iconify/react";

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
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="container-fluid py-4">
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="border-0">
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="h3 font-semibold mb-0">
                                        MCQ Bank
                                    </h4>
                                    <button
                                        className={`btn btn-${
                                            showAdvanceSearch
                                                ? "light btn-outline-secondary"
                                                : "primary"
                                        } d-flex align-items-center gap-2`}
                                        onClick={() =>
                                            setShowAdvanceSearch(
                                                !showAdvanceSearch
                                            )
                                        }
                                    >
                                        <Icon
                                            icon={
                                                showAdvanceSearch
                                                    ? "mdi:filter-remove"
                                                    : "mdi:filter-variant"
                                            }
                                        />
                                        {showAdvanceSearch
                                            ? "Hide Filters"
                                            : "Show Filters"}
                                    </button>
                                </div>

                                {showAdvanceSearch && (
                                    <div className="card mb-4">
                                        <div className="row g-3 card-body">
                                            {/* Class Select */}
                                            <div className="col-md-4 col-lg-3">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Class
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        name="class_id"
                                                        value={filters.class_id}
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                    >
                                                        <option value="">
                                                            All Classes
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
                                            <div className="col-md-4 col-lg-3">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Subject
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        name="subject_id"
                                                        value={
                                                            filters.subject_id
                                                        }
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        disabled={
                                                            !filters.class_id
                                                        }
                                                    >
                                                        <option value="">
                                                            All Subjects
                                                        </option>
                                                        {filteredSubjects.map(
                                                            (subject) => (
                                                                <option
                                                                    key={
                                                                        subject.id
                                                                    }
                                                                    value={
                                                                        subject.id
                                                                    }
                                                                >
                                                                    {
                                                                        subject.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Chapter Select */}
                                            <div className="col-md-4 col-lg-3">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Chapter
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        name="chapter_id"
                                                        value={
                                                            filters.chapter_id
                                                        }
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        disabled={
                                                            !filters.subject_id
                                                        }
                                                    >
                                                        <option value="">
                                                            All Chapters
                                                        </option>
                                                        {filteredChapters.map(
                                                            (chapter) => (
                                                                <option
                                                                    key={
                                                                        chapter.id
                                                                    }
                                                                    value={
                                                                        chapter.id
                                                                    }
                                                                >
                                                                    {
                                                                        chapter.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Topic Select */}
                                            <div className="col-md-4 col-lg-3">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Topic
                                                    </label>
                                                    <select
                                                        className="form-select"
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
                                                            All Topics
                                                        </option>
                                                        {filteredTopics.map(
                                                            (topic) => (
                                                                <option
                                                                    key={
                                                                        topic.id
                                                                    }
                                                                    value={
                                                                        topic.id
                                                                    }
                                                                >
                                                                    {topic.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Hardness Select */}
                                            <div className="col-md-4 col-lg-3">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Difficulty
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        name="hardness_id"
                                                        value={
                                                            filters.hardness_id
                                                        }
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                    >
                                                        <option value="">
                                                            All Levels
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
                                            <div className="col-md-4 col-lg-3">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Tags
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        name="tag_id"
                                                        value={filters.tag_id}
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                    >
                                                        <option value="">
                                                            All Tags
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
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Search Questions
                                                    </label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <Icon icon="mdi:magnify" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search questions..."
                                                            value={searchQuery}
                                                            onChange={
                                                                handleSearchChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="col-12 d-flex justify-content-end gap-2">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={resetFilters}
                                                >
                                                    Reset
                                                </button>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={applyFilters}
                                                >
                                                    <Icon
                                                        icon="mdi:filter-apply"
                                                        className="me-1"
                                                    />
                                                    Apply Filters
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="row">
                    <div className="col-12">
                        {isLoading ? (
                            <div className="d-flex justify-content-center my-5">
                                <LoadingSpinner />
                            </div>
                        ) : questions.length === 0 ? (
                            <div className="card shadow-sm border-0">
                                <div className="card-body d-flex flex-column align-items-center justify-content-center text-center py-5">
                                    <Icon
                                        icon="mdi:file-question-outline"
                                        className="text-muted"
                                        width={48}
                                        height={48}
                                    />
                                    <h5 className="mt-3">No questions found</h5>
                                    <p className="text-muted">
                                        Try adjusting your search filters
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {questions.map((question) => (
                                    <div key={question.id} className="col-12">
                                        <QuestionCard
                                            question={question}
                                            auth={auth.user}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

McqBank.layout = (page) => <Layout children={page} />;
export default McqBank;
