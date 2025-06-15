import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import AddIcon from "../../../assets/add.png"
import { EventAppContext } from '../../../Context/EventContext'
const E_Navbar = () => {
  const {username}=useContext(EventAppContext)
  
  return (
    <div className='bg-white rounded-[0.8rem] mt-7'>
      <div className='flex justify-between items-center p-5 min-w-[50px] max-w-[100%] mx-auto'>
        <p className='text-black  text-shadow:0 2px 4px rgba(0,0,0,0.5) font-extrabold text-4xl font-[Fredoka]'>FestoFy</p>
        <ul className='list-none flex w-[20%] justify-between font-semibold items-center gap-4 text-black text-shadow:0 2px 4px rgba(0,0,0,0.5)'>
          <li className='sm:block hidden cursor-pointer'><Link to="/Home">Home</Link></li>
          <li className='sm:block hidden cursor-pointer'><Link to="/Event">Events</Link></li>
          <li className='md:block hidden cursor-pointer'>About</li>
          <li className='sm:block hidden cursor-pointer'>Pricing</li>
        </ul>
        <div className='flex justify-center items-center gap-2'>
          <button><Link to="/AddEvent"><img src={AddIcon} alt="AddIcon" className='w-[35px] cursor-pointer' /></Link></button>
          <button className='bg-black text-white w-[35px] h-[35px] rounded-full p-[5px] font-bold text-[18px]  cursor-pointer'>{username ? username.charAt(0).toUpperCase() : ''}</button>
        </div>
      </div>
    </div>
  )
}

export default E_Navbar
