import ExamHistoryCard from "./ExamHistoryCard"

const DateSection = ({ date, exams }) => {
  const getBanglaDate = (dateStr) => {
    const englishToBangla = { 0: "০", 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯" }
    const monthNames = {
      January: "জানুয়ারি", February: "ফেব্রুয়ারি", March: "মার্চ", April: "এপ্রিল",
      May: "মে", June: "জুন", July: "জুলাই", August: "আগস্ট", September: "সেপ্টেম্বর",
      October: "অক্টোবর", November: "নভেম্বর", December: "ডিসেম্বর"
    }

    const d = new Date(dateStr)
    const day = d.getDate().toString().replace(/\d/g, (num) => englishToBangla[num])
    const month = monthNames[d.toLocaleDateString("en-US", { month: "long" })]
    const year = d.getFullYear().toString().replace(/\d/g, (num) => englishToBangla[num])

    return `${day} ${month}, ${year}`
  }

  return (
    <div className="mb-4 ms-3">
      {exams.map((exam, index) => (
        <ExamHistoryCard key={index} exam={exam} date={getBanglaDate(date)} />
      ))}
    </div>
  )
}

export default DateSection
