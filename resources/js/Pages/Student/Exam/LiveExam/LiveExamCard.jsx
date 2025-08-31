import { useState, useEffect } from "react"

const LiveExamCard = ({ exam, onClick }) => {
  const [timeLeft, setTimeLeft] = useState(null)
  const [isLive, setIsLive] = useState(false)

  const getStatus = () => {
    const now = new Date()
    const startTime = new Date(exam.start_time)
    const endTime = new Date(exam.end_time)

    if (now >= startTime && now <= endTime) return "live"
    if (now < startTime) return "starting-soon"
    return "ended"
  }

  const status = getStatus()

  useEffect(() => {
    if (status === "starting-soon") {
      const calculateTimeLeft = () => {
        const now = new Date()
        const startTime = new Date(exam.start_time)
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
    } else if (status === "live") {
      setIsLive(true)
      setTimeLeft(null)
    } else {
      setIsLive(false)
      setTimeLeft(null)
    }
  }, [exam.start_time, status])

  const handleClick = () => {
    if (isLive) onClick(exam)
  }

  const formatTimeLeft = () => {
    if (!timeLeft) return "শীঘ্রই শুরু"

    return [
      timeLeft.days > 0 && `${timeLeft.days} দিন`,
      `${timeLeft.hours.toString().padStart(2, "0")}:${timeLeft.minutes
        .toString()
        .padStart(2, "0")}:${timeLeft.seconds.toString().padStart(2, "0")}`,
    ]
      .filter(Boolean)
      .join(" ")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "success"
      case "starting-soon":
        return "warning"
      default:
        return "secondary"
    }
  }

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-2 font-baloo">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title fw-bold mb-0">{exam.name}</h5>
            <span className={`badge bg-${getStatusColor(status)} pulse`}>
              {isLive ? "🔴 LIVE" : status === "starting-soon" ? "⏰ শীঘ্রই" : ""}
            </span>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">মোট নম্বর:</span>
              <span className="fw-semibold">{exam.total_marks}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">সময়:</span>
              <span className="fw-semibold">{exam.duration} মিনিট</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">প্রশ্ন:</span>
              <span className="fw-semibold">{exam.total_questions} টি</span>
            </div>
          </div>

          <button
            className={`btn w-100 fw-semibold ${
              isLive ? "btn-success" : status === "starting-soon" ? "btn-warning" : "btn-secondary"
            }`}
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
