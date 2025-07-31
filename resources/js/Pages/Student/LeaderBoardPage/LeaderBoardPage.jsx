import { useState } from "react"
import { Menu, Bell } from "lucide-react"
import Layout from "../../../layouts/Layout"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"
import { leaderboardData } from "../../../utils/LeaderBoard/LeaderBoardData"

const LeaderboardPage = ({ isMobile }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedExam, setSelectedExam] = useState("")

  // Get unique exam names
  const examNames = [...new Set(leaderboardData.map(item => item.examName))]

  // Filter data based on selected exam
  const filteredData = selectedExam 
    ? leaderboardData.filter(item => item.examName === selectedExam)
    : []

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

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

  return (
    <div className="flex-grow-1 d-flex flex-column">
      {/* Header */}
      <PageHeader
        title="লিডারবোর্ড"
        streak={5}
      />

      {/* Main Content */}
      <main className="flex-grow-1 p-3 bg-light">
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
                <div className="d-flex align-items-center gap-2">
                  <span className="small text-muted">প্রতি পৃষ্ঠায়:</span>
                  <select
                    className="form-select form-select-sm"
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    style={{ width: "auto" }}
                    disabled={!selectedExam}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="row">
            <div className="col-12">
              {selectedExam ? (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-0">
                    {currentData.length > 0 ? (
                      currentData.map((user, index) => (
                        <div
                          key={user.id}
                          className={`d-flex align-items-center p-3 ${index !== currentData.length - 1 ? "border-bottom" : ""}`}
                        >
                          <div className="me-3">
                            <img
                              src={user.image || "/placeholder.svg"}
                              alt={user.name}
                              className="rounded-circle"
                              width={isMobile ? "40" : "50"}
                              height={isMobile ? "40" : "50"}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <div className="fw-semibold text-dark mb-1">{user.name}</div>
                            <div className="small text-muted">{user.institution}</div>
                          </div>
                          <div className="text-end">
                            <div className="d-flex align-items-center justify-content-end mb-1">
                              <span className="fw-bold fs-5">{user.rank}</span>
                            </div>
                            <div className="small text-muted">স্কোর: {user.score}</div>
                          </div>
                        </div>
                      ))
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
    </div>
  )
}

LeaderboardPage.layout = (page) => <Layout children={page} />;
export default LeaderboardPage