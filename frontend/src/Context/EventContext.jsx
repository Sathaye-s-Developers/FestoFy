import axios, { Axios } from "axios"
import { createContext, useEffect, useState } from "react"
import randomcolor from "randomcolor";
import randomColor from "randomcolor";


export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [hue, setHue] = useState('red');
    const [lum, setLum] = useState('light');
    const param = {
        luminosity: lum,
        hue: hue,
    };
    
    const [register, setRegister] = useState(false)
    const [token, settoken] = useState(() => localStorage.getItem("token") || "");
    const [authtoken, setauthtoken] = useState("")
    const url = "http://localhost:3000"
    const [details, setdetails] = useState({ username: "", email: "" })
    const [options, setoptions] = useState(false)
    const [progress, setprogress] = useState(0)
    const [randcolor, setrandcolor] = useState("")
  const [profileOptions, setprofileOptions] = useState(false)

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
    const contextvalue = {
        register, setRegister, url, token, settoken, details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor,profileOptions, setprofileOptions
    }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
