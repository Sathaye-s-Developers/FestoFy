import React, { useContext, useState } from 'react'
import CrossIcon from "../assets/close.png"
import { EventAppContext } from '../Context/EventContext'
const Login_PopUp = () => {
    const [login, setlogin] = useState("logout")
    const {setRegister}=useContext(EventAppContext)
    return (
        <div className='fixed inset-0 z-50 w-full h-full bg-[#00000090] grid'>
            <div className='place-self-center left-[580px] top-[200px] bg-white rounded-[12px] lg:w-[25%] animate-[fadein_0.5s_ease-in-out_forwards]'>
                <div className='p-5 flex justify-between font-[Nunito]'>
                    <h1 className='font-bold ml-5 text-[18px]'>{login === "login" ? "Login" : "SignUp"}</h1>
                    <img src={CrossIcon} className='w-[15px] h-[15px]' onClick={() => { setRegister(false) }} alt="crossicon" />
                </div>
                <div className='font-[Nunito]'>
                    <form>
                        <div className='flex flex-col items-center'>
                            {login==="logout"?<input type="text" placeholder='Your Username' className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' required />:<></>}
                            <input type="email" placeholder='Your Email' className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' required />
                            <input type="password" placeholder='Your Password' className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' required />
                            <div className='flex items-center w-[80%] mb-4'>
                                <input type="checkbox" className='cursor-pointer' required />
                                <p className='text-[12px] pl-1 text-gray-600 '> By continuing , I agree to the terms & conditions </p>
                            </div>
                            <button className='bg-[#f97316] w-[80%] text-white mb-2 rounded-[15px] cursor-pointer p-1'>Submit</button>
                            <div className='flex gap-2 mb-2'>
                                {login==="logout"?<p className='text-gray-600 text-[14px]'>Already have an account </p>:
                                <p className='text-gray-600 text-[14px]'>Create a new account ? </p>}
                                {login === "logout" ?
                                    <p className='text-[#f97316] text-[14px] font-bold hover:underline' onClick={() => { setlogin("login") }}>Click Here</p>
                                    :
                                    <p className='text-[#f97316] text-[14px] font-bold hover:underline' onClick={() => { setlogin("logout") }}>Click Here</p>
                                }
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login_PopUp
