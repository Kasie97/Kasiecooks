import React, { useEffect, useState } from "react";
import { Data } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, selectBasketItems, removeFromBasket } from "../../../components/features/BasketSlice";
import { useNavigate } from 'react-router-dom';
import { apiGet } from "../../../utils/api";
import SoupDetailsCard from "./soupDetailsCard";
import Loading from "../../../components/loading/loading";
const ITEMS_PER_PAGE = 8;
const Soup = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [soupData, setSoupData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await apiGet("/dishes/all");
            const { data } = response;
      
            if (Array.isArray(data)) {
              // Filter categories with "Grilled and Roasted Foods"
              const soupCategories = data.filter(dish => dish.category && dish.category.toLowerCase().includes('soups and stews'));
              
              if (soupCategories.length > 0) {
                setSoupData(soupCategories);
                console.log(soupCategories);
              } else {
                console.log('No items found in the "Soups and Stews" category.');
              }
            } else {
              console.error('Invalid data format:', data);
            }
          } catch (error) {
            // Handle error
            console.error('Error fetching data:', error);
          }finally {
            setLoading(false); // Update loading status when data fetching is complete
        }
        };
      
        fetchData();
      }, []);
      
  


    // Function to add an item to the basket
    const addItemToBasket = (item) => {
        dispatch(addToBasket(item));
    };

    // Function to remove an item from the basket
    const removeItemFromBasket = (id) => {
        dispatch(removeFromBasket({ id }));
    };

        // Calculate the index range for the current page
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
    
        // Slice the data array to display only the items for the current page
        const currentItems = soupData.slice(startIndex, endIndex);
    
        // Calculate total number of pages
        const totalPages = Math.ceil(soupData.length / ITEMS_PER_PAGE);
    
        // Function to handle pagination
        const nextPage = () => {
            setCurrentPage(currentPage + 1);
        };
    
        const prevPage = () => {
            setCurrentPage(currentPage - 1);
        };
    
        const goToPage = (page) => {
            setCurrentPage(page);
        };

        if (loading) {
            return <div className="absolute top-2 right-52"><Loading/></div>;
        }
    
    return (
        <div>
            <div className="grid grid-cols-4 gap-x-20 gap-y-24 mr-40">
                {currentItems.map((category, index) => (
                    <div className={`scroll-content-category mb-4`} key={category.id}>
                        <SoupDetailsCard
                            id={category.id}
                            imageUrl={category.imageUrl}
                            dishName={category.dishName}
                            measurement={category.measurement}
                            address={category.location}
                            price={category.price}
                            availability={category.availability}
                            discount={category.discount}
                            discountPrice={category.discountPrice}
                            addItemToBasket={() => addItemToBasket({
                                id: category.id,
                                name: category.name,
                                title: category.title,
                                price: category.price,
                                img: category.img
                            })}
                            removeItemFromBasket={() => removeItemFromBasket(category.id)}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center  items-center mt-32">
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1} 
                    className="mr-2 bg-blue-500 text-white px-6 py-1 rounded-md"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button 
                        key={index}
                        onClick={() => goToPage(index + 1)} 
                        className={`mx-2 bg-blue-500 text-white px-2 py-1 rounded-md ${currentPage === index + 1 ? 'bg-gray-600' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    onClick={nextPage} 
                    disabled={endIndex >= soupData.length} 
                    className="bg-blue-500 text-white px-6 py-1 rounded-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Soup;
