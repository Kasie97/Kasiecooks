import React, { useEffect, useState } from 'react';

import { useUser } from '../../utils/useContext';
import { Link, useNavigate } from 'react-router-dom';

import { FaPowerOff } from "react-icons/fa";
import SideBar from '../../components/sidebar/sidebar';
import DashBoardLink from './dashboardLink/dashboardLink';
import Cart from '../../components/cart/cart';
import SearchComponents from '../../components/search/search';

const Dashboard = () => {
  const Navigate = useNavigate();
  const { user, handleLogout } = useUser();
  const userId = user ? user.id : localStorage.getItem('id');


  const handleLogoutClick = () => {
    handleLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    Navigate('/');
  };

  return (
    <>
    <div className='mt-14'>
    <SideBar/>
    </div>
  
       <div className="flex items-center justify-between mt-6 ml-8 mr-8">
    
    <div className='-mt-40'>
      <div className='flex items-center justify-center absolute top-4  left-72'>
      <SearchComponents className=''/>
      </div>
     <div className=''>
     <DashBoardLink/>
     </div>
   
    </div>

    <div className='mr-24'>
    <Cart/>
    </div>
        

        </div>
    
       
      

       
      
    </>
  );
};

export default Dashboard;
