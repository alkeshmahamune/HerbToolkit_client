import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { VideoPlayer } from "./VideoPlayer";
import { seedComments } from "../data/userData";
import { apiUrl, authHeaders } from "../config/api.js";

const fmt = (n) => {
  if (typeof n === "string") return n;
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n;
};

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

function hasAuthToken() {
  try {
    return !!(
      localStorage.getItem("userToken") || localStorage.getItem("influencerToken")
    );
  } catch {
    return false;
  }
}

export const VideoView = ({ dish, onBack }) => {
  const recipeId = dish?.recipeId;
  const isApiRecipe = useMemo(
    () => recipeId && /^[a-f\d]{24}$/i.test(String(recipeId)),
    [recipeId],
  );

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [cLikes, setCLikes] = useState({});

  useEffect(() => {
    setLiked(!!dish?.liked);
    setDisliked(!!dish?.disliked);
    setSaved(!!dish?.saved);
    setLikesCount(Number(dish?.likes) || 0);
    setDislikesCount(Number(dish?.dislikes) || 0);
  }, [
    dish?.recipeId,
    dish?.liked,
    dish?.disliked,
    dish?.saved,
    dish?.likes,
    dish?.dislikes,
  ]);

  useEffect(() => {
    if (!isApiRecipe) {
      setComments(seedComments);
      return;
    }
    let cancelled = false;
    axios
      .get(apiUrl(`/api/recipes/${recipeId}/comments`), {
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
  }, [isApiRecipe, recipeId]);

  const toggleLike = async () => {
    if (!isApiRecipe) {
      setLiked((l) => !l);
      return;
    }
    if (!hasAuthToken()) {
      toast.error("Sign in to like recipes");
      return;
    }
    try {
      const r = await axios.post(
        apiUrl(`/api/recipes/${recipeId}/like`),
        { recipeType: "uploadedRecipe" },
        { headers: authHeaders() },
      );
      if (r.data?.success) {
        setLiked(!!r.data.liked);
        setLikesCount(Number(r.data.likes) || 0);
        setDisliked(!!r.data.disliked);
        setDislikesCount(Number(r.data.dislikes) || 0);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not update like");
    }
  };

  const toggleDislike = async () => {
    if (!isApiRecipe) {
      setDisliked((d) => !d);
      return;
    }
    if (!hasAuthToken()) {
      toast.error("Sign in to react to recipes");
      return;
    }
    try {
      const r = await axios.post(
        apiUrl(`/api/recipes/${recipeId}/dislike`),
        { recipeType: "uploadedRecipe" },
        { headers: authHeaders() },
      );
      if (r.data?.success) {
        setDisliked(!!r.data.disliked);
        setDislikesCount(Number(r.data.dislikes) || 0);
        setLiked(!!r.data.liked);
        setLikesCount(Number(r.data.likes) || 0);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not update dislike");
    }
  };

  const toggleSave = async () => {
    if (!isApiRecipe) {
      toast.error("Save is only available for posted recipes");
      return;
    }
    if (!hasAuthToken()) {
      toast.error("Sign in to save recipes");
      return;
    }
    const headers = authHeaders();
    try {
      if (saved) {
        await axios.delete(apiUrl(`/api/recipes/save/${recipeId}`), {
          headers,
        });
        setSaved(false);
        toast.success("Removed from saved");
      } else {
        await axios.post(
          apiUrl("/api/recipes/save"),
          { recipeId, recipeType: "uploadedRecipe" },
          { headers },
        );
        setSaved(true);
        toast.success("Saved");
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Save failed");
    }
  };

  const shareRecipe = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: dish?.name,
          text: dish?.name,
          url,
        });
      } else if (url) {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      /* user cancelled share */
    }
  };

  const postComment = async () => {
    const text = commentText.trim();
    if (!text) return;
    if (isApiRecipe) {
      if (!hasAuthToken()) {
        toast.error("Sign in to comment");
        return;
      }
      try {
        const r = await axios.post(
          apiUrl(`/api/recipes/${recipeId}/comments`),
          { text, recipeType: "uploadedRecipe" },
          { headers: authHeaders() },
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
        }
      } catch (e) {
        toast.error(e.response?.data?.message || "Could not post comment");
      }
      return;
    }
    setComments((prev) => [
      {
        user: "You",
        init: "YO",
        bg: "#e1f5ee",
        tc: "#0f6e56",
        text,
        time: "just now",
        likes: 0,
      },
      ...prev,
    ]);
    setCommentText("");
  };

  const toggleCLike = (i) => setCLikes((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="w-full animate-[fadeUp_0.4s_ease_both]">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 mb-5 hover:bg-stone-100 transition"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {dish.video ? (
        <VideoPlayer src={dish.video} />
      ) : (
        <div className="relative w-full bg-stone-100 rounded-2xl overflow-hidden aspect-video">
          <img
            src={dish.img}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <p className="absolute bottom-3 left-3 right-3 text-center text-xs text-white bg-black/50 rounded-lg py-2 px-3">
            Text recipe — no video attached
          </p>
        </div>
      )}

      <h1 className="roboto text-2xl font-semibold text-gray-900 mt-4 mb-1 leading-snug">
        {dish.name} — Authentic Recipe
      </h1>
      <p className="text-sm text-gray-400 mb-4">
        {fmt(dish.views)} views &nbsp;·&nbsp; 3 days ago
      </p>

      <div className="flex items-center justify-between py-3 border-y border-stone-100 mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-semibold text-sm shrink-0">
            {initials(dish.channel)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{dish.channel}</p>
            <p className="text-xs text-gray-400">{dish.subs} subscribers</p>
          </div>
        </div>
        <button
          onClick={() => setSubscribed((s) => !s)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${subscribed ? "bg-stone-200 text-stone-600" : "bg-teal-600 hover:bg-teal-700 text-white"}`}
        >
          {subscribed ? "✓ Subscribed" : "Subscribe"}
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {[
          {
            key: "like",
            icon: <ThumbsUp size={14} />,
            label: fmt(likesCount),
            action: toggleLike,
            active: liked,
          },
          {
            key: "dislike",
            icon: <ThumbsDown size={14} />,
            label: isApiRecipe ? fmt(dislikesCount) : "Dislike",
            action: toggleDislike,
            active: disliked,
          },
          {
            key: "share",
            icon: <Share2 size={14} />,
            label: "Share",
            action: shareRecipe,
            active: false,
          },
          {
            key: "save",
            icon: <Bookmark size={14} />,
            label: saved ? "Saved" : "Save",
            action: toggleSave,
            active: saved,
          },
        ].map(({ key, icon, label, action, active }) => (
          <button
            key={key}
            type="button"
            onClick={action}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm transition-all
              ${active ? "bg-teal-50 border-teal-300 text-teal-600" : "bg-stone-50 border-stone-200 text-gray-700 hover:bg-stone-100"}`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      <hr className="border-stone-100 mb-4" />

      <p className="text-base font-medium text-gray-800 mb-4">
        {comments.length} Comments
      </p>

      <div className="flex gap-3 mb-6 items-start">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-semibold shrink-0">
          YO
        </div>
        <div className="flex-1">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            rows={2}
            className="w-full border border-stone-200 focus:border-teal-400 rounded-xl px-3 py-2 text-sm text-gray-800 resize-none outline-none transition bg-white"
          />
          <div className="flex justify-end mt-1.5">
            <button
              type="button"
              onClick={postComment}
              className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-full transition"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-10">
        {comments.map((c, i) => (
          <div
            key={c._id || i}
            className="flex gap-3"
            style={{
              animation: `fadeUp 0.4s ${i * 0.04}s ease both`,
              opacity: 0,
              animationFillMode: "both",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
              style={{ background: c.bg, color: c.tc }}
            >
              {c.init}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {c.user}{" "}
                <span className="text-xs font-normal text-gray-400 ml-1">
                  {c.time}
                </span>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                {c.text}
              </p>
              <button
                type="button"
                onClick={() => toggleCLike(i)}
                className={`mt-1.5 inline-flex items-center gap-1 text-xs transition-colors ${cLikes[i] ? "text-teal-600" : "text-gray-400 hover:text-teal-400"}`}
              >
                <ThumbsUp
                  size={11}
                  fill={cLikes[i] ? "currentColor" : "none"}
                />
                {(c.likes || 0) + (cLikes[i] ? 1 : 0)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
