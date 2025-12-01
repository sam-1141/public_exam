import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { router } from "@inertiajs/react";
import TitleSlot from "../authentication/TitleSlot";

const AdmitCard = ({ registration, exam, examInfoUrl, reg_link, promo_page }) => {
  const cardRef = useRef();

  const handleDownload = async () => {
    try {
      const element = cardRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = { width: canvas.width, height: canvas.height };
      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`${registration.unique_key_hscmap26}_AdmitCard.pdf`);

      router.get(route("student.video"));
    } catch (err) {
      console.error("handleDownload error:", err);
      alert("PDF তৈরিতে সমস্যা হয়েছে — কনসোলে দেখুন।");
    }
  };

  const isValid = (field) => field && field.toString().trim() !== "";

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div ref={cardRef} className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10 border border-gray-300">
        <div className="text-center mb-8">
          <TitleSlot />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 shadow-sm p-5 rounded-lg border border-gray-200">
          {/* Left Column */}
          <div className="space-y-3">
            {isValid(registration.name) && (
              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 font-semibold text-gray-600 truncate">Name</span>
                <span className="flex-1 text-gray-900 break-words">{registration.name}</span>
              </div>
            )}
            {isValid(registration.mobile) && (
              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 font-semibold text-gray-600 truncate">Mobile No</span>
                <span className="flex-1 text-gray-900 break-words">+{registration.mobile}</span>
              </div>
            )}
            {isValid(registration.email) && (
              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 font-semibold text-gray-600 truncate">E-Mail</span>
                <span className="flex-1 text-gray-900 break-words">{registration.email}</span>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {isValid(registration.college) && (
              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 font-semibold text-gray-600 truncate">College</span>
                <span className="flex-1 text-gray-900 break-words">{registration.college}</span>
              </div>
            )}
            {isValid(registration.Hsc_Batch) && (
              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 font-semibold text-gray-600 truncate">HSC Batch</span>
                <span className="flex-1 text-gray-900 break-words">{registration.Hsc_Batch.slice(4)}</span>
              </div>
            )}
            {isValid(registration.address) && (
              <div className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 font-semibold text-gray-600 truncate">Address</span>
                <span className="flex-1 text-gray-900 break-words">{registration.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Exam Roll */}
        <div className="mt-10 text-center">
          <p className="text-lg font-semibold text-gray-700">পরীক্ষার রোল নম্বর:</p>
          <p className="text-4xl sm:text-5xl font-extrabold text-blue-800 font-mono tracking-widest mt-2">{registration.unique_key_hscmap26}</p>
        </div>

        {/* Exam Info */}
        {exam && (
          <div className="mt-10 border-t pt-6 text-gray-700 space-y-6 text-center">
            {isValid(exam.title) && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">📅 পরীক্ষার তারিখ:</h2>
                <a href={exam.tttle} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 font-semibold bg-blue-50 px-3 py-1 rounded-md inline-block break-keep leading-relaxed" style={{ wordBreak: "keep-all", whiteSpace: "normal" }}>
                  {exam.title}
                </a>
              </div>
            )}
            {isValid(examInfoUrl) && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">𝞹📈 পরীক্ষার লিংক:</h2>
                <a href={examInfoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{examInfoUrl}</a>
              </div>
            )}
            {isValid(promo_page) && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">🎓 Hsc 26 Mission A+ (কোর্স লিংক):</h2>
                <a href={promo_page} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline break-all">{promo_page}</a>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500 space-y-1">
          <p>আপনার রেজিস্ট্রেশন নম্বর গোপন 🗝️ রাখুন।</p>
          <p>নির্ধারিত দিনে পরীক্ষায় অংশগ্রহণের জন্য এটি প্রয়োজন হবে।</p>
          {isValid(reg_link) && (
            <a href={reg_link} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800 text-sm mt-3 break-all">
              <span className="font-semibold text-gray-800">📜 Registration Link:</span> {reg_link}
            </a>
          )}
        </div>
      </div>

      {/* Download Button */}
      <button onClick={handleDownload} className="mt-6 px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition duration-200 flex items-center gap-2">
        <span>⤓ PDF ডাউনলোড করুন</span>
      </button>
    </div>
  );
};

export default AdmitCard;
