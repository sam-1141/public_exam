import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Create() {
    const { flash, exam } = usePage().props;

    const [form, setForm] = useState({
        name: exam?.name || "",
        description: exam?.description || "",
        total_questions: exam?.total_questions || "",
        has_negative_marks: exam?.has_negative_marks ? true : false,
        negative_marks_value: exam?.negative_marks_value || "",
        total_marks: exam?.total_marks || "",
        duration: exam?.duration || "",
        start_time: exam?.start_time ? exam.start_time.replace(" ", "T") : "",
        end_time: exam?.end_time ? exam.end_time.replace(" ", "T") : "",
        result_publish_time: exam?.result_publish_time ? exam.result_publish_time.replace(" ", "T") : "",
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route("live-exams.store"), form);
    };

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "0 auto",
                padding: "24px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}
        >
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Create Live Exam</h1>

            {flash.success && (
                <div
                    style={{
                        backgroundColor: "#d1fae5",
                        padding: "12px",
                        borderRadius: "6px",
                        marginBottom: "16px",
                        color: "#047857"
                    }}
                >
                    {flash.success}
                </div>
            )}

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px"
                        }}
                        required
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="<p>Write exam description here...</p>"
                        style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px",
                            minHeight: "100px"
                        }}
                    />
                </div>

                <div>
                    <label>Total Questions</label>
                    <input
                        type="number"
                        name="total_questions"
                        value={form.total_questions}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px"
                        }}
                        required
                    />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                        type="checkbox"
                        name="has_negative_marks"
                        checked={form.has_negative_marks}
                        onChange={handleChange}
                    />
                    <label>Has Negative Marks</label>
                </div>

                {form.has_negative_marks && (
                    <div>
                        <label>Negative Marks Value</label>
                        <input
                            type="number"
                            step="0.01"
                            name="negative_marks_value"
                            value={form.negative_marks_value}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                border: "1px solid #ccc",
                                padding: "8px",
                                borderRadius: "4px"
                            }}
                        />
                    </div>
                )}

                <div>
                    <label>Total Marks</label>
                    <input
                        type="number"
                        name="total_marks"
                        value={form.total_marks}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px"
                        }}
                    />
                </div>

                <div>
                    <label>Duration (minutes)</label>
                    <input
                        type="number"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px"
                        }}
                    />
                </div>

                <div>
                    <label>Start Time</label>
                    <input
                        type="datetime-local"
                        name="start_time"
                        value={form.start_time}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px"
                        }}
                    />
                </div>

                <div>
                    <label>End Time</label>
                    <input
                        type="datetime-local"
                        name="end_time"
                        value={form.end_time}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px"
                        }}
                    />
                </div>

                <div>
                    <label>Result Publish Time</label>
                    <input
                        type="datetime-local"
                        name="result_publish_time"
                        value={form.result_publish_time}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px"
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "10px 16px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Create Exam
                </button>
            </form>
        </div>
    );
}
