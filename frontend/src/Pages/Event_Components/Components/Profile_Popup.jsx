import React, { useContext, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { EventAppContext } from '../../../Context/EventContext';

const Profile_Popup = ({ profileOptions, setprofileOptions, popupRef }) => {
    const { details, randcolor } = useContext(EventAppContext)

    return (
        <div ref={popupRef}>
            <div className={`h-full fixed top-2 right-0 lg:w-[28vw] xl:w-[22vw] sm:w-[44vw] md:w-[35vw] w-[60vw] max-w-[60vw] z-50 transition-transform ease-in-out transform ${profileOptions ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="rounded-[18px] h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-r border-cyan-400/20 shadow-2xl">
                    <div className='px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center'>
                        <div className='flex flex-col items-center space-y-3 text-center'>
                            {details.username ? (
                                <div className={`border-slate-200  border-2 w-14 h-14 rounded-[50%] flex items-center justify-center`} style={{ backgroundColor: randcolor }}>
                                    <p className='text-3xl text-center text-gray-200 font-bold drop-shadow-sm'>{details.username?.charAt(0).toUpperCase()}</p>
                                </div>
                            ) : (
                                <CgProfile className='text-slate-400' size={60} />
                            )}

                            <p className='text-slate-50 font-bold m-1 sm:text-lg text-sm break-all'>Welcome , {details.username?.charAt(0).toUpperCase() + details.username?.slice(1).toLowerCase()}
                            </p>
                            <p className='text-slate-300 text-sm  break-all'>{details.email}</p>
                        </div>
                        <hr className='border-y-white mt-5 '/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile_Popup