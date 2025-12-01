import React from "react";
import { usePage } from "@inertiajs/react";
import TitleSlot from "../authentication/TitleSlot";
import Header from "./Header";

export default function Hsc26Video() {
  const { videoUrl, title, message, purchase_link } = usePage().props;

  // Extract YouTube Video ID
  const videoId = videoUrl?.split("v=")[1]?.split("&")[0];

  if (!videoId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600 font-semibold text-center p-4">
        ⚠️ Invalid YouTube link provided.
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&autoplay=1`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center px-2 md:px-6 py-4 overflow-hidden">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">


        {/* Title Slot */}
        <div className="bg-gray-50 border-b">
          <TitleSlot />
        </div>

        {/* Video Title */}
        {/* {title && (
          <h1 className="text-2xl md:text-3xl font-bold text-center py-5 text-gray-800 tracking-tight">
            {title}
          </h1>
        )} */}

        {/* Video Player */}
        <div className="relative w-full aspect-video">
          <iframe
            src={embedUrl}
            title="YouTube video player"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0 rounded-b-3xl"
          ></iframe>
        </div>
        {/* Message Section */}
        {message && (
  <div className="px-6 py-6 border-t bg-gray-50 text-center">
    <p
      className="text-gray-700 text-lg leading-relaxed whitespace-pre-line font-medium"
      style={{ wordBreak: "break-word" }}
    >
      {message}
    </p>
  </div>
)}


        {/* Purchase Button */}
        {purchase_link && (
          <div className="px-6 py-8 text-center bg-gray-50 rounded-b-2xl">
            {/* Prominent Label above button */}
            <p className="text-lg md:text-xl font-bold text-blue-600 uppercase tracking-wide mb-3">
              Join Now
            </p>

            {/* Button */}
            <a
              href={purchase_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full text-lg md:text-xl font-semibold shadow-lg transition-transform transform hover:scale-105"
            >
              Hsc Mission A+
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
