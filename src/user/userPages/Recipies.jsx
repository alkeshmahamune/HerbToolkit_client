import React from "react";
import { Clock, Users, Flame, Bookmark } from "lucide-react";
import { useState } from "react";
import { textRecipes } from "../../data/userData";

const Recipies = () => {
  const difficultyStyle = {
    Easy: "bg-green-50 text-green-800",
    Medium: "bg-amber-50 text-amber-800",
    Hard: "bg-rose-50 text-rose-800",
  };

  const cuisineBadge = {
    Indian: "bg-amber-50 text-amber-900",
    Italian: "bg-pink-50 text-pink-900",
    Japanese: "bg-sky-50 text-sky-900",
    Mexican: "bg-green-50 text-green-900",
    Chinese: "bg-yellow-50 text-yellow-900",
    Korean: "bg-purple-50 text-purple-900",
    Asian: "bg-emerald-50 text-emerald-900",
    Continental: "bg-slate-100 text-slate-700",
  };
  const [saved, setSaved] = useState(false);

  // logic for full recipe view
  const [recipeView, setRecipeView] = useState(null);
  console.log(recipeView);
  return (
    <div className="relative">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Personalized Recipes
      </h2>
      <div
        className={`w-full flex flex-wrap justify-start gap-8 items-center ${recipeView !== null ? "blur-xs flex" : ""}`}
      >
        {textRecipes.map((ele, idx) => (
          <div
            className="bg-white w-87.5 rounded-2xl border border-stone-200 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg px-5 py-5"
            style={{
              animation: `fadeUp 0.45s 0.7s ease both`,
              opacity: 0,
              animationFillMode: "both",
            }}
          >
            {/* ── Top content ── */}
            <div className="pb-0">
              {/* Badge row */}
              <div className="flex items-center justify-between mb-3.5">
                <span
                  className={`text-[11px] font-medium uppercase tracking-wide px-2.5 py-1 rounded-full ${
                    cuisineBadge[ele.cuisine] ?? "bg-stone-100 text-stone-600"
                  }`}
                >
                  {ele.cuisine}
                </span>
                <button
                  onClick={() => setSaved((s) => !s)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
              ${saved ? "bg-amber-50 border-amber-300" : "border-stone-200 hover:bg-stone-50"}`}
                >
                  <Bookmark
                    size={14}
                    fill={saved ? "#f59e0b" : "none"}
                    stroke={saved ? "#f59e0b" : "#a8a29e"}
                  />
                </button>
              </div>
            </div>
            {/* title row */}
            <h3 className="roboto text-[18px] font-semibold text-stone-900 leading-snug mb-2">
              {ele.title}
            </h3>
            <p className="poppins text-[12px]">{ele.desc}</p>
            <hr className="my-3 text-gray-400" />
            <div className="flex items-center gap-3.5 flex-wrap mb-4">
              <span className="flex items-center gap-1.5 text-[12px] text-stone-500">
                <Clock size={13} className="text-stone-400" /> {ele.time}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-stone-500">
                <Users size={13} className="text-stone-400" /> {ele.serving}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-stone-500">
                <Flame size={13} className="text-stone-400" /> {ele.cal}
              </span>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${difficultyStyle[ele.difficulty]}`}
              >
                {ele.difficulty}
              </span>
            </div>
            {/* tags section */}
            <div className="flex gap-1.5 flex-wrap mb-4">
              {ele.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-stone-600 bg-stone-100 rounded-md px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="w-full py-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm rounded-xl transition-all duration-200 cursor-pointer"
              onClick={() => setRecipeView(idx)}
            >
              View Recipe
            </button>
          </div>
        ))}
      </div>
      {recipeView !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20">
          {/* Modal box */}
          <div className="w-200 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-black text-2xl text-center font-bold google-sans">
              {textRecipes[recipeView].title}
            </h2>
            <hr className="my-3 text-gray-300" />
            <p>{textRecipes[recipeView].desc}</p>
            <h2 className="py-5 font-semibold">
              Ingredients:
              <span className="flex gap-1.5 flex-wrap mb-1">
                {textRecipes[recipeView].tags.map((tag, idx) => (
                  <span
                    key={idx + 102}
                    className="text-[11px] my-2 font-medium text-stone-600 bg-stone-100 rounded-md px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </h2>
            <h2 className="font-semibold my-3">Steps:</h2>
            <div className="flex flex-col gap-2.5 mb-5">
              {textRecipes[recipeView].steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-[14px] text-stone-600 leading-relaxed"
                >
                  <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-semibold text-stone-500 shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded"
              onClick={() => setRecipeView(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipies;
