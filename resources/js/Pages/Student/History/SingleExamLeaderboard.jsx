import Layout from "../../../layouts/Layout"
import "./../LeaderBoardPage/LeaderBoardPage.css"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"
import { useEffect, useState } from "react"
import axios from "axios"
import {route} from "ziggy-js";

const SingleExamLeaderboard = ({ examSlug }) => {
    const [leaderboardData, setLeaderboardData] = useState({ data: [], links: [] })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (examSlug) {
            setIsLoading(true)
            axios
                .get(route("student.leaderboard.list", examSlug))
                .then(res => {
                    // Process the data to calculate time spent
                    const processedData = processLeaderboardData(res.data.attendanceInfo.data)
                    setLeaderboardData({
                        data: processedData,
                        links: res.data.attendanceInfo.links || []
                    })
                    setIsLoading(false)
                })
                .catch(err => {
                    setLeaderboardData({ data: [], links: [] })
                    setIsLoading(false)
                })
        }
    }, [examSlug])

    // Handle pagination page change
    const handlePageChange = (url) => {
        if (!url) return;

        setIsLoading(true)
        axios
            .get(url)
            .then(res => {
                // Process the data to calculate time spent
                const processedData = processLeaderboardData(res.data.attendanceInfo.data)
                setLeaderboardData({
                    data: processedData,
                    links: res.data.attendanceInfo.links || []
                })
                setIsLoading(false)
            })
            .catch(err => {
                setLeaderboardData({ data: [], links: [] })
                setIsLoading(false)
            })
    }

    // Process leaderboard data to calculate time spent
    const processLeaderboardData = (data) => {
        if (!data || !Array.isArray(data)) return []

        // Calculate time spent for each student
        return data.map(student => {
            const startTime = new Date(student.student_exam_start_time)
            const endTime = new Date(student.submit_time)
            const timeSpentMs = endTime - startTime

            return {
                ...student,
                timeSpentMs,
                timeSpentFormatted: formatTimeSpent(timeSpentMs)
            }
        })
    }

    // Helper function to format time spent
    const formatTimeSpent = (ms) => {
        if (!ms || ms <= 0) return "--:--:--"

        const seconds = Math.floor(ms / 1000)
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Sort by rank and add medal emojis
    const sortedData = leaderboardData.data

    // Function to get medal emoji based on rank
    const getMedal = (rank) => {
        switch (rank) {
            case 1: return "🥇"
            case 2: return "🥈"
            case 3: return "🥉"
            default: return null
        }
    }

    // Function to get background color based on rank
    const getBackgroundColor = (rank) => {
        switch (rank) {
            case 1: return "bg-gold"
            case 2: return "bg-silver"
            case 3: return "bg-bronze"
            default: return ""
        }
    }

    // Mock user data - replace with actual user data from your application
    const currentUser = {
        name: "নাম",
        image: "/assets/images/user/avatar-1.png",
        institution: "প্রতিষ্ঠানের নাম",
        rank: 5,
        score: 2,
        completionTime: "00:00:45"
    }

    return (
        <div className="flex-grow-1 d-flex flex-column font-baloo">
            {/* Header */}
            <PageHeader title="লিডারবোর্ড" />

            {/* Main Content */}
            <main className="flex-grow-1 p-1 bg-light">
                <div className="container-fluid">
                    {/* User Info Section */}
                    {/* <div className="row mb-4">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-primary text-white py-3">
                                    <h6 className="mb-0 text-white">আপনার তথ্য</h6>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start">
                                        <div className="mb-3 mb-md-0 me-md-3">
                                            <img
                                                src={currentUser.image || "/assets/images/user/avatar-1.png"}
                                                alt={currentUser.name}
                                                className="rounded-circle"
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    objectFit: 'cover',
                                                    border: '2px solid #dee2e6'
                                                }}
                                            />
                                        </div>

                                        <div className="flex-grow-1">
                                            <div className="row">
                                                <div className="col-md-3 mb-2 mb-md-0">
                                                    <div className="fw-semibold text-dark">{currentUser.name}</div>
                                                    <div className="small text-muted">{currentUser.institution}</div>
                                                </div>
                                                <div className="col-md-3 mb-2 mb-md-0">
                                                    <div className="small text-muted">র‍্যাংক</div>
                                                    <div className="fw-bold text-dark">#{currentUser.rank}</div>
                                                </div>
                                                <div className="col-md-3 mb-2 mb-md-0">
                                                    <div className="small text-muted">স্কোর</div>
                                                    <div className="fw-bold text-dark">{currentUser.score}</div>
                                                </div>
                                                <div className="col-md-3 mb-2 mb-md-0">
                                                    <div className="small text-muted">মোট সময়</div>
                                                    <div className="fw-bold text-dark">{currentUser.completionTime}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Leaderboard List */}
                    <div className="row">
                        <div className="col-12">
                            {isLoading ? (
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">লোড হচ্ছে...</span>
                                        </div>
                                        <div className="mt-3 text-muted">লিডারবোর্ড ডাটা লোড হচ্ছে...</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body p-0">
                                        {sortedData.length > 0 ? (
                                            sortedData.map((user, index) => {
                                                const rank = index + 1;
                                                const isTopThree = rank <= 3
                                                return (
                                                    <div
                                                        key={user.id}
                                                        className={`d-flex align-items-center p-3 ${isTopThree ? getBackgroundColor(rank) : ''} ${index !== sortedData.length - 1 ? "border-bottom" : ""
                                                            }`}
                                                    >
                                                        <div className="me-3 position-relative">
                                                            <img
                                                                src={user.image || "/assets/images/user/avatar-1.png"}
                                                                alt={user.student_name}
                                                                className={`rounded-circle ${isTopThree ? 'border border-white shadow-sm' : ''} object-fit-cover image-size`}

                                                            />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="fw-semibold text-dark mb-1">
                                                                {user.student_name}
                                                                {isTopThree && (
                                                                    <span className="ms-2">{getMedal(rank)}</span>
                                                                )}
                                                            </div>
                                                            <div className="small text-muted">{user.student_institute || ""}</div>
                                                        </div>
                                                        <div className="text-end">
                                                            <div className="d-flex align-items-center justify-content-end mb-1">
                                                                <span className="fw-bold fs-5">
                                                                    #{rank}
                                                                </span>
                                                            </div>
                                                            <div className="small">
                                                                স্কোর: {user.student_total_mark || 0}
                                                            </div>
                                                            <div className="small text-muted">
                                                                {user.timeSpentFormatted || "--:--:--"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className="p-3 text-center text-muted">
                                                এই পরীক্ষার জন্য কোনো ডাটা পাওয়া যায়নি
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination - Only show if has pagination links */}
                    {!isLoading && leaderboardData.links.length > 0 && (
                        <div className="row mt-4">
                            <div className="col-12">
                                <nav aria-label="Leaderboard pagination">
                                    <div className="d-flex justify-content-center">
                                        <ul className="pagination mb-0">
                                            {leaderboardData.links.map((link, i) => (
                                                <li
                                                    key={i}
                                                    className={`page-item ${link.active ? "active" : ""
                                                        } ${!link.url ? "disabled" : ""
                                                        }`}
                                                >
                                                    {link.url ? (
                                                        <button
                                                            className="page-link"
                                                            onClick={() => handlePageChange(link.url)}
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.label,
                                                            }}
                                                        />
                                                    ) : (
                                                        <span
                                                            className="page-link"
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.label,
                                                            }}
                                                        />
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

SingleExamLeaderboard.layout = (page) => <Layout>{page}</Layout>
export default SingleExamLeaderboard
