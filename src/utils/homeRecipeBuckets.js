/**
 * Map API recipe card (from GET /api/recipes/public) → DishCard / VideoView shape.
 */
export function apiRecipeToDish(rec) {
  const uploader = rec.uploader || {};
  const channel =
    typeof uploader === "object" && uploader.fullName
      ? uploader.fullName
      : "Creator";
  return {
    name: rec.title,
    cat: rec.category || rec.recipeCategory || "Recipe",
    img: rec.img,
    channel,
    subs: "",
    views: "",
    likes: rec.likes ?? 0,
    dislikes: rec.dislikes ?? 0,
    video: rec.video || "",
    recipeId: rec.id,
    liked: !!rec.liked,
    disliked: !!rec.disliked,
    saved: !!rec.saved,
    _api: true,
  };
}

/**
 * Place each recipe into meal category (Breakfast, Lunch, …) or cuisine (Indian, …)
 * by matching `rec.category` (case-insensitive) to static `catData` / `cuisineData` headings.
 * Unmatched recipes still appear in `allDishes` for the home grid only.
 */
export function bucketRecipes(recipes, catData, cuisineData) {
  const byMeal = Object.fromEntries(catData.map((c) => [c.id, []]));
  const byCuisine = Object.fromEntries(cuisineData.map((c) => [c.id, []]));
  const allDishes = (recipes || []).map(apiRecipeToDish);

  (recipes || []).forEach((rec, i) => {
    const dish = allDishes[i];
    const label = (rec.category || "").trim().toLowerCase();
    if (!label) return;

    for (const c of catData) {
      if (c.heading.toLowerCase() === label) {
        byMeal[c.id].push(dish);
        return;
      }
    }
    for (const c of cuisineData) {
      if (c.heading.toLowerCase() === label) {
        byCuisine[c.id].push(dish);
        return;
      }
    }
  });

  return { byMeal, byCuisine, allDishes };
}
