import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { route } from "ziggy-js";
// import "./admin.css";
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  GraduationCap,
  FilePlus,
  BookOpenCheck,
  Library,
  Trophy,
  CalendarClock ,
  ClipboardCheck,
  ClipboardPlus,
  History,
  ChevronDown ,
    ChevronUp
} from "lucide-react";

function StudentNavLinks() {
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
                    <section className="font-baloo">
                        <li className="pc-item">
                            <Link
                                href={route("dashboard")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <LayoutDashboard size={18}/>
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
                                href={route("student.live.exam.list")}
                                className="pc-link"
                            >
                                <span className="pc-micon">
                                    <CalendarClock size={18}/>
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
                                    <ClipboardCheck size={18}/>
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
                                    <Trophy size={18}/>
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
                                    <History size={18}/>
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

export default StudentNavLinks;
