import React, { useContext, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { EventAppContext } from '../Context/EventContext'
import axios from 'axios'
import Otp_popup from './Otp_popup'
import Select from 'react-select'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Login_PopUp = () => {
    const { setRegister, url, settoken, setusername, setprogress } = useContext(EventAppContext)
    const [login, setlogin] = useState("logout")
    const [otp, setotp] = useState(false)
    const [errorMsg, seterrorMsg] = useState("")
    const [savetoken, setsavetoken] = useState({ token: "" })

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },

    ]

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
        seterrorMsg("")
        setprogress(30)

        let newurl = url;
        if (login === "logout") {
            newurl += "/Festofy/user/login"
        } else {
            newurl += "/Festofy/user/signUp"
        }
        try {
            const response = await axios.post(newurl, data)
            if (response.data.success) {
                setprogress(70)
                setotp(true)

                try {
                    const response = await axios.post(url + "/Festofy/user/otp/send-otp", { email: data.email })
                    if (response.data.success) {
                        setprogress(100)
                    }

                } catch (err) {
                    setprogress(0);
                    if (err.response && (err.response.status === 409 || err.response.status === 401)) {
                        seterrorMsg(err.response.data.message);
                    }
                }
                setsavetoken({ token: response.data.token })

            }
        } catch (err) {
            if (err.response && (err.response.status === 409 || err.response.status === 401)) {
                seterrorMsg(err.response.data.message);
            }
        }

    }
    return (
        <div className='fixed inset-0 z-50 w-full h-full bg-[#00000090] grid'>
            <div className='place-self-center left-[580px] opacity-80 top-[200px] bg-black rounded-[12px] sm:w-[55%] md:w-[50%] lg:w-[40%] xl:w-[30%] animate-[fadein_0.5s_ease-in-out_forwards] text-white'>
                {otp === true ?
                    <div>
                        <Otp_popup email={data.email} setotp={setotp} login={login} data={data} setdata={setdata} setsavetoken={setsavetoken} savetoken={savetoken} />
                    </div> : <div>

                        <div className='p-5 flex justify-between font-[Nunito]'>
                            <h1 className='font-bold ml-5 text-[18px]'>{login === "logout" ? "Login" : "SignUp"}</h1>
                            <RxCross2 onClick={() => { setRegister(false) }} />
                            {/* <img src={CrossIcon} className='w-[15px] h-[15px]'  alt="crossicon" /> */}
                        </div>
                        <div className='font-[Nunito]'>
                            <form onSubmit={onsubmit}>
                                <div className='flex flex-col items-center'>
                                    {login === "logout" ?<></> :<input type="text" placeholder='Your Username' name='username' onChange={onchangehandler} value={data.username} className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' required autoComplete='username' />}

                                    <input type="email" placeholder='Your Email' name='email' onChange={onchangehandler} value={data.email} className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' required autoComplete='email' />

                                    <input type="password" placeholder='Your Password' name='password' onChange={onchangehandler} value={data.password} className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-4' required autoComplete='password' />

                                    {/* <div className='flex items-center w-[80%] gap-1'> */}
                                        {/* <select name="collegecode" id="collegeid" className='overflow-hidden outline-none border-2 border-gray-300 w-[20%] rounded-[5px] p-1 mb-3 text-sm h-[40px]'>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                            <option>Hello</option>
                                        </select> */}
                                        {/* <Select className=' outline-none  bg-black w-[30%] text-black rounded-[5px] p-1 mb-3 text-sm h-[40px]' options={options} /> */}
                                        {/* <Menu>
                                            <Menu.Button>College Code</Menu.Button>
                                            <Menu.Items>
                                                <Menu.Item>Hello</Menu.Item>
                                            </Menu.Items>
                                        </Menu> */}
                                        <input type="text" placeholder='Your College-Code' name='college_code' onChange={onchangehandler} value={data.college_code} className='outline-none border-2 border-gray-300 w-[80%] rounded-[5px] p-1 mb-3' autoComplete='college-code' />
                                    {/* </div> */}

                                    {errorMsg && (<div className='w-[80%] mb-3'><p className='text-red-600'>{errorMsg}</p></div>)}
                                    <div className='flex items-center w-[80%] mb-4'>
                                        <input type="checkbox" className='cursor-pointer' required />
                                        <p className='text-[12px] pl-1 text-gray-600 '> By continuing , I agree to the terms & conditions </p>
                                    </div>
                                    <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-600 w-[80%] text-white mb-2 rounded-[15px] cursor-pointer p-1 hover:from-cyan-400 hover:to-blue-500 transition-all duration-100 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-0.3'>Submit</button>
                                    <div className='flex gap-2 mb-2'>
                                        {login === "login" ? <p className='text-gray-600 text-[14px]'>Already have an account </p> :
                                            <p className='text-gray-600 text-[14px]'>Create a new account ? </p>}
                                        {login === "logout" ?
                                            <p className='text-blue-600 text-[14px] font-bold hover:underline' onClick={() => { setlogin("login") }}>Click Here</p>
                                            :
                                            <p className='text-blue-600 text-[14px] font-bold hover:underline' onClick={() => { setlogin("logout") }}>Click Here</p>
                                        }
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Login_PopUp
