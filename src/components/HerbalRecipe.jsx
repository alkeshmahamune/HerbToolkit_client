import React, { useState, useMemo } from "react";
import {
  Search, Bookmark, Clock, Play, BookOpen, X, ChevronRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "all", label: "All", color: "#7a8c5e",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "hair", label: "Hair", color: "#8b6914",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
        <path d="M8 6c0-2 1-3 4-3s4 1 4 3"/>
      </svg>
    ),
  },
  {
    id: "face", label: "Face", color: "#c2500a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
      </svg>
    ),
  },
  {
    id: "body", label: "Body", color: "#7a5ea7",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
        <path d="M6 8h12l-1 8H7L6 8z"/>
        <path d="M9 16l-2 6M15 16l2 6"/>
      </svg>
    ),
  },
  {
    id: "immunity", label: "Immunity", color: "#1a7a4a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"/>
      </svg>
    ),
  },
  {
    id: "digestion", label: "Digestion", color: "#b85c00",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M12 2c-3 0-6 2-6 5s3 4 3 7-2 4-2 4h10s-2-1-2-4 3-4 3-7-3-5-6-5z"/>
      </svg>
    ),
  },
  {
    id: "sleep", label: "Sleep", color: "#3a5fa0",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
  },
  {
    id: "weight", label: "Weight", color: "#2a7a6a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M6 18L3 6l9-3 9 3-3 12H6z"/>
        <line x1="12" y1="3" x2="12" y2="18"/>
      </svg>
    ),
  },
];

