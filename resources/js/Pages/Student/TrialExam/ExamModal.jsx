import { useState, useEffect } from "react"

const ExamModal = ({ show, onHide, examData }) => {
  const [selectedSubjects, setSelectedSubjects] = useState([])

  useEffect(() => {
    if (show) {
      setSelectedSubjects([])
    }
  }, [show])

  if (!show || !examData) return null

  const handleSubjectToggle = (subjectId) => {
    if (examData.maxSelection) {
      setSelectedSubjects((prev) => {
        if (prev.includes(subjectId)) {
          return prev.filter((id) => id !== subjectId)
        } else if (prev.length < examData.maxSelection) {
          return [...prev, subjectId]
        }
        return prev
      })
    }
  }

  const isSubjectDisabled = (subjectId) => {
    return (
      examData.maxSelection && !selectedSubjects.includes(subjectId) && selectedSubjects.length >= examData.maxSelection
    )
  }

  const canStartExam = !examData.maxSelection || selectedSubjects.length === examData.maxSelection

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">{examData.title}</h5>
              <button type="button" className="btn-close" onClick={onHide}></button>
            </div>
            <div className="modal-body">
              {/* Subject Distribution */}
              <div className="mb-4">
                {examData.subjects.map((subject, index) => (
                  <div key={index} className="mb-2">
                    <span className="text-dark">
                      {subject.name} - {subject.questions}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subject Selection */}
              {examData.maxSelection && (
                <div className="mb-4">
                  <div className="mb-3">
                    <span className="fw-medium">ইচ্ছুক - যে কোন {examData.maxSelection} টি</span>
                  </div>
                  {examData.selectableSubjects.map((subject, index) => (
                    <div key={index} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`subject-${index}`}
                        checked={selectedSubjects.includes(subject.id)}
                        onChange={() => handleSubjectToggle(subject.id)}
                        disabled={isSubjectDisabled(subject.id)}
                      />
                      <label className="form-check-label" htmlFor={`subject-${index}`}>
                        {subject.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Time */}
              <div className="mb-4">
                <div className="fw-medium mb-1">সময়</div>
                <div>{examData.duration} মিনিট</div>
              </div>

              {/* Start Button */}
              <button
                className={`btn w-100 py-3 fw-semibold ${canStartExam ? "btn-success" : "btn-secondary"}`}
                disabled={!canStartExam}
              >
                পরীক্ষা শুরু করো
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExamModal
