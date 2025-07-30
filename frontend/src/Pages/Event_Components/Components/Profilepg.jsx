import React, { useContext, useState } from 'react'
import { User, Calendar, Plus, Settings, LogOut, Trash2, Edit3, MapPin, Clock, Users, Star, Trophy, Heart, Bookmark, Share2, ArrowRight, ChevronRight, Camera, Mail, Phone, School, Award, Target, Activity } from 'lucide-react';
import E_Nav_Bac from './E_Nav_Back'
import { EventAppContext } from '../../../Context/EventContext';
import { FiEdit } from "react-icons/fi";

const Profilepg = () => {
  const { details, randcolor } = useContext(EventAppContext)
  return (
    <div>
      <div className="min-h-screen bg-black">
        <E_Nav_Bac />

        <div className='flex flex-col items-center'>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight animate-fadeInUp mt-3">
            <span className='bg-gradient-to-r from-cyan-400 via-teal-300 to-white bg-clip-text text-transparent'>Your Profile</span>
          </h1>
          <p className='text-xl md:text-2xl w-[80%] sm:w-[60%] md:w-[55%] text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed hover:text-gray-200 transition-colors duration-300 animate-fadeInUp text-center' style={{ animationDelay: '200ms' }}>Manage your events, create new experiences, and customize your profile</p>

          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl border border-cyan-400/20 p-8 mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className='md:flex justify-around gap-3 '>
              <div className="flex flex-col justify-center items-center gap-2 p-5">
                <div>
                  <p className='text-white text-8xl font-bold  w-40 h-40 rounded-full flex items-center justify-center border-cyan-200 border-4' style={{ backgroundColor: randcolor }}>{details.username?.charAt(0).toUpperCase()}</p>
                </div>
                <div>
                  <span className='text-center text-blue-100 font-semibold'>{details.username?.charAt(0).toUpperCase() + details.username?.slice(1).toLowerCase()}</span>
                </div>
              </div>
              <div className=' p-5'>
                <div className='w-full'>
                  <label className='text-white'>Name</label>
                  <div className='flex items-center gap-2'>
                    <p className='border-2 w-full border-cyan-300 rounded-[6px] p-2 mt-2 text-white shadow-amber-50'>{details.username}</p>
                    <FiEdit size={38} className='text-cyan-400 group-hover:text-cyan-300 transition-colors'/>
                  </div>
                </div>
                <div className='mt-2 w-full'>
                  <label className='text-white'>Email</label>
                  <div className='flex items-center gap-2'>
                    <p className='w-full border-2 border-cyan-300 rounded-[6px] p-2 mt-2 text-white shadow-amber-50'>{details.email}</p>
                    <FiEdit size={38} className='text-cyan-400 group-hover:text-cyan-300 transition-colors'/>
                  </div>
                  
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profilepg
