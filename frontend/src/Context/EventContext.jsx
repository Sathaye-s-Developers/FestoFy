import axios, { Axios } from "axios"
import { createContext, useEffect, useState } from "react"

export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [register, setRegister] = useState(false)
    const [token, settoken] = useState(() => localStorage.getItem("token") || "");
    const [isAuth,setisAuth]=useState(false)

    const url = "http://localhost:3000"
    const [details, setdetails] = useState("")

    const fetchUserDetails = async (token) => {
        try {
            const response = await axios.get(url + "/Festofy/user/user_details", { headers: { Authorization: `Bearer ${token}` } })
            const { username } = response.data.user
            setdetails(username)
            setisAuth(true)
        } catch (err) {
            console.log(err)
            setisAuth(false)
        }
    }


    useEffect(() => {
        const storedtoken = localStorage.getItem("token")
        if (storedtoken && storedtoken.split(".").length !== 3 && isAuth) {
            settoken(storedtoken)
            fetchUserDetails(storedtoken)
        }
    }, [token])
    const contextvalue = {
        register, setRegister, url, token, settoken, details, setdetails, fetchUserDetails,isAuth
    }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
