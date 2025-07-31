import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";
import "./admin.css";

function AdminNavLinks() {
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
                    <>
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
                                <span
                                    className="pc-mtext"
                                    data-i18n="Dashboard"
                                >
                                    Dashboard
                                </span>
                            </Link>
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
                            <Link
                                href={route("admin.add.exam")}
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
                                    Add Exam
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
                    </>
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
                                href={route("student.live.exam")}
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
