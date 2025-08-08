import React, { useContext } from 'react'
import { EventAppContext } from '../../../Context/EventContext'
import { getCollegeByCode } from '../../../Websites data/Colleges_Names'

const Main_Event = () => {
  const { details } = useContext(EventAppContext)
  const college = getCollegeByCode(details.college_code)

  return (
    <div className='mt-5'>
      <div>
        <p className='mt-10 text-center md:text-5xl text-4xl bg-gradient-to-r from-cyan-700 via-teal-500 to-white font-serif bg-clip-text text-transparent font-bold leading-tight'>Welcome To {college.short_name}'s Hub</p>
        <p className='pl-3 mt-5 text-2xl text-white text-center'>Experience, Engage, Excel – College Events</p>
        {/* <p className='text-white text-center text-5xl'>No Events</p> */}
      </div>
    </div>
  )
}

export default Main_Event
