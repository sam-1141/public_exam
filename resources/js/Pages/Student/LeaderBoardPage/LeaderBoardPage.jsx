import {useEffect, useState} from "react"
import Layout from "../../../layouts/Layout"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"
import { leaderboardData } from "../../../utils/LeaderBoard/LeaderBoardData"

const LeaderboardPage = ({ examsInfo }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedExam, setSelectedExam] = useState("")

    useEffect(() => {
        console.log("Exams Info:", examsInfo);
    }, [examsInfo]);

  // Get unique exam names
  const examNames = [...new Set(leaderboardData.map(item => item.examName))]

  // Filter data based on selected exam
  const filteredData = selectedExam
    ? leaderboardData.filter(item => item.examName === selectedExam)
    : []

  // Sort by rank and add medal emojis
  const sortedData = [...filteredData].sort((a, b) => a.rank - b.rank)
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = sortedData.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  const handleExamChange = (exam) => {
    setSelectedExam(exam)
    setCurrentPage(1)
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
    name: "আপনার নাম",
    image: "/placeholder.svg",
    institution: "আপনার প্রতিষ্ঠানের নাম",
    rank: 5,
    score: 85,
    completionTime: "00:25:45"
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
                      <option key={index} value={exam}>{exam}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* User Info Section */}
          {selectedExam && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-primary text-white py-3">
                    <h6 className="mb-0 text-white">আপনার তথ্য</h6>
                  </div>
                  <div className="card-body">
                    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start">
                      {/* User Image - Top center on small devices */}
                      <div className="mb-3 mb-md-0 me-md-3">
                        <img
                          src={currentUser.image}
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

                      {/* User Details */}
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
          )}

          {/* Leaderboard List */}
          <div className="row">
            <div className="col-12">
              {selectedExam ? (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-0">
                    {currentData.length > 0 ? (
                      currentData.map((user, index) => {
                        const isTopThree = user.rank <= 3
                        return (
                          <div
                            key={user.id}
                            className={`d-flex align-items-center p-3 ${isTopThree ? getBackgroundColor(user.rank) : ''} ${index !== currentData.length - 1 ? "border-bottom" : ""
                              }`}
                          >
                            <div className="me-3 position-relative">
                              <img
                                src={user.image || "/placeholder.svg"}
                                alt={user.name}
                                className="rounded-circle"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'cover',
                                  border: isTopThree ? '2px solid white' : 'none',
                                  boxShadow: isTopThree ? '0 0 8px rgba(0,0,0,0.2)' : 'none'
                                }}
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-semibold text-dark mb-1">
                                {user.name}
                                {isTopThree && (
                                  <span className="ms-2">{getMedal(user.rank)}</span>
                                )}
                              </div>
                              <div className="small text-muted">{user.institution}</div>
                            </div>
                            <div className="text-end">
                              <div className="d-flex align-items-center justify-content-end mb-1">
                                <span className={`fw-bold fs-5 `}>
                                  #{user.rank}
                                </span>
                              </div>
                              <div className={`small `}>
                                স্কোর: {user.score}
                              </div>
                              <div className="small text-muted">
                                {user.completionTime} 00:29:30 {/* Added completion time here */}
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

          {/* Pagination - Only show if exam is selected */}
          {selectedExam && (
            <div className="row mt-4">
              <div className="col-12">
                <nav aria-label="Leaderboard pagination">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div className="small text-muted">
                      দেখানো হচ্ছে {startIndex + 1}-{Math.min(endIndex, filteredData.length)} এর মধ্যে{" "}
                      {filteredData.length} টি
                    </div>

                    <ul className="pagination pagination-sm mb-0">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          পূর্ববর্তী
                        </button>
                      </li>

                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                          return (
                            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                              <button className="page-link" onClick={() => handlePageChange(page)}>
                                {page}
                              </button>
                            </li>
                          )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <li key={page} className="page-item disabled">
                              <span className="page-link">...</span>
                            </li>
                          )
                        }
                        return null
                      })}

                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          পরবর্তী
                        </button>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add custom CSS for top three colors */}
      <style jsx>{`
        .bg-gold {
          background-color: rgba(255, 215, 0, 0.2);  /* 20% opacity gold */
          color: #8B7500;  /* Dark gold text */
          border-left: 4px solid #FFD700;  /* Gold accent border */
        }
        .bg-silver {
          background-color: rgba(192, 192, 192, 0.2);  /* 20% opacity silver */
          color: #696969;  /* Dark gray text */
          border-left: 4px solid #C0C0C0;  /* Silver accent border */
        }
        .bg-bronze {
          background-color: rgba(205, 127, 50, 0.2);  /* 20% opacity bronze */
          color: #8B4513;  /* Dark bronze text */
          border-left: 4px solid #CD7F32;  /* Bronze accent border */
        }
        .bg-gold, .bg-silver, .bg-bronze {
          transition: all 0.3s ease;
        }
        .bg-gold:hover {
          background-color: rgba(255, 215, 0, 0.3);  /* Slightly darker on hover */
        }
        .bg-silver:hover {
          background-color: rgba(192, 192, 192, 0.3);
        }
        .bg-bronze:hover {
          background-color: rgba(205, 127, 50, 0.3);
        }
        .top-three-badge {
          font-size: 0.8rem;
          padding: 2px 6px;
          border-radius: 12px;
          font-weight: bold;
        }
        .gold-badge {
          background-color: #FFD700;
          color: #5E4B00;
        }
        .silver-badge {
          background-color: #C0C0C0;
          color: #4A4A4A;
        }
        .bronze-badge {
          background-color: #CD7F32;
          color: #5E3000;
        }
      `}</style>
    </div>
  )
}

LeaderboardPage.layout = (page) => <Layout children={page} />;
export default LeaderboardPage
