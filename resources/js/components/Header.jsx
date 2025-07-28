import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";

function Header() {
    return (
        <header className="pc-header">
            <div className="header-wrapper">
                {/* [Mobile Media Block] start */}
                <div className="me-auto pc-mob-drp">
                    <ul className="list-unstyled">
                        {/* ======= Menu collapse Icon ===== */}
                        <li className="pc-h-item pc-sidebar-collapse">
                            <a
                                href="#"
                                className="pc-head-link ms-0"
                                id="sidebar-hide"
                            >
                                <i className="ti ti-menu-2" />
                            </a>
                        </li>
                        <li className="pc-h-item pc-sidebar-popup">
                            <a
                                href="#"
                                className="pc-head-link ms-0"
                                id="mobile-collapse"
                            >
                                <i className="ti ti-menu-2" />
                            </a>
                        </li>
                    </ul>
                </div>
                {/* [Mobile Media Block end] */}
                <div className="ms-auto">
                    <ul className="list-unstyled">
                        {/* Announcement Section */}
                        {/* <li class="pc-h-item">
<a href="#" class="pc-head-link me-0" data-bs-toggle="offcanvas" data-bs-target="#announcement" aria-controls="announcement">
<svg class="pc-icon">
<use xlink:href="#custom-flash"></use>
</svg>
</a>
</li> */}
                        {/* <li class="dropdown pc-h-item">
<a
class="pc-head-link dropdown-toggle arrow-none me-0"
data-bs-toggle="dropdown"
href="#"
role="button"
aria-haspopup="false"
aria-expanded="false"
>
<svg class="pc-icon">
<use xlink:href="#custom-notification"></use>
</svg>
<span class="badge bg-success pc-h-badge">3</span>
</a>
<div class="dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown">
<div class="dropdown-header d-flex align-items-center justify-content-between">
<h5 class="m-0">Notifications</h5>
<a href="#!" class="btn btn-link btn-sm">Mark all read</a>
</div>
<div class="dropdown-body text-wrap header-notification-scroll position-relative" style="max-height: calc(100vh - 215px)">
<p class="text-span">Today</p>
<div class="card mb-2">
<div class="card-body">
<div class="d-flex">
<div class="flex-shrink-0">
<svg class="pc-icon text-primary">
  <use xlink:href="#custom-layer"></use>
</svg>
</div>
<div class="flex-grow-1 ms-3">
<span class="float-end text-sm text-muted">2 min ago</span>
<h5 class="text-body mb-2">UI/UX Design</h5>
<p class="mb-0"
  >Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
  type and scrambled it to make a type</p
>
</div>
</div>
</div>
</div>
<div class="card mb-2">
<div class="card-body">
<div class="d-flex">
<div class="flex-shrink-0">
<svg class="pc-icon text-primary">
  <use xlink:href="#custom-user-bold"></use>
</svg>
</div>
<div class="flex-grow-1 ms-3">
<span class="float-end text-sm text-muted">12 hour ago</span>
<h5 class="text-body mb-2">Challenge invitation</h5>
<p class="mb-2"><span class="text-dark">Jonny aber</span> invites to join the challenge</p>
<button class="btn btn-sm btn-outline-secondary me-2">Decline</button>
<button class="btn btn-sm btn-primary">Accept</button>
</div>
</div>
</div>
</div>
</div>
<div class="text-center py-2">
<a href="#!" class="link-danger">Clear all Notifications</a>
</div>
</div>
</li> */}
                        <li className="dropdown pc-h-item header-user-profile">
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
                                    alt="user-image"
                                    className="user-avtar"
                                />
                            </a>
                            <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                                <div className="dropdown-header d-flex align-items-center justify-content-between">
                                    <h5 className="m-0">Profile</h5>
                                </div>
                                <div className="dropdown-body">
                                    <div
                                        className="profile-notification-scroll position-relative"
                                        style={{
                                            maxHeight: "calc(100vh - 225px)",
                                        }}
                                    >
                                        <div className="d-flex mb-1">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src="/assets/images/user/avatar-1.png"
                                                    alt="user-image"
                                                    className="user-avtar wid-35"
                                                />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">
                                                    Ahmmed Imtiaz 🖖
                                                </h6>
                                                <span>
                                                    hello@ahmmedimtiaz.com
                                                </span>
                                            </div>
                                        </div>
                                        <hr className="border-secondary border-opacity-50" />
                                        <p className="text-span">Manage</p>
                                        <a href="#" className="dropdown-item">
                                            <span>
                                                <svg className="pc-icon text-muted me-2">
                                                    <use xlinkHref="#custom-user" />
                                                </svg>
                                                <span>Profile</span>
                                            </span>
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            <span>
                                                <svg className="pc-icon text-muted me-2">
                                                    <use xlinkHref="#custom-lock-outline" />
                                                </svg>
                                                <span>Change Password</span>
                                            </span>
                                        </a>
                                        <hr className="border-secondary border-opacity-50" />
                                        <div className="d-grid mb-3">
                                            <Link
                                                href={route("auth.logout")}
                                                className="btn btn-primary"
                                            >
                                                <svg className="pc-icon me-2">
                                                    <use xlinkHref="#custom-logout-1-outline" />
                                                </svg>
                                                Logout
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
