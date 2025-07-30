import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import TagSection from "../../components/ManageMaterial/TagSection";
import HardnessSection from "../../components/ManageMaterial/HardnessSection";
import TopicSection from "../../components/ManageMaterial/TopicSection";
import { toast, ToastContainer } from "react-toastify";

function ManageMaterials({
    flash,
    errors,
    tags,
    hardness,
    topics,
    classes,
    subjects,
    chapters,
}) {
    useEffect(() => {
        // Show warning message
        if (flash.warning) {
            toast.warn(flash.warning);
            flash.warning = null;
        }

        // show success message
        if (flash.success) {
            toast.success(flash.success);
            flash.success = null;
        }

        // Show error message
        if (flash.error) {
            toast.error(flash.error);
            flash.error = null;
        }

        if (errors) {
            Object.values(errors).forEach((error) => {
                toast.error(error);
            });
            errors = null;
        }
    }, [flash, errors]);

    return (
        <>
            <ToastContainer />
            <div className="row">
                {/* [ sample-page ] start */}
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body py-0">
                            <ul
                                className="nav nav-tabs profile-tabs"
                                id="myTab"
                                role="tablist"
                            >
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        id="tag-1"
                                        data-bs-toggle="tab"
                                        href="#tag"
                                        role="tab"
                                        aria-selected="true"
                                    >
                                        <i className="ti ti-user me-2" />
                                        Add Tags
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        id="hardness-1"
                                        data-bs-toggle="tab"
                                        href="#hardness"
                                        role="tab"
                                        aria-selected="true"
                                    >
                                        <i className="ti ti-user me-2" />
                                        Add Hardness
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        id="topic-1"
                                        data-bs-toggle="tab"
                                        href="#topic"
                                        role="tab"
                                        aria-selected="true"
                                    >
                                        <i className="ti ti-file-text me-2" />
                                        Add Topics
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div
                            className="tab-pane show active"
                            id="tag"
                            role="tabpanel"
                            aria-labelledby="tag-1"
                        >
                            <TagSection tags={tags} />
                        </div>
                        <div
                            className="tab-pane"
                            id="hardness"
                            role="tabpanel"
                            aria-labelledby="hardness-1"
                        >
                            <HardnessSection hardness={hardness} />
                        </div>
                        <div
                            className="tab-pane"
                            id="topic"
                            role="tabpanel"
                            aria-labelledby="topic-1"
                        >
                            <TopicSection
                                topics={topics}
                                classes={classes}
                                subjects={subjects}
                                chapters={chapters}
                            />
                        </div>
                    </div>
                </div>
                {/* [ sample-page ] end */}
            </div>
        </>
    );
}

ManageMaterials.layout = (page) => <Layout children={page} />;
export default ManageMaterials;
