import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "ziggy-js";
import useAuthRoles from "../helper/Helper";
import "./navbar.css";
import StudentNavLinks from "./Student/PageHeader/StudentsNavLinks";
import AdminNavLinks from "./Admin/AdminNavLinks";

function Navbar() {
    // auth roles
    const { isStudent, isModerator, isAdmin } = useAuthRoles();

    // get logged in users info
    const { auth } = usePage().props;
    const name = auth?.user?.name;
    const email = auth?.user?.email;
    const role = auth?.user?.role;

    const routes = {
        admin: "admin.profile",
        // moderator: "moderator.profile",
    };
    let profileRoute = routes[role] || "student.profile";
    // use ziggy routes
    const route = useRoute();

    const [isSideBarActive, setIsSideBarActive] = useState(false);
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
    const sidebarRef = useRef(null);

    const resetStatesExcept = (currentState, currentStateSetter) => {
        setIsSideBarActive(false);
        currentStateSetter(!currentState);
    };

    // handle sidebar toggle for mobile
    const handleSideBarToggle = (event) => {
        event.preventDefault();
        resetStatesExcept(isSideBarActive, setIsSideBarActive);
    };

    // handle desktop sidebar collapse
    const handleDesktopCollapse = (event) => {
        event.preventDefault();
        setIsDesktopCollapsed(!isDesktopCollapsed);
    };

    // close all dropdowns and popups when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!sidebarRef.current?.contains(event.target)) {
                setIsSideBarActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Add effect to manage body class for desktop collapse
    useEffect(() => {
        if (isDesktopCollapsed) {
            document.body.classList.add("pc-sidebar-hide");
        } else {
            document.body.classList.remove("pc-sidebar-hide");
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove("pc-sidebar-hide");
        };
    }, [isDesktopCollapsed]);

    return (
        <>
            <nav
                className={`pc-sidebar ${
                    isSideBarActive ? "mob-sidebar-active" : ""
                } ${isDesktopCollapsed ? "pc-sidebar-hide" : ""}`}
                ref={sidebarRef}
            >
                <div
                    className="navbar-wrapper"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="m-header ">
                        <Link
                            href={route("dashboard")}
                            className="b-brand text-primary "
                        >
                            <img
                                src="/assets/images/logo/ftlogo.png"
                                className="img-fluid"
                                alt="logo"
                            />
                        </Link>
                        {isSideBarActive && (
                            <div
                                className="flex justify-end items-center"
                                style={{
                                    position: "absolute",
                                    top: "10",
                                    right: "0",
                                    height: "100%",
                                    padding: "10px",
                                    marginTop: "30px",
                                    zIndex: 1000,
                                }}
                            >
                                <a href="#" onClick={handleSideBarToggle}>
                                    <i className="ti ti-x text-2xl leading-none" />
                                </a>
                            </div>
                        )}
                    </div>
                    <div className="navbar-content">
                        <div className="card pc-user-card">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            src="/assets/images/user/avatar-1.png"
                                            alt="Fahads Tutorial | User Image"
                                            className="user-avtar wid-45 rounded-circle"
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-3 me-2">
                                        <h6 className="h6 font-semibold mb-0">
                                            {name}
                                        </h6>
                                        <small className="h6 font-normal">
                                            {role}
                                            {role === "student" && (
                                                <span className="ms-1">
                                                    ID: {auth?.user?.id}
                                                </span>
                                            )}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="navbar-content">
                            <ul className="pc-navbar">
                                {isStudent() && <StudentNavLinks />}
                                {isAdmin() && <AdminNavLinks />}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="pc-header">
                <div className="header-wrapper">
                    <div className="me-auto pc-mob-drp">
                        <ul className="list-unstyled">
                            {/* ======= Menu collapse Icon for Desktop ===== */}
                            <li className="pc-h-item pc-sidebar-collapse">
                                <a
                                    href="#"
                                    className="pc-head-link ms-0"
                                    id="sidebar-hide"
                                    onClick={handleDesktopCollapse}
                                >
                                    <i className="ti ti-menu-2 ms-2" />
                                </a>
                            </li>
                            {/* ======= Menu collapse Icon for Mobile ===== */}
                            <li className="pc-h-item pc-sidebar-popup">
                                <a
                                    href="#"
                                    className="pc-head-link ms-0"
                                    id="mobile-collapse"
                                    onClick={handleSideBarToggle}
                                >
                                    <i className="ti ti-menu-2" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* [Mobile Media Block end] */}
                    <div className="ms-auto">
                        <ul className="list-unstyled">
                            <li className="dropdown pc-h-item header-user-profile me-3">
                                <a
                                    className="pc-head-link dropdown-toggle arrow-none me-0"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-haspopup="false"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="/assets/images/user/avatar-1.png"
                                        alt="Fahads Tutorial | User Image"
                                        className="user-avtar"
                                    />
                                </a>
                                <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown font-baloo">
                                    <div className="dropdown-header d-flex align-items-center justify-content-between">
                                        <h3 className="m-0">Profile</h3>
                                    </div>
                                    <div className="dropdown-body">
                                        <div
                                            className="profile-notification-scroll position-relative"
                                            style={{
                                                maxHeight:
                                                    "calc(100vh - 225px)",
                                            }}
                                        >
                                            <Link
                                                // href={route(profileRoute)}
                                                className="card-body d-flex gap-3 p-2 mb-3"
                                            >
                                                <svg className="pc-icon text-muted">
                                                    <use xlinkHref="#custom-user" />
                                                </svg>
                                                <span>Profile Update</span>
                                            </Link>

                                            <hr className="border-secondary border-opacity-50 mb-4" />
                                            <div className="d-grid mb-3">
                                                <button
                                                    className="btn btn-light text-white font-weight-bold w-100 d-flex align-items-center justify-content-center"
                                                    style={{
                                                        backgroundColor:
                                                            "#FF8016",
                                                    }}
                                                    onClick={() =>
                                                        (window.location.href =
                                                            "/logout")
                                                    }
                                                >
                                                    <svg className="pc-icon me-2">
                                                        <use xlinkHref="#custom-logout-1-outline" />
                                                    </svg>
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
