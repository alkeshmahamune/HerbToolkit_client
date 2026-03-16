import React from "react";

export const CuisineCard = ({ cuisine, index, onClick }) => (
  <div
    onClick={() => onClick(cuisine)}
    className="relative rounded-2xl overflow-hidden cursor-pointer aspect-3/4 bg-stone-200 group shrink-0 w-36 sm:w-auto"
    style={{ animation: `fadeUp 0.5s ${index * 0.06}s ease both`, opacity: 0, animationFillMode: "both" }}
  >
    <img
      src={cuisine.cover} alt={cuisine.heading} loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    {/* dark gradient overlay */}
    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-3">
      <p className="text-white text-sm font-semibold leading-tight">{cuisine.heading}</p>
    </div>
  </div>
);