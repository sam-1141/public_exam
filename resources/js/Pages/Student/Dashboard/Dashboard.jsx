import Layout from "../../../layouts/Layout"
import {
  ClipboardList,
  Clock,
  CalendarCheck,
  CalendarX,
  PlayCircle,
  ListTodo
} from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color, progress, children }) => (
  <div className="card h-100 border-0 shadow-sm">
    <div className="card-body text-center">
      <div className="d-flex align-items-center mb-3">
        <div className={`bg-${color}-subtle p-3 rounded-circle me-3`}>
          <Icon size={24} className={`text-${color}`} />
        </div>
        <div className="text-start">
          <h5 className="card-title mb-0">{title}</h5>
          <h2 className="fw-bold">{value}</h2>
        </div>
      </div>
      {progress && (
        <div className="progress rounded-pill" style={{ height: '8px' }}>
          <div
            className={`progress-bar bg-${color}`}
            role="progressbar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {children}
    </div>
  </div>
);

const Dashboard = ({ totalExam, totalAttended, runningExams, upcomingExams }) => {
  const attendanceRate = Math.round((totalAttended / totalExam) * 100);

  return (
    <div className="container py-4 font-baloo">
      <h2 className="mb-4 fw-bold">ড্যাশবোর্ড</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-4">
          <StatCard
            icon={ClipboardList}
            title="মোট পরীক্ষা"
            value={totalExam}
            color="primary"
            progress={100}
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <StatCard
            icon={CalendarCheck}
            title="পরীক্ষায় অংশগ্রহণ"
            value={totalAttended}
            color="success"
            progress={attendanceRate}
          >
            <small className="text-muted">{attendanceRate}% attendance rate</small>
          </StatCard>
        </div>

        <div className="col-md-6 col-lg-4">
          <StatCard
            icon={CalendarX}
            title="পরীক্ষা মিস"
            value={totalExam - totalAttended}
            color="danger"
            progress={100 - attendanceRate}
          />
        </div>

        <div className="col-md-6 col-lg-6">
          <StatCard
            icon={PlayCircle}
            title="চলমান পরীক্ষা"
            value={runningExams}
            color="warning"
          >
            <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1 fs-6">
              <Clock size={16}/> এখনই অংশগ্রহণ করুন
            </span>
          </StatCard>
        </div>

        <div className="col-md-6 col-lg-6">
          <StatCard
            icon={Clock}
            title="আসন্ন পরীক্ষা"
            value={upcomingExams}
            color="info"
          >
            <span className="badge bg-info-subtle text-info px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1 fs-6">
              <ListTodo size={16} /> প্রস্তুতি নিন
            </span>

          </StatCard>
        </div>
      </div>
    </div>
  );
};

Dashboard.layout = (page) => <Layout children={page} />;
export default Dashboard;
