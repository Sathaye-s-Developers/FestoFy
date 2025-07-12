import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import AddIcon from "../../../assets/add.png"
import { EventAppContext } from '../../../Context/EventContext'
import E_Dashboard from './E_Dashboard'
import { Calendar, User, Menu } from 'lucide-react';
import Main_Event from './Main_Event'

const E_Navbar = () => {
  const { details } = useContext(EventAppContext)
  const [dashboard, setdashboard] = useState(false)
  
  return (

    <div>
      <header className="relative z-10 px-6 py-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">

          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="p-2 bg-cyan-500/20 rounded-xl border border-cyan-400/40 group-hover:bg-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-300 group-hover:scale-110">
              <Calendar className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">Festofy</span>
          </div>

          <ul className="hidden md:flex items-center space-x-8">
            <li className="text-white hover:text-cyan-400 transition-all duration-300 font-medium relative group"><Link to="/Home">Home</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </li>
            <li className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group"><Link to="/Event">Events</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </li>
            <li className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </li>
            <li className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </li>
          </ul>

          {/* <div className="md:hidden">
            <button className="text-white hover:text-cyan-400 transition-colors duration-300">
              <Menu className="w-6 h-6" />
            </button>
          </div> */}
          <div>
            <button className='bg-black  w-[40px] h-[40px] rounded-full p-[5px] font-bold text-[18px]  cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-0.5' onClick={() => { setdashboard(!dashboard) }}>{details? details.charAt(0).toUpperCase() : ''}</button>
          </div>

        </nav>
      </header>
      <Main_Event/>
    </div>
  )
}

export default E_Navbar
