import React, { useContext, useEffect, useState } from 'react'
import faqicon from "../assets/FaqIcon.png"
import festofy_logo from "../assets/FestoFy_Logo.png";
import { EventAppContext } from '../Context/EventContext';
import Header from './Header';
import {Link} from "react-router-dom"
const Navbar = () => {
  const [hover,sethover]=useState("Home")
  const { setRegister } = useContext(EventAppContext)
  return (
    <div className='background bg-white rounded-[0.8rem] mt-7'>
      <div className='flex justify-between items-center p-5 min-w-[50px] max-w-[100%] mx-auto'>
        <p className=' text-white text-shadow:0 2px 4px rgba(0,0,0,0.5) font-extrabold text-4xl font-[Fredoka]'>FestoFy</p>
        <ul className='list-none flex w-[20%] justify-between font-semibold items-center gap-4 text-white text-shadow:0 2px 4px rgba(0,0,0,0.5)'>
          <li className={`sm:block hidden cursor-pointer ${hover==="Home"?"underline underline-offset-4 decoration-2":""}`} onClick={()=>{sethover("Home")}}><Link to="/Home">Home</Link></li>
          
          <li className={`hidden cursor-pointer`}><Link to="/Event">Events</Link></li>

          <li className={`sm:block hidden cursor-pointer ${hover==="Galary"?"underline underline-offset-4 decoration-2":""}`} onClick={()=>{sethover("Galary")}}>Gallery</li>

          <a href="#Aboutpg"><li className={`md:block hidden cursor-pointer ${hover==="About"?"underline underline-offset-4 decoration-2":""}`} onClick={()=>{sethover("About")}}>About</li></a>
          <li className={`sm:block hidden cursor-pointer ${hover==="Pricing"?"underline underline-offset-4 decoration-2":""}`} onClick={()=>{sethover("Pricing")}}>Pricing</li>
        </ul>

        <div className='list-none flex justify-between items-center m-3'>
          <li className='sm:hidden block text-white text-shadow:0 2px 4px rgba(0,0,0,0.5) font-semibold'>Pricing</li>
        </div>
        <div className='flex justify-center gap-2'> 
          <button className='bg-white text-black w-[80px] rounded-[20px] p-[5px] cursor-pointer' onClick={() => { setRegister(true) }}>SignUp</button>
          {/* <button><img src={faqicon} className='w-6' alt="" /></button> */}
        </div>
      </div>
      <Header/>
    </div>
  )
}

export default Navbar
