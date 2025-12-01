import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function AdmitCardModal({ data, onClose }) {
  const downloadPDF = async () => {
    const element = document.getElementById("admit-card");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`AdmitCard_${data.unique_key_hscmap26}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>

        <div id="admit-card" className="p-4 border border-gray-300 rounded-lg bg-white">
          <h2 className="text-center text-2xl font-bold mb-4">Admit Card</h2>
          <p className="text-center mb-2 font-semibold">Exam Roll: {data.unique_key_hscmap26}</p>
          <div className="space-y-2">
            <div><strong>Name:</strong> {data.name}</div>
            <div><strong>Mobile:</strong> {data.mobile}</div>
            <div><strong>Email:</strong> {data.email}</div>
            <div><strong>College:</strong> {data.college}</div>
            <div><strong>EIIN:</strong> {data.eiin}</div>
            <div><strong>Course:</strong> {data.course}</div>
            <div><strong>Feedback:</strong> {data.feedback || "N/A"}</div>
            <div><strong>HSC26 Mission:</strong> {data.hsc26Mission ? "Yes" : "No"}</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
