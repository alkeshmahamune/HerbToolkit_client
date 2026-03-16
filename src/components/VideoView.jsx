import React, { useState } from "react";
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2, Bookmark } from "lucide-react";
import { VideoPlayer } from "../components/videoPlayer";
import { seedComments } from "../data/userData";

const fmt = (n) => {
  if (typeof n === "string") return n;
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + "K";
  return n;
};

const initials = (name) => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

export const VideoView = ({ dish, onBack }) => {
  const [liked,       setLiked]       = useState(false);
  const [subscribed,  setSubscribed]  = useState(false);
  const [commentText, setCommentText] = useState("");
  const [userComments,setUserComments]= useState([]);
  const [cLikes,      setCLikes]      = useState({});

  const allComments = [...seedComments, ...userComments];

  const postComment = () => {
    if (!commentText.trim()) return;
    setUserComments(prev => [
      { user:"You", init:"YO", bg:"#e1f5ee", tc:"#0f6e56", text:commentText.trim(), time:"just now", likes:0 },
      ...prev,
    ]);
    setCommentText("");
  };

  const toggleCLike = (i) => setCLikes(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="animate-[fadeUp_0.4s_ease_both]">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 mb-5 hover:bg-stone-100 transition"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <VideoPlayer src={dish.video} />

      {/* Title & meta */}
      <h1 className="font-serif text-2xl font-semibold text-gray-900 mt-4 mb-1 leading-snug">
        {dish.name} — Authentic Recipe
      </h1>
      <p className="text-sm text-gray-400 mb-4">{fmt(dish.views)} views &nbsp;·&nbsp; 3 days ago</p>

      {/* Channel row */}
      <div className="flex items-center justify-between py-3 border-y border-stone-100 mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-sm shrink-0">
            {initials(dish.channel)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{dish.channel}</p>
            <p className="text-xs text-gray-400">{dish.subs} subscribers</p>
          </div>
        </div>
        <button
          onClick={() => setSubscribed(s => !s)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${subscribed ? "bg-stone-200 text-stone-600" : "bg-orange-600 hover:bg-orange-700 text-white"}`}
        >
          {subscribed ? "✓ Subscribed" : "Subscribe"}
        </button>
      </div>

      {/* Action pills */}
      <div className="flex gap-2 flex-wrap mb-4">
        {[
          { icon: <ThumbsUp size={14}/>, label: fmt(dish.likes + (liked ? 1 : 0)), action: () => setLiked(l => !l), active: liked },
          { icon: <ThumbsDown size={14}/>, label: "Dislike",  action: () => {} },
          { icon: <Share2 size={14}/>,    label: "Share",     action: () => {} },
          { icon: <Bookmark size={14}/>,  label: "Save",      action: () => {} },
        ].map(({ icon, label, action, active }) => (
          <button
            key={label}
            onClick={action}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm transition-all
              ${active ? "bg-orange-50 border-orange-300 text-orange-600" : "bg-stone-50 border-stone-200 text-gray-700 hover:bg-stone-100"}`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      <hr className="border-stone-100 mb-4" />

      {/* Comments */}
      <p className="text-base font-medium text-gray-800 mb-4">{allComments.length} Comments</p>

      {/* Comment input */}
      <div className="flex gap-3 mb-6 items-start">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-semibold shrink-0">YO</div>
        <div className="flex-1">
          <textarea
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            rows={2}
            className="w-full border border-stone-200 focus:border-orange-400 rounded-xl px-3 py-2 text-sm text-gray-800 resize-none outline-none transition bg-white"
          />
          <div className="flex justify-end mt-1.5">
            <button
              onClick={postComment}
              className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-full transition"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Comment list */}
      <div className="flex flex-col gap-4 pb-10">
        {allComments.map((c, i) => (
          <div key={i} className="flex gap-3" style={{ animation: `fadeUp 0.4s ${i * 0.04}s ease both`, opacity: 0, animationFillMode: "both" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                 style={{ background: c.bg, color: c.tc }}>
              {c.init}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {c.user} <span className="text-xs font-normal text-gray-400 ml-1">{c.time}</span>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{c.text}</p>
              <button
                onClick={() => toggleCLike(i)}
                className={`mt-1.5 inline-flex items-center gap-1 text-xs transition-colors ${cLikes[i] ? "text-orange-500" : "text-gray-400 hover:text-orange-400"}`}
              >
                <ThumbsUp size={11} fill={cLikes[i] ? "currentColor" : "none"} />
                {(c.likes || 0) + (cLikes[i] ? 1 : 0)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};