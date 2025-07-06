import React from 'react'
import facebook from "../assets/facebook_icon.png"
import linkdin from "../assets/linkedin_icon.png"
import twitter from "../assets/twitter_icon.png"
import { CheckCircle , Target,Heart ,Award } from "lucide-react"

const About = () => {
  const achievements = [
    'Winner of Best EdTech Platform 2024',
    'Trusted by 500+ Educational Institutions',
    'Featured in TechCrunch and Forbes',
    '4.9/5 Rating from 10,000+ Users'
  ];
  const stats = [
    { number: '10K+', label: 'Events Organized' },
    { number: '500+', label: 'Colleges Trust Us' },
    { number: '1M+', label: 'Students Reached' },
    { number: '99.9%', label: 'Uptime Guarantee' }
  ];
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly evolve our platform to meet the changing needs of modern college events'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building stronger campus communities through memorable and engaging events'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering exceptional experiences that exceed expectations every time'
    }
  ];



  return (
    <div className="mb-20" id='About'>
      <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl border border-cyan-400/20 p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Festofy</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Our Story</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Founded in 2022 by a team of passionate college students and tech enthusiasts, Festofy was born from the frustration of organizing campus events with outdated tools and fragmented systems. We experienced firsthand the challenges of coordinating teams, managing budgets, and engaging audiences.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Today, we're proud to serve over 500 educational institutions worldwide, helping them create memorable experiences that bring communities together. Our platform has facilitated over 10,000 successful events, reaching more than 1 million students globally.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              To revolutionize how educational institutions plan, promote, and execute events by providing an intuitive, comprehensive platform that eliminates complexity and maximizes engagement.
            </p>

            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-300">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl border border-cyan-400/30 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
