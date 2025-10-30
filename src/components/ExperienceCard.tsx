import React from 'react';
import { Link } from 'react-router-dom';
import { Experience } from '../types'; // Assuming types are in src/types.ts

export default function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div
      // Replaced bg-[#F5F5F5], shadow-sm, and inline style with theme classes
      // Using bg-lightGray as it's defined for "cards & panels"
      className="bg-lightGray rounded-2xl shadow-card hover:shadow-md transition-all overflow-hidden hover:-translate-y-1 duration-300 flex flex-col justify-between h-full"
    >
      {/* Image section */}
      <div className="relative w-full h-52">
        <img
          src={exp.imageUrl}
          alt={exp.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Details section */}
      <div
        // Removed inline style, parent div now handles background
        className="p-5 flex flex-col justify-between flex-grow"
      >
        <div>
          <div className="flex items-start justify-between">
            <h3
              // Replaced text-[1.05rem] and text-gray-900 with theme classes
              className="text-card-title font-semibold text-darkText leading-tight"
            >
              {exp.title}
            </h3>
            {exp.city && (
              <span
                // Replaced inline style with new bg-tagBg
                className="text-xs font-medium text-gray-700 px-2.5 py-0.5 rounded-md whitespace-nowrap bg-tagBg"
              >
                {exp.city}
              </span>
            )}
          </div>

          <p
            // Replaced inline style with theme's text-accentGray
            className="text-sm leading-relaxed mt-2 text-accentGray"
          >
            {exp.description ||
              'Curated small-group experience. Certified guide. Safety first with gear included.'}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span
            // Replaced text-gray-900 with theme's text-darkText
            className="text-base font-semibold text-darkText"
          >
            ₹{Math.round(exp.price)}
          </span>

          <Link
            to={`/experience/${exp.id}`}
            // Replaced inline style with bg-brandYellow and text-gray-900 with text-darkText
            className="text-darkText bg-brandYellow px-3.5 py-1.5 rounded-md font-medium text-sm transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}