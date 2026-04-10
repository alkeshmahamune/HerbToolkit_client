import React, { useState, useRef, useEffect } from "react";
import { Send, ClipboardList, X, ChefHat } from "lucide-react";
import axios from "axios";

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
  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
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
    {card.image && (
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-28 object-cover rounded-lg mb-2"
      />
    )}
    <p className="text-[13px] font-semibold text-stone-800 mb-1">{card.title}</p>
    {card.desc && (
      <p className="text-[12px] text-stone-500 mb-2 leading-relaxed">{card.desc}</p>
    )}
    <div className="flex gap-3 text-[11px] text-stone-500 flex-wrap">
      {card.time  && <span>⏱ {card.time}</span>}
      {card.serves && <span>👥 {card.serves}</span>}
      {card.difficulty && <span>📊 {card.difficulty}</span>}
      {card.usedIngredients > 0 && (
        <span className="text-green-600">✅ Uses {card.usedIngredients} of your ingredients</span>
      )}
      {card.missedIngredients > 0 && (
        <span className="text-amber-600">🛒 Missing {card.missedIngredients} ingredients</span>
      )}
    </div>
    {card.sourceUrl && (
  <a
    href={card.sourceUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-2 text-[11px] text-teal-600 hover:underline"
  >
    View full recipe →
  </a>
)}
  </div>
);

const SuggestionPills = ({ items, onSelect }) => (
  <div className="flex flex-wrap gap-1.5 mt-2.5">
    {items.map((s) => (
      <button
        key={s}
        onClick={() => onSelect(s)}
        className="text-[11px] px-3 py-1 border border-stone-200 rounded-full bg-white
                   text-stone-600 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50
                   transition-all duration-150 whitespace-nowrap"
      >
        {s}
      </button>
    ))}
  </div>
);

const AiBubble = ({ msg, onSuggestion }) => (
  <div className="flex items-end gap-2 animate-[fadeUp_.3s_ease_both]">
    <AiAvatar />
    <div className="flex flex-col max-w-[80%]">
      <div className="bg-stone-100 border border-stone-200 rounded-[18px_18px_18px_4px] px-4 py-2.5">
        <p className="text-[13px] text-stone-800 leading-relaxed whitespace-pre-line">
          {msg.text}
        </p>
        {/* Multiple recipe cards */}
        {msg.recipeCards?.map((card, i) => (
          <RecipeCard key={i} card={card} />
        ))}
        {msg.suggestions && (
          <SuggestionPills items={msg.suggestions} onSelect={onSuggestion} />
        )}
      </div>
      <span className="text-[10px] text-stone-400 mt-1 ml-1">{msg.time}</span>
    </div>
  </div>
);

