import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosLock } from "react-icons/io";
import './resetPassword.css';
import {   apiPost  } from "../../utils/api";
import Navbar from '../../components/nabvar/navbar';
const NewPassword = () => {
    const { token } = useParams();
    console.log('Reseter password Token:', token);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [isTypingConfirmPass, setIsTypingConfirmPass] = useState(false);
    const Navigate = useNavigate();
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleResetPassword = async () => {
      setLoading(true);
      try { 
            await apiPost(`/users/reset-password/${token}`, { password, confirmPassword })
        // Show SweetAlert on success
        Swal.fire({
            title: 'Password Reset Successfully!',
            text: 'Your password has been reset successfully. You can now log in.',
         
          icon: 'success',
          showConfirmButton: false,
        })
            // Close SweetAlert after 2 seconds
            setTimeout(() => {
              Swal.close();
              // Navigate to the desired page
              Navigate('/sign-in');
            }, 4000);
      } catch (error) {
          setLoading(false);
        console.error('Password reset failed:', error.message);
        console.log(error)
        // Handle error and display to the user
        Swal.fire({
          title: 'Error',
          text: error.response.data.message ||  'Please check your internet connection and try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };
  
    const handlePasswordChange = (e) => {
        setpassword(e.target.value);
        setIsTypingPassword(e.target.value.trim() !== '');
        setErrors({}); // Clear error messages
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setIsTypingConfirmPass(e.target.value.trim() !== '');
        setErrors({}); // Clear error messages
    };
    
      
    return (
        <main className='flex flex-col md:flex-row'>
            <div className='w-3/5'>
       
       <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707169125/Desktop_-_3_zsrahn.png" alt="" className='h-screen w-full relative'/>
       <div className='absolute top-0'>
       <Navbar />
       </div>
     
      
      </div>
            <div className='md:w-2/5 mt-[-700px] sm:mt-52'>
                <h3 className='naija text-[#2f80ed] text-center capitalize font-extrabold text-3xl'></h3>
                <p className='text-center text-3xl font-semibold mt-6'>Choose a new password</p>

                <div className="flex items-center justify-center mt-5 mb-5">
                    {/* Your content here */}
                </div>

                <div>
                    <div className='ml-10 mr-10 mt-8 text-sm'>
                        <label className="block  text-[#2f80ed]">
                            Password
                        </label>
                        <div className="relative">
                            {!isTypingPassword && <IoIosLock className='absolute top-3 left-2 text-[#2f80ed] text-extrabold' />}
                            <input
                                type={showPassword ? 'text' : 'password'}
                          
                                id="password"
    name='password'
    value={password}
    onChange={handlePasswordChange}
                                className="border rounded-lg w-full py-1 px-2 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500"
                                // onChange={(e) => setIsTypingPassword(e.target.value.trim() !== '')}
                                required />
                            <button
                                type="button"
                                className="absolute right-2 top-3 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                                >
                                {showPassword ? <FaEye className='text-[#488fee]' /> : <FaEyeSlash className='text-[#488fee]' />}
                            </button>
                        </div>
                    </div>

                    <div className='ml-10 mr-10 mt-8 text-sm'>
                        <label className="block text-[#2f80ed]">
                            Confirm Password
                        </label>
                        <div className="relative">
                            {!isTypingConfirmPass && <IoIosLock className='absolute top-3 left-2 text-[#2f80ed] text-extrabold' />}
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="border rounded-lg w-full py-1 px-2 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500"
                                required
                                // onChange={(e) => setIsTypingConfirmPass(e.target.value.trim() !== '')} 
                                />
                            <button
                                type="button"
                                className="absolute right-2 top-3 text-gray-500"
                                onClick={() => setConfirmShowPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEye className='text-[#488fee]' /> : <FaEyeSlash className='text-[#488fee]' />}
                            </button>
                        </div>
                    </div>

                    <div className='ml-10 mr-10 mt-8 text-sm'>

                        <button
                         onClick={handleResetPassword}
                         disabled={loading || !password}
                         type="submit"
                         className='bg-[#2f80ed] text-white text-bold w-full border p-2 rounded-2xl'>
                            
                       
            
                {loading ? (
                    <p className="gap-2 ml-44 flex items-center">
                        <CircleLoader color="#fff" size={20} />
                        <span className="">Submitting...</span>
                    </p>
                ) : (
                    'Confirm'
                )}
            </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default NewPassword;
