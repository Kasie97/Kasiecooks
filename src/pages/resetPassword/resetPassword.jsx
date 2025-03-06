import './resetPassword.css'
import { IoMail } from "react-icons/io5";
import axios from 'axios';
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';
import React, { useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import {   apiPost  } from "../../utils/api";
import Navbar from '../../components/nabvar/navbar';
const ResetPassword = () => {

    const [isTypingEmail, setIsTypingEmail] = useState(false);
    const { resetToken } = useParams();
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
    
     
        await apiPost(`/users/forgot-password`,{
      
        resetToken,
        email,
      });

      // Show SweetAlert on success
      Swal.fire({
        title: 'Password Reset Email Sent!',
        text: 'Please check your email for instructions on resetting your password.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          // Redirect to the login page or any other desired page
          Navigate('/');
        }
      });
     } catch (error) {
      console.error('Password reset failed:', error.message);
      if (error.response) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message ||  'Please check your internet connection and try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Please check your internet connection and try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } finally {
      setLoading(false);
    }
    
  }

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setIsTypingEmail(e.target.value.trim() !== '');
};

    return (
        <main className='flex flex-col md:flex-row'>
       <div className='w-3/5'>
       
       <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707169125/Desktop_-_3_zsrahn.png" alt="" className='h-screen w-full relative'/>
       <div className='absolute top-0'>
       <Navbar />
       </div>
     
      
      </div>
        <div className='md:w-2/5 mt-[-700px] sm:mt-24'>
          <h3 className='naija text-[#2f80ed] text-center capitalize font-extrabold text-3xl'>Kasie Cooks</h3>
          <p className='text-center text-3xl font-semibold mt-6'>Reset your password</p>
          <p className='text-sm text-center text-gray-400 mt-4'>Enter your email below and we'll send you instructions on <br /> how to reset your password.</p>
       
          <div className="flex items-center justify-center mt-5 mb-5">
          <div className="flex items-center justify-center">

</div>

</div>







<div>
            <div className='ml-10 mr-10 mt-6'>
               
            <label className="block text-[#2f80ed] text-sm">
              Email </label>
              <div className='relative'> 
              {!isTypingEmail &&  <IoMail className='absolute top-3 left-2 text-[#2f80ed] text-extrabold'/>}
              <input
                type="email"
                placeholder=""
                name="email"
                value={email}
                onChange={handleInputChange}
                className="border rounded-lg w-full py-1 px-2 mt-1 focus:outline-none bg-[#f5f5f5] focus:border-blue-500" />
           
            </div>
            </div>
          

 


            <div className='ml-10 mr-10 mt-8 text-sm'>
            <button 
                  onClick={handleResetPassword}
                  type="submit"
                className='bg-[#2f80ed] text-white text-bold w-full border p-2 rounded-2xl'
                  disabled={loading || !email}
              >
                  {loading ? (
                      <p className="gap-2 ml-44 flex items-center">
                          <CircleLoader color="#fff" size={20} />
                          <span className="">Submitting...</span>
                      </p>
                  ) : (
                      'Reset Password'
                  )}
              </button>

            <Link to="/sign-in">
<p className=' mt-8 text-sm text-center text-gray-400 cursor-pointer'>Go back to <span className='text-[#2f80ed] font-semibold underline'>Sign in</span></p>
          </Link>
          </div>
</div>

        </div>
      </main>
      
    );
}
 

 
export default ResetPassword;