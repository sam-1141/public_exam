import { useState } from 'react';
import Layout from "../../../layouts/Layout"
import { 
  ClipboardList, 
  Clock, 
  CalendarCheck, 
  CalendarX, 
  PlayCircle,
  Award,
  AlertTriangle
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

const ActivityItem = ({ icon: Icon, title, status, score, color }) => (
  <div className="d-flex align-items-center mb-3">
    <span className={`badge bg-${color}-subtle text-${color} me-3`}>
      <Icon size={16} />
    </span>
    <div>
      <span className="fw-semibold">{title}</span>
      <small className="text-muted ms-2">{status} {score && `| ${score}%`}</small>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats] = useState({
    totalHeld: 24,
    totalAttended: 18,
    totalMissed: 6,
    runningExams: 3,
    upcomingExams: 5
  });

  const attendanceRate = Math.round((stats.totalAttended / stats.totalHeld) * 100);

  return (
    <div className="container py-4 font-baloo">
      <h2 className="mb-4 fw-bold">ড্যাশবোর্ড</h2>
      
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-4">
          <StatCard 
            icon={ClipboardList} 
            title="মোট পরীক্ষা" 
            value={stats.totalHeld} 
            color="primary"
            progress={100}
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <StatCard 
            icon={CalendarCheck} 
            title="পরীক্ষায় অংশগ্রহণ" 
            value={stats.totalAttended} 
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
            value={stats.totalMissed} 
            color="danger"
            progress={(stats.totalMissed/stats.totalHeld)*100}
          />
        </div>

        <div className="col-md-6 col-lg-6">
          <StatCard 
            icon={PlayCircle} 
            title="চলমান পরীক্ষা" 
            value={stats.runningExams} 
            color="warning"
          >
            <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill">
              <Clock size={16} className="me-1" /> এখনই অংশগ্রহণ করুন
            </span>
          </StatCard>
        </div>

        <div className="col-md-6 col-lg-6">
          <StatCard 
            icon={Clock} 
            title="আসন্ন পরীক্ষা" 
            value={stats.upcomingExams} 
            color="info"
          >
            <span className="badge bg-info-subtle text-info px-3 py-2 rounded-pill">
              প্রস্তুতি নিন
            </span>
          </StatCard>
        </div>
      </div>
    </div>
  );
};

Dashboard.layout = (page) => <Layout children={page} />;
export default Dashboard;
