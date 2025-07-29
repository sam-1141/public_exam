"use client"

import { useState, useEffect } from "react"
import { Menu, Bell } from "lucide-react"
// import Sidebar from "./Sidebar"
import FeatureCard from "./FeatureCard"
import Leaderboard from "./Leaderboard"
import ProgressReport from "./ProgressReport"
import Layout from "../../../layouts/Layout"

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setShowMobileSidebar(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const features = [
    {
      icon: <div className="bg-warning text-white rounded-2 p-2 fs-4">📁</div>,
      title: "আর্কাইভ",
      bgColor: "warning",
    },
    {
      icon: <div className="bg-warning text-white rounded-2 p-2 fs-4">⚡</div>,
      title: "ক্রুশ প্র্যাকটিস",
      bgColor: "warning",
    },
    {
      icon: <div className="bg-danger text-white rounded-2 p-2 fs-4">📝</div>,
      title: "মূল পরীক্ষা",
      bgColor: "danger",
    },
    {
      icon: <div className="bg-warning text-white rounded-2 p-2 fs-4">📅</div>,
      title: "রুটিন",
      bgColor: "warning",
    },
    {
      icon: <div className="bg-primary text-white rounded-2 p-2 fs-4">🤖</div>,
      title: "চ্যাট AI",
      bgColor: "primary",
    },
    {
      icon: <div className="bg-warning text-white rounded-2 p-2 fs-4">🏆</div>,
      title: "লিডারবোর্ড",
      bgColor: "warning",
    },
  ]

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      {/* <div
        className={`${isMobile ? "" : isCollapsed ? "" : ""}`}
        style={{ width: isMobile ? "auto" : isCollapsed ? "60px" : "250px", transition: "width 0.3s ease" }}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
          showMobileSidebar={showMobileSidebar}
          setShowMobileSidebar={setShowMobileSidebar}
        />
      </div> */}

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        {/* <header className="bg-white border-bottom p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {isMobile ? (
                <button className="btn btn-light me-3" onClick={() => setShowMobileSidebar(true)}>
                  <Menu size={20} />
                </button>
              ) : (
                <button className="btn btn-light me-3" onClick={() => setIsCollapsed(!isCollapsed)}>
                  <Menu size={20} />
                </button>
              )}
              <h4 className="mb-0 fw-bold">ড্যাশবোর্ড</h4>
            </div>
            <div className="d-flex align-items-center">
              <button className="btn btn-light position-relative me-2">
                <Bell size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </button>
            </div>
          </div>
        </header> */}

        {/* Dashboard Content */}
        <main className="flex-grow-1 p-3">
          <div className="row g-3">
            {/* Feature Cards */}
            <div className="col-12 col-lg-8">
              <div className="row g-3">
                {features.map((feature, index) => (
                  <FeatureCard key={index} icon={feature.icon} title={feature.title} bgColor={feature.bgColor} />
                ))}
              </div>

              {/* Leaderboard - Mobile/Tablet */}
              <div className="d-lg-none mt-4">
                <Leaderboard />
              </div>
            </div>

            {/* Right Sidebar - Desktop */}
            <div className="col-12 col-lg-4 d-none d-lg-block">
              <div className="row g-3">
                <div className="col-12">
                  <Leaderboard />
                </div>
                <div className="col-12">
                  <ProgressReport />
                </div>
              </div>
            </div>

            {/* Progress Report - Mobile/Tablet */}
            <div className="col-12 d-lg-none">
              <ProgressReport />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

Dashboard.layout = (page) => <Layout children={page} />;
export default Dashboard
