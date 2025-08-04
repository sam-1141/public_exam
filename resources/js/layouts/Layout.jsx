import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Secure from "../helper/Secure";

function Layout({ children }) {
    return (
        <main className="pc-layout ">
            {/* <Secure /> */}
            <Navbar />
            <div className="pc-container ">
                <div className="pc-content">{children}</div>
            </div>
        </main>
    );
}

export default Layout;
