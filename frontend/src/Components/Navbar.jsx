import React, { useContext, useEffect, useState } from 'react'
import { EventAppContext } from '../Context/EventContext';
import Header from './Header';
import { Link } from "react-router-dom"
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [hover, sethover] = useState("Home")
  const { setRegister, token, settoken } = useContext(EventAppContext)

  const logout = () => {
    localStorage.removeItem("token")
    settoken("")
  }
  return (
    <div className='background bg-white rounded-[0.8rem] mt-7'>
      <div className='flex justify-between items-center p-5 min-w-[50px] max-w-[100%] mx-auto'>
        <p className=' text-white text-shadow:0 2px 4px rgba(0,0,0,0.5) font-extrabold text-4xl font-[Fredoka]'>FestoFy</p>
        <ul className='list-none flex w-[20%] justify-between font-semibold items-center gap-4 text-white text-shadow:0 2px 4px rgba(0,0,0,0.5)'>
          <li className={`sm:block hidden cursor-pointer ${hover === "Home" ? "underline underline-offset-4 decoration-2" : ""}`} onClick={() => { sethover("Home") }}><Link to="/Home">Home</Link></li>
          {token ?
            <li className={`sm:block hidden cursor-pointer`}><Link to="/Event">Events</Link></li>
            :
            <li className={`sm:block hidden cursor-pointer ${hover === "Pricing" ? "underline underline-offset-4 decoration-2" : ""}`} onClick={() => { sethover("Pricing") }}>Pricing</li>
          }

          <li className={`sm:block hidden cursor-pointer ${hover === "Galary" ? "underline underline-offset-4 decoration-2" : ""}`} onClick={() => { sethover("Galary") }}>Gallery</li>

          <a href="#Aboutpg"><li className={`md:block hidden cursor-pointer ${hover === "About" ? "underline underline-offset-4 decoration-2" : ""}`} onClick={() => { sethover("About") }}>About</li></a>


        </ul>
        {token ?
          <div className='list-none flex justify-between items-center m-3'>
            <li className={`sm:hidden block text-white text-shadow:0 2px 4px rgba(0,0,0,0.5) font-semibold cursor-pointer `}><Link to="/Event">Events</Link></li>
          </div>
          :
          <div className='list-none flex justify-between items-center m-3'>
            <li className='sm:hidden block text-white text-shadow:0 2px 4px rgba(0,0,0,0.5) font-semibold cursor-pointer'>Pricing</li>
          </div>}

        <div >
          {token ?
            <button
              className="bg-transparent text-white w-[120px] sm:w-[100px] rounded-full  border-none flex items-center justify-center gap-1 sm:gap-2  "
              onClick={logout}
            >
              <CgProfile className="text-white w-6 h-6" />
              <span className="font-bold text-30px">Logout</span>
            </button>
            :
            <button
              className="bg-transparent text-white w-[120px] sm:w-[100px] rounded-full  border-none flex items-center justify-center gap-1 sm:gap-2 "
              onClick={() => setRegister(true)}
            >
              <CgProfile className="text-white w-6 h-6" />
              <span className="font-bold text-30px">LogIn</span>
            </button>
          }
        </div>
      </div>
      <Header />
    </div>
  )
}

export default Navbar
