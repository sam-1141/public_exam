"use client"

import { useState, useEffect } from "react"

const LiveExamCard = ({ exam, onClick }) => {
  const [timeLeft, setTimeLeft] = useState(null)
  const [isLive, setIsLive] = useState(exam.status === "live")

  const getStatusColor = (status) => {
    switch (status) {
      case "live": return "success"
      case "starting-soon": return "warning"
      default: return "secondary"
    }
  }

  // Countdown calculation
  useEffect(() => {
    if (exam.status === "starting-soon" && exam.startTime) {
      const calculateTimeLeft = () => {
        const now = new Date()
        const startTime = new Date(exam.startTime)
        const difference = startTime - now

        if (difference <= 0) {
          setIsLive(true)
          return null
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        return { days, hours, minutes, seconds }
      }

      setTimeLeft(calculateTimeLeft())

      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft())
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [exam.startTime, exam.status])

  const handleClick = () => {
    if (isLive) onClick(exam)
  }

  const formatTimeLeft = () => {
    if (!timeLeft) return "শীঘ্রই শুরু"
    
    return [
      timeLeft.days > 0 && `${timeLeft.days} দিন`,
      `${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`
    ].filter(Boolean).join(" ")
  }

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4 font-baloo">
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title fw-bold mb-0">{exam.name}</h5>
            <span className={`badge bg-${getStatusColor(isLive ? "live" : exam.status)} pulse`}>
              {isLive ? "🔴 LIVE" : "⏰ শীঘ্রই"}
            </span>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">মোট নম্বর:</span>
              <span className="fw-semibold">{exam.totalMarks}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">সময়:</span>
              <span className="fw-semibold">{exam.duration} মিনিট</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">প্রশ্ন:</span>
              <span className="fw-semibold">{exam.totalQuestions} টি</span>
            </div>
            {/* {!isLive && timeLeft && (
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">শুরু হতে বাকি:</span>
                <span className="fw-semibold">{formatTimeLeft()}</span>
              </div>
            )} */}
          </div>

          <button
            className={`btn w-100 fw-semibold ${isLive ? "btn-success" : "btn-warning"}`}
            onClick={handleClick}
            disabled={!isLive}
          >
            {isLive ? "অংশগ্রহণ করুন" : formatTimeLeft()}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LiveExamCard