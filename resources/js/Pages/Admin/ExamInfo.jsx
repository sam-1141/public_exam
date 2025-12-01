import React from "react";
import { usePage } from "@inertiajs/react";
import './ExamInfo.css'; // import the CSS

export default function ExamInfo() {
  const { exam } = usePage().props;

  if (!exam) {
    return (
      <div className="no-exam">
        ⚠️ No exam information found.
      </div>
    );
  }

  const { exam_description_bn, exam_url } = exam;

  return (
    <div className="exam-container">
      <div className="exam-card">
        <h1 className="exam-header">🎓 Upcoming Exam Information</h1>

        {exam_description_bn ? (
          <div
            className="exam-description"
            dangerouslySetInnerHTML={{ __html: exam_description_bn }}
          ></div>
        ) : (
          <p className="exam-no-description">
            Exam description not available.
          </p>
        )}

        {exam_url && (
          <div style={{ textAlign: 'center' }}>
            <a
              href={exam_url}
              target="_blank"
              rel="noopener noreferrer"
              className="exam-link"
            >
              🔗 Go to Exam Portal
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
