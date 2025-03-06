import React,{useState} from 'react';
import './signUp.css'
import { IoPerson } from "react-icons/io5";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosLock } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';
import {   apiPost  } from "../../utils/api";
import Navbar from '../../components/nabvar/navbar';

const SignUp = () => {
  const Navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const [isTypingEmail, setIsTypingEmail] = useState(false);
    const [isTypingfullName, setIsTypingFullName] = useState(false);
    const [isTypingPhone, setIsTypingPhone] = useState(false);
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [isTypingConfirmPass, setIsTypingConfirmPas] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
  });
  

  // const handleChangeFullName = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  //   setIsTypingFullName(e.target.value.trim() !== '');
  //   setErrors({});
  // };

  const handleChangeFullName = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    setIsTypingFullName(e.target.value.trim() !== '');
    if (name === "fullName") {
        const names = value.split(" ");
        if (names.length < 2) {
            setErrors({
                ...errors,
                fullName: "Please enter both first name and last name",
            });
        } else {
            setErrors({
                ...errors,
                fullName: "", 
            });
        }
    }
};

  
  const handleChangeEmail = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsTypingEmail(e.target.value.trim() !== '');
    setErrors({});
  };
  
  const handleChangePhone = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsTypingPhone(e.target.value.trim() !== '');
    setErrors({});
  };
  
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    setIsTypingPassword(e.target.value.trim() !== '');
    setErrors({});
  };
  
  const handleConfirmPasswordChange = (e) => {
    setFormData({ ...formData, confirmPassword: e.target.value });
    setIsTypingConfirmPas(e.target.value.trim() !== '');
    setErrors({});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        await apiPost("/users/signup", formData);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
       
        Swal.fire({
          icon: 'success',
          title: 'Account Created Successfully!',
          text: 'Click on the link sent to your email to verify your account.',
        }).then((result) => {
          if (result.isConfirmed) {
            Navigate('/sign-in');
          }
        });
      } catch (error) {
        // Handle error
        console.error('Error during signup:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message || 'Please check your internet connection and try again.',
        });
      } finally {
        setLoading(false); 
      }
    } else {
     
      setErrors(validationErrors);
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill out all required fields correctly!',
      });
    }
  };
  

  const validateFormData = (data) => {
    const errors = {};

    // Validate name
    if (!data.fullName.trim()) {
        errors.fullName = 'Full Name is required';
    }

    // Validate email
    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
        errors.email = 'Invalid email address';
    }

    // Validate phone
    if (!data.phoneNumber.trim()) {
        errors.phoneNumber = 'Phone number is required';
    } else if (!isValidPhone(data.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number';
    }

    if (!data.password || !data.password.trim()) {
      errors.password = 'Password is required';
    } else {
      delete errors.password; 
    }
  
    // Validate confirmPassword
    if (!data.confirmPassword || !data.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    } else {
      delete errors.confirmPassword; 
    }
    return errors;
};

  const isValidEmail = (email) => {
      const atIndex = email.indexOf('@');
      const dotIndex = email.lastIndexOf('.');

      return atIndex !== -1 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
  };

  const isValidPhone = (phone) => {
      return /^[0-9+]+$/.test(phone);
  };

    return (
        <main className='flex flex-col md:flex-row'>
        <div className='w-3/5'>
       
       <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707169125/Desktop_-_3_zsrahn.png" alt="" className='h-screen w-full relative'/>
       <div className='absolute top-0'>
       <Navbar />
       </div>
     
      
      </div>
     <div className='md:w-2/5 mt-[-850px] sm:mt-6'>
          <h3 className='naija text-[#2f80ed] text-center capitalize font-extrabold text-3xl'>Kasie Cooks</h3>
          <p className='text-center text-3xl font-semibold mt-6'>Create a new account</p>
          <div className='ml-10 mr-10 mt-6'>
            <button className='flex item-center justify-center gap-2 border-gray-200 text-gray-400 w-full border p-2 rounded-lg'>
                <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1707175810/google_bi5nsn.png" alt="" className='w-5 h-5 mt-1' />Sign up with Google</button>
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




<form onSubmit={handleSubmit}>


<div>



<div className='ml-10 mr-10'>
  <label className="block text-[#2f80ed] text-sm">Full Name</label>
  <div className='relative'> 
    {!isTypingfullName && <IoPerson className='absolute top-3 left-2 text-[#2f80ed] text-extrabold'/>}
    <input
      type="text"
  
      name="fullName"
      value={formData.fullName}
      onChange={handleChangeFullName}
      className="border rounded-lg w-full py-1 px-2 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500"
    
    />
      <p className="text-red-500 ">{errors.fullName && <span>{errors.fullName}</span>}</p>
    <p className='text-sm text-gray-300'>First name comes first</p>
  </div>
</div>

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
                onChange={ handleChangeEmail }
                className="border rounded-lg w-full py-1 px-2 mt-1 focus:outline-none bg-[#f5f5f5] focus:border-blue-500" />
             <p className="text-red-500 ">{errors.email && <span>{errors.email}</span>}</p>
            </div>
            </div>
          

            <div className='ml-10 mr-10 mt-8 text-sm'>
<label className="block text-[#2f80ed]">
              Phone Number  </label>
              <div className='relative'> 
              {!isTypingPhone &&     <img src='https://res.cloudinary.com/dmfb370xe/image/upload/v1707175459/9ja_ysp51e.jpg' className='absolute w-4 h-4 rounded-full top-3 left-2 text-[#2f80ed] text-extrabold'/>}
              <input
                type="text"
               name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChangePhone}
                className="border rounded-lg w-full py-1 px-2 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500" />
                  <p className="text-red-500 ">{errors.phoneNumber && <span>{errors.phoneNumber}</span>}</p>
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
                className="border rounded-lg w-full py-1 px-2 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500" 
                name='password'
                value={formData.password}
                onChange={ handlePasswordChange }
                required />
  <p className="text-red-500 ">{errors.password && <span>{errors.password}</span>}</p>
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
            {!isTypingConfirmPass &&   <IoIosLock className='absolute top-3 left-2 text-[#2f80ed] text-extrabold'/>}
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="border rounded-lg w-full py-1 px-2 bg-[#f5f5f5] mt-1 focus:outline-none focus:border-blue-500" 
                required 
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={ handleConfirmPasswordChange}
                 />
  <p className="text-red-500 ">{errors.confirmPassword && <span>{errors.confirmPassword}</span>}</p>
              <button
                type="button"
                className="absolute right-2 top-3 text-gray-500"
                onClick={() => setConfirmShowPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye className='text-[#488fee]' /> : <FaEyeSlash className='text-[#488fee]' />}
              </button>
            </div>
            </div>


            <div className='ml-10 mr-10 mt-8 text-sm'>
         
<button
  type="submit"
  className='bg-[#2f80ed] text-white text-bold w-full border p-2 rounded-2xl'
  disabled={loading}
 
>
  {loading ? (
    <>
      <p className='gap-2 ml-44 flex items-center'>
        <CircleLoader color="#fff" size={20} />
        <span className="">Submitting...</span>
      </p>
    </>
  ) : (
    'Create'
  )}
</button>

          
            <Link to='/sign-in'><p className=' mt-4 text-sm text-center text-gray-400 cursor-pointer'>Already have an account? <span className='text-[#2f80ed] font-semibold underline'>Sign in here</span></p> </Link> 
        
          </div>
</div>
</form>
        </div>
        
      </main>
      
    );
}
 

 
export default SignUp;