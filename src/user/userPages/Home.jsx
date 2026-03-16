import React, { useState, useEffect } from "react";
import { data, recipes } from "../data.js";
import { ArrowLeft } from "lucide-react";

/* ── Skeleton loader ── */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-linear-to-r from-stone-200 via-stone-100 to-stone-200 bg-size-[600px_100%] rounded-xl ${className}`} />
);

/* ── Category card ── */
const CatCard = ({ ele, index, onClick }) => (
  <div
    onClick={() => onClick(ele)}
    className="relative rounded-2xl overflow-hidden cursor-pointer aspect-4/3 bg-stone-200 group"
    style={{ animation: `fadeUp 0.5s ${index * 0.07}s ease both` }}
  >
    <img
      src={ele.cover} alt={ele.heading} loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-x-0 bottom-0 pt-7 pb-2 px-3 bg-linear-to-t from-black/70 to-transparent text-white text-sm font-medium tracking-wide">
      {ele.heading}
    </div>
  </div>
);

/* ── Recipe card ── */
const RecipeCard = ({ recipe, index }) => (
  <div
    className="bg-white rounded-[18px] overflow-hidden border border-stone-100 cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    style={{ animation: `fadeUp 0.5s ${0.15 + index * 0.08}s ease both` }}
  >
    <div className="overflow-hidden h-44">
      <img
        src={recipe.image} alt={recipe.name} loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="font-serif text-base font-semibold text-gray-800 truncate mb-1">{recipe.name}</h3>
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">{recipe.category}</p>
      <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm rounded-xl transition-all duration-200">
        View Recipe
      </button>
    </div>
  </div>
);

/* ── Detail view ── */
const DetailView = ({ recipe, onBack }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className="animate-[fadeUp_0.4s_ease_both]">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 mb-6 hover:bg-stone-100 transition"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {!imgLoaded && <Skeleton className="w-full h-80 mb-6" />}
      <img
        src={recipe.cover} alt={recipe.heading}
        onLoad={() => setImgLoaded(true)}
        className={`w-full h-80 object-cover rounded-2xl mb-6 transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0 h-0"}`}
      />

      <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-1">{recipe.heading}</h2>
      <p className="text-sm text-gray-400">Explore our curated collection of {recipe.heading.toLowerCase()} recipes</p>
      <span className="inline-block mt-3 bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1 rounded-lg">
        {recipe.heading}
      </span>
    </div>
  );
};

/* ── Home ── */
const Home = () => {
  const [selected, setSelected] = useState(null);

  if (selected) return <DetailView recipe={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="max-w-6xl mx-auto">
      {/* inject keyframe once */}
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }`}</style>

      <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-5">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {data.map((ele, i) => <CatCard key={ele.id} ele={ele} index={i} onClick={setSelected} />)}
      </div>

      <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-5">Recently Viewed Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recipes.map((r, i) => <RecipeCard key={i} recipe={r} index={i} />)}
      </div>
    </div>
  );
};

export default Home;