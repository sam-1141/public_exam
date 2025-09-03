import { useEffect, useState } from "react"
import Layout from "../../../layouts/Layout"
import "./LeaderBoardPage.css"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"
import axios from "axios"

const LeaderboardPage = ({ examsInfo }) => {
  const [selectedExam, setSelectedExam] = useState("")
  const [leaderboardData, setLeaderboardData] = useState({ data: [], links: [] })
  const [isLoading, setIsLoading] = useState(false)

  const examNames = examsInfo.map(item => ({ name: item.name, slug: item.slug }))

  useEffect(() => {
    if (selectedExam) {
      setIsLoading(true)
      axios
        .get(route("student.leaderboard.list", selectedExam))
        .then(res => {
          setLeaderboardData({
            data: res?.data?.attendanceInfo?.data,
            links: res.data.attendanceInfo.links || []
          })
          setIsLoading(false)
        })
        .catch(err => {
          setLeaderboardData({ data: [], links: [] })
          setIsLoading(false)
        })
    }
  }, [selectedExam])

  const handlePageChange = (url) => {
    if (!url) return;

    setIsLoading(true)
    axios
      .get(url)
      .then(res => {
        setLeaderboardData({
          data: res.data.attendanceInfo.data,
          links: res.data.attendanceInfo.links || []
        })
        setIsLoading(false)
      })
      .catch(err => {
        setLeaderboardData({ data: [], links: [] })
        setIsLoading(false)
      })
  }

  // Helper function to format time spent
  const formatTimeSpent = (ms) => {
    if (!ms || ms <= 0) return "--:--:--";

    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // FilteredData now comes from our processed data
  const filteredData = leaderboardData.data || []

  const handleExamChange = (examSlug) => {
    setSelectedExam(examSlug)
  }

  // Function to get medal emoji based on rank
  const getMedal = (rank) => {
    switch (rank) {
      case 1: return "🥇"
      case 2: return "🥈"
      case 3: return "🥉"
      default: return null
    }
  }

  // Function to get background color based on rank
  const getBackgroundColor = (rank) => {
    switch (rank) {
      case 1: return "bg-gold"
      case 2: return "bg-silver"
      case 3: return "bg-bronze"
      default: return ""
    }
  }

  // Mock user data - replace with actual user data from your application
  const currentUser = {
    name: "নাম",
    image: "/assets/images/user/avatar-1.png",
    institution: "প্রতিষ্ঠানের নাম",
    rank: 5,
    score: 2,
    completionTime: "00:00:45"
  }

  return (
    <div className="flex-grow-1 d-flex flex-column font-baloo">
      {/* Header */}
      <PageHeader
        title="লিডারবোর্ড"
      />

      {/* Main Content */}
      <main className="flex-grow-1 p-1 bg-light">
        <div className="container-fluid">
          {/* Leaderboard Controls */}
          <div className="row mb-3">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="small text-muted">পরীক্ষা:</span>
                  <select
                    className="form-select form-select-sm"
                    value={selectedExam}
                    onChange={(e) => handleExamChange(e.target.value)}
                    style={{ width: "auto" }}
                  >
                    <option value="">পরীক্ষা নির্বাচন করুন</option>
                    {examNames.map((exam, index) => (
                      <option key={index} value={exam.slug}>{exam.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* User Info Section */}
          {/* {selectedExam && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-primary text-white py-3">
                    <h6 className="mb-0 text-white">আপনার তথ্য</h6>
                  </div>
                  <div className="card-body">
                    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start">
                      <div className="mb-3 mb-md-0 me-md-3">
                        <img
                          src={currentUser.image || "/assets/images/user/avatar-1.png"}
                          alt={currentUser.name}
                          className="rounded-circle"
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            border: '2px solid #dee2e6'
                          }}
                        />
                      </div>

                      <div className="flex-grow-1">
                        <div className="row">
                          <div className="col-md-3 mb-2 mb-md-0">
                            <div className="fw-semibold text-dark">{currentUser.name}</div>
                            <div className="small text-muted">{currentUser.institution}</div>
                          </div>
                          <div className="col-md-3 mb-2 mb-md-0">
                            <div className="small text-muted">র‍্যাংক</div>
                            <div className="fw-bold text-dark">#{currentUser.rank}</div>
                          </div>
                          <div className="col-md-3 mb-2 mb-md-0">
                            <div className="small text-muted">স্কোর</div>
                            <div className="fw-bold text-dark">{currentUser.score}</div>
                          </div>
                          <div className="col-md-3 mb-2 mb-md-0">
                            <div className="small text-muted">মোট সময়</div>
                            <div className="fw-bold text-dark">{currentUser.completionTime}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {/* Leaderboard List */}
          <div className="row">
            <div className="col-12">
              {isLoading ? (
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">লোড হচ্ছে...</span>
                    </div>
                    <div className="mt-3 text-muted">লিডارবোর্ড ডাটা লোড হচ্ছে...</div>
                  </div>
                </div>
              ) : selectedExam ? (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-0">
                    {leaderboardData?.data?.length > 0 ? (
                      leaderboardData?.data?.map((user, index) => {
                        const rank = user?.serial;
                        const isTopThree = rank <= 3
                        return (
                          <div
                            key={user.id}
                            className={`d-flex align-items-center p-3 ${isTopThree ? getBackgroundColor(rank) : ''} ${index !== filteredData.length - 1 ? "border-bottom" : ""
                              }`}
                          >
                            <div className="me-3 position-relative">
                              <img
                                src={user.image || "/assets/images/user/avatar-1.png"}
                                alt={user.student_name}
                                className={`rounded-circle ${isTopThree ? 'border border-white shadow-sm' : ''} object-fit-cover image-size`}
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-semibold text-dark mb-1">
                                {user.student_name}
                                {isTopThree && (
                                  <span className="ms-2">{getMedal(rank)}</span>
                                )}
                              </div>
                              <div className="small text-muted">{user.student_institute || ""}</div>
                            </div>
                            <div className="text-end">
                              <div className="d-flex align-items-center justify-content-end mb-1">
                                <span className="fw-bold fs-5">
                                  #{rank}
                                </span>
                              </div>
                              <div className="small">
                                স্কোর: {user.student_total_mark || 0}
                              </div>
                              <div className="small text-muted">
                                {user.submit_time ?
                                  formatTimeSpent(new Date(user.submit_time) - new Date(user.student_exam_start_time))
                                  : 'N/A'
                                }
                              </div>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="p-3 text-center text-muted">
                        এই পরীক্ষার জন্য কোনো ডাটা পাওয়া যায়নি
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center py-5">
                    <div className="text-muted mb-3">একটি পরীক্ষা নির্বাচন করুন</div>
                    <div className="small text-muted">লিডারবোর্ড দেখতে উপরের ড্রপডাউন থেকে পরীক্ষা নির্বাচন করুন</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination - Only show if exam is selected and has pagination links */}
          {selectedExam && !isLoading && leaderboardData.links.length > 0 && (
            <div className="row mt-4">
              <div className="col-12">
                <nav aria-label="Leaderboard pagination">
                  <div className="d-flex justify-content-center">
                    <ul className="pagination mb-0">
                      {leaderboardData.links.map((link, i) => (
                        <li
                          key={i}
                          className={`page-item ${link.active ? "active" : ""
                            } ${!link.url ? "disabled" : ""
                            }`}
                        >
                          {link.url ? (
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(link.url)}
                              dangerouslySetInnerHTML={{
                                __html: link.label,
                              }}
                            />
                          ) : (
                            <span
                              className="page-link"
                              dangerouslySetInnerHTML={{
                                __html: link.label,
                              }}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add custom CSS for top three colors */}
    </div>
  )
}

LeaderboardPage.layout = (page) => <Layout children={page} />;
export default LeaderboardPage
