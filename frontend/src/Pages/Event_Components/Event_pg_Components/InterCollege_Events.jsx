import React from 'react'
import E_Nav_Back from '../Components/E_Nav_Back'
import Main_Event from '../Components/Main_Event'

const InterCollege_Events = () => {
    return (
        <div className='bg-black h-screen'>
            <E_Nav_Back />
            <Main_Event/>
            <div className='flex justify-center items-center mt-20'>
                <h3 className="font-semibold text-white mb-2 text-4xl">No Events Found</h3>
            </div>
        </div>
    )
}

export default InterCollege_Events
