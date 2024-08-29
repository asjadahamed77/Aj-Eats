import React, { useState } from "react";
import sampleImage from "../assets/sample.png";

const AddFoods = () => {
  const [selectedImage, setSelectedImage] = useState(sampleImage);

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#f7f7f7] flex flex-col w-full p-[40px] gap-5">
      <div className="flex flex-col">
        <label className="text-[22px] text-slate-800 font-[600]">
          Food Name:
        </label>
        <input
          className="w-[500px] bg-transparent outline-none border-[2px] border-slate-800 rounded-lg p-2"
          type="text"
          placeholder="Food Name..."
        />
      </div>
      <div className="flex gap-5 items-center font-[600]">
        <label className="text-[22px] text-slate-800 font-[600]">
          Food Category:
        </label>
        <select className="rounded-[20px] p-2 border-[2px] border-slate-800">
          <option className="p-1 bg-slate-200 font-[500]">
            Select Category
          </option>
          <option className="p-1 bg-slate-200 font-[500]">Beverages</option>
          <option className="p-1 bg-slate-200 font-[500]">Biriyani</option>
          <option className="p-1 bg-slate-200 font-[500]">Burgers</option>
          <option className="p-1 bg-slate-200 font-[500]">Brunch</option>
          <option className="p-1 bg-slate-200 font-[500]">Cheese Kottu</option>
          <option className="p-1 bg-slate-200 font-[500]">Desserts</option>
          <option className="p-1 bg-slate-200 font-[500]">Kottu</option>
          <option className="p-1 bg-slate-200 font-[500]">Nasi Goreng</option>
          <option className="p-1 bg-slate-200 font-[500]">Pasta</option>
          <option className="p-1 bg-slate-200 font-[500]">Pizza</option>
          <option className="p-1 bg-slate-200 font-[500]">Rotti Items</option>
          <option className="p-1 bg-slate-200 font-[500]">Seafood</option>
          <option className="p-1 bg-slate-200 font-[500]">Shawarma</option>
          <option className="p-1 bg-slate-200 font-[500]">
            Soups and Salads
          </option>
          <option className="p-1 bg-slate-200 font-[500]">Specialty</option>
          <option className="p-1 bg-slate-200 font-[500]">Starters</option>
          <option className="p-1 bg-slate-200 font-[500]">Submarine</option>
          <option className="p-1 bg-slate-200 font-[500]">Vegetarian</option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-[22px] text-slate-800 font-[600]">
          Item Image:
        </label>
        <img
          className="w-[100px] h-[100px] cursor-pointer rounded-md"
          src={selectedImage}
          alt="Selected Food"
          onClick={handleImageClick}
        />
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[22px] text-slate-800 font-[600]">Price:</label>
        <input
          className="w-[500px] bg-transparent outline-none border-[2px] border-slate-800 rounded-lg p-2"
          type="text"
          placeholder="Item Price..."
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[22px] text-slate-800 font-[600]">
          Food Description:
        </label>
        <textarea
          className="w-[500px] h-[100px] resize-none bg-transparent outline-none border-[2px] border-slate-800 rounded-lg p-2"
          placeholder="Food Description..."
        ></textarea>
      </div>
      <div>
        <button className="uppercase px-10 py-2 bg-slate-800 text-white font-[600] rounded-xl hover:opacity-85">
          Add Food
        </button>
      </div>
    </div>
  );
};

export default AddFoods;
