import React from 'react'
import Navbar from "../Components/Navbar"
const Navbar_Design = () => {
    return (
        <div className="min-h-screen relative overflow-hidden" style={{
            background: `linear-gradient(135deg, 
        #121E31 0%, 
        #164064 35%, 
        #3D2E52 70%, 
        #1D4547 100%)`
        }}>
            {/* Geometric Grid Overlay - Matching image opacity */}
            <div className="absolute inset-0 opacity-25">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}></div>
            </div>
            <div className="absolute top-32 left-16 w-4 h-4 bg-cyan-400 rounded-full blur-sm animate-pulse opacity-90"></div>
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-emerald-400 rounded-full blur-sm animate-pulse opacity-80"></div>
            <div className="absolute bottom-1/3 left-1/4 w-5 h-5 bg-pink-500 rounded-full blur-md animate-bounce opacity-70"></div>
            <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-pink-400 rounded-full blur-sm animate-bounce opacity-75"></div>
            <div className="absolute top-1/2 left-1/5 w-2 h-2 bg-cyan-300 rounded-full blur-sm animate-ping opacity-60"></div>
            <div className="absolute top-3/4 right-1/5 w-3 h-3 bg-green-400 rounded-full blur-sm animate-pulse opacity-85"></div>
            
            <Navbar/>

            {/* Floating Lines - Exact positions from image */}
            <div className="absolute top-1/4 right-10 w-px h-32 bg-gradient-to-b from-cyan-400/60 to-transparent"></div>
            <div className="absolute bottom-1/4 left-10 w-px h-24 bg-gradient-to-t from-pink-400/60 to-transparent"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-px bg-gradient-to-r from-emerald-400/60 to-transparent"></div>
            <div className="absolute bottom-1/3 left-1/3 w-16 h-px bg-gradient-to-l from-purple-400/60 to-transparent"></div>

            {/* Additional animated elements matching image */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping opacity-50"></div>
            </div>
        </div>
    )
}

export default Navbar_Design
