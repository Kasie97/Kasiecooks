import React from 'react';
import PropTypes from 'prop-types';
import UserHistoryData from './userHistoryData';
import Cart from '../../components/cart/cart';
import SideBar from '../../components/sidebar/sidebar';
import SearchComponents from '../../components/search/search';
 
const UserHistory = () => {
    return (
        <>
        <div>
            <div className=''> 
            <SearchComponents/>
            </div>
         
        <div>
      
            <SideBar />
        </div>
        <div className='flex items-center justify-between'>

                <div className='ml-40'>
                    <UserHistoryData />
                </div>
                <div className='mr-56'>
    <Cart/>
    </div>
            </div>
            
            </div></>
    );
}
 
 
export default UserHistory;