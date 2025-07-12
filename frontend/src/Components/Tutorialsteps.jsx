import React from 'react'
// import { FaArrowDown } from "react-icons/fa";
// import { ArrowBigDown } from 'lucide-react';
import { LuArrowBigDown } from "react-icons/lu";

function Tutorialsteps() {
    return (
        <div className='mb-20' id='Tutorial'>
            <div className=''>
                <p className='text-3xl md:text-4xl font-bold text-white animate-fadeInUp'>Steps To Get  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Special Key / Add College Name</span></p>
                <div className='flex flex-col mt-10 items-center animate-fadeInUp'>
                    <div className='border-2 md:w-[44%]  p-2 rounded-[18px] border-blue-400'>
                        <p className='text-2xl md:text-3xl font-bold text-blue-400 '>Step 1 :</p>
                        <p className='text-2xl md:text-3xl font-bold text-white '>Fill out enquiry form below</p>
                        <p className='text-[15px] md:text-[15px] font-bold text-white mt-3'>(Requests will only be accepted from the Head of Department or Event In-charge (Teaching Staff)) </p>
                    </div>
                    <LuArrowBigDown color='lightblue' size={70}  />
                    <div className='border-2 md:w-[44%]  p-2 rounded-[18px] border-blue-400'>
                        <p className='text-2xl md:text-3xl font-bold text-blue-400 '>Step 2 :</p>
                        <p className='text-2xl md:text-3xl font-bold text-white '>Upload a valid proof</p>
                        <p className='text-[15px] md:text-[15px] font-bold text-white mt-3'>(Kindly upload a formal letter or valid proof verifying that the sender is a faculty member or departmental head) </p>
                    </div>
                    <LuArrowBigDown color='lightblue' size={70}  />
                    <div className='border-2 md:w-[44%]  p-2 rounded-[18px] border-blue-400'>
                        <p className='text-2xl md:text-3xl font-bold text-blue-400 '>Step 3 :</p>
                        <p className='text-2xl md:text-3xl font-bold text-white '>We'll Reach Out Within 24 Hours</p>
                        <p className='text-[15px] md:text-[15px] font-bold text-white mt-3'>(When your information is verified, the result will be sent to you) </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tutorialsteps
