import React, { useState } from 'react'
const Cards = () => {
  const [hover, sethover] = useState("First_card")
  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-semibold text-green-600 text-[16px] md:text-3xl'>Features</h1>
      <p className='font-bold text-[21px] sm:text-[25px] md:text-4xl mt-3 text-center'>Smart Tools for Smarter Events</p>
      <div className='flex sm:h-[50px] gap-8 items-center mt-3'>
        <div onClick={() => sethover("First_card")} className={`cursor-pointer text-[8px] sm:text-[18px] flex items-center justify-center text-center p:2  sm:h-[30px]  ${hover === "First_card" ? "underline font-bold translate-0.5" : ""}`} >Event Planning & Promotion</div>

        <div onClick={() => sethover("Second_card")} className={`cursor-pointer text-[8px] sm:text-[18px] flex items-center justify-center text-center p:2  sm:h-[30px] ${hover === "Second_card" ? "underline font-bold translate-0.5" : ""}`}>Custom Schedules</div>

        <div onClick={() => sethover("Third_card")} className={`cursor-pointer text-[8px] sm:text-[18px] flex items-center justify-center text-center p:2  sm:h-[30px] ${hover === "Third_card" ? "underline font-bold translate-0.5" : ""}`}>Role based Access</div>
      </div>
    </div>
  )
}

export default Cards
