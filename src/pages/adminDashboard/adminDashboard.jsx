import React from 'react';
import SideBar from '../../components/sidebar/sidebar';
import AdminDashBoardLink from './adminDashboardLink/adminDashboardLink';
import SearchComponents from '../../components/search/search';
import AdminSideBar from '../../components/adminSidebar/adminSidebar';
 
const AdminDashboard = () => {
    return (
        <div>
                   <div className='mt-14'>
    <AdminSideBar/>
    </div>

                <div className=''>
                    <SearchComponents/>
                <AdminDashBoardLink/>
              
                </div>
        </div>
    );
}
 
 
export default AdminDashboard;