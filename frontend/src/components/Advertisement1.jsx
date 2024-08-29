import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import backendDomain from '../helpers/backendDomain';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; 
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

const Advertisement1 = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch advertisements on component mount
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(`${backendDomain}/advertisement/get-advertisements`, {
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

  return (
    <div className='p-[50px] mt-[30px] tab:px-[35px] phoneMax:px-[20px]'>
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <ClipLoader color="#ff580f" size={50} />
        </div>
      ) : (
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={{ clickable: true }}
          mousewheel={true}
          keyboard={true}
          autoplay={{
            delay: 4000, // Change slide every 4 seconds
            disableOnInteraction: false, // Continue autoplay after user interactions
          }}
          modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
          className="mySwiper"
        >
          {advertisements.length > 0 ? (
            advertisements.map((ad) => (
              <SwiperSlide key={ad._id}>
                <img
                  src={`${backendDomain}${ad.imageUrl}`} // Ensure the URL is correct
                  alt="Advertisement"
                  className="w-full h-[45vh] object-cover rounded-lg tab:h-[35vh] phoneMax:h-[20vh]"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p>No advertisements found.</p>
            </SwiperSlide>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default Advertisement1;
