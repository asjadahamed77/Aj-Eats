import React, { useState } from 'react';
import sampleImage from '../assets/sample.png';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import backendDomainS from '../helpers/backendDomain';

const Advertisement = () => {
  const [selectedImage, setSelectedImage] = useState(sampleImage);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to trigger file input when the image is clicked
  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  // Function to handle image change and update the display
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Display the selected image
      };
      reader.readAsDataURL(file); // Read the file as a data URL
      setImageFile(file); // Store the file for upload
    }
  };

  // Function to handle the file upload
  const handleUpload = async () => {
    if (!imageFile) {
      toast.error('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      setLoading(true); // Start loading spinner
      const response = await fetch(`${backendDomainS}/advertisement/upload-advertisements`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
      } else {
        toast.error('Failed to upload the advertisement.');
      }
    } catch (error) {
      toast.error('An error occurred while uploading the advertisement.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className='p-[50px]'>
      <div>
        <h1 className='text-[22px] text-slate-800 font-[600]'>Upload Advertisement</h1>
        {/* Display the selected image and open the file input on click */}
        <img
          className='w-[400px] h-[250px] rounded-md mt-5 cursor-pointer'
          src={selectedImage}
          alt='Selected Advertisement'
          onClick={handleImageClick}
        />
        {/* Hidden file input */}
        <input
          id='imageInput'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleImageChange}
        />
      </div>
      <div>
        <button
          onClick={handleUpload}
          className="uppercase mt-5 px-10 py-2 bg-slate-800 text-white font-[600] rounded-xl hover:opacity-85 flex items-center"
          disabled={loading} // Disable button during loading
        >
          {loading ? <ClipLoader color="#ffffff" size={20} /> : 'Upload Advertisement'}
        </button>
      </div>
    </div>
  );
};

export default Advertisement;
