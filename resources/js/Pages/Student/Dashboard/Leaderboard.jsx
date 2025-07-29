const Leaderboard = () => {
  const leaderboardData = [
    {
      name: "HoPpEr",
      subtitle: "ঢা. পলি. ইনস্টি. এর ৭ ই ১৭ 🏆",
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 1,
      points: "220 xp",
      medal: "🥇",
    },
    {
      name: "JARIN TASNIM PRIYA",
      subtitle: "S.M.C",
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 2,
      points: "156 xp",
      medal: "🥈",
    },
    {
      name: "sifat",
      subtitle: "",
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 3,
      points: "153 xp",
      medal: "🥉",
    },
  ]

  return (
    <div className="card">
      <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
        <div>
          <h5 className="card-title mb-0">লিডারবোর্ড</h5>
          <small className="text-muted">iron লীগ</small>
        </div>
        <button className="btn btn-success btn-sm rounded-circle p-2">→</button>
      </div>
      <div className="card-body">
        {leaderboardData.map((user, index) => (
          <div key={index} className="d-flex align-items-center mb-3">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="rounded-circle me-3"
              width="40"
              height="40"
            />
            <div className="flex-grow-1">
              <div className="fw-semibold">{user.name}</div>
              {user.subtitle && <small className="text-muted">{user.subtitle}</small>}
            </div>
            <div className="text-end">
              <div className="d-flex align-items-center">
                <span className="me-2">{user.medal}</span>
                <span className="fw-bold">{user.rank}</span>
              </div>
              <small className="text-muted">{user.points}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
