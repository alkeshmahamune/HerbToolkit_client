/**
 * Map API recipe card (from GET /api/recipes/public) → DishCard / VideoView shape.
 */
export function apiRecipeToDish(rec) {
  const uploader = rec.uploader || {};
  const channel =
    typeof uploader === "object" && uploader.fullName
      ? uploader.fullName
      : "Creator";
  
  // Ensure arrays have defaults
  const ingredientList = Array.isArray(rec.ingredientList) ? rec.ingredientList : [];
  const steps = Array.isArray(rec.steps) ? rec.steps : [];
  const herbs = Array.isArray(rec.herbs) ? rec.herbs : [];
  const tags = Array.isArray(rec.tags) ? rec.tags : [];
  
  return {
    // Basic info
    name: rec.title || "Untitled Recipe",
    cat: rec.category || rec.recipeCategory || "Recipe",
    img: rec.thumbnail || rec.imageUrl || rec.img,
    channel,
    subs: "",
    views: "",
    
    // Engagement
    likes: rec.likes ?? 0,
    dislikes: rec.dislikes ?? 0,
    liked: !!rec.liked,
    disliked: !!rec.disliked,
    saved: !!rec.saved,
    
    // Recipe details
    recipeId: rec.id || rec._id,
    recipeType: rec.recipeType,
    recipeCategory: rec.recipeCategory,
    description: rec.description || "",
    level: rec.level,
    benefit: rec.benefit || "",
    prepTime: rec.prepTime || "",
    cookTime: rec.cookTime || "",
    productLink: rec.productLink || "",
    
    // Lists
    ingredientList: ingredientList,
    steps: steps,
    herbs: herbs,
    tags: tags,
    
    // Nutrition & Usage
    nutrition: rec.nutrition || {},
    usageInfo: rec.usageInfo || {},
    ratings: rec.ratings || 0,
    
    // Media
    video: rec.videoUrl || rec.video || "",
    videoUrl: rec.videoUrl || rec.video || "",
    thumbnail: rec.thumbnail,
    imageUrl: rec.imageUrl,
    
    // Verification
    verificationStatus: rec.verificationStatus,
    verifiedAt: rec.verifiedAt,
    reviewNote: rec.reviewNote || "",
    
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
