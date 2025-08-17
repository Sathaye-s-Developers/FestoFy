import React, { useContext, useState } from 'react'
import Home from './Pages/Home'
import Login_PopUp from './Components/Login_PopUp'
import { EventAppContext } from './Context/EventContext'
import Event from './Pages/Event_Components/Event'
import { Routes, Route } from "react-router-dom"
import Mobile_Options from './Components/Mobile_Options'
import LoadingBar from "react-top-loading-bar";
import Profilepg from './Pages/Event_Components/Components/Profilepg'
import Loading_comp from "./Components/Loading_comp"

import InterCollege_Events from './Pages/Event_Components/Event_pg_Components/InterCollege_Events'
import Sub_Event_pg from './Pages/Event_Components/Event_pg_Components/Sub_Event_pg'
import AdminPg from './Pages/Admin/AdminPg'
import SuperKeyPopup from './Pages/Event_Components/Components/SuperKeyPopup'

const App = () => {
  const { register, loading, options, setprogress, progress, isAuthenticated, admin, key } = useContext(EventAppContext)
  if (loading) {
    return <Loading_comp />;
  }
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
      {key ? <SuperKeyPopup /> : <></>}
      <Routes>
        {/* <Route path='/' element={<Loading_comp><Home /></Loading_comp>} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Event/*' element={isAuthenticated ? <Event /> : <Home />} />
        {/* <Route path='/Event' element={<Event />} /> */}

        <Route path='/Profile' element={isAuthenticated ? <Profilepg /> : <Home />} />
        <Route path='/InterCollegateEvents' element={isAuthenticated ? <InterCollege_Events /> : <Home />} />
        <Route path='/SubEvent/:eventId' element={isAuthenticated ? <Sub_Event_pg /> : <Home />} />
        <Route path='/Admin/*' element={(isAuthenticated && admin) ? <AdminPg /> : <Home />} />
      </Routes>
    </div >
  )
}

export default App
