import React, { useState } from "react";
import { router, Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function AdminLectures({ lectures }) {
    const [lectureList, setLectureList] = useState(lectures || []);
    const [editingId, setEditingId] = useState(null);
    const [editedLink, setEditedLink] = useState("");

    const handleEdit = (lecture) => {
        setEditingId(lecture.id);
        setEditedLink(lecture.lecture_link);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedLink("");
    };

    const handleSave = (lecture) => {
        if (!editedLink) {
            alert("Link cannot be empty");
            return;
        }

        router.post(
            route("admin.lectures.store"),
            {
                chapter: lecture.chapter,
                lecture_number: lecture.lecture_number,
                lecture_link: editedLink,
            },
            {
                onSuccess: () => {
                    // Update the frontend immediately
                    const updated = lectureList.map((l) =>
                        l.id === lecture.id
                            ? { ...l, lecture_link: editedLink }
                            : l
                    );
                    setLectureList(updated);
                    setEditingId(null);
                    setEditedLink("");
                },
                onError: (errors) => {
                    console.error(errors);
                    alert("Link is not valid url");
                },
            }
        );
    };

    const handleDelete = (lectureId) => {
        if (!confirm("Are you sure you want to delete this lecture?")) return;

        router.delete(route("admin.lectures.destroy", lectureId), {
            preserveScroll: true,
            onSuccess: () => {
                setLectureList((prev) =>
                    prev.filter((l) => l.id !== lectureId)
                );
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-6 flex items-center gap-2">
                <Link
                    href={route("dashboard")}
                    className="flex items-center justify-center bg-white bg-opacity-90 text-gray-800 text-xl md:text-2xl px-5 py-3 rounded-full shadow-lg border border-transparent hover:bg-opacity-100 transition-all duration-300"
                >
                    🏠
                </Link>
            </div>

            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
                Admin Lecture Table
            </h2>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-indigo-100 text-indigo-700">
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Chapter</th>
                            <th className="px-4 py-2 border">Lecture Number</th>
                            <th className="px-4 py-2 border">Lecture Link</th>
                            <th className="px-4 py-2 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lectureList.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No lectures found.
                                </td>
                            </tr>
                        ) : (
                            lectureList.map((lecture) => (
                                <tr key={lecture.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{lecture.id}</td>
                                    <td className="px-4 py-2 border">{lecture.chapter}</td>
                                    <td className="px-4 py-2 border text-center">
                                        {lecture.lecture_number}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {editingId === lecture.id ? (
                                            <input
                                                type="url"
                                                value={editedLink}
                                                onChange={(e) => setEditedLink(e.target.value)}
                                                className="border rounded p-1 w-full"
                                            />
                                        ) : (
                                            <a
                                                href={lecture.lecture_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                {lecture.lecture_link || "—"}
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {editingId === lecture.id ? (
                                            <>
                                                <button
                                                    onClick={() => handleSave(lecture)}
                                                    className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(lecture)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                                                >
                                                    Edit
                                                </button>
                                                
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
