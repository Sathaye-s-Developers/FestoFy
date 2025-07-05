import React, { useContext } from 'react'
import { House, DollarSign, Image, Calendar1, User } from 'lucide-react';
import { X } from 'lucide-react';
import { EventAppContext } from '../Context/EventContext';
import { Link } from "react-router-dom"

const Mobile_Options = () => {
    const { setoptions, token, setRegister } = useContext(EventAppContext)
    const toggleoption = () => {
        setoptions(false)
    }
    const toggleLogin = () => {
        setoptions(false)
        setRegister(true)
    }
    const logout = () => {
        localStorage.removeItem("token")
        settoken("")
    }
    return (
        <div>
            <div className='fixed inset-0 z-50 w-full h-full grid'>
                <div className='md:hidden place-self-center left-[580px] opacity-100 top-[200px] bg-black w-[80%] sm:w-[50%] rounded-[15px] animate-[fadein_0.5s_ease-in-out_forwards] text-white ]'>
                    <div className='flex flex-col items-end mt-5 mr-7'>
                        <button className='p-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl' onClick={toggleoption}> <X className={` w-6 h-6 text-cyan-400 transition-all duration-300'}`} /></button>
                    </div>

                    <div className='flex flex-col items-center mt-3'>
                        <p className='group p-5 border-2 border-transparent w-[80%] ml-3 mr-3 rounded-[15px] font-bold flex items-center gap-3 relative text-gray-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-600/20 hover:border-cyan-400/20 hover:text-cyan-300'><House className={` inset-0 w-6 h-6 text-cyan-400 `} />Home</p>

                        {token ?
                            <p className='group p-5 border-2 border-transparent w-[80%] ml-3 mr-3 rounded-[15px] font-bold flex items-center gap-3 relative text-gray-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-600/20 hover:border-cyan-400/20 hover:text-cyan-300'><DollarSign className={`inset-0 w-6 h-6 text-cyan-400 `} /><Link to="/Event">Events</Link></p>
                            :
                            <p className='group p-5 border-2 border-transparent w-[80%] ml-3 mr-3 rounded-[15px] font-bold flex items-center gap-3 relative text-gray-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-600/20 hover:border-cyan-400/20 hover:text-cyan-300'><DollarSign className={`inset-0 w-6 h-6 text-cyan-400 `} />Pricing</p>
                        }

                        <p className='group p-5 border-2 border-transparent w-[80%] ml-3 mr-3 rounded-[15px] font-bold flex items-center gap-3 relative text-gray-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-600/20 hover:border-cyan-400/20 hover:text-cyan-300'><Image className={`inset-0 w-6 h-6 text-cyan-400 `} />Gallery</p>

                        <p className='group p-5 border-2 border-transparent w-[80%] ml-3 mr-3 rounded-[15px] font-bold flex items-center gap-3 relative text-gray-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-600/20 hover:border-cyan-400/20 hover:text-cyan-300'><Image className={`inset-0 w-6 h-6 text-cyan-400 `} />About</p>

                        {/* <p className='p-5 border-2 w-[80%] ml-3 mr-3 rounded-[15px] font-bold flex items-center gap-3 relative'>About</p> */}

                        <hr className='border-2 m-5 w-[80%]' />

                        {token ? <button className='p-4 border-2 mb-5 w-[80%] ml-3 mr-3  flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/40 relative overflow-hidden' onClick={logout}><User />Logout</button> :

                            <button className='p-4 border-2 mb-5 w-[80%] ml-3 mr-3  flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/40 relative overflow-hidden' onClick={toggleLogin}><User />Login</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mobile_Options
