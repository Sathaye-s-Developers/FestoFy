import React, { useContext, useState } from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Login_PopUp from './Components/Login_PopUp'
import { EventAppContext } from './Context/EventContext'
import Event from './Pages/Event_Components/Event'
import { Routes, Route } from "react-router-dom"
import Mobile_Options from './Components/Mobile_Options'
import LoadingBar from "react-top-loading-bar";
import Profilepg from './Pages/Event_Components/Components/Profilepg'

import Design_CreateEvent from './Pages/Event_Components/Pages/Design_CreateEvent'

const App = () => {
  const { register, token, options, setprogress, progress } = useContext(EventAppContext)
  return (
    <div>
      <div>
        <LoadingBar
          color="#ADD8E6"
          progress={progress}
          onLoaderFinished={() => setprogress(0)}
        /></div>
      {register === true ? <Login_PopUp /> : <></>}
      {options === true ? <Mobile_Options /> : <></>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Event' element={token ? <Event /> : <Home />} />
        {/* <Route path='/Event' element={<Event />} /> */}
        <Route path='/CreateEvent' element={<Design_CreateEvent/>}/>
        <Route path='/Profile' element={token ?<Profilepg/>:<Home/>}/>
      </Routes>
    </div >
  )
}

export default App
