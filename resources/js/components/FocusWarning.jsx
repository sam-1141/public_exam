import React, { useState, useEffect } from 'react'
import {route} from "ziggy-js";

/**
 * FocusWarning handles anti-cheat focus change warnings.
 * Props:
 *  - maxWarnings (number) default 3
 *  - active (bool) start monitoring when true
 *  - onMaxWarnings (function) called once when limit reached
 */
const FocusWarning = ({
  maxWarnings = 3,
  active = true,
  onMaxWarnings = () => {},
  examId,
}) => {
  const [warningCount, setWarningCount] = useState(0)
  const [lastWarningReason, setLastWarningReason] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogText, setDialogText] = useState('')

  useEffect(() => {
    if (!active) return
    let lastEventAt = 0
    let maxTriggered = false

      const violationData = async () => {
          const response = await axios.post(route('student.live.exam.tab.switch.count', { exam: examId }));
      }

    const triggerWarning = (reason) => {
      const now = Date.now()
      if (now - lastEventAt < 800) return
      lastEventAt = now
        const submitData = violationData();
      setWarningCount(prev => {
        const next = prev + 1
        setLastWarningReason(reason)
        if (next < maxWarnings) {
          setDialogText(`সতর্কবার্তা ${next}/${maxWarnings}: পরীক্ষার সময় ট্যাব পরিবর্তন বা মিনিমাইজ করা যাবে না। আরো ${maxWarnings - next} বার করলে পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হবে।`)
          setShowDialog(true)
        } else if (next === maxWarnings) {
          setDialogText(`সর্বোচ্চ সতর্কবার্তা (${next}/${maxWarnings})! এখনই আপনার পরীক্ষা জমা দেওয়া হবে।`)
          setShowDialog(true)
          if (!maxTriggered) {
            maxTriggered = true
            setTimeout(() => onMaxWarnings(), 1000)
          }
        }
        return next
      })
    }

    const handleVisibility = () => { if (document.hidden) triggerWarning('tab-change') }
    const handleBlur = () => { if (!document.hidden) triggerWarning('window-blur') }

    window.addEventListener('blur', handleBlur)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [active, maxWarnings, onMaxWarnings])

  return (
    <>
      {active && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-2" style={{ zIndex: 1080, maxWidth: 520, width: '100%' }}>
          <div className={`alert mb-0 shadow-sm border-0 ${warningCount > 0 ? 'alert-danger' : 'alert-warning'}`}>
            <div className="d-flex align-items-start">
              <div className="me-2 fs-4">⚠️</div>
              <div className="flex-grow-1">
                {warningCount === 0 && (
                  <>
                    <strong>পরীক্ষার সতর্কতা:</strong>{' '}পরীক্ষার সময় অন্য ট্যাবে যাওয়া, মিনিমাইজ বা ফোকাস হারানো যাবে না। {maxWarnings} বার করলে পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হবে।
                  </>
                )}
                {warningCount > 0 && warningCount < maxWarnings && (
                  <>
                    <strong>সতর্কবার্তা {warningCount}/{maxWarnings}:</strong>{' '}আরও {maxWarnings - warningCount} বার করলে পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হবে।
                    <div className="small text-muted mt-1">কারণ: {lastWarningReason === 'tab-change' ? 'ট্যাব পরিবর্তন / মিনিমাইজ' : 'উইন্ডো ফোকাস হারানো'}</div>
                  </>
                )}
                {warningCount >= maxWarnings && (
                  <>
                    <strong>সর্বোচ্চ সতর্কবার্তা:</strong> আপনার পরীক্ষা জমা দেওয়া হচ্ছে...
                    <div className="small text-muted mt-1">কারণ: {lastWarningReason === 'tab-change' ? 'ট্যাব পরিবর্তন / মিনিমাইজ' : 'উইন্ডো ফোকাস হারানো'}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showDialog && (
        <div>
          <div className="modal-backdrop fade show" style={{ zIndex: 2000 }}></div>
          <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 2001 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-body text-center p-4">
                  <div className="mb-3 fs-1">⚠️</div>
                  <p className="fw-semibold mb-3" style={{ lineHeight: 1.4 }}>{dialogText}</p>
                  {warningCount < maxWarnings && (
                    <button className="btn btn-warning fw-semibold px-4" onClick={() => setShowDialog(false)}>ঠিক আছে</button>
                  )}
                  {warningCount >= maxWarnings && (
                    <button className="btn btn-danger fw-semibold px-4" disabled>জমা হচ্ছে...</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FocusWarning
