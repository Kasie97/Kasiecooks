import React from 'react';
import Navbar from '../../components/nabvar/navbar';
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Footer from '../../components/footer/footer';
import MenuLink from '../../components/MenuLink/MenuLink';
import {  Link } from 'react-router-dom';


const Homepage = () => {
    return (
        <><div>
            <Navbar />
            <div className='flex mt-32 ml-24 gap-48'>
                <div className='mt-32'><img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707603598/Claim_Best_Offer_on_African_Food_Ingredients._lfm4l7.png" className='w- h-48' alt="" />
                    <div>
                    <Link to='/sign-in' ><p className='bg-[#2f80ed] text-white px-5 mt-8 py-2 rounded-2xl font-semibold inline-block'> Get Started</p></Link> 
                    </div>

                </div>
                <div className='relative mt-20 ml-10'>
                    <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707602267/Ellipse_291_hwnnpt.jpg" className=' ww-96 h-96' alt="" />

                    <div className="bg-white absolute -top-24 -left-12 p-8 rounded-xl border border-gray-200 shadow-md w-52 h-40">
                        <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707602295/Frame_38813437_kauacu.jpg" className=' absolute -top-12 left-4' alt="" />
                        <div className='flex'>
                            <p className='text-sm mt-4 whitespace-nowrap'>ofada stew</p>
                            <p className='text-sm gap-1 flex -mt-4 ml-8'> <FaStar className='w-4 h-4 text-[#2f80ed]' /> <span className='text-sm text-gray-400 font-light '>4.8(32)</span></p>
                        </div>
                        <div className='flex items-center mt-6 justify-between'>
                            <p className='text-sm p-2 bg-gray-100 rounded-xl text-[#2f80ed]'>Add +</p>
                            <p className='text-sm -mr-5 font-semibold'>$100,000 <br /> <span className='text-sm text-gray-400 font-normal ml-5'>/500kg</span></p>
                        </div>
                    </div>

                    <div className="bg-white absolute -bottom-32 left-56 p-8 rounded-xl border border-gray-200 shadow-md w-52 h-40">
                        <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707602309/Frame_38813437_1_kiijnp.jpg" className=' absolute -top-12 left-4 rounded-full' alt="" />
                        <div className='flex'>
                            <p className='text-sm mt-4 whitespace-nowrap'>ofe ohe</p>
                            <p className='text-sm gap-1 flex -mt-4 ml-12'> <FaStar className='w-4 h-4 text-[#2f80ed]' /> <span className='text-sm text-gray-400 font-light '>4.8(32)</span></p>


                        </div>
                        <div className='flex items-center mt-6 justify-between'>
                            <p className='text-sm p-2 bg-gray-100 rounded-xl text-[#2f80ed]'>Add +</p>
                            <p className='text-sm -mr-5 font-semibold'>$100,000 <br /> <span className='text-sm text-gray-400 font-light ml-5'>/500kg</span></p>
                        </div>
                    </div>
                </div>
            </div>



            <div className='mt-52'>
                <h4 className='text-center text-2xl font-extrabold capitalize'>what we serve</h4>

                <div className='flex mt-8 gap-16 items-center justify-center'>
                    <div className='mt-6'>
                        <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707607906/Order_food-pana_1_wiyjcx.jpg" alt="" />
                        <p className='text-center capitalize mb-2 mt-4 font-semibold'>easy to order</p>
                        <p className='text-sm'>You only need a few steps in ordering food</p>
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707608065/Take_Away-rafiki_1_l5shqi.jpg" alt="" />
                        <p className='text-center mb-2 mt-4 capitalize font-semibold'>festest delivery</p>
                        <p className='text-sm'>Delivery that is always ontime even faster</p>
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707608025/Waiters-rafiki_1_2_bedgae.jpg" alt="" />
                        <p className='text-center mb-2 mt-4 capitalize font-semibold'>bet quality</p>
                        <p className='text-sm'>Not only fast for us quality is also number one</p>
                    </div>
                </div>
            </div>




            <div className='mt-24 mb-24 ml-52 mr-36'>
                <div className='flex items-center justify-between'>
                    <h4 className='text-3xl font-extrabold capitalize'>Our Menu</h4>
                    <div className='flex gap-4'>
                        <div className='bg-gray-200 p-2 rounded-full text-black w-12-h-6'><IoIosArrowBack /></div>
                        <div className='bg-[#2f80ed] p-2 rounded-full text-white w-6-h-6'><IoIosArrowForward /></div>


                    </div>

                   
                </div>

              

            </div>
            <div className='ml-44 '>
                <MenuLink />
               
            </div>
         
        </div><Footer /></>
    );
}
 



 
export default Homepage;