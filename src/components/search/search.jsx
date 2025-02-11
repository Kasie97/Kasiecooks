import React, { useState, useRef, useEffect } from 'react';
import { RiSearch2Fill } from "react-icons/ri";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../components/features/BasketSlice";
import { FaStar } from "react-icons/fa";
import "./Search.css";
import Loading from '../loading/loading';

function SearchComponents() {
  const endpoint = `${import.meta.env.VITE_APP_BASE_URL}/dishes/all`;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasMatchingResults, setHasMatchingResults] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    console.log('Search query:', event.target.value); 
  };
  
const performSearch = async () => {
    setIsLoading(true);
  
    try {
      if (!searchQuery.trim()) {
       
        setSearchResults([]);
        setHasMatchingResults(false);
        setIsModalOpen(true);
        setIsLoading(false);
        return;
      }
  
      const apiUrl = `${endpoint}?name=${encodeURIComponent(searchQuery.trim())}`;
      console.log('API URL:', apiUrl); // Log API URL for debugging
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('Search Results:', data); // Log search results for debugging
  
      if (data && data.length > 0) {
        // Filter search results based on searchQuery
        const filteredResults = data.filter(result =>
          result.dishName && result.dishName.toLowerCase().includes(searchQuery.toLowerCase())
        );
  
        if (filteredResults.length > 0) {
          setSearchResults(filteredResults);
          setHasMatchingResults(true);
          setIsModalOpen(true);
        } else {
          setSearchResults([]);
          setHasMatchingResults(false);
          setIsModalOpen(true);
        }
      } else {
        setSearchResults([]);
        setHasMatchingResults(false);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
      setHasMatchingResults(false);
      setIsModalOpen(true);
    }
  
    setIsLoading(false);
  };
  

  const addItemToBasket = (item) => {
    dispatch(addToBasket(item));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="search flex flex-row mt-4 items-center justify-center mr-96">
      <div className="sear flex flex-row space-x-2 h-10 w-72 bg-[#f5f5f5] p-3 rounded-md">
        <RiSearch2Fill className='Bisearch h-8 -mt-2 w-8 text-[#a6c6f2]' />
        <input
          className="input bg-[#f5f5f5] text-black w-96 border-none outline-none max-w-screen-lg border-r-8"
          type="text"
          value={searchQuery}
          onKeyUp={handleKeyUp}
          onChange={handleSearchInputChange}
          placeholder="Search"
        />
        <HiOutlineAdjustmentsHorizontal className='h-8 w-8 -mt-2 text-[#a6c6f2]' />
      </div>
      <RiSearch2Fill className="search-btn h-6 w-6 text-white" />
      {isLoading && (
       <div className="full">
       <Loading/>
     </div>

      )}
      {!hasMatchingResults && !isLoading && (
        <p className="text-red-500 text-center text-2xl absolute pt-16">
          No Meal found...
        </p>
      )}
      {hasMatchingResults && !isLoading && (
        <div className="mt-5 max-h-96 overflow-y-auto">
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-10">
                
              <div ref={modalRef} className="searchModal bg-[#c5c1c1] max-h-96 w-96 p-8  items-center rounded-md shadow-lg overflow-y-auto">
              <p className="text-center uppercase  text-gray-600 mb-10">
                  Total items found: <span className='font-bold'>{searchResults.length}</span> 
                </p>
              <div className={searchResults.length === 1 ? "mx-auto" : "grid grid-cols-2 gap-4 w-full h-full"}>
                  {searchResults.map((result) => (
                    <div key={result.id} className="gap-4 bg-[#c5c1c1] w-72 h-72 ">
                    
                        <div  className="relative text-white items-center bg-[#f5f5f5] shadow rounded-xl p-4 mt-8 flex flex-col">
                        <div className='flex items-center justify-between'>
                        <img src={result.imageUrl} className=' absolute -top-12 left-4 w-20 h-20 rounded-full' alt="" />
                        <p className=' absolute top-2 right-4 text-sm flex -ml-8 -mt84'> <FaStar className='w-4 h-4 text-[#2f80ed]' /> <span className='text-sm text-gray-400 font-light '>4.8(32)</span></p>
                        </div>
                    
                        <div className='flex items-center justify-between'>
                        <p className='text-lg mt-4 whitespace-nowrap capitalize text-black'>{result.dishName}</p>
                         
                        </div>

                        <div className='flex items-center mt-6 gap-20 justify-between'>
                            <button   onClick={() => addItemToBasket(result)}className='text-sm p-2 bg-gray-100 border border-blue-500 rounded-xl cursor-pointer text-[#2f80ed]'>Add +</button>
                            <p className='text-sm -mr-5 font-semibold text-black'>₦{parseFloat(result.price).toLocaleString()} <br /> <span className='text-sm text-gray-400 font-normal ml-5'>/{result.measurement}</span></p>
                        </div>
                       
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComponents;
