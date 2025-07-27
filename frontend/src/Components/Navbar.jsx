import React, { useContext, useEffect, useState } from 'react'
import { EventAppContext } from '../Context/EventContext';

import { Link } from "react-router-dom"
import { Calendar, User, Menu, X } from 'lucide-react';


const Navbar = () => {
  const { setRegister, token, settoken, setoptions, options ,setprogress,setotp} = useContext(EventAppContext)
  const toggleoption = () => {
    setoptions(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    settoken("")
  }
  return (
    <div>
      <header className="relative z-10 px-6 py-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
  
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="p-2 bg-cyan-500/20 rounded-xl border border-cyan-400/40 group-hover:bg-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-300 group-hover:scale-110">
              <Calendar className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">Festofy</span>
          </div>

          {/* Navigation Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            <li className="text-white hover:text-cyan-400 transition-all duration-300 font-medium relative group"><Link to="/Home">Home</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </li>
            {token ? <li className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group" onClick={()=>setprogress(100)}><Link to="/Event">Events</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </li> : <></>
            }

            {/* Optional Future */}
            {/* <li className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </li> */}


            <a href="#Gallary" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#About" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </a>

            {token ? <></> :
              <a href="#Enquiry" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
                Enquiry
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleoption}
              className="relative p-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-400/30 hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 group"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 w-6 h-6 text-cyan-400 transition-all duration-300 ${options ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`absolute inset w-6 h-6 text-cyan-400 transition-all duration-300 ${options ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'}`} />
              </div>
            </button>
          </div>

          {/* Login Button */}
          {token ? <div className="hidden md:block">
            <button className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-0.5" onClick={logout}>
              <User className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div> :

            <div className="hidden md:block">
              <button className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-0.5" onClick={() => { setRegister(true)
                setotp(false)
              }}>
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            </div>
          }
        </nav>
      </header>


    </div>
  )
}

export default Navbar
