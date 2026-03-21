import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Plus, Trash2, ChevronLeft, ChevronRight,
  Check, Leaf, Utensils, Lock, Globe, X,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const HERBAL_CATS  = ["Hair","Face & Skin","Body","Immunity","Digestion","Sleep","Weight","General Wellness"];
const GENERAL_CATS = ["Breakfast","Lunch","Dinner","Snacks","Drinks","Desserts"];
const UNITS        = ["g","kg","ml","l","tsp","tbsp","cup","oz","lb","pcs","pinch","to taste"];
const DIFFICULTIES = ["Easy","Medium","Hard"];

const STEP_TITLES = {
  herbal:  ["Type & Access","Basic Info","Ingredients","Instructions","Review"],
  general: ["Type & Access","Basic Info","Ingredients","Instructions","Review"],
};

// ─── Shared UI atoms ──────────────────────────────────────────────────────────

const inputCls = (err) =>
  `w-full px-3 py-2.5 border rounded-xl text-[13px] text-stone-800 bg-white outline-none
   transition-all placeholder:text-stone-400 font-sans
   ${err
     ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
     : "border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-50"}`;

const selectCls = (err) =>
  `${inputCls(err)} appearance-none cursor-pointer`;

const Field = ({ label, required: req, error, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-semibold text-stone-600 tracking-wide">
      {label}{req && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
    {hint  && !error && <p className="text-[11px] text-stone-400">{hint}</p>}
    {error && <p className="text-[11px] text-red-500">{error.message}</p>}
  </div>
);

// Step progress bar
const StepBar = ({ current, total, labels }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[11px] font-semibold text-teal-600 uppercase tracking-widest">
        Step {current} of {total}
      </span>
      <span className="text-[11px] text-stone-400">{labels[current - 1]}</span>
    </div>
    <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-teal-500 rounded-full transition-all duration-500"
        style={{ width:`${((current - 1) / (total - 1)) * 100}%` }}
      />
    </div>
    <div className="flex justify-between mt-2">
      {labels.map((l, i) => (
        <span key={l} className={`text-[10px] font-medium transition-colors ${i + 1 <= current ? "text-teal-600" : "text-stone-300"}`}>
          {l}
        </span>
      ))}
    </div>
  </div>
);

// Nav footer
const NavRow = ({ onBack, onNext, nextLabel = "Next", nextType = "button", disabled = false }) => (
  <div className="flex items-center justify-between pt-6 mt-6 border-t border-stone-100">
    {onBack ? (
      <button
        type="button" onClick={onBack}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-stone-200 rounded-xl
                   text-[13px] font-semibold text-stone-600 hover:bg-stone-50 transition-all"
      >
        <ChevronLeft size={14} /> Back
      </button>
    ) : <div />}
    <button
      type={nextType} onClick={onNext} disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-[13px]
                  font-semibold transition-all active:scale-[0.98]
        ${disabled
          ? "bg-stone-100 text-stone-400 cursor-not-allowed"
          : "bg-teal-600 hover:bg-teal-700 text-white"}`}
    >
      {nextLabel} {nextType !== "submit" && <ChevronRight size={14} />}
    </button>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const DoctorAddRecipe = ({ onSubmit: onSubmitProp }) => {
  const [step,        setStep]        = useState(1);
  const [recipeKind,  setRecipeKind]  = useState(null);   // "herbal" | "general"
  const [access,      setAccess]      = useState(null);   // "public" | "private"
  const [submitted,   setSubmitted]   = useState(false);

  // General recipes are always private — enforce this
  const resolvedAccess = recipeKind === "general" ? "private" : access;

  const {
    register, handleSubmit, control, watch, trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title:"", category:"", difficulty:"", prepTime:"", cookTime:"",
      description:"", benefit:"", herbs:"", warnings:"", steps:"",
      calories:"", protein:"", carbs:"", fat:"",
      ingredients: [{ name:"", quantity:"", unit:"" }],
    },
    mode: "onTouched",
  });

  const { fields: ingFields, append: addIng, remove: removeIng } = useFieldArray({
    control, name:"ingredients",
  });

  const TOTAL = 5;
  const LABELS = recipeKind === "herbal"
    ? ["Type","Basics","Ingredients","Instructions","Review"]
    : ["Type","Basics","Ingredients","Instructions","Review"];

  const goNext = async (fields) => {
    if (fields) { const ok = await trigger(fields); if (!ok) return; }
    setStep(s => s + 1);
    window.scrollTo({ top:0, behavior:"smooth" });
  };
  const goBack = () => { setStep(s => s - 1); window.scrollTo({ top:0, behavior:"smooth" }); };

  const onSubmit = (data) => {
    const payload = { ...data, recipeKind, access: resolvedAccess };
    onSubmitProp?.(payload);
    setSubmitted(true);
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <style>{`.step-card{animation:fadeUp .4s ease both}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div className="max-w-xl mx-auto px-4 py-20 text-center step-card">
          <div className="w-14 h-14 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Check size={24} className="text-teal-600" />
          </div>
          <h2 className="text-[22px] font-bold text-stone-900 mb-2">Recipe Published</h2>
          <p className="text-[13px] text-stone-500 leading-relaxed mb-6">
            Your {recipeKind === "herbal" ? "herbal" : "personal"} recipe has been saved as{" "}
            <span className="font-semibold text-stone-700">{resolvedAccess}</span>.
          </p>
          <button
            onClick={() => { setStep(1); setRecipeKind(null); setAccess(null); setSubmitted(false); }}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-[13px]
                       font-semibold rounded-xl transition-all"
          >
            Add Another Recipe
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`.step-card{animation:fadeUp .4s ease both}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">

        {/* Page header */}
        <div className="mb-6 step-card">
          <p className="text-[11px] uppercase tracking-[2px] font-semibold text-teal-600 mb-1.5">
            Doctor Portal
          </p>
          <h1 className="text-[26px] font-bold text-stone-900">Add a Recipe</h1>
        </div>

        {/* Step bar */}
        <div className="step-card">
          <StepBar current={step} total={TOTAL} labels={LABELS} />
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 step-card">

          {/* ══ STEP 1 — Type & Access ═════════════════════════════════════ */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[18px] font-bold text-stone-900 mb-1">What are you posting?</h2>
                <p className="text-[13px] text-stone-400">Choose the recipe type and who can see it.</p>
              </div>

              {/* Recipe kind */}
              <div>
                <p className="text-[12px] font-semibold text-stone-600 uppercase tracking-wider mb-3">
                  Recipe Type
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      key:"herbal",
                      icon:<Leaf size={20} className="text-teal-600" />,
                      iconBg:"bg-teal-50",
                      title:"Herbal / Ayurvedic",
                      desc:"Natural remedies, herbal preparations — can be public or private.",
                      note:null,
                    },
                    {
                      key:"general",
                      icon:<Utensils size={20} className="text-stone-500" />,
                      iconBg:"bg-stone-100",
                      title:"General Recipe",
                      desc:"Regular food recipe — always saved as private for personal use.",
                      note:"Always private",
                    },
                  ].map(opt => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => { setRecipeKind(opt.key); if (opt.key === "general") setAccess("private"); }}
                      className={`text-left p-4 rounded-xl border-2 transition-all
                        ${recipeKind === opt.key
                          ? opt.key === "herbal"
                            ? "border-teal-400 bg-teal-50/60"
                            : "border-stone-400 bg-stone-50"
                          : "border-stone-200 bg-white hover:border-stone-300"}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${opt.iconBg} flex-shrink-0`}>
                          {opt.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[14px] font-bold ${recipeKind === opt.key ? "text-stone-900" : "text-stone-700"}`}>
                            {opt.title}
                          </p>
                          {opt.note && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full mt-0.5">
                              <Lock size={8} /> {opt.note}
                            </span>
                          )}
                        </div>
                        {recipeKind === opt.key && (
                          <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-[12px] text-stone-400 leading-relaxed">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Access — only for herbal */}
              {recipeKind === "herbal" && (
                <div>
                  <p className="text-[12px] font-semibold text-stone-600 uppercase tracking-wider mb-3">
                    Visibility
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key:"public",  icon:<Globe size={15}/>,  label:"Public",  desc:"Visible to all users." },
                      { key:"private", icon:<Lock  size={15}/>,  label:"Private", desc:"Only visible to you."  },
                    ].map(v => (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => setAccess(v.key)}
                        className={`text-left p-3.5 rounded-xl border-2 transition-all
                          ${access === v.key
                            ? "border-teal-400 bg-teal-50/60"
                            : "border-stone-200 bg-white hover:border-stone-300"}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={access === v.key ? "text-teal-600" : "text-stone-400"}>{v.icon}</span>
                            <span className={`text-[13px] font-bold ${access === v.key ? "text-stone-900" : "text-stone-700"}`}>
                              {v.label}
                            </span>
                          </div>
                          {access === v.key && (
                            <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
                              <Check size={9} className="text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400">{v.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Info banner for general */}
              {recipeKind === "general" && (
                <div className="flex items-start gap-3 bg-stone-50 border border-stone-200 rounded-xl p-3.5">
                  <Lock size={14} className="text-stone-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-stone-500 leading-relaxed">
                    General recipes are always <span className="font-semibold text-stone-700">private</span>.
                    Only herbal recipes can be shared publicly with patients.
                  </p>
                </div>
              )}

              <NavRow
                onNext={() => goNext()}
                disabled={!recipeKind || (recipeKind === "herbal" && !access)}
              />
            </div>
          )}

          {/* ══ STEP 2 — Basic Info ════════════════════════════════════════ */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-[18px] font-bold text-stone-900 mb-1">Basic Information</h2>
                <p className="text-[13px] text-stone-400">
                  {recipeKind === "herbal" ? "Describe your herbal preparation." : "Describe your personal recipe."}
                </p>
              </div>

              <Field label="Recipe Title" required error={errors.title}>
                <input
                  {...register("title", { required:"Title is required" })}
                  className={inputCls(errors.title)}
                  placeholder={recipeKind === "herbal" ? "e.g. Ashwagandha Night Tonic" : "e.g. Dal Makhani"}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Category" required error={errors.category}>
                  <div className="relative">
                    <select
                      {...register("category", { required:"Select a category" })}
                      className={selectCls(errors.category)}
                    >
                      <option value="">Select category</option>
                      {(recipeKind === "herbal" ? HERBAL_CATS : GENERAL_CATS).map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronRight size={12} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-stone-400 pointer-events-none" />
                  </div>
                </Field>

                <Field label="Difficulty" error={errors.difficulty}>
                  <div className="relative">
                    <select {...register("difficulty")} className={selectCls(false)}>
                      <option value="">Select difficulty</option>
                      {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <ChevronRight size={12} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-stone-400 pointer-events-none" />
                  </div>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Prep Time">
                  <input type="time" {...register("prepTime")} className={inputCls(false)} />
                </Field>
                <Field label="Cook Time">
                  <input type="time" {...register("cookTime")} className={inputCls(false)} />
                </Field>
              </div>

              <Field label="Description" required error={errors.description}>
                <textarea
                  {...register("description", { required:"Add a short description" })}
                  className={`${inputCls(errors.description)} resize-none min-h-[88px]`}
                  placeholder={recipeKind === "herbal"
                    ? "What is this remedy for? Who should use it?"
                    : "Describe this recipe briefly…"}
                />
              </Field>

              {/* Herbal-specific */}
              {recipeKind === "herbal" && (
                <>
                  <Field label="Key Benefit" required error={errors.benefit}>
                    <input
                      {...register("benefit", { required:"Add the primary benefit" })}
                      className={inputCls(errors.benefit)}
                      placeholder="e.g. Promotes deep sleep, Boosts immunity"
                    />
                  </Field>
                  <Field label="Herbs / Botanicals Used" required error={errors.herbs} hint="Comma-separated">
                    <input
                      {...register("herbs", { required:"List the herbs" })}
                      className={inputCls(errors.herbs)}
                      placeholder="e.g. Ashwagandha, Brahmi, Tulsi"
                    />
                  </Field>
                  <Field label="Warnings / Contraindications" hint="Optional but recommended">
                    <textarea
                      {...register("warnings")}
                      className={`${inputCls(false)} resize-none min-h-[72px]`}
                      placeholder="e.g. Not suitable for pregnant women. Consult before use."
                    />
                  </Field>
                </>
              )}

              <NavRow
                onBack={goBack}
                onNext={() => goNext(["title","category","description",...(recipeKind === "herbal" ? ["benefit","herbs"] : [])])}
              />
            </div>
          )}

          {/* ══ STEP 3 — Ingredients ══════════════════════════════════════ */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-[18px] font-bold text-stone-900 mb-1">Ingredients</h2>
                <p className="text-[13px] text-stone-400">Add each ingredient with quantity and unit.</p>
              </div>

              {/* Column labels */}
              <div className="grid grid-cols-[1fr_80px_90px_36px] gap-2 px-1">
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                  {recipeKind === "herbal" ? "Herb / Ingredient" : "Ingredient"}
                </p>
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Amount</p>
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Unit</p>
                <span />
              </div>

              <div className="flex flex-col gap-2">
                {ingFields.map((field, idx) => (
                  <div key={field.id} className="grid grid-cols-[1fr_80px_90px_36px] gap-2 items-center">
                    <input
                      {...register(`ingredients.${idx}.name`, { required:true })}
                      className={inputCls(errors.ingredients?.[idx]?.name)}
                      placeholder={recipeKind === "herbal" ? "e.g. Ashwagandha" : "e.g. Onion"}
                    />
                    <input
                      {...register(`ingredients.${idx}.quantity`)}
                      className={inputCls(false)}
                      placeholder="2"
                    />
                    <div className="relative">
                      <select
                        {...register(`ingredients.${idx}.unit`)}
                        className={`${selectCls(false)} text-[12px]`}
                      >
                        <option value="">Unit</option>
                        {UNITS.map(u => <option key={u}>{u}</option>)}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => ingFields.length > 1 && removeIng(idx)}
                      disabled={ingFields.length === 1}
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all
                        ${ingFields.length === 1
                          ? "border-stone-100 text-stone-300 cursor-not-allowed"
                          : "border-stone-200 text-stone-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500"}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addIng({ name:"", quantity:"", unit:"" })}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal-600
                           bg-teal-50 border border-dashed border-teal-200 rounded-xl px-4 py-2.5
                           hover:bg-teal-100 transition-all self-start"
              >
                <Plus size={13} /> Add Ingredient
              </button>

              <NavRow onBack={goBack} onNext={() => goNext()} />
            </div>
          )}

          {/* ══ STEP 4 — Instructions + Nutrition ════════════════════════ */}
          {step === 4 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-[18px] font-bold text-stone-900 mb-1">Instructions</h2>
                <p className="text-[13px] text-stone-400">Write out each step clearly.</p>
              </div>

              <Field label="Steps" required error={errors.steps}>
                <textarea
                  {...register("steps", { required:"Add at least one step" })}
                  className={`${inputCls(errors.steps)} resize-none min-h-[140px]`}
                  placeholder={recipeKind === "herbal"
                    ? "Step 1: Boil 2 cups water…\nStep 2: Add herbs and steep for 10 min…"
                    : "Step 1: Chop onions finely…\nStep 2: Heat oil in pan…"}
                />
              </Field>

              <div>
                <p className="text-[12px] font-semibold text-stone-600 uppercase tracking-wider mb-3">
                  {recipeKind === "herbal" ? "Dosage Info (Optional)" : "Nutrition Info (Optional)"}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(recipeKind === "herbal"
                    ? [
                        { name:"calories", placeholder:"Dosage"    },
                        { name:"protein",  placeholder:"Frequency" },
                        { name:"carbs",    placeholder:"Duration"  },
                        { name:"fat",      placeholder:"Age group" },
                      ]
                    : [
                        { name:"calories", placeholder:"Calories"    },
                        { name:"protein",  placeholder:"Protein (g)" },
                        { name:"carbs",    placeholder:"Carbs (g)"   },
                        { name:"fat",      placeholder:"Fat (g)"     },
                      ]
                  ).map(f => (
                    <input
                      key={f.name}
                      {...register(f.name)}
                      className={inputCls(false)}
                      placeholder={f.placeholder}
                    />
                  ))}
                </div>
              </div>

              <NavRow onBack={goBack} onNext={() => goNext(["steps"])} />
            </div>
          )}

          {/* ══ STEP 5 — Review & Submit ══════════════════════════════════ */}
          {step === 5 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-[18px] font-bold text-stone-900 mb-1">Review & Publish</h2>
                <p className="text-[13px] text-stone-400">Confirm the details before submitting.</p>
              </div>

              {/* Summary card */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl divide-y divide-stone-100">
                {[
                  { label:"Title",      value: watch("title")       },
                  { label:"Type",       value: recipeKind === "herbal" ? "Herbal / Ayurvedic" : "General Recipe" },
                  { label:"Visibility", value: resolvedAccess === "public" ? "Public" : "Private" },
                  { label:"Category",   value: watch("category")    },
                  { label:"Difficulty", value: watch("difficulty")  },
                  { label:"Prep Time",  value: watch("prepTime")    },
                  { label:"Cook Time",  value: watch("cookTime")    },
                  ...(recipeKind === "herbal" ? [
                    { label:"Benefit",  value: watch("benefit")     },
                    { label:"Herbs",    value: watch("herbs")       },
                  ] : []),
                ].filter(r => r.value).map(row => (
                  <div key={row.label} className="flex justify-between px-4 py-2.5">
                    <span className="text-[12px] text-stone-400 font-medium">{row.label}</span>
                    <span className="text-[12px] font-semibold text-stone-800 text-right max-w-[55%] truncate">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Access reminder */}
              <div className={`flex items-start gap-3 rounded-xl p-3.5 border
                ${resolvedAccess === "public"
                  ? "bg-teal-50 border-teal-100"
                  : "bg-stone-50 border-stone-200"}`}>
                {resolvedAccess === "public"
                  ? <Globe size={14} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  : <Lock  size={14} className="text-stone-400 flex-shrink-0 mt-0.5" />}
                <p className={`text-[12px] leading-relaxed ${resolvedAccess === "public" ? "text-teal-700" : "text-stone-500"}`}>
                  This recipe will be saved as{" "}
                  <span className="font-bold">{resolvedAccess}</span>.
                  {resolvedAccess === "public"
                    ? " It will be visible to all patients and users."
                    : " Only you can see this in your personal dashboard."}
                </p>
              </div>

              {/* Final nav */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <button
                  type="button" onClick={goBack}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-stone-200
                             rounded-xl text-[13px] font-semibold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700
                             text-white text-[13px] font-semibold rounded-xl transition-all active:scale-[0.98]"
                >
                  <Check size={14} /> Publish Recipe
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default DoctorAddRecipe;