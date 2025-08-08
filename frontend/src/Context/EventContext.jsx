import axios, { Axios } from "axios"
import { createContext, useEffect, useState, useMemo, useCallback } from "react"
import randomColor from "randomcolor";

export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [hue, setHue] = useState('red');
    const [lum, setLum] = useState('light');

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
    const param = {
        luminosity: lum,
        hue: hue,
    };

    //Otp Email
    const [email, setemail] = useState({ "email": "" })
    const updateAuthState = (value) => {
        setisAuthenticated((prev) => (prev !== value ? value : prev));
    };

    const fetchUserDetails = useCallback(async () => {
        try {
            const response = await api.get("/Festofy/user/user_details");
            setrandcolor(randomColor(param));
            setdetails({ username: response.data.user.username, email: response.data.user.email, college_code: response.data.user.college_code })

        } catch (err) {
            console.log(err)
        }
    }, [api]);

    const checkVisitAndTrack = async () => {
        const cookies = document.cookie.split("; ").map((cookie) => cookie.trim());
        const hasvisited = cookies.some((cookie) =>
            cookie.startsWith("hasVisited=true")
        );
        if (hasvisited) {
            setisAuthenticated(true);
        } else {
            try {
                const response = await api.post("/Festofy/user/track-visit", {}, { withCredentials: true })
                document.cookie = "hasVisited=true; max-age=86400; path=/";
            } catch (err) {
                console.log(err)
            }
        }

    }
    useEffect(() => {
        checkVisitAndTrack();
        fetchUserDetails()
    }, [])


    const closePopup = useCallback(() => {
        setRegister(false);
    }, []);

    const contextvalue = useMemo(() => ({
        api, register, setRegister, details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor, profileOptions, setprofileOptions, email, setemail, closePopup, otp, setotp, password, setpassword, isAuthenticated, setisAuthenticated, loading, setloading, checkVisitAndTrack
    }), [api, register, setRegister, details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor, profileOptions, setprofileOptions, email, setemail, closePopup, otp, setotp, password, setpassword, isAuthenticated, setisAuthenticated, loading, setloading, checkVisitAndTrack]);


    // const contextvalue = {
    //     api, register, setRegister, details, setdetails, fetchUserDetails, options, setoptions, progress, setprogress, randcolor, profileOptions, setprofileOptions, email, setemail, closePopup, otp, setotp, password, setpassword, isAuthenticated, setisAuthenticated, loading, setloading
    // }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
