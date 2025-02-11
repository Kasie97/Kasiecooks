import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../../utils/api';
import { useUser } from '../../utils/useContext';
import Loading from '../../components/loading/loading';
import { FaStar } from "react-icons/fa";
const UserHistoryData = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useUser();
  const userId = user ? user.id : localStorage.getItem('id');
  const [userOrders, setUserOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await apiGet('/orders');
        const filteredOrders = response.data.filter(order => order.userId === userId);
        const sortedOrders = filteredOrders.sort((a, b) => new Date(b.currentTime) - new Date(a.currentTime)); // Sort orders by timestamp in descending order
        setUserOrders(sortedOrders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user orders:', error);
        // Handle error (e.g., display an error message)
      }
    };
  
    if (userId) {
      fetchUserOrders();
    } else {
      // navigate('/');
    }
  }, [userId, navigate]);


  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  // Next page
  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(userOrders.length / ordersPerPage)));
  };

  return (
    <div>
            {isLoading ? (
              <div className='flex items-center justify-center -mt-96 -ml-32'>
 <Loading />
              </div>
       
          ) : (
            <>

          
          {currentOrders.length > 0 ? (
            <div >
        
              <ul>
                {currentOrders.map(order => (
                  <li key={order._id}>
                    <div className='mb-8'>
                      <div className='flex items-center justify-between text-gray-500'> 
                        <div className='mb-4'><p className='text-sm'>Order ID: <span className='text-black font-semibold'>#{order._id.substring(order._id.length - 6)}</span></p>
                        {/* <p>..</p> */}
                        <p className='text-sm'>Total</p> <p className='text-black text-sm font-semibold'>&#x20A6;{order.totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p></div>
                        <div className='items-center inline-block justify-center text-sm  text-gray-500 ml-10'>
                          <p className='text-sm'>Payment Method:</p>
                          <p className='text-black '> {order.paymentOption}</p>
                        <p className='text-sm mt-2'>Delivery Contact:</p> <p className='text-black'>{order.receiverPhoneNumber}</p>
                        </div>
                        <div  className='items-center inline-block justify-center text-sm ml-14'><p>Delivery State:</p> <p className='text-black'>{order.receiverAddress}</p>
                        <p className='mt-2'>Delivery City:</p> <p className='text-black'>{order.receiverCity}</p></div>
                        <div className='items-center inline-block justify-center text-sm   ml-14'>
                          <p>Order Date:</p>
                          <p className='text-black'> {new Date(order.currentTime).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                          <p className='mt-2'>Ratings:</p> <p className='text-[#2f80ed] flex'><FaStar/><FaStar/><FaStar/><FaStar className='text-[#ccf0fb]'/><FaStar className='text-[#ccf0fb]'/></p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className='text-center font-extrabold text-2xl'>No orders found</p>
          )}

          {/* Pagination */}
          {userOrders.length > ordersPerPage && (
            <ul className="flex justify-center mt-12">
            <li>
              <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-6 py-1 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">Prev</button>
            </li>
            {Array.from({ length: Math.ceil(userOrders.length / ordersPerPage) }, (_, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)} className={`px-2 py-1 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800'}`}>{index + 1}</button>
              </li>
            ))}
            <li>
              <button onClick={goToNextPage} disabled={currentPage === Math.ceil(userOrders.length / ordersPerPage)} className="px-6 py-1 ml-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600">Next</button>
            </li>
          </ul>

    )}
    </>
    )}
    </div>


      );
    };

export default UserHistoryData;
