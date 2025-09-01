import Layout from "../../../../layouts/Layout"
import { router } from "@inertiajs/react"

const ExamSuccessPage = () => {

  const handleBackToHome = () => {
  router.visit(route('student.live.exam.list'), {
    method: 'get',
    preserveState: false,
    replace: true
  });
}

  return (
    <div className=" bg-light d-flex align-items-center justify-content-center font-baloo">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card border-0 shadow-lg">
              <div className="card-body text-center py-5">
                <div className="mb-4">
                  <div
                    className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <span className="fs-1">✅</span>
                  </div>
                  <h3 className="fw-bold text-success mb-3">অংশগ্রহণের জন্য ধন্যবাদ!</h3>
                  <p className="text-muted mb-4">আপনার উত্তরপত্র সফলভাবে জমা হয়েছে।</p>
                  <div className="bg-light rounded-3 p-3 mb-4">
                    {/* <h6 className="fw-semibold mb-2">{exam.name}</h6> */}
                    <small className="text-muted">ফলাফলের জন্য অপেক্ষা করুন</small>
                  </div>
                </div>

                <button className="btn btn-primary px-4 py-2 fw-semibold" onClick={handleBackToHome}>
                  হোমে ফিরে যান
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ExamSuccessPage.layout = (page) => <Layout children={page} />
export default ExamSuccessPage