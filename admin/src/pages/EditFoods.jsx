import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backendDomainS from "../helpers/backendDomain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";

const EditFoods = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`${backendDomainS}/food/${id}`, {
          credentials: "include",
        });
        const data = await response.json();
        setFood(data);
      } catch (error) {
        toast.error("Failed to fetch food item.");
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchFood();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", food.name);
      formData.append("category", food.category);
      formData.append("price", food.price);
      formData.append("description", food.description);
      if (document.getElementById("imageInput").files[0]) {
        formData.append("image", document.getElementById("imageInput").files[0]);
      }

      const response = await fetch(`${backendDomainS}/food/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Food item updated successfully!");
        navigate("/view-foods");
      } else {
        throw new Error("Failed to update food item.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFood({ ...food, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-75">
        <RingLoader color="#ffffff" size={100} />
      </div>
    );
  }

  return food ? (
    <div className="bg-[#f7f7f7] flex flex-col w-full p-[40px] gap-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-[22px] text-slate-800 font-[600]">
            Food Name:
          </label>
          <input
            className="w-[500px] bg-transparent outline-none border-[2px] border-slate-800 rounded-lg p-2"
            type="text"
            value={food.name}
            onChange={(e) =>
              setFood({ ...food, name: e.target.value })
            }
          />
        </div>
        <div className="flex gap-5 items-center font-[600]">
          <label className="text-[22px] text-slate-800 font-[600]">
            Food Category:
          </label>
          <select
            className="rounded-[20px] p-2 border-[2px] border-slate-800"
            value={food.category}
            onChange={(e) =>
              setFood({ ...food, category: e.target.value })
            }
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
            src={food.image ? food.image : `${backendDomainS}/uploads/${food.imageUrl}`}
            alt="Selected Food"
            onClick={() => document.getElementById("imageInput").click()}
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
            value={food.price}
            onChange={(e) =>
              setFood({ ...food, price: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[22px] text-slate-800 font-[600]">
            Food Description:
          </label>
          <textarea
            className="w-[500px] h-[100px] resize-none bg-transparent outline-none border-[2px] border-slate-800 rounded-lg p-2"
            value={food.description}
            onChange={(e) =>
              setFood({ ...food, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="uppercase px-10 py-2 bg-slate-800 text-white font-[600] rounded-xl hover:opacity-85"
            disabled={loading}
          >
            {loading ? (
              <RingLoader color="#ffffff" size={24} />
            ) : (
              "Update Food"
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditFoods;
