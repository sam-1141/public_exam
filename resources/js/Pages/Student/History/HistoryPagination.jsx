const HistoryPagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
      <div className="small text-muted">
        দেখানো হচ্ছে {startItem}-{endItem} এর মধ্যে {totalItems} টি তারিখ
      </div>

      <nav aria-label="History pagination">
        <ul className="pagination pagination-sm mb-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
              পূর্ববর্তী
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                  <button className="page-link" onClick={() => onPageChange(page)}>
                    {page}
                  </button>
                </li>
              )
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <li key={page} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )
            }
            return null
          })}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              পরবর্তী
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default HistoryPagination
