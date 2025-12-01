// components/TitleSlot.jsx
import React from "react";

const TitleSlot = ({
  logoSrc = "/assets/images/logo/title.png",
  logoAlt = "Logo",
  headline = "#One Mission, One Goal",
  subtitle = "",
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-6">
      {/* Logo Section */}
      <div className="mb-4 flex justify-center">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="
            w-[55vw]           /* larger on mobile */
            max-w-[200px]      /* slightly larger cap for small devices */
            sm:w-[45vw]
            sm:max-w-[220px]
            md:w-[35vw]
            md:max-w-[240px]
            lg:max-w-[260px]
            object-contain
            transition-all
            duration-300
          "
        />
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <h3 className="text-lg sm:text-xl font-medium text-gray-600 mb-2 text-center">
          {subtitle}
        </h3>
      )}

      {/* Headline */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center leading-snug">
        {headline.split(",").map((part, idx) => (
          <span
            key={idx}
            className={idx === 0 ? "text-indigo-600" : "text-indigo-500"}
          >
            {part.trim()}
            {idx === 0 ? "," : ""}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TitleSlot;
