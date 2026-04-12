import React, { useState, useEffect } from "react";
import {
  X, Clock, Users, DollarSign, Flame, ChefHat,
  ExternalLink, CheckCircle2, Circle, ArrowUpRight,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

const isApiUrl = (url) => url && url.includes("api.spoonacular.com");
const stripHtml = (html) => (html ? html.replace(/<[^>]+>/g, "") : "");

// ── Diet badge config ─────────────────────────────────────────────────────────

const DIET_BADGES = {
  vegetarian:  { label: "Vegetarian",  cls: "bg-green-50  text-green-800  border-green-100" },
  vegan:       { label: "Vegan",       cls: "bg-teal-50   text-teal-800   border-teal-100"  },
  glutenFree:  { label: "Gluten-free", cls: "bg-amber-50  text-amber-800  border-amber-100" },
  dairyFree:   { label: "Dairy-free",  cls: "bg-blue-50   text-blue-800   border-blue-100"  },
  veryHealthy: { label: "Very healthy",cls: "bg-emerald-50 text-emerald-800 border-emerald-100" },
};

// ── Stat chip ─────────────────────────────────────────────────────────────────

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-1.5 bg-stone-100 rounded-xl px-3 py-1.5">
    <Icon size={12} className="text-stone-400 shrink-0" />
    <span className="text-[11px] text-stone-500">{label}</span>
    <span className="text-[11px] font-semibold text-stone-700">{value}</span>
  </div>
);

// ── Ingredient row ────────────────────────────────────────────────────────────

const IngRow = ({ ing }) => {
  const amt = ing.measures?.us;
  const qty = amt
    ? `${amt.amount % 1 === 0 ? amt.amount : amt.amount.toFixed(1)} ${amt.unitShort || ""}`.trim()
    : "";

  return (
    <div className="flex items-center gap-3 py-2 border-b border-stone-100 last:border-0">
      {ing.image ? (
        <img
          src={`https://spoonacular.com/cdn/ingredients_50x50/${ing.image}`}
          alt={ing.name}
          className="w-8 h-8 rounded-lg object-cover shrink-0 bg-stone-100"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      ) : (
        <div className="w-8 h-8 rounded-lg bg-stone-100 shrink-0" />
      )}
      <span className="flex-1 text-[13px] text-stone-700">{ing.original}</span>
      {qty && (
        <span className="text-[11px] text-stone-400 whitespace-nowrap font-medium">
          {qty}
        </span>
      )}
    </div>
  );
};

// ── Step row ──────────────────────────────────────────────────────────────────

const StepRow = ({ step, done, onToggle }) => (
  <div
    onClick={onToggle}
    className={`flex gap-3 py-3 cursor-pointer border-b border-stone-100 last:border-0 transition-opacity duration-200 ${
      done ? "opacity-40" : "opacity-100"
    }`}
  >
    {done ? (
      <CheckCircle2 size={16} className="text-teal-500 shrink-0 mt-0.5" />
    ) : (
      <Circle size={16} className="text-stone-300 shrink-0 mt-0.5" />
    )}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
          Step {step.number}
        </span>
        {step.length && (
          <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-100 rounded-full px-2 py-0.5">
            {step.length.number} {step.length.unit}
          </span>
        )}
      </div>
      <p className={`text-[13px] text-stone-700 leading-relaxed ${done ? "line-through" : ""}`}>
        {step.step}
      </p>
    </div>
  </div>
);

// ── Collapsible section ───────────────────────────────────────────────────────

