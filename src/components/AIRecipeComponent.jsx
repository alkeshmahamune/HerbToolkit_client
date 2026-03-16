import { Bot, Cookie, List, Plus } from "lucide-react";
import React, { useState } from "react";

const AIRecipeComponent = () => {
  const [list, setList] = useState(false);
  const handleInput = (e) => {
  e.target.style.height = "auto";
  e.target.style.height = e.target.scrollHeight + "px";
};
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        AI Recipe Suggestion
      </h2>
      <div className="w-full h-125 flex flex-col justify-between">
        <div className="w-1/2 mx-auto overflow-hidden">
          <div className="w-full flex justify-start gap-2 items-end flex-wrap">
            <div className="w-8 h-8 flex justify-center items-center bg-gray-300 rounded-full">
              <Bot />
            </div>
            <div className="px-2 py-1 border border-gray-300 rounded-xl">
              <p>Hello! how can i help you</p>
            </div>
          </div>
          <div className="w-full flex justify-end gap-2 items-end flex-wrap">
            <div className="px-2 py-1 border border-gray-300 rounded-xl">
              <p>Hello! Can i get this</p>
            </div>
            <div className="w-8 h-8 flex justify-center items-center bg-gray-500 text-white rounded-full">
              A
            </div>
          </div>
        </div>
        <div className="w-1/2 h-auto  mx-auto overflow-hidden flex flex-col justify-end gap-3 items-end">
          <div className={`w-full ${list ? "flex" : "hidden"} justify-start`}>
            <span className="w-auto border flex border-gray-400 gap-2 items-center p-2 cursor-pointer rounded-xl">
              <List size={15} /> Ingredient List
            </span>
          </div>
          <div className="w-full px-2 flex items-center rounded-lg box-border border border-gray-400">
            <Plus
              className="cursor-pointer mr-2"
              onClick={() => setList(!list)}
            />

            <textarea
              rows={1}
              placeholder="Ask Recipe"
              onInput={handleInput}
              className="w-full resize-none px-2 py-3 outline-none max-h-40 overflow-y-auto"
            />
          </div>
          <button className="bg-orange-500 px-3 py-2 rounded-md text-white font-semibold cursor-pointer">Send</button>
        </div>
      </div>
    </div>
  );
};

export default AIRecipeComponent;
