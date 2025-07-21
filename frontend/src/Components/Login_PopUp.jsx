import React, { useCallback, useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { EventAppContext } from '../Context/EventContext'
import axios from 'axios'
import Otp_popup from './Otp_popup'


import Forgot_pass from "./Forgotpass_component/Forgot_pass"
import Forgot_OtpPopup from './Forgotpass_component/Forgot_OtpPopup';
import LoginForm from './LoginForm';
const Login_PopUp = () => {
    const { url,setprogress,otp, setotp,password} = useContext(EventAppContext)
    const [login, setlogin] = useState("logout")

    const [Forgototp, setForgototp] = useState(false)
    const [errorMsg, seterrorMsg] = useState("")
    const [savetoken, setsavetoken] = useState({ token: "" })
 
    const [email,setemail]=useState("")

    const RenderSmallComponent=()=>{
        if(Forgototp) return <Forgot_OtpPopup setForgototp={setForgototp}  email={email}/>;

        if(password) return <Forgot_pass Forgototp={Forgototp} setForgototp={setForgototp} setemail={setemail}/>

        if(otp) return <Otp_popup email={email}  setotp={setotp} login={login} setsavetoken={setsavetoken} savetoken={savetoken} />

        return <LoginForm login={login} setlogin={setlogin} onsubmit={onsubmit} errorMsg={errorMsg}/>
    }

    const onsubmit = useCallback(async (formData) => {
        seterrorMsg("")
        let newurl = url;
        if (login === "logout") {
            newurl += "/Festofy/user/login"
        } else {
            newurl += "/Festofy/user/signUp"
        }
        try {
            const response = await axios.post(newurl,{email:formData.Email,password:formData.Password})
            if (response.data.success) {
                setprogress(70)
                setotp(true)
                setemail(formData.Email)

                try {
                    const response = await axios.post(url + "/Festofy/user/otp/register-login", { email: formData.Email })
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

    },[url,login,setprogress])

    return (
        <div className='fixed inset-0 z-50 w-full h-full bg-[#00000090] grid'>
            <div className='place-self-center left-[580px] opacity-80 top-[200px] bg-black rounded-[12px] w-[90%] sm:w-[55%] md:w-[50%] lg:w-[40%] xl:w-[30%] animate-[fadein_0.5s_ease-in-out_forwards] text-white'>
                
                {RenderSmallComponent()}

            </div>
        </div>
    )
}

export default Login_PopUp
