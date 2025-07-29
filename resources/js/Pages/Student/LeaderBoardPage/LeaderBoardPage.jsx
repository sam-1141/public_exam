import { useState } from "react"
import { Menu, Bell } from "lucide-react"
import Layout from "../../../layouts/Layout"

const LeaderboardPage = ({ isMobile, showMobileSidebar, setShowMobileSidebar }) => {
  const [selectedLeague, setSelectedLeague] = useState("bronze")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const leagues = [
    { id: "iron", name: "আয়রন লীগ", icon: "⚫", color: "secondary", starsRequired: 0 },
    { id: "bronze", name: "ব্রোঞ্জ লীগ", icon: "🥉", color: "warning", starsRequired: 100 },
    { id: "silver", name: "সিলভার লীগ", icon: "🥈", color: "light", starsRequired: 200 },
    { id: "gold", name: "গোল্ড লীগ", icon: "🥇", color: "warning", starsRequired: 300 },
    { id: "platinum", name: "প্ল্যাটিনাম লীগ", icon: "💎", color: "info", starsRequired: 400 },
    { id: "diamond", name: "ডায়মন্ড লীগ", icon: "💠", color: "primary", starsRequired: 500 },
    { id: "sapphire", name: "স্যাফায়ার লীগ", icon: "🔷", color: "primary", starsRequired: 600 },
  ]

  const leaderboardData = [
    {
      id: 1,
      name: "Imami",
      institution: "Gaibandha Govt College",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 1,
      xp: 395.6,
      medal: "🥇",
    },
    {
      id: 2,
      name: "Md তুJMধর",
      institution: "Charfasson gov college, Bhola",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 2,
      xp: 392.4,
      medal: "🥈",
    },
    {
      id: 3,
      name: "Hameem reza",
      institution: "bakolia government College Chittagong",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 3,
      xp: 377.7,
      medal: "🥉",
    },
    {
      id: 4,
      name: "Saif Iftakhar",
      institution: "Dhaka College",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 4,
      xp: 375.0,
      medal: "",
    },
    {
      id: 5,
      name: "Mst. Arowa Uddin",
      institution: "Rajshahi College",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 5,
      xp: 354.7,
      medal: "",
    },
    {
      id: 6,
      name: "আব্দুল আলীম",
      institution: "Gazipur Government Technical College",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 6,
      xp: 341.9,
      medal: "",
    },
    {
      id: 7,
      name: "রহিম উদ্দিন",
      institution: "Comilla Victoria College",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 7,
      xp: 335.2,
      medal: "",
    },
    {
      id: 8,
      name: "ফাতেমা খাতুন",
      institution: "Sylhet Government College",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 8,
      xp: 328.5,
      medal: "",
    },
    {
      id: 9,
      name: "করিম মিয়া",
      institution: "Barisal Government College",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 9,
      xp: 321.8,
      medal: "",
    },
    {
      id: 10,
      name: "সালমা বেগম",
      institution: "Rangpur Government College",
      avatar: "/placeholder.svg?height=50&width=50",
      rank: 10,
      xp: 315.1,
      medal: "",
    },
  ]

  const totalPages = Math.ceil(leaderboardData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = leaderboardData.slice(startIndex, endIndex)

  const handleLeagueChange = (leagueId) => {
    setSelectedLeague(leagueId)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  const selectedLeagueData = leagues.find((league) => league.id === selectedLeague)

  return (
    <div className="flex-grow-1 d-flex flex-column">
      {/* Header */}
      <header className="bg-white border-bottom p-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {isMobile && (
              <button className="btn btn-light me-3" onClick={() => setShowMobileSidebar(true)}>
                <Menu size={20} />
              </button>
            )}
            <h4 className="mb-0 fw-bold">লিডারবোর্ড</h4>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-light position-relative me-2">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 p-3 bg-light">
        <div className="container-fluid">
          {/* League Selection */}
          <div className="row justify-content-center mb-4">
            <div className="col-12">
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-3">
                  {leagues.map((league) => (
                    <button
                      key={league.id}
                      className={`btn border-0 p-0 bg-transparent ${selectedLeague === league.id ? "opacity-100" : "opacity-75"}`}
                      onClick={() => handleLeagueChange(league.id)}
                    >
                      <div
                        className={`d-flex align-items-center justify-content-center rounded-3 ${
                          selectedLeague === league.id ? "shadow-lg" : "shadow-sm"
                        }`}
                        style={{
                          width: isMobile ? "50px" : "70px",
                          height: isMobile ? "50px" : "70px",
                          background:
                            league.id === "iron"
                              ? "#6c757d"
                              : league.id === "bronze"
                                ? "#8B4513"
                                : league.id === "silver"
                                  ? "#C0C0C0"
                                  : league.id === "gold"
                                    ? "#FFD700"
                                    : league.id === "platinum"
                                      ? "#E5E4E2"
                                      : league.id === "diamond"
                                        ? "#B9F2FF"
                                        : "#4169E1",
                        }}
                      >
                        <span className="fs-4">{league.icon}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <h5 className="fw-bold text-dark">{selectedLeagueData?.name}</h5>
                <small className="text-muted">
                  {selectedLeagueData?.starsRequired > 0 && `${selectedLeagueData.starsRequired} তারকা প্রয়োজন`}
                </small>
              </div>
            </div>
          </div>

          {/* Leaderboard Controls */}
          <div className="row mb-3">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <h5 className="mb-0 fw-semibold">লিডারবোর্ড</h5>
                <div className="d-flex align-items-center gap-2">
                  <span className="small text-muted">প্রতি পৃষ্ঠায়:</span>
                  <select
                    className="form-select form-select-sm"
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    style={{ width: "auto" }}
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
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  {currentData.map((user, index) => (
                    <div
                      key={user.id}
                      className={`d-flex align-items-center p-3 ${index !== currentData.length - 1 ? "border-bottom" : ""}`}
                    >
                      <div className="me-3">
                        <img
                          src={user.avatar || "/placeholder.svg"}
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
                          {user.medal && <span className="me-2">{user.medal}</span>}
                          <span className="fw-bold fs-5">{user.rank}</span>
                        </div>
                        <div className="small text-muted">{user.xp} xp</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="row mt-4">
            <div className="col-12">
              <nav aria-label="Leaderboard pagination">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div className="small text-muted">
                    দেখানো হচ্ছে {startIndex + 1}-{Math.min(endIndex, leaderboardData.length)} এর মধ্যে{" "}
                    {leaderboardData.length} টি
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
        </div>
      </main>
    </div>
  )
}

LeaderboardPage.layout = (page) => <Layout children={page} />;
export default LeaderboardPage
