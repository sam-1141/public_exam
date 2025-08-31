import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";
import "./admin.css";
import {
    LayoutDashboard,
    FilePlus,
    BookOpenCheck,
    Library,
    Trophy,
    ClipboardPlus,
    ClipboardList,
} from "lucide-react";

function AdminNavLinks() {
    return (
        <>
            <ul className="pc-navbar pb-3">
                <li className="pc-item">
                    {/* Admin */}

                    <li className="pc-item pc-caption">
                        <label data-i18n="Navigation">Pages</label>
                    </li>

                    <li className="pc-item">
                        <Link href={route("dashboard")} className="pc-link">
                            <span className="pc-micon">
                                <LayoutDashboard size={18} />
                            </span>
                            <span className="pc-mtext" data-i18n="Dashboard">
                                Dashboard
                            </span>
                        </Link>
                    </li>

                    {/* Existing Pages Links */}
                    <li className="pc-item">
                        <Link href={route("add.questions")} className="pc-link">
                            <span className="pc-micon">
                                <FilePlus size={18} />
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
                                <ClipboardPlus size={18} />
                            </span>
                            <span className="pc-mtext" data-i18n="Add Question">
                                Add Exam
                            </span>
                        </Link>
                    </li>
                    <li className="pc-item">
                        <Link href={route("mcq.bank")} className="pc-link">
                            <span className="pc-micon">
                                <BookOpenCheck size={18} />
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
                                <Library size={18} />
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
                                <Trophy size={18} />
                            </span>
                            <span
                                className="pc-mtext"
                                data-i18n="Question Bank"
                            >
                                Leaderboard
                            </span>
                        </Link>
                    </li>
                    <li className="pc-item">
                        <Link
                            href={route("admin.exam.results")}
                            className="pc-link"
                        >
                            <span className="pc-micon">
                                <ClipboardList size={18} />
                            </span>
                            <span
                                className="pc-mtext"
                                data-i18n="Question Bank"
                            >
                                Exam Results
                            </span>
                        </Link>
                    </li>
                </li>
            </ul>
        </>
    );
}

export default AdminNavLinks;
