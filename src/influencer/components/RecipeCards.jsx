import { Apple, ArrowLeft, Heart, UsersRound } from "lucide-react";
import React, { useState } from "react";

const RecipeCards = ({ recipesUploaded }) => {
  const [showRecipe, setShowRecipe] = useState(null);

  return (
    <>
      <div className={`${showRecipe !== null ? "hidden" : "flex flex-col"}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Explore</h2>
        <div className="w-full flex flex-wrap gap-10">
          {recipesUploaded.map((ele, index) => (
            <div
              className="w-1/4"
              key={index + 1}
              onClick={() => setShowRecipe(index)}
            >
              <div
                className="w-full h-40 flex cursor-pointer items-end bg-red-50 rounded-tr-xl rounded-tl-xl border overflow-hidden p-3"
                style={{
                  backgroundImage: `url(${ele.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="w-full flex  justify-between text-white text-sm">
                  <div className="flex gap-1 p-1 items-center rounded-xl bg-black/40">
                    <Heart size={15} />
                    {ele.likes}
                  </div>
                  <p className="p-2 bg-black/60 rounded-xl text-xs">
                    {ele.time}
                  </p>
                </div>
              </div>
              <div className="w-full leading-8 border border-t-0 rounded-bl-xl rounded-br-xl  text-sm p-3">
                <h1 className="font-semibold">{ele.name}</h1>
                <p className="w-1/3 py-1 text-center text-sm rounded-md bg-orange-300">
                  {ele.category}
                </p>
                <p>{ele.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showRecipe !== null && (
        <div className="w-full h-screen flex-col relative">
          <ArrowLeft
            className="cursor-pointer absolute left-5 top-5"
            onClick={() => setShowRecipe(null)}
          />
          <div className="w-full h-150 bg-red-300 rounded-md"></div>
        </div>
      )}
    </>
  );
};

export default RecipeCards;
