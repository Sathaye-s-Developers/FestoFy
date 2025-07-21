import axios, { Axios } from "axios"
import { createContext, useEffect, useState, useMemo, useCallback } from "react"
import randomColor from "randomcolor";


export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [hue, setHue] = useState('red');
    const [lum, setLum] = useState('light');
    const param = {
        luminosity: lum,
        hue: hue,
    };

    const url = "http://localhost:3000"

    const [register, setRegister] = useState(false)
    const [token, settoken] = useState(() => localStorage.getItem("token") || "");
    const [authtoken, setauthtoken] = useState("")
    const [details, setdetails] = useState({ username: "", email: "" })
    const [options, setoptions] = useState(false)
    const [progress, setprogress] = useState(0)
    const [randcolor, setrandcolor] = useState("")
    const [profileOptions, setprofileOptions] = useState(false)
    const [otp, setotp] = useState(false)
    const [password, setpassword] = useState(false)

    //Otp Email
    const [email, setemail] = useState({ "email": "" })

    const fetchUserDetails = async (token) => {
        try {
            const response = await axios.get(url + "/Festofy/user/user_details", { headers: { Authorization: `Bearer ${token}` } })

            setrandcolor(randomColor(param));

            setauthtoken(response.data.token)
            setdetails({ username: response.data.user.username, email: response.data.user.email })
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        const storedtoken = localStorage.getItem("token")
        if (storedtoken) {
            settoken(storedtoken)
            fetchUserDetails(storedtoken)
        }
    }, [token])


    const closePopup = useCallback(() => {
        setRegister(false);
    }, []);

    // const contextvalue = useMemo(() => ({
    //     register, setRegister, url, token, settoken, details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor, profileOptions, setprofileOptions, email, setemail, closePopup, otp, setotp,password, setpassword
    // }), [register, url, token, details, options, progress, randcolor, profileOptions, email, setRegister, settoken, setdetails, fetchUserDetails, setoptions, setprogress, setprofileOptions, setemail, closePopup, otp, setotp,password, setpassword]);
    const contextvalue={
        register, setRegister, url, token, settoken, details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor, profileOptions, setprofileOptions, email, setemail, closePopup, otp, setotp,password, setpassword
    }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
