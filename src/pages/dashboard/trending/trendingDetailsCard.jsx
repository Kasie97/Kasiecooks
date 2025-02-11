import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
const TrendingDetailsCard = ({
    id,
    imageUrl,
    dishName,
    rating,
    measurement,
    price,
    addItemToBasket 
  }) => {
   
    return (  
        

        <>
 
 <div className='relative mt-40 ml-10'>
                  

                    <div className="bg-white absolute -top-24 -left-12 p-8 rounded-xl border border-gray-200 shadow-md w-52 h-40">
                        <div className='flex items-center justify-between'>
                        <img src={imageUrl} className=' absolute -top-12 left-4 w-20 h-20 rounded-full' alt="" />
                        <p className=' absolute top-2 right-4 text-sm flex -ml-8 -mt84'> <FaStar className='w-4 h-4 text-[#2f80ed]' /> <span className='text-sm text-gray-400 font-light '>4.8(32)</span></p>
                        </div>
                    
                        <div className='flex items-center justify-between'>
                        <p className='text-sm mt-4 whitespace-nowrap capitalize'>{dishName}</p>
                         
                        </div>

                        <div className='flex items-center mt-6 justify-between'>
                            <button  onClick={addItemToBasket} className='text-sm p-2 bg-gray-100 rounded-xl cursor-pointer text-[#2f80ed]'>Add +</button>
                            <p className='text-sm -mr-5 font-semibold'>₦{parseFloat(price).toLocaleString()} <br /> <span className='text-sm text-gray-400 font-normal ml-5'>/{measurement}</span></p>
                        </div>
                       
                    </div>
        </div>
      </>  
        
    );
}
 
export default TrendingDetailsCard;