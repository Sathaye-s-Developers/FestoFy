import React from 'react'
import facebook from "../assets/facebook_icon.png"
import linkdin from "../assets/linkedin_icon.png"
import twitter from "../assets/twitter_icon.png"
const About = () => {
  return (
    <div className='bg-[#323232] w-[100%] text-white mt-5' id='Aboutpg'>
      <div className='md:w-[90%] w-[80%] flex flex-col md:flex-row items-center md:justify-between m-auto'>
        <div className='md:w-1/2 md:mr-2'>
          <h3 className='text-4xl font-bold ml-1 mt-10 mb-5 md:ml-10 text-green-400'>Festofy</h3>
          <p className='md:ml-10 ml-1 tracking-tight'>
            At FestoFy, we believe college life should go beyond lectures — it should be memorable. Our platform helps student communities effortlessly plan, promote, and manage events, from cultural fests to seminars. Designed to replace scattered spreadsheets and last-minute chaos, FestoFy brings clarity, collaboration, and creativity to campus event management.
          </p>
          <p className='mt-5 ml:5 md:ml-10 mb-2'>Features</p>
          <ul className='md:ml-14 ml-5 list-disc'>
            <li>Creating Events</li>
            <li>Making Schedules</li>
            <li>Assigning Roles</li>
            <li>Setting Event Updates</li>
          </ul>
          <div className='md:ml-10 ml-1 mt-4 flex flex-col'>
            <p>Follow Us On</p>
            <div className='flex gap-2 mt-2'>
              <img src={facebook} alt="facebook" className='w-[35px]' />
              <img src={twitter} alt="twitter" className='w-[35px]' />
              <img src={linkdin} alt="linkdin" className='w-[35px]' />
            </div>
          </div>
        </div>
        <div className='md:w-1/2'>
          <div className='bg-gray-100 rounded-[10px] mt-10 p-5 md:p-10 w-full'>
            <h1 className='text-black font-bold text-3xl mt-2'>Enquiry Form</h1>
            <form className='text-black'>
              <div className="sm:flex gap-4 w-full">
                <div className='flex flex-col flex-1/2'>
                  <label className='text-black mt-2'>Name <span className="text-red-500">*</span></label>
                  <input type="text" className='border-2 rounded-[5px] w-full p-[5px] cursor-pointer' placeholder='Enter Name'required />
                </div>

                <div className='flex flex-col flex-1/2'>
                  <label className='text-black mt-2'>Email <span className="text-red-500">*</span></label>
                  <input type="email" className='border-2 rounded-[5px] w-full p-[5px] cursor-pointer' placeholder='Enter Email' required />
                </div>
              </div>
              <div className="sm:flex gap-4 w-full">
                <div className='flex flex-col flex-1/2'>
                  <label className='text-black mt-2'>Topic <span className="text-red-500">*</span></label>
                  <input type="text" className='border-2 rounded-[5px] w-full p-[5px] cursor-pointer' placeholder='Enter Topic'required />
                </div>

                <div className='flex flex-col flex-1/2'>
                  <label className='text-black mt-2'>Date <span className="text-red-500">*</span></label>
                  <input type="Date" className='border-2 rounded-[5px] w-full p-[2px] cursor-pointer' required />
                </div>
              </div>
              <div className='flex flex-col md:ml-2 mr-2'>
                <label className='text-black mt-2'>Your Message <span className="text-red-500">*</span></label>
                <textarea className='border-2 rounded-[5px] w-full p-[5px] h-[100px] cursor-pointer' required></textarea>
              </div>
              <div className='flex flex-col items-center'>
                <button className='m-2 bg-black text-white p-2 rounded-[20px] w-[120px] mt-5 cursor-pointer'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr className='mx-auto mt-8' />
      <p className='text-center mt-5'>Copyright 2025 @ Festofy.com-All Right Reserved</p>
    </div>
  )
}

export default About
