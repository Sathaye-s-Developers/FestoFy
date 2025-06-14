import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import AddIcon from "../../../assets/add.png"
const E_Navbar = () => {

  return (
    <div className='bg-white dark:bg-black rounded-[0.8rem] mt-7'>
      <div className='flex justify-between items-center p-5 min-w-[50px] max-w-[100%] mx-auto'>
        <p className='text-black  text-shadow:0 2px 4px rgba(0,0,0,0.5) font-extrabold text-4xl font-[Fredoka]'>FestoFy</p>
        <ul className='list-none flex w-[20%] justify-between font-semibold items-center gap-4 text-black text-shadow:0 2px 4px rgba(0,0,0,0.5)'>
          <li className='sm:block hidden cursor-pointer'><Link to="/Home">Home</Link></li>
          {/* <li className='sm:block hidden'><select className='outline-none bg-transparent text-white' onChange={onchangehandler} value={selected}><option value="Events">Events</option><option className='Sports'>Sports</option><option className='Cultural'>Cultural</option></select></li> */}

          <li className='sm:block hidden cursor-pointer'>Events</li>
          <li className='md:block hidden cursor-pointer'>About</li>
          <li className='sm:block hidden cursor-pointer'>Pricing</li>
        </ul>
        <div className='flex justify-center items-center gap-2'>
          <button><Link to="/AddEvent"><img src={AddIcon} alt="AddIcon" className='w-[35px] cursor-pointer' /></Link></button>
          <button className='bg-black text-white w-[35px] h-[35px] rounded-full p-[5px] font-bold text-[18px]  cursor-pointer'>L</button>
        </div>
      </div>
    </div>
  )
}

export default E_Navbar
