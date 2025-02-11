import React, { useEffect, useState } from 'react';
import SideBar from '../../components/sidebar/sidebar';
import SearchComponents from '../../components/search/search';
import { apiGet } from '../../utils/api';
import { FaStar } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import './history.css';

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [ordersPerPage] = useState(6);

    

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await apiGet('/orders');
                setHistory(response.data);
                console.log(response.data);
            } catch (error) {
                setError(false);
            }
            setLoading(false);
        };
        fetchHistory();
    }, []); 

    if (loading) return 'Loading...';
    if (error) return 'Error!';

    const indexOfLastOrder = (currentPage +1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    const currentOrders = history.slice(indexOfFirstOrder, indexOfLastOrder);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    }



    return (
        <> 
            <div>
                <div>
                    <SideBar/>
                </div>
                <div>
                    <SearchComponents/>
                </div>
                <div className='ml-32'>
                    <p className='flex first-letter: capitalize p-6'>HISTORY</p>
                </div>
                
<div >
     
     <ul>
     {currentOrders.map((order) => (
         <li key={order._id}>
           <div className='ml-40'>
             <div className='flex items-center justify-between text-gray-500'> 
               <div className='mb-4'><p className='text-sm'>Order ID: <span className='text-black font-semibold'>#{order._id.substring(order._id.length - 6)}</span></p>
               <p className='text-sm'>Total</p> <p className='text-black text-sm font-semibold'>&#x20A6;{order.totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p></div>
               <div className='items-center inline-block justify-center text-sm  text-gray-500'>
                 <p className='text-sm'>Payment Method:</p>
                 <p className='text-black '> {order.paymentOption}</p>
               </div>
               <div className='items-center inline-block justify-center text-sm text-gray-500'>
                 <p className='text-sm mt-2 text-left'>Receiver's Name:</p><p className='text-black capitalize'> {order.receiverName}</p>
                <p className='text-sm mt-2'>Receiver's Phone: </p><p className='text-black'>{order.receiverPhoneNumber}</p>
             </div> 
               <div  className='items-center inline-block justify-center text-sm'><p>Delivery State:</p> <p className='text-black'>{order.receiverAddress}</p>
               <p className='mt-2'>Delivery City:</p> <p className='text-black'>{order.receiverCity}</p></div>
               <div className='items-center inline-block justify-center text-sm  mr-44'>
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
            </div>

            <>
      <div className='ml-44 mt-8'>
      <ReactPaginate
    pageCount={Math.ceil(history.length / ordersPerPage)}
    pageRangeDisplayed={2}
    marginPagesDisplayed={1} 
    onPageChange={handlePageClick}
    previousLabel={"Prev"}
    nextLabel={"Next"}
    breakLabel={"..."}
    previousClassName={"pagination-button"}
    nextClassName={"pagination-button"}
    breakClassName={"pagination-break"}
    pageClassName={"pagination-page"}
    containerClassName={"paginationBttns"}
    previousLinkClassName={"previousBttn"}
    nextLinkClassName={"nextBttn"}
    disabledClassName={"paginationDisabled"}
    activeClassName={"paginationActive"}
/>
        </div>
    </>
        </>
        

    );
} 



export default HistoryPage;


