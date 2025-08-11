import React, { useContext, useEffect, useRef, useState } from 'react'
import E_Navbar from './Components/E_Navbar'
import EventOptions from "./Components/EventOptions"
import Main_Event from './Components/Main_Event'
import { EventAppContext } from '../../Context/EventContext'
import MyCollege_Events from './Event_pg_Components/MyCollege_Events'


const Event = () => {
    const { profileOptions, setprofileOptions } = useContext(EventAppContext)
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popupRef.current && !popupRef.current.contains(event.target)
            ) {
                setprofileOptions(false);
            }
        };

        if (profileOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileOptions]);

    return (
        <div>
            <div className="min-h-screen bg-black">
                <E_Navbar />
                <Main_Event/>
                <MyCollege_Events />
                {profileOptions && <EventOptions popupRef={popupRef} />}

            </div>
        </div>
    )
}

export default Event
