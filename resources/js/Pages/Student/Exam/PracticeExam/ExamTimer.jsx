import { useEffect, useState } from "react"

const ExamTimer = ({ duration, onTimeUp, onTimeChange }) => {
  const totalSeconds = duration * 60
  const [timeLeft, setTimeLeft] = useState(totalSeconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        onTimeChange(totalSeconds - newTime) // spent time = total - remaining
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp, onTimeChange, totalSeconds])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return hours > 0
      ? `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      : `${minutes.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`
  }

  const getTimerColor = () => {
    if (timeLeft <= 120) return "text-danger"
    if (timeLeft <= 300) return "text-warning"
    return "text-success"
  }

  return <div className={`fw-bold fs-4 ${getTimerColor()}`}>⏰ {formatTime(timeLeft)}</div>
}

export default ExamTimer
