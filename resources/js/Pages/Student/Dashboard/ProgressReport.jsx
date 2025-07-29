"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const ProgressReport = () => {
  const [expandedSubjects, setExpandedSubjects] = useState({})

  const subjects = [
    {
      name: "পদার্থবিজ্ঞান",
      progress: 0,
      details: { correct: 8, wrong: 41, skip: 76 },
    },
    {
      name: "রসায়ন",
      progress: 0,
      details: { correct: 12, wrong: 35, skip: 53 },
    },
    {
      name: "উচ্চতর গণিত",
      progress: 0,
      details: { correct: 15, wrong: 28, skip: 57 },
    },
    {
      name: "জীববিজ্ঞান",
      progress: 0,
      details: { correct: 8, wrong: 41, skip: 76 },
     // expanded: true,
    },
    {
      name: "বাংলা",
      progress: 0,
      details: { correct: 20, wrong: 30, skip: 50 },
    },
    {
      name: "English",
      progress: 0,
      details: { correct: 18, wrong: 32, skip: 50 },
    },
  ]

  const toggleSubject = (index) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="card h-100">
      <div className="card-header bg-white border-0 pb-0">
        <h5 className="card-title mb-0">প্রোগ্রেস রিপোর্ট</h5>
      </div>
      <div className="card-body">
        {subjects.map((subject, index) => (
          <div key={index} className="mb-3">
            <div
              className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3"
              onClick={() => toggleSubject(index)}
              role="button"
            >
              <span className="fw-medium">{subject.name}</span>
              <div className="d-flex align-items-center">
                <span className="text-success me-2">{subject.progress}%</span>
                {expandedSubjects[index] || subject.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>

            {(expandedSubjects[index] || subject.expanded) && (
              <div className="mt-2 p-3 bg-white border rounded-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <div className="bg-success rounded-circle me-2" style={{ width: "8px", height: "8px" }}></div>
                    <span className="small">{subject.details.correct} সঠিক</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-danger rounded-circle me-2" style={{ width: "8px", height: "8px" }}></div>
                    <span className="small">{subject.details.wrong} ভুল</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-warning rounded-circle me-2" style={{ width: "8px", height: "8px" }}></div>
                    <span className="small">{subject.details.skip} স্কিপ</span>
                  </div>
                </div>
                <div className="progress mb-2" style={{ height: "4px" }}>
                  <div className="progress-bar bg-success w-25"></div>
                </div>
                <div className="text-center">
                  <button className="btn btn-link btn-sm text-decoration-none p-0">বিস্তারিত রিপোর্ট দেখুন →</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressReport
