import LiveExamCard from "./LiveExamCard";

const UpcomingExamSection = ({ exams, onExamClick }) => {
  return (
    <div>
      <div className="justify-content-center mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h3 className="fw-bold text-dark mb-1">আসন্ন পরীক্ষাসমূহ</h3>
              <p className="text-muted mb-0">আপনার পরীক্ষার জন্য প্রস্তুত হোন</p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge bg-warning me-2">⏰</span>
              <span className="small text-muted">{exams.length} টি আসন্ন</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="col-12">
          {exams.length > 0 ? (
            <div className="row">
              {exams.map((exam) => (
                <LiveExamCard key={exam.id} exam={exam} onClick={onExamClick} />
              ))}
            </div>
          ) : (
            <div className="alert alert-info">বর্তমানে কোনো আসন্ন পরীক্ষা নেই</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingExamSection;