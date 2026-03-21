import React from "react";

export const DishCard = ({ dish, index, onView }) => (
  <div
    className="bg-white rounded-[18px] overflow-hidden border border-stone-100 cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    style={{ animation: `fadeUp 0.5s ${0.1 + index * 0.07}s ease both`, opacity: 0, animationFillMode: "both" }}
  >
    <div className="overflow-hidden h-44">
      <img
        src={dish.img} alt={dish.name} loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="font-serif text-base font-semibold text-gray-800 truncate mb-1">{dish.name}</h3>
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">{dish.cat}</p>
      <button
        onClick={() => onView(dish)}
        className="w-full py-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-sm rounded-xl transition-all duration-200"
      >
        View Recipe
      </button>
    </div>
  </div>
);