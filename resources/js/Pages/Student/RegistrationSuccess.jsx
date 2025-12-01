import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import TitleSlot from "../authentication/TitleSlot";

const RegistrationSuccess = ({ registration }) => {
    const [copied, setCopied] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(registration.unique_key_hscmap26)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
                alert("Failed to copy. Please copy manually.");
            });
    };

    const handleDownloadAdmit = () => {
        router.visit(`/admit-card`);
    };

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-50 p-4 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center">
                <TitleSlot />

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 rounded-full p-4">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h1>

                {/* User Name */}
                <p className="text-gray-600 text-lg mb-6">
                    অভিনন্দন!, <span className="font-semibold">{registration.name}</span>, আপনার রেজিস্ট্রেশন সম্পন্ন হয়েছে।
                </p>

                {/* Unique Key */}
                <div
                    className="bg-gray-50 border-2 border-blue-300 p-6 sm:p-8 rounded-2xl w-full cursor-pointer hover:bg-blue-50 transition duration-200 shadow-md"
                    onClick={copyToClipboard}
                >
                    <p className="text-gray-700 font-medium mb-2 text-lg tracking-wide">Your Registration No:</p>
                    <p className="text-4xl sm:text-5xl font-extrabold text-blue-700 font-mono tracking-widest select-all break-all">
                        {registration.unique_key_hscmap26}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">{copied ? "Copied!" : "Click to copy"}</p>
                </div>


                {/* Download Admit Card Button */}
                <button
                    onClick={handleDownloadAdmit}
                    className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
                >
                    View / Download Admit Card
                </button>

                {/* Note */}
                <p className="text-gray-500 text-sm mt-8">
                    অনুগ্রহ করে এই রেজিস্ট্রেশন নম্বর এবং ডাউনলোড করা অ্যাডমিট কার্ডটি নিরাপদ ও গোপন রাখুন। নির্ধারিত তারিখে পরীক্ষায় অংশগ্রহণের জন্য এটি প্রয়োজন হবে।
                </p>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
