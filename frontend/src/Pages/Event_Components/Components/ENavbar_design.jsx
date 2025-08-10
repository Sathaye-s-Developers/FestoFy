import React, { useContext, useEffect, useRef, useState } from 'react'
import E_Navbar from './E_Navbar'
import EventOptions from "./EventOptions"
import Main_Event from './Main_Event'
import { EventAppContext } from '../../../Context/EventContext'

const ENavbar_design = () => {
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
        <Main_Event />
        {profileOptions && <EventOptions popupRef={popupRef} />}

      </div>
    </div>
  )
}

export default ENavbar_design
