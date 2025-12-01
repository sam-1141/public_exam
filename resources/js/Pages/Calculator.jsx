import { useState, useEffect } from "react";
import { useForm, usePage, Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Pages/Student/Header";

export default function Calculator({ subjects }) {
    const { props } = usePage();
    const result = props.flash?.result;

    const { post } = useForm();
    const [selected, setSelected] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [confirmCallback, setConfirmCallback] = useState(null); // ✅ callback after clearing

    const toggleChapter = (subject, chapter, data) => {
        setSelected((prev) => {
            const copy = { ...prev };
            if (!copy[subject]) copy[subject] = {};
            if (copy[subject][chapter]) {
                delete copy[subject][chapter];
            } else {
                copy[subject][chapter] = data;
            }
            return { ...copy };
        });
    };

    // ✅ Fresh start logic with optional callback
    const handleFreshStart = (callback) => {
        post(route("fresh-start"), {
            onSuccess: () => {
                setShowConfirm(false);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    if (callback) callback(); // run callback after clearing
                }, 1000);
            },
        });
    };

    // ✅ Calculate button click
    const handleDirectCalculate = (e) => {
    e.preventDefault();

    router.post(
        route("calculator.calculate"),
        { selected },
        {
            forceFormData: false,
            onSuccess: () => console.log("Calculation done!"),
        }
    );
};


    // ✅ Allow Esc key to close modal
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && setShowConfirm(false);
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 relative"
                >
                    {/* 🔹 Header Row */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-indigo-600 text-center md:text-left">
                            📘 Syllabus Calculator
                        </h1>

                        <div className="flex items-center gap-3">
                            <Link
                                href={route("dashboard")}
                                method="get"
                                className="text-2xl hover:text-indigo-600 transition"
                                title="Go to Dashboard"
                            >
                                <span role="img" aria-label="dashboard">🏠</span>
                            </Link>

                            <button
                                onClick={() => handleFreshStart()}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition"
                                title="Clear all progress"
                            >
                                🔁 Start Fresh
                            </button>
                        </div>
                    </div>

                    {/* ✅ Form */}
                    <form className="space-y-6">
                        {Object.entries(subjects).map(([subject, chapters]) => (
                            <div key={subject}>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{subject}</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Object.entries(chapters).map(([chapter, info]) => {
                                        const isSelected =
                                            selected[subject] && selected[subject][chapter];
                                        return (
                                            <motion.button
                                                type="button"
                                                key={chapter}
                                                onClick={() => toggleChapter(subject, chapter, info)}
                                                whileHover={{ scale: 1.03 }}
                                                className={`p-3 rounded-lg border transition ${
                                                    isSelected
                                                        ? "bg-indigo-500 text-white border-indigo-600"
                                                        : "bg-white border-gray-300 text-gray-800 hover:bg-indigo-50"
                                                }`}
                                            >
                                                <div className="font-medium">{chapter}</div>
                                                <div className="text-xs opacity-80">
                                                    🎓 {info.lectures} lectures • ⏱ {info.duration_days} days
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className="text-center">
                            <button
    type="submit"
    onClick={handleDirectCalculate} // <-- call direct calculation
    className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
>
    Create Your Study Plan
</button>

                        </div>
                    </form>

                    {/* ✅ Result Box */}
                    {result && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 text-center p-4 bg-green-50 border border-green-200 rounded-xl"
                        >
                            <h3 className="text-xl font-semibold text-green-700">Result</h3>
                            <p className="text-gray-700 mt-2">
                                Total Lectures: <b>{result.lectures}</b>
                            </p>
                            <p className="text-gray-700">
                                Estimated Duration: <b>{result.days}</b> days
                            </p>
                        </motion.div>
                    )}

                    {/* 🧊 Confirmation Modal */}
                    <AnimatePresence>
                        {showConfirm && (
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                                    onClick={() => setShowConfirm(false)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                ></motion.div>

                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="relative bg-white rounded-2xl shadow-2xl p-6 w-80 text-center border border-gray-200"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                        Confirm Reset
                                    </h2>
                                    <p className="text-gray-600 mb-6 text-sm">
                                        This will permanently clear your progress.
                                        Are you sure you want to continue?
                                    </p>

                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => setShowConfirm(false)}
                                            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleFreshStart(confirmCallback)}
                                            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition"
                                        >
                                            Yes, Clear
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 🎉 Success Toast */}
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ duration: 0.4 }}
                                className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 z-50"
                            >
                                ✅ Progress cleared! Do a Fresh Start
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    );
}