const Section = ({ title, count, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-2.5 border-b border-stone-200"
      >
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-stone-700">{title}</span>
          {count !== undefined && (
            <span className="text-[10px] bg-stone-100 text-stone-500 rounded-full px-2 py-0.5">
              {count}
            </span>
          )}
        </div>
        <span
          className={`text-stone-400 text-[11px] transition-transform duration-200 inline-block ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>
      {open && <div className="pt-2">{children}</div>}
    </div>
  );
};

// ── Skeleton loader ───────────────────────────────────────────────────────────

const Skeleton = () => (
  <div className="p-5 flex flex-col gap-3 animate-pulse">
    <div className="w-full h-40 bg-stone-100 rounded-2xl" />
    <div className="w-3/4 h-4 bg-stone-100 rounded-full" />
    <div className="w-1/2 h-3 bg-stone-100 rounded-full" />
    <div className="w-full h-3 bg-stone-100 rounded-full" />
    <div className="w-5/6 h-3 bg-stone-100 rounded-full" />
  </div>
);

// ── Main modal ────────────────────────────────────────────────────────────────

export const RecipeDetailModal = ({ card, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doneSteps, setDoneSteps] = useState(new Set());

  const needsFetch = isApiUrl(card?.sourceUrl);

  useEffect(() => {
    if (!card) return;
    setDoneSteps(new Set());
    setDetail(null);
    setError(null);

    if (!needsFetch) return;

    setLoading(true);
    fetch(card.sourceUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => { setDetail(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, [card]);

  if (!card) return null;

  const toggleStep = (num) =>
    setDoneSteps((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });

  const diets = detail
    ? Object.entries(DIET_BADGES).filter(([key]) => detail[key])
    : [];
  const steps = detail?.analyzedInstructions?.[0]?.steps ?? [];
  const ingredients = detail?.extendedIngredients ?? [];
  const doneCount = doneSteps.size;

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .modal-sheet  { animation: slideUp .3s cubic-bezier(.32,.72,0,1) both; }
        .modal-backdrop { animation: fadeIn .2s ease both; }
        .modal-scroll::-webkit-scrollbar { width: 3px; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #e7e5e0; border-radius: 99px; }
      `}</style>

      {/* Backdrop */}
      <div
        className="modal-backdrop fixed inset-0 z-50 bg-black/40 flex items-end justify-center"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* Sheet */}
        <div className="modal-sheet w-full max-w-lg bg-white rounded-t-3xl flex flex-col overflow-hidden"
          style={{ maxHeight: "92dvh" }}
        >

          {/* ── Drag handle ── */}
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 bg-stone-200 rounded-full" />
          </div>

          {/* ── Scrollable content ── */}
          <div className="modal-scroll flex-1 overflow-y-auto">

            {/* Hero image with overlay close button */}
            <div className="relative">
              {(detail?.image || card.image) && (
                <img
                  src={detail?.image || card.image}
                  alt={detail?.title || card.title}
                  className="w-full object-cover"
                  style={{ height: 200 }}
                />
              )}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-stone-200 hover:bg-white transition-colors"
              >
                <X size={14} className="text-stone-600" />
              </button>
            </div>

            <div className="px-5 py-4 pb-10">

              {/* Title */}
              <h2 className="text-[18px] font-semibold text-stone-800 leading-snug mb-3">
                {detail?.title || card.title}
              </h2>

              {/* ── CASE A: External webpage ── */}
              {!needsFetch && (
                <div className="space-y-4">
                  {/* Meta pills */}
                  {(card.time || card.serves) && (
                    <div className="flex gap-2 flex-wrap">
                      {card.time  && <Stat icon={Clock}  label="Time"   value={card.time}   />}
                      {card.serves && <Stat icon={Users} label="Serves" value={card.serves} />}
                    </div>
                  )}

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                    <p className="text-[13px] text-stone-500 mb-3 leading-relaxed">
                      This recipe lives on an external site. Tap below to open it.
                    </p>
                    <a
                      href={card.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-[13px] font-semibold rounded-xl px-5 py-2.5 transition-colors"
                    >
                      <ArrowUpRight size={14} />
                      Open full recipe
                    </a>
                  </div>
                </div>
              )}

              {/* ── CASE B: API fetch ── */}
              {needsFetch && loading && <Skeleton />}

              {needsFetch && error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                  <p className="text-[13px] text-red-700 mb-2">
                    Could not load recipe details — {error}
                  </p>
                  <a
                    href={card.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-teal-600 hover:underline inline-flex items-center gap-1"
                  >
                    <ExternalLink size={11} />
                    Try opening original
                  </a>
                </div>
              )}

              {needsFetch && detail && (
                <div className="space-y-5">

                  {/* Stat chips */}
                  <div className="flex gap-2 flex-wrap">
                    {detail.readyInMinutes && (
                      <Stat icon={Clock}      label="Ready in"    value={`${detail.readyInMinutes} min`} />
                    )}
                    {detail.servings && (
                      <Stat icon={Users}      label="Serves"      value={detail.servings} />
                    )}
                    {detail.pricePerServing && (
                      <Stat icon={DollarSign} label="Per serving" value={`$${(detail.pricePerServing / 100).toFixed(2)}`} />
                    )}
                    {detail.healthScore > 0 && (
                      <Stat icon={Flame}      label="Health"      value={`${Math.round(detail.healthScore)}%`} />
                    )}
                  </div>

                  {/* Diet badges */}
                  {diets.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {diets.map(([key, d]) => (
                        <span
                          key={key}
                          className={`text-[11px] font-semibold border rounded-full px-3 py-1 ${d.cls}`}
                        >
                          {d.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Summary */}
                  {detail.summary && (
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                      {stripHtml(detail.summary).slice(0, 300)}…
                    </p>
                  )}

                  {/* Progress bar (steps done) */}
                  {steps.length > 0 && (
                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-stone-500">
                          Cooking progress
                        </span>
                        <span className="text-[11px] text-teal-600 font-semibold">
                          {doneCount}/{steps.length} steps
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all duration-500"
                          style={{ width: `${(doneCount / steps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Ingredients */}
                  {ingredients.length > 0 && (
                    <Section title="Ingredients" count={ingredients.length}>
                      <div className="bg-stone-50 rounded-2xl px-3 py-1">
                        {ingredients.map((ing, i) => <IngRow key={i} ing={ing} />)}
                      </div>
                    </Section>
                  )}

                  {/* Instructions */}
                  {steps.length > 0 && (
                    <Section title="Instructions" count={`${steps.length} steps`}>
                      <p className="text-[11px] text-stone-400 mb-2">
                        Tap a step to mark it done
                      </p>
                      <div className="bg-stone-50 rounded-2xl px-3 py-1">
                        {steps.map((step) => (
                          <StepRow
                            key={step.number}
                            step={step}
                            done={doneSteps.has(step.number)}
                            onToggle={() => toggleStep(step.number)}
                          />
                        ))}
                      </div>
                    </Section>
                  )}

                  {/* Source link */}
                  <a
                    href={detail.spoonacularSourceUrl || detail.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] text-stone-400 hover:text-teal-600 transition-colors"
                  >
                    <ExternalLink size={11} />
                    View on Spoonacular
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};