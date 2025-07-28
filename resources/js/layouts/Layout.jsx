import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Layout({ children }) {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="pc-container">
                <div className="pc-content">{children}</div>
            </div>
        </>
    );
}

export default Layout;
