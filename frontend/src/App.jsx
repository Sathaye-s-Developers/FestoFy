import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login_PopUp from "./Components/Login_PopUp";
import { EventAppContext } from "./Context/EventContext";
import Event from "./Pages/Event_Components/Event";
import AddEventpg from "./Pages/Event_Components/Pages/AddEventpg";
import NewHomepg from "./Pages/NewHomepg";
import Mobile_Options from "./Components/Mobile_Options";
import SuperAdminPanel from "./Pages/Event_Components/Pages/SuperAdmin";

const App = () => {
  const { register, token, options } = useContext(EventAppContext);

  return (
    <div>
      {/* Login Modal */}
      {register === true && <Login_PopUp />}

      {/* Mobile Options */}
      {options === true && <Mobile_Options />}

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Event" element={token ? <Event /> : <Home />} />
        <Route path="/AddEvent" element={<AddEventpg />} />
        <Route path="/Super_admin" element={<SuperAdminPanel />} />
      </Routes>

      {/* ✅ Floating Super Admin Button - Only visible if logged in */}
      {
        <div className="fixed bottom-5 right-5 z-50">
          <Link to="/Super_admin">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-lg transition-all duration-300">
              Super Admin Panel
            </button>
          </Link>
        </div>
      }
    </div>
  );
};

export default App;
