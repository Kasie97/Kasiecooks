import React,{useState, useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { GiSpikeball } from "react-icons/gi";
import { FaClock } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaBell, FaHome } from "react-icons/fa";
import { useUser } from '../../utils/useContext';
import { CiLogout } from "react-icons/ci";
import { IoSettings } from "react-icons/io5"
import { NavLink, useLocation } from 'react-router-dom';
import { GiAbstract066 } from "react-icons/gi";
const AdminSideBar = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    const { user, handleLogout } = useUser();
    const userId = user ? user.id : localStorage.getItem('id');
    const firstNameInitial = user.fullName.split(' ')[0][0];
    const lastNameInitial = user.fullName.split(' ')[1][0];

    const handleLogoutClick = () => {
        handleLogout();
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    
        Navigate('/');
    }

    return (
        <div className="sidebar bg-white -mt-10 lg:w-28 md:w-28 text-gray-800 p-4 fixed h-full shadow-lg">
            <div className='ml-5'>
                <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707601370/Thai_Hot_Pot_zcvcfj.jpg" alt="" />
            </div>
            <div>
                <ul className='mt-14'>
                    <li>
                        <NavLink to=''     className={`items-center inline-block cursor-pointer ${
                             location.pathname === '/dashboard' ? 'text-blue-500 bg-[#f1f7fe] p-1 rounded-lg' : ''
                                        }`}>
                           <div className="items-center ml-2 mt-4 mb-8 cursor-pointer">
                                <FaHome className="ml-3" />
                            Home
                            </div>
                        </NavLink>
                    </li>
                    
                  
                    <li>
                        <NavLink to=''     className={`items-center inline-block cursor-pointer ${
                             location.pathname === '/orders-history' ? 'text-blue-500 bg-[#f1f7fe] p-1 mt-2 rounded-lg' : ''
                                        }`}>
                            <div className="items-center ml-2 mt-4 mb-8 cursor-pointer">
                                <FaClock className="ml-4" />
                            Orders
                            </div>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='' activeClassName="active-link">
                            <div className="items-center ml-6 mt-4 mb-8 cursor-pointer">
                                <GiAbstract066 className="" />
                                <p href="#" className="text-gray-800 -ml-4 hover:text-gray-700 cursor-pointer">Track</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='' activeClassName="active-link">
                            <div className="items-center ml-6 mt-4 mb-8 cursor-pointer">
                                <IoChatbubblesSharp className="mr-2" />
                                <p href="#" className="text-gray-800 -ml-2 hover:text-gray-700 cursor-pointer">Chat</p>
                            </div>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='' activeClassName="active-link">
                            <div className="items-center ml-6 mt-4 mb-8 cursor-pointer">
                                <FaBell className="mr-2" />
                                <p href="#" className="text-gray-800 -ml-2 hover:text-gray-700 cursor-pointer">Alert</p>
                            </div>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='' activeClassName="active-link">
                            <div className="items-center ml-6 mt-4 mb-8 cursor-pointer">
                                <IoSettings className="mr-2" />
                                <p className="text-gray-800 -ml-5 hover:text-gray-700 cursor-pointer">Settings</p>
                            </div>
                        </NavLink>
                    </li>

                    <li className='mt-8'>
                        <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center'>
                            <p className="font-extrabold uppercase text-white text-md p-2 rounded-lg whitespace-nowrap">
                                {`${firstNameInitial}${lastNameInitial}`}
                            </p>
                        </div>
                    </li>

                    <li className="items-center  mt-8 mb-8 cursor-pointer" onClick={handleLogoutClick}>
                        <CiLogout className=" w-10 h-10 cursor-pointer" onClick={handleLogoutClick} />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminSideBar;
