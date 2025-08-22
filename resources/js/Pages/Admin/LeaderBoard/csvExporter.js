// Helper function to format date and time
export const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Function to calculate completed time
export const calculateCompletedTime = (startTime, endTime) => {
    if (!startTime || !endTime) return "N/A";

    const start = new Date(startTime);
    const end = new Date(endTime);
    const completedTimeMs = end - start;

    // Convert milliseconds to hours, minutes, seconds format
    const hours = Math.floor(completedTimeMs / (1000 * 60 * 60));
    const minutes = Math.floor(
        (completedTimeMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((completedTimeMs % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Function to determine submission method based on submit_status
export const getSubmissionMethod = (submitStatus) => {
    switch (submitStatus) {
        case 1:
            return "Submitted";
        case 2:
            return "Auto Submit";
        case 3:
            return "Force Submit";
        default:
            return "Unknown";
    }
};

// Main function to export leaderboard data as CSV
export const exportLeaderboardToCSV = (data, examName = "leaderboard") => {
    if (!data || data.length === 0) {
        alert("No data to export");
        return;
    }

    // Create CSV content with all requested fields
    const headers =
        "Student ID,Student Name,Exam Start Time,Exam End Time,Completed Time,Method,Tab Switched,Total Skipped Answer,Total Correct Answer,Total Wrong Answer,Total Mark\n";

    const csvContent = data.reduce((acc, item) => {
        // Calculate wrong answers
        const totalQuestions = item.exam_total_questions || 0;
        const correctAnswers = item.total_correct_answers || 0;
        const skippedAnswers = item.total_skipped_answers || 0;
        const wrongAnswers = totalQuestions - correctAnswers - skippedAnswers;

        // Determine method (based on exam type)
        const method = getSubmissionMethod(item.submit_status);

        return (
            acc +
            `${item.student_id},"${item.student_name}","${formatDateTime(
                item.student_exam_start_time
            )}","${formatDateTime(
                item.student_exam_end_time
            )}","${calculateCompletedTime(
                item.student_exam_start_time,
                item.student_exam_end_time
            )}",${method},${
                item.tab_switch_count || 0
            },${skippedAnswers},${correctAnswers},${wrongAnswers},${
                item.student_total_mark
            }\n`
        );
    }, headers);

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${examName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
