import React from 'react'
import BackIcon from "../../../assets/BackIcon.svg"
import {Link} from "react-router-dom"
const AddEventpg = () => {
  return (
    <div className='mt-7'>
      <button className='bg-black text-white rounded-[20px] p-2 w-[90px]'><Link to="/Event" className='flex'><img src={BackIcon} alt="BackIcon" className='w-[25px]' />Back</Link></button>
      
    </div>
  )
}

export default AddEventpg
