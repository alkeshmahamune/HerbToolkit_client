import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  Flame,
  CheckCircle2,
  Circle,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Send,
  Heart,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl, authHeaders } from "../config/api.js";
import { useLocation } from "react-router-dom";

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

export const UploadedRecipeDetailModal = ({
  recipe,
  onClose,
  onLikeChange,
  onSaveChange,
}) => {
  const [doneSteps, setDoneSteps] = useState(new Set());
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [liked, setLiked] = useState(recipe?.liked || false);
  const [disliked, setDisliked] = useState(recipe?.disliked || false);
  const [saved, setSaved] = useState(recipe?.saved || false);
  const [likesCount, setLikesCount] = useState(recipe?.likes || 0);
  const [dislikesCount, setDislikesCount] = useState(recipe?.dislikes || 0);

  const location = useLocation();
  let token;
  if (location.pathname.includes("user")) {
    token = localStorage.getItem("userToken");
  } else {
    token = localStorage.getItem("doctorToken");
  }

  const isMongoId = (id) =>
    typeof id === "string" && /^[a-f\d]{24}$/i.test(String(id));

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
        const list = (r.data?.comments || []).map((c) => ({
          user: c.authorName,
          init: initials(c.authorName),
          bg: "#e1f5ee",
          tc: "#0f6e56",
          text: c.text,
          time: formatAgo(c.createdAt),
          likes: c.likes || 0,
          _id: c._id,
        }));
        setComments(list);
      })
      .catch(() => {
        if (!cancelled) setComments([]);
      });

    return () => {
      cancelled = true;
    };
  }, [recipe?.recipeId]);

  const toggleLike = async () => {
    if (!isMongoId(recipe?.recipeId)) {
      setLiked((l) => !l);
      return;
    }

    try {
      const r = await axios.post(
        apiUrl(`/api/recipes/${recipe.recipeId}/like`),
        { recipeType: "uploadedRecipe" },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (r.data?.success) {
        setLiked(!!r.data.liked);
        setLikesCount(Number(r.data.likes) || 0);
        setDisliked(!!r.data.disliked);
        setDislikesCount(Number(r.data.dislikes) || 0);
        onLikeChange?.({
          liked: !!r.data.liked,
          disliked: !!r.data.disliked,
          likes: Number(r.data.likes) || 0,
          dislikes: Number(r.data.dislikes) || 0,
        });
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not update like");
    }
  };

  const toggleDislike = async () => {
    if (!isMongoId(recipe?.recipeId)) {
      setDisliked((d) => !d);
      return;
    }

    try {
      const r = await axios.post(
        apiUrl(`/api/recipes/${recipe.recipeId}/dislike`),
        { recipeType: "uploadedRecipe" },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (r.data?.success) {
        setLiked(!!r.data.liked);
        setLikesCount(Number(r.data.likes) || 0);
        setDisliked(!!r.data.disliked);
        setDislikesCount(Number(r.data.dislikes) || 0);
        onLikeChange?.({
          liked: !!r.data.liked,
          disliked: !!r.data.disliked,
          likes: Number(r.data.likes) || 0,
          dislikes: Number(r.data.dislikes) || 0,
        });
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not update dislike");
    }
  };

  const toggleSave = async () => {
    if (!isMongoId(recipe?.recipeId)) {
      setSaved((s) => !s);
      return;
    }

    try {
      if (saved) {
        await axios.delete(
          apiUrl(`/api/recipes/save/${recipe.recipeId}`),
          { headers: { Authorization: token } },
        );
      } else {
        await axios.post(
          apiUrl("/api/recipes/save"),
          { recipeId: recipe.recipeId, source: "uploadedRecipe" },
          { headers: { Authorization: token } },
        );
      }
      setSaved((s) => !s);
      onSaveChange?.(!saved);
      toast.success(saved ? "Removed from saved" : "Added to saved");
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not save recipe");
    }
  };

  const postComment = async () => {
    const text = commentText.trim();
    if (!text) return;

    if (!isMongoId(recipe?.recipeId)) return;

    setPosting(true);
    try {
      const r = await axios.post(
        apiUrl(`/api/recipes/${recipe.recipeId}/comments`),
        { text, recipeType: "uploadedRecipe" },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (r.data?.success) {
        setComments((prev) => [
          {
            user: "You",
            init: "YO",
            bg: "#dbeafe",
            tc: "#1d4ed8",
            text,
            time: "just now",
            likes: 0,
          },
          ...prev,
        ]);
        setCommentText("");
        toast.success("Comment posted");
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not post comment");
    } finally {
      setPosting(false);
    }
  };

  const toggleStep = (idx) => {
    setDoneSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  if (!recipe) return null;

  const uploaderName = recipe.channel || "Creator";

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{
          animationName: "pop",
          animationDuration: "0.3s",
          animationTimingFunction: "ease",
          animationFillMode: "both",
        }}
      >
        {/* ── Header with image ── */}
        <div className="relative">
          {recipe.img ? (
            <img
              src={recipe.img}
              alt={recipe.name}
              className="w-full h-72 object-cover"
            />
          ) : (
            <div className="w-full h-72 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
              <span className="text-stone-400 text-sm">No image available</span>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center
                       text-gray-800 hover:bg-white transition-all shadow-lg"
          >
            <X size={20} />
          </button>

          {/* Type badge */}
          <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-white/95 rounded-full px-3 py-1.5 text-sm font-medium text-gray-800 shadow-lg">
            📖 Text Recipe
          </span>
        </div>

        {/* ── Content ── */}
        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              {recipe.name}
            </h2>
            <p className="text-sm text-gray-500">{recipe.cat}</p>
          </div>

          {/* Description */}
          {recipe.description && (
            <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
          )}

          {/* Info chips */}
          <div className="flex flex-wrap gap-3">
            {recipe.prepTime && (
              <div className="flex items-center gap-2 bg-stone-100 rounded-xl px-3 py-2">
                <Clock size={14} className="text-stone-500" />
                <span className="text-sm text-stone-700">Prep: {recipe.prepTime}</span>
              </div>
            )}
            {recipe.cookTime && (
              <div className="flex items-center gap-2 bg-stone-100 rounded-xl px-3 py-2">
                <Flame size={14} className="text-stone-500" />
                <span className="text-sm text-stone-700">Cook: {recipe.cookTime}</span>
              </div>
            )}
          </div>

          {/* Engagement buttons */}
          <div className="flex gap-2 flex-wrap pb-4 border-b border-stone-100">
            <button
              onClick={toggleLike}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all
                ${
                  liked
                    ? "bg-red-50 text-red-600"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} />
              <span className="text-sm font-medium">{fmt(likesCount)}</span>
            </button>
            <button
              onClick={toggleDislike}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all
                ${
                  disliked
                    ? "bg-blue-50 text-blue-600"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
            >
              <ThumbsDown size={16} fill={disliked ? "currentColor" : "none"} />
              <span className="text-sm font-medium">{fmt(dislikesCount)}</span>
            </button>
            <button
              onClick={toggleSave}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all
                ${
                  saved
                    ? "bg-amber-50 text-amber-600"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
            >
              <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
              <span className="text-sm font-medium">{saved ? "Saved" : "Save"}</span>
            </button>
          </div>

          {/* Ingredients */}
          {recipe.ingredientList && recipe.ingredientList.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🥘</span> Ingredients
              </h3>
              <div className="space-y-2">
                {recipe.ingredientList.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2 bg-stone-50 rounded-lg text-sm"
                  >
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-700 flex-1">{ing.name}</span>
                    {ing.quantity && (
                      <span className="text-gray-500 font-medium">
                        {ing.quantity}
                        {ing.unit && ` ${ing.unit}`}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Steps */}
          {recipe.steps && recipe.steps.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>👣</span> Steps
              </h3>
              <div className="space-y-2">
                {recipe.steps.map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      doneSteps.has(idx)
                        ? "bg-teal-50 opacity-50"
                        : "bg-stone-50 hover:bg-stone-100"
                    }`}
                  >
                    {doneSteps.has(idx) ? (
                      <CheckCircle2
                        size={20}
                        className="text-teal-600 shrink-0 mt-0.5"
                      />
                    ) : (
                      <Circle
                        size={20}
                        className="text-stone-300 shrink-0 mt-0.5"
                      />
                    )}
                    <div className="flex-1">
                      <p
                        className={`text-sm leading-relaxed ${
                          doneSteps.has(idx) ? "line-through text-gray-400" : "text-gray-700"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Herbs/Tags */}
          {recipe.herbs && recipe.herbs.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🌿</span> Herbs & Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {recipe.herbs.map((herb, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1.5 rounded-lg"
                  >
                    {herb}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments section */}
          <div className="border-t border-stone-100 pt-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>

            {/* Comment input */}
            <div className="flex gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                YO
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !posting) postComment();
                  }}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  onClick={postComment}
                  disabled={posting || !commentText.trim()}
                  className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-teal-600
                             text-white text-sm font-medium rounded-lg hover:bg-teal-700
                             disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={14} /> {posting ? "Posting..." : "Post"}
                </button>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        comment.bg === "#dbeafe"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-teal-100 text-teal-600"
                      }`}
                    >
                      {comment.init}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-800">
                          {comment.user}
                        </span>
                        <span className="text-xs text-gray-400">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 text-sm py-4">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
