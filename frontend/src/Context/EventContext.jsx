import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [register, setRegister] = useState(false)
    const [token, settoken] = useState("")
    const url = "http://localhost:3000"
    
    useEffect(()=>{
        const storedtoken=localStorage.getItem("token")
        settoken(storedtoken)
    },[])
    const contextvalue = {
        register, setRegister, url, token, settoken
    }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
