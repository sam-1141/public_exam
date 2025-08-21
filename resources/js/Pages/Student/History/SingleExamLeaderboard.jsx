import Layout from "../../../layouts/Layout"
import PageHeader from "../../../components/Student/PageHeader/PageHeader"
import { leaderboardData } from "../../../utils/LeaderBoard/LeaderBoardData"

const SingleExamLeaderboard = () => {
    // Sort by rank and add medal emojis
    const sortedData = [...leaderboardData].sort((a, b) => a.rank - b.rank)

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
        name: "আপনার নাম",
        image: "/placeholder.svg",
        institution: "আপনার প্রতিষ্ঠানের নাম",
        rank: 5,
        score: 85,
        completionTime: "00:25:45"
    }

    return (
        <div className="flex-grow-1 d-flex flex-column font-baloo">
            {/* Header */}
            <PageHeader title="লিডারবোর্ড" />

            {/* Main Content */}
            <main className="flex-grow-1 p-1 bg-light">
                <div className="container-fluid">
                    {/* User Info Section */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-primary text-white py-3">
                                    <h6 className="mb-0 text-white">আপনার তথ্য</h6>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start">
                                        {/* User Image - Top center on small devices */}
                                        <div className="mb-3 mb-md-0 me-md-3">
                                            <img
                                                src={currentUser.image}
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

                                        {/* User Details */}
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
                    </div>

                    {/* Leaderboard List */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-0">
                                    {sortedData.length > 0 ? (
                                        sortedData.map((user, index) => {
                                            const isTopThree = user.rank <= 3
                                            return (
                                                <div
                                                    key={user.id}
                                                    className={`d-flex align-items-center p-3 ${isTopThree ? getBackgroundColor(user.rank) : ''} ${index !== sortedData.length - 1 ? "border-bottom" : ""
                                                        }`}
                                                >
                                                    <div className="me-3 position-relative">
                                                        <img
                                                            src={user.image || "/placeholder.svg"}
                                                            alt={user.name}
                                                            className="rounded-circle"
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                objectFit: 'cover',
                                                                border: isTopThree ? '2px solid white' : 'none',
                                                                boxShadow: isTopThree ? '0 0 8px rgba(0,0,0,0.2)' : 'none'
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="fw-semibold text-dark mb-1">
                                                            {user.name}
                                                            {isTopThree && (
                                                                <span className="ms-2">{getMedal(user.rank)}</span>
                                                            )}
                                                        </div>
                                                        <div className="small text-muted">{user.institution}</div>
                                                    </div>
                                                    <div className="text-end">
                                                        <div className="d-flex align-items-center justify-content-end mb-1">
                                                            <span className="fw-bold fs-5">
                                                                #{user.rank}
                                                            </span>
                                                        </div>
                                                        <div className="small">
                                                            স্কোর: {user.score}
                                                        </div>
                                                        <div className="small text-muted">
                                                            {user.completionTime}
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
                        </div>
                    </div>
                </div>
            </main>

            {/* Add custom CSS for top three colors */}
            <style jsx>{`
                .bg-gold {
                    background-color: rgba(255, 215, 0, 0.2);
                    color: #8B7500;
                    border-left: 4px solid #FFD700;
                }
                .bg-silver {
                    background-color: rgba(192, 192, 192, 0.2);
                    color: #696969;
                    border-left: 4px solid #C0C0C0;
                }
                .bg-bronze {
                    background-color: rgba(205, 127, 50, 0.2);
                    color: #8B4513;
                    border-left: 4px solid #CD7F32;
                }
                .bg-gold, .bg-silver, .bg-bronze {
                    transition: all 0.3s ease;
                }
                .bg-gold:hover {
                    background-color: rgba(255, 215, 0, 0.3);
                }
                .bg-silver:hover {
                    background-color: rgba(192, 192, 192, 0.3);
                }
                .bg-bronze:hover {
                    background-color: rgba(205, 127, 50, 0.3);
                }
            `}</style>
        </div>
    )
}

SingleExamLeaderboard.layout = (page) => <Layout>{page}</Layout>
export default SingleExamLeaderboard