import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
 
const Navbar = () => {
    return (
        <div className='bg-white h-20'>
        <div className='flex items-center gap-32 justify-between'>
         <div className='ml-24 flex '>
            <img src="src/assets/kc.png" alt="Kasie cooks logo" width="90" height="90" />
            <img src="src/assets/kasc.png" alt="Kasie cooks logo" width="90" height="90" />
         </div>
         <div className=''>
            <ul className='flex items-center mt-4 justify-items-center gap-10 mr-32'>
                <li><Link to='/'>Home</Link></li>
                <li><Link>Services</Link></li>
                <li><Link>Menu</Link></li>
                <li><Link>Contacts</Link></li>
                <li className='bg-[#2f80ed] pl-6 pt-2 pb-2 pr-6 rounded-xl font-semibold'><Link to='/sign-up'> <p className='text-white'> Sign Up</p></Link></li>
            </ul>
         </div>
        </div>
        </div>
    );
}
 

 
export default Navbar;