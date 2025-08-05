"use client"

import ExamHistoryCard from "./ExamHistoryCard"

const DateSection = ({ date, exams, onAnswerSheet, onLeaderboard }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getBanglaDate = (dateStr) => {
    const englishToBangla = {
      0: "০",
      1: "১",
      2: "২",
      3: "৩",
      4: "৪",
      5: "৫",
      6: "৬",
      7: "৭",
      8: "৮",
      9: "৯",
    }

    const monthNames = {
      January: "জানুয়ারি",
      February: "ফেব্রুয়ারি",
      March: "মার্চ",
      April: "এপ্রিল",
      May: "মে",
      June: "জুন",
      July: "জুলাই",
      August: "আগস্ট",
      September: "সেপ্টেম্বর",
      October: "অক্টোবর",
      November: "নভেম্বর",
      December: "ডিসেম্বর",
    }

    const date = new Date(dateStr)
    const day = date
      .getDate()
      .toString()
      .replace(/\d/g, (d) => englishToBangla[d])
    const month = monthNames[date.toLocaleDateString("en-US", { month: "long" })]
    const year = date
      .getFullYear()
      .toString()
      .replace(/\d/g, (d) => englishToBangla[d])

    return `${day} ${month}, ${year}`
  }

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center mb-3">
        {/* <h5 className="fw-bold text-dark mb-0 me-3">{getBanglaDate(date)}</h5>
        <span className="badge bg-primary">{exams.length} টি পরীক্ষা</span> */}
      </div>
      <div className="ms-3">
        {exams.map((exam, index) => (
          <ExamHistoryCard key={index} exam={exam} onAnswerSheet={onAnswerSheet} onLeaderboard={onLeaderboard} date={getBanglaDate(date)}/>
        ))}
      </div>
    </div>
  )
}

export default DateSection
