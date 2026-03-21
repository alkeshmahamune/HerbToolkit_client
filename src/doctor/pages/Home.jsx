import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { catData, data, indianDishes, recipes } from "../../data/userData";
import { DishCard } from "../../components/DishCard";
import { CuisineCard } from "../../components/CuisineCard";
import { CuisineView } from "../../components/CuisineView";
import { VideoView } from "../../components/VideoView";
import { motion } from "framer-motion";

/* ── Category card ── */
const CatCard = ({ cat, onClick }) => (
  <div
    onClick={() => onClick(cat)}
    className="relative rounded-2xl overflow-hidden cursor-pointer aspect-4/3 bg-stone-200 group"
  >
    <img
      src={cat.cover}
      alt={cat.heading}
      loading="lazy"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-x-0 bottom-0 pt-7 pb-2 px-3 bg-linear-to-t from-black/70 to-transparent text-white text-sm font-medium">
      {cat.heading}
    </div>
  </div>
);

/* ── Category detail (meal type → Indian dishes) ── */
const CategoryView = ({ cat, onSelectDish, onBack }) => {
  const dishes = indianDishes[cat.id] || [];
  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 mb-5 hover:bg-stone-100 transition"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <img
        src={cat.cover}
        alt={cat.heading}
        className="w-full h-52 object-cover rounded-2xl mb-5"
      />

      <div className="mb-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-1">
          {cat.heading}
        </h2>
        <p className="text-sm text-gray-400 mb-2">
          Authentic Indian {cat.heading.toLowerCase()} recipes
        </p>
        <span className="inline-block bg-teal-50 text-teal-600 text-xs font-medium px-3 py-1 rounded-lg">
          {dishes.length} Recipes
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dishes.map((d, i) => (
          <DishCard key={i} dish={d} index={i} onView={onSelectDish} />
        ))}
      </div>
    </div>
  );
};

/* ── Home page ── */
const Home = () => {
  // "home" | "category" | "cuisine" | "video"
  const [view, setView] = useState("home");
  const [selCat, setSelCat] = useState(null);
  const [selCuisine, setSelCuisine] = useState(null);
  const [selDish, setSelDish] = useState(null);

  const openDish = (dish) => {
    setSelDish(dish);
    setView("video");
  };
  const goBack = () => {
    if (view === "video") {
      setSelDish(null);
      setView(selCat ? "category" : selCuisine ? "cuisine" : "home");
    }
    if (view === "category") {
      setSelCat(null);
      setView("home");
    }
    if (view === "cuisine") {
      setSelCuisine(null);
      setView("home");
    }
  };

  /* ── Video view ── */
  if (view === "video")
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <VideoView dish={selDish} onBack={goBack} />
        </motion.div>
      </div>
    );

  /* ── Category detail ── */
  if (view === "category")
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
        <CategoryView cat={selCat} onSelectDish={openDish} onBack={goBack} />
        </motion.div>
      </div>
    );

  /* ── Cuisine detail ── */
  if (view === "cuisine")
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
        <CuisineView
          cuisine={selCuisine}
          onSelectDish={openDish}
          onBack={goBack}
        />
          </motion.div>
      </div>
    );

  /* ── Home ── */
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          

      {/* ── 1. Categories (meal type) ── */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {catData.map((c) => (
          <CatCard
            key={c.id}
            cat={c}
            onClick={(cat) => {
              setSelCat(cat);
              setView("category");
            }}
          />
        ))}
      </div>

      {/* ── 2. Cuisines ── */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Explore by Cuisine
      </h2>

      {/* Scrollable row on mobile, grid on desktop */}
      <div className="flex gap-3 overflow-x-auto pb-3 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-8 mb-10 scrollbar-hide">
        {data.map((c, i) => (
          <CuisineCard
            key={c.id}
            cuisine={c}
            index={i}
            onClick={(cuisine) => {
              setSelCuisine(cuisine);
              setView("cuisine");
            }}
          />
        ))}
      </div>

      {/* ── 3. Recently Viewed ── */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Recently Viewed Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recipes.map((r, i) => (
          <DishCard
            key={i}
            index={i}
            dish={{ name: r.name, cat: r.category, img: r.image, ...r }}
            onView={openDish}
          />
        ))}
      </div>
      </motion.div>
    </div>
  );
};

export default Home;
