const ParticipationModal = ({ show, onHide, exam, onConfirm }) => {
  if (!show || !exam) return null

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block font-baloo" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">{exam.name}</h5>
              <button type="button" className="btn-close" onClick={onHide}></button>
            </div>
            <div className="modal-body text-center py-4">
              <div className="mb-4">
                <div
                  className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <span className="fs-1">🔴</span>
                </div>
                <h4 className="fw-bold text-dark mb-2">পরীক্ষা চলমান!</h4>
                <p className="text-muted mb-0">আপনি কি অংশগ্রহণ করতে চান?</p>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <button className="btn btn-outline-secondary w-100 py-2" onClick={onHide}>
                    পরে
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-success w-100 py-2 fw-semibold"
                    onClick={() => onConfirm(exam)}
                  >
                    হ্যাঁ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParticipationModal
