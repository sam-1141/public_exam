import { useState, useEffect } from "react"

const ExamTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60) // Convert minutes to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp(2)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getTimerColor = () => {
    if (timeLeft <= 120) return "text-danger" // Last 5 minutes
    if (timeLeft <= 300) return "text-warning" // Last 10 minutes
    return "text-success"
  }

  return <div className={`fw-bold fs-4 ${getTimerColor()}`}>⏰ {formatTime(timeLeft)}</div>
}

export default ExamTimer
