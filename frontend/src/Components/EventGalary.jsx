import React, { useState } from 'react'
import { Star, ArrowRight } from "lucide-react";
const EventGalary = () => {
    const [activeGalleryImage, setActiveGalleryImage] = useState(null);

    const galleryImages = [
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400'
    ];

    return (
        <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fadeInUp">
                Event <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Gallery</span>
            </h2>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                Discover the amazing events our platform has helped bring to life
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => {
                    const isActive = activeGalleryImage === index;
                    return (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer transform animate-fadeInUp ${isActive
                                    ? 'border-cyan-400/60 scale-105 -translate-y-2 shadow-lg shadow-cyan-500/20'
                                    : 'border-cyan-400/20 hover:border-cyan-400/40 hover:scale-105 hover:-translate-y-2'
                                }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => setActiveGalleryImage(isActive ? null : index)}
                            onTouchStart={() => setActiveGalleryImage(index)}
                            onTouchEnd={() => setTimeout(() => setActiveGalleryImage(null), 3000)}
                        >
                            <img
                                src={image}
                                alt={`Event ${index + 1}`}
                                className={`w-full h-64 object-cover transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                                    }`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                }`}></div>
                            <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${isActive ? 'translate-y-0 opacity-100' : 'transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100'
                                }`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-white font-semibold">Featured Event</h4>
                                        <p className="text-cyan-300 text-sm">College Festival</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-white text-sm">4.9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default EventGalary
