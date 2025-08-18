import React, { useContext, useEffect, useMemo, useState } from 'react'
import { EventAppContext } from '../../../Context/EventContext'
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, ChevronDown, Heart, Share2, Bookmark, ArrowRight, Tag, Trophy, Music, Palette, Code, Gamepad2, BookOpen, Mic, Camera, Zap, X, CheckCircle } from 'lucide-react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from 'axios';
import E_Nav_Back from '../Components/E_Nav_Back';
import { useParams } from 'react-router';
import { useCallback } from 'react';
import { LiaUniversitySolid } from "react-icons/lia";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdOutlineDescription } from "react-icons/md";
import Loading_comp2 from '../../Admin/loading_comp2';

const Sub_Event_pg = () => {
  const { api } = useContext(EventAppContext)
  const { eventId } = useParams();
  const [EventInfo, setEventInfo] = useState(null)
  const [subEventInfo, setsubEventInfo] = useState(null)
  const [loading, setloading] = useState(true)

  const getColorClasses = (color) => {
    const colorMap = {
      cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-400/30 text-cyan-400',
      pink: 'from-pink-500/20 to-pink-600/20 border-pink-400/30 text-pink-400',
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-400',
      green: 'from-green-500/20 to-green-600/20 border-green-400/30 text-green-400',
      purple: 'from-purple-500/20 to-purple-600/20 border-purple-400/30 text-purple-400',
      orange: 'from-orange-500/20 to-orange-600/20 border-orange-400/30 text-orange-400',
      indigo: 'from-indigo-500/20 to-indigo-600/20 border-indigo-400/30 text-indigo-400',
      red: 'from-red-500/20 to-red-600/20 border-red-400/30 text-red-400'
    };
    return colorMap[color] || colorMap.cyan;
  };
  const getSubEventIcon = useCallback((type) => {
    const icons = {
      workshop: Code,
      competition: Trophy,
      talk: Mic,
      performance: Music,
      ceremony: Star
    };
    return icons[type] || Code;
  }, []);

  const getSubEventTypeColor = useCallback((type) => {
    const typeColors = {
      workshop: 'from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-400',
      competition: 'from-red-500/20 to-red-600/20 border-red-400/30 text-red-400',
      talk: 'from-green-500/20 to-green-600/20 border-green-400/30 text-green-400',
      performance: 'from-purple-500/20 to-purple-600/20 border-purple-400/30 text-purple-400',
      ceremony: 'from-yellow-500/20 to-yellow-600/20 border-yellow-400/30 text-yellow-400'
    };
    return typeColors[type] || typeColors.workshop;
  }, []);


  const getAvailabilityStatus = (current, max) => {
    if (!max) {
      return { status: 'open', color: 'text-green-400', text: 'Open Registration' };
    }

    const percentage = (current / max) * 100;

    if (percentage >= 100) {
      return { status: 'full', color: 'text-red-400', text: 'Fully Booked' };
    }

    if (percentage >= 80) {
      return { status: 'limited', color: 'text-yellow-400', text: 'Limited Spots' };
    }

    return { status: 'available', color: 'text-green-400', text: 'Available' };
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technical: "text-blue-400 bg-blue-500/20",
      Cultural: "text-pink-400 bg-pink-500/20",
      Sports: "text-green-400 bg-green-500/20",
      Arts: "text-purple-400 bg-purple-500/20",
      Gaming: "text-orange-400 bg-orange-500/20",
      Academic: "text-indigo-400 bg-indigo-500/20",
    };
    return colors[category] || "text-cyan-400 bg-cyan-500/20";
  };
  const FetchsingleEvent = async () => {
    try {

      const response = await api.get(`/Festofy/user/event/${eventId}`, { withCredentials: true, })
      setEventInfo(response.data.event)
      setsubEventInfo(response.data.event.subEvents)
    } catch (err) {
      console.log(err)
    } finally {
      setloading(false);
    }

  }

  useEffect(() => {
    FetchsingleEvent()
  }, [])

  return (
    <div className='min-h-screen bg-black'>
      {/* <loading_comp loading={loading} /> */}
      <Loading_comp2 loading={loading}/>
      <E_Nav_Back />
      {EventInfo && (
        < div>
          <div className="w-full overflow-hidden animate-scaleIn ">
            <div className="p-8 ml-12 mr-12 mt- bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl border border-cyan-400/20">
              <div className='flex items-center gap-4 ml-4'>
                <img
                  src={EventInfo.bannerUrl}
                  alt={EventInfo.title}
                  loading="lazy"
                  className="object-contain rounded-xl w-15 h-15"
                />
                <h2 className={`text-2xl md:text-3xl font-bold ${getColorClasses(getCategoryColor(EventInfo.department))}  mb-3`}>{EventInfo.title}</h2>
              </div>
              <div className="flex flex-col items-start md:flex-row gap-6 rounded-[20px] overflow-hidden">
                <div className="flex flex-col p-4 items-start w-full">
                  <p className="text-gray-300 mb-4 font-bold">Event Details :</p>
                  <div className='flex gap-2'>
                    <MdOutlineDescription className="w-6 h-6 text-cyan-400" />
                    <p className="text-gray-300 mb-4">{EventInfo.description}</p>
                  </div>
                  <div className='flex gap-2'>
                    <div>
                      {EventInfo.visibility === "college" ? <LiaUniversitySolid className="w-6 h-6 text-cyan-400" /> : <AiOutlineGlobal className="w-6 h-6 text-cyan-400" />}
                    </div>
                    <p className="text-gray-300 mb-4">Participants Allowed : {EventInfo.visibility === "college" ? "Only Your College Students Allowed" : "All College Students Allowed"}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {EventInfo?.tags?.slice(0, 3).map((tag, tagIndex) => (
                      <div key={tagIndex} className="flex items-center space-x-1 px-3 py-1 bg-slate-700/50 rounded-lg">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{tag}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 mb-4">~~ Hosted By {EventInfo.organiser_name}</p>
                  <div className={`px-4 py-1 bg-gradient-to-r ${getColorClasses(getCategoryColor(EventInfo.department))} rounded-full border`}>
                    <span className="text-sm font-semibold text-center">{EventInfo.department}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }

      {
        subEventInfo?.length === 0 && (
          <div className="text-gray-400 text-center mt-16 text-4xl">No SubEvents Found</div>
        )
      }


      {/* subevent comp */}
      <div className='flex flex-col items-center mt-3'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-10 w-full md:w-[80%]">
          {subEventInfo?.map((subEvent, index) => {
            const SubEventIcon = getSubEventIcon(subEvent.subEventCategory);
            const typeColorClasses = getSubEventTypeColor(subEvent.subEventCategory);
            const availability = getAvailabilityStatus(subEvent.currentParticipants, subEvent.maxParticipants);

            return (
              <div
                key={subEvent._id}
                className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-cyan-400/20 p-6 hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Sub-event Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${typeColorClasses} rounded-xl border`}>
                    <SubEventIcon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className={`px-3 py-1 bg-gradient-to-r ${typeColorClasses} rounded-lg border text-xs font-semibold capitalize`}>
                      {subEvent.subEventCategory}
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${availability.color} bg-current/10`}>
                      {availability.text}
                    </div>
                  </div>
                </div>

                {/* Sub-event Details */}
                <h3 className="text-xl font-bold text-white mb-2">{subEvent.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{subEvent.description}</p>

                {/* Time and Location */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-3 text-gray-300 text-sm">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>{subEvent.time}</span>
                    <span className="text-gray-500">({subEvent.duration})</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 text-sm">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{subEvent.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 text-sm">
                    <FaIndianRupeeSign className="w-4 h-4 text-cyan-400" />
                    <span>Entry Fee: {subEvent.price===0?"Free":subEvent.price}</span>
                  </div>
                </div>

                {/* Participants Progress */}
                {subEvent.maxParticipants && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span>Participants</span>
                      </div>
                      <span className="text-white font-medium">
                        10/{subEvent.maxParticipants}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((10 / subEvent.maxParticipants) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {subEvent.requirements && (
                  <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-gray-600/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-medium text-cyan-400">Requirements</span>
                    </div>
                    <p className="text-xs text-gray-400">{subEvent.requirements}</p>
                  </div>
                )}

                {/* Prizes */}
                {subEvent.prizes && subEvent.prizes.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-400">Prizes & Rewards</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {subEvent.prizes.map((prize, prizeIndex) => (
                        <div key={prizeIndex} className="flex items-center space-x-3 p-2 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
                          <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {prizeIndex + 1}
                          </div>
                          <span className="text-yellow-400 text-sm font-medium">{prize.replace(/\$/g, '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}



                <button
                  disabled={availability.status === 'full'}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${availability.status === 'full'
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500'
                    }`}
                >
                  {availability.status === 'full' ? (
                    <>
                      <span>Fully Booked</span>
                    </>
                  ) : (
                    <>
                      <span>Register Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div >
  )
}

export default Sub_Event_pg
