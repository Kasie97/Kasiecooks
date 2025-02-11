import React, { useState } from 'react';
import Rice from '../rice/rice';
import Grilled from '../grilled/grilled';
import Soup from '../soup/soup';
import Trending from '../trending/trending';

const DashBoardLink = () => {
  // State to track the active link
  const [activeLink, setActiveLink] = useState(0); // Initialize with 0 for the first component

  // Function to handle click event on link
  const handleLinkClick = (event, index) => {
    event.preventDefault(); 
    setActiveLink(index);
  };


  const imageUrls = [
    'https://res.cloudinary.com/dmfb370xe/image/upload/v1707994924/Fire_dk5hvu.jpg',
    'https://res.cloudinary.com/dmfb370xe/image/upload/v1707642458/soup_yitamy.png',
    'https://res.cloudinary.com/dmfb370xe/image/upload/v1707642412/Frame_30_r0capd.png',
    'https://res.cloudinary.com/dmfb370xe/image/upload/v1707642445/Meat_lbfi4v.png',

  ];


  const components = [
    <div><Trending/></div>,
    <div><Soup/></div>,
    <div><Rice/></div>,
    <div><Grilled/></div>
  ];

  return (
    <div className='ml-20'>
    <ul className="flex item-center gap-2 py-2 px-4 cursor-pointer">
    {['Trending', 'Soups and Stews', 'Rice Dishes', 'Grilled and Roasted Foods'].map((link, index) => (
        <li key={index} className="mb-8  relative text-sm flex cursor-pointer hover:cursor-pointer items-center">
            <p
                className={`text-black hover:text-blue-600 hover:cursor-pointer ${activeLink === index ? 'font-bold text-white bg-[#d1e9fd] rounded-3xl' : 'bg-[#f0f0f0]'} flex items-center py-2 px-4 rounded-2xl text-black cursor-pointer`}
                onClick={(event) => handleLinkClick(event, index)}
            >

                <img src={imageUrls[index]} className="mr-2 w-6 h-6 rounded-full" alt="icon" />
                <span className={`${activeLink === index ? 'text-white' : ''}`}>{link}</span>
            </p>
            {activeLink === index && (
                <div className=""></div>
            )}
        </li>
    ))}
</ul>

      <div className='ml-10 h-96'>
        {components[activeLink]}
      </div>
    </div>
  );
};

export default DashBoardLink;
