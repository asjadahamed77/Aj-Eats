import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sampleImage from "../assets/sample.png";
import backendDomainS from "../helpers/backendDomain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";

const AddFoods = () => {
  const [selectedImage, setSelectedImage] = useState(sampleImage);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form inputs
    if (!name || !category || !price || !description) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("description", description);
      const imageFile = document.getElementById("imageInput").files[0];
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      const response = await fetch(`${backendDomainS}/food/add`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
  
      const result = await response.json();
      console.log("Server response:", result);
  
      if (response.ok) {
        toast.success("Food item added successfully!");
        setName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setSelectedImage(sampleImage);
        navigate("/view-foods");
      } else {
        throw new Error(result.message || "Failed to add food item.");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f7f7] flex flex-col w-full p-[40px] gap-5 relative">
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-[22px] text-slate-800 font-[600]">
            Food Name:
          </label>
          <input
            className="w-[500px] bg-transparent outline-none border-[2px] border-slate-800 rounded-lg p-2"
            type="text"
            placeholder="Food Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-5 items-center font-[600]">
          <label className="text-[22px] text-slate-800 font-[600]">
            Food Category:
          </label>
          <select
            className="rounded-[20px] p-2 border-[2px] border-slate-800"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled className="p-1 bg-slate-200 font-[500]">
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
            <option className="p-1 bg-slate-200 font-[500]">Soups and Salads</option>
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[22px] text-slate-800 font-[600]">
            Food Description:
          </label>
          <textarea
            className="w-[500px] h-[100px] resize-none bg-transparent outline-none border-[2px] border-slate-800 rounded-lg p-2"
            placeholder="Food Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="uppercase px-10 py-2 bg-slate-800 text-white font-[600] rounded-xl hover:opacity-85"
            disabled={loading}
          >
            {loading ? (
              <RingLoader color="#ffffff" size={24} />
            ) : (
              "Add Food"
            )}
          </button>
        </div>
      </form>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <RingLoader color="#ffffff" size={100} />
        </div>
      )}
    </div>
  );
};

export default AddFoods;
