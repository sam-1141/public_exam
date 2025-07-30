import { Link } from "@inertiajs/react";
import React from "react";
import Layout from "../../../layouts/Layout";

function AdminDashboard() {
    return (
        <>
            <>
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-6 col-sm-8 col-10 d-flex justify-content-center">
                        <div
                            className="card text-center"
                            style={{ width: "100%", height: "8rem" }}
                        >
                            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                <p className="mb-2">Total Question Entry</p>
                                <h4 className="mb-0">2,450</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-8 col-10 d-flex justify-content-center">
                        <div
                            className="card text-center"
                            style={{ width: "100%", height: "8rem" }}
                        >
                            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                <p className="mb-2">Today's Entry</p>
                                <h4 className="mb-0">2,450</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

AdminDashboard.layout = (page) => <Layout children={page} />;
export default AdminDashboard;
