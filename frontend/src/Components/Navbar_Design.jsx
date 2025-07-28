import React from 'react'
import Navbar from "../Components/Navbar"
import Header from './Header';
import Features from "../Components/Features"
import EventGalary from './EventGalary';
import About from '../Pages/About';
import EnquiryOption from "./EnquiryOption"
import Tutorialsteps from './Tutorialsteps';

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
                {/* <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}></div> */}
            </div>

            <Navbar />

            <main className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="max-w-6xl mx-auto">
                    <Header />
                    <Features />
                    <Tutorialsteps/>
                    <EventGalary />
                    <About />
                    <EnquiryOption/>
                </div>

            </main>
        </div>
    )
}

export default Navbar_Design
