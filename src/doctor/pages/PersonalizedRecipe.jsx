import React, { useState, useMemo } from "react";
import {
  Leaf, Utensils, Lock, Globe, Clock,
  Heart, ThumbsDown, MessageCircle,
  ArrowLeft, Trash2, Search, X,
} from "lucide-react";

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED = [
  {
    id:1, kind:"herbal", access:"public", category:"Immunity",
    title:"Ashwagandha & Brahmi Night Tonic",
    desc:"Calms the nervous system, reduces cortisol and prepares the body for deep, restorative sleep.",
    herbs:"Ashwagandha, Brahmi, Jatamansi",
    benefit:"Deep sleep & stress relief",
    time:"8 min", difficulty:"Easy",
    img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
    likes:312, dislikes:14,
    comments:[
      { u:"Priya S", i:"PS", t:"My anxiety dropped noticeably after 2 weeks.", d:"3d ago" },
      { u:"Rahul M", i:"RM", t:"Best herbal tonic I've tried. Thank you doctor!", d:"5d ago" },
    ],
    steps:"Step 1: Warm 1 cup milk.\nStep 2: Add ½ tsp ashwagandha and ¼ tsp brahmi.\nStep 3: Add a pinch of jatamansi. Sweeten with honey.\nStep 4: Sip 30 min before sleep.",
  },
  {
    id:2, kind:"herbal", access:"public", category:"Hair",
    title:"Amla & Bhringraj Scalp Oil",
    desc:"Stimulates follicles, reverses thinning and deeply conditions the scalp with traditional botanicals.",
    herbs:"Amla, Bhringraj, Coconut Oil, Fenugreek",
    benefit:"Hair regrowth",
    time:"30 min", difficulty:"Medium",
    img:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80",
    likes:498, dislikes:22,
    comments:[
      { u:"Anita K", i:"AK", t:"Visible results after 3 weeks of use!", d:"1w ago" },
    ],
    steps:"Step 1: Heat 200ml coconut oil.\nStep 2: Add amla and bhringraj powder.\nStep 3: Add fenugreek seeds.\nStep 4: Simmer 20 min. Strain and store.\nStep 5: Massage into scalp 3x per week.",
  },
  {
    id:3, kind:"herbal", access:"private", category:"Digestion",
    title:"Ginger & Triphala Morning Blend",
    desc:"Gentle daily detox that improves gut motility, reduces bloating and supports nutrient absorption.",
    herbs:"Triphala, Ginger, Lemon, Honey",
    benefit:"Gut cleanse",
    time:"5 min", difficulty:"Easy",
    img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
    likes:187, dislikes:8,
    comments:[
      { u:"Deepa R", i:"DR", t:"Bloating completely gone after 10 days.", d:"2w ago" },
    ],
    steps:"Step 1: Mix ½ tsp triphala in warm water.\nStep 2: Add lemon juice and fresh ginger.\nStep 3: Stir in raw honey.\nStep 4: Drink on empty stomach each morning.",
  },
  {
    id:4, kind:"general", access:"private", category:"Lunch",
    title:"Dal Makhani",
    desc:"My personal slow-cooked black lentil recipe. Comfort food for long clinic days.",
    herbs:null, benefit:null,
    time:"90 min", difficulty:"Medium",
    img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80",
    likes:0, dislikes:0,
    comments:[],
    steps:"Step 1: Soak lentils overnight.\nStep 2: Pressure cook with butter and tomatoes.\nStep 3: Add cream and spices. Simmer 20 min.",
  },
  {
    id:5, kind:"general", access:"private", category:"Breakfast",
    title:"Oat & Seed Power Bowl",
    desc:"High-fibre breakfast I recommend to all my metabolic patients — and eat myself.",
    herbs:null, benefit:null,
    time:"10 min", difficulty:"Easy",
    img:"https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&q=80",
    likes:0, dislikes:0,
    comments:[],
    steps:"Step 1: Cook oats in almond milk.\nStep 2: Top with chia, flax and pumpkin seeds.\nStep 3: Add sliced banana and a drizzle of honey.",
  },
];

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : n);

// ─── Sub-components ───────────────────────────────────────────────────────────

