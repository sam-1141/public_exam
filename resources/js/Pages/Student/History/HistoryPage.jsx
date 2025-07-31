import Layout from "../../../layouts/Layout"
import { useState, useMemo } from "react"
import DateSection from "./DateSection"
import HistoryPagination from "./HistoryPagination"
import { examHistory } from "../../../utils/ExamHistory/ExamHistory"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"

const HistoryPage = ({ isMobile, showMobileSidebar, setShowMobileSidebar, isCollapsed, setIsCollapsed }) => {
  const [selectedCourse, setSelectedCourse] = useState("physics")
  const [activeTab, setActiveTab] = useState("live")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const courses = [
    { id: "physics", name: "পদার্থবিজ্ঞান" },
    { id: "chemistry", name: "রসায়ন" },
    { id: "math", name: "উচ্চতর গণিত" },
    { id: "biology", name: "জীববিজ্ঞান" },
    { id: "bangla", name: "বাংলা" },
    { id: "english", name: "English" },
  ]

  const currentExamData = examHistory[selectedCourse]?.[activeTab] || []

  // Group exams by date and sort
  const groupedExams = useMemo(() => {
    const grouped = currentExamData.reduce((acc, dateGroup) => {
      acc[dateGroup.date] = dateGroup.exams.sort((a, b) => {
        return new Date(`2000-01-01 ${b.time}`) - new Date(`2000-01-01 ${a.time}`)
      })
      return acc
    }, {})

    // Sort dates (newest first)
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a))

    return sortedDates.map((date) => ({
      date,
      exams: grouped[date],
    }))
  }, [currentExamData])

  // Pagination
  const totalPages = Math.ceil(groupedExams.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = groupedExams.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId)
    setCurrentPage(1)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleAnswerSheet = (exam) => {
    console.log("Navigate to answer sheet:", exam.id)
    // Navigate to answer sheet page
  }

  const handleLeaderboard = (exam) => {
    console.log("Navigate to leaderboard:", exam.id)
    // Navigate to leaderboard page
  }

  const selectedCourseName = courses.find((c) => c.id === selectedCourse)?.name || ""
  const totalExams = currentExamData.reduce((total, dateGroup) => total + dateGroup.exams.length, 0)

  return (
    <div className=" d-flex flex-column">
      <PageHeader
        title="ইতিহাস"
        streak={12}
      />

      <main className="flex-grow-1 p-1 bg-light">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              {/* Controls */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-3">
                  <div className="row align-items-center g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold mb-2">কোর্স নির্বাচন করুন</label>
                      <select
                        className="form-select"
                        value={selectedCourse}
                        onChange={(e) => handleCourseChange(e.target.value)}
                      >
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold mb-2">পরীক্ষার ধরন</label>
                      <div className="btn-group w-100" role="group">
                        <button
                          type="button"
                          className={`btn ${activeTab === "live" ? "btn-primary" : "btn-outline-primary"}`}
                          onClick={() => handleTabChange("live")}
                        >
                          🔴 লাইভ পরীক্ষা
                        </button>
                        <button
                          type="button"
                          className={`btn ${activeTab === "practice" ? "btn-primary" : "btn-outline-primary"}`}
                          onClick={() => handleTabChange("practice")}
                        >
                          📝 প্র্যাকটিস
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h4 className="fw-bold text-dark mb-1">
                    {selectedCourseName} - {activeTab === "live" ? "লাইভ পরীক্ষা" : "প্র্যাকটিস"}
                  </h4>
                  <p className="text-muted mb-0">
                    মোট {totalExams} টি পরীক্ষা • {groupedExams.length} টি তারিখে
                  </p>
                </div>
                <div className="text-end">
                  {/* <div className="badge bg-success fs-6 px-3 py-2">
                    📊 {Math.round((totalExams / (groupedExams.length || 1)) * 10) / 10} গড় পরীক্ষা/দিন
                  </div> */}
                </div>
              </div>

              {/* Exam History */}
              {currentPageData.length > 0 ? (
                <>
                  {currentPageData.map((dateGroup, index) => (
                    <DateSection
                      key={index}
                      date={dateGroup.date}
                      exams={dateGroup.exams}
                      onAnswerSheet={handleAnswerSheet}
                      onLeaderboard={handleLeaderboard}
                    />
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <HistoryPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      totalItems={groupedExams.length}
                      itemsPerPage={itemsPerPage}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-5">
                  <div
                    className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <span className="fs-1">📚</span>
                  </div>
                  <h5 className="fw-bold text-muted mb-2">কোনো পরীক্ষার ইতিহাস নেই</h5>
                  <p className="text-muted">
                    {selectedCourseName} এর {activeTab === "live" ? "লাইভ পরীক্ষা" : "প্র্যাকটিস"} এ এখনো অংশগ্রহণ করেননি।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

HistoryPage.layout = (page) => <Layout children={page} />;
export default HistoryPage;