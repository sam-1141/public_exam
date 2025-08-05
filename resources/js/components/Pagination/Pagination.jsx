import React from "react";

const Pagination = ({
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    onPageChange,
}) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than or equal to maxVisiblePages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show pages around current page
            if (currentPage <= 3) {
                // Show first 5 pages
                for (let i = 1; i <= maxVisiblePages; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Show last 5 pages
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (
                    let i = totalPages - (maxVisiblePages - 1);
                    i <= totalPages;
                    i++
                ) {
                    pageNumbers.push(i);
                }
            } else {
                // Show pages around current page
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers.map((number, index) => {
            if (number === "...") {
                return (
                    <span key={index} className="px-2 py-1">
                        {number}
                    </span>
                );
            }
            return (
                <button
                    key={index}
                    className={`btn btn-sm px-3 py-1 mx-1 ${
                        currentPage === number
                            ? "btn-primary"
                            : "btn-outline-primary"
                    }`}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </button>
            );
        });
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
                Showing <strong>{startItem}</strong> to{" "}
                <strong>{endItem}</strong> of <strong>{totalItems}</strong>{" "}
                entries
            </div>
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-sm btn-outline-primary px-3 py-1 mx-1"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {renderPageNumbers()}
                <button
                    className="btn btn-sm btn-outline-primary px-3 py-1 mx-1"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
