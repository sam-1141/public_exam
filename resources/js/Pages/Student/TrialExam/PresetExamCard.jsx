"use client"

const PresetExamCard = ({ examName, onClick }) => {
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-3">
      <button className="btn btn-outline-secondary w-100 p-3 rounded-3 text-dark fw-medium" onClick={onClick}>
        {examName}
      </button>
    </div>
  )
}

export default PresetExamCard
