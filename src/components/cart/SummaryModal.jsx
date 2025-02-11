import React, { useState, useEffect } from 'react';
import { apiPost } from "../../utils/api";
import OrderReceiptModal from './OrderReceiptModal';
import { CircleLoader } from 'react-spinners';
import { useUser } from '../../utils/useContext';

const SummaryModal = ({ isOpen, onClose, cartItems, totalPrice, onPlaceOrder }) => {
    const { user } = useUser();
    const userId = user ? user.id : localStorage.getItem('id');
    const [errorMessage, setErrorMessage] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [paymentOption, setPaymentOption] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [receiverCity, setReceiverCity] = useState('');
    const [loading, setLoading] = useState(false);
    const nigeriaStates = [
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
      'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
      'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
      'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];
    useEffect(() => {
      if (user && user.fullName) {
          setReceiverName(user.fullName);
      }
  }, [user]);



  useEffect(() => {
    if (user && user.phoneNumber) {
        setReceiverPhoneNumber(user.phoneNumber);
    }
}, [user]);


    if (!isOpen) return null;

    const sendEmail = async (orderData, email) => {
        try {
            await apiPost('/order-email/send', { orderData, email });
            console.log('Email sent successfully to', email);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    const handlePlaceOrder = async () => {
      setLoading(true);
  
      try {
          if (cartItems.length === 0) {
              setLoading(false);
              setErrorMessage('Cart is empty. Cannot place order.');
              return;
          }
  
          if (!paymentOption) {
              setLoading(false);
              setErrorMessage('Please select a payment method.');
              return;
          }
  
          if (!receiverName || !receiverAddress || !receiverCity || !receiverPhoneNumber) {
              setLoading(false);
              setErrorMessage('Please fill in all receiver details.');
              return;
          }
  
          const currentTime = new Date(); // Get the current date and time
          const orderData = {
              cartItems,
              totalPrice: totalPrice,
              paymentOption: paymentOption,
              userId: userId,
              receiverName: receiverName,
              receiverAddress: receiverAddress,
              receiverCity: receiverCity,
              currentTime: currentTime,
              receiverPhoneNumber:receiverPhoneNumber // Include the current time in the order data
          };
  
          const response = await apiPost('/orders', orderData);
          const orderId = response.data._id;
          if (orderId) {
              const updatedOrderData = { ...orderData, orderId };
              setOrderData(updatedOrderData);
              console.log('Order placed successfully!', updatedOrderData);
              console.log('Order ID:', orderId);
  
              if (user) {
                  await sendEmail(updatedOrderData, user.email);
              } else {
                  const email = localStorage.getItem('email');
                  if (email) {
                      await sendEmail(updatedOrderData, email);
                  }
              }
          } else {
              setErrorMessage('Failed to place order. Please try again.');
          }
      } catch (error) {
          console.error('Failed to place order:', error);
          setErrorMessage('Failed to place order. Please try again.');
      } finally {
          setLoading(false);
      }
  };
  

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.value);
        setErrorMessage('');
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                <div className="bg-white p-6 rounded-lg overflow-y-auto max-h-[80vh]">
                    <h2 className="text-xl mt-4 font-bold uppercase mb-8 text-center">Cart Summary</h2>

                    {cartItems.length === 0 ? (
                        <>
                            <p className="text-center text-red-500">Cart is empty</p>
                            <button className="bg-gray-400 text-white ml-6 mt-8 px-4 py-2 rounded" onClick={onClose}>Add To Cart</button>
                        </>
                    ) : (
                        <>
                            <table className="w-full border-collapse border">
                                <thead>
                                    <tr>
                                        <th className="px-4 mt-4 py-2 border">S/N</th>
                                        <th className="px-4 mt-4 py-2 border">Name</th>
                                        <th className="px-4 mt-4 py-2 border">Quantity</th>
                                        <th className="px-4 mt-4 py-2 border">Price</th>
                                        <th className="px-4 mt-4 py-2 border">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={item.id} className="border">
                                            <td className="px-4 mt-4 py-8 border">{index + 1}</td>
                                            <td className="px-4 mt-4 py-8 border">
                                                <div className='flex gap-2'>
                                                    <img src={item.imageUrl} alt="" className='w-8 h-8 rounded-full' />
                                                    <p className='uppercase mt-2 text-sm'>{item.dishName}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 mt-4 py-8 text-center border text-sm">{item.quantity}</td>
                                            <td className="px-4 mt-4 py-8 border text-sm">&#x20A6;{item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                            <td className="px-4 mt-4 py-8 border text-sm">&#x20A6;{(item.quantity * item.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="mt-8 text-center text-sm font-semibold">Total Items: {totalItems}</p>
                            <p className="mt-2 text-center text-md font-bold">Total Price: &#x20A6;{totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>

                            <div className='flex items-center justify-center mt-8'>
                            <input 
    type="text" 
    className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2" 
    placeholder="Receiver Name" 
    value={receiverName || (user && user.fullName)} 
    onChange={(e) => setReceiverName(e.target.value)} 
/>

<select
   id="receiverAddress"
   className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
   name="receiverAddress"
   value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)}
   required
 >
   <option value="">Select a State</option>
   {nigeriaStates.map(state => (
     <option key={state} value={state}>{state}</option>
   ))}
 </select>
                            
                                <input type="text" className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2" placeholder="Receiver City" value={receiverCity} onChange={(e) => setReceiverCity(e.target.value)} />
                            </div>

                            <div className="flex items-center justify-center mt-8 mb-8">
                               

                                <div>
                                <input 
    type="text" 
    className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2" 
    placeholder="Receiver Phone Number" 
    value={receiverPhoneNumber || (user && user.phoneNumber)} 
    onChange={(e) => setReceiverPhoneNumber(e.target.value)} 
/>
                                <select className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2" onChange={handlePaymentOptionChange}>
                                    <option value="">Select Payment Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="POS">POS</option>
                                    <option value="Bank_Transfer">Bank Transfer</option>
                                </select>

                                </div>
                                </div>

                                {errorMessage && (
                                    <div className="mb-8 text-center text-red-500">
                                        {errorMessage}
                                        <button className="text-blue-500 ml-2" onClick={() => setErrorMessage('')}>Dismiss</button>
                                    </div>
                                )}

                            
                           

                            <div className='flex items-center gap-4 justify-center'>

                            <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Add To Cart</button>
                            <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded" onClick={handlePlaceOrder} disabled={loading}>
                                    {loading ? (
                                        <p className="gap-2 flex items-center">
                                            <CircleLoader color="#fff" size={20} />
                                            <span className="ml-2">Submitting...</span>
                                        </p>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>

                            
                            </div>
                        </>
                    )}
                </div>
            </div>

            <OrderReceiptModal isOpen={!!orderData} onClose={() => setOrderData(null)} orderData={orderData} />
        </>
    );
};

export default SummaryModal;
