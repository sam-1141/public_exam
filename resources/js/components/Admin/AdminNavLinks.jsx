import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { route } from "ziggy-js";
import "./admin.css";

function AdminNavLinks() {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };
    return (
        <>
            <ul
                className="pc-navbar"
                style={{
                    height: "auto",
                    maxHeight: "none",
                    overflow: "visible",
                    paddingBottom: "20px",
                }}
            >
                <li className="pc-item">
                    {/* Admin */}

                    <li className="pc-item pc-caption">
                        <label data-i18n="Navigation">Pages</label>
                    </li>

                    <li className="pc-item">
                        <Link href={route("dashboard")} className="pc-link">
                            <span className="pc-micon">
                                <i className="material-icons-two-tone">
                                    dashboard
                                </i>
                            </span>
                            <span className="pc-mtext" data-i18n="Dashboard">
                                Dashboard
                            </span>
                        </Link>
                    </li>

                    {/* Admins Dropdown */}
                    <li
                        className={`pc-item pc-hasmenu ${
                            openDropdown === "admin" ? "active" : ""
                        }`}
                    >
                        <a
                            href="#"
                            className="pc-link"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown("admin");
                            }}
                        >
                            <span className="pc-micon">
                                <i className="material-icons-two-tone">
                                    admin_panel_settings
                                </i>
                            </span>
                            <span className="pc-mtext">Admins</span>
                            <span className="pc-arrow">
                                <i className="material-icons-two-tone">
                                    keyboard_arrow_down
                                </i>
                            </span>
                        </a>
                        <ul
                            className="pc-submenu"
                            style={{
                                display:
                                    openDropdown === "admin" ? "block" : "none",
                            }}
                        >
                            <li className="pc-item">
                                <Link href="#" className="pc-link">
                                    <span className="pc-mtext">Add Admin</span>
                                </Link>
                            </li>
                            <li className="pc-item">
                                <Link href="#" className="pc-link">
                                    <span className="pc-mtext">
                                        Manage Admins
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Teachers Dropdown */}
                    <li
                        className={`pc-item pc-hasmenu ${
                            openDropdown === "teacher" ? "active" : ""
                        }`}
                    >
                        <a
                            href="#"
                            className="pc-link"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown("teacher");
                            }}
                        >
                            <span className="pc-micon">
                                <i className="material-icons-two-tone">
                                    people_alt
                                </i>
                            </span>
                            <span className="pc-mtext">Teachers</span>
                            <span className="pc-arrow">
                                <i className="material-icons-two-tone">
                                    keyboard_arrow_down
                                </i>
                            </span>
                        </a>
                        <ul
                            className="pc-submenu"
                            style={{
                                display:
                                    openDropdown === "teacher"
                                        ? "block"
                                        : "none",
                            }}
                        >
                            <li className="pc-item">
                                <Link href="#" className="pc-link">
                                    <span className="pc-mtext">
                                        Add Teacher
                                    </span>
                                </Link>
                            </li>
                            <li className="pc-item">
                                <Link href="#" className="pc-link">
                                    <span className="pc-mtext">
                                        Manage Teachers
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* Students Dropdown */}
                    <li
                        className={`pc-item pc-hasmenu ${
                            openDropdown === "student" ? "active" : ""
                        }`}
                    >
                        <a
                            href="#"
                            className="pc-link"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown("student");
                            }}
                        >
                            <span className="pc-micon">
                                <i className="material-icons-two-tone">
                                    school
                                </i>
                            </span>
                            <span className="pc-mtext">Students</span>
                            <span className="pc-arrow">
                                <i className="material-icons-two-tone">
                                    keyboard_arrow_down
                                </i>
                            </span>
                        </a>
                        <ul
                            className="pc-submenu"
                            style={{
                                display:
                                    openDropdown === "student"
                                        ? "block"
                                        : "none",
                            }}
                        >
                            <li className="pc-item">
                                <Link href="#" className="pc-link">
                                    <span className="pc-mtext">
                                        Add Student
                                    </span>
                                </Link>
                            </li>
                            <li className="pc-item">
                                <Link href="#" className="pc-link">
                                    <span className="pc-mtext">
                                        Manage Students
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Existing Pages Links */}
                    <li className="pc-item">
                        <Link href={route("add.questions")} className="pc-link">
                            <span className="pc-micon">
                                <i className="material-icons-two-tone">
                                    create_new_folder
                                </i>
                            </span>
                            <span className="pc-mtext" data-i18n="Add Question">
                                Add Question
                            </span>
                        </Link>
                    </li>
                    <li className="pc-item">
                        <Link
                            href={route("admin.add.exam")}
                            className="pc-link"
                        >
                            <span className="pc-micon">
                                <i className="material-icons-two-tone">
                                    add_circle_outline
                                </i>
                            </span>
                            <span className="pc-mtext" data-i18n="Add Question">
                                Add Exam
                            </span>
                        </Link>
                    </li>
                    <li className="pc-item">
                        <Link href={route("mcq.bank")} className="pc-link">
                            <span className="pc-micon">
                                <i className="material-icons-two-tone">
                                    question_answer
                                </i>
                            </span>
                            <span
                                className="pc-mtext"
                                data-i18n="Question Bank"
                            >
                                Question Bank
                            </span>
                        </Link>
                    </li>
                    <li className="pc-item">
                        <Link
                            href={route("manage.material")}
                            className="pc-link"
                        >
                            <span className="pc-micon">
                                <i className="material-icons-two-tone">
                                    library_books
                                </i>
                            </span>
                            <span
                                className="pc-mtext"
                                data-i18n="Question Bank"
                            >
                                Manage Material
                            </span>
                        </Link>
                    </li>
                    <li className="pc-item">
                        <Link
                            href={route("admin.leaderboard")}
                            className="pc-link"
                        >
                            <span className="pc-micon">
                                <i className="material-icons-two-tone">
                                    leaderboard
                                </i>
                            </span>
                            <span
                                className="pc-mtext"
                                data-i18n="Question Bank"
                            >
                                Leaderboard
                            </span>
                        </Link>
                    </li>
                    {/* Students */}
                    <li className="pc-item pc-caption">
                        <label data-i18n="Navigation">Student</label>
                    </li>
                    <section className="font-baloo">
                        <li className="pc-item">
                            <Link
                                href={route("student.dashboard")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        dashboard
                                    </i>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Question Bank"
                                >
                                    স্টুডেন্ট ড্যাশবোর্ড
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link
                                href={route("student.live.exam.notice")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        schedule
                                    </i>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Question Bank"
                                >
                                    লাইভ পরীক্ষা
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link
                                href={route("student.practice.exam.list")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        schedule
                                    </i>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Question Bank"
                                >
                                    প্র্যাকটিস পরীক্ষা
                                </span>
                            </Link>
                        </li>
                        {/* <li className="pc-item">
                            <Link
                                href={route("student.trial.exam")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        assignment
                                    </i>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Question Bank"
                                >
                                    ট্রায়াল পরীক্ষা
                                </span>
                            </Link>
                        </li> */}
                        {/* <li className="pc-item">
                            <Link
                                href={route("student.archive.exam")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        archive
                                    </i>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Question Bank"
                                >
                                    আর্কাইভ
                                </span>
                            </Link>
                        </li> */}
                        <li className="pc-item">
                            <Link
                                href={route("student.leaderboard")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        leaderboard
                                    </i>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Question Bank"
                                >
                                    লিডারবোর্ড
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link
                                href={route("student.history")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        history
                                    </i>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Question Bank"
                                >
                                    হিস্ট্রি
                                </span>
                            </Link>
                        </li>
                    </section>
                </li>
            </ul>
        </>
    );
}

export default AdminNavLinks;
