import React, { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Search, Clock, Trash2, Bot, BookOpen, X } from "lucide-react";
import { SEED_SAVED } from "../data/userData";
import { apiUrl, authHeaders } from "../config/api.js";
import { useLocation } from "react-router-dom";

const isMongoId = (id) =>
  typeof id === "string" && /^[a-f\d]{24}$/i.test(String(id));

function mapApiSavedToCard(r) {
  const herbs = Array.isArray(r.herbs) ? r.herbs : [];
  const steps = Array.isArray(r.steps) ? r.steps : [];
  return {
    id: r.id || r._id,
    cat: r.category || r.cat || "Herbal",
    type: r.type || "text",
    title: r.title,
    desc: r.desc || "",
    img: r.img,
    herbs,
    time: r.time || "—",
    benefit: r.benefit || "—",
    steps,
    video: r.video || "",
    source: "api",
  };
}


// ─── Sub-components ───────────────────────────────────────────────────────────

const HerbChip = ({ name }) => (
  <span className="text-[10px] font-medium bg-green-50 text-green-800
                   border border-green-100 px-2 py-0.5 rounded-sm">
    {name}
  </span>
);

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const DetailModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      style={{ animation:"fadeIn .2s ease both" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto shadow-2xl"
        style={{ animation:"fadeUp .25s ease both", scrollbarWidth:"thin" }}
      >
        {/* ── Media ── */}
        <div className="relative">
          {recipe.type === "video" && recipe.video ? (
            <div
              className="bg-black rounded-t-2xl overflow-hidden"
              style={{ aspectRatio:"16/9" }}
            >
              <video
                src={recipe.video}
                controls
                playsInline
                autoPlay={false}
                preload="metadata"
                className="w-full h-full object-contain block"
              />
            </div>
          ) : (
            <img
              src={recipe.img}
              alt={recipe.title}
              className="w-full h-56 object-cover rounded-t-2xl block"
            />
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white
                       rounded-full flex items-center justify-center shadow transition-all"
          >
            <X size={15} className="text-stone-700" />
          </button>

          {/* Badge — text recipes only */}
          {recipe.type !== "video" && (
            <span className="absolute bottom-3 left-3 bg-white/90 rounded-full px-3 py-1
                             text-[10px] font-medium text-stone-800 inline-flex items-center gap-1.5">
              <BookOpen size={9} /> Text Recipe
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="p-6">

          {/* AI badge */}
          {recipe.source === "ai" && (
            <div className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-100
                            text-violet-700 text-[10px] font-medium px-2.5 py-1 rounded-full mb-4">
              <Bot size={10} /> AI Suggested · {recipe.savedAt}
            </div>
          )}

          {/* Eyebrow */}
          <p className="text-[10px] uppercase tracking-[2px] font-medium text-stone-400 mb-2">
            {recipe.cat} · {recipe.time}
          </p>

          {/* Title */}
          <h2 className="font-serif text-[24px] font-semibold text-stone-900 leading-tight mb-3">
            {recipe.title}
          </h2>

          {/* Description */}
          <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
            {recipe.desc}
          </p>

          {/* Herbs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {recipe.herbs.map(h => (
              <span
                key={h}
                className="text-[11px] font-medium bg-green-50 text-green-800
                           border border-green-100 px-2.5 py-1 rounded-md"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Steps */}
          <p className="text-[10px] uppercase tracking-[2px] font-medium text-stone-400 mb-3">
            How to prepare
          </p>
          <div className="flex flex-col gap-3 mb-5">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-stone-200 flex items-center
                                justify-center text-[9px] font-semibold text-stone-500
                                shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-[13px] text-stone-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Footer tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
            <span className="text-[11px] font-medium bg-stone-100 text-stone-700
                             px-3 py-1.5 rounded-full">
              ✦ {recipe.benefit}
            </span>
            <span className="text-[11px] font-medium bg-stone-100 text-stone-700
                             px-3 py-1.5 rounded-full">
              ⏱ {recipe.time}
            </span>
            <span className="text-[11px] font-medium bg-stone-100 text-stone-700
                             px-3 py-1.5 rounded-full">
              {recipe.type === "video" ? "▶ Video" : "📖 Text"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

// ─── SavedCard ────────────────────────────────────────────────────────────────

const SavedCard = ({ recipe, onRemove, onView, index }) => {
  const isAI = recipe.source === "ai";

  return (
    <article
      className="group bg-white border border-stone-200 rounded-xl overflow-hidden
                 transition-all duration-300 hover:border-stone-300 hover:shadow-md"
      style={{
        animation:`fadeUp 0.35s ${index * 0.04}s ease both`,
        opacity: 0,
        animationFillMode:"both",
      }}
    >
      {/* ── Media ── */}
      {recipe.type === "video" && recipe.video ? (
        <div
          className="bg-black rounded-t-xl overflow-hidden"
          style={{ aspectRatio:"16/9" }}
        >
          <video
            src={recipe.video}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain block"
          />
        </div>
      ) : (
        <div className="relative h-44 overflow-hidden bg-stone-100 rounded-t-xl">
          <img
            src={recipe.img}
            alt={recipe.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-[1.04]"
          />
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1
                           bg-white/90 rounded-full px-2.5 py-1 text-[10px]
                           font-medium text-stone-800">
            <BookOpen size={9} /> Text
          </span>
          <span className="absolute top-2.5 right-2.5 bg-stone-900/75 text-stone-200
                           text-[10px] font-medium rounded-full px-2.5 py-1">
            {recipe.cat}
          </span>
        </div>
      )}

      {/* ── Body ── */}
      <div className="p-4">

        {/* AI badge */}
        {isAI && (
          <div className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-100
                          text-violet-700 text-[10px] font-medium px-2.5 py-1 rounded-full mb-3">
            <Bot size={10} /> AI Suggested · {recipe.savedAt}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-[1.2px] font-medium text-stone-400">
            {recipe.cat}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-stone-400">
            <Clock size={10} /> {recipe.time}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[16px] font-semibold text-stone-900
                       leading-snug mb-1.5">
          {recipe.title}
        </h3>

        {/* Desc */}
        <p className="text-[12px] text-stone-500 leading-relaxed mb-3 line-clamp-2">
          {recipe.desc}
        </p>

        {/* Herbs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {recipe.herbs.map(h => <HerbChip key={h} name={h} />)}
        </div>

        {/* Benefit + actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
          {/* View details */}
          <button
            onClick={() => onView(recipe)}
            className="flex-1 py-2 bg-stone-900 hover:bg-stone-700 active:scale-[0.98]
                       text-white text-[12px] font-medium rounded-lg transition-all"
          >
            View Details
          </button>

          {/* Remove */}
          <button
            onClick={() => onRemove(recipe.id)}
            title="Remove from saved"
            className="w-9 h-9 flex items-center justify-center border border-stone-200
                       rounded-lg text-stone-400 hover:text-red-500 hover:border-red-200
                       hover:bg-red-50 transition-all shrink-0"
          >
            <Trash2 size={14} />
          </button>
        </div>

      </div>
    </article>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const SavedRecipes = () => {
  const [saved, setSaved] = useState(SEED_SAVED);
  const [activeTab, setActiveTab] = useState("all");
  const [activeSort, setActiveSort] = useState("recent");
  const [search, setSearch] = useState("");
  const [modalItem, setModalItem] = useState(null);

  const location=useLocation()
  let token
  if(location.pathname.includes("user")){
    token=localStorage.getItem("userToken")
  }else if(location.pathname.includes("influencer")){
    token=localStorage.getItem("influencerToken")
  }else{
    token=localStorage.getItem("doctorToken")
  }
  useEffect(() => {
    const headers = authHeaders();
    if (!headers.Authorization) return;
    let cancelled = false;
    (async () => {
      try {
        const r = await axios.get(apiUrl("/api/recipes/saved"), { headers:{
          Authorization:token
        } });
        console.log(r)
        if (!cancelled && r.data?.success && Array.isArray(r.data.recipes)) {
          const mapped = r.data.recipes.map(mapApiSavedToCard);
          setSaved((prev) => {
            const seedOnly = prev.filter((x) => x.source !== "api");
            return [...mapped, ...seedOnly];
          });
        }
      } catch {
        /* keep seed data */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const removeRecipe = useCallback(
    async (id) => {
      const headers = authHeaders();
      if (isMongoId(id) && headers.Authorization) {
        try {
          await axios.delete(apiUrl(`/api/recipes/save/${id}`), { headers:{
            Authorization:token
          } });
          toast.success("Removed from saved");
        } catch (e) {
          toast.error(e.response?.data?.message || "Could not remove");
          return;
        }
      }
      setSaved((prev) => prev.filter((r) => r.id !== id));
      if (modalItem?.id === id) setModalItem(null);
    },
    [modalItem?.id],
  );

  // ── Filtered + sorted list ─────────────────────────────────────────────────
  const visible = useMemo(() => {
    let list = [...saved];

    if (activeTab === "ai")     list = list.filter(r => r.source === "ai");
    if (activeTab === "text")   list = list.filter(r => r.type   === "text");
    if (activeTab === "video")  list = list.filter(r => r.type   === "video");
    if (activeTab === "herbal") list = list.filter(r => r.source !== "ai");

    const q = search.toLowerCase();
    if (q) {
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.cat.toLowerCase().includes(q)   ||
        r.herbs.some(h => h.toLowerCase().includes(q))
      );
    }

    if (activeSort === "alpha") list.sort((a, b) => a.title.localeCompare(b.title));
    if (activeSort === "cat")   list.sort((a, b) => a.cat.localeCompare(b.cat));

    return list;
  }, [saved, activeTab, activeSort, search]);

  // ── Grouped map (used when sort === "cat") ─────────────────────────────────
  const grouped = useMemo(() => {
    if (activeSort !== "cat") return null;
    const map = {};
    visible.forEach(r => {
      if (!map[r.cat]) map[r.cat] = [];
      map[r.cat].push(r);
    });
    return map;
  }, [visible, activeSort]);

  // ── Tab config ─────────────────────────────────────────────────────────────
  const TABS = [
    { key:"all",    label:"All Saved"      },
    { key:"ai",     label:"AI Suggestions" },
    { key:"text",   label:"Text Recipes"   },
    { key:"video",  label:"Video Recipes"  },
    { key:"herbal", label:"Herbal"         },
  ];

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .font-serif {
          font-family: Georgia, 'Times New Roman', serif;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tab-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8  min-h-screen">

        {/* ── Page header ── */}
        <header
          className="pb-6 mb-7 border-b border-stone-200"
          style={{ animation:"fadeUp .4s ease both" }}
        >
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[2px] font-medium text-green-700 mb-1.5">
                Your Collection
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
            Saved Recipes
          </h2>
              <p className="text-[12px] text-stone-400 mt-2">
                {saved.length} recipe{saved.length !== 1 ? "s" : ""} in your collection
              </p>
            </div>

            {/* Stat chips */}
            <div className="flex gap-2 flex-wrap">
              {[
                {
                  label: "AI",
                  count: saved.filter(r => r.source === "ai").length,
                  cls:   "bg-violet-50 text-violet-700 border-violet-100",
                },
                {
                  label: "Text",
                  count: saved.filter(r => r.type === "text").length,
                  cls:   "bg-green-50 text-green-700 border-green-100",
                },
                {
                  label: "Video",
                  count: saved.filter(r => r.type === "video").length,
                  cls:   "bg-blue-50 text-blue-700 border-blue-100",
                },
              ].map(s => (
                <span
                  key={s.label}
                  className={`inline-flex items-center gap-1.5 border text-[11px]
                              font-medium px-3 py-1.5 rounded-full ${s.cls}`}
                >
                  {s.label}
                  <span className="font-semibold">{s.count}</span>
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* ── Tabs ── */}
        <div
          className="tab-scroll flex overflow-x-auto pb-0.5 mb-5"
          style={{ animation:"fadeUp .4s .05s ease both" }}
        >
          <div className="inline-flex gap-1 bg-stone-100 border border-stone-200
                          rounded-xl p-1 shrink-0">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-all
                            whitespace-nowrap
                  ${activeTab === t.key
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-800"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div
          className="flex flex-wrap items-center gap-2.5 mb-6"
          style={{ animation:"fadeUp .4s .08s ease both" }}
        >
          {/* Search */}
          <div className="flex-1 min-w-50 relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2
                         text-stone-400 pointer-events-none"
            />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search saved recipes, herbs…"
              className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-lg
                         text-[13px] bg-white text-stone-800 outline-none
                         focus:border-stone-400 transition-all placeholder:text-stone-400"
            />
          </div>

          {/* Sort pills */}
          {[
            { key:"recent", label:"Recent"      },
            { key:"alpha",  label:"A–Z"          },
            { key:"cat",    label:"By Category"  },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setActiveSort(s.key)}
              className={`px-4 py-2.5 rounded-full border text-[12px] font-medium
                          transition-all whitespace-nowrap
                ${activeSort === s.key
                  ? "bg-stone-900 border-stone-900 text-stone-50"
                  : "bg-white border-stone-200 text-stone-600 hover:border-stone-400"}`}
            >
              {s.label}
            </button>
          ))}

          <span className="ml-auto text-[12px] text-stone-400 whitespace-nowrap">
            {visible.length} shown
          </span>
        </div>

        {/* ── Empty state ── */}
        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-stone-400">
            <p className="text-5xl mb-4">🌿</p>
            <p className="text-[15px] font-medium text-stone-600 mb-1">
              Nothing saved yet
            </p>
            <p className="text-[13px]">
              Browse herbal recipes and save the ones you love.
            </p>
          </div>
        )}

        {/* ── Grouped view (By Category sort) ── */}
        {grouped && Object.keys(grouped).length > 0 &&
          Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-[11px] uppercase tracking-[1.5px]
                               font-semibold text-stone-400">
                  {cat}
                </p>
                <div className="flex-1 h-px bg-stone-200" />
                <span className="text-[11px] text-stone-400">{items.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((r, i) => (
                  <SavedCard
                    key={r.id}
                    recipe={r}
                    onRemove={removeRecipe}
                    onView={setModalItem}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))
        }

        {/* ── Flat grid (Recent / A–Z sorts) ── */}
        {!grouped && visible.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((r, i) => (
              <SavedCard
                key={r.id}
                recipe={r}
                onRemove={removeRecipe}
                onView={setModalItem}
                index={i}
              />
            ))}
          </div>
        )}

      </div>

      {/* ── Detail Modal ── */}
      {modalItem && (
        <DetailModal
          recipe={modalItem}
          onClose={() => setModalItem(null)}
        />
      )}
    </>
  );
};

export default SavedRecipes;