const KindBadge = ({ kind }) => (
  kind === "herbal" ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-teal-50
                     text-teal-700 border border-teal-100 px-2 py-0.5 rounded-full">
      <Leaf size={9} /> Herbal
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-stone-100
                     text-stone-600 border border-stone-200 px-2 py-0.5 rounded-full">
      <Utensils size={9} /> General
    </span>
  )
);

const AccessBadge = ({ access }) => (
  access === "public" ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-green-50
                     text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
      <Globe size={9} /> Public
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-stone-100
                     text-stone-500 border border-stone-200 px-2 py-0.5 rounded-full">
      <Lock size={9} /> Private
    </span>
  )
);

// Recipe card in the grid
const RecipeCard = ({ recipe, onClick, index }) => (
  <article
    onClick={onClick}
    className="group bg-white border border-stone-200 rounded-2xl overflow-hidden cursor-pointer
               hover:-translate-y-0.5 hover:shadow-md hover:border-teal-300 transition-all duration-200"
    style={{ animation:`fadeUp .35s ${.1 + index * .05}s ease both`, opacity:0, animationFillMode:"both" }}
  >
    <div className="relative h-40 bg-stone-100 overflow-hidden">
      <img
        src={recipe.img} alt={recipe.title} loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start">
        <KindBadge kind={recipe.kind} />
        <AccessBadge access={recipe.access} />
      </div>
    </div>

    <div className="p-3.5">
      <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 mb-1">
        {recipe.category}
      </p>
      <h3 className="text-[14px] font-bold text-stone-900 leading-snug mb-1.5
                     line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {recipe.title}
      </h3>
      <div className="flex items-center gap-2.5 text-[11px] text-stone-400 mb-2.5">
        <span className="flex items-center gap-1"><Clock size={10} /> {recipe.time}</span>
        {recipe.kind === "herbal" && (
          <span className="flex items-center gap-1">
            <MessageCircle size={10} /> {recipe.comments.length}
          </span>
        )}
      </div>
      {recipe.kind === "herbal" && (
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] font-bold text-stone-500">
            <Heart size={11} fill="#14b8a6" className="text-teal-500" /> {fmt(recipe.likes)}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-stone-400">
            <ThumbsDown size={11} /> {fmt(recipe.dislikes)}
          </span>
        </div>
      )}
    </div>
  </article>
);

