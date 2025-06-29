import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { EventAppContext } from '../Context/EventContext';
import axios from 'axios';

const Otp_popup = ({ email, setotp, login, data, setdata,setsavetoken,savetoken}) => {
    const { url, setRegister, settoken } = useContext(EventAppContext)

    const [minutes, setminutes] = useState(2)
    const [seconds, setseconds] = useState(59)
    const [errorMsg, seterrorMsg] = useState("")

    const inputs = useRef([])
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setseconds(seconds - 1)
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval)
                } else {
                    setseconds(59)
                    setminutes(minutes - 1)
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [seconds])


    const getOtpValue = async (e) => {
        e.preventDefault()
        const otp = inputs.current.map(input => input?.value).join("");

        //logic for login and signup 
        try {
            const response = await axios.post(url + "/Festofy/user/otp/verify-otp", { email: email, otp: otp },{headers:{Authorization: `Bearer ${savetoken.token}`}})
            if (response.data.success) {
                localStorage.setItem("token",savetoken.token)
                settoken(savetoken.token)
                setdata({ "username": "", "email": "", "password": "", "college_code": "" })
                setRegister(false)
            }
        } catch (err) {
            if (err.response && (err.response.status === 400)) {
                seterrorMsg(err.response.data.message);
            }
        }
    };

    const onsubmit = async (e) => {
        try {
            const response = await axios.post(url + "/Festofy/user/otp/send-otp", { email: data.email })

        } catch (err) {
            if (err.response && (err.response.status === 409 || err.response.status === 401)) {
                seterrorMsg(err.response.data.message);
            }
        }
    }

    const onresend = () => {
        setminutes(2)
        setseconds(59)
        onsubmit()
    }
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <div>
            <form onSubmit={getOtpValue}>
                <div className='relative p-5 pb-2 flex justify-between font-[Nunito]'>
                    <p className='absolute' onClick={() => { setotp(false) }} ><IoArrowBackCircleSharp size={30} /></p>
                    <div className='flex justify-center w-full'>
                        <p className='font-bold text-[18px] '>Enter Otp</p>
                    </div>
                </div>
                <div className='ml-10 mr-10'>
                    <p className='text-[12px] text-center text-gray-500'>Otp sent on <br /> {email}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex mb-3 justify-center gap-3 m-5'>
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputs.current[i] = el)}
                                type="text"
                                maxLength={1}
                                className="border-2 border-gray-300 rounded-[5px] w-10 h-10 text-center  p-1 hover:bg-gray-100 cursor-pointer"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                required
                                autoComplete='auto'
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                            />
                        ))}
                    </div>
                    {errorMsg &&
                        <div>
                            <p className=' text-red-500 text-[14px] text-left'>{errorMsg}</p>
                        </div>}
                </div>

                <div className='ml-5 md:ml-6 lg:ml-11 mt-3 flex justify-between w-[85%] md:w-[80%]'>
                    <div className='flex items-center justify-center gap-1'>
                        <p className='font-semibold text-[12px] text-center'>Time Remaining : </p>
                        <p className={`font-extrabold text-[12px] text-center ${minutes === 0 && seconds < 20 ? "text-red-500" : "text-black"}`}>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</p>
                    </div>
                    <div>
                        <button onClick={onresend} disabled={minutes !== 0 && seconds !== 0} className={`text-[14px] underline ${minutes === 0 && seconds === 0 ? "text-black  cursor-pointer" : "text-[#B0B0B0] cursor-not-allowed"}`}>Resend-otp</button>
                    </div>
                </div>
                <div className='flex justify-center  mt-3'>
                    <button type='submit' className='bg-[#f97316] w-[25%] text-white mb-2 rounded-[15px] cursor-pointer p-1 outline-none border-none'>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default Otp_popup
{/* <input type="text" className='border-2 border-gray-300 rounded-[5px] w-10 h-10 text-center  p-1 hover:bg-gray-100 cursor-pointer' required maxLength={1}
                        pattern="[0-9]*"
                        inputMode="numeric" />
                    <input type="text" className='border-2 border-gray-300 rounded-[5px] w-10 h-10 text-center  p-1 hover:bg-gray-100 cursor-pointer' required maxLength={1}
                        pattern="[0-9]*"
                        inputMode="numeric" />
                    <input type="text" className='border-2 border-gray-300 rounded-[5px] w-10 h-10 text-center  p-1 hover:bg-gray-100 cursor-pointer' required maxLength={1}
                        pattern="[0-9]*"
                        inputMode="numeric" />
                    <input type="text" className='border-2 border-gray-300 rounded-[5px] w-10 h-10 text-center  p-1 hover:bg-gray-100 cursor-pointer' required maxLength={1}
                        pattern="[0-9]*"
                        inputMode="numeric" />
                    <input type="text" className='border-2 border-gray-300 rounded-[5px] w-10 h-10 text-center  p-1 hover:bg-gray-100 cursor-pointer' required maxLength={1}
                        pattern="[0-9]*"
                        inputMode="numeric" />
                    <input type="text" className='border-2 border-gray-300 rounded-[5px] w-10 h-10 text-center  p-1 hover:bg-gray-100 cursor-pointer' required maxLength={1}
                        pattern="[0-9]*"
                        inputMode="numeric" /> */}