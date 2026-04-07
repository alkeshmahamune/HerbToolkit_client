import React from "react";
import { ArrowLeft } from "lucide-react";
import { DishCard } from "./DishCard";

export const CuisineView = ({ cuisine, dishes = [], onSelectDish, onBack }) => {
  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 mb-5 hover:bg-stone-100 transition"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {/* Hero banner */}
      <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 animate-[fadeUp_0.5s_ease_both]">
        <img src={cuisine.cover} alt={cuisine.heading} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <h2 className="font-serif text-3xl font-bold text-white mb-1">{cuisine.heading} Cuisine</h2>
          <p className="text-white/80 text-sm">{dishes.length} recipes to explore</p>
        </div>
      </div>

      {dishes.length === 0 ? (
        <p className="text-sm text-gray-500 py-12 text-center border border-dashed border-stone-200 rounded-2xl">
          No recipes for this cuisine yet. Post a recipe with category &quot;{cuisine.heading}&quot; to see it here.
        </p>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          style={{
            animation: "fadeUp 0.5s 0.15s ease both",
            opacity: 0,
            animationFillMode: "both",
          }}
        >
          {dishes.map((d, i) => (
            <DishCard
              key={d.recipeId || d.name + i}
              dish={d}
              index={i}
              onView={onSelectDish}
            />
          ))}
        </div>
      )}
    </div>
  );
};