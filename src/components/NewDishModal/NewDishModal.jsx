import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoCameraSharp } from "react-icons/io5";
import { BiSolidDish } from "react-icons/bi";
import { FaTag } from "react-icons/fa6";
import { GiKitchenScale } from "react-icons/gi";
import { FaPlateWheat } from "react-icons/fa6";
import {   apiPost  } from "../../utils/api";
import { CircleLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import './Newdish.css'
const NewDishModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [image, setDishImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['Trending', 'Soups and Stews', 'Rice Dishes', 'Grilled and Roasted Foods'];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDishImage(file);

   
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    setLoading(true); 
    e.preventDefault();
  
    const emptyFields = [];
    if (!image) emptyFields.push('Image');
    if (!dishName) emptyFields.push('Dish Name');
    if (!selectedCategory) emptyFields.push('Category');
    if (!measurement) emptyFields.push('Measurement');
    if (!price) emptyFields.push('Price');
  
    if (emptyFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `Please fill in the following fields:<br>${emptyFields.join('<br>')}`,
      });
      setLoading(false);
      return; 
    }
  
    try {
   
      const formData = new FormData();
      formData.append('category', selectedCategory);
      formData.append('dishName', dishName);
      formData.append('price', price);
      formData.append('measurement', measurement);
      formData.append('image', image);
  
  
      const response = await apiPost("/dishes/create", formData);
      console.log(response);
  
      setCategory('');
      setDishName('');
      setPrice('');
      setMeasurement('');
      setDishImage(null);
      setImageUrl('');
      setSelectedCategory('');

  
      Swal.fire({
        html: `
          <div style="text-align: center;">
            <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1708422224/to-do_list_ap03fj.png" alt="Uploaded Dish" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
            <p style="color: #4990ef; margin-top: 20px;">New Dish Uploaded Successfully!</p>
          </div>
        `,
        showCancelButton: false,
        confirmButtonColor: '#2f80ed',
        confirmButtonText: 'Continue',
        customClass: {
          confirmButton: 'swal-button-width', 
        },
      });
    } catch (error) {
      console.error('Error uploading dish:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while uploading the dish. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  
    closeModal();
  };
  
  
  


  const handleInputChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleInputChangeMeasurement = (e) => {
    setMeasurement(e.target.value);
  };
  const handleInputChangeDish = (e) => {
    setDishName(e.target.value);
  };

  return (
    <div>
      <button onClick={openModal} className='bg-blue-500 p-2 rounded-xl text-sm pl-4 pr-4 text-white mr-40'>Add new dish</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="New Dish Modal"
        appElement={document.getElementById('root')} 
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            width: '30%',
            margin: 'auto',
            borderRadius: '20px',
          },
        }}
      >
        <div className='flex items-center justify-center'>
          <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1708393072/Frame_38813503_rjbxfo.png" alt="" />
        </div>
        <div className='flex items-center justify-center mb-4'>
          <p className='text-md text-[#70a7f3] mt-8 text-center capitalize font-bold'>new dish</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center mt-4 justify-center relative">
            <IoCameraSharp className="text-xl mt-14 ml-14 text-[#a7c7f1] z-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Selected Dish"
                  className="rounded-full"
                  style={{ width: '100px', height: '100px' }}
                />
              ) : (
                <div className="rounded-full bg-gray-200" style={{ width: '80px', height: '80px' }} />
              )}
            </div>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="dishName" className="block text-xs font-medium text-[#70a7f3]">Dish</label>
            <div className="absolute inset-y-0 left-2 flex items-center">
              <FaPlateWheat className="text-[#a6c6f2] mt-5" />
            </div>
            <input
              type="text"
              id="dishName"
              name="dishName"
              value={dishName}
              onChange={handleInputChangeDish}
              className="border rounded-lg w-full py-1 px-8 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="category" className="block text-xs font-medium text-[#70a7f3]">Dish Category</label>
            <div className="relative">
              <BiSolidDish className="text-[#2f80ed] absolute top-2 left-3" />
           
            </div>
         

<select
    value={selectedCategory}
    onChange={handleCategoryChange}
 name="category"
              id="categoryList"
              className="bg-gray-200 text-gray-400 rounded-md h-8  pl-12 w-full text-sm appearance-none"
            >
              <option>Select Category</option>
              <option>Trending</option>
              <option>Soups and Stews</option>
              <option>Rice Dishes</option>
              <option>Grilled and Roasted Foods</option>
            </select>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="measurement" className="block text-xs font-medium text-[#70a7f3]">Measurement/Size</label>
            <div className="absolute inset-y-0 left-2 flex items-center">
              <GiKitchenScale className="text-[#2f80ed] mt-5" />
            </div>
            <input
              type="text"
              id="measurement"
              name="measurement"
              value={measurement}
              onChange={handleInputChangeMeasurement}
              className="border rounded-lg w-full py-1 px-8 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="price" className="block text-xs font-medium text-[#70a7f3]">Price</label>
            <div className="absolute inset-y-0 left-3 flex items-center">
              <FaTag className="text-[#a6c6f2]  mt-5" />
            </div>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={handleInputChangePrice}
              className="border rounded-lg w-full py-1 px-8 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className='flex items-center justify-between mt-12'>
            <button onClick={closeModal} className="bg-white border border-blue-500 text-blue-500 text-sm p-1 w-44 rounded-3xl">Close</button>

            <button
            type="submit" 

            className="bg-blue-500 text-white p-1 w-44 rounded-3xl text-sm"
  disabled={loading} 
>
  {loading ? (
    <p className="gap-2 ml-8 flex items-center">
      <CircleLoader color="#fff" size={20} />
      <span className="ml-2">Submitting...</span>
    </p>
  ) : (
    'Upload Dish'
  )}
</button>
           
          </div>
        </form>
      </Modal>


      
    </div>
  );
};

export default NewDishModal;
