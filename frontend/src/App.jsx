import React, { useContext, useState } from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Login_PopUp from './Components/Login_PopUp'
import { EventAppContext } from './Context/EventContext'
import Event from './Pages/Event_Components/Event'
import { Routes, Route } from "react-router-dom"
import AddEventpg from './Pages/Event_Components/Pages/AddEventpg'

const App = () => {
  const { register,token} = useContext(EventAppContext)
  return (
    <div>
      <div className='app'>
        {register === true ? <Login_PopUp /> : <></>}
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Event' element={token?<Event />:<Home/>} />
          <Route path='/AddEvent' element={<AddEventpg/>}/>
        </Routes>
      </div>
      <About />

    </div >
  )
}

export default App
