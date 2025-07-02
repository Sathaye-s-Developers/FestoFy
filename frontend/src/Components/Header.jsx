import React, { useContext } from 'react'
import { EventAppContext } from '../Context/EventContext'

const Header = () => {
    const { setRegister, token } = useContext(EventAppContext)
    return (
        <div>
            <main className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="max-w-6xl mx-auto">
                    {/* Main Heading - Exact gradient text from image */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-white bg-clip-text text-transparent">
                            All-In-One
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                            College Event Hub
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed hover:text-gray-200 transition-colors duration-300">
                        All-in-one platform to effortlessly plan, promote, and manage your college events.
                        Simplify the chaos, amplify the experience!
                    </p>

                    {/* CTA Button - Exact styling from image */}
                    <button className="group px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/40 relative overflow-hidden" onClick={()=>{
                            if(!token){
                                setRegister(true)
                            }else{
                                console.log("hello")
                            }
                        }}>
                        <span className="relative z-10" >Get Started</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Header
