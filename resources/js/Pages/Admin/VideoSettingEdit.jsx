import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function VideoSettingEdit({ setting }) {
  const [form, setForm] = useState({
    title: setting?.title || "",
    video_url: setting?.video_url || "",
    message: setting?.message || "",
    purchase_link: setting?.purchase_link || "",
    deadline: setting?.deadline || "",
    exam_description_bn: setting?.exam_description_bn || "",
    exam_url: setting?.exam_url || "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
  e.preventDefault();
  setErrors({});

  router.post(route("store.video.settings"), form, {
    onError: (errors) => setErrors(errors),
    onSuccess: () => {
      alert("✅ Video settings updated successfully!");
    },
  });
};


  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🎥 Update Video Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-semibold mb-1">Video URL</label>
          <input
            type="text"
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="https://youtube.com/watch?v=..."
            required
          />
          {errors.video_url && (
            <p className="text-red-500 text-sm mt-1">{errors.video_url}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold mb-1">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border p-2 rounded h-24 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Optional message"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Purchase Link */}
        <div>
          <label className="block text-sm font-semibold mb-1">Purchase Link</label>
          <input
            type="text"
            value={form.purchase_link}
            onChange={(e) =>
              setForm({ ...form, purchase_link: e.target.value })
            }
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="https://example.com"
          />
          {errors.purchase_link && (
            <p className="text-red-500 text-sm mt-1">{errors.purchase_link}</p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-semibold mb-1">Deadline</label>
          <input
            type="datetime-local"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
          )}
        </div>

        {/* Exam Description (Bangla HTML) */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Exam Description (Bangla HTML)
          </label>
          <textarea
            value={form.exam_description_bn}
            onChange={(e) =>
              setForm({ ...form, exam_description_bn: e.target.value })
            }
            className="w-full border p-2 rounded h-32 focus:outline-none focus:ring focus:ring-blue-300 font-[SolaimanLipi]"
            placeholder="বাংলা বর্ণনা HTML ফরম্যাটে লিখুন"
          />
          {errors.exam_description_bn && (
            <p className="text-red-500 text-sm mt-1">
              {errors.exam_description_bn}
            </p>
          )}
        </div>

        {/* Exam URL */}
        <div>
          <label className="block text-sm font-semibold mb-1">Exam URL</label>
          <input
            type="text"
            value={form.exam_url}
            onChange={(e) => setForm({ ...form, exam_url: e.target.value })}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="https://example.com/exam"
          />
          {errors.exam_url && (
            <p className="text-red-500 text-sm mt-1">{errors.exam_url}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Save
        </button>
       <form method="POST" action={route("auth.logout")}>
    <input
        type="hidden"
        name="_token"
        value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')}
    />

    <button
        type="submit"
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
    >
        Logout
    </button>
</form>


      </form>
    </div>
  );
}
