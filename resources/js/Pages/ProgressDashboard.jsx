import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ChevronDown, Play } from "lucide-react";

export default function ProgressDashboard({ progressData }) {
    const [subjectsState, setSubjectsState] = useState(progressData.subjects);

    // Parse remaining days "D:HH"
    const parseRemainingDays = (str) => {
        if (!str) return null;
        const [days, hours] = str.split(":").map(Number);
        return days + hours / 24;
    };

    const formatRemainingTime = (floatDays) => {
        if (floatDays === null) return "--";
        const totalSeconds = Math.floor(floatDays * 24 * 60 * 60);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${days} Days : ${hours} Hours `;
    };

    const toggleLecture = async (subject, chapterName, lectureNumber) => {
        const updatedSubjects = { ...subjectsState };
        const chapter = updatedSubjects[subject].find(ch => ch.chapter === chapterName);
        const lecture = chapter.lectures_list.find(l => l.lecture_number === lectureNumber);
        lecture.status_of_completion = !lecture.status_of_completion;
        setSubjectsState(updatedSubjects);

        try {
            await router.post(route("toggle.lecture"), {
                subject,
                chapter: chapterName,
                lecture_number: lectureNumber,
            }, { preserveScroll: true });
        } catch (error) {
            lecture.status_of_completion = !lecture.status_of_completion;
            setSubjectsState(updatedSubjects);
            console.error("Toggle lecture error:", error);
        }
    };

    const startChapter = async (subject, chapterName) => {
        try {
            await router.post(route("progress.apiStart"), { subject, chapter: chapterName });
            // ✅ CHANGE: Instead of reloading, mark chapter as started locally
            const updatedSubjects = { ...subjectsState };
            const chapter = updatedSubjects[subject].find(ch => ch.chapter === chapterName);
            chapter.remaining_days = chapter.remaining_days || `${chapter.duration_days}:0`; // mark as started
            window.location.reload(); // <-- reloads the page after the chapter is started

            setSubjectsState(updatedSubjects);
        } catch (error) {
            console.error("Failed to start chapter:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-8">
            {/* Dashboard Link */}
            <div className="mb-6 flex items-center gap-2">
                <Link
                    href={route("dashboard")}
                    className="flex items-center justify-center bg-white/70 backdrop-blur-md text-gray-800 text-xl md:text-2xl px-5 py-3 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:bg-white transition-all duration-300"
                >
                    🏠
                </Link>
            </div>

            <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-extrabold text-center mb-10 text-indigo-700 tracking-tight">
                Student Progress Dashboard
            </h2>

            {Object.entries(subjectsState).map(([subject, chapters]) => (
                <div
                    key={subject}
                    className="mb-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-100"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">{subject}</h2>

                    {chapters.map((chapter) => {
                        const remainingDays = parseRemainingDays(chapter.remaining_days);
                        const chapterPercentage = chapter.duration_days > 0 && remainingDays !== null
                            ? ((chapter.duration_days - remainingDays) / chapter.duration_days) * 100
                            : 0;

                        return (
                            <Disclosure key={chapter.chapter} as="div" className="mb-3">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className={`w-full flex justify-between items-center px-5 py-3 rounded-2xl font-medium text-gray-800 transition-all duration-300 shadow-sm border ${open
                                                ? "bg-indigo-50 border-indigo-200"
                                                : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                                                }`}
                                        >
                                            <span>
    <span className="mr-6">{chapter.chapter}</span>
    
</span>
    

                                            {remainingDays === null ? (
                                                <div
                                                    onClick={() => startChapter(subject, chapter.chapter)}
                                                    className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition"
                                                ><span>⏱ Duration: {chapter.duration_days} days || </span>
                                                    <Play className="w-4 h-4" /> Start
                                                </div>
                                            ) : (
                                               <span className="inline-flex items-center gap-2 text-base font-bold text-red-700 bg-gradient-to-r from-red-100 to-red-200 border border-red-300 rounded-full px-4 py-2 shadow-sm">
    ⏳ <span className="tabular-nums tracking-tight">{formatRemainingTime(remainingDays)}</span>
</span>



                                            )}
                                        </Disclosure.Button>

                                        {/* ✅ CHANGE: Show panel even if chapter not started */}
                                        <Disclosure.Panel className="mt-3 bg-white rounded-xl shadow-inner p-4 border border-gray-100">
                                            {remainingDays !== null && (
                                                <>
                                                    {/* Progress Bar */}
                                                    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${chapterPercentage}%` }}
                                                            transition={{ duration: 0.8 }}
                                                            className="h-full bg-gradient-to-r from-red-600 to-red-800 rounded-full shadow-inner"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            {/* Lectures */}
                                            {chapter.lectures_list && (
                                                <div className="space-y-3">
                                                    {chapter.lectures_list.map((lec) => (
                                                        <Disclosure key={lec.lecture_number}>
                                                            {({ open: subOpen }) => (
                                                                <>
                                                                    <Disclosure.Button className="w-full flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-2 border border-gray-200 transition-all text-sm">
                                                                        <div className="flex items-center gap-2">
                                                                            {/* ✅ CHANGE: Show icons as pending if not started */}
                                                                            {remainingDays !== null ? (
                                                                                lec.status_of_completion ? (
                                                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                                                ) : (
                                                                                    <Clock className="w-5 h-5 text-gray-400" />
                                                                                )
                                                                            ) : (
                                                                                <Clock className="w-5 h-5 text-gray-300" />
                                                                            )}
                                                                            <span className="text-gray-800">
                                                                                Lecture {lec.lecture_number}{" "}
                                                                                {remainingDays !== null
                                                                                    ? lec.status_of_completion
                                                                                        ? "(Completed)"
                                                                                        : "(Pending)"
                                                                                    : "(Not started)" /* ✅ CHANGE */}
                                                                            </span>
                                                                        </div>

                                                                        {/* ✅ CHANGE: Only show checkbox if chapter started */}
                                                                        {remainingDays !== null && (
                                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={lec.status_of_completion}
                                                                                    onChange={() =>
                                                                                        toggleLecture(
                                                                                            subject,
                                                                                            chapter.chapter,
                                                                                            lec.lecture_number
                                                                                        )
                                                                                    }
                                                                                    className="sr-only peer"
                                                                                />
                                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
                                                                                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-5 peer-checked:border-indigo-500 transition-all duration-300"></div>
                                                                            </label>
                                                                        )}
                                                                    </Disclosure.Button>

                                                                    <Disclosure.Panel className="p-2 pl-6">
                                                                        <ul className="list-disc list-inside space-y-1 text-blue-600">
                                                                            {lec.links.map((link, i) => (
                                                                                <li key={i}>
                                                                                    <a
                                                                                        href={link}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="hover:underline"
                                                                                    >
                                                                                        {link}
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </Disclosure.Panel>
                                                                </>
                                                            )}
                                                        </Disclosure>
                                                    ))}
                                                </div>
                                            )}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
