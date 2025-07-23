import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { EventAppContext } from '../../Context/EventContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Forgot_pass = ({ Forgototp, setForgototp ,setregemail}) => {
    const { setRegister, url } = useContext(EventAppContext)
    const { register, handleSubmit } = useForm();

    const onsubmit = async (formData) => {
        try {
            const response = await axios.post(url + "/Festofy/user/otp/forgot", { email: formData.Email })
            if (response) {
                setForgototp(true)
                setregemail(formData.Email)
            }

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className='mb-3'>
            <div className='p-5 flex justify-between font-[Nunito]'>
                <h1 className='font-bold ml-5 text-[18px]'>Forgot Password</h1>
                <RxCross2 onClick={() => { setRegister(false) }} />
            </div>
            <div className='font-[Nunito]'>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className='flex flex-col items-center'>
                        <label className='w-[80%] mb-2' htmlFor="email">Enter Registered Email :</label>
                        <input type="email"  placeholder='Your Email' className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' autoComplete='email' {...register("Email", { required: true })} />
                        <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-600 w-[80%] text-white mb-2 rounded-[15px] cursor-pointer p-1 hover:from-cyan-400 hover:to-blue-500 transition-all duration-100 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-0.3'>Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Forgot_pass
