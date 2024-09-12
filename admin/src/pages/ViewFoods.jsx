import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backendDomainS from "../helpers/backendDomain";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";

const ViewFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`${backendDomainS}/food`, {
          credentials: "include",
        });
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        toast.error("Failed to fetch food items.");
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchFoods();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-foods/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`${backendDomainS}/food/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (response.ok) {
          setFoods(foods.filter((food) => food._id !== id));
          toast.success("Food item deleted successfully!");
        } else {
          toast.error("Failed to delete food item.");
        }
      } catch (error) {
        toast.error("Error occurred while deleting food item.");
      }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <RingLoader color="#ff580f" size={100} />
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">All Food Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {foods.map((food) => {
          const imageUrl = `${backendDomainS}/uploads/${food.imageUrl}`;
          return (
            <div key={food._id} className="bg-white p-5 shadow-md rounded-lg">
              <img
                src={imageUrl}
                alt={food.name}
                className="w-full h-[200px] object-cover rounded-lg mb-3"
                onError={(e) => {
                  e.target.src = 'path/to/default/image.png'; // Handle broken image case
                }}
              />
              <h2 className="text-xl font-bold mb-2">{food.name}</h2>
              <p className="text-gray-700">{food.category}</p>
              <p className="text-gray-700">${food.price}</p>
              <p className="text-gray-700">{food.description}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleEdit(food._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(food._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewFoods;
