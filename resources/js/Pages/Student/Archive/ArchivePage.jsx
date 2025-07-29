import React from 'react';
import Layout from "../../../layouts/Layout"

const ArchivePage = () => {
    return (
        <div>
            <h2>This is archive page</h2>
        </div>
    );
};

ArchivePage.layout = (page) => <Layout children={page} />;
export default ArchivePage;