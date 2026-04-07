import React, { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  FileText,
  Video,
  Leaf,
  Check,
  Upload,
  Stethoscope,
  Clock,
  Users,
  Flame,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../../config/api.js";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
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

const HERBAL_CATEGORIES = [
  "Hair",
  "Face & Skin",
  "Body",
  "Immunity",
  "Digestion",
  "Sleep",
  "Weight",
  "General Wellness",
];

const UNITS = [
  "g",
  "kg",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "cup",
  "oz",
  "lb",
  "pcs",
  "cloves",
  "pinch",
  "to taste",
];

const DOCTORS = [
  {
    id: "d1",
    name: "Dr. Priya Sharma",
    spec: "Ayurvedic Physician",
    avatar: "PS",
  },
  { id: "d2", name: "Dr. Arjun Mehta", spec: "Naturopath", avatar: "AM" },
  {
    id: "d3",
    name: "Dr. Sunita Rao",
    spec: "Herbal Medicine Expert",
    avatar: "SR",
  },
  { id: "d4", name: "Dr. Vikram Nair", spec: "Nutritionist", avatar: "VN" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputCls = (err) =>
  `w-full px-3 py-2.5 border rounded-xl text-[13px] text-stone-800 bg-white outline-none
   transition-all font-sans placeholder:text-stone-400
   ${
     err
       ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
       : "border-stone-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
   }`;

const selectCls = (err) => inputCls(err) + " appearance-none cursor-pointer";

const Field = ({ label, required: req, error, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-medium text-stone-600 tracking-wide">
      {label}
      {req && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
    {hint && !error && <p className="text-[11px] text-stone-400">{hint}</p>}
    {error && <p className="text-[11px] text-red-500">{error.message}</p>}
  </div>
);

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEP_LABELS = [
  "Type",
  "Basics",
  "Ingredients",
  "Instructions",
  "Media",
  "Review",
];

const StepBar = ({ current, total }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[11px] font-medium text-teal-600 uppercase tracking-widest">
        Step {current} of {total}
      </span>
      <span className="text-[11px] text-stone-400">
        {STEP_LABELS[current - 1]}
      </span>
    </div>
    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-teal-600 rounded-full transition-all duration-500"
        style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
      />
    </div>
    <div className="flex justify-between mt-2">
      {STEP_LABELS.map((label, i) => (
        <span
          key={label}
          className={`text-[10px] font-medium transition-colors ${
            i + 1 <= current ? "text-teal-600" : "text-stone-300"
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  </div>
);

// ─── Navigation buttons ───────────────────────────────────────────────────────

const NavButtons = ({
  onBack,
  onNext,
  nextLabel = "Next",
  nextType = "button",
  disabled = false,
}) => (
  <div className="flex items-center justify-between pt-6 mt-6 border-t border-stone-100">
    {onBack ? (
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-stone-200
                   rounded-xl text-[13px] font-medium text-stone-600 hover:bg-stone-50 transition-all"
      >
        <ChevronLeft size={15} /> Back
      </button>
    ) : (
      <div />
    )}

    <button
      type={nextType}
      onClick={onNext}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-[13px]
                  font-medium transition-all active:scale-[0.98]
        ${
          disabled
            ? "bg-stone-100 text-stone-400 cursor-not-allowed"
            : "bg-teal-600 hover:bg-teal-700 text-white"
        }`}
    >
      {nextLabel} <ChevronRight size={15} />
    </button>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AddRecipe = () => {
  const [step, setStep] = useState(1);
  const [recipeType, setRecipeType] = useState(null); // "text" | "video"
  const [isHerbal, setIsHerbal] = useState(null); // true | false
  const [visibility, setVisibility] = useState("public");
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoInputRef = useRef(null);
  const photoInputRef=useRef(null)
  const [photoPreview,setPhotoPreview]=useState(null)
  const[photoFile,setPhotoFile]=useState(null)
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      title: "",
      level: "",
      category: "",
      productLink: "",
      description: "",
      prepTime: "",
      cookTime: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      steps: "",
      herbalCategory: "",
      benefit: "",
      herbs: "",
      ingredients: [{ name: "", quantity: "", unit: "", productLink: "" }],
    },
    mode: "onTouched",
  });

  const {
    fields: ingFields,
    append: addIng,
    remove: removeIng,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const TOTAL_STEPS = 6;

  const goNext = async (fieldsToValidate) => {
    if (fieldsToValidate) {
      const ok = await trigger(fieldsToValidate);
      if (!ok) return;
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("influencerToken");
      if (!token) {
        toast.error("Influencer token not found. Please login and try again.");
        return;
      }

      const herbsArray = data.herbs
        ? data.herbs
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const ingredientList = (data.ingredients || [])
        .filter((item) => item.name?.trim())
        .map((item) => {
          const ingredient = {
            name: item.name.trim(),
          };

          if (item.quantity?.trim()) {
            ingredient.quantity = item.quantity.trim();
          }
          if (item.unit) {
            ingredient.unit = item.unit;
          }
          if (item.productLink?.trim()) {
            ingredient.productLink = item.productLink.trim();
          }

          return ingredient;
        });

      const stepsArray = data.steps
        ? data.steps
            .split("\n")
            .map((step) => step.trim())
            .filter(Boolean)
        : [];

      const nutrition = isHerbal
        ? {}
        : {
            calories: data.calories?.trim() || "",
            protein: data.protein?.trim() || "",
            carbs: data.carbs?.trim() || "",
            fat: data.fat?.trim() || "",
          };

      const usageInfo = isHerbal
        ? {
            dosage: data.calories?.trim() || "",
            frequency: data.protein?.trim() || "",
            duration: data.carbs?.trim() || "",
            ageGroup: data.fat?.trim() || "",
          }
        : {};

      const formData = new FormData();
      formData.append("recipeType", recipeType);
      formData.append("recipeCategory", isHerbal ? "herbal" : "regular");
      formData.append("title", data.title?.trim() || "");
      formData.append("description", data.description?.trim() || "");
      formData.append("level", data.level || "");
      formData.append("category", data.category || "");
      formData.append("benefit", data.benefit?.trim() || "");
      formData.append("herbs", JSON.stringify(herbsArray));
      formData.append("prepTime", data.prepTime ? `${data.prepTime}` : "");
      formData.append("cookTime", data.cookTime ? `${data.cookTime}` : "");
      formData.append("productLink", data.productLink?.trim() || "");
      formData.append("ingredientList", JSON.stringify(ingredientList));
      formData.append("steps", JSON.stringify(stepsArray));
      formData.append("tags", JSON.stringify([]));
      formData.append("nutrition", JSON.stringify(nutrition));
      formData.append("usageInfo", JSON.stringify(usageInfo));
      formData.append("visibility", visibility);
      formData.append("createdBy", "influencer");
      if (selectedDoc) {
        formData.append("verifiedBy", selectedDoc);
      }

      if (videoFile) {
        formData.append("videoUrl", videoFile);
      } else if (photoFile) {
        formData.append("imageUrl", photoFile);
      }

      setLoading(true);
      const response = await axios.post(
        apiUrl("/api/influencer/post-recipe"),
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.success) {
        toast.success(response.data.message || "Recipe uploaded successfully");
        window.dispatchEvent(new CustomEvent("herb-recipes-refresh"));
        setSubmitted(true);
      } else {
        toast.error(response.data?.message || "Unable to upload recipe");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ── Shared card wrapper ────────────────────────────────────────────────────
  const Card = ({ children }) => (
    <div className="step-card bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
      {children}
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div
          className="max-w-xl mx-auto px-4 py-16 text-center"
          style={{ animation: "fadeUp .5s ease both" }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={28} className="text-green-600" />
          </div>
          <h2 className="font-serif text-[26px] font-semibold text-stone-900 mb-2">
            Recipe Submitted!
          </h2>
          <p className="text-[14px] text-stone-500 leading-relaxed mb-6">
            Your recipe has been submitted and sent to{" "}
            <span className="font-medium text-stone-700">
              {DOCTORS.find((d) => d.id === selectedDoc)?.name}
            </span>{" "}
            for verification. You'll be notified once it's approved.
          </p>
          <button
            onClick={() => {
              setStep(1);
              setRecipeType(null);
              setIsHerbal(null);
              setSubmitted(false);
              setSelectedDoc(null);
              setVideoFile(null);
              setVideoPreview(null);
            }}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-[13px]
                       font-medium rounded-xl transition-all"
          >
            Post Another Recipe
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  .font-serif{font-family:Georgia,'Times New Roman',serif}
  .step-card{animation:fadeUp .4s ease both}
`}</style>

      <div className="max-w-6xl mx-auto px-4 py-8  min-h-screen">
        {/* ── Page heading ── */}
        <div className="mb-6" style={{ animation: "fadeUp .35s ease both" }}>
          <p className="text-[11px] uppercase tracking-[2px] font-medium text-teal-600 mb-1.5">
            Share your knowledge
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Post Recipes
          </h2>
        </div>

        {/* ── Step bar ── */}
        <div
          style={{
            animation: "fadeUp .4s .04s ease both",
            opacity: 0,
            animationFillMode: "both",
          }}
        >
          <StepBar current={step} total={TOTAL_STEPS} />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            STEP 1 — What are you posting?
        ══════════════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <Card key={1}>
            <h2 className="font-serif text-[20px] font-semibold text-stone-900 mb-1">
              What would you like to post?
            </h2>
            <p className="text-[13px] text-stone-400 mb-6">
              Choose the format and type of your recipe.
            </p>

            {/* Format cards */}
            <p className="text-[12px] font-medium text-stone-600 uppercase tracking-wider mb-3">
              Recipe Format
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {[
                {
                  key: "text",
                  icon: <FileText size={22} className="text-teal-600" />,
                  title: "Text Recipe",
                  desc: "Step-by-step written instructions with ingredients and photos.",
                },
                {
                  key: "video",
                  icon: <Video size={22} className="text-blue-600" />,
                  title: "Video Recipe",
                  desc: "Upload a video walkthrough of your recipe.",
                },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setRecipeType(opt.key)}
                  className={`text-left p-4 rounded-xl border-2 transition-all
                    ${
                      recipeType === opt.key
                        ? "border-teal-400 bg-teal-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center
                      ${recipeType === opt.key ? "bg-teal-100" : "bg-stone-100"}`}
                    >
                      {opt.icon}
                    </div>
                    <span
                      className={`text-[14px] font-semibold ${recipeType === opt.key ? "text-teal-700" : "text-stone-800"}`}
                    >
                      {opt.title}
                    </span>
                    {recipeType === opt.key && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] text-stone-500 leading-relaxed">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Herbal toggle */}
            <p className="text-[12px] font-medium text-stone-600 uppercase tracking-wider mb-3">
              Recipe Category
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  key: false,
                  icon: <Flame size={20} className="text-teal-600" />,
                  title: "Regular Recipe",
                  desc: "Standard food recipe — any cuisine or category.",
                },
                {
                  key: true,
                  icon: <Leaf size={20} className="text-green-600" />,
                  title: "Herbal / Ayurvedic",
                  desc: "Natural herbal remedy or Ayurvedic preparation.",
                  badge: "Requires doctor verification",
                },
              ].map((opt) => (
                <button
                  key={String(opt.key)}
                  type="button"
                  onClick={() => setIsHerbal(opt.key)}
                  className={`text-left p-4 rounded-xl border-2 transition-all
                    ${
                      isHerbal === opt.key
                        ? opt.key
                          ? "border-green-400 bg-green-50"
                          : "border-teal-400 bg-teal-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center
                      ${
                        isHerbal === opt.key
                          ? opt.key
                            ? "bg-green-100"
                            : "bg-teal-100"
                          : "bg-stone-100"
                      }`}
                    >
                      {opt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-[14px] font-semibold ${
                          isHerbal === opt.key
                            ? opt.key
                              ? "text-green-700"
                              : "text-teal-700"
                            : "text-stone-800"
                        }`}
                      >
                        {opt.title}
                      </p>
                      {opt.badge && (
                        <span className="text-[10px] font-medium text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    {isHerbal === opt.key && (
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0
                        ${opt.key ? "bg-green-500" : "bg-teal-600"}`}
                      >
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] text-stone-500 leading-relaxed">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            <NavButtons
              onNext={() => goNext()}
              disabled={recipeType === null || isHerbal === null}
            />
          </Card>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 2 — Basic Info
        ══════════════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <Card key={2}>
            <h2 className="font-serif text-[20px] font-semibold text-stone-900 mb-1">
              Basic Information
            </h2>
            <p className="text-[13px] text-stone-400 mb-6">
              Tell us about your {isHerbal ? "herbal remedy" : "recipe"}.
            </p>

            <div className="flex flex-col gap-4">
              <Field label="Recipe Title" required error={errors.title}>
                <input
                  {...register("title", { required: "Title is required" })}
                  className={inputCls(errors.title)}
                  placeholder={
                    isHerbal
                      ? "e.g. Amla & Bhringraj Hair Oil"
                      : "e.g. Butter Chicken"
                  }
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Difficulty Level" required error={errors.level}>
                  <div className="relative">
                    <select
                      {...register("level", { required: "Select a level" })}
                      className={selectCls(errors.level)}
                    >
                      <option value="">Select level</option>
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                    <ChevronRight
                      size={13}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-stone-400 pointer-events-none"
                    />
                  </div>
                </Field>

                <Field
                  label={isHerbal ? "Remedy Category" : "Cuisine Category"}
                  required
                  error={errors.category}
                >
                  <div className="relative">
                    <select
                      {...register("category", {
                        required: "Select a category",
                      })}
                      className={selectCls(errors.category)}
                    >
                      <option value="">Select category</option>
                      {(isHerbal ? HERBAL_CATEGORIES : CATEGORIES).map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronRight
                      size={13}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-stone-400 pointer-events-none"
                    />
                  </div>
                </Field>
              </div>

              {/* Herbal-specific fields */}
              {isHerbal && (
                <>
                  <Field
                    label="Primary Benefit"
                    required
                    error={errors.benefit}
                  >
                    <input
                      {...register("benefit", { required: "Add a benefit" })}
                      className={inputCls(errors.benefit)}
                      placeholder="e.g. Promotes hair growth, Boosts immunity"
                    />
                  </Field>
                  <Field
                    label="Key Herbs Used"
                    required
                    error={errors.herbs}
                    hint="Comma-separated list"
                  >
                    <input
                      {...register("herbs", {
                        required: "List the herbs used",
                      })}
                      className={inputCls(errors.herbs)}
                      placeholder="e.g. Amla, Bhringraj, Ashwagandha"
                    />
                  </Field>
                </>
              )}

              <Field label="Description" required error={errors.description}>
                <textarea
                  {...register("description", {
                    required: "Add a description",
                  })}
                  className={`${inputCls(errors.description)} resize-none min-h-22.5`}
                  placeholder={
                    isHerbal
                      ? "Describe what this remedy does and its traditional uses…"
                      : "Describe your recipe in a few sentences…"
                  }
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Preparation Time" error={errors.prepTime}>
                  <div className="relative">
                    <Clock
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="number"
                      placeholder="Minutes"
                      {...register("prepTime")}
                      className={`${inputCls(false)} pl-8`}
                    />
                  </div>
                </Field>

                <Field label="Cooking Time" error={errors.cookTime}>
                  <div className="relative">
                    <Clock
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="number"
                      placeholder="Minutes"
                      {...register("cookTime")}
                      className={`${inputCls(false)} pl-8`}
                    />
                  </div>
                </Field>
              </div>

              <Field
                label="Product / Reference Link"
                hint="Optional affiliate or source link"
              >
                <input
                  {...register("productLink")}
                  className={inputCls(false)}
                  placeholder="https://..."
                />
              </Field>
            </div>

            <NavButtons
              onBack={goBack}
              onNext={() =>
                goNext([
                  "title",
                  "level",
                  "category",
                  "description",
                  ...(isHerbal ? ["benefit", "herbs"] : []),
                ])
              }
            />
          </Card>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 3 — Ingredients
        ══════════════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <Card key={3}>
            <h2 className="font-serif text-[20px] font-semibold text-stone-900 mb-1">
              {isHerbal ? "Ingredients & Herbs" : "Ingredients"}
            </h2>
            <p className="text-[13px] text-stone-400 mb-6">
              Add each ingredient with its quantity and unit.
            </p>

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_80px_80px_auto] gap-2 mb-1.5 px-1">
              <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                {isHerbal ? "Ingredient / Herb" : "Ingredient"}
              </p>
              <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                Amount
              </p>
              <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                Unit
              </p>
              <span className="w-9" />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {ingFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_80px_80px_auto] gap-2 items-start"
                >
                  <input
                    {...register(`ingredients.${index}.name`, {
                      required: true,
                    })}
                    className={inputCls(errors.ingredients?.[index]?.name)}
                    placeholder={isHerbal ? "e.g. Amla powder" : "e.g. Chicken"}
                  />
                  <input
                    {...register(`ingredients.${index}.quantity`)}
                    className={inputCls(false)}
                    placeholder="500"
                  />
                  <div className="relative">
                    <select
                      {...register(`ingredients.${index}.unit`)}
                      className={`${selectCls(false)} text-[12px]`}
                    >
                      <option value="">Unit</option>
                      {UNITS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => ingFields.length > 1 && removeIng(index)}
                    disabled={ingFields.length === 1}
                    className={`w-9 h-10 rounded-xl border flex items-center justify-center transition-all shrink-0
                      ${
                        ingFields.length === 1
                          ? "border-stone-100 text-stone-300 cursor-not-allowed"
                          : "border-stone-200 text-stone-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                      }`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addIng({ name: "", quantity: "", unit: "" })}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-600
                         bg-teal-50 border border-dashed border-teal-200 rounded-xl px-4 py-2.5
                         hover:bg-teal-100 transition-all"
            >
              <Plus size={13} /> Add Ingredient
            </button>

            <NavButtons onBack={goBack} onNext={() => goNext()} />
          </Card>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 4 — Instructions + Nutrition
        ══════════════════════════════════════════════════════════════════ */}
        {step === 4 && (
          <Card key={4}>
            <h2 className="font-serif text-[20px] font-semibold text-stone-900 mb-1">
              Instructions & Nutrition
            </h2>
            <p className="text-[13px] text-stone-400 mb-6">
              Walk readers through each step.
            </p>

            <div className="flex flex-col gap-5">
              <Field label="Cooking Instructions" required error={errors.steps}>
                <textarea
                  {...register("steps", { required: "Add at least one step" })}
                  className={`${inputCls(errors.steps)} resize-none min-h-35`}
                  placeholder={
                    isHerbal
                      ? "Step 1: Heat coconut oil on low flame...\nStep 2: Add herbal powders...\nStep 3: Strain and store..."
                      : "Step 1: Marinate the chicken...\nStep 2: Heat oil in a pan...\nStep 3: Add spices..."
                  }
                />
              </Field>

              <div>
                <p className="text-[12px] font-medium text-stone-600 uppercase tracking-wider mb-3">
                  {isHerbal
                    ? "Dosage / Usage Info (Optional)"
                    : "Nutritional Info (Optional)"}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(isHerbal
                    ? [
                        {
                          name: "calories",
                          placeholder: "Calories",
                          icon: <Flame size={12} />,
                        },
                        {
                          name: "protein",
                          placeholder: "Dosage",
                          icon: <Users size={12} />,
                        },
                        {
                          name: "carbs",
                          placeholder: "Frequency",
                          icon: <Clock size={12} />,
                        },
                        {
                          name: "fat",
                          placeholder: "Duration",
                          icon: <Leaf size={12} />,
                        },
                      ]
                    : [
                        {
                          name: "calories",
                          placeholder: "Calories",
                          icon: <Flame size={12} />,
                        },
                        {
                          name: "protein",
                          placeholder: "Protein (g)",
                          icon: <Users size={12} />,
                        },
                        {
                          name: "carbs",
                          placeholder: "Carbs (g)",
                          icon: <Clock size={12} />,
                        },
                        {
                          name: "fat",
                          placeholder: "Fat (g)",
                          icon: <Flame size={12} />,
                        },
                      ]
                  ).map((f) => (
                    <div key={f.name} className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                        {f.icon}
                      </span>
                      <input
                        {...register(f.name)}
                        className={`${inputCls(false)} pl-7 text-[12px]`}
                        placeholder={f.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <NavButtons onBack={goBack} onNext={() => goNext(["steps"])} />
          </Card>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 5 — Media + Visibility
        ══════════════════════════════════════════════════════════════════ */}
        {step === 5 && (
          <Card key={5}>
            <h2 className="font-serif text-[20px] font-semibold text-stone-900 mb-1">
              Media & Visibility
            </h2>
            <p className="text-[13px] text-stone-400 mb-6">
              {recipeType === "video"
                ? "Upload your recipe video and set who can see it."
                : "Upload an image and set who can see it."}
            </p>

            <div className="flex flex-col gap-5">
              {/* Video upload */}
              {recipeType === "video" && (
                <div>
                  <p className="text-[12px] font-medium text-stone-600 mb-2">
                    Recipe Video <span className="text-red-400">*</span>
                  </p>

                  {videoPreview ? (
                    <div className="relative">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full rounded-xl border border-stone-200"
                        style={{ aspectRatio: "16/9" }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setVideoFile(null);
                          setVideoPreview(null);
                        }}
                        className="absolute top-2.5 right-2.5 w-7 h-7 bg-black/60 hover:bg-black/80
                                   rounded-full flex items-center justify-center text-white transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-stone-200 rounded-xl p-8
                                 flex flex-col items-center gap-3 hover:border-teal-300 hover:bg-teal-50
                                 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                        <Upload size={20} className="text-stone-500" />
                      </div>
                      <div className="text-center">
                        <p className="text-[13px] font-medium text-stone-700">
                          Click to upload video
                        </p>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          MP4, MOV, AVI up to 500 MB
                        </p>
                      </div>
                    </button>
                  )}
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoChange}
                  />
                </div>
              )}

              {/* Image upload for text recipes */}
              {recipeType === "text" && (
                <div>
                  <p className="text-[12px] font-medium text-stone-600 mb-2">
                    Recipe Image (Optional)
                  </p>

                {/* photo preview */}
                {
                  photoPreview?(
                    <div className="relative">
                      <img src={photoPreview} alt="photo preview" 
                      className="w-full rounded-xl border border-stone-200"
                      />
                      <button type="button" onClick={()=>{
                        setPhotoFile(null)
                        setPhotoPreview(null)
                      }}
                      className="absolute top-2.5 right-2.5 w-7 h-7 bg-black/60 hover:bg-black/80
                                   rounded-full flex items-center justify-center text-white transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                      </div>
                  ):(
                    <>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    id="recipeImage"
                    ref={photoInputRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      console.log(file); // handle upload here
                      setPhotoFile(file)
                      setPhotoPreview(URL.createObjectURL(file))
                    }}
                  />

                  {/* Styled button (same UI) */}
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("recipeImage").click()
                    }
                    className="w-full border-2 border-dashed border-stone-200 rounded-xl p-8
                 flex flex-col items-center gap-3 hover:border-teal-300 hover:bg-teal-50
                 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                      <Upload size={20} className="text-stone-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-[13px] font-medium text-stone-700">
                        Click to upload image
                      </p>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        JPG, PNG, WebP up to 10 MB
                      </p>
                    </div>
                  </button>
                  </>
                  )
                }

                </div>
              )}

              {/* Visibility */}
              <div>
                <p className="text-[12px] font-medium text-stone-600 uppercase tracking-wider mb-3">
                  Visibility
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      key: "public",
                      label: "Public",
                      desc: "Everyone can see this recipe.",
                    },
                    {
                      key: "private",
                      label: "Private",
                      desc: "Only you can see this recipe.",
                    },
                  ].map((v) => (
                    <button
                      key={v.key}
                      type="button"
                      onClick={() => setVisibility(v.key)}
                      className={`text-left p-3 rounded-xl border-2 transition-all
                        ${
                          visibility === v.key
                            ? "border-teal-400 bg-teal-50"
                            : "border-stone-200 bg-white hover:border-stone-300"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[13px] font-medium ${visibility === v.key ? "text-teal-700" : "text-stone-800"}`}
                        >
                          {v.label}
                        </span>
                        {visibility === v.key && (
                          <div className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center">
                            <Check size={9} className="text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400">{v.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <NavButtons
              onBack={goBack}
              onNext={() => goNext()}
              disabled={recipeType === "video" && !videoFile}
            />
          </Card>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 6 — Doctor Verification (mandatory) + Review
        ══════════════════════════════════════════════════════════════════ */}
        {isHerbal
          ? step === 6 && (
              <Card key={6}>
                <h2 className="font-serif text-[20px] font-semibold text-stone-900 mb-1">
                  Doctor Verification
                </h2>
                <p className="text-[13px] text-stone-400 mb-4">
                  All recipes must be verified by a qualified practitioner
                  before publishing.
                </p>

                {/* Mandatory notice */}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3.5 mb-6">
                  <AlertCircle
                    size={16}
                    className="text-amber-600 shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-[12px] font-semibold text-amber-800 mb-0.5">
                      Verification Required
                    </p>
                    <p className="text-[12px] text-amber-700 leading-relaxed">
                      {isHerbal
                        ? "Herbal and Ayurvedic recipes must be reviewed by a certified doctor before going live. This protects the community."
                        : "All recipes are reviewed by a nutritionist or food expert to ensure accuracy and safety."}
                    </p>
                  </div>
                </div>

                {/* Doctor selection */}
                <p className="text-[12px] font-medium text-stone-600 uppercase tracking-wider mb-3">
                  Select a Verifying Doctor{" "}
                  <span className="text-red-400">*</span>
                </p>

                <div className="flex flex-col gap-2.5 mb-7">
                  {DOCTORS.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDoc(doc.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all
                    ${
                      selectedDoc === doc.id
                        ? "border-teal-400 bg-teal-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px]
                                   font-semibold shrink-0 transition-all
                    ${
                      selectedDoc === doc.id
                        ? "bg-teal-600 text-white"
                        : "bg-stone-100 text-stone-600"
                    }`}
                      >
                        {doc.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-[13px] font-medium ${selectedDoc === doc.id ? "text-teal-800" : "text-stone-800"}`}
                        >
                          {doc.name}
                        </p>
                        <p className="text-[11px] text-stone-400 flex items-center gap-1">
                          <Stethoscope size={10} /> {doc.spec}
                        </p>
                      </div>
                      {selectedDoc === doc.id && (
                        <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center shrink-0">
                          <Check size={11} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Quick summary */}
                <div className="bg-stone-50 border border-stone-100 rounded-xl p-4 mb-1">
                  <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-3">
                    Recipe Summary
                  </p>
                  {[
                    { label: "Title", value: watch("title") },
                    {
                      label: "Type",
                      value:
                        recipeType === "video" ? "Video Recipe" : "Text Recipe",
                    },
                    {
                      label: "Category",
                      value: isHerbal ? "Herbal / Ayurvedic" : "Regular",
                    },
                    { label: "Level", value: watch("level") },
                    { label: "Cuisine", value: watch("category") },
                    { label: "Visibility", value: visibility },
                    ...(isHerbal
                      ? [{ label: "Benefit", value: watch("benefit") }]
                      : []),
                  ]
                    .filter((r) => r.value)
                    .map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between py-1.5 border-b border-stone-100 last:border-0"
                      >
                        <span className="text-[12px] text-stone-400">
                          {row.label}
                        </span>
                        <span className="text-[12px] font-medium text-stone-700 text-right max-w-[60%] truncate">
                          {row.value}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Final submit */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-stone-200
                           rounded-xl text-[13px] font-medium text-stone-600 hover:bg-stone-50 transition-all"
                  >
                    <ChevronLeft size={15} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!loading) handleSubmit(onSubmit)(e);
                    }}
                    disabled={!selectedDoc || loading}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-medium transition-all active:scale-[0.98] ${
                      selectedDoc && !loading
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-stone-100 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    <Check size={15} />
                    {loading ? "Submitting..." : "Submit for Verification"}
                  </button>
                </div>
              </Card>
            )
          : step === 6 && (
              <Card key={6}>
                <div className="bg-stone-50 border border-stone-100 rounded-xl p-4 mb-1">
                  <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-3">
                    Recipe Summary
                  </p>
                  {[
                    { label: "Title", value: watch("title") },
                    {
                      label: "Type",
                      value:
                        recipeType === "video" ? "Video Recipe" : "Text Recipe",
                    },
                    {
                      label: "Category",
                      value: isHerbal ? "Herbal / Ayurvedic" : "Regular",
                    },
                    { label: "Level", value: watch("level") },
                    { label: "Cuisine", value: watch("category") },
                    { label: "Visibility", value: visibility },
                    ...(isHerbal
                      ? [{ label: "Benefit", value: watch("benefit") }]
                      : []),
                  ]
                    .filter((r) => r.value)
                    .map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between py-1.5 border-b border-stone-100 last:border-0"
                      >
                        <span className="text-[12px] text-stone-400">
                          {row.label}
                        </span>
                        <span className="text-[12px] font-medium text-stone-700 text-right max-w-[60%] truncate">
                          {row.value}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Final submit */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-stone-200
                           rounded-xl text-[13px] font-medium text-stone-600 hover:bg-stone-50 transition-all"
                  >
                    <ChevronLeft size={15} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!loading) handleSubmit(onSubmit)(e);
                    }}
                    disabled={loading}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-medium transition-all active:scale-[0.98] ${
                      loading
                        ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    <Check size={15} />
                    {loading ? "Submitting..." : "Post Recipe"}
                  </button>
                </div>
              </Card>
            )}
      </div>
    </>
  );
};

export default AddRecipe;
