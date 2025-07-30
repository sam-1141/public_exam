import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";

function StudentNavLinks() {
    return (
        <>
            <ul className="pc-navbar font-baloo">
                <li className="pc-item pc-caption">
                    <label>সাধারণ</label>
                </li>
                <li className="pc-item">
                    <Link href={route("dashboard")} className="pc-link">
                        <span className="pc-micon">
                            <i className="ti ti-home" />
                        </span>
                        <span className="pc-mtext" data-i18n="Dashboard">
                            ড্যাশবোর্ড
                        </span>
                    </Link>
                </li>
                <li className="pc-item">
                    <Link href={route("student.courses")} className="pc-link">
                        <span className="pc-micon">
                            <i className="ti ti-list" />
                        </span>
                        <span className="pc-mtext">আমার কোর্সসমূহ</span>
                    </Link>
                </li>
                {/* Buy More Courses */}
                <li className="pc-item" style={{ position: "relative" }}>
                    <a
                        href="https://fahadstutorial.com"
                        className="pc-link"
                        target="_blank"
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            fontWeight: 600,
                            borderRadius: "6px",
                            background:
                                "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                        }}
                    >
                        {/* Animated border bottom */}
                        <span
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "2px",
                                background:
                                    "linear-gradient(90deg, var(--bs-primary), transparent)",
                                transform: "scaleX(0)",
                                transformOrigin: "left",
                                transition: "transform 0.3s ease",
                                borderRadius: "2px",
                            }}
                            className="hover:scale-x-100"
                        />

                        {/* Icon with glow effect */}
                        <span
                            className="pc-micon"
                            style={{
                                position: "relative",
                                zIndex: 1,
                                filter: "drop-shadow(0 0 0 var(--bs-primary))",
                                transition: "filter 0.3s ease",
                            }}
                        >
                            <i
                                className="ti ti-book"
                                style={{
                                    color: "var(--bs-primary)",
                                    transform: "scale(1)",
                                    transition: "transform 0.3s ease",
                                }}
                            />
                        </span>

                        {/* Text with animation */}
                        <span
                            className="pc-mtext"
                            style={{
                                position: "relative",
                                zIndex: 1,
                                color: "var(--bs-primary)",
                                display: "inline-block",
                                transition: "transform 0.3s ease",
                            }}
                        >
                            আরও কোর্স কিনুন
                        </span>

                        {/* Floating NEW badge */}
                        <span
                            style={{
                                position: "absolute",
                                right: "16px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: "var(--bs-primary)",
                                color: "white",
                                fontSize: "10px",
                                fontWeight: "bold",
                                padding: "2px 6px",
                                borderRadius: "10px",
                                animation: "pulse 2s infinite",
                            }}
                        >
                            NEW
                        </span>
                    </a>
                </li>
                {/* <li className="pc-item">
                    <Link
                        href={route("student.course.subject.mehedi")}
                        className="pc-link"
                    >
                        <span className="pc-micon">
                            <i className="ti ti-plus" />
                        </span>
                        <span className="pc-mtext">
                            My Courses
                        </span>
                    </Link>
                </li> */}
                <li className="pc-item">
                    <Link href={route("student.calendar")} className="pc-link">
                        <span className="pc-micon">
                            <i className="ti ti-calendar" />
                        </span>
                        <span className="pc-mtext">ক্যালেন্ডার</span>
                    </Link>
                </li>
                <li className="pc-item">
                    <Link
                        href={route("student.invoice.list")}
                        className="pc-link"
                    >
                        <span className="pc-micon">
                            <i className="ti ti-receipt" />
                        </span>
                        <span className="pc-mtext">অর্ডারসমূহ</span>
                    </Link>
                </li>
                <li className="pc-item pc-caption">
                    <label>ম্যাটেরিয়াল</label>
                </li>
                <li className="pc-item">
                    <a
                        href="https://doubt.ft.education"
                        className="pc-link"
                        target="_blank"
                    >
                        <span className="pc-micon">
                            <i className="ti ti-help" />
                        </span>
                        <span className="pc-mtext">ডাউট সলভ</span>
                    </a>
                </li>

                <li className="pc-item">
                    <a
                        href="https://exam.ft.education"
                        className="pc-link"
                        target="_blank"
                    >
                        <span className="pc-micon">
                            <i className="ti ti-notebook" />
                        </span>
                        <span className="pc-mtext">এক্সাম সাইট</span>
                    </a>
                </li>
            </ul>
        </>
    );
}

export default StudentNavLinks;
