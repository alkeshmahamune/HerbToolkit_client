import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft, Check, X, AlertTriangle, Clock, Leaf,
  Heart, ThumbsDown, MessageCircle, User, Search,
  ChevronDown, Eye, CheckCircle2, XCircle, Hourglass,
} from "lucide-react";
import axios from "axios";

// ─── Seed data ────────────────────────────────────────────────────────────────

const PENDING_RECIPES = [
  {
    id:"r1", status:"pending",
    title:"Neem & Tulsi Anti-Acne Steam",
    submittedBy:"Ananya Kapoor", submittedRole:"Influencer",
    submittedAt:"20 Mar 2025",
    category:"Face & Skin", benefit:"Clears acne & unclogs pores",
    herbs:["Neem","Tulsi","Lavender","Eucalyptus"],
    desc:"A steam therapy using neem and tulsi leaves known for their antibacterial and antifungal properties. Suitable for oily and acne-prone skin types.",
    warnings:"Avoid if sensitive to strong scents. Do not use on broken skin. Keep a safe distance from steam.",
    steps:[
      "Boil 3 cups of water in a wide-mouthed pot.",
      "Add a large handful of fresh neem and tulsi leaves.",
      "Add 3 drops each of lavender and eucalyptus oil.",
      "Remove from heat. Place face 30 cm above pot.",
      "Drape a towel over head and steam for 8–10 min.",
      "Rinse face with cold water. Moisturise immediately.",
    ],
    ingredients:[
      { name:"Neem leaves",    qty:"1 handful",  note:"Fresh preferred" },
      { name:"Tulsi leaves",   qty:"1 handful",  note:"Fresh or dried"  },
      { name:"Lavender oil",   qty:"3 drops",    note:"Essential grade" },
      { name:"Eucalyptus oil", qty:"3 drops",    note:"Essential grade" },
      { name:"Water",          qty:"3 cups",     note:"Filtered"        },
    ],
    dosage:"1–2 times per week",
    suitableFor:"Adults with oily / acne-prone skin",
    img:"https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    likes:0, dislikes:0,
  },
  {
    id:"r2", status:"pending",
    title:"Ashwagandha & Shatavari Women's Tonic",
    submittedBy:"Dr. Meera Iyer", submittedRole:"Doctor",
    submittedAt:"19 Mar 2025",
    category:"General Wellness", benefit:"Hormonal balance & energy",
    herbs:["Ashwagandha","Shatavari","Licorice Root","Cardamom"],
    desc:"A traditional Ayurvedic tonic for women that supports hormonal balance, reduces fatigue and nourishes the reproductive system.",
    warnings:"Not suitable during pregnancy. Consult before use if on hormonal medication. Start with half dose.",
    steps:[
      "Bring 1.5 cups of milk to a gentle simmer.",
      "Add ¼ tsp ashwagandha and ¼ tsp shatavari powder.",
      "Add a small piece of licorice root.",
      "Simmer on low heat for 5 minutes.",
      "Add 2 cardamom pods, crushed.",
      "Strain, sweeten with jaggery and drink warm.",
    ],
    ingredients:[
      { name:"Ashwagandha powder", qty:"¼ tsp",  note:"Root powder"     },
      { name:"Shatavari powder",   qty:"¼ tsp",  note:"Root powder"     },
      { name:"Licorice root",      qty:"1 piece", note:"Small thumb size"},
      { name:"Cardamom pods",      qty:"2",       note:"Crushed"         },
      { name:"Milk",               qty:"1.5 cups",note:"Full fat or oat" },
    ],
    dosage:"Once daily for 30 days",
    suitableFor:"Adult women aged 20–55",
    img:"https://images.unsplash.com/photo-1534353473418-4cfa0c23c77d?w=600&q=80",
    likes:0, dislikes:0,
  },
  {
    id:"r3", status:"approved",
    title:"Amla & Bhringraj Hair Oil",
    submittedBy:"Ananya Kapoor", submittedRole:"Influencer",
    submittedAt:"14 Mar 2025",
    category:"Hair", benefit:"Promotes hair growth",
    herbs:["Amla","Bhringraj","Coconut Oil","Fenugreek"],
    desc:"Potent Ayurvedic hair oil that stimulates follicles, reduces greying and deeply nourishes the scalp.",
    warnings:"Patch test recommended. Avoid contact with eyes.",
    steps:[
      "Heat 200ml coconut oil in a pan on low flame.",
      "Add 2 tbsp dried amla powder.",
      "Add 2 tbsp bhringraj powder.",
      "Stir in 1 tbsp fenugreek seeds.",
      "Simmer 20 minutes until aromatic.",
      "Cool, strain into a glass bottle.",
    ],
    ingredients:[
      { name:"Coconut oil",    qty:"200 ml",  note:"Cold-pressed"   },
      { name:"Amla powder",    qty:"2 tbsp",  note:"Dried"          },
      { name:"Bhringraj",      qty:"2 tbsp",  note:"Dried powder"   },
      { name:"Fenugreek seeds",qty:"1 tbsp",  note:null             },
    ],
    dosage:"Apply 2–3 times per week",
    suitableFor:"All hair types",
    img:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
    likes:498, dislikes:12,
    reviewNote:"Well-documented remedy with strong safety profile. Approved for public posting.",
  },
  {
    id:"r4", status:"rejected",
    title:"High-Dose Brahmi Extract",
    submittedBy:"FoodVlog India", submittedRole:"Influencer",
    submittedAt:"12 Mar 2025",
    category:"Sleep", benefit:"Memory & calm",
    herbs:["Brahmi","Ashwagandha","Vacha Root"],
    desc:"A concentrated brahmi extract for cognitive enhancement and anxiety relief.",
    warnings:"High concentration. For adults only.",
    steps:[
      "Take 2 tsp concentrated brahmi extract.",
      "Mix in warm water.",
      "Drink twice daily.",
    ],
    ingredients:[
      { name:"Brahmi extract",     qty:"2 tsp",   note:"Concentrated" },
      { name:"Ashwagandha extract",qty:"1 tsp",   note:"Concentrated" },
      { name:"Vacha root powder",  qty:"½ tsp",   note:"Powdered"     },
    ],
    dosage:"Twice daily — morning and night",
    suitableFor:"Adults only",
    img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80",
    likes:0, dislikes:0,
    reviewNote:"Dosage is dangerously high. Vacha root at this concentration is not recommended without clinical supervision. Rejected.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_META = {
  pending:  { label:"Pending Review", cls:"bg-amber-50 text-amber-700 border-amber-200",  icon: Hourglass  },
  approved: { label:"Approved",       cls:"bg-green-50 text-green-700 border-green-200",  icon: CheckCircle2 },
  rejected: { label:"Rejected",       cls:"bg-red-50   text-red-700   border-red-200",    icon: XCircle    },
};

const StatusBadge = ({ status }) => {
  const m = STATUS_META[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold border px-2.5 py-1 rounded-full ${m.cls}`}>
      <m.icon size={10} /> {m.label}
    </span>
  );
};

const InfoRow = ({ label, value }) =>
  value ? (
    <div className="flex justify-between py-2 border-b border-stone-100 last:border-0 gap-4">
      <span className="text-[12px] text-stone-400 font-medium shrink-0">{label}</span>
      <span className="text-[12px] font-semibold text-stone-800 text-right">{value}</span>
    </div>
  ) : null;

// ─── Recipe Detail Panel ──────────────────────────────────────────────────────

const ReviewDetail = ({ recipe, onBack, onDecision }) => {
  const [note,    setNote]    = useState(recipe.reviewNote ?? "");
  const [decided, setDecided] = useState(
    recipe.status === "approved" || recipe.status === "rejected" ? recipe.status : null
  );

  const isPending = recipe.status === "pending";

  const decide = (decision) => {
    setDecided(decision);
    onDecision(recipe.id, decision, note);
  };

  return (
    <div style={{ animation:"fadeUp .35s ease both" }}>

      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 border border-stone-200 rounded-full
                     px-4 py-2 text-[12px] font-semibold text-stone-500 bg-white
                     hover:border-stone-400 hover:text-stone-700 transition-all"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <StatusBadge status={decided ?? recipe.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">

        {/* ── Left — image + steps ── */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio:"16/9" }}>
            <img src={recipe.img} alt={recipe.title} className="w-full h-full object-cover block" />
          </div>

          {/* Steps */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-4">
              Preparation Steps
            </p>
            <div className="flex flex-col gap-3">
              {recipe.steps.map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full border border-stone-200 flex items-center
                                  justify-center text-[9px] font-bold text-stone-500 shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-[13px] text-stone-700 leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-4">
              Ingredients
            </p>
            <div className="divide-y divide-stone-100">
              {recipe.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="text-[13px] font-semibold text-stone-800">{ing.name}</p>
                    {ing.note && <p className="text-[11px] text-stone-400">{ing.note}</p>}
                  </div>
                  <span className="text-[12px] font-bold text-stone-600 bg-stone-100
                                   px-2.5 py-1 rounded-lg">
                    {ing.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right — info + review panel ── */}
        <div className="flex flex-col gap-4">

          {/* Recipe info */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-teal-600 mb-2">
              {recipe.category}
            </p>
            <h2 className="text-[20px] font-bold text-stone-900 leading-snug mb-2">
              {recipe.title}
            </h2>
            <p className="text-[12px] text-stone-500 leading-relaxed mb-4">{recipe.desc}</p>

            {/* Key info grid */}
            <div className="bg-stone-50 rounded-xl p-3.5 divide-y divide-stone-100 mb-4">
              <InfoRow label="Submitted by"  value={`${recipe.submittedBy} (${recipe.submittedRole})`} />
              <InfoRow label="Submitted on"  value={recipe.submittedAt} />
              <InfoRow label="Benefit"       value={recipe.benefit} />
              <InfoRow label="Dosage"        value={recipe.dosage} />
              <InfoRow label="Suitable for"  value={recipe.suitableFor} />
            </div>

            {/* Herbs */}
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2">
              Herbs Used
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {recipe.herbs.map(h => (
                <span key={h} className="text-[11px] font-semibold bg-teal-50 text-teal-800
                                         border border-teal-100 px-2.5 py-1 rounded-md">
                  {h}
                </span>
              ))}
            </div>

            {/* Warnings */}
            {recipe.warnings && (
              <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100
                              rounded-xl p-3.5">
                <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-amber-800 mb-0.5">Warnings / Contraindications</p>
                  <p className="text-[12px] text-amber-700 leading-relaxed">{recipe.warnings}</p>
                </div>
              </div>
            )}
          </div>

          {/* Review panel */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <p className="text-[13px] font-bold text-stone-900 mb-3">
              {isPending ? "Doctor Review" : "Review Decision"}
            </p>

            {/* Review note */}
            <div className="mb-4">
              <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5 block">
                Review Note {isPending && <span className="text-red-400">*</span>}
              </label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                disabled={!isPending}
                rows={4}
                placeholder="Write your clinical assessment — safety, dosage appropriateness, contraindications…"
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[13px]
                           text-stone-800 outline-none resize-none transition-all
                           placeholder:text-stone-400
                           focus:border-teal-400 focus:ring-2 focus:ring-teal-50
                           disabled:bg-stone-50 disabled:text-stone-500 disabled:cursor-not-allowed"
              />
            </div>

            {/* Decision */}
            {isPending && !decided && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => decide("approved")}
                  disabled={!note.trim()}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[13px]
                              font-bold transition-all border-2
                    ${note.trim()
                      ? "border-teal-500 bg-teal-600 hover:bg-teal-700 text-white"
                      : "border-stone-100 bg-stone-50 text-stone-300 cursor-not-allowed"}`}
                >
                  <Check size={15} /> Approve
                </button>
                <button
                  onClick={() => decide("rejected")}
                  disabled={!note.trim()}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[13px]
                              font-bold transition-all border-2
                    ${note.trim()
                      ? "border-red-400 bg-red-50 hover:bg-red-100 text-red-600"
                      : "border-stone-100 bg-stone-50 text-stone-300 cursor-not-allowed"}`}
                >
                  <X size={15} /> Reject
                </button>
              </div>
            )}

            {/* Decided state */}
            {(decided || !isPending) && (
              <div className={`flex items-center gap-2.5 rounded-xl p-3.5 border
                ${(decided ?? recipe.status) === "approved"
                  ? "bg-teal-50 border-teal-100"
                  : "bg-red-50 border-red-100"}`}>
                {(decided ?? recipe.status) === "approved"
                  ? <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  : <XCircle size={16} className="text-red-500 shrink-0" />}
                <p className={`text-[12px] font-semibold ${(decided ?? recipe.status) === "approved" ? "text-teal-700" : "text-red-600"}`}>
                  {(decided ?? recipe.status) === "approved"
                    ? "Recipe approved and published."
                    : "Recipe rejected and returned to submitter."}
                </p>
              </div>
            )}

            {isPending && !decided && !note.trim() && (
              <p className="text-[11px] text-stone-400 mt-2 text-center">
                Add a review note before approving or rejecting.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

// ─── Main ApproveRecipe Component ─────────────────────────────────────────────

const ApproveRecipe = () => {
  const doctorToken = localStorage.getItem("doctorToken")
  useEffect(()=>{
    const getallRecipes=async()=>{
      try {
        const response = await axios.get("http://localhost:3000/api/doctor/get-pending-recipe",{
          headers:{
            Authorization:`Bearer ${doctorToken}`
          }
        })
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getallRecipes()
  },[])
  const [recipes,  setRecipes]  = useState(PENDING_RECIPES);
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");

  const onDecision = (id, decision, note) => {
    setRecipes(prev =>
      prev.map(r => r.id === id ? { ...r, status:decision, reviewNote:note } : r)
    );
  };

  const visible = useMemo(() => {
    let list = [...recipes];
    if (filter !== "all") list = list.filter(r => r.status === filter);
    const q = search.toLowerCase();
    if (q) list = list.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.submittedBy.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    );
    return list;
  }, [recipes, filter, search]);

  const counts = {
    pending:  recipes.filter(r => r.status === "pending").length,
    approved: recipes.filter(r => r.status === "approved").length,
    rejected: recipes.filter(r => r.status === "rejected").length,
  };

  const selectedRecipe = selected ? recipes.find(r => r.id === selected) : null;

  return (
    <>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="max-w-6xl mx-auto px-4 py-8  min-h-screen">

        {selectedRecipe ? (
          <ReviewDetail
            recipe={selectedRecipe}
            onBack={() => setSelected(null)}
            onDecision={onDecision}
          />
        ) : (
          <>
            {/* Header */}
            <div
              className="pb-6 mb-7 border-b border-stone-200"
              style={{ animation:"fadeUp .4s ease both" }}
            >
              <p className="text-[11px] uppercase tracking-[2px] font-semibold text-teal-600 mb-1.5">
                Doctor Portal
              </p>
              <h1 className="text-[26px] font-bold text-stone-900 mb-4">Herbal Recipe Review</h1>

              {/* Stat chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label:"Pending",  count:counts.pending,  cls:"bg-amber-50 text-amber-700 border-amber-200" },
                  { label:"Approved", count:counts.approved, cls:"bg-teal-50  text-teal-700  border-teal-200"  },
                  { label:"Rejected", count:counts.rejected, cls:"bg-red-50   text-red-700   border-red-200"   },
                  { label:"Total",    count:recipes.length,  cls:"bg-stone-100 text-stone-600 border-stone-200"  },
                ].map(s => (
                  <span key={s.label}
                    className={`inline-flex items-center gap-1.5 border text-[11px]
                                font-semibold px-3 py-1.5 rounded-full ${s.cls}`}>
                    {s.label} <span className="font-bold">{s.count}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Filters + search */}
            <div
              className="flex flex-wrap gap-3 items-center mb-5"
              style={{ animation:"fadeUp .4s .05s ease both", opacity:0, animationFillMode:"both" }}
            >
              <div className="inline-flex gap-1 bg-stone-100 border border-stone-200 rounded-xl p-1">
                {[
                  { key:"all",      label:"All"      },
                  { key:"pending",  label:"Pending"  },
                  { key:"approved", label:"Approved" },
                  { key:"rejected", label:"Rejected" },
                ].map(t => (
                  <button key={t.key} onClick={() => setFilter(t.key)}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap
                      ${filter === t.key
                        ? "bg-white text-stone-900 shadow-sm"
                        : "text-stone-500 hover:text-stone-800"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 min-w-45 relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search recipes or submitters…"
                  className="w-full pl-8 pr-4 py-2.5 border border-stone-200 rounded-xl text-[13px]
                             bg-white text-stone-800 outline-none focus:border-teal-400 transition-all
                             placeholder:text-stone-400"
                />
              </div>

              <span className="text-[12px] text-stone-400">{visible.length} recipes</span>
            </div>

            {/* Recipe list */}
            {visible.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-stone-400">
                <p className="text-4xl mb-3">🌿</p>
                <p className="text-[14px] font-semibold text-stone-600">No recipes found</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {visible.map((r, i) => (
                  <div
                    key={r.id}
                    onClick={() => setSelected(r.id)}
                    className="group bg-white border border-stone-200 rounded-2xl p-4 cursor-pointer
                               hover:border-teal-300 hover:shadow-sm transition-all duration-200 flex gap-4"
                    style={{ animation:`fadeUp .35s ${.1 + i * .04}s ease both`, opacity:0, animationFillMode:"both" }}
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      <img src={r.img} alt={r.title} className="w-full h-full object-cover block" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-[14px] font-bold text-stone-900 leading-snug truncate">
                          {r.title}
                        </h3>
                        <StatusBadge status={r.status} />
                      </div>
                      <p className="text-[12px] text-stone-400 mb-2 truncate">{r.desc}</p>
                      <div className="flex flex-wrap gap-3 text-[11px] text-stone-400">
                        <span className="flex items-center gap-1">
                          <User size={10} /> {r.submittedBy} · {r.submittedRole}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {r.submittedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Leaf size={10} /> {r.category}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <Eye size={16} className="text-stone-300 group-hover:text-teal-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ApproveRecipe;