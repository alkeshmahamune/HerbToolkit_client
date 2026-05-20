import React, { useState, useEffect } from "react";
import {
  Users,
  Play,
  Heart,
  MessageCircle,
  ArrowLeft,
  ThumbsDown,
  Trash2,
} from "lucide-react";
import { recipesUploaded } from "../recipeData";
import axios from "axios";
import { apiUrl, authHeaders } from "../../config/api.js";
import { VideoPlayer } from "../../components/VideoPlayer.jsx";
import { toast } from "react-hot-toast";
//this is the control panel which is home(dashboard) for influencer
// ─── helpers ──────────────────────────────────────────────────────────────────

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : n);

// ─── sub-components ───────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, iconColor, iconBg, label, value, delay }) => (
  <div
    className="flex-1 min-w-32.5 bg-white border border-stone-200 rounded-2xl
               p-4 flex items-center gap-3"
    style={{
      animation: `fadeUp .4s ${delay}s ease both`,
      opacity: 0,
      animationFillMode: "both",
    }}
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: iconBg }}
    >
      <Icon size={16} color={iconColor} />
    </div>
    <div>
      <p className="text-syne text-[20px] font-bold text-stone-900 leading-none">
        {value}
      </p>
      <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  </div>
);

// ─── Recipe card (grid) ───────────────────────────────────────────────────────

