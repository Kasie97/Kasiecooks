import React,{useState} from 'react';
import './signIn.css'
import {   apiPost  } from "../../utils/api";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosLock } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../utils/useContext'
import { CircleLoader } from 'react-spinners';
import Navbar from '../../components/nabvar/navbar';
const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const [isTyping, setIsTyping] = useState(false);
    const [isTypingEmail, setIsTypingEmail] = useState(false);
    const [isTypingPhone, setIsTypingPhone] = useState(false);
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [isTypingConfirmPass, setIsTypingConfirmPas] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { handleLogin } = useUser();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setIsTypingEmail(e.target.value.trim() !== '');
      setErrorMessage('');
    };
    
    const handlePasswordChange = (e) => {
      setFormData({ ...formData, password: e.target.value });
      setIsTypingPassword(e.target.value.trim() !== '');
      setErrorMessage('');
    };
    
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    
    //   try {
    //     setLoading(true);
    //     const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/users/login`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(formData),
    //     });
    
    //     const responseData = await response.json();

    //     if (response.ok ) {
    //       console.log(responseData);
    //       const id = responseData.user._id;
    //       localStorage.setItem('_id', id);
    //       const token = responseData.user.token
    //       localStorage.setItem('token',token)
    //       handleLogin(responseData.user);
    //       console.log(responseData.user)
    
         
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Login Successful!',
    //         text: 'You have successfully logged in.',
    //         showConfirmButton: false,
        
    //       });
    
         
    //       setTimeout(() => {
    //         Swal.close();
    //         Navigate('/dashboard');
    //       }, 2000);
    //     } else {
    //       const errorData = responseData;
    //       setErrorMessage(errorData.message);
    
    //       // Show SweetAlert error message
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Login Failed',
    //         text: errorData.message || 'Please check your internet connection and try again.',
    //       });
    //     }
    //   } catch (error) {
    //     console.error('Error during login:', error);
    // console.log(error)
    //     // Show SweetAlert error message for unexpected errors
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Login Failed',
    //       text: 'Please check your internet connection and try again.',
    //     });
    //   } finally {
    //     // Ensure that setLoading(false) is called even in case of errors
    //     setLoading(false);
    //   }
    // };
    


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const responseData = await response.json();
    
        if (response.ok) {
          console.log(responseData);
          const { _id: id, token, role } = responseData.user;
          localStorage.setItem('_id', id);
          localStorage.setItem('token', token);
          handleLogin(responseData.user);
          console.log(responseData.user);
    
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have successfully logged in.',
            showConfirmButton: false,
          });
    
          setTimeout(() => {
            Swal.close();
            if (role === 'admin') {
              Navigate('/admin-dashboard');
            } else {
              Navigate('/dashboard');
            }
          }, 2000);
        } else {
          const errorData = responseData;
          setErrorMessage(errorData.message);
    
          // Show SweetAlert error message
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorData.message || 'Please check your internet connection and try again.',
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
        console.log(error);
    
        // Show SweetAlert error message for unexpected errors
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your internet connection and try again.',
        });
      } finally {
        // Ensure that setLoading(false) is called even in case of errors
        setLoading(false);
      }
    };
    
    return (
        <main className='flex'>
        <div className='w-3/5'>
       
         <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707169125/Desktop_-_3_zsrahn.png" alt="" className='h-screen w-full relative'/>
         <div className='absolute top-0'>
         <Navbar />
         </div>
       
        
        </div>
        <div className='w-2/5 mt-14'>
          <h3 className='naija text-[#2f80ed] text-center capitalize font-extrabold text-3xl'>Kasie Cooks</h3>
          <p className='text-center text-3xl font-semibold mt-6'>Welcome Back</p>
          <div className='ml-10 mr-10 mt-6'>
            <button className='flex item-center justify-center gap-2 border-gray-200 text-gray-400 w-full border p-2 rounded-lg'>
                <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707175810/google_bi5nsn.png" alt="" className='w-5 h-5 mt-1' />Sign in with Google</button>
          </div>
          <div className="flex items-center justify-center mt-5 mb-5">
          <div className="flex items-center justify-center">
  <div className="flex items-center">
    <hr className="border-t border-gray-300 w-56" />
    <p className="text-gray-400 uppercase mx-4">or</p>
    <hr className="border-t border-gray-300 w-56" />
  </div>
</div>

</div>






<form onSubmit={handleSubmit} className="login-form">
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
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg w-full py-1 px-2 mt-1 focus:outline-none bg-[#f5f5f5] focus:border-blue-500" />
           
            </div>
            </div>
          

 

            <div className='ml-10 mr-10 mt-8 text-sm'>
            <label className="block  text-[#2f80ed]">
               Password
              </label>
            <div className="relative">
            {!isTypingPassword &&      <IoIosLock className='absolute top-3 left-2 text-[#2f80ed] text-extrabold'/>}
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name='password'
                className="border rounded-lg w-full py-1 px-2 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500" 
                onChange={handlePasswordChange}
                value={formData.password}
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


            <Link to='/reset-password'><p className=' mt-8 text-sm text-center text-gray-400 cursor-pointer'>Forgotten Password? <span className='text-[#2f80ed] font-semibold underline'>Click here</span></p></Link>
            <div className='ml-10 mr-10 mt-8 text-sm'>
            <button
              type="submit"
              className='bg-[#2f80ed] text-white text-bold w-full border p-2 rounded-2xl'
              disabled={loading}
            >
              {loading ? (
                <>
                  <p className='gap-2 ml-48 flex items-center'>
                    <CircleLoader color="#fff" size={20} />
                    <span className="">Submitting...</span>
                  </p>
                </>
              ) : (
                'Login'
              )}
            </button>

         
<Link to='/sign-up'><p className=' mt-8 text-sm text-center text-gray-400 cursor-pointer'>Don't have an account? <span className='text-[#2f80ed] font-semibold underline'>Sign up here</span></p></Link>
      
          </div>
</div>
</form>
        </div>
        
      </main>
      
    );
}
 

 
export default SignIn;