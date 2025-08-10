import React, { useState, useEffect } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import { courses } from "./LiveExam/courses";

const EditExamModal = ({
    show,
    onClose,
    exam,
    loading,
    onSuccess,
    subjects = [],
    courses = [],
}) => {
    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [selectionType, setSelectionType] = useState({
        course: "single",
        subject: "single",
    });
    const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
    const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
    const [courseSearch, setCourseSearch] = useState("");
    const [subjectSearch, setSubjectSearch] = useState("");

    useEffect(() => {
        console.log('exam', exam)
    }, [exam]);

    useEffect(() => {
        if (exam) {
            setFormData({
                name: exam.name || "",
                courses: exam.courses
                    ? Array.isArray(exam.courses)
                        ? exam.courses
                        : exam.courses.split(",")
                    : [],
                subjects: exam.subjects
                    ? Array.isArray(exam.subjects)
                        ? exam.subjects
                        : exam.subjects.split(",")
                    : [],
                description: exam.description || "",
                totalQuestions: exam.total_questions || "",
                hasNegativeMarks: exam.has_negative_marks || false,
                negativeMarksValue: exam.negative_marks_value || "",
                totalMarks: exam.total_marks || "",
                duration: exam.duration || "",
                questionType: exam.question_type || "random",
                privacy: exam.privacy || "everyone",
                publishInstant: exam.publish_instant || "1",
                startTime: exam.start_time || "",
                endTime: exam.end_time || "",
            });
            setErrors({});
        }
    }, [exam]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                courseDropdownOpen &&
                !event.target.closest(".course-dropdown-container")
            ) {
                setCourseDropdownOpen(false);
            }
            if (
                subjectDropdownOpen &&
                !event.target.closest(".subject-dropdown-container")
            ) {
                setSubjectDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [courseDropdownOpen, subjectDropdownOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "privacy" && value === ""
                    ? null
                    : type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const handleSelectionTypeChange = (type, field) => {
        setSelectionType((prev) => ({
            ...prev,
            [field]: type,
        }));
        setFormData((prev) => ({
            ...prev,
            [field === "course" ? "courses" : "subjects"]: [],
        }));
    };

    const handleSingleCourseChange = (e) => {
        const courseId = e.target.value;
        setFormData((prev) => ({
            ...prev,
            courses: courseId ? [courseId] : [],
        }));
    };

    const addCourse = (courseId) => {
        const course = courses.find((c) => c.id == courseId);
        if (course && !formData.courses.includes(String(courseId))) {
            setFormData((prev) => ({
                ...prev,
                courses: [...prev.courses, String(courseId)],
            }));
        }
        setCourseDropdownOpen(false);
        setCourseSearch("");
    };

    const removeCourse = (courseId) => {
        setFormData((prev) => ({
            ...prev,
            courses: prev.courses.filter((c) => c !== courseId),
        }));
    };

    const handleSingleSubjectChange = (e) => {
        const subjectId = e.target.value;
        setFormData((prev) => ({
            ...prev,
            subjects: subjectId ? [subjectId] : [],
        }));
    };

    const addSubject = (subjectId) => {
        const subject = subjects.find((s) => s.id == subjectId);
        if (subject && !formData.subjects.includes(String(subjectId))) {
            setFormData((prev) => ({
                ...prev,
                subjects: [...prev.subjects, String(subjectId)],
            }));
        }
        setSubjectDropdownOpen(false);
        setSubjectSearch("");
    };

    const removeSubject = (subjectId) => {
        setFormData((prev) => ({
            ...prev,
            subjects: prev.subjects.filter((s) => s !== subjectId),
        }));
    };

    const filteredCourses = Array.isArray(courses)
        ? courses.filter(
              (course) =>
                  course.course_name
                      ?.toLowerCase()
                      .includes(courseSearch.toLowerCase()) &&
                  !formData?.courses?.includes(String(course.id))
          )
        : [];

    const filteredSubjects = Array.isArray(subjects)
        ? subjects.filter(
              (subject) =>
                  subject.name
                      ?.toLowerCase()
                      .includes(subjectSearch.toLowerCase()) &&
                  !formData?.subjects?.includes(String(subject.id))
          )
        : [];

    const getSelectedCourseNames = () => {
        return (
            formData?.courses
                ?.map((courseId) => {
                    const course = courses.find((c) => c.id == courseId);
                    return course ? course.course_name : "";
                })
                .filter((name) => name) || []
        );
    };

    const getSelectedSubjectNames = () => {
        return (
            formData?.subjects
                ?.map((subjectId) => {
                    const subject = subjects.find((s) => s.id == subjectId);
                    return subject ? subject.name : "";
                })
                .filter((name) => name) || []
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) return;
        setSubmitting(true);
        setErrors({});

        const submissionData = {
            ...formData,
            course_id:
                selectionType.course === "single" && formData.courses.length > 0
                    ? formData.courses[0]
                    : null,
            subject_id:
                selectionType.subject === "single" &&
                formData.subjects.length > 0
                    ? formData.subjects[0]
                    : null,
            course_ids: formData.courses,
            subject_ids: formData.subjects,
            courses: Array.isArray(formData.courses)
                ? formData.courses.join(",")
                : formData.courses,
            subjects: Array.isArray(formData.subjects)
                ? formData.subjects.join(",")
                : formData.subjects,
        };

        try {
            await axios.put(
                route("update.single.exam", { slug: exam.slug }),
                submissionData,
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );
            setSubmitting(false);
            onClose();
            if (onSuccess) onSuccess();
        } catch (err) {
            if (err.response) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else if (err.response.status === 401) {
                    setErrors({
                        general: "You must be logged in to update the exam.",
                    });
                } else {
                    setErrors({ general: "Something went wrong!" });
                }
            } else {
                setErrors({ general: "Network error." });
            }
            setSubmitting(false);
        }
    };

    if (!show || !exam || !formData) return null;

    if (loading) {
        return (
            <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div
                            className="modal-body d-flex justify-content-center align-items-center"
                            style={{ minHeight: 300 }}
                        >
                            <div
                                className="spinner-border text-primary"
                                style={{ width: "3rem", height: "3rem" }}
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-xl font-semibold">
                            Edit Live Exam: {exam.name}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={submitting}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {errors.general && (
                                <div className="alert alert-danger">
                                    {errors.general}
                                </div>
                            )}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                errors.name ? "is-invalid" : ""
                                            }`}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name[0]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Courses:
                                        </label>
                                        <div className="flex gap-4 mb-3">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="courseSelectionType"
                                                    checked={
                                                        selectionType.course ===
                                                        "single"
                                                    }
                                                    onChange={() =>
                                                        handleSelectionTypeChange(
                                                            "single",
                                                            "course"
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                Single
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="courseSelectionType"
                                                    checked={
                                                        selectionType.course ===
                                                        "multiple"
                                                    }
                                                    onChange={() =>
                                                        handleSelectionTypeChange(
                                                            "multiple",
                                                            "course"
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                Multiple
                                            </label>
                                        </div>

                                        {selectionType.course === "single" ? (
                                            <select
                                                className={`form-select ${
                                                    errors.courses
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                value={
                                                    formData.courses[0] || ""
                                                }
                                                onChange={
                                                    handleSingleCourseChange
                                                }
                                            >
                                                <option value="">
                                                    Select a course
                                                </option>
                                                {courses.map((course) => (
                                                    <option
                                                        key={course.id}
                                                        value={course.id}
                                                    >
                                                        {course.course_name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div className="relative course-dropdown-container">
                                                <div
                                                    className={`min-h-[42px] w-full px-3 py-2 border rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-500 ${
                                                        errors.courses
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                    onClick={() =>
                                                        setCourseDropdownOpen(
                                                            !courseDropdownOpen
                                                        )
                                                    }
                                                >
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {getSelectedCourseNames().map(
                                                            (name, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="inline-flex items-center px-3 py-1 rounded-md text-md bg-gray-200 text-gray-800"
                                                                >
                                                                    {name}
                                                                    <button
                                                                        type="button"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            removeCourse(
                                                                                formData
                                                                                    .courses[
                                                                                    index
                                                                                ]
                                                                            );
                                                                        }}
                                                                        className="ml-2 text-gray-600 hover:text-gray-800"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Search and select courses..."
                                                        value={courseSearch}
                                                        onChange={(e) =>
                                                            setCourseSearch(
                                                                e.target.value
                                                            )
                                                        }
                                                        onFocus={() =>
                                                            setCourseDropdownOpen(
                                                                true
                                                            )
                                                        }
                                                        className="w-full outline-none"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    />
                                                </div>
                                                {courseDropdownOpen && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                        {filteredCourses.length >
                                                        0 ? (
                                                            filteredCourses.map(
                                                                (course) => (
                                                                    <button
                                                                        key={
                                                                            course.id
                                                                        }
                                                                        type="button"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            addCourse(
                                                                                course.id
                                                                            );
                                                                        }}
                                                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100"
                                                                    >
                                                                        {
                                                                            course.course_name
                                                                        }
                                                                    </button>
                                                                )
                                                            )
                                                        ) : (
                                                            <div className="px-4 py-2 text-gray-500">
                                                                No courses found
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {errors.courses && (
                                            <div className="invalid-feedback d-block">
                                                {errors.courses[0]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Subjects:
                                        </label>
                                        <div className="flex gap-4 mb-3">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="subjectSelectionType"
                                                    checked={
                                                        selectionType.subject ===
                                                        "single"
                                                    }
                                                    onChange={() =>
                                                        handleSelectionTypeChange(
                                                            "single",
                                                            "subject"
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                Single
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="subjectSelectionType"
                                                    checked={
                                                        selectionType.subject ===
                                                        "multiple"
                                                    }
                                                    onChange={() =>
                                                        handleSelectionTypeChange(
                                                            "multiple",
                                                            "subject"
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                Multiple
                                            </label>
                                        </div>

                                        {selectionType.subject === "single" ? (
                                            <select
                                                className={`form-select ${
                                                    errors.subjects
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                value={
                                                    formData.subjects[0] || ""
                                                }
                                                onChange={
                                                    handleSingleSubjectChange
                                                }
                                            >
                                                <option value="">
                                                    Select a subject
                                                </option>
                                                {subjects.map((subject) => (
                                                    <option
                                                        key={subject.id}
                                                        value={subject.id}
                                                    >
                                                        {subject.name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div className="relative subject-dropdown-container">
                                                <div
                                                    className={`min-h-[42px] w-full px-3 py-2 border rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-500 ${
                                                        errors.subjects
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                    onClick={() =>
                                                        setSubjectDropdownOpen(
                                                            !subjectDropdownOpen
                                                        )
                                                    }
                                                >
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {getSelectedSubjectNames().map(
                                                            (name, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="inline-flex items-center px-3 py-1 rounded-md text-md bg-gray-200 text-gray-800"
                                                                >
                                                                    {name}
                                                                    <button
                                                                        type="button"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            removeSubject(
                                                                                formData
                                                                                    .subjects[
                                                                                    index
                                                                                ]
                                                                            );
                                                                        }}
                                                                        className="ml-2 text-gray-600 hover:text-gray-800"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Search and select subjects..."
                                                        value={subjectSearch}
                                                        onChange={(e) =>
                                                            setSubjectSearch(
                                                                e.target.value
                                                            )
                                                        }
                                                        onFocus={() =>
                                                            setSubjectDropdownOpen(
                                                                true
                                                            )
                                                        }
                                                        className="w-full outline-none"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    />
                                                </div>
                                                {subjectDropdownOpen && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                        {filteredSubjects.length >
                                                        0 ? (
                                                            filteredSubjects.map(
                                                                (subject) => (
                                                                    <button
                                                                        key={
                                                                            subject.id
                                                                        }
                                                                        type="button"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            addSubject(
                                                                                subject.id
                                                                            );
                                                                        }}
                                                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100"
                                                                    >
                                                                        {
                                                                            subject.name
                                                                        }
                                                                    </button>
                                                                )
                                                            )
                                                        ) : (
                                                            <div className="px-4 py-2 text-gray-500">
                                                                No subjects
                                                                found
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {errors.subjects && (
                                            <div className="invalid-feedback d-block">
                                                {errors.subjects[0]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Description:
                                        </label>
                                        <textarea
                                            className={`form-control ${
                                                errors.description
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="3"
                                        ></textarea>
                                        {errors.description && (
                                            <div className="invalid-feedback">
                                                {errors.description[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Total Questions:
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                errors.totalQuestions
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="totalQuestions"
                                            value={formData.totalQuestions}
                                            onChange={handleChange}
                                        />
                                        {errors.totalQuestions && (
                                            <div className="invalid-feedback">
                                                {errors.totalQuestions[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Total Marks:
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                errors.totalMarks
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="totalMarks"
                                            value={formData.totalMarks}
                                            onChange={handleChange}
                                        />
                                        {errors.totalMarks && (
                                            <div className="invalid-feedback">
                                                {errors.totalMarks[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Duration (min):
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                errors.duration
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                        />
                                        {errors.duration && (
                                            <div className="invalid-feedback">
                                                {errors.duration[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Question Type:
                                        </label>
                                        <select
                                            className={`form-select ${
                                                errors.questionType
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="questionType"
                                            value={formData.questionType}
                                            onChange={handleChange}
                                        >
                                            <option value="random">
                                                Random
                                            </option>
                                            <option value="shuffle">
                                                Shuffle
                                            </option>
                                        </select>
                                        {errors.questionType && (
                                            <div className="invalid-feedback">
                                                {errors.questionType[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Negative Marks:
                                        </label>
                                        <div className="d-flex align-items-center gap-5">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="negativeMarksCheckbox"
                                                    checked={
                                                        formData.hasNegativeMarks
                                                    }
                                                    onChange={handleChange}
                                                    name="hasNegativeMarks"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="negativeMarksCheckbox"
                                                >
                                                    Yes
                                                </label>
                                            </div>
                                            {formData.hasNegativeMarks && (
                                                <div style={{ width: "200px" }}>
                                                    <input
                                                        type="number"
                                                        className={`form-control ${
                                                            errors.negativeMarksValue
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        min="0"
                                                        step="any"
                                                        value={
                                                            formData.negativeMarksValue
                                                        }
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                negativeMarksValue:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        placeholder="Enter marks"
                                                        name="negative_marks_value"
                                                    />
                                                    <span>
                                                        marks per wrong answer
                                                    </span>
                                                    {errors.negativeMarksValue && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors
                                                                    .negativeMarksValue[0]
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <hr />
                                    <h6 className="my-3 font-semibold text-lg">
                                        Advanced Settings
                                    </h6>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Privacy:
                                        </label>
                                        <select
                                            className={`form-select ${
                                                errors.privacy
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="privacy"
                                            value={formData.privacy}
                                            onChange={handleChange}
                                        >
                                            <option value="everyone">
                                                Everyone
                                            </option>
                                            <option value="link">
                                                By Link Only
                                            </option>
                                        </select>
                                        {errors.privacy && (
                                            <div className="invalid-feedback">
                                                {errors.privacy[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Publish Instant?
                                        </label>
                                        <select
                                            className={`form-select ${
                                                errors.publishInstant
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="publishInstant"
                                            value={formData.publishInstant}
                                            onChange={handleChange}
                                        >
                                            <option value="0">NO</option>
                                            <option value="1">YES</option>
                                        </select>
                                        {errors.publishInstant && (
                                            <div className="invalid-feedback">
                                                {errors.publishInstant[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Exam Start Time:
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className={`form-control ${
                                                errors.startTime
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                        />
                                        {errors.startTime && (
                                            <div className="invalid-feedback">
                                                {errors.startTime[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Exam End Time:
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className={`form-control ${
                                                errors.endTime
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                        />
                                        {errors.endTime && (
                                            <div className="invalid-feedback">
                                                {errors.endTime[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={submitting}
                                >
                                    {submitting ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditExamModal;
