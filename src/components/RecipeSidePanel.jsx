import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  Flame,
  CheckCircle2,
  Circle,
  Heart,
  ThumbsDown,
  Bookmark,
  Send,
  Star,
  Leaf,
  Zap,
  ShieldCheck,
  Tag,
  Link2,
  FlaskConical,
  Utensils,
  Activity,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "../config/api.js";
import { useLocation } from "react-router-dom";

/* ─── helpers ─────────────────────────────────────────────────── */
const initials = (name) =>
  String(name || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function formatAgo(iso) {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const fmt = (n) => {
  if (typeof n === "string") return n;
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n;
};

/* ─── small UI atoms ───────────────────────────────────────────── */
const Chip = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 bg-stone-100 rounded-lg px-3 py-2">
    <span className="text-stone-500">{icon}</span>
    <span className="text-sm text-stone-700">{label}</span>
  </div>
);

const SectionHeading = ({ emoji, label }) => (
  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
    <span className="text-lg leading-none">{emoji}</span>
    {label}
  </h3>
);

const InfoRow = ({ label, value, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-50",
    blue:   "bg-blue-50",
    teal:   "bg-teal-50",
    amber:  "bg-amber-50",
  };
  return (
    <div className={`flex items-center justify-between px-3 py-2 ${colors[color]} rounded-lg`}>
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-sm text-gray-900 font-semibold">{value}</span>
    </div>
  );
};

/* ─── main component ───────────────────────────────────────────── */
export const RecipeSidePanel = ({
  recipe,
  onClose,
  onLikeChange,
  onSaveChange,
}) => {
  const [doneSteps, setDoneSteps]     = useState(new Set());
  const [comments, setComments]       = useState([]);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting]         = useState(false);
  const [liked, setLiked]             = useState(recipe?.liked    || false);
  const [disliked, setDisliked]       = useState(recipe?.disliked || false);
  const [saved, setSaved]             = useState(recipe?.saved    || false);
  const [likesCount, setLikesCount]   = useState(recipe?.likes    || 0);
  const [dislikesCount, setDislikesCount] = useState(recipe?.dislikes || 0);
    console.log(recipe)
  const location = useLocation();
  const token = location.pathname.includes("user")
    ? localStorage.getItem("userToken")
    : localStorage.getItem("doctorToken");

  const isMongoId = (id) =>
    typeof id === "string" && /^[a-f\d]{24}$/i.test(String(id));

  /* ── detect recipe kind ─────────────────────────────────────── */
  const isHerbal  = recipe?.recipeCategory === "herbal";
  const isRegular = recipe?.recipeCategory === "regular";

  /* ── check for usage info and nutrition ─────────────────────── */
  const hasUsageInfo = isHerbal &&
    recipe.usageInfo &&
    typeof recipe.usageInfo === "object" &&
    Object.values(recipe.usageInfo).some((v) => v);

  const hasNutrition = isRegular &&
    recipe.nutrition &&
    typeof recipe.nutrition === "object" &&
    Object.values(recipe.nutrition).some((v) => v);

  /* ── fetch comments ─────────────────────────────────────────── */
  useEffect(() => {
    if (!recipe?.recipeId || !isMongoId(recipe.recipeId)) {
      setComments([]);
      return;
    }
    let cancelled = false;
    axios
      .get(apiUrl(`/api/recipes/${recipe.recipeId}/comments`), {
        params: { recipeType: "uploadedRecipe" },
      })
      .then((r) => {
        if (cancelled) return;
        setComments(
          (r.data?.comments || []).map((c) => ({
            user: c.authorName,
            init: initials(c.authorName),
            bg:   "#e1f5ee",
            tc:   "#0f6e56",
            text: c.text,
            time: formatAgo(c.createdAt),
            likes: c.likes || 0,
            _id:  c._id,
          }))
        );
      })
      .catch(() => { if (!cancelled) setComments([]); });
    return () => { cancelled = true; };
  }, [recipe?.recipeId]);

  /* ── like / dislike / save ──────────────────────────────────── */
  const toggleLike = async () => {
    if (!isMongoId(recipe?.recipeId)) { setLiked((l) => !l); return; }
    try {
      const r = await axios.post(
        apiUrl(`/api/recipes/${recipe.recipeId}/like`),
        { recipeType: "uploadedRecipe" },
        { headers: { Authorization: token } }
      );
      if (r.data?.success) {
        setLiked(!!r.data.liked);
        setLikesCount(Number(r.data.likes) || 0);
        setDisliked(!!r.data.disliked);
        setDislikesCount(Number(r.data.dislikes) || 0);
        onLikeChange?.({ liked: !!r.data.liked, disliked: !!r.data.disliked, likes: Number(r.data.likes) || 0, dislikes: Number(r.data.dislikes) || 0 });
      }
    } catch (e) { toast.error(e.response?.data?.message || "Could not update like"); }
  };

  const toggleDislike = async () => {
    if (!isMongoId(recipe?.recipeId)) { setDisliked((d) => !d); return; }
    try {
      const r = await axios.post(
        apiUrl(`/api/recipes/${recipe.recipeId}/dislike`),
        { recipeType: "uploadedRecipe" },
        { headers: { Authorization: token } }
      );
      if (r.data?.success) {
        setLiked(!!r.data.liked);
        setLikesCount(Number(r.data.likes) || 0);
        setDisliked(!!r.data.disliked);
        setDislikesCount(Number(r.data.dislikes) || 0);
        onLikeChange?.({ liked: !!r.data.liked, disliked: !!r.data.disliked, likes: Number(r.data.likes) || 0, dislikes: Number(r.data.dislikes) || 0 });
      }
    } catch (e) { toast.error(e.response?.data?.message || "Could not update dislike"); }
  };

  const toggleSave = async () => {
    if (!isMongoId(recipe?.recipeId)) { setSaved((s) => !s); return; }
    try {
      if (saved) {
        await axios.delete(apiUrl(`/api/recipes/save/${recipe.recipeId}`), { headers: { Authorization: token } });
      } else {
        await axios.post(apiUrl("/api/recipes/save"), { recipeId: recipe.recipeId, source: "uploadedRecipe" }, { headers: { Authorization: token } });
      }
      setSaved((s) => !s);
      onSaveChange?.(!saved);
      toast.success(saved ? "Removed from saved" : "Added to saved");
    } catch (e) { toast.error(e.response?.data?.message || "Could not save recipe"); }
  };

  /* ── post comment ───────────────────────────────────────────── */
  const postComment = async () => {
    const text = commentText.trim();
    if (!text || !isMongoId(recipe?.recipeId)) return;
    setPosting(true);
    try {
      const r = await axios.post(
        apiUrl(`/api/recipes/${recipe.recipeId}/comments`),
        { text, recipeType: "uploadedRecipe" },
        { headers: { Authorization: token } }
      );
      if (r.data?.success) {
        setComments((prev) => [
          { user: "You", init: "YO", bg: "#dbeafe", tc: "#1d4ed8", text, time: "just now", likes: 0 },
          ...prev,
        ]);
        setCommentText("");
        toast.success("Comment posted");
      }
    } catch (e) { toast.error(e.response?.data?.message || "Could not post comment"); }
    finally { setPosting(false); }
  };

  const toggleStep = (idx) =>
    setDoneSteps((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });

  if (!recipe) return null;

  /* ── recipe type colors ────────────────────────────────────── */
  const levelColor =
    recipe.level === "Easy"   ? "text-emerald-700 bg-emerald-50 border-emerald-200" :
    recipe.level === "Medium" ? "text-amber-700   bg-amber-50   border-amber-200"   :
    recipe.level === "Hard"   ? "text-red-700     bg-red-50     border-red-200"     :
                                "text-gray-700    bg-gray-50    border-gray-200";

  const statusColor =
    recipe.verificationStatus === "approved" ? "text-emerald-800 bg-emerald-50 border-emerald-200" :
    recipe.verificationStatus === "pending"  ? "text-amber-800   bg-amber-50   border-amber-200"   :
                                               "text-red-800     bg-red-50     border-red-200";

  /* ────────────────────────────────────────────────────────────── */
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      {/* panel */}
      <div
        className="relative w-full max-w-lg h-full bg-white shadow-2xl overflow-y-auto flex flex-col"
        style={{ animation: "slideIn .28s cubic-bezier(.4,0,.2,1)" }}
      >
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
        `}</style>

        {/* ── sticky header ──────────────────────────────────────── */}
        <div className="sticky top-0 z-10 bg-white border-b border-stone-100 px-5 py-4 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {/* category badge */}
              {isHerbal && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  <Leaf size={10} /> Herbal
                </span>
              )}
              {isRegular && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                  <Utensils size={10} /> Recipe
                </span>
              )}
              {/* cuisine / body-part category */}
              {recipe.cat && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  {recipe.cat}
                </span>
              )}
              {/* verification badge */}
              {recipe.verificationStatus === "approved" && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck size={10} /> Verified
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight truncate">
              {recipe.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-gray-600 hover:bg-stone-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── thumbnail ──────────────────────────────────────────── */}
        {(recipe.img || recipe.thumbnail) && (
          <div className="w-full aspect-video bg-stone-100 overflow-hidden shrink-0">
            <img
              src={recipe.img || recipe.thumbnail}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* ── scrollable content ─────────────────────────────────── */}
        <div className="flex-1 px-5 py-5 space-y-6">

          {/* description */}
          {recipe.description && (
            <p className="text-sm text-gray-600 leading-relaxed">{recipe.description}</p>
          )}

          {/* time + difficulty chips */}
          <div className="flex flex-wrap gap-2">
            {recipe.prepTime && (
              <Chip icon={<Clock size={13} />} label={`Prep: ${recipe.prepTime} min`} />
            )}
            {recipe.cookTime && (
              <Chip icon={<Flame size={13} />} label={`Cook: ${recipe.cookTime} min`} />
            )}
            {recipe.level && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border ${levelColor}`}>
                <Zap size={13} /> {recipe.level}
              </span>
            )}
          </div>

          {/* engagement row */}
          <div className="flex gap-2 flex-wrap pb-5 border-b border-stone-100">
            <button
              onClick={toggleLike}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${liked ? "bg-red-50 text-red-600" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
            >
              <Heart size={14} fill={liked ? "currentColor" : "none"} />
              {fmt(likesCount)}
            </button>
            <button
              onClick={toggleDislike}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${disliked ? "bg-blue-50 text-blue-600" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
            >
              <ThumbsDown size={14} fill={disliked ? "currentColor" : "none"} />
              {fmt(dislikesCount)}
            </button>
            <button
              onClick={toggleSave}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${saved ? "bg-amber-50 text-amber-600" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
            >
              <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>

          {/* benefit */}
          {recipe.benefit && (
            <div className="rounded-xl bg-linear-to-br from-teal-50 to-emerald-50 border border-teal-100 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">✨ Benefit</p>
              <p className="text-sm text-gray-700 leading-relaxed">{recipe.benefit}</p>
            </div>
          )}

          {/* ingredients */}
          {recipe.ingredientList && Array.isArray(recipe.ingredientList) && recipe.ingredientList.length > 0 && (
            <div>
              <SectionHeading emoji="🥘" label="Ingredients" />
              <div className="space-y-1.5">
                {recipe.ingredientList.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-2.5 bg-stone-50 rounded-lg text-sm"
                  >
                    <span className="text-gray-700">{ing.name || "Ingredient"}</span>
                    {ing.quantity && (
                      <span className="text-gray-500 font-medium tabular-nums">
                        {ing.quantity}{ing.unit ? ` ${ing.unit}` : ""}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!recipe.ingredientList && (
            <div className="text-xs text-gray-400 italic">No ingredients listed</div>
          )}

          {/* steps */}
          {recipe.steps && Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
            <div>
              <SectionHeading emoji="👣" label="Steps" />
              <div className="space-y-2">
                {recipe.steps.map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all select-none
                      ${doneSteps.has(idx) ? "bg-teal-50 opacity-60" : "bg-stone-50 hover:bg-stone-100"}`}
                  >
                    {doneSteps.has(idx)
                      ? <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                      : <Circle      size={18} className="text-stone-300 shrink-0 mt-0.5" />
                    }
                    <p className={`text-sm leading-relaxed flex-1 ${doneSteps.has(idx) ? "line-through text-gray-400" : "text-gray-700"}`}>
                      <span className="font-semibold text-gray-400 mr-1">#{idx + 1}</span> {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* herbs */}
          {recipe.herbs && Array.isArray(recipe.herbs) && recipe.herbs.length > 0 && (
            <div>
              <SectionHeading emoji="🌿" label="Herbs & Key Ingredients" />
              <div className="flex flex-wrap gap-2">
                {recipe.herbs.map((herb, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-100"
                  >
                    <Leaf size={10} /> {herb}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── herbal: usage info ──────────────────────────────── */}
          {hasUsageInfo && (
            <div>
              <SectionHeading emoji="⚕️" label="Usage Information" />
              <div className="space-y-1.5">
                {recipe.usageInfo.dosage    && <InfoRow color="purple" label="Dosage"    value={recipe.usageInfo.dosage}    />}
                {recipe.usageInfo.frequency && <InfoRow color="purple" label="Frequency" value={recipe.usageInfo.frequency} />}
                {recipe.usageInfo.duration  && <InfoRow color="purple" label="Duration"  value={recipe.usageInfo.duration}  />}
                {recipe.usageInfo.ageGroup  && <InfoRow color="purple" label="Age Group" value={recipe.usageInfo.ageGroup}  />}
              </div>
            </div>
          )}

          {/* ── regular: nutrition ──────────────────────────────── */}
          {hasNutrition && (
            <div>
              <SectionHeading emoji="📊" label="Nutrition per Serving" />
              <div className="grid grid-cols-2 gap-2">
                {recipe.nutrition.calories && (
                  <div className="flex flex-col items-center justify-center bg-orange-50 border border-orange-100 rounded-xl py-3 px-2">
                    <span className="text-2xl font-bold text-orange-600">{recipe.nutrition.calories}</span>
                    <span className="text-xs text-orange-500 mt-0.5">kcal</span>
                    <span className="text-xs text-gray-500 mt-1">Calories</span>
                  </div>
                )}
                {recipe.nutrition.protein && (
                  <div className="flex flex-col items-center justify-center bg-blue-50 border border-blue-100 rounded-xl py-3 px-2">
                    <span className="text-2xl font-bold text-blue-600">{recipe.nutrition.protein}</span>
                    <span className="text-xs text-blue-500 mt-0.5">g</span>
                    <span className="text-xs text-gray-500 mt-1">Protein</span>
                  </div>
                )}
                {recipe.nutrition.carbs && (
                  <div className="flex flex-col items-center justify-center bg-amber-50 border border-amber-100 rounded-xl py-3 px-2">
                    <span className="text-2xl font-bold text-amber-600">{recipe.nutrition.carbs}</span>
                    <span className="text-xs text-amber-500 mt-0.5">g</span>
                    <span className="text-xs text-gray-500 mt-1">Carbs</span>
                  </div>
                )}
                {recipe.nutrition.fat && (
                  <div className="flex flex-col items-center justify-center bg-pink-50 border border-pink-100 rounded-xl py-3 px-2">
                    <span className="text-2xl font-bold text-pink-600">{recipe.nutrition.fat}</span>
                    <span className="text-xs text-pink-500 mt-0.5">g</span>
                    <span className="text-xs text-gray-500 mt-1">Fat</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* tags */}
          {recipe.tags && Array.isArray(recipe.tags) && recipe.tags.length > 0 && (
            <div>
              <SectionHeading emoji="🏷️" label="Tags" />
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-100"
                  >
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* rating */}
          {recipe.ratings > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
              <div className="flex text-amber-400 text-lg leading-none">
                {"★".repeat(Math.min(5, Math.floor(recipe.ratings)))}
                {"☆".repeat(Math.max(0, 5 - Math.floor(recipe.ratings)))}
              </div>
              <span className="text-sm font-semibold text-amber-800">{recipe.ratings} / 5</span>
            </div>
          )}

          {/* product link */}
          {recipe.productLink && (
            <div>
              <SectionHeading emoji="🔗" label="Product Link" />
              <a
                href={recipe.productLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium"
              >
                <Link2 size={14} /> View Product
              </a>
            </div>
          )}

          {/* verification */}
          {recipe.verificationStatus && (
            <div className="rounded-xl border overflow-hidden">
              <div className={`flex items-center justify-between px-4 py-2.5 ${statusColor} border-b`}>
                <span className="text-sm font-semibold flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  {recipe.verificationStatus.charAt(0).toUpperCase() + recipe.verificationStatus.slice(1)}
                </span>
              </div>
              {recipe.reviewNote && (
                <div className="px-4 py-3 bg-white">
                  <p className="text-xs text-gray-500 font-medium mb-0.5">Reviewer note</p>
                  <p className="text-sm text-gray-700">{recipe.reviewNote}</p>
                </div>
              )}
            </div>
          )}

          {/* ── comments ───────────────────────────────────────── */}
          <div className="border-t border-stone-100 pt-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Comments ({comments.length})
            </h3>

            {/* input */}
            <div className="flex gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0 mt-0.5">
                YO
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment…"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !posting) postComment(); }}
                  className="flex-1 px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  onClick={postComment}
                  disabled={posting || !commentText.trim()}
                  className="px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>

            {/* list */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <div key={comment._id || idx} className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        comment.bg === "#dbeafe" ? "bg-blue-100 text-blue-600" : "bg-teal-100 text-teal-600"
                      }`}
                    >
                      {comment.init}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-gray-800">{comment.user}</span>
                        <span className="text-xs text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 text-sm py-6">No comments yet. Be the first!</p>
              )}
            </div>
          </div>

          <div className="h-4" />
        </div>
      </div>
    </div>
  );
};