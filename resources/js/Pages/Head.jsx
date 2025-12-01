import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { usePage } from "@inertiajs/react";
import logo from "../../../public/assets/images/logo/logo.webp"; // adjust path as needed

const Head = ({ promptEvent, isAppInstalled, installApp }) => {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <Menu
            stackable
            style={{
                backgroundColor: "#174267",
                color: "white",
                height: "80px",
                padding: "0 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // <-- this ensures left and right separation
            }}
        >
            {/* Logo on the left */}
            <Menu.Item header style={{ padding: 0 }}>
                <a
                    href="https://ft.education/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={logo}
                        alt="App Logo"
                        style={{
                            height: "60px",
                            objectFit: "contain",
                        }}
                    />
                </a>
            </Menu.Item>

            {/* Right side: Avatar + Welcome + Install button + Logout */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {/* Avatar + Welcome */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "#c7d2fe",
                            color: "#3730a3",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "600",
                        }}
                    >
                        {user?.name?.charAt(0) || "U"}
                    </div>
                    <div style={{ color: "white", fontWeight: "500" }}>
                        Welcome,{" "}
                        <span style={{ fontWeight: "700" }}>
                            {user?.name || "User"}
                        </span>
                    </div>
                </div>

                {/* Install App Button */}
                {promptEvent && !isAppInstalled && (
                    <Button
                        color="teal"
                        icon="download"
                        labelPosition="left"
                        content="Install App"
                        onClick={installApp}
                    />
                )}

                {/* Logout Button */}
                <Button
                    color="red"
                    basic
                    compact
                    content="Logout"
                    style={{ marginLeft: "0.5rem" }}
                    onClick={() =>
                        (window.location.href = route("auth.logout"))
                    }
                />
            </div>
        </Menu>
    );
};

export default Head;
