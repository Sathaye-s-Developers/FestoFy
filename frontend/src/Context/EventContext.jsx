import axios, { Axios } from "axios"
import { createContext, useEffect, useState } from "react"

export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [register, setRegister] = useState(false)
    const [token, settoken] = useState("")
    const url = "http://localhost:3000"
    const [details, setdetails] = useState("")

    const fetchUserDetails = async (token) => {
        try {
            const response = await axios.get(url + "/Festofy/user/user_details", { headers: { Authorization: `Bearer ${token}` } })
            const { username } = response.data.user
            setdetails(username)
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
    }, [])
    const contextvalue = {
        register, setRegister, url, token, settoken, details, setdetails, fetchUserDetails
    }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
