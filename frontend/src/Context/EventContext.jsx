import axios, { Axios } from "axios"
import { createContext, useEffect, useState, useMemo, useCallback } from "react"
import randomColor from "randomcolor";
import { useCookies } from "react-cookie";

export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [hue, setHue] = useState('red');
    const [lum, setLum] = useState('light');
    // const param = {
    //     luminosity: lum,
    //     hue: hue,
    // };
    const [cookies, setCookie, removeCookie] = useCookies(['Login']);

    const api = useMemo(() => axios.create({
        baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:3000",
        withCredentials: true,
    }), []);

    const [register, setRegister] = useState(false)
    const [details, setdetails] = useState({ username: "", email: "" })
    const [options, setoptions] = useState(false)
    const [progress, setprogress] = useState(0)
    const [randcolor, setrandcolor] = useState("")
    const [profileOptions, setprofileOptions] = useState(false)
    const [otp, setotp] = useState(false)
    const [password, setpassword] = useState(false)
    const [loading, setloading] = useState(false)

    const [isAuthenticated, setisAuthenticated] = useState(false)

    //Otp Email
    const [email, setemail] = useState({ "email": "" })

    // const fetchUserDetails = useCallback(async () => {
    //     try {
    //         const response = await api.get("/Festofy/user/user_details")
    //         // setrandcolor(randomColor(param));

    //         setisAuthenticated(response.data.isAuthenticated)

    //         setdetails(prev => {
    //             const newUser = {
    //                 username: response.data.user.username,
    //                 email: response.data.user.email,
    //             };

    //             if (prev.username !== newUser.username || prev.email !== newUser.email) {
    //                 return newUser; // update only if changed
    //             }
    //             return prev; // no update needed
    //         });


    //     } catch (err) {
    //         setisAuthenticated(false)
    //     }
    // }, [api, setdetails, setisAuthenticated])
    const fetchUserDetails = useCallback(async () => {
        // setloading(true)
        try {
            const response = await api.get("/Festofy/user/user_details");
            setdetails({ username: response.data.user.username, email: response.data.user.email })

            if (response.data.isAuthenticated) {
                setisAuthenticated(response.data.isAuthenticated)
            }

        } catch (err) {
            setisAuthenticated(false)
        }
    }, [api]);

    useEffect(() => {
        const code = localStorage.getItem("ULRKGDAPS");
        if (code) {
            fetchUserDetails()
        }
    }, [fetchUserDetails]);

    const closePopup = useCallback(() => {
        setRegister(false);
    }, []);

    // const contextvalue = useMemo(() => ({
    //     register, setRegister, url details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor, profileOptions, setprofileOptions, email, setemail, closePopup, otp, setotp,password, setpassword
    // }), [register, url details, options, progress, randcolor, profileOptions, email, setRegister, setdetails, fetchUserDetails, setoptions, setprogress, setprofileOptions, setemail, closePopup, otp, setotp,password, setpassword]);
    const contextvalue = {
        api, register, setRegister, details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor, profileOptions, setprofileOptions, email, setemail, closePopup, otp, setotp, password, setpassword, isAuthenticated, setisAuthenticated, loading, setloading
    }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
