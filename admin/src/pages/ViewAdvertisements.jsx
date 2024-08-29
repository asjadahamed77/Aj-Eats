import React, { useEffect, useState } from 'react';
import backendDomainS from '../helpers/backendDomain';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

const ViewAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch advertisements on component mount
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(`${backendDomainS}/advertisement/get-advertisements`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setAdvertisements(data);
        } else {
          toast.error('Failed to load advertisements.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching advertisements.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, []);

  // Function to handle advertisement deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this advertisement?');
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(`${backendDomainS}/advertisement/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Advertisement deleted successfully.');
        setAdvertisements(advertisements.filter((ad) => ad._id !== id));
      } else {
        toast.error('Failed to delete advertisement.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the advertisement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-[50px]'>
      <h1 className='text-[22px] text-slate-800 font-[600]'>View Advertisements</h1>
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <ClipLoader color="#ff580f" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {advertisements.length > 0 ? (
            advertisements.map((ad) => (
              <div key={ad._id} className="relative bg-white shadow-md rounded-md p-4">
                <img
                  src={`${backendDomainS}${ad.imageUrl}`}
                  alt="Advertisement"
                  className="w-full h-[250px] object-cover rounded-md"
                />
                <button
                  onClick={() => handleDelete(ad._id)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No advertisements found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewAdvertisements;