const RecipeCard = ({ recipe, onClick, index }) => {
  return (
    <article
      onClick={onClick}
      className="group bg-white border border-stone-200 rounded-2xl overflow-hidden
               cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:border-teal-400
               transition-all duration-200"
      style={{
        animation: `fadeUp .38s ${0.25 + index * 0.06}s ease both`,
        opacity: 0,
        animationFillMode: "both",
      }}
    >
      {/* Thumbnail */}
      <div className="relative h-44 bg-stone-100 overflow-hidden">
        <img
          src={
            recipe.img ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNXbAuDX6ncsg76VTk24lVYYHIQrTzlVBHDA&s"
          }
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between">
          <span className="text-[10px] font-semibold bg-white/90 text-stone-800 px-2 py-1 rounded-full">
            {recipe.type === "video" ? "▶ Video" : "📄 Text"}
          </span>
          <span className="text-[10px] font-semibold bg-teal-600 text-white px-2 py-1 rounded-full">
            {recipe.category}
          </span>
        </div>
        {/* Play overlay */}
        {recipe.type === "video" && (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0
                        group-hover:opacity-100 transition-opacity bg-black/10"
          >
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
              <Play size={13} fill="#18181a" className="ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3.5">
        <h3
          className="text-syne text-[14px] font-bold text-stone-900 mb-1.5
                     whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {recipe.title}
        </h3>
        <div className="flex items-center gap-3 text-[11px] text-stone-400 font-medium mb-2.5">
          <span>⏱ {recipe.time}</span>
          <span>💬 {recipe.commentsCount ?? 0}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] font-bold text-stone-500">
            <Heart size={11} fill="#e8420a" className="text-teal-600" />
            {fmt(recipe.likes)}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-stone-400">
            <ThumbsDown size={11} />
            {fmt(recipe.dislikes)}
          </span>
        </div>
      </div>
    </article>
  );
};

// ─── Detail / Recipe view ─────────────────────────────────────────────────────

const RecipeDetail = ({ recipe, onBack, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comments, setComments] = useState(recipe.comments ?? []);
  const [input, setInput] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const toggleLike = () => {
    setLiked((l) => !l);
    if (!liked) setDisliked(false);
  };

  const toggleDislike = () => {
    setDisliked((d) => !d);
    if (!disliked) setLiked(false);
  };

  const postComment = () => {
    if (!input.trim()) return;
    setComments((prev) => [
      ...prev,
      { u: "You", i: "YO", t: input.trim(), d: "just now" },
    ]);
    setInput("");
  };

  return (
    <div style={{ animation: "fadeUp .35s ease both" }}>
      {/* ── Top bar: back + delete ── */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 border border-stone-200 rounded-full
                     px-4 py-2 text-[12px] font-semibold text-stone-500 bg-white
                     hover:border-teal-400 hover:text-teal-600 transition-all"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Delete button */}
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center gap-1.5 border border-stone-200 rounded-full
                       px-4 py-2 text-[12px] font-semibold text-stone-400 bg-white
                       hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <Trash2 size={13} /> Delete
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-stone-500 font-medium">
              Are you sure?
            </span>
            <button
              onClick={() => onDelete(recipe.id)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-[12px]
                         font-bold rounded-full transition-all"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-4 py-2 border border-stone-200 text-stone-500 text-[12px]
                         font-semibold rounded-full hover:bg-stone-50 transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 items-start">
        {/* ── Left — video / image ── */}
        {recipe.type === "video" && recipe.video ? (
          <VideoPlayer src={recipe.video} />
        ) : (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={recipe.img}
              alt={recipe.title}
              className="w-full h-full object-cover block"
            />
          </div>
        )}

        {/* ── Right — info + likes + comments ── */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col gap-4">
          {/* Title */}
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-teal-600 mb-1.5">
              {recipe.category}
            </p>
            <h2 className="text-syne text-[20px] font-bold text-stone-900 leading-tight mb-2">
              {recipe.title}
            </h2>
            <p className="text-[12px] text-stone-400 leading-relaxed">
              {recipe.desc}
            </p>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] font-semibold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-lg">
              ⏱ {recipe.time}
            </span>
            <span className="text-[11px] font-semibold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-lg">
              {recipe.type === "video" ? "▶ Video" : "📄 Text"}
            </span>
          </div>

          {/* Like / Dislike */}
          <div className="flex gap-2">
            <button
              onClick={toggleLike}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                          border-[1.5px] text-[13px] font-bold transition-all
                ${
                  liked
                    ? "bg-teal-50 border-teal-400 text-teal-600"
                    : "bg-white border-stone-200 text-stone-500 hover:border-teal-400 hover:text-teal-600"
                }`}
            >
              <Heart
                size={15}
                fill={liked ? "#e8420a" : "none"}
                stroke={liked ? "#e8420a" : "currentColor"}
              />
              {fmt((recipe.likes ?? 0) + (liked ? 1 : 0))}
            </button>

            <button
              onClick={toggleDislike}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                          border-[1.5px] text-[13px] font-bold transition-all
                ${
                  disliked
                    ? "bg-blue-50 border-blue-400 text-blue-600"
                    : "bg-white border-stone-200 text-stone-500 hover:border-blue-400 hover:text-blue-500"
                }`}
            >
              <ThumbsDown
                size={15}
                fill={disliked ? "#3a3aaa" : "none"}
                stroke={disliked ? "#3a3aaa" : "currentColor"}
              />
              {fmt((recipe.dislikes ?? 0) + (disliked ? 1 : 0))}
            </button>
          </div>

          <div className="h-px bg-stone-100" />

          {/* Comments */}
          <div>
            <p className="text-[13px] font-bold text-stone-900 mb-3">
              Comments ({comments.length})
            </p>

            {comments.length === 0 ? (
              <p className="text-[12px] text-stone-400 italic mb-3">
                No comments yet. Be the first!
              </p>
            ) : // <div
            //   className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-1 mb-3
            //                 scrollbar-thin scrollbar-thumb-stone-200"
            // >
            //   {recipe.comments.map((c, i) => (
            //     <div key={i} className="flex gap-2.5">
            //       <div
            //         className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center
            //                       text-[10px] font-bold text-stone-500 shrink-0"
            //       >
            //         {c.i ||
            //           c.u
            //             .split(" ")
            //             .map((w) => w[0])
            //             .join("")
            //             .slice(0, 2)}
            //       </div>
            //       <div>
            //         <p className="text-[11px] font-bold text-stone-800">
            //           {c.u}
            //         </p>
            //         <p className="text-[11px] text-stone-500 leading-relaxed">
            //           {c.t}
            //         </p>
            //         <p className="text-[10px] text-stone-300 mt-0.5">{c.d}</p>
            //       </div>
            //     </div>
            //   ))}
            // </div>
            null}

            {/* Comment input */}
            <div className="flex gap-2 pt-3 border-t border-stone-100">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && postComment()}
                placeholder="Add a comment…"
                className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-[12px]
                           text-stone-800 outline-none focus:border-teal-400 transition-all
                           placeholder:text-stone-400"
              />
              <button
                onClick={postComment}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-600 text-white text-[12px]
                           font-bold rounded-xl transition-all active:scale-[.97]"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const Dashboard = () => {
  const influencerData = localStorage.getItem("influencer");
  const Influencer =
    influencerData && influencerData !== "undefined"
      ? JSON.parse(influencerData)
      : null;
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setError(null);
        const response = await axios.get(apiUrl("/api/recipes/my-uploads"), {
          headers: authHeaders(),
        });
        if (response.data?.success) {
          setRecipes(response.data.recipes);
        } else {
          setError(response.data?.message || "Failed to load recipes");
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load recipes",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();

    const handleRefresh = () => {
      fetchRecipes();
    };

    window.addEventListener("herb-recipes-refresh", handleRefresh);
    return () =>
      window.removeEventListener("herb-recipes-refresh", handleRefresh);
  }, []);

  const filtered =
    filter === "all" ? recipes : recipes.filter((r) => r.type === filter);
  // Delete handler — removes from local state and goes back to grid
const handleDelete = async (recipeId) => {
  const token = localStorage.getItem("influencerToken");

  try {
    const response = await axios.delete(
      "mongodb+srv://alkeshmahamune12_db_user:tjn24OLaUtx8MsTN@cluster0.sm10gkk.mongodb.net/?appName=Cluster0/api/recipes/delete-recipe",
      {
        data: { recipeId }, // ✅ body goes inside "data" for DELETE
        headers: {
          Authorization: `Bearer ${token}`, // ✅ correct token format
        },
      }
    );

    console.log(response.data);
    setSelected(null);
    setRecipes((prev) => prev.filter(r => r._id !== recipeId));
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        .text-syne { font-family: 'Syne', 'DM Sans', sans-serif; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
        {selected !== null ? (
          <RecipeDetail
            recipe={selected}
            onBack={() => setSelected(null)}
            onDelete={handleDelete}
          />
        ) : (
          <>
            {/* ── Top bar ── */}
            <div
              className="flex items-center justify-between mb-7 flex-wrap gap-3"
              style={{ animation: "fadeUp .4s ease both" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl bg-teal-600 flex items-center justify-center
                                text-syne text-[17px] font-bold text-white shrink-0"
                >
                  AK
                </div>
                <div>
                  <p className="text-syne text-[19px] font-bold text-stone-900 leading-tight">
                    {Influencer?.fullName}
                  </p>
                  <p className="text-[12px] text-stone-400">
                    @{Influencer?.fullName} · Recipe Creator
                  </p>
                </div>
              </div>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold
                               bg-green-50 border border-green-200 text-green-600 px-3 py-1.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />{" "}
                Active
              </span>
            </div>

            {/* ── Stats ── */}
            <div className="flex flex-wrap gap-2.5 mb-7">
              {[
                {
                  icon: Users,
                  iconColor: "#e8420a",
                  iconBg: "#fdf2ef",
                  label: "Followers",
                  value: `${Influencer?.followers || 0}`,
                  delay: 0.05,
                },
                {
                  icon: Play,
                  iconColor: "#3a8aaa",
                  iconBg: "#eff5fd",
                  label: "Recipes",
                  value: `${recipes.length}`,
                  delay: 0.1,
                },
                {
                  icon: Heart,
                  iconColor: "#e8420a",
                  iconBg: "#fdf2ef",
                  label: "Total Likes",
                  value: `${Influencer?.likes || 0}`,
                  delay: 0.15,
                },
                {
                  icon: MessageCircle,
                  iconColor: "#4a9a6a",
                  iconBg: "#edfae8",
                  label: "Comments",
                  value: `${Influencer?.comments || 0}`,
                  delay: 0.2,
                },
              ].map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            {/* ── Section header ── */}
            <div
              className="flex items-center justify-between mb-4 flex-wrap gap-2"
              style={{
                animation: "fadeUp .4s .22s ease both",
                opacity: 0,
                animationFillMode: "both",
              }}
            >
              <h2 className="text-syne text-[17px] font-bold text-stone-900">
                Your Recipes
              </h2>
              <div className="flex gap-1.5">
                {[
                  { key: "all", label: "All" },
                  { key: "video", label: "Video" },
                  { key: "text", label: "Text" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-3.5 py-1.5 rounded-full border text-[11px] font-semibold transition-all
                      ${
                        filter === f.key
                          ? "bg-teal-600 border-teal-600 text-white"
                          : "bg-white border-stone-200 text-stone-500 hover:border-teal-400 hover:text-teal-600"
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Grid ── */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                <p className="text-[14px] font-medium text-stone-600">
                  Loading recipes...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                <p className="text-[14px] font-medium text-red-600">
                  Error: {error}
                </p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                <p className="text-4xl mb-3">🍽️</p>
                <p className="text-[14px] font-medium text-stone-600">
                  No recipes here yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filtered.map((recipe, i) => (
                  <RecipeCard
                    key={recipe.id ?? i}
                    recipe={recipe}
                    index={i}
                    onClick={() => setSelected(recipe)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
