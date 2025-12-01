import { motion } from "framer-motion";
import Head from "./Head";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Head />

            <main className="max-w-6xl mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {/* Card 1 */}
                    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="text-lg font-semibold text-gray-800">
                            📘 Syllabus Calculator
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            তোমার আসন্ন পরীক্ষার ভিত্তিতে সিলেবাসের পরিকল্পনা নির্ণয় করো।
                        </p>
                        <a
                            href="/calculator"
                            className="inline-block mt-4 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Open Calculator
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="text-lg font-semibold text-gray-800">
                            📅 Study Progress
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            প্রতিদিনের পড়াশোনার সম্পূর্ণ অগ্রগতি পর্যবেক্ষণ করো এবং তোমার সব বিষয়ভিত্তিক কার্যক্রম  ট্র্যাক রাখো।
                        </p>
                        <a
                            href="/progress"
                            className="inline-block mt-4 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            
                            See Progress
                        </a>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="text-lg font-semibold text-gray-800">
                            📊 Analytics
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            Visualize your performance and upcoming study goals.
                        </p>
                        <button
                            disabled
                            className="mt-4 px-4 py-2 text-sm bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
                        >
                            Coming Soon
                        </button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
