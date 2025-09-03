import React, { useState } from "react";

const ExamSearch = ({ courses, subjects, onFilterChange }) => {
    const [filters, setFilters] = useState({
        course: "",
        subject: "",
        search: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = {
            ...filters,
            [name]: value,
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const resetFilters = {
            course: "",
            subject: "",
            search: "",
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="search" className="form-label">
                            Search Exams
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            name="search"
                            placeholder="Search by exam name..."
                            value={filters.search}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="course" className="form-label">
                            Filter by Course
                        </label>
                        <select
                            className="form-select"
                            id="course"
                            name="course"
                            value={filters.course}
                            onChange={handleChange}
                        >
                            <option value="">All Courses</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.course_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="subject" className="form-label">
                            Filter by Subject
                        </label>
                        <select
                            className="form-select"
                            id="subject"
                            name="subject"
                            value={filters.subject}
                            onChange={handleChange}
                        >
                            <option value="">All Subjects</option>
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button
                            className="btn btn-outline-secondary w-100"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamSearch;
