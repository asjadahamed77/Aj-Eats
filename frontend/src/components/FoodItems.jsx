import React, { useState, useEffect } from 'react';
import backendDomain from '../helpers/backendDomain';
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";

const FoodItems = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`${backendDomain}/food`, {
          credentials: "include",
        });
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        toast.error("Failed to fetch food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <RingLoader color="#ff580f" size={100} />
      </div>
    );
  }

  return (
    <div className="px-[50px] desktop:px-[25px]">
      <h1 className="text-3xl text-main font-bold mb-5 phoneMax:text-2xl">Explore Our Food Menu</h1>
      <div className="grid grid-cols-4 gap-5 desktop:gap-3 laptop:grid-cols-3 tab:grid-cols-2 phoneMax:grid-cols-1">
        {foods.map((food) => {
          const imageUrl = `${backendDomain}/uploads/${food.imageUrl}`;
          return (
            <div 
              key={food._id} 
              className="relative bg-white shadow-md rounded-lg w-[350px] laptop:w-[320px] tab:w-[350px] phoneMax:w-full"
            >
              <img
                src={imageUrl}
                alt={food.name}
                className="w-full h-[200px] object-cover rounded-lg mb-3"
                onError={(e) => {
                  e.target.src = 'path/to/default/image.png'; // Handle broken image case
                }}
              />

           
              <div className="absolute top-2 right-2 bg-main text-white font-[700] text-xl  px-3 py-2 rounded-full shadow-xl border-white border-[2px]">
                Rs. {food.price}
              </div>

              <div className="p-5">
                <h2 className="text-xl text-secondary font-bold mb-2">{food.name}</h2>
                <p className="text-gray-500">{food.description}</p>

                <div className='flex justify-center mt-4'>
                  <button className='bg-main text-white w-full rounded-lg py-2 text-[18px] font-[600] hover:opacity-80'>Add to Cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FoodItems;
