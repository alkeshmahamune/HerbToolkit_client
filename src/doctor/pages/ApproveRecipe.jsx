import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  Eye,
  Leaf,
  Search,
  User,
  X,
  XCircle,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "../../config/api.js";

const STATUS_META = {
  pending: {
    label: "Pending Review",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    cls: "bg-green-50 text-green-700 border-green-200",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    cls: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
  },
};

const formatDate = (value) => {
  if (!value) return "Recently submitted";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently submitted";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const normalizeRecipe = (recipe) => ({
  ...recipe,
  id: recipe?._id || recipe?.id,
  status: recipe?.verificationStatus || recipe?.status || "pending",
  submittedBy: recipe?.uploader?.fullName || "Influencer",
  submittedRole: "Influencer",
  submittedAt: formatDate(recipe?.createdAt),
  desc: recipe?.description || recipe?.desc || "",
  img:
    recipe?.thumbnail ||
    recipe?.imageUrl ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
  herbs: Array.isArray(recipe?.herbs) ? recipe.herbs : [],
  steps: Array.isArray(recipe?.steps) ? recipe.steps : [],
  ingredients: Array.isArray(recipe?.ingredientList) ? recipe.ingredientList : [],
  reviewNote: recipe?.reviewNote || "",
  category: recipe?.category || recipe?.recipeCategory || "Herbal",
  dosage: recipe?.usageInfo?.dosage || "",
  suitableFor: recipe?.usageInfo?.ageGroup || "",
});

