import React from 'react'
import {Mail,Phone,MapPin,CheckCircle,Send } from "lucide-react"
const EnquiryOption = () => {
    const eventTypes = [
    'Cultural Festival',
    'Technical Symposium',
    'Sports Meet',
    'Academic Conference',
    'Workshop/Seminar',
    'Alumni Meet',
    'Freshers Party',
    'Farewell Event',
    'Other'
  ];
    return (
        <div className="mb-20" id='Enquiry'>
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl border border-cyan-400/20 p-8 md:p-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Get In <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Touch</span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Ready to transform your college events? Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 group">
                                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">Email</h4>
                                        <p className="text-gray-300">hello@festofy.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 group">
                                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">Phone</h4>
                                        <p className="text-gray-300">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 group">
                                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">Address</h4>
                                        <p className="text-gray-300">123 Innovation Street<br />Tech City, TC 12345</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Why Choose Festofy?</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                    <span className="text-gray-300">24/7 Customer Support</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                    <span className="text-gray-300">Free Setup & Training</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                    <span className="text-gray-300">30-Day Money Back Guarantee</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                    <span className="text-gray-300">Custom Integration Support</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"

                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"

                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
   
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="college" className="block text-sm font-medium text-gray-300 mb-2">
                                        College/Institution *
                                    </label>
                                    <input
                                        type="text"
                                        id="college"
                                        name="college"
           
                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                        placeholder="Enter your college name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-2">
                                    Event Type
                                </label>
                                <select
                                    id="eventType"
                                    name="eventType"
        
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                >
                                    <option value="">Select event type</option>
                                    {eventTypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                                    placeholder="Tell us about your event requirements..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="group w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-cyan-500/30"
                            >
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                <span>Send Enquiry</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnquiryOption
