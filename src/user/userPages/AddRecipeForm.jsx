import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Clock,
  Users,
  Flame,
  Plus,
  X,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const CUISINES = [
  "Indian",
  "Italian",
  "Asian",
  "Chinese",
  "Continental",
  "Japanese",
  "Korean",
  "Mexican",
  "Other",
];

const BG_SWATCHES = ["#fef3e2", "#e0f2fe", "#dcfce7", "#f3e8ff", "#fce7f3"];
const TC_SWATCHES = ["#92400e", "#075985", "#166534", "#6b21a8", "#9d174d"];

const DIFFICULTY_OPTIONS = [
  { val: "Easy", active: "bg-green-50 border-green-300 text-green-800" },
  { val: "Medium", active: "bg-amber-50 border-amber-300 text-amber-800" },
  { val: "Hard", active: "bg-rose-50  border-rose-300  text-rose-800" },
];

// Fields that belong to each step — used for per-step validation trigger
const STEP_FIELDS = {
  0: ["title", "desc", "cuisine", "cal"],
  1: ["time", "serving", "difficulty", "rating", "reviews", "ingredients"],
  2: ["steps"],
  3: ["author", "authorInit", "authorBg", "authorTc"],
};

const STEPS_META = [
  { label: "Basics", icon: "📋" },
  { label: "Details", icon: "⏱️" },
  { label: "Steps", icon: "📝" },
  { label: "Author", icon: "👤" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputCls = (hasError) =>
  `w-full px-3 py-2.5 rounded-xl border text-[13px] text-stone-800 bg-white outline-none transition-all
   ${
     hasError
       ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
       : "border-stone-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
   }`;

// ─── Shared sub-components ────────────────────────────────────────────────────

const Field = ({ label, required: req, error, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-medium text-stone-600 tracking-wide">
      {label}
      {req && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
    {hint && !error && <p className="text-[11px] text-stone-400">{hint}</p>}
    {error && <p className="text-[11px] text-red-400">{error.message}</p>}
  </div>
);

// ─── Step indicator at the top ────────────────────────────────────────────────

const StepIndicator = ({ current, completed }) => (
  <div className="flex items-center justify-between mb-8 relative">
    {/* connecting line */}
    <div className="absolute top-4 left-0 right-0 h-px bg-stone-200 z-0" />
    <div
      className="absolute top-4 left-0 h-px bg-teal-400 z-0 transition-all duration-500"
      style={{ width: `${(current / (STEPS_META.length - 1)) * 100}%` }}
    />

    {STEPS_META.map((s, i) => {
      const done = completed.includes(i);
      const active = i === current;
      const future = i > current && !done;
      return (
        <div key={i} className="flex flex-col items-center gap-1.5 z-10">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold
                        border-2 transition-all duration-300
                        ${done ? "bg-teal-600 border-teal-600 text-white" : ""}
                        ${active ? "bg-white border-teal-600 text-teal-600 shadow-md shadow-teal-100" : ""}
                        ${future ? "bg-white border-stone-200 text-stone-400" : ""}`}
          >
            {done ? <Check size={14} /> : i + 1}
          </div>
          <span
            className={`text-[11px] font-medium transition-colors ${
              active
                ? "text-teal-600"
                : done
                  ? "text-stone-600"
                  : "text-stone-400"
            }`}
          >
            {s.label}
          </span>
        </div>
      );
    })}
  </div>
);

// ─── Review card shown on step 4 (summary before submit) ─────────────────────

const ReviewRow = ({ label, value }) =>
  value ? (
    <div className="flex items-start justify-between py-2 border-b border-stone-100 last:border-0 gap-4">
      <span className="text-[12px] text-stone-400 shrink-0">{label}</span>
      <span className="text-[13px] text-stone-700 text-right">{value}</span>
    </div>
  ) : null;

// ─── Main component ───────────────────────────────────────────────────────────

export const AddRecipeForm = ({ onSubmit: onSubmitProp }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [ingInput, setIngInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState("forward"); // for animation

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      desc: "",
      cuisine: "",
      cal: "",
      time: "",
      serving: "",
      difficulty: "",
      rating: 0,
      reviews: "",
      tags: [],
      steps: [{ value: "" }],
      ingredients: [{ name: "", amount: "", unit: "" }],
      steps: [{ value: "" }],
      author: "",
      authorInit: "",
      authorBg: "#fef3e2",
      authorTc: "#92400e",
    },
    mode: "onTouched",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });
  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
  control,
  name: "ingredients",
});

  const watchedValues = watch();
  const {
    title,
    desc,
    cuisine,
    time,
    author,
    authorBg,
    authorTc,
    authorInit,
    tags,
    Ingredients,
    rating,
    difficulty,
    steps,
  } = watchedValues;

  const avatarInit =
    authorInit?.trim() ||
    (author || "")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    "AU";

  // ── Ing handlers ──────────────────────────────────────────────────────────

  const handleIngKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = ingInput.trim().replace(/,$/, "");
      if (val && !Ingredients.includes(val)) {
        setValue("ingredients", [...Ingredients, val], { shouldDirty: true });
      }
      setIngInput("");
    }
    if (e.key === "Backspace" && !ingInput && Ingredients.length) {
      setValue("ingredients", Ingredients.slice(0, -1), { shouldDirty: true });
    }
  };

  const removeIngredients = (idx) =>
    setValue(
      "ingredients",
      Ingredients.filter((_, i) => i !== idx),
      { shouldDirty: true },
    );

  // ── Tag handlers ──────────────────────────────────────────────────────────

  const handleTagKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim().replace(/,$/, "");
      if (val && !tags.includes(val)) {
        setValue("tags", [...tags, val], { shouldDirty: true });
      }
      setTagInput("");
    }
    if (e.key === "Backspace" && !tagInput && tags.length) {
      setValue("tags", tags.slice(0, -1), { shouldDirty: true });
    }
  };

  const removeTag = (idx) =>
    setValue(
      "tags",
      tags.filter((_, i) => i !== idx),
      { shouldDirty: true },
    );

  // ── Navigation ────────────────────────────────────────────────────────────

  const goNext = async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep];
    const valid = await trigger(fieldsToValidate);
    if (!valid) return;

    setDirection("forward");
    setCompleted((prev) => [...new Set([...prev, currentStep])]);
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setDirection("back");
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Final submit ──────────────────────────────────────────────────────────

  const onSubmit = (data) => {
  const payload = {
    ...data,
    steps:       data.steps.map(s => s.value).filter(Boolean),
    ingredients: data.ingredients.filter(i => i.name?.trim()),
    rating:      data.rating ? String(data.rating) : "",
    authorInit:  avatarInit,
  };
  console.log("Recipe submitted:", payload);
  onSubmitProp?.(payload);
  setSubmitted(true);
  setTimeout(() => {
    setSubmitted(false);
    reset();
    setCurrentStep(0);
    setCompleted([]);
  }, 2500);
};

  // ─────────────────────────────────────────────────────────────────────────

  const animClass =
    direction === "forward"
      ? "animate-[slideInRight_0.32s_ease_both]"
      : "animate-[slideInLeft_0.32s_ease_both]";

  return (
    <>
      <style>{`
        @keyframes fadeUp      { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideInRight{ from { opacity:0; transform:translateX(32px) } to { opacity:1; transform:translateX(0) } }
        @keyframes slideInLeft { from { opacity:0; transform:translateX(-32px)} to { opacity:1; transform:translateX(0) } }
        @keyframes popIn       { from { opacity:0; transform:scale(.92)       } to { opacity:1; transform:scale(1)     } }
        .font-serif { font-family: Georgia,'Times New Roman',serif; }
      `}</style>

      <div className="max-w-xl mx-auto px-4 py-10 min-h-screen bg-stone-50">
        {/* ── Header ── */}
        <div className="mb-6" style={{ animation: "fadeUp .35s ease both" }}>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-teal-600 mb-1">
            Step {currentStep + 1} of {STEPS_META.length}
          </p>
          <h1 className="font-serif text-[26px] font-semibold text-stone-900 leading-tight">
            {currentStep === 0 && "Start with the basics"}
            {currentStep === 1 && "Fill in the details"}
            {currentStep === 2 && "Write your steps"}
            {currentStep === 3 && "About the author"}
          </h1>
          <p className="text-[13px] text-stone-400 mt-1">
            {currentStep === 0 &&
              "Give your recipe a name, description and cuisine"}
            {currentStep === 1 && "Time, servings, difficulty and tags"}
            {currentStep === 2 && "Break down your recipe into clear steps"}
            {currentStep === 3 && "Who's behind this dish?"}
          </p>
        </div>

        {/* ── Step Indicator ── */}
        <StepIndicator current={currentStep} completed={completed} />

        {/* ── Card ── */}
        <div
          key={currentStep}
          className={`bg-white rounded-2xl border border-stone-200 p-6 ${animClass}`}
        >
          {/* ══ STEP 0 — Basic Info ══════════════════════════════════════════ */}
          {currentStep === 0 && (
            <div className="flex flex-col gap-5">
              <Field label="Recipe Title" required error={errors.title}>
                <input
                  {...register("title", { required: "Title is required" })}
                  className={inputCls(!!errors.title)}
                  placeholder="e.g. Butter Chicken"
                  autoFocus
                />
              </Field>

              <Field label="Description" required error={errors.desc}>
                <textarea
                  {...register("desc", { required: "Description is required" })}
                  className={`${inputCls(!!errors.desc)} resize-none min-h-22.5`}
                  placeholder="Describe your recipe in a couple of sentences…"
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Cuisine" required error={errors.cuisine}>
                  <div className="relative">
                    <select
                      {...register("cuisine", {
                        required: "Please select a cuisine",
                      })}
                      className={`${inputCls(!!errors.cuisine)} appearance-none pr-8`}
                    >
                      <option value="">Select cuisine</option>
                      {CUISINES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                    />
                  </div>
                </Field>

                <Field label="Calories">
                  <div className="relative">
                    <Flame
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      {...register("cal")}
                      className={`${inputCls(false)} pl-8`}
                      placeholder="e.g. 480 kcal"
                    />
                  </div>
                </Field>
              </div>
            </div>
          )}

          {/* ══ STEP 1 — Details ════════════════════════════════════════ */}
{currentStep === 1 && (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Field label="Cook Time" required error={errors.time}>
        <div className="relative">
          <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            {...register("time", { required: "Cook time is required" })}
            className={`${inputCls(!!errors.time)} pl-8`}
            placeholder="e.g. 45 min"
          />
        </div>
      </Field>

      <Field label="Servings" error={errors.serving}>
        <div className="relative">
          <Users size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            {...register("serving", {
              min: { value: 1,  message: "Min 1"  },
              max: { value: 99, message: "Max 99" },
            })}
            type="number"
            className={`${inputCls(!!errors.serving)} pl-8`}
            placeholder="e.g. 4"
          />
        </div>
      </Field>

      <Field label="Reviews">
        <input
          {...register("reviews")}
          className={inputCls(false)}
          placeholder="e.g. 2.1k"
        />
      </Field>
    </div>

    {/* Difficulty */}
    <Field label="Difficulty">
      <Controller
        name="difficulty"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTY_OPTIONS.map(({ val, active }) => (
              <button
                key={val} type="button"
                onClick={() => field.onChange(val)}
                className={`py-2.5 rounded-xl border text-[13px] font-medium transition-all
                  ${field.value === val
                    ? active
                    : "border-stone-200 text-stone-500 hover:border-teal-300 hover:text-teal-600"}`}
              >
                {val}
              </button>
            ))}
          </div>
        )}
      />
    </Field>

    {/* Star rating */}
    <Field label="Rating">
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(star => (
              <button
                key={star} type="button"
                onClick={() => field.onChange(star)}
                className={`text-[26px] leading-none transition-colors ${
                  field.value >= star ? "text-amber-400" : "text-stone-200 hover:text-amber-300"
                }`}
              >★</button>
            ))}
            {field.value > 0 && (
              <span className="ml-2 text-[13px] text-stone-500">{field.value} / 5</span>
            )}
          </div>
        )}
      />
    </Field>

    {/* Tags */}
    <Field label="Tags" hint="Press Enter or comma to add a tag">
      <div
        className="flex flex-wrap gap-1.5 p-2.5 rounded-xl border border-stone-200 min-h-44 cursor-text
                   focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 transition-all"
      >
        {tags.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 text-[12px] font-medium px-2.5 py-1 rounded-full">
            {tag}
            <button type="button" onClick={() => removeTag(i)} className="text-amber-600 hover:text-amber-800">
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={handleTagKey}
          placeholder={tags.length ? "" : "e.g. Spicy, Vegan…"}
          className="flex-1 min-w-25 text-[13px] text-stone-800 outline-none bg-transparent"
        />
      </div>
    </Field>

    {/* ── Ingredients ─────────────────────────────────────────── */}
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[12px] font-medium text-stone-600 tracking-wide">
            Ingredients <span className="text-red-400">*</span>
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">Name, amount and unit for each ingredient</p>
        </div>
        <span className="text-[11px] text-stone-400 bg-stone-100 px-2 py-1 rounded-lg">
          {ingredientFields.length} added
        </span>
      </div>

      {/* Column labels */}
      <div className="grid grid-cols-[1fr_90px_90px_36px] gap-2 mb-1.5 px-1">
        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide">Ingredient</p>
        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide">Amount</p>
        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide">Unit</p>
        <span />
      </div>

      {/* Ingredient rows */}
      <div className="flex flex-col gap-2">
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-[1fr_90px_90px_36px] gap-2 items-start">

            {/* Name */}
            <div>
              <input
                {...register(`ingredients.${index}.name`, {
                  required: "Required",
                })}
                className={inputCls(!!errors.ingredients?.[index]?.name)}
                placeholder="e.g. Chicken"
              />
              {errors.ingredients?.[index]?.name && (
                <p className="text-[11px] text-red-400 mt-1">
                  {errors.ingredients[index].name.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <input
                {...register(`ingredients.${index}.amount`, {
                  required: "Required",
                })}
                className={inputCls(!!errors.ingredients?.[index]?.amount)}
                placeholder="500"
              />
              {errors.ingredients?.[index]?.amount && (
                <p className="text-[11px] text-red-400 mt-1">
                  {errors.ingredients[index].amount.message}
                </p>
              )}
            </div>

            {/* Unit — dropdown */}
            <div className="relative">
              <select
                {...register(`ingredients.${index}.unit`)}
                className={`${inputCls(false)} appearance-none pr-6 text-[12px]`}
              >
                <option value="">Unit</option>
                <optgroup label="Weight">
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="oz">oz</option>
                  <option value="lb">lb</option>
                </optgroup>
                <optgroup label="Volume">
                  <option value="ml">ml</option>
                  <option value="l">l</option>
                  <option value="tsp">tsp</option>
                  <option value="tbsp">tbsp</option>
                  <option value="cup">cup</option>
                </optgroup>
                <optgroup label="Count">
                  <option value="pcs">pcs</option>
                  <option value="cloves">cloves</option>
                  <option value="pinch">pinch</option>
                  <option value="to taste">to taste</option>
                </optgroup>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              disabled={ingredientFields.length === 1}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shrink-0
                ${ingredientFields.length === 1
                  ? "border-stone-100 text-stone-300 cursor-not-allowed"
                  : "border-stone-200 text-stone-400 hover:bg-red-50 hover:border-red-200 hover:text-red-400"}`}
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Add ingredient button */}
      <button
        type="button"
        onClick={() => appendIngredient({ name: "", amount: "", unit: "" })}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-600
                   bg-teal-50 border border-dashed border-teal-200 rounded-xl px-4 py-2.5
                   hover:bg-teal-100 transition-all mt-3"
      >
        <Plus size={13} /> Add Ingredient
      </button>
    </div>

  </div>
)}

          {/* ══ STEP 2 — Steps ══════════════════════════════════════════════ */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-3">
              <p className="text-[12px] text-stone-400">
                Break your recipe into clear, numbered steps. Add as many as you
                need.
              </p>

              {stepFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-[11px] font-semibold text-teal-600 shrink-0 mt-2.5">
                    {index + 1}
                  </div>
                  <input
                    {...register(`steps.${index}.value`, {
                      required: "Step cannot be empty",
                    })}
                    className={`${inputCls(!!errors.steps?.[index]?.value)} flex-1`}
                    placeholder={`Describe step ${index + 1}…`}
                  />
                  {stepFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="mt-2 w-9 h-9 rounded-xl border border-stone-200 flex items-center justify-center
                                 text-stone-400 hover:bg-red-50 hover:border-red-200 hover:text-red-400 transition-all shrink-0"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              ))}

              {errors.steps &&
                stepFields.map((_, i) =>
                  errors.steps[i]?.value ? (
                    <p key={i} className="text-[11px] text-red-400 pl-9">
                      Step {i + 1}: {errors.steps[i].value.message}
                    </p>
                  ) : null,
                )}

              <button
                type="button"
                onClick={() => appendStep({ value: "" })}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-600
                           bg-teal-50 border border-dashed border-teal-200 rounded-xl px-4 py-2.5
                           hover:bg-teal-100 transition-all self-start mt-2"
              >
                <Plus size={13} /> Add Step
              </button>
            </div>
          )}

          {/* ══ STEP 3 — Author ═════════════════════════════════════════════ */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Author Name" required error={errors.author}>
                  <input
                    {...register("author", {
                      required: "Author name is required",
                    })}
                    className={inputCls(!!errors.author)}
                    placeholder="e.g. Sanjeev Kapoor"
                    onChange={(e) => {
                      setValue("author", e.target.value, {
                        shouldValidate: true,
                      });
                      if (!authorInit?.trim()) {
                        const auto = e.target.value
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase();
                        setValue("authorInit", auto);
                      }
                    }}
                  />
                </Field>

                <Field
                  label="Initials"
                  hint="Auto-filled · 2 chars max"
                  error={errors.authorInit}
                >
                  <input
                    {...register("authorInit", {
                      maxLength: { value: 2, message: "Max 2 characters" },
                    })}
                    className={inputCls(!!errors.authorInit)}
                    placeholder="e.g. SK"
                    maxLength={2}
                    onChange={(e) =>
                      setValue("authorInit", e.target.value.toUpperCase(), {
                        shouldDirty: true,
                      })
                    }
                  />
                </Field>
              </div>

              {/* Color pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Avatar Background">
                  <Controller
                    name="authorBg"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center gap-2 flex-wrap">
                        {BG_SWATCHES.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => field.onChange(c)}
                            className={`w-8 h-8 rounded-lg border-2 shrink-0 transition-all ${field.value === c ? "border-teal-600 scale-110" : "border-transparent hover:border-stone-300"}`}
                            style={{ background: c }}
                          />
                        ))}
                        <input
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          maxLength={7}
                          className="flex-1 min-w-18 px-2.5 py-1.5 border border-stone-200 rounded-lg text-[12px] font-mono text-stone-700 outline-none focus:border-teal-400 transition-all"
                          placeholder="#fef3e2"
                        />
                      </div>
                    )}
                  />
                </Field>

                <Field label="Avatar Text Color">
                  <Controller
                    name="authorTc"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center gap-2 flex-wrap">
                        {TC_SWATCHES.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => field.onChange(c)}
                            className={`w-8 h-8 rounded-lg border-2 shrink-0 transition-all ${field.value === c ? "border-teal-600 scale-110" : "border-transparent hover:border-stone-300"}`}
                            style={{ background: c }}
                          />
                        ))}
                        <input
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          maxLength={7}
                          className="flex-1 min-w-18 px-2.5 py-1.5 border border-stone-200 rounded-lg text-[12px] font-mono text-stone-700 outline-none focus:border-teal-400 transition-all"
                          placeholder="#92400e"
                        />
                      </div>
                    )}
                  />
                </Field>
              </div>

              {/* Live avatar preview */}
              <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[15px] font-semibold shrink-0 transition-all"
                  style={{ background: authorBg, color: authorTc }}
                >
                  {avatarInit}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-stone-800">
                    {author || "Author name"}
                  </p>
                  <p className="text-[11px] text-stone-400">Recipe author</p>
                </div>
              </div>

              {/* ── Review summary ── */}
              <div className="mt-2 border border-stone-100 rounded-xl overflow-hidden">
                <div className="bg-stone-50 px-4 py-2.5 border-b border-stone-100">
                  <p className="text-[12px] font-semibold text-stone-500 uppercase tracking-wide">
                    Recipe Summary
                  </p>
                </div>
                <div className="px-4 py-1">
                  <ReviewRow label="Title" value={title} />
                  <ReviewRow label="Cuisine" value={cuisine} />
                  <ReviewRow label="Cook Time" value={time} />
                  <ReviewRow label="Difficulty" value={difficulty} />
                  <ReviewRow label="Calories" value={watchedValues.cal} />
                  <ReviewRow label="Servings" value={watchedValues.serving} />
                  <ReviewRow label="Tags" value={tags.join(", ")} />
                  <ReviewRow
                    label="Steps"
                    value={`${steps.filter((s) => s.value?.trim()).length} step(s) added`}
                  />
                  <ReviewRow
                    label="Rating"
                    value={rating ? `${rating} / 5` : null}
                  />
                  <ReviewRow label="Steps"       value={`${steps.filter(s => s.value?.trim()).length} step(s) added`} />
<ReviewRow label="Ingredients" value={`${watchedValues.ingredients?.filter(i => i.name?.trim()).length || 0} ingredient(s) added`} />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* end card */}

        {/* ── Navigation buttons ── */}
        <div
          className="flex items-center justify-between mt-5"
          style={{
            animation: "fadeUp .4s .1s ease both",
            opacity: 0,
            animationFillMode: "both",
          }}
        >
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-stone-200 rounded-xl
                         text-[13px] font-medium text-stone-600 hover:bg-stone-100 transition-all"
            >
              <ChevronLeft size={15} /> Back
            </button>
          ) : (
            <div /> // spacer
          )}

          {currentStep < STEPS_META.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-teal-600 hover:bg-teal-700
                         active:scale-[0.98] text-white text-[13px] font-medium rounded-xl transition-all"
            >
              Next <ChevronRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-teal-600 hover:bg-teal-700
                         active:scale-[0.98] text-white text-[13px] font-medium rounded-xl transition-all"
            >
              <Check size={15} /> Publish Recipe
            </button>
          )}
        </div>

        {/* ── Step dots ── */}
        <div className="flex justify-center gap-2 mt-5">
          {STEPS_META.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "w-5 h-2 bg-teal-600"
                  : completed.includes(i)
                    ? "w-2 h-2 bg-teal-300"
                    : "w-2 h-2 bg-stone-200"
              }`}
            />
          ))}
        </div>

        {/* ── Success toast ── */}
        {submitted && (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 text-white
                       text-[13px] px-5 py-3 rounded-xl shadow-lg whitespace-nowrap z-50
                       flex items-center gap-2"
            style={{ animation: "popIn .3s ease both" }}
          >
            <Check size={15} className="text-green-400" />
            Recipe published successfully!
          </div>
        )}
      </div>
    </>
  );
};

export default AddRecipeForm;
