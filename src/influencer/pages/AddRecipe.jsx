import { PlusCircle, Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddRecipe = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit } = useForm();
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // step 2
  const [rows, setRows] = useState([
    { ingrediants: "", quantity: "", unit: "", prodLink: "" },
  ]);
  const addRow = () => {
    setRows([
      ...rows,
      { ingrediants: "", quantity: "", unit: "", prodLink: "" },
    ]);
  };
  const handleChange = (index, field, value) => {
    const updateRows = [...rows];
    updateRows[index][field] = value;
    setRows(updateRows);
  };

  // use id here instead of idx
  const removeItem = (idx) => {
    const updatedRows = rows.filter((_, index) => index !== idx);
    setRows(updatedRows);
  };
  // final step
  const onSubmit = (data) => {
    console.log(data);
  };
  const [mediaType, setMediaType] = useState("private"); // default to 'private'

  const handleRadioChange = (e) => {
    setMediaType(e.target.value);
  };
  const[vdo,setVdo]=useState(null)
  const handleVdoChange=(e)=>{
    setVdo(e.target.files[0])
  }
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Post Recipe</h2>
      <div className="w-full bg-white p-6 rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-start gap-10 flex-wrap"
        >
          {step === 1 && (
            <>
              <div className="w-full">
                <h6 className="font-semibold">Basic Recipe Information</h6>
              </div>
              <input
                type="text"
                {...register("recipeTitle")}
                placeholder="Recipe Title"
                className="w-1/5 p-2 border border-gray-400 rounded-md outline-0 hover:border-gray-500"
              />
              <select className="w-1/5 p-2 border border-gray-400 rounded-md outline-0">
                <option value="Select Level" disabled selected>
                  Select Level
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select className="w-1/5 p-2 border border-gray-400 rounded-md outline-0">
                <option value="Select Level" disabled selected>
                  Select Category
                </option>
                <option value="asian" className="capitalize">
                  Asian
                </option>
                <option value="continental" className="capitalize">
                  Continental
                </option>
                <option value="indian" className="capitalize">
                  indian
                </option>
                <option value="korean" className="capitalize">
                  korean
                </option>
                <option value="japanese" className="capitalize">
                  japanese
                </option>
                <option value="chinese" className="capitalize">
                  korean
                </option>
              </select>
              <input
                type="text"
                {...register("product")}
                placeholder="Product Link"
                className="w-1/5 p-2 border border-gray-400 rounded-md outline-0 hover:border-gray-500"
              />
              <textarea
                className="w-1/5 h-40 text-sm p-2 rounded-md border border-gray-400 hover:border-gray-500"
                placeholder="Description of the recipe"
                {...register("description")}
              ></textarea>
              <div className="w-1/5 h-40 flex flex-col gap-1">
                <label>Preparation Time</label>
                <input
                  type="time"
                  className="w-full border border-gray-400 hover:border-gray-500 px-1 py-2 rounded-md"
                  {...register("prepTime")}
                />
              </div>
              <div className="w-1/5 h-40 flex flex-col gap-1">
                <label>Cooking Time</label>
                <input
                  type="time"
                  className="w-full border border-gray-400 hover:border-gray-500 px-1 py-2 rounded-md"
                  {...register("prepTime")}
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="mt-4 cursor-pointer bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="w-full">
                <h6 className="font-semibold">Ingrediants Section</h6>
              </div>
              <table className="w-full border">
                <thead>
                  <tr>
                    <td>Sr.</td>
                    <td>Ingrediant Name</td>
                    <td>Quantity</td>
                    <td>Unit</td>
                    <td>Product Link</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((ele, idx) => (
                    <tr key={idx}>
                      <td className="w-1/25">{idx + 1}</td>

                      <td className="w-1/3">
                        <input
                          type="text"
                          className="w-full outline-0"
                          value={ele.ingrediants}
                          onChange={(e) =>
                            handleChange(idx, "ingrediants", e.target.value)
                          }
                        />
                      </td>

                      <td className="border p-2 w-1/10">
                        <input
                          type="text"
                          value={ele.quantity}
                          onChange={(e) =>
                            handleChange(idx, "quantity", e.target.value)
                          }
                          className="w-full outline-none"
                        />
                      </td>

                      <td className="border p-2 w-1/10">
                        <input
                          type="text"
                          value={ele.unit}
                          onChange={(e) =>
                            handleChange(idx, "unit", e.target.value)
                          }
                          className="w-full outline-none"
                        />
                      </td>

                      <td className="border p-2">
                        <input
                          type="text"
                          value={ele.prodLink}
                          onChange={(e) =>
                            handleChange(idx, "prodLink", e.target.value)
                          }
                          className="w-full outline-none"
                        />
                      </td>

                      <td className="w-1/25">
                        <Trash
                          className="cursor-pointer"
                          onClick={() => removeItem(idx)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex justify-end">
                <button
                  className="flex bg-orange-500 text-white text-sm items-center gap-2 border border-orange-500 p-3 rounded-md cursor-pointer"
                  onClick={addRow}
                >
                  {" "}
                  <PlusCircle size={18} /> Add Ingrediant
                </button>
              </div>
              <div className="w-full flex justify-between">
                <button
                  className="px-4 py-2 cursor-pointer font-semibold border rounded-md border-gray-500"
                  onClick={prevStep}
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="mt-4 cursor-pointer bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="w-full">
                <h6 className="font-semibold">Cooking Instructions</h6>
              </div>
              <div className="w-full">
                <textarea
                  className="w-1/2 h-40 text-sm p-2 rounded-md border border-gray-400 hover:border-gray-500"
                  placeholder="Describe steps of recipe"
                ></textarea>
              </div>
              <div className="w-full">
                <h6 className="font-semibold">Nutritional Information</h6>
              </div>
              <div className="w-full flex flex-wrap gap-5">
                <input
                  type="text"
                  {...register("calories")}
                  placeholder="Calories"
                  className="w-1/5 p-2 border border-gray-400 rounded-md outline-0 hover:border-gray-500"
                />
                <input
                  type="text"
                  {...register("protein")}
                  placeholder="Protein"
                  className="w-1/5 p-2 border border-gray-400 rounded-md outline-0 hover:border-gray-500"
                />
                <input
                  type="text"
                  {...register("carbohydrates")}
                  placeholder="Carbohydrates"
                  className="w-1/5 p-2 border border-gray-400 rounded-md outline-0 hover:border-gray-500"
                />
                <input
                  type="text"
                  {...register("fat")}
                  placeholder="Fat"
                  className="w-1/5 p-2 border border-gray-400 rounded-md outline-0 hover:border-gray-500"
                />
              </div>
              <div className="w-full">
                <h6 className="font-semibold">Media Upload</h6>
              </div>
              <div className="w-full flex gap-5">
                <label className="mb-2">
                  <input
                    type="radio"
                    name="media"
                    value="private"
                    checked={mediaType === "private"} // 2. Check if this is the selected one
                    onChange={handleRadioChange} // 3. Update state on change
                    className="mr-2 w-4 h-4 accent-orange-500"
                  />
                  Private
                </label>

                <label>
                  <input
                    type="radio"
                    name="media"
                    value="public"
                    checked={mediaType === "public"} // 2. Check if this is the selected one
                    onChange={handleRadioChange} // 3. Update state on change
                    className="mr-2 w-4 h-4 accent-orange-500"
                  />
                  Public
                </label>
                <input type="file"  className="border border-gray-400 px-2 py-2 rounded-md" accept="video/*" onChange={handleVdoChange}/>
                </div>
                <div className="w-full">
                  {vdo && (
  <video width="300" controls>
    <source src={URL.createObjectURL(vdo)} />
  </video>
)}
              </div>
              <div className="w-full flex justify-between">
                <button
                  className="px-4 py-2 cursor-pointer font-semibold border rounded-md border-gray-500"
                  onClick={prevStep}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="mt-4 cursor-pointer bg-green-500 text-white px-4 py-2 rounded"
                >
                  Post
                </button>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
