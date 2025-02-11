import React, { useState } from 'react';
import RiceDaish from '../rice-Dishes/riceDish';

const MenuLink = () => {
  // State to track the active link
  const [activeLink, setActiveLink] = useState(0); // Initialize with 0 for the first component

  // Function to handle click event on link
  const handleLinkClick = (event, index) => {
    event.preventDefault(); // Prevent page reload
    setActiveLink(index);
  };

  // Define an array of image URLs corresponding to each link
  const imageUrls = [
    'https://res.cloudinary.com/dmfb370xe/image/upload/v1707642412/Frame_30_r0capd.png',
    'https://res.cloudinary.com/dmfb370xe/image/upload/v1707642458/soup_yitamy.png',
    'https://res.cloudinary.com/dmfb370xe/image/upload/v1707642445/Meat_lbfi4v.png',
    'https://res.cloudinary.com/dmfb370xe/image/upload/v1707642430/Frame_38813501_ls4hkb.png'
  ];

  // Define components for each link
  const components = [
    <div><RiceDaish/></div>,
    <div>Soups and Stews Component</div>,
    <div>Grilled and Roasted Foods Component</div>,
    <div>Raw Foods Component</div>
  ];

  return (
    <div className='flex'>
      <ul className="flex flex-col py-2 px-4">
        {['Rice Dishes', 'Soups and Stews', 'Grilled and Roasted Foods', 'Raw Foods'].map((link, index) => (
          <li key={index} className="mb-8 relative text-sm flex items-center">
            <a
              href=""
              className={`text-black hover:text-blue-600 ${activeLink === index ? 'font-bold text-white bg-blue-500 rounded-3xl' : ''} flex items-center py-2 px-4 rounded-2xl text-black`}
              onClick={(event) => handleLinkClick(event, index)}
            >
              {/* Render the image and link text */}
              <img src={imageUrls[index]} className="mr-2 w-6 h-6" alt="icon" />
              <span className={`${activeLink === index ? 'text-white' : ''}`}>{link}</span>
            </a>
            {/* Add vertical border for the side of the link */}
            <div className={`absolute top-0 left-64 -translate-y-1/2 h-20 w-1 bg-gray-300 ${index === 4 ? 'mt-8' : ''}`}></div>
            {/* Add vertical border for the active link */}
            {activeLink === index && (
              <div className="absolute top-0 left-64 -translate-y-1/2 h-20 pt w-1 bg-blue-600"></div>
            )}
          </li>
        ))}
      </ul>
      <div className='ml-10 h-96'>
        {components[activeLink]}
      </div>
      {/* Display the component corresponding to the active link */}
    </div>
  );
};

export default MenuLink;
