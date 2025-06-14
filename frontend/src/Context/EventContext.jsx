import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const EventAppContext = createContext(null)

const EventContext = (props) => {
    const [register, setRegister] = useState(false)
   
    const contextvalue = {
        register, setRegister
    }
    return (
        <EventAppContext.Provider value={contextvalue}>
            {props.children}
        </EventAppContext.Provider>
    )
}

export default EventContext
