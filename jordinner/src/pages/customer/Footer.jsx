import React from 'react'
import footer from '/src/assets/footer.png'
import Link from 'next/link'
import LogoFooter from '/src/assets/LogoFooter.png'
import Image from "next/image";
import { MdOutlineFoodBank } from "react-icons/md";


function Footer() {
  return (
    <div className='footerContainer'>
       <Image className="footerImg" src={LogoFooter} alt=""></Image><br></br><br></br>
      <div className='footer'>
         <Link href='/customer/AboutUs'><span>About Us</span></Link><br></br>
         <Link href='/customer/Policies'><span>Terms, Conditions & Privacy Policy</span></Link><br></br>
         <Link href='/customer/ContactUs'><span>Contact Us</span></Link><br></br><br></br>
        </div>
        <div className='copyRights'>
            <span>&copy; 2024 JorDinner</span>
        </div>
    </div>

  )
}

export default Footer