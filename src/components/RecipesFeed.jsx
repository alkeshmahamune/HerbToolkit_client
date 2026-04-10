import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { catData, data } from "../data/userData";
import { DishCard } from "./DishCard";
import { CuisineCard } from "./CuisineCard";
import { CuisineView } from "./CuisineView";
import { VideoView } from "./VideoView";
import { motion } from "framer-motion";
import axios from "axios";
import { apiUrl, authHeaders } from "../config/api.js";
import { apiRecipeToDish, bucketRecipes } from "../utils/homeRecipeBuckets.js";

const REFRESH_EVENT = "herb-recipes-refresh";

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

const CategoryView = ({ cat, dishes = [], onSelectDish, onBack }) => (
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
        Recipes tagged as {cat.heading}
      </p>
      <span className="inline-block bg-teal-50 text-teal-600 text-xs font-medium px-3 py-1 rounded-lg">
        {dishes.length} Recipes
      </span>
    </div>

    {dishes.length === 0 ? (
      <p className="text-sm text-gray-500 py-12 text-center border border-dashed border-stone-200 rounded-2xl">
        No recipes in this category yet. Post a recipe with category &quot;{cat.heading}&quot; to see it here.
      </p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dishes.map((d, i) => (
          <DishCard
            key={d.recipeId || `${d.name}-${i}`}
            dish={d}
            index={i}
            onView={onSelectDish}
          />
        ))}
      </div>
    )}
  </div>
);

/**
 * Shared recipe discovery: public feed + categories + cuisines.
 * @param {{ showMyPostedSection?: boolean }} props
 */
export default function RecipesFeed({ showMyPostedSection = false }) {
  const [view, setView] = useState("home");
  const [selCat, setSelCat] = useState(null);
  const [selCuisine, setSelCuisine] = useState(null);
  const [selDish, setSelDish] = useState(null);

  const [apiRecipes, setApiRecipes] = useState([]);
  const [myUploads, setMyUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [refreshTick, setRefreshTick] = useState(0);

  const bumpRefresh = useCallback(() => {
    setRefreshTick((t) => t + 1);
  }, []);

  useEffect(() => {
    const onRefresh = () => bumpRefresh();
    window.addEventListener(REFRESH_EVENT, onRefresh);
    return () => window.removeEventListener(REFRESH_EVENT, onRefresh);
  }, [bumpRefresh]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const r = await axios.get(apiUrl("/api/recipes/public"), {
          headers: authHeaders(),
        });
        if (!cancelled && r.data?.success && Array.isArray(r.data.recipes)) {
          setApiRecipes(r.data.recipes);
        } else if (!cancelled) {
          setApiRecipes([]);
        }
      } catch (e) {
        if (!cancelled) {
          setFetchError(
            e.response?.data?.message || e.message || "Failed to load",
          );
          setApiRecipes([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshTick]);

  useEffect(() => {
    if (!showMyPostedSection) return;
    const headers = authHeaders();
    if (!headers.Authorization) {
      setMyUploads([]);
      return;
    }
    let cancelled = false;
    axios
      .get(apiUrl("/api/recipes/my-uploads"), { headers })
      .then((r) => {
        if (!cancelled && r.data?.success)
          setMyUploads(r.data.recipes || []);
      })
      .catch(() => {
        if (!cancelled) setMyUploads([]);
      });
    return () => {
      cancelled = true;
    };
  }, [showMyPostedSection, refreshTick]);

  const { byMeal, byCuisine, allDishes } = useMemo(
    () => bucketRecipes(apiRecipes, catData, data),
    [apiRecipes],
  );

  const myPostedDishes = useMemo(
    () => (myUploads || []).map((r) => apiRecipeToDish(r)),
    [myUploads],
  );

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

  if (view === "category")
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CategoryView
            cat={selCat}
            dishes={byMeal[selCat?.id] || []}
            onSelectDish={openDish}
            onBack={goBack}
          />
        </motion.div>
      </div>
    );

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
            dishes={byCuisine[selCuisine?.id] || []}
            onSelectDish={openDish}
            onBack={goBack}
          />
        </motion.div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {showMyPostedSection && myPostedDishes.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your posted recipes
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Recipes you uploaded from the influencer portal.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {myPostedDishes.map((d, i) => (
                <DishCard
                  key={d.recipeId || `${d.name}-${i}`}
                  index={i}
                  dish={d}
                  onView={openDish}
                />
              ))}
            </div>
          </div>
        )}

        {fetchError && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-sm px-4 py-3">
            Could not load recipes from the server ({fetchError}). Check that
            the backend is running.
          </div>
        )}

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

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Explore by Cuisine
        </h2>

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

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {loading ? "Loading recipes…" : "All recipes"}
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[0, 1, 2, 3].map((k) => (
              <div
                key={k}
                className="h-64 rounded-[18px] bg-stone-100 animate-pulse"
              />
            ))}
          </div>
        ) : allDishes.length === 0 ? (
          <p className="text-sm text-gray-500 py-10 text-center border border-dashed border-stone-200 rounded-2xl">
            No public recipes yet. When influencers post public recipes, they
            will appear here.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allDishes.map((d, i) => (
              <DishCard
                key={d.recipeId || `${d.name}-${i}`}
                index={i}
                dish={d}
                onView={openDish}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export { REFRESH_EVENT };
