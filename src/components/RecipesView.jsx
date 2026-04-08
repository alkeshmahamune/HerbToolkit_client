import React, { useState, useEffect } from "react";
import { Clock, Users, Flame, Bookmark } from "lucide-react";
import axios from "axios";
import { apiUrl, authHeaders } from "../config/api.js";

const RecipesView = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedStates, setSavedStates] = useState({});

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

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const headers = authHeaders();
        if (!headers.Authorization) return;
        const response = await axios.get(apiUrl("/api/recipes/personalized"), { headers });
        if (response.data?.success) {
          setRecipes(response.data.recipes || []);
        }
      } catch (error) {
        console.error("Failed to fetch personalized recipes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleSave = async (recipeId) => {
    try {
      const headers = authHeaders();
      const isSaved = savedStates[recipeId];
      if (isSaved) {
        await axios.delete(apiUrl(`/api/recipes/save/${recipeId}`), { headers });
        setSavedStates((prev) => ({ ...prev, [recipeId]: false }));
      } else {
        await axios.post(apiUrl("/api/recipes/save"), { recipeId, source: "uploadedRecipe" }, { headers });
        setSavedStates((prev) => ({ ...prev, [recipeId]: true }));
      }
    } catch (error) {
      console.error("Failed to save/unsave recipe", error);
    }
  };

  // logic for full recipe view
  const [recipeView, setRecipeView] = useState(null);

  if (loading) {
    return <div className="text-center py-8">Loading personalized recipes...</div>;
  }

  return (
    <div className="relative">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Personalized Recipes
      </h2>
      <div
        className={`w-full flex flex-wrap justify-start gap-8 items-center ${recipeView !== null ? "blur-xs flex" : ""}`}
      >
        {recipes.map((ele, idx) => (
          <div
            key={ele.id || idx}
            className="bg-white w-87.5 rounded-2xl border border-stone-200 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg px-5 py-5"
            style={{
              animationName: "fadeUp",
              animationDuration: "0.45s",
              animationDelay: `${0.7 + idx * 0.1}s`,
              animationTimingFunction: "ease",
              animationFillMode: "both",
            }}
          >
            {/* ── Top content ── */}
            <div className="pb-0">
              {/* Badge row */}
              <div className="flex items-center justify-between mb-3.5">
                <span
                  className={`text-[11px] font-medium uppercase tracking-wide px-2.5 py-1 rounded-full ${
                    cuisineBadge[ele.cat] ?? "bg-stone-100 text-stone-600"
                  }`}
                >
                  {ele.cat}
                </span>
                <button
                  onClick={() => handleSave(ele.id)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
              ${savedStates[ele.id] ? "bg-amber-50 border-amber-300" : "border-stone-200 hover:bg-stone-50"}`}
                >
                  <Bookmark
                    size={14}
                    fill={savedStates[ele.id] ? "#f59e0b" : "none"}
                    stroke={savedStates[ele.id] ? "#f59e0b" : "#a8a29e"}
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
                <Flame size={13} className="text-stone-400" /> {ele.benefit}
              </span>
            </div>
            {/* tags section */}
            <div className="flex gap-1.5 flex-wrap mb-4">
              {ele.herbs?.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-stone-600 bg-stone-100 rounded-md px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-sm rounded-xl transition-all duration-200 cursor-pointer"
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
              {recipes[recipeView].title}
            </h2>
            <hr className="my-3 text-gray-300" />
            <p>{recipes[recipeView].desc}</p>
            <h2 className="py-5 font-semibold">
              Ingredients:
              <span className="flex gap-1.5 flex-wrap mb-1">
                {recipes[recipeView].herbs?.map((tag, idx) => (
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
              {recipes[recipeView].steps?.map((step, i) => (
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
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded"
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

export default RecipesView;
