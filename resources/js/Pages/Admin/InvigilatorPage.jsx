import { router } from "@inertiajs/react";

export default function InvigilatorPage({ students }) {
    // Count dashboard stats
    const totalLoggedIn = students.filter((s) => s.logged_in === 1).length;
    const totalSubmitted = students.filter((s) => s.submit_status === 1).length;

    // Toggle Login
    const toggleLogin = (id) => {
        router.post(`/admin/toggle-login/${id}`, {}, { preserveScroll: true });
    };

    // Toggle Submit Status
    const toggleSubmit = (id) => {
        router.post(`/admin/toggle-submit/${id}`, {}, { preserveScroll: true });
    };

    return (
        <div style={{ padding: "24px" }}>
            {/* Page Title */}
            <h1 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px" }}>
                Invigilator Panel
            </h1>

            {/* Stats Summary */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "25px",
                }}
            >
                <div
                    style={{
                        padding: "14px 20px",
                        background: "#e6f4ff",
                        border: "1px solid #b3d8ff",
                        borderRadius: "10px",
                        fontWeight: "bold",
                    }}
                >
                    Logged In Students: {totalLoggedIn}
                </div>

                <div
                    style={{
                        padding: "14px 20px",
                        background: "#eaffea",
                        border: "1px solid #b6e5b6",
                        borderRadius: "10px",
                        fontWeight: "bold",
                    }}
                >
                    Submitted: {totalSubmitted}
                </div>
            </div>

            {/* Student Table */}
            <table
                style={{
                    width: "100%",
                    background: "white",
                    borderCollapse: "collapse",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
            >
                <thead style={{ background: "#f2f2f2" }}>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Phone</th>
                        <th style={thStyle}>Logged In</th>
                        <th style={thStyle}>Submit Status</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((s) => (
                        <tr key={s.id} style={{ textAlign: "center" }}>
                            <td style={tdStyle}>{s.id}</td>
                            <td style={tdStyle}>{s.name}</td>
                            <td style={tdStyle}>{s.email}</td>
                            <td style={tdStyle}>{s.phone}</td>

                            {/* Toggle Logged In */}
                            <td style={tdStyle}>
                                <button
                                    onClick={() => toggleLogin(s.id)}
                                    style={{
                                        padding: "6px 14px",
                                        borderRadius: "6px",
                                        color: "white",
                                        fontWeight: "bold",
                                        background: s.logged_in ? "#22c55e" : "#ef4444",
                                        cursor: "pointer",
                                        border: "none",
                                    }}
                                >
                                    {s.logged_in ? "YES" : "NO"}
                                </button>
                            </td>

                            {/* Toggle Submit */}
                            <td style={tdStyle}>
                                <button
                                    onClick={() => toggleSubmit(s.id)}
                                    style={{
                                        padding: "6px 14px",
                                        borderRadius: "6px",
                                        color: "white",
                                        fontWeight: "bold",
                                        background: s.submit_status ? "#0ea5e9" : "#6b7280",
                                        cursor: "pointer",
                                        border: "none",
                                    }}
                                >
                                    {s.submit_status ? "SUBMITTED" : "NOT SUBMITTED"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Reusable table styles
const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    fontWeight: "bold",
    fontSize: "14px",
};

const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
};
