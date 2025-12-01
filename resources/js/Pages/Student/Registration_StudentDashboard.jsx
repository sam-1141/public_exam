import React from "react";
import { route } from "ziggy-js";

export default function Registration_StudentDashboard({ stats, collegeWise }) {

    const formatDate = (ts) => {
        if (!ts) return "N/A";
        const d = new Date(ts);
        return d.toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const maxCount = Math.max(...collegeWise.map(c => c.total), 1);

    return (
        <div style={container}>
            
            
            <h1 style={title}>Student Registration Dashboard</h1>

            {/* SUMMARY CARDS */}
            <div style={cardRow}>
                <div style={card}>
                    <h2 style={cardHeader}>Total Students</h2>
                    <p style={cardNumber}>{stats.total_students}</p>
                </div>

                <div style={card}>
                    <h2 style={cardHeader}>Unique Colleges</h2>
                    <p style={cardNumber}>{stats.unique_colleges}</p>
                </div>

                <div style={card}>
                    <h2 style={cardHeader}>First Registration</h2>
                    <p style={cardNumber}>{formatDate(stats.earliest_registration)}</p>
                </div>

                <div style={card}>
                    <h2 style={cardHeader}>Latest Registration</h2>
                    <p style={cardNumber}>{formatDate(stats.latest_registration)}</p>
                </div>
            </div>

            {/* BAR CHART */}
            <h2 style={sectionTitle}>College-wise Registration Chart</h2>

            <div style={chartScroll}>
                <div style={chartContainer}>
                    {collegeWise.map((c, index) => {
                        const barHeight = (c.total / maxCount) * 200;
                        const isUnlisted = c.eiin === "000000";

                        return (
                            <div key={index} style={chartItem}>
                                <div
                                    style={{
                                        ...bar,
                                        height: barHeight,
                                        backgroundColor: isUnlisted ? "brown" : colors[index % colors.length]
                                    }}
                                ></div>
                                <p style={barLabel}>{c.name}</p>
                                <p style={barValue}>{c.total}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* TABLE */}
            <h2 style={sectionTitle}>College-wise Detailed Table</h2>

            <table style={table}>
                <thead>
                    <tr>
                        <th style={th}>EIIN</th>
                        <th style={th}>College Name</th>
                        <th style={th}>Total Students</th>
                    </tr>
                </thead>
                <tbody>
                    {collegeWise.map((c, idx) => (
                        <tr key={idx} style={tr}>
                            <td style={td}>{c.eiin}</td>
                            <td
                                style={{
                                    ...td,
                                    color: c.eiin === "000000" ? "brown" : "#333",
                                    fontWeight: c.eiin === "000000" ? "bold" : "normal"
                                }}
                            >
                                {c.name}
                            </td>
                            <td style={td}>{c.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ===== CSS ===== */

const container = {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
};

const title = {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "25px",
};

const cardRow = {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
};

const card = {
    flex: 1,
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const cardHeader = {
    fontSize: "16px",
    marginBottom: "8px",
    color: "#444",
};

const cardNumber = {
    fontSize: "26px",
    fontWeight: "bold",
};

const sectionTitle = {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "20px 0 10px",
};

/* === BAR CHART === */

const chartScroll = {
    overflowX: "auto",
    paddingBottom: "20px",
};

const chartContainer = {
    display: "flex",
    alignItems: "flex-end",
    gap: "30px",
};

const chartItem = {
    width: "120px",
    textAlign: "center",
};

const bar = {
    width: "50px",
    borderRadius: "6px 6px 0 0",
};

const barLabel = {
    fontSize: "12px",
    marginTop: "8px",
    fontWeight: "bold",
};

const barValue = {
    marginTop: "4px",
    fontSize: "14px",
    fontWeight: "bold",
};

const colors = [
    "#4CAF50", "#2196F3", "#FF9800", "#9C27B0",
    "#E91E63", "#009688", "#3F51B5", "#FF5722",
];

/* === TABLE === */

const table = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
};

const th = {
    padding: "14px",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "left",
};

const tr = {
    borderBottom: "1px solid #ddd",
};

const td = {
    padding: "12px",
};
