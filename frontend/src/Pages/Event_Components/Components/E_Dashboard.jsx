import React, { useContext, useEffect } from 'react'
import { EventAppContext } from '../../../Context/EventContext'

const E_Dashboard = () => {
    const { details } = useContext(EventAppContext)
    return (
        <div className='absolute top-[57px] right-5 w-full grid z-50'>
            <div className='place-self-end p-5 rounded-[10px] w-[50%] sm:w-[34%] md:w-[30%] lg:w-[26%] xl:w-[22%] bg-black'>
                <h1 className='text-white text-center font-bold mb-2'>Dashboard</h1>
                <div className='rounded-[5px] bg-[#3b3a3a] text-white p-2 text-center'>
                    <p>Welcome , {details.charAt(0).toUpperCase() + details.slice(1)}</p>
                </div>
            </div>
        </div>
    )
}

export default E_Dashboard
