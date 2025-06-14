import React, { useContext } from 'react'
import { EventAppContext } from '../Context/EventContext'

const Header = () => {
    const {setRegister}=useContext(EventAppContext)
    return (
        <div className='flex flex-col items-center m-5'>
            <div className='header w-[80%] sm:w-[45%] md:w-[49%] lg:w-[50%] flex flex-col items-center'>
                <h1 className='xl:text-[55px] lg:text-[45px] md:text-[36px] sm:text-[34px] text-[28px] font-extrabold text-center m-2 tracking-tight text-white text-shadow:0 2px 4px rgba(0,0,0,0.5) fade-animation'>All-In-One <br />College Event Hub</h1>
                <p className='text-center mt-3 mb-3 text-[15px] md:text-[20px]  text-white text-shadow:0 2px 4px rgba(0,0,0,0.5) fade-animation'>All-in-one platform to effortlessly plan, promote, and manage your college events ,Simplify the chaos, amplify the experience!</p>
                <button className='bg-white font-semibold text-black w-[140px] rounded-[20px] p-2 mt-2 mb-2 cursor-pointer' onClick={()=>{setRegister(true)}}>Get Started</button>
            </div>
        </div>
    )
}

export default Header
