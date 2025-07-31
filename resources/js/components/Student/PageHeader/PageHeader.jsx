const PageHeader = ({ title, streak = 0 }) => {
  return (
    <header className="bg-light p-3 border-bottom">
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="mb-0 fw-bold text-dark">{title}</h4>
        {/* <div className="d-flex align-items-center">
          <div className="bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-pill px-3 py-1 d-flex align-items-center">
            <span className="text-danger me-1">🔥</span>
            <span className="fw-semibold text-dark">{streak}</span>
          </div>
        </div> */}
      </div>
    </header>
  )
}

export default PageHeader
