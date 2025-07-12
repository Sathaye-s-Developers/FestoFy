import React, { useContext, useState } from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Login_PopUp from './Components/Login_PopUp'
import { EventAppContext } from './Context/EventContext'
import Event from './Pages/Event_Components/Event'
import { Routes, Route } from "react-router-dom"
import AddEventpg from './Pages/Event_Components/Pages/AddEventpg'
import NewHomepg from './Pages/NewHomepg'
import Mobile_Options from './Components/Mobile_Options'
import LoadingBar from "react-top-loading-bar";

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
        {/* <Route path='/Event' element={token ? <Event /> : <Home />} /> */}
        <Route path='/Event' element={<Event />} />
        <Route path='/AddEvent' element={<AddEventpg />} />
      </Routes>
      {/* <NewHomepg/> */}
    </div >
  )
}

export default App