const RECIPES = [
  // HAIR
  {
    id:1, cat:"hair", type:"text",
    title:"Amla & Bhringraj Hair Oil",
    desc:"A traditional Ayurvedic recipe to stimulate hair growth, reduce greying and deeply nourish the scalp with potent herbal oils.",
    img:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80",
    herbs:["Amla","Bhringraj","Coconut Oil","Fenugreek"],
    time:"30 min", benefit:"Promotes growth",
    steps:["Heat 200ml coconut oil in a pan on low flame.","Add 2 tbsp dried amla powder and 2 tbsp bhringraj powder.","Stir in 1 tbsp fenugreek seeds.","Simmer on low heat for 20 min until aromatic.","Strain through muslin cloth into a glass bottle.","Massage into scalp 2–3 times per week."],
  },
  {
    id:2, cat:"hair", type:"video",
    title:"Onion Juice for Hair Regrowth",
    desc:"Rich in sulphur, onion juice boosts collagen production and reactivates dormant hair follicles naturally.",
    img:"https://images.unsplash.com/photo-1618090584176-7132b9911657?w=500&q=80",
    herbs:["Onion","Castor Oil","Rosemary"],
    time:"20 min", benefit:"Reduces hair fall",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Blend 2 medium onions and strain to extract juice.","Mix with 1 tbsp castor oil and 5 drops rosemary oil.","Apply to scalp and leave for 30–45 minutes.","Rinse with mild shampoo and cool water.","Repeat twice a week for 3 months."],
  },
  {
    id:3, cat:"hair", type:"text",
    title:"Fenugreek Seed Hair Mask",
    desc:"Fenugreek seeds are packed with proteins and nicotinic acid that strengthen hair shafts and add brilliant gloss.",
    img:"https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&q=80",
    herbs:["Fenugreek","Yoghurt","Hibiscus"],
    time:"15 min", benefit:"Deep conditioning",
    steps:["Soak 4 tbsp fenugreek seeds overnight in water.","Grind into a smooth paste the next morning.","Mix with 3 tbsp plain yoghurt.","Add crushed hibiscus petals for extra shine.","Apply from root to tip, cover with shower cap.","Leave for 45 min then rinse thoroughly."],
  },
  // FACE
  {
    id:4, cat:"face", type:"text",
    title:"Turmeric & Honey Glow Mask",
    desc:"Ancient Vedic beauty ritual combining turmeric's anti-inflammatory power with honey's moisturising enzymes.",
    img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80",
    herbs:["Turmeric","Raw Honey","Rose Water","Sandalwood"],
    time:"10 min", benefit:"Brightening glow",
    steps:["Mix ½ tsp turmeric powder with 1 tbsp raw honey.","Add 3–4 drops of rose water to thin the consistency.","Optionally add a pinch of sandalwood powder.","Apply evenly to cleansed face, avoiding eye area.","Leave for 15–20 minutes.","Rinse with lukewarm water and pat dry."],
  },
  {
    id:5, cat:"face", type:"video",
    title:"Neem Leaves Anti-Acne Steam",
    desc:"Neem's powerful antibacterial and antifungal properties deep-clean pores and reduce active breakouts.",
    img:"https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
    herbs:["Neem","Tulsi","Lavender"],
    time:"25 min", benefit:"Clears acne",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Boil 2 cups of water in a wide bowl.","Add a handful of fresh neem and tulsi leaves.","Add 3 drops lavender essential oil.","Drape a towel over your head and steam face for 10 min.","Rinse with cold water to close pores.","Follow with a light moisturiser."],
  },
  {
    id:6, cat:"face", type:"text",
    title:"Rose & Aloe Vera Toner",
    desc:"Soothe and balance your skin's pH with this gentle rose-aloe toner that tightens pores and deeply hydrates.",
    img:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80",
    herbs:["Rose Petals","Aloe Vera","Witch Hazel","Cucumber"],
    time:"5 min", benefit:"Pore tightening",
    steps:["Blend ½ cup fresh rose petals with ¼ cup water.","Strain through fine mesh cloth.","Mix with 2 tbsp aloe vera gel.","Add 1 tbsp witch hazel.","Store in a spray bottle in the refrigerator.","Spritz on face after cleansing morning and night."],
  },
  // BODY
  {
    id:7, cat:"body", type:"text",
    title:"Lavender & Oat Bath Soak",
    desc:"A deeply relaxing full-body soak that soothes irritated skin, relieves muscle tension and promotes calm.",
    img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&q=80",
    herbs:["Lavender","Oats","Epsom Salt","Chamomile"],
    time:"40 min", benefit:"Muscle relief",
    steps:["Mix 2 cups Epsom salt with 1 cup colloidal oat flour.","Add 1 cup dried lavender flowers.","Add 2 tbsp dried chamomile flowers.","Draw a warm bath and dissolve the mix.","Soak for 20–30 minutes.","Pat dry and apply a natural body oil."],
  },
  {
    id:8, cat:"body", type:"video",
    title:"Coffee & Coconut Scrub",
    desc:"Exfoliate dull skin, target cellulite and boost circulation with this energising herbal body scrub.",
    img:"https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&q=80",
    herbs:["Coffee","Coconut Oil","Peppermint","Brown Sugar"],
    time:"15 min", benefit:"Glowing skin",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Combine 1 cup ground coffee with ½ cup brown sugar.","Melt 3 tbsp coconut oil and add to mixture.","Stir in 5 drops peppermint essential oil.","Apply to damp skin in circular motions.","Focus on rough areas: knees, elbows, heels.","Rinse off in the shower."],
  },
  // IMMUNITY
  {
    id:9, cat:"immunity", type:"text",
    title:"Golden Milk (Haldi Doodh)",
    desc:"The classic Ayurvedic immune tonic — a warming blend of turmeric, black pepper and spices in milk.",
    img:"https://images.unsplash.com/photo-1534353473418-4cfa0c23c77d?w=500&q=80",
    herbs:["Turmeric","Black Pepper","Ginger","Cinnamon","Cardamom"],
    time:"10 min", benefit:"Immunity boost",
    steps:["Heat 1 cup milk in a saucepan.","Whisk in 1 tsp turmeric, ½ tsp ginger powder.","Add ¼ tsp cinnamon and a pinch of black pepper.","Sweeten with honey or jaggery.","Simmer on low heat for 3–4 minutes.","Drink warm before bedtime."],
  },
  {
    id:10, cat:"immunity", type:"video",
    title:"Elderberry & Ginger Syrup",
    desc:"A potent antiviral elderberry syrup boosted with ginger and cloves — your seasonal cold shield.",
    img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    herbs:["Elderberry","Ginger","Cloves","Cinnamon","Honey"],
    time:"45 min", benefit:"Cold & flu defence",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Combine 1 cup dried elderberries with 3 cups water.","Add 1 tbsp fresh grated ginger.","Add 1 cinnamon stick and 5 whole cloves.","Bring to boil then simmer 45 min until reduced by half.","Cool slightly, strain and mash berries.","Mix in 1 cup raw honey. Refrigerate for up to 3 months."],
  },
  // DIGESTION
  {
    id:11, cat:"digestion", type:"text",
    title:"Ginger & Fennel Digestive Tea",
    desc:"Calm bloating, improve gut motility and soothe post-meal discomfort with this powerful herbal blend.",
    img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    herbs:["Ginger","Fennel","Peppermint","Licorice Root"],
    time:"8 min", benefit:"Reduces bloating",
    steps:["Boil 2 cups water in a small pot.","Add 1 tsp freshly grated ginger.","Add 1 tsp fennel seeds and 5 fresh peppermint leaves.","Steep for 5–7 minutes covered.","Strain into a cup.","Sip slowly after meals."],
  },
  {
    id:12, cat:"digestion", type:"video",
    title:"Triphala Morning Cleanse",
    desc:"The three-fruit Ayurvedic formula that gently detoxifies the digestive tract and supports regularity.",
    img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
    herbs:["Triphala","Warm Water","Honey","Lemon"],
    time:"5 min", benefit:"Gut cleanse",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Mix ½ tsp triphala powder with ½ cup warm water.","Squeeze in juice of ¼ lemon.","Add ½ tsp raw honey and stir well.","Drink on an empty stomach first thing in the morning.","Wait 30 minutes before eating breakfast.","Continue for 30 days for best results."],
  },
  // SLEEP
  {
    id:13, cat:"sleep", type:"text",
    title:"Ashwagandha Warm Milk",
    desc:"A calming adaptogen blend that lowers cortisol, eases anxiety and prepares your body for deep sleep.",
    img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
    herbs:["Ashwagandha","Nutmeg","Cardamom","Warm Milk","Honey"],
    time:"8 min", benefit:"Deep sleep aid",
    steps:["Warm 1 cup of milk without boiling.","Whisk in ½ tsp ashwagandha root powder.","Add a pinch each of nutmeg and cardamom.","Sweeten with raw honey after removing from heat.","Sip slowly 30 minutes before bedtime.","Practice consistently for 4–6 weeks."],
  },
  {
    id:14, cat:"sleep", type:"video",
    title:"Valerian & Chamomile Night Tea",
    desc:"Two of nature's most powerful nervines combine to relax the mind and body for uninterrupted sleep.",
    img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    herbs:["Valerian Root","Chamomile","Passionflower","Lemon Balm"],
    time:"12 min", benefit:"Reduces insomnia",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Boil 1.5 cups of water and reduce to a simmer.","Add 1 tsp dried valerian root, steep 10 min.","Add 2 tbsp chamomile and passionflower flowers.","Steep an additional 5 minutes.","Strain and add a slice of lemon.","Drink warm 1 hour before bed."],
  },
  // WEIGHT
  {
    id:15, cat:"weight", type:"text",
    title:"Cinnamon & Ginger Detox Water",
    desc:"Boost metabolism, balance blood sugar and reduce cravings with this gentle herbal fat-flushing water.",
    img:"https://images.unsplash.com/photo-1554478693-f1c2fd6f4b4a?w=500&q=80",
    herbs:["Cinnamon","Ginger","Lemon","Apple Cider Vinegar","Cucumber"],
    time:"5 min", benefit:"Metabolism boost",
    steps:["Add 1 cinnamon stick to 1 litre of cold water.","Slice in 5 rounds of fresh ginger.","Add 3 slices of lemon and 5 slices of cucumber.","Add 1 tbsp raw apple cider vinegar.","Refrigerate overnight for best infusion.","Drink throughout the day, especially before meals."],
  },
  {
    id:16, cat:"weight", type:"video",
    title:"Jeera (Cumin) Slimming Water",
    desc:"An ancient Ayurvedic remedy — soaked cumin water that suppresses appetite and fires up digestion.",
    img:"https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&q=80",
    herbs:["Cumin Seeds","Coriander","Fennel","Fenugreek"],
    time:"Overnight", benefit:"Fat burning",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Soak 1 tsp each cumin, coriander and fennel seeds overnight.","Boil the soaked seeds in the water in the morning.","Simmer for 5 minutes then strain.","Let it cool slightly — drink warm.","Have on an empty stomach each morning.","Maintain for 30 days for visible results."],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const CategoryButton = ({ cat, active, count, onClick }) => (
  <button
    onClick={onClick}
    style={{ animationFillMode: "both" }}
    className={`shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border-[1.5px]
                min-w-19 cursor-pointer transition-all duration-200
                ${active
                  ? "bg-[#2c3320] border-[#2c3320] shadow-md"
                  : "bg-white border-[#e4dfc8] hover:border-[#7a8c5e] hover:bg-[#f7f5ee]"}`}
  >
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all
        ${active ? "bg-[#3d4a2a]" : "bg-[#eef0e6]"}`}
      style={{ color: active ? "#9aaa7a" : cat.color }}
    >
      {cat.icon}
    </div>
    <span className={`text-[11px] font-medium whitespace-nowrap ${active ? "text-[#e8e4d4]" : "text-[#4a5535]"}`}>
      {cat.label}
    </span>
    <span className="text-[10px] text-[#9aaa7a]">{count}</span>
  </button>
);

const HerbTag = ({ name }) => (
  <span className="text-[10px] font-medium bg-[#eef0e6] text-[#4a5535] px-2 py-0.5 rounded-md">
    {name}
  </span>
);

const RecipeCard = ({ recipe, saved, onSave, onClick, index }) => {
  const catLabel = CATEGORIES.find(c => c.id === recipe.cat)?.label ?? recipe.cat;
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[20px] overflow-hidden border border-[#e4dfc8] cursor-pointer
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ animation: `fadeUp 0.4s ${index * 0.06}s ease both`, opacity: 0, animationFillMode: "both" }}
    >
      {/* Image */}
      <div className="relative w-full h-44 bg-[#eef0e6] overflow-hidden">
        <img
          src={recipe.img} alt={recipe.title} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {recipe.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#2c3320]/20">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play size={16} fill="#2c3320" className="text-[#2c3320] ml-0.5" />
            </div>
          </div>
        )}
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-white/90 rounded-full px-2.5 py-1 text-[11px] font-medium text-[#2c3320]">
          {recipe.type === "video" ? <><Play size={10} fill="#2c3320"/> Video</> : <><BookOpen size={10}/> Text</>}
        </span>
        <span className="absolute top-2.5 right-2.5 bg-[#2c3320]/80 text-[#d4e4b0] text-[10px] font-medium rounded-full px-2.5 py-1">
          {catLabel}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-serif text-[15px] font-semibold text-[#2c3320] leading-snug mb-1.5">
          {recipe.title}
        </h3>
        <p className="text-[12px] text-[#6b7a54] leading-relaxed mb-3 line-clamp-2">
          {recipe.desc}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#7a8c5e] bg-[#f3f0e8] px-2.5 py-1 rounded-full">
            <Clock size={10} /> {recipe.time}
          </span>
        </div>

        {/* Herbs */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {recipe.herbs.slice(0, 3).map(h => <HerbTag key={h} name={h} />)}
          {recipe.herbs.length > 3 && (
            <HerbTag name={`+${recipe.herbs.length - 3}`} />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[#f0ece0]">
          <span className="text-[11px] font-medium text-[#7a8c5e]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#7a8c5e] mr-1.5" />
            {recipe.benefit}
          </span>
          <button
            onClick={e => { e.stopPropagation(); onSave(recipe.id); }}
            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all
              ${saved
                ? "bg-[#eef0e6] border-[#b5c99a] text-[#4a5535]"
                : "border-[#e4dfc8] text-[#9aaa7a] hover:bg-[#eef0e6] hover:border-[#b5c99a] hover:text-[#4a5535]"}`}
          >
            <Bookmark size={12} fill={saved ? "#4a5535" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;
  const catLabel = CATEGORIES.find(c => c.id === recipe.cat)?.label ?? recipe.cat;

  return (
    <div
      className="fixed inset-0 bg-[#1e2314]/50 flex items-center justify-center z-50 px-4 py-6"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg max-h-[88vh] overflow-y-auto
                   scrollbar-thin scrollbar-thumb-[#e4dfc8]"
        style={{ animation: "pop .25s ease both" }}
      >
        {/* ── Media — video player or static image ── */}
        <div className="relative">
          {recipe.type === "video" && recipe.video ? (
            <div className="relative w-full bg-black rounded-t-3xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <video
                src={recipe.video}
                controls
                autoPlay={false}
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
                style={{ display: "block" }}
              />
            </div>
          ) : (
            <img
              src={recipe.img}
              alt={recipe.title}
              className="w-full h-56 object-cover rounded-t-3xl"
            />
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center
                       text-[#2c3320] hover:bg-white transition-all shadow"
          >
            <X size={16} />
          </button>

          {/* Type badge — only show for text recipes (video has its own controls) */}
          {recipe.type !== "video" && (
            <span className="absolute bottom-3 left-3 bg-white/90 rounded-full px-3 py-1 text-[11px] font-medium text-[#2c3320] inline-flex items-center gap-1">
              <BookOpen size={10} /> Text Recipe
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="p-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7a8c5e] mb-2">
            {catLabel} · {recipe.time}
          </p>
          <h2 className="font-serif text-[22px] font-bold text-[#2c3320] leading-tight mb-3">
            {recipe.title}
          </h2>
          <p className="text-[13px] text-[#5a6644] leading-relaxed mb-4">{recipe.desc}</p>

          {/* Herbs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {recipe.herbs.map(h => (
              <span key={h} className="text-[11px] font-medium bg-[#eef0e6] text-[#4a5535] px-3 py-1 rounded-lg">
                {h}
              </span>
            ))}
          </div>

          {/* Steps */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9aaa7a] mb-3">
            How to make it
          </p>
          <div className="flex flex-col gap-3 mb-5">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#eef0e6] flex items-center justify-center text-[10px] font-bold text-[#4a5535] shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-[13px] text-[#2c3320] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Footer tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#f0ece0]">
            <span className="text-[12px] font-medium bg-[#eef0e6] text-[#4a5535] px-3 py-1.5 rounded-full">
              ✦ {recipe.benefit}
            </span>
            <span className="text-[12px] font-medium bg-[#eef0e6] text-[#4a5535] px-3 py-1.5 rounded-full">
              ⏱ {recipe.time}
            </span>
            <span className="text-[12px] font-medium bg-[#eef0e6] text-[#4a5535] px-3 py-1.5 rounded-full capitalize">
              {recipe.type === "video" ? "▶ Video guide" : "📖 Text guide"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const HerbalRecipes = () => {
  const [activeCat,  setActiveCat]  = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [search,     setSearch]     = useState("");
  const [savedIds,   setSavedIds]   = useState(new Set());
  const [modalItem,  setModalItem]  = useState(null);

  const counts = useMemo(() =>
    Object.fromEntries(
      CATEGORIES.map(c => [
        c.id,
        c.id === "all" ? RECIPES.length : RECIPES.filter(r => r.cat === c.id).length,
      ])
    ),
    []
  );

  const filtered = useMemo(() =>
    RECIPES.filter(r => {
      const matchCat  = activeCat  === "all" || r.cat  === activeCat;
      const matchType = activeType === "all" || r.type === activeType;
      const q = search.toLowerCase();
      const matchQ = !q ||
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q)  ||
        r.herbs.some(h => h.toLowerCase().includes(q));
      return matchCat && matchType && matchQ;
    }),
    [activeCat, activeType, search]
  );

  const toggleSave = (id) =>
    setSavedIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pop    { from { opacity:0; transform:scale(.94)       } to { opacity:1; transform:scale(1)     } }
        .font-serif { font-family: Georgia, 'Times New Roman', serif; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .scrollbar-thin::-webkit-scrollbar { width:4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background:#e4dfc8; border-radius:99px; }
        .cat-scroll::-webkit-scrollbar { display:none; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-10  min-h-screen">

        {/* ── Hero ── */}
        <div
          className="text-start mb-10"
          style={{ animation: "fadeUp .5s ease both" }}
        >
          <p className="text-[11px] font-semibold tracking-[2px] uppercase text-[#7a8c5e] mb-2">
            🌿 Nature's Pharmacy
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Herbal Kitchen
      </h2>
        </div>

        {/* ── Category Strip ── */}
        <div className="cat-scroll flex gap-2.5 overflow-x-auto pb-1 mb-8">
          {CATEGORIES.map(cat => (
            <CategoryButton
              key={cat.id}
              cat={cat}
              active={activeCat === cat.id}
              count={counts[cat.id]}
              onClick={() => setActiveCat(cat.id)}
            />
          ))}
        </div>

        {/* ── Filter Bar ── */}
        <div className="flex flex-wrap gap-2.5 items-center mb-6">
          {/* Search */}
          <div className="flex-1 min-w-50 flex items-center gap-2 bg-white border-[1.5px] border-[#e4dfc8]
                          rounded-xl px-3.5 py-2.5 focus-within:border-[#7a8c5e] transition-all">
            <Search size={14} className="text-[#9aaa7a] shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search remedies, herbs…"
              className="flex-1 text-[13px] text-[#2c3320] bg-transparent outline-none placeholder:text-[#b5b89e]"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-[#9aaa7a] hover:text-[#4a5535]">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Type pills */}
          {[
            { key: "all",   label: "All"        },
            { key: "text",  label: "📖 Text"     },
            { key: "video", label: "▶ Video"     },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveType(t.key)}
              className={`px-4 py-2 rounded-full border-[1.5px] text-[12px] font-medium transition-all whitespace-nowrap
                ${activeType === t.key
                  ? "bg-[#2c3320] border-[#2c3320] text-[#e8e4d4]"
                  : "bg-white border-[#e4dfc8] text-[#5a6644] hover:border-[#7a8c5e]"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Results count ── */}
        <p className="text-[12px] text-[#9aaa7a] mb-4">
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} found
          {activeCat !== "all" && ` in ${CATEGORIES.find(c => c.id === activeCat)?.label}`}
        </p>

        {/* ── Cards grid ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9aaa7a]">
            <p className="text-4xl mb-4">🌿</p>
            <p className="text-[14px]">No herbal recipes found for your search.</p>
            <p className="text-[12px] mt-1">Try a different filter or keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((recipe, i) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={i}
                saved={savedIds.has(recipe.id)}
                onSave={toggleSave}
                onClick={() => setModalItem(recipe)}
              />
            ))}
          </div>
        )}

      </div>

      {/* ── Detail Modal ── */}
      {modalItem && (
        <RecipeModal recipe={modalItem} onClose={() => setModalItem(null)} />
      )}
    </>
  );
};

export default HerbalRecipes;