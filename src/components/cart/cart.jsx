import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketItems, removeFromBasket, addToBasket, selectBasketTotal, deleteFromBasket } from '../../../src/components/features/BasketSlice';
import { FaRegTrashAlt } from "react-icons/fa";
import SummaryModal from './SummaryModal';
import './cart.css'
const Cart = () => {
    const dispatch = useDispatch();

    const basketItems = useSelector(selectBasketItems);
    const totalBasketPrice = useSelector(selectBasketTotal);
    const [showModal, setShowModal] = useState(false);
    const handleDecreaseQuantity = (itemId) => {
        dispatch(removeFromBasket({ id: itemId }));
    };

    const handleIncreaseQuantity = (id, imageUrl, dishName, measurement, price) => {
        dispatch(addToBasket({ id, dishName, measurement, price, imageUrl }));
      };
      

    const handleDeleteFromBasket = (id) => {
        dispatch(deleteFromBasket({ id }));
    };   

    const handlePlaceOrder = () => {
        setShowModal(true);
    };

    return (
        <><div>
     <h2 className='text-2xl text-center uppercase  flex gap-2'>My Cart <div className=' p-2 w-6 h-6 rounded-full font-thin text-sm mt-1 text-center bg-blue-500 text-white'> <p className='-mt-1 text-center'>{basketItems.length}</p></div></h2>
        </div>
        <div className="cart p-4 overflow-y-auto">
           
                <ul>
                    {basketItems.map(item => (
                        <li className=' border-b border-gray-200 py-4' key={item.id}>
                            <div className="flex items-center space-x-4">
                                <img src={item.imageUrl} className='rounded-full w-12 h-12 mt-16' alt="" />
                                <div>
                                    <p className='text-sm font-semibold capitalize mb-2'>{item.dishName}</p>
                                    <p className='text-sm'>
                                        &#x20A6; {item.price}
                                    </p>
                                </div>
                            </div>

                            <div className='flex ml-16 -mt-2 items-center space-x-4'>
                                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg" onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
                                <span>{item.quantity}</span>
                                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg" onClick={() => handleIncreaseQuantity(item.id, item.dishName, item.measurement, item.price, item.imageUrl)}>+</button>
                                <button className="px-3 py-1 text-red-500 text-2xl rounded-lg" onClick={() => handleDeleteFromBasket(item.id)}><FaRegTrashAlt /></button>
                            </div>
                        </li>
                    ))}
                </ul>
               


               
                <SummaryModal isOpen={showModal} onClose={() => setShowModal(false)} cartItems={basketItems} totalPrice={totalBasketPrice} />
            </div>
 <div className="mt-4">
                    <p className="text-lg mb-2 font-semibold">Total Items: {basketItems.length}</p>
                    <p className="text-lg font-semibold">Total Price: ₦{parseFloat(totalBasketPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                </div>
            <div className='mt-4'>
                    <button className='bg-[#2f80ed] text-white text-bold w-full border p-2 rounded-2xl' onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </>
    );
};

export default Cart;
