import React, { useContext, useEffect, useState } from 'react'
import CrossIcon from "../assets/close.png"
import { EventAppContext } from '../Context/EventContext'
import axios from 'axios'
const Login_PopUp = () => {
    const { setRegister, url,settoken,setusername} = useContext(EventAppContext)
    const [login, setlogin] = useState("logout")
    const [errorMsg, seterrorMsg] = useState("")


    const [data, setdata] = useState({
        "username": "",
        "email": "",
        "password": "",
        "college_code": ""
    })
    const onchangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setdata(data => ({ ...data, [name]: value }))
    }
    const onsubmit = async (e) => {
        e.preventDefault()
        let newurl = url;
        if (login === "logout") {
            newurl += "/Festofy/user/signUp"
        } else {
            newurl += "/Festofy/user/login"
        }
        try {
            const response = await axios.post(newurl, data)
            if (response.data.success) {
                localStorage.setItem("token", response.data.token)
                settoken(response.data.token)
                setusername(response.data.username)
                setRegister(false)
                setdata({ "username": "", "email": "", "password": "", "college_code": "" })
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                seterrorMsg(err.response.data.message);
            }
        }
    }
    return (
        <div className='fixed inset-0 z-50 w-full h-full bg-[#00000090] grid'>
            <div className='place-self-center left-[580px] top-[200px] bg-white rounded-[12px] lg:w-[25%] animate-[fadein_0.5s_ease-in-out_forwards]'>
                <div className='p-5 flex justify-between font-[Nunito]'>
                    <h1 className='font-bold ml-5 text-[18px]'>{login === "login" ? "Login" : "SignUp"}</h1>
                    <img src={CrossIcon} className='w-[15px] h-[15px]' onClick={() => { setRegister(false) }} alt="crossicon" />
                </div>
                <div className='font-[Nunito]'>
                    <form onSubmit={onsubmit}>
                        <div className='flex flex-col items-center'>
                            {login === "logout" ? <input type="text" placeholder='Your Username' name='username' onChange={onchangehandler} value={data.username} className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' required /> : <></>}

                            <input type="email" placeholder='Your Email' name='email' onChange={onchangehandler} value={data.email} className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' required />

                            <input type="password" placeholder='Your Password' name='password' onChange={onchangehandler} value={data.password} className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' required />

                            <input type="text" placeholder='Your College-Code' name='college_code' onChange={onchangehandler} value={data.college_code} className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-3' required />

                            {errorMsg && (<div className='w-[80%] mb-3'><p className='text-red-600'>{errorMsg}</p></div>)}
                            <div className='flex items-center w-[80%] mb-4'>
                                <input type="checkbox" className='cursor-pointer' required />
                                <p className='text-[12px] pl-1 text-gray-600 '> By continuing , I agree to the terms & conditions </p>
                            </div>
                            <button type="submit" className='bg-[#f97316] w-[80%] text-white mb-2 rounded-[15px] cursor-pointer p-1'>Submit</button>
                            <div className='flex gap-2 mb-2'>
                                {login === "logout" ? <p className='text-gray-600 text-[14px]'>Already have an account </p> :
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
