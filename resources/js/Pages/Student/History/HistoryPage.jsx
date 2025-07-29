import React from 'react';
import Layout from "../../../layouts/Layout"

const HistoryPage = () => {
    return (
        <div>
           <h2>This is History page</h2> 
        </div>
    );
};

HistoryPage.layout = (page) => <Layout children={page} />;
export default HistoryPage;