import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";

function Sidebar() {
    return (
        <nav className="pc-sidebar">
            <div className="navbar-wrapper">
                <div className="m-header">
                    <a href="/" className="b-brand text-primary">
                        {/* ========   Change your logo from here   ============ */}
                        <img
                            src="/assets/images/logo/ftlogo.png"
                            className="img-fluid logo-lg"
                            alt="logo"
                        />
                    </a>
                </div>
                <div className="navbar-content">
                    <ul className="pc-navbar">
                        <li className="pc-item pc-caption">
                            <label data-i18n="Navigation">Pages</label>
                        </li>
                        <li className="pc-item">
                            <a href={route("dashboard")} className="pc-link">
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        dashboard
                                    </i>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Dashboard"
                                >
                                    Dashboard
                                </span>
                            </a>
                        </li>
                        <li className="pc-item">
                            <Link
                                href={route("add.questions")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">
                                        create_new_folder
                                    </i>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Add Question"
                                >
                                    Add Question
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link href={route("mcq.bank")} className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-folder-open" />
                                    </svg>
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
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-folder-open" />
                                    </svg>
                                </span>
                                <span
                                    className="pc-mtext"
                                    data-i18n="Question Bank"
                                >
                                    Manage Material
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item pc-caption">
                            <label data-i18n="Navigation">Student</label>
                        </li>
                        <li className="pc-item">
                            <Link href={route("student.dashboard")} className="pc-link">
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">dashboard</i>
                                </span>
                                <span className="pc-mtext" data-i18n="Question Bank">
                                    স্টুডেন্ট ড্যাশবোর্ড
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link href={route("student.live.exam")} className="pc-link">
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">schedule</i>
                                </span>
                                <span className="pc-mtext" data-i18n="Question Bank">
                                    লাইভ পরীক্ষা
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link href={route("student.trial.exam")} className="pc-link">
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">assignment</i>
                                </span>
                                <span className="pc-mtext" data-i18n="Question Bank">
                                    ট্রায়াল পরীক্ষা
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link href={route("student.archive.exam")} className="pc-link">
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">archive</i>
                                </span>
                                <span className="pc-mtext" data-i18n="Question Bank">
                                    আর্কাইভ
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link href={route("student.leaderboard")} className="pc-link">
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">leaderboard</i>
                                </span>
                                <span className="pc-mtext" data-i18n="Question Bank">
                                    লিডারবোর্ড
                                </span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link href={route("student.history")} className="pc-link">
                                <span className="pc-micon">
                                    <i className="material-icons-two-tone">history</i>
                                </span>
                                <span className="pc-mtext" data-i18n="Question Bank">
                                    হিস্ট্রি
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