const UserBubble = ({ msg }) => (
  <div className="flex items-end gap-2 justify-end animate-[fadeUp_.3s_ease_both]">
    <div className="flex flex-col items-end max-w-[72%]">
      <div className="bg-teal-600 rounded-[18px_18px_4px_18px] px-4 py-2.5">
        <p className="text-[13px] text-white leading-relaxed">{msg.text}</p>
        {msg.ingredients?.length > 0 && (
          <p className="text-[11px] text-teal-200 mt-1">
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
    <button onClick={onRemove} className="text-amber-600 hover:text-amber-900 transition-colors">
      <X size={10} />
    </button>
  </span>
);

// ─── API call ─────────────────────────────────────────────────────────────────

// ✅ Maps Spoonacular findByIngredients response → RecipeCard shape
const mapIngredientRecipe = (r) => ({
  title:            r.title,
  image:            r.image,
  usedIngredients:  r.usedIngredientCount,
  missedIngredients: r.missedIngredientCount,
  sourceUrl:        `https://spoonacular.com/recipes/${r.title.replace(/\s+/g, "-").toLowerCase()}-${r.id}`,
});

// ✅ Maps Spoonacular complexSearch response → RecipeCard shape
const mapQueryRecipe = (r) => ({
  title:      r.title,
  image:      r.image,
  time:       r.readyInMinutes ? `${r.readyInMinutes} min` : null,
  serves:     r.servings ? `${r.servings} people` : null,
  difficulty: null,
  sourceUrl:  r.sourceUrl,
});

const fetchRecipes = async (ingredients, query) => {
  const params = ingredients.length > 0
    ? { ingredients: ingredients.join(",") }
    : { query };

  const res = await axios.get("/api/recipes/suggest", { params });

  if (!res.data.success) throw new Error("API error");

  return ingredients.length > 0
    ? res.data.recipes.map(mapIngredientRecipe)
    : res.data.recipes.map(mapQueryRecipe);
};

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleTextareaInput = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
    setInput(el.value);
  };

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

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    // 1. Add user message
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
    console.log(userMsg)
    // 2. Hit real API
    try {
      const cards = await fetchRecipes(ingredients, trimmed);
      const hasResults = cards.length > 0;

      const aiMsg = {
        id:   Date.now() + 1,
        role: "ai",
        time: now(),
        text: hasResults
          ? ingredients.length > 0
            ? `Here are ${cards.length} recipes using your ingredients:`
            : `Here are some recipes for "${trimmed}":`
          : "Sorry, I couldn't find any recipes for that. Try different ingredients or a different query!",
        recipeCards: hasResults ? cards : [],
        suggestions: ["Show more ideas", "Vegetarian only", "Under 30 min"],
      };
      console.log(hasResults)

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // 3. Error message in chat
      setMessages((prev) => [
        ...prev,
        {
          id:   Date.now() + 1,
          role: "ai",
          time: now(),
          text: "⚠️ Sorry, something went wrong fetching recipes. Please try again in a moment.",
          suggestions: ["Try again", "Quick dinner ideas"],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
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
          <div className="w-8 h-8 bg-teal-600 rounded-xl flex items-center justify-center">
            <ChefHat size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-stone-800 leading-tight">
              AI Recipe Suggestion
            </h2>
            <p className="text-[11px] text-stone-400">Powered by Spoonacular</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Online
          </span>
        </div>

        {/* ── Chat shell ── */}
        <div
          className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col"
          style={{ height: "520px" }}
        >
          {/* ── Messages ── */}
          <div className="messages-area flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
            {messages.map((msg) =>
              msg.role === "ai" ? (
                <AiBubble
                  key={msg.id}
                  msg={msg}
                  onSuggestion={(s) => sendMessage(s)}
                />
              ) : (
                <UserBubble key={msg.id} msg={msg} />
              )
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
                <span className="text-[10px] text-stone-400">Press Enter to add</span>
              </div>
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
              <input
                ref={ingInputRef}
                value={ingInput}
                onChange={(e) => setIngInput(e.target.value)}
                onKeyDown={handleIngKeyDown}
                placeholder="e.g. Chicken, Tomatoes, Garlic…"
                className="w-full text-[13px] text-stone-800 bg-white border border-stone-200 rounded-xl
                           px-3 py-2 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50
                           transition-all"
              />
            </div>
          )}

          {/* ── Input area ── */}
          <div className="px-4 pb-4 shrink-0">
            <div className="flex items-end gap-2">
              <button
                onClick={() => {
                  setShowIngPanel((v) => !v);
                  if (!showIngPanel)
                    setTimeout(() => ingInputRef.current?.focus(), 100);
                }}
                title="Add ingredients"
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0
                            transition-all duration-150
                            ${showIngPanel
                              ? "bg-teal-50 border-teal-300 text-teal-600"
                              : "border-stone-200 text-stone-500 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50"}`}
              >
                <ClipboardList size={16} />
              </button>

              <div
                className={`flex-1 flex items-end gap-2 border rounded-xl px-3 py-2 bg-white transition-all
                            ${input.trim()
                              ? "border-teal-400 ring-2 ring-teal-50"
                              : "border-stone-200"}`}
              >
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder={
                    ingredients.length > 0
                      ? `Ask about your ${ingredients.length} ingredient${ingredients.length > 1 ? "s" : ""}…`
                      : "Ask Chef AI anything…"
                  }
                  onInput={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  className="flex-1 resize-none text-[13px] text-stone-800 outline-none bg-transparent
                             leading-relaxed max-h-30 overflow-y-auto placeholder:text-stone-400"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all
                              ${input.trim() && !isTyping
                                ? "bg-teal-600 hover:bg-teal-700 active:scale-95"
                                : "bg-stone-100 cursor-not-allowed"}`}
                >
                  <Send
                    size={13}
                    className={input.trim() && !isTyping ? "text-white" : "text-stone-400"}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 px-1">
              <p className="text-[10px] text-stone-400">
                Press{" "}
                <kbd className="font-mono bg-stone-100 px-1 rounded text-[10px]">Enter</kbd>{" "}
                to send &nbsp;·&nbsp;{" "}
                <kbd className="font-mono bg-stone-100 px-1 rounded text-[10px]">Shift+Enter</kbd>{" "}
                for new line
              </p>
              {ingredients.length > 0 && (
                <span className="text-[10px] text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                  {ingredients.length} ingredient{ingredients.length > 1 ? "s" : ""} added
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Quick suggestion pills ── */}
        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-[12px] px-3 py-1.5 border border-stone-200 rounded-full text-stone-600
                         hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 bg-white
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