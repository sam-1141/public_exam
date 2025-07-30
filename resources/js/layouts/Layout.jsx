import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Layout({ children }) {
    return (
        <main className="pc-layout ">
            {/* <Header />
            <Sidebar /> */}
            <Navbar />
            <div className="pc-container ">
                <div className="pc-content">{children}</div>
            </div>
        </main>
    );
}

export default Layout;
