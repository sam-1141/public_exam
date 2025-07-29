import React from 'react';
import Layout from "../../../layouts/Layout"

const LiveExamPage = () => {
    return (
        <div>
            <h2>This is Live exam page</h2>
        </div>
    );
};

LiveExamPage.layout = (page) => <Layout children={page} />;
export default LiveExamPage;