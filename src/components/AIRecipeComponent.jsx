import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, ClipboardList, Plus, X, ChefHat } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

// message shape: { id, role: "ai"|"user", text, time, suggestions?, recipeCard? }
// recipeCard shape: { title, desc, time, serves, difficulty }

// ─── Helpers ──────────────────────────────────────────────────────────────────

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const SUGGESTIONS = [
  "Quick dinner ideas",
  "Vegetarian recipes",
  "Recipes under 30 min",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const AiAvatar = () => (
  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center shrink-0">
    <ChefHat size={15} className="text-white" />
  </div>
);

const UserAvatar = () => (
  <div className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center shrink-0 text-white text-[12px] font-semibold">
    A
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-end gap-2 animate-[fadeUp_.25s_ease_both]">
    <AiAvatar />
    <div className="bg-stone-100 border border-stone-200 rounded-[18px_18px_18px_4px] px-4 py-3 flex gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-[pulse_1.2s_infinite]"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  </div>
);

const RecipeCard = ({ card }) => (
  <div className="mt-2 bg-white border border-stone-200 rounded-xl p-3">
    <p className="text-[13px] font-semibold text-stone-800 mb-1">{card.title}</p>
    <p className="text-[12px] text-stone-500 mb-2 leading-relaxed">{card.desc}</p>
    <div className="flex gap-3 text-[11px] text-stone-500 flex-wrap">
      <span>⏱ {card.time}</span>
      <span>👥 {card.serves}</span>
      <span>📊 {card.difficulty}</span>
    </div>
  </div>
);

const SuggestionPills = ({ items, onSelect }) => (
  <div className="flex flex-wrap gap-1.5 mt-2.5">
    {items.map((s) => (
      <button
        key={s}
        onClick={() => onSelect(s)}
        className="text-[11px] px-3 py-1 border border-stone-200 rounded-full bg-white
                   text-stone-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50
                   transition-all duration-150 whitespace-nowrap"
      >
        {s}
      </button>
    ))}
  </div>
);

const AiBubble = ({ msg, onSuggestion }) => (
  <div
    className="flex items-end gap-2 animate-[fadeUp_.3s_ease_both]"
    style={{ animationFillMode: "both" }}
  >
    <AiAvatar />
    <div className="flex flex-col max-w-[72%]">
      <div className="bg-stone-100 border border-stone-200 rounded-[18px_18px_18px_4px] px-4 py-2.5">
        <p className="text-[13px] text-stone-800 leading-relaxed">{msg.text}</p>
        {msg.recipeCard && <RecipeCard card={msg.recipeCard} />}
        {msg.suggestions && (
          <SuggestionPills items={msg.suggestions} onSelect={onSuggestion} />
        )}
      </div>
      <span className="text-[10px] text-stone-400 mt-1 ml-1">{msg.time}</span>
    </div>
  </div>
);

const UserBubble = ({ msg }) => (
  <div
    className="flex items-end gap-2 justify-end animate-[fadeUp_.3s_ease_both]"
    style={{ animationFillMode: "both" }}
  >
    <div className="flex flex-col items-end max-w-[72%]">
      <div className="bg-orange-600 rounded-[18px_18px_4px_18px] px-4 py-2.5">
        <p className="text-[13px] text-white leading-relaxed">{msg.text}</p>
        {msg.ingredients?.length > 0 && (
          <p className="text-[11px] text-orange-200 mt-1">
            🧄 With: {msg.ingredients.join(", ")}
          </p>
        )}
      </div>
      <span className="text-[10px] text-stone-400 mt-1 mr-1">{msg.time}</span>
    </div>
    <UserAvatar />
  </div>
);

const IngredientChip = ({ name, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-[11px] font-medium px-2.5 py-1 rounded-full border border-amber-100">
    {name}
    <button
      onClick={onRemove}
      className="text-amber-600 hover:text-amber-900 transition-colors leading-none"
    >
      <X size={10} />
    </button>
  </span>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AIRecipeComponent = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "Hello! I'm Chef AI — your personal recipe assistant. Tell me what you'd like to cook, or share ingredients you have on hand.",
      time: now(),
      suggestions: ["Quick dinner ideas", "Vegetarian recipes", "Under 30 min"],
    },
  ]);
  const [input,        setInput]        = useState("");
  const [isTyping,     setIsTyping]     = useState(false);
  const [showIngPanel, setShowIngPanel] = useState(false);
  const [ingredients,  setIngredients]  = useState([]);
  const [ingInput,     setIngInput]     = useState("");

  const messagesEndRef = useRef(null);
  const textareaRef    = useRef(null);
  const ingInputRef    = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-resize textarea
  const handleTextareaInput = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
    setInput(el.value);
  };

  // ── Ingredient handlers ──────────────────────────────────────────────────

  const handleIngKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && ingInput.trim()) {
      e.preventDefault();
      const val = ingInput.trim().replace(/,$/, "");
      if (val && !ingredients.includes(val)) {
        setIngredients((prev) => [...prev, val]);
      }
      setIngInput("");
    }
  };

  const removeIngredient = (idx) =>
    setIngredients((prev) => prev.filter((_, i) => i !== idx));

  // ── Send message ──────────────────────────────────────────────────────────

  const sendMessage = (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg = {
      id:          Date.now(),
      role:        "user",
      text:        trimmed,
      time:        now(),
      ingredients: [...ingredients],
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg = {
        id:   Date.now() + 1,
        role: "ai",
        time: now(),
        text: ingredients.length > 0
          ? `Great! Using ${ingredients.join(", ")}, I'd recommend trying a quick stir-fry or a hearty soup. Here's a recipe that works perfectly:`
          : "Here's a recipe suggestion based on your request! Feel free to ask for variations or a full step-by-step guide.",
        recipeCard: {
          title:      "Chicken Shakshuka",
          desc:       "A rich tomato-based dish with tender chicken, perfect for any meal of the day.",
          time:       "35 min",
          serves:     "4 people",
          difficulty: "Easy",
        },
        suggestions: ["Show full steps", "Make it spicier", "Suggest another"],
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
        .messages-area::-webkit-scrollbar       { width: 4px; }
        .messages-area::-webkit-scrollbar-track { background: transparent; }
        .messages-area::-webkit-scrollbar-thumb { background: #e7e5e0; border-radius: 99px; }
      `}</style>

      <div className="w-full max-w-2xl mx-auto">

        {/* ── Section heading ── */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-600 rounded-xl flex items-center justify-center">
            <ChefHat size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-stone-800 font-serif leading-tight">
              AI Recipe Suggestion
            </h2>
            <p className="text-[11px] text-stone-400">Powered by Chef AI</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Online
          </span>
        </div>

        {/* ── Chat shell ── */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col"
             style={{ height: "520px" }}>

          {/* ── Messages ── */}
          <div className="messages-area flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
            {messages.map((msg) =>
              msg.role === "ai"
                ? <AiBubble key={msg.id} msg={msg} onSuggestion={(s) => { setInput(s); sendMessage(s); }} />
                : <UserBubble key={msg.id} msg={msg} />
            )}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Ingredient panel ── */}
          {showIngPanel && (
            <div className="mx-4 mb-3 p-3 bg-stone-50 border border-stone-200 rounded-xl animate-[fadeUp_.2s_ease_both]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                  Ingredients
                </p>
                <span className="text-[10px] text-stone-400">
                  Press Enter to add
                </span>
              </div>

              {/* Chips */}
              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {ingredients.map((ing, i) => (
                    <IngredientChip
                      key={i}
                      name={ing}
                      onRemove={() => removeIngredient(i)}
                    />
                  ))}
                </div>
              )}

              {/* Ingredient input */}
              <input
                ref={ingInputRef}
                value={ingInput}
                onChange={(e) => setIngInput(e.target.value)}
                onKeyDown={handleIngKeyDown}
                placeholder="e.g. Chicken, Tomatoes, Garlic…"
                className="w-full text-[13px] text-stone-800 bg-white border border-stone-200 rounded-xl
                           px-3 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-50
                           transition-all"
              />
            </div>
          )}

          {/* ── Input area ── */}
          <div className="px-4 pb-4 shrink-0">
            <div className="flex items-end gap-2">

              {/* Ingredient toggle */}
              <button
                onClick={() => {
                  setShowIngPanel((v) => !v);
                  if (!showIngPanel) setTimeout(() => ingInputRef.current?.focus(), 100);
                }}
                title="Add ingredients"
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0
                            transition-all duration-150
                            ${showIngPanel
                              ? "bg-orange-50 border-orange-300 text-orange-600"
                              : "border-stone-200 text-stone-500 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"}`}
              >
                <ClipboardList size={16} />
              </button>

              {/* Textarea */}
              <div
                className={`flex-1 flex items-end gap-2 border rounded-xl px-3 py-2 bg-white transition-all
                            ${input.trim() ? "border-orange-400 ring-2 ring-orange-50" : "border-stone-200"}`}
              >
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="Ask Chef AI anything…"
                  onInput={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  className="flex-1 resize-none text-[13px] text-stone-800 outline-none bg-transparent
                             leading-relaxed max-h-30 overflow-y-auto placeholder:text-stone-400"
                />
                {/* Send button inside box */}
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all
                              ${input.trim() && !isTyping
                                ? "bg-orange-600 hover:bg-orange-700 active:scale-95"
                                : "bg-stone-100 cursor-not-allowed"}`}
                >
                  <Send
                    size={13}
                    className={input.trim() && !isTyping ? "text-white" : "text-stone-400"}
                  />
                </button>
              </div>
            </div>

            {/* Hint row */}
            <div className="flex items-center justify-between mt-2 px-1">
              <p className="text-[10px] text-stone-400">
                Press <kbd className="font-mono bg-stone-100 px-1 rounded text-[10px]">Enter</kbd> to send
                &nbsp;·&nbsp;
                <kbd className="font-mono bg-stone-100 px-1 rounded text-[10px]">Shift+Enter</kbd> for new line
              </p>
              {ingredients.length > 0 && (
                <span className="text-[10px] text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">
                  {ingredients.length} ingredient{ingredients.length > 1 ? "s" : ""} added
                </span>
              )}
            </div>
          </div>

        </div>

        {/* ── Quick suggestion pills below the box ── */}
        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { setInput(s); sendMessage(s); }}
              className="text-[12px] px-3 py-1.5 border border-stone-200 rounded-full text-stone-600
                         hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 bg-white
                         transition-all duration-150"
            >
              {s}
            </button>
          ))}
        </div>

      </div>
    </>
  );
};

export default AIRecipeComponent;