import React from 'react';
import { useNavigate } from 'react-router-dom';
const OrderReceiptModal = ({ isOpen, onClose, orderData }) => {
    const Navigate = useNavigate();
  const handleClose = () => {
    onClose();
    window.location.reload(); 
  };

  if (!isOpen) return null;
  const orderIdLastSix = orderData.orderId.slice(-6);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-100">
      <div className="bg-white p-6 w-96 rounded-lg">
        <div className='flex items-center justify-center'> 
            <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1708207958/Deliveryman_pushing_cart_gqmtwi.png" alt="" />
        </div>
        <p className='text-sm text-gray-500 mt-8 text-center'>Thanks for your patronage  </p>
        <h2 className="text-xl mt- font-bold uppercase mb-8  text-center text-blue-500">Order Successful!</h2>
        <div className='flex items-center justify-between mt-4'>
            <p className='text-sm'>
            Order ID
            </p>
            <p className=' font-light text-sm'>#{orderIdLastSix}</p> 
         
        </div>
        <div className='flex items-center justify-between mb-6 mt-4'>
            <p className='text-sm'>Payment Method</p>
            <p className=' font-light text-sm capitalize' >{orderData.paymentOption}</p>
        </div>
   
        <div className='flex items-center justify-between mb-6 mt-4'>
            <p className='text-sm capitalize '>total items</p>
            <p className='text-sm'> {orderData.cartItems.length} Items</p>

        </div>

        <ul>
          {orderData.cartItems.map((item, index) => (
            <li key={index}>
                <div className='flex items-center justify-between mt-2'>
                    <p className='text-sm text-[#828282]'>+ {item.dishName}</p>
                    <p className='text-sm  text-[#828282]'>&#x20A6;{item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                </div>
            
            </li>
          ))}
        </ul>

        <div className='flex items-center justify-between mt-6'>
            <p className='text-sm  text-[#828282]'>Total</p>
        <p className='text-sm'> &#x20A6;{orderData.totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
        </div>
        <div className='flex items-center justify-center mt-8'>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleClose}>Okay</button>
        </div>
     
      </div>
    </div>
  );
};

export default OrderReceiptModal;
