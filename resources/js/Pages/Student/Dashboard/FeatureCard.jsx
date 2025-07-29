const FeatureCard = ({ icon, title, bgColor = "primary" }) => {
  return (
    <div className="col-6 col-md-4 mb-3">
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-body text-center p-4">
          <div
            className={`bg-${bgColor} bg-opacity-10 rounded-3 d-inline-flex align-items-center justify-content-center mb-3`}
            style={{ width: "60px", height: "60px" }}
          >
            {icon}
          </div>
          <h6 className="card-title mb-0 fw-semibold">{title}</h6>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