const StatusBadge = ({ status }) => {
  const meta = STATUS_META[status] || STATUS_META.pending;
  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold border px-2.5 py-1 rounded-full ${meta.cls}`}
    >
      <Icon size={10} /> {meta.label}
    </span>
  );
};

const InfoRow = ({ label, value }) =>
  value ? (
    <div className="flex justify-between py-2 border-b border-stone-100 last:border-0 gap-4">
      <span className="text-[12px] text-stone-400 font-medium shrink-0">
        {label}
      </span>
      <span className="text-[12px] font-semibold text-stone-800 text-right">
        {value}
      </span>
    </div>
  ) : null;

const ReviewDetail = ({ recipe, onBack, onDecision }) => {
  const normalizedRecipe = {
    ...recipe,
    img: recipe.imageUrl || recipe.thumbnail || "/placeholder.jpg",
    status: recipe.verificationStatus || recipe.status || "pending",
    submittedBy: recipe.uploader?.fullName || recipe.submittedBy || "Unknown",
    submittedAt:
      recipe.submittedAt ||
      (recipe.createdAt
        ? new Date(recipe.createdAt).toLocaleDateString()
        : "-"),
    category: recipe.recipeCategory || recipe.category || "-",
    desc: recipe.description || recipe.desc || "-",
    benefit: recipe.benefit || "-",
    herbs: recipe.herbs?.length ? recipe.herbs : [],
    ingredients:
      recipe.ingredientList?.map((ing) => ({
        name: ing.name || "-",
        qty: ing.quantity || "-",
        note: ing.note || "",
      })) || [],
    dosage: recipe.usageInfo?.dosage || "-",
    frequency: recipe.usageInfo?.frequency || "-",
    duration: recipe.usageInfo?.duration || "-",
    suitableFor: recipe.usageInfo?.ageGroup || "-",
    steps: recipe.steps?.length ? recipe.steps : [],
    doctorName: recipe.assignedDoctor?.fullName || "-",
    doctorSpecialization: recipe.assignedDoctor?.specialization || "-",
    level: recipe.level || "-",
    prepTime: recipe.prepTime ? `${recipe.prepTime} min` : "-",
    cookTime: recipe.cookTime ? `${recipe.cookTime} min` : "-",
  };

  // ✅ note is purely local UI state — never triggers API
  const [note, setNote] = useState(recipe.reviewNote ?? "");

  // ✅ decided only set after successful API response
  const [decided, setDecided] = useState(
    normalizedRecipe.status === "approved" ||
      normalizedRecipe.status === "rejected"
      ? normalizedRecipe.status
      : null
  );

  const [loading, setLoading] = useState(null); // "approve" | "reject" | null
  const [apiError, setApiError] = useState("");

  const isPending = normalizedRecipe.status === "pending";

  // ✅ action matches backend: "approve" | "reject"
  const decide = async (action) => {
    if (loading) return; // prevent double click
    setApiError("");
    setLoading(action);

    try {
      const res = await axios.post(
        "mongodb+srv://alkeshmahamune12_db_user:tjn24OLaUtx8MsTN@cluster0.sm10gkk.mongodb.net/?appName=Cluster0/api/doctor/verify-recipe",
        {
          recipeId: recipe._id || recipe.id,
          action,       // ✅ "approve" or "reject" — matches backend validation
          note,         // ✅ captured at click time, not on keystroke
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
          },
        }
      );

      if (res.data?.success) {
        // ✅ derive decided label from action
        const decidedStatus = action === "approve" ? "approved" : "rejected";
        setDecided(decidedStatus);
        onDecision(recipe._id || recipe.id, decidedStatus, note);
      } else {
        setApiError(res.data?.message || "Something went wrong.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Network error. Please try again.";
      setApiError(msg);
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ animation: "fadeUp .35s ease both" }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 border border-stone-200 rounded-full
                     px-4 py-2 text-[12px] font-semibold text-stone-500 bg-white
                     hover:border-stone-400 hover:text-stone-700 transition-all"
        >
          ← Back
        </button>

        <StatusBadge status={decided ?? normalizedRecipe.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img
              src={normalizedRecipe.img}
              alt={recipe.title}
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Steps */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-4">
              Preparation Steps
            </p>
            <div className="flex flex-col gap-3">
              {normalizedRecipe.steps.length > 0 ? (
                normalizedRecipe.steps.map((s, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full border flex items-center justify-center text-[9px]">
                      {i + 1}
                    </div>
                    <p className="text-[13px] text-stone-700">{s}</p>
                  </div>
                ))
              ) : (
                <p className="text-[13px] text-stone-400 italic">No steps provided.</p>
              )}
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-4">
              Ingredients
            </p>
            <div className="divide-y">
              {normalizedRecipe.ingredients.length > 0 ? (
                normalizedRecipe.ingredients.map((ing, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <p className="text-[13px] font-semibold">{ing.name}</p>
                    <span className="text-[12px] bg-gray-100 px-2 py-1 rounded">
                      {ing.qty}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[13px] text-stone-400 italic">No ingredients listed.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border rounded-2xl p-5">
            <p className="text-[10px] text-teal-600 mb-2">
              {normalizedRecipe.category}
            </p>
            <h2 className="text-[20px] font-bold mb-2">{recipe.title}</h2>
            <p className="text-[12px] mb-4">{normalizedRecipe.desc}</p>

            <div className="bg-gray-50 p-3 rounded space-y-1 text-[13px]">
              <p><span className="font-medium">By:</span> {normalizedRecipe.submittedBy}</p>
              <p><span className="font-medium">Date:</span> {normalizedRecipe.submittedAt}</p>
              <p><span className="font-medium">Benefit:</span> {normalizedRecipe.benefit}</p>
              <p><span className="font-medium">Level:</span> {normalizedRecipe.level}</p>
              <p><span className="font-medium">Prep Time:</span> {normalizedRecipe.prepTime}</p>
              <p><span className="font-medium">Cook Time:</span> {normalizedRecipe.cookTime}</p>
              <p><span className="font-medium">Dosage:</span> {normalizedRecipe.dosage}</p>
              <p><span className="font-medium">Frequency:</span> {normalizedRecipe.frequency}</p>
              <p><span className="font-medium">Duration:</span> {normalizedRecipe.duration}</p>
              <p><span className="font-medium">Suitable For (Age):</span> {normalizedRecipe.suitableFor}</p>
              <p><span className="font-medium">Assigned Doctor:</span> {normalizedRecipe.doctorName}</p>
              <p><span className="font-medium">Specialization:</span> {normalizedRecipe.doctorSpecialization}</p>
            </div>

            {normalizedRecipe.herbs.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {normalizedRecipe.herbs.map((h) => (
                  <span key={h} className="bg-teal-100 px-2 py-1 text-xs rounded">
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Review Panel */}
          <div className="bg-white border rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-3">
              Review Note
            </p>

            {/* ✅ textarea ONLY updates local state — zero API involvement */}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a review note (optional)..."
              disabled={!isPending || !!decided}
              className="w-full border rounded-lg p-2 mb-3 text-[13px] resize-none
                         focus:outline-none focus:ring-1 focus:ring-teal-400
                         disabled:bg-gray-50 disabled:text-stone-400"
              rows={4}
            />

            {/* ✅ Error message from API */}
            {apiError && (
              <p className="text-[12px] text-red-500 mb-3">{apiError}</p>
            )}

            {/* ✅ Buttons only show when truly pending and not yet decided */}
            {isPending && !decided && (
              <div className="flex gap-3">
                <button
                  onClick={() => decide("approve")}
                  disabled={!!loading}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-60
                             text-white px-4 py-2 rounded-lg text-[13px] font-medium
                             transition-colors flex items-center gap-2"
                >
                  {loading === "approve" ? "Approving…" : "Approve"}
                </button>

                <button
                  onClick={() => decide("reject")}
                  disabled={!!loading}
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-60
                             text-white px-4 py-2 rounded-lg text-[13px] font-medium
                             transition-colors flex items-center gap-2"
                >
                  {loading === "reject" ? "Rejecting…" : "Reject"}
                </button>
              </div>
            )}

            {/* ✅ Post-decision confirmation */}
            {decided && (
              <p className="text-[13px] text-stone-500 mt-1">
                This recipe has been{" "}
                <span
                  className={
                    decided === "approved" ? "text-green-600 font-semibold" : "text-red-500 font-semibold"
                  }
                >
                  {decided}
                </span>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ApproveRecipe = () => {
  const doctorToken = localStorage.getItem("doctorToken");
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = useCallback(async () => {
    if (!doctorToken) {
      setLoading(false);
      setError("Doctor login is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const statuses = ["pending", "approved", "rejected"];
      const responses = await Promise.all(
        statuses.map((status) =>
          axios.get(apiUrl(`/api/doctor/get-pending-recipe?status=${status}`), {
            headers: { Authorization: `Bearer ${doctorToken}` },
          }),
        ),
      );

      const merged = responses
        .flatMap((response) => response.data?.recipes || [])
        .map(normalizeRecipe);

      const deduped = Array.from(
        new Map(merged.map((recipe) => [recipe.id, recipe])).values(),
      );

      setRecipes(deduped);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load doctor queue.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [doctorToken]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const onDecision = useCallback(
    async (recipeId, decision, note) => {
      try {
        setSaving(true);
        const response = await axios.post(
          apiUrl("/api/doctor/verify-recipe"),
          {
            recipeId,
            action: decision,
            note,
          },
          {
            headers: { Authorization: `Bearer ${doctorToken}` },
          },
        );

        const updated = normalizeRecipe(response.data?.recipe || {});
        setRecipes((prev) =>
          prev.map((recipe) => (recipe.id === recipeId ? updated : recipe)),
        );
        toast.success(
          decision === "approve"
            ? "Recipe approved successfully"
            : "Recipe rejected successfully",
        );
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Could not save review");
      } finally {
        setSaving(false);
      }
    },
    [doctorToken],
  );

  const visible = useMemo(() => {
    let list = [...recipes];
    if (filter !== "all") {
      list = list.filter((recipe) => recipe.status === filter);
    }

    const query = search.trim().toLowerCase();
    if (!query) return list;

    return list.filter((recipe) =>
      [recipe.title, recipe.submittedBy, recipe.category, recipe.desc]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [recipes, filter, search]);

  const counts = useMemo(
    () => ({
      pending: recipes.filter((recipe) => recipe.status === "pending").length,
      approved: recipes.filter((recipe) => recipe.status === "approved").length,
      rejected: recipes.filter((recipe) => recipe.status === "rejected").length,
    }),
    [recipes],
  );

  const selectedRecipe = selected
    ? recipes.find((recipe) => recipe.id === selected)
    : null;

  return (
    <>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
        {selectedRecipe ? (
          <ReviewDetail
            recipe={selectedRecipe}
            onBack={() => setSelected(null)}
            onDecision={onDecision}
            saving={saving}
          />
        ) : (
          <>
            <div
              className="pb-6 mb-7 border-b border-stone-200"
              style={{ animation: "fadeUp .4s ease both" }}
            >
              <p className="text-[11px] uppercase tracking-[2px] font-semibold text-teal-600 mb-1.5">
                Doctor Portal
              </p>
              <h1 className="text-[26px] font-bold text-stone-900 mb-4">
                Herbal Recipe Review
              </h1>

              <div className="flex flex-wrap gap-2">
                {[
                  {
                    label: "Pending",
                    count: counts.pending,
                    cls: "bg-amber-50 text-amber-700 border-amber-200",
                  },
                  {
                    label: "Approved",
                    count: counts.approved,
                    cls: "bg-teal-50 text-teal-700 border-teal-200",
                  },
                  {
                    label: "Rejected",
                    count: counts.rejected,
                    cls: "bg-red-50 text-red-700 border-red-200",
                  },
                  {
                    label: "Total",
                    count: recipes.length,
                    cls: "bg-stone-100 text-stone-600 border-stone-200",
                  },
                ].map((stat) => (
                  <span
                    key={stat.label}
                    className={`inline-flex items-center gap-1.5 border text-[11px] font-semibold px-3 py-1.5 rounded-full ${stat.cls}`}
                  >
                    {stat.label} <span className="font-bold">{stat.count}</span>
                  </span>
                ))}
              </div>
            </div>

            <div
              className="flex flex-wrap gap-3 items-center mb-5"
              style={{
                animation: "fadeUp .4s .05s ease both",
                opacity: 0,
                animationFillMode: "both",
              }}
            >
              <div className="inline-flex gap-1 bg-stone-100 border border-stone-200 rounded-xl p-1">
                {[
                  { key: "all", label: "All" },
                  { key: "pending", label: "Pending" },
                  { key: "approved", label: "Approved" },
                  { key: "rejected", label: "Rejected" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap ${
                      filter === tab.key
                        ? "bg-white text-stone-900 shadow-sm"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 min-w-45 relative">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search recipes or submitters..."
                  className="w-full pl-8 pr-4 py-2.5 border border-stone-200 rounded-xl text-[13px] bg-white text-stone-800 outline-none focus:border-teal-400 transition-all placeholder:text-stone-400"
                />
              </div>

              <button
                type="button"
                onClick={fetchRecipes}
                className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-[12px] font-semibold text-stone-600 hover:border-teal-300 hover:text-teal-700 transition-all"
              >
                Refresh
              </button>

              <span className="text-[12px] text-stone-400">
                {visible.length} recipes
              </span>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid gap-3">
                {[0, 1, 2].map((key) => (
                  <div
                    key={key}
                    className="h-24 rounded-2xl bg-stone-100 animate-pulse"
                  />
                ))}
              </div>
            ) : visible.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-stone-400">
                <p className="text-[14px] font-semibold text-stone-600">
                  No recipes found
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {visible.map((recipe, index) => (
                  <div
                    key={recipe.id}
                    onClick={() => setSelected(recipe.id)}
                    className="group bg-white border border-stone-200 rounded-2xl p-4 cursor-pointer hover:border-teal-300 hover:shadow-sm transition-all duration-200 flex gap-4"
                    style={{
                      animation: `fadeUp .35s ${0.1 + index * 0.04}s ease both`,
                      opacity: 0,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="w-20 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={recipe.img}
                        alt={recipe.title}
                        className="w-full h-full object-cover block"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-[14px] font-bold text-stone-900 leading-snug truncate">
                          {recipe.title}
                        </h3>
                        <StatusBadge status={recipe.status} />
                      </div>
                      <p className="text-[12px] text-stone-400 mb-2 truncate">
                        {recipe.desc || "No description"}
                      </p>
                      <div className="flex flex-wrap gap-3 text-[11px] text-stone-400">
                        <span className="flex items-center gap-1">
                          <User size={10} /> {recipe.submittedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {recipe.submittedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Leaf size={10} /> {recipe.category}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <Eye
                        size={16}
                        className="text-stone-300 group-hover:text-teal-500 transition-colors"
                      />
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
