import axios, { Axios } from "axios"
import { createContext, useEffect, useState, useMemo, useCallback } from "react"
import randomColor from "randomcolor";
import { useCookies } from "react-cookie";

export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [hue, setHue] = useState('red');
    const [lum, setLum] = useState('light');
    const param = {
        luminosity: lum,
        hue: hue,
    };


    const api = axios.create({
        baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:3000",
        withCredentials: true,
    });

    const [register, setRegister] = useState(false)
    // const [token, settoken] = useState(() => localStorage.getItem("token") || "");
    const [authtoken, setauthtoken] = useState("")
    const [details, setdetails] = useState({ username: "", email: "" })
    const [options, setoptions] = useState(false)
    const [progress, setprogress] = useState(0)
    const [randcolor, setrandcolor] = useState("")
    const [profileOptions, setprofileOptions] = useState(false)
    const [otp, setotp] = useState(false)
    const [password, setpassword] = useState(false)


    const [isAuthenticated, setisAuthenticated] = useState(true)

    // const isAuthenticated = Boolean(details.username);


    //Otp Email
    const [email, setemail] = useState({ "email": "" })

    const fetchUserDetails = useCallback(async (token) => {
        try {
            const response = await api.get("/Festofy/user/user_details")

            setrandcolor(randomColor(param));

            // setauthtoken(response.data.token)
            setdetails({ username: response.data.user.username, email: response.data.user.email })
            setisAuthenticated(true);

        } catch (err) {
            console.log(err)
            // setisAuthenticated(false);
        }   
    }, [api, param])


    useEffect(() => {
        if (isAuthenticated) {
            fetchUserDetails();
        }

    }, [isAuthenticated, fetchUserDetails]);

    // useEffect(() => {
    //     const storedtoken = localStorage.getItem("token")
    //     if (storedtoken) {
    //         settoken(storedtoken)
    //         fetchUserDetails(storedtoken)
    //     }
    // }, [token])



    const closePopup = useCallback(() => {
        setRegister(false);
    }, []);

    // const contextvalue = useMemo(() => ({
    //     register, setRegister, url, token, settoken, details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor, profileOptions, setprofileOptions, email, setemail, closePopup, otp, setotp,password, setpassword
    // }), [register, url, token, details, options, progress, randcolor, profileOptions, email, setRegister, settoken, setdetails, fetchUserDetails, setoptions, setprogress, setprofileOptions, setemail, closePopup, otp, setotp,password, setpassword]);
    const contextvalue = {
        api, register, setRegister, details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor, profileOptions, setprofileOptions, email, setemail, closePopup, otp, setotp, password, setpassword, isAuthenticated, setisAuthenticated
    }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
