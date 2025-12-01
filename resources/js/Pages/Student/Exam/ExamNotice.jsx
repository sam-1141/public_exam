import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ExamNotice({ description }) {
    return (
        <div
            style={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
                padding: "20px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* SLOT FOR RECEIVING THE HTML SNIPPET */}
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "15px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                    backgroundColor: "#fafafa",
                }}
                dangerouslySetInnerHTML={{ __html: description }}
            ></div>

            {/* START EXAM BUTTON */}
            <Link
                href={route("student.live.exam.main")}
                style={{
                    display: "inline-block",
                    padding: "10px 18px",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontSize: "16px",
                }}
            >
                Start Exam
            </Link>
            <Link
                href={route("student.delete.exam")}
                style={{
                    display: "inline-block",
                    padding: "10px 18px",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontSize: "16px",
                }}
            >
                clear all
            </Link>
        </div>
    );
}
