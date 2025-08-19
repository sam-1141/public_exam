import LiveExamCard from "./LiveExamCard";

const LiveExamSection = ({ exams, onExamClick }) => {
  return (
    <div className="mb-5">
      <div className="justify-content-center mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h3 className="fw-bold text-dark mb-1">চলমান পরীক্ষাসমূহ</h3>
              <p className="text-muted mb-0">এখনই অংশগ্রহণ করুন এবং আপনার দক্ষতা যাচাই করুন</p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge bg-success me-2">🔴</span>
              <span className="small text-muted">{exams.length} টি লাইভ</span>
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
            <div className="alert alert-info">বর্তমানে কোনো লাইভ পরীক্ষা চলমান নেই</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveExamSection;