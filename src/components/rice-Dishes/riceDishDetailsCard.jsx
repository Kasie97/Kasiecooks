import React from 'react'
import './riceDish.css'
import { IoIosArrowForward } from "react-icons/io";
const RiceDishDetailsCard = ({
    id,
    img,
    title,
    rating,
    address,
    price,
    availability,
    discount,
    discountPrice
  }) => {
   
    return (  
        

        <>
 
        <div

            className="relative">

            <img src={img} alt="" className="AllCategory curved-top-image h-60 w-60 mt-4 pl-1 rounded-lg  " />


            <div className='absolute top-40 top left-6 text-center'>

           
            <h4 className='text-white text-center capitalize'>{title}</h4>
            <div className=' flex'>
            <p className='text-white'>{price}</p> <p className='riceP mt-1 text-sm text-white font-extralight'>/{rating}kg</p>
            </div>
            <div>
                <p className='riceO text-sm flex gap-1 text-white capitalize mr-5'>Order now <IoIosArrowForward className='mt-1'/></p>
            </div>
            </div>
        </div>
      </>  
        
    );
}
 
export default RiceDishDetailsCard;