// Detail view
const RecipeDetail = ({ recipe, onBack, onDelete }) => {
  const [liked,     setLiked]     = useState(false);
  const [disliked,  setDisliked]  = useState(false);
  const [comments,  setComments]  = useState(recipe.comments);
  const [input,     setInput]     = useState("");
  const [showDel,   setShowDel]   = useState(false);

  const toggleLike = () => { setLiked(l => !l); if (!liked) setDisliked(false); };
  const toggleDislike = () => { setDisliked(d => !d); if (!disliked) setLiked(false); };
  const postComment = () => {
    if (!input.trim()) return;
    setComments(prev => [...prev, { u:"You", i:"DR", t:input.trim(), d:"just now" }]);
    setInput("");
  };

  const stepsArr = recipe.steps?.split("\n").filter(Boolean) ?? [];

  return (
    <div style={{ animation:"fadeUp .35s ease both" }}>

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 border border-stone-200 rounded-full
                     px-4 py-2 text-[12px] font-semibold text-stone-500 bg-white
                     hover:border-teal-400 hover:text-teal-600 transition-all"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {!showDel ? (
          <button
            onClick={() => setShowDel(true)}
            className="inline-flex items-center gap-1.5 border border-stone-200 rounded-full
                       px-4 py-2 text-[12px] font-semibold text-stone-400 bg-white
                       hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <Trash2 size={13} /> Delete
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-stone-500 font-medium">Are you sure?</span>
            <button
              onClick={() => onDelete(recipe.id)}
              className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-[12px]
                         font-bold rounded-full transition-all"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDel(false)}
              className="px-4 py-1.5 border border-stone-200 text-stone-500 text-[12px]
                         font-semibold rounded-full hover:bg-stone-50 transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 items-start">

        {/* Left — image + steps */}
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio:"16/9" }}>
            <img src={recipe.img} alt={recipe.title} className="w-full h-full object-cover block" />
          </div>

          {/* Steps */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <p className="text-[11px] uppercase tracking-widest font-bold text-stone-400 mb-4">
              Instructions
            </p>
            <div className="flex flex-col gap-3">
              {stepsArr.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-stone-200 flex items-center
                                  justify-center text-[9px] font-bold text-stone-500 shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-[13px] text-stone-700 leading-relaxed">
                    {s.replace(/^Step \d+:\s*/i, "")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — info + likes + comments */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col gap-4">

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <KindBadge kind={recipe.kind} />
            <AccessBadge access={recipe.access} />
          </div>

          {/* Title + desc */}
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-teal-600 mb-1.5">
              {recipe.category}
            </p>
            <h2 className="text-[20px] font-bold text-stone-900 leading-snug mb-2">{recipe.title}</h2>
            <p className="text-[12px] text-stone-400 leading-relaxed">{recipe.desc}</p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] font-semibold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-lg">
              ⏱ {recipe.time}
            </span>
            {recipe.difficulty && (
              <span className="text-[11px] font-semibold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-lg">
                {recipe.difficulty}
              </span>
            )}
            {recipe.benefit && (
              <span className="text-[11px] font-semibold bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg border border-teal-100">
                ✦ {recipe.benefit}
              </span>
            )}
          </div>

          {/* Herbs */}
          {recipe.herbs && (
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2">
                Herbs Used
              </p>
              <div className="flex flex-wrap gap-1.5">
                {recipe.herbs.split(",").map(h => (
                  <span key={h} className="text-[11px] font-semibold bg-teal-50 text-teal-800
                                           border border-teal-100 px-2.5 py-1 rounded-md">
                    {h.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Likes / dislikes — only herbal */}
          {recipe.kind === "herbal" && (
            <>
              <div className="h-px bg-stone-100" />
              <div className="flex gap-2">
                <button
                  onClick={toggleLike}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                              border-[1.5px] text-[13px] font-bold transition-all
                    ${liked
                      ? "bg-teal-50 border-teal-400 text-teal-600"
                      : "bg-white border-stone-200 text-stone-500 hover:border-teal-400 hover:text-teal-500"}`}
                >
                  <Heart size={15} fill={liked ? "#14b8a6" : "none"} stroke={liked ? "#14b8a6" : "currentColor"} />
                  {fmt(recipe.likes + (liked ? 1 : 0))}
                </button>
                <button
                  onClick={toggleDislike}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                              border-[1.5px] text-[13px] font-bold transition-all
                    ${disliked
                      ? "bg-blue-50 border-blue-400 text-blue-600"
                      : "bg-white border-stone-200 text-stone-500 hover:border-blue-400 hover:text-blue-500"}`}
                >
                  <ThumbsDown size={15} fill={disliked ? "#3a3aaa" : "none"} stroke={disliked ? "#3a3aaa" : "currentColor"} />
                  {fmt(recipe.dislikes + (disliked ? 1 : 0))}
                </button>
              </div>
            </>
          )}

          {/* Comments — only herbal */}
          {recipe.kind === "herbal" && (
            <>
              <div className="h-px bg-stone-100" />
              <div>
                <p className="text-[13px] font-bold text-stone-900 mb-3">
                  Comments ({comments.length})
                </p>
                {comments.length === 0 ? (
                  <p className="text-[12px] text-stone-400 italic mb-3">No comments yet.</p>
                ) : (
                  <div className="flex flex-col gap-3 max-h-44 overflow-y-auto pr-1 mb-3">
                    {comments.map((c, i) => (
                      <div key={i} className="flex gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center
                                        text-[9px] font-bold text-stone-500 shrink-0">
                          {c.i}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-stone-800">{c.u}</p>
                          <p className="text-[11px] text-stone-500 leading-relaxed">{c.t}</p>
                          <p className="text-[10px] text-stone-300 mt-0.5">{c.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 pt-3 border-t border-stone-100">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && postComment()}
                    placeholder="Add a comment…"
                    className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-[12px]
                               text-stone-800 outline-none focus:border-teal-400 transition-all
                               placeholder:text-stone-400"
                  />
                  <button
                    onClick={postComment}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-[12px]
                               font-bold rounded-xl transition-all"
                  >
                    Post
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const PersonalizedRecipe = () => {
  const [recipes,  setRecipes]  = useState(SEED);
  const [selected, setSelected] = useState(null);
  const [tab,      setTab]      = useState("all");
  const [search,   setSearch]   = useState("");

  const handleDelete = (id) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
    setSelected(null);
  };

  const visible = useMemo(() => {
    let list = [...recipes];
    if (tab === "herbal")  list = list.filter(r => r.kind   === "herbal");
    if (tab === "general") list = list.filter(r => r.kind   === "general");
    if (tab === "public")  list = list.filter(r => r.access === "public");
    if (tab === "private") list = list.filter(r => r.access === "private");
    const q = search.toLowerCase();
    if (q) list = list.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.herbs?.toLowerCase().includes(q)
    );
    return list;
  }, [recipes, tab, search]);

  const counts = {
    herbal:  recipes.filter(r => r.kind   === "herbal").length,
    general: recipes.filter(r => r.kind   === "general").length,
    public:  recipes.filter(r => r.access === "public").length,
    private: recipes.filter(r => r.access === "private").length,
  };

  return (
    <>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="max-w-6xl mx-auto px-4 py-8  min-h-screen">

        {selected !== null ? (
          <RecipeDetail
            recipe={recipes.find(r => r.id === selected)}
            onBack={() => setSelected(null)}
            onDelete={handleDelete}
          />
        ) : (
          <>
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between flex-wrap gap-4 pb-6 mb-7 border-b border-stone-200"
              style={{ animation:"fadeUp .4s ease both" }}
            >
              <div>
                <p className="text-[11px] uppercase tracking-[2px] font-semibold text-teal-600 mb-1.5">
                  Doctor Portal
                </p>
                <h1 className="text-[26px] font-bold text-stone-900 leading-none">My Recipes</h1>
                <p className="text-[12px] text-stone-400 mt-1.5">
                  {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} — {counts.public} public, {counts.private} private
                </p>
              </div>

              {/* Stat chips */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { label:"Herbal",  count:counts.herbal,  cls:"bg-teal-50 text-teal-700 border-teal-100"   },
                  { label:"General", count:counts.general, cls:"bg-stone-100 text-stone-600 border-stone-200" },
                  { label:"Public",  count:counts.public,  cls:"bg-green-50 text-green-700 border-green-100" },
                  { label:"Private", count:counts.private, cls:"bg-stone-100 text-stone-500 border-stone-200" },
                ].map(s => (
                  <span key={s.label} className={`inline-flex items-center gap-1.5 border text-[11px]
                                                   font-semibold px-3 py-1.5 rounded-full ${s.cls}`}>
                    {s.label} <span className="font-bold">{s.count}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* ── Tabs + search ── */}
            <div
              className="flex flex-wrap items-center gap-3 mb-5"
              style={{ animation:"fadeUp .4s .05s ease both", opacity:0, animationFillMode:"both" }}
            >
              <div className="inline-flex gap-1 bg-stone-100 border border-stone-200 rounded-xl p-1">
                {[
                  { key:"all",     label:"All"     },
                  { key:"herbal",  label:"Herbal"  },
                  { key:"general", label:"General" },
                  { key:"public",  label:"Public"  },
                  { key:"private", label:"Private" },
                ].map(t => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap
                      ${tab === t.key
                        ? "bg-white text-stone-900 shadow-sm"
                        : "text-stone-500 hover:text-stone-800"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex-1 min-w-45 relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search recipes or herbs…"
                  className="w-full pl-8 pr-8 py-2.5 border border-stone-200 rounded-xl text-[13px]
                             bg-white text-stone-800 outline-none focus:border-teal-400 transition-all
                             placeholder:text-stone-400"
                />
                {search && (
                  <button onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                    <X size={13} />
                  </button>
                )}
              </div>

              <span className="text-[12px] text-stone-400">{visible.length} shown</span>
            </div>

            {/* ── Grid ── */}
            {visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                <p className="text-4xl mb-3">🌿</p>
                <p className="text-[14px] font-semibold text-stone-600 mb-1">No recipes found</p>
                <p className="text-[13px]">Try a different tab or search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map((recipe, i) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    index={i}
                    onClick={() => setSelected(recipe.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </>
  );
};

export default PersonalizedRecipe;