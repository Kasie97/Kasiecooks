import React from 'react'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
    return (
        <footer className=" bg-[#2f80ed] text-white">
       
           
             <div className='flex items-center justify-between ml-52 mr-52'>

        <div>
            <p className='text-sm font-extralight'>© 2023 EatGoodNaija| Powered by EatGoodNaija</p>
        </div>

        
        <div>  <SocialIcon url='https://www.facebook.com/profile.php?id=100093726890134'  fgColor='white' bgColor='transparent'/>
                <SocialIcon url='https://twitter.com/FoodPadi'  fgColor='white' bgColor='transparent'/>
                <SocialIcon url='https://www.linkedin.com/in/erhimu-ebru-blessing-29aa4917b/' fgColor='white' bgColor='transparent'/>
                <SocialIcon url='https://www.instagram.com/food_padi'  fgColor='white' bgColor='transparent'/>
               </div>
              
            </div>
       
      </footer>
      
      
    );
}
 
export default Footer;