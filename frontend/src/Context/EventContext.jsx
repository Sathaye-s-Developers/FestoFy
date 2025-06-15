import axios, { Axios } from "axios"
import { createContext, useEffect, useState } from "react"

export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [register, setRegister] = useState(false)
    const [token, settoken] = useState("")
    const url = "http://localhost:3000"
    const [username,setusername]=useState("")

    const fetchUserDetails=async (token)=>{
        try{
            const response=await axios.get(url+"/Festofy/user/user_details",{headers:{Authorization:`Bearer ${token}`}})
        setusername(response.data.user.username)
        }catch(err){
            console.log(err)
        }
    }


    useEffect(()=>{
        const storedtoken=localStorage.getItem("token")
        settoken(storedtoken)
        fetchUserDetails(storedtoken)
    },[])
    const contextvalue = {
        register, setRegister, url, token, settoken,username,setusername
    }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
