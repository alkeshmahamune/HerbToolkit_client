import React from "react";
import RecipeCards from "./RecipeCards";
import { recipesUploaded } from "../recipeData";

const ExploreRecipe = () => {
  return (
    <div>
      <div className="w-full">
        <h6 className="font-semibold">Explore Recipes</h6>
      </div>
      <div className="w-full">
        <RecipeCards />
      </div>
    </div>
  );
};

export default ExploreRecipe;
