import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, ChevronDown, Heart, Share2, Bookmark, ArrowRight, Tag, Trophy, Music, Palette, Code, Gamepad2, BookOpen, Mic, Camera, Zap } from 'lucide-react';
const Event_filteSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [likedEvents, setLikedEvents] = useState([]);
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    const categories = [
        { name: 'All', icon: Calendar, color: 'cyan' },
        { name: 'Cultural', icon: Music, color: 'pink' },
        { name: 'Technical', icon: Code, color: 'blue' },
        { name: 'Sports', icon: Trophy, color: 'green' },
        { name: 'Arts', icon: Palette, color: 'purple' },
        { name: 'Gaming', icon: Gamepad2, color: 'orange' },
        { name: 'Academic', icon: BookOpen, color: 'indigo' },
        { name: 'Entertainment', icon: Mic, color: 'red' }
    ];

    const filters = ['All', 'Today', 'This Week', 'This Month', 'Free', 'Paid', 'Featured'];

    const events = [
        {
            id: 1,
            title: 'TechFest 2024 - Innovation Summit',
            description: 'Join us for the biggest technical festival featuring AI workshops, coding competitions, and tech talks by industry leaders.',
            date: '2024-03-15',
            time: '09:00 AM',
            location: 'Main Auditorium, Tech Campus',
            college: 'MIT College of Engineering',
            category: 'Technical',
            attendees: 450,
            maxAttendees: 500,
            price: 0,
            rating: 4.8,
            image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
            tags: ['AI', 'Coding', 'Innovation', 'Workshops'],
            featured: true,
            organizer: 'Tech Society'
        },
        {
            id: 2,
            title: 'Cultural Extravaganza - Rang Bhoomi',
            description: 'Experience the vibrant colors of culture with dance performances, music concerts, and traditional art exhibitions.',
            date: '2024-03-20',
            time: '06:00 PM',
            location: 'Open Air Theatre',
            college: 'Delhi University',
            category: 'Cultural',
            attendees: 320,
            maxAttendees: 400,
            price: 150,
            rating: 4.9,
            image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
            tags: ['Dance', 'Music', 'Traditional', 'Performance'],
            featured: true,
            organizer: 'Cultural Committee'
        },
        {
            id: 3,
            title: 'Inter-College Sports Championship',
            description: 'Compete in various sports including cricket, football, basketball, and athletics. Show your sporting spirit!',
            date: '2024-03-25',
            time: '08:00 AM',
            location: 'Sports Complex',
            college: 'Sports University',
            category: 'Sports',
            attendees: 280,
            maxAttendees: 600,
            price: 50,
            rating: 4.7,
            image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=600',
            tags: ['Cricket', 'Football', 'Basketball', 'Athletics'],
            featured: false,
            organizer: 'Sports Committee'
        },
        {
            id: 4,
            title: 'Digital Art & Design Workshop',
            description: 'Learn digital art techniques, UI/UX design principles, and create stunning visual content with industry professionals.',
            date: '2024-03-18',
            time: '02:00 PM',
            location: 'Design Lab, Creative Block',
            college: 'Art & Design Institute',
            category: 'Arts',
            attendees: 85,
            maxAttendees: 100,
            price: 200,
            rating: 4.6,
            image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
            tags: ['Digital Art', 'UI/UX', 'Design', 'Creative'],
            featured: false,
            organizer: 'Design Club'
        },
        {
            id: 5,
            title: 'Gaming Tournament - Battle Royale',
            description: 'Ultimate gaming showdown featuring popular games like PUBG, Valorant, and FIFA. Win exciting prizes!',
            date: '2024-03-22',
            time: '10:00 AM',
            location: 'Gaming Arena, Student Center',
            college: 'Gaming Institute',
            category: 'Gaming',
            attendees: 150,
            maxAttendees: 200,
            price: 100,
            rating: 4.5,
            image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
            tags: ['PUBG', 'Valorant', 'FIFA', 'Tournament'],
            featured: false,
            organizer: 'Gaming Society'
        },
        {
            id: 6,
            title: 'Academic Conference - Future of Education',
            description: 'Explore the future of education with renowned speakers discussing EdTech, online learning, and innovative teaching methods.',
            date: '2024-03-28',
            time: '11:00 AM',
            location: 'Conference Hall',
            college: 'Education University',
            category: 'Academic',
            attendees: 200,
            maxAttendees: 300,
            price: 0,
            rating: 4.4,
            image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
            tags: ['EdTech', 'Innovation', 'Teaching', 'Future'],
            featured: false,
            organizer: 'Academic Council'
        }
    ];



    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.college.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

        const matchesFilter = selectedFilter === 'All' ||
            (selectedFilter === 'Free' && event.price === 0) ||
            (selectedFilter === 'Paid' && event.price > 0) ||
            (selectedFilter === 'Featured' && event.featured);

        return matchesSearch && matchesCategory && matchesFilter;
    });

    const getColorClasses = (color) => {
        const colorMap = {
            cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-400/30 text-cyan-400',
            pink: 'from-pink-500/20 to-pink-600/20 border-pink-400/30 text-pink-400',
            blue: 'from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-400',
            green: 'from-green-500/20 to-green-600/20 border-green-400/30 text-green-400',
            purple: 'from-purple-500/20 to-purple-600/20 border-purple-400/30 text-purple-400',
            orange: 'from-orange-500/20 to-orange-600/20 border-orange-400/30 text-orange-400',
            indigo: 'from-indigo-500/20 to-indigo-600/20 border-indigo-400/30 text-indigo-400',
            red: 'from-red-500/20 to-red-600/20 border-red-400/30 text-red-400'
        };
        return colorMap[color] || colorMap.cyan;
    };

    const getCategoryColor = (categoryName) => {
        const category = categories.find(cat => cat.name === categoryName);
        return category?.color || 'cyan';
    };


    return (
        <div>
            <div className="min-h-screen pt-24 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Search and Filter Section */}
                    <div className="mb-12 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-cyan-400/20 p-6">
                            {/* Search Bar */}
                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search events, colleges, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                />
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="text-white font-semibold mb-4">Categories</h3>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map((category) => {
                                        const IconComponent = category.icon;
                                        const isSelected = selectedCategory === category.name;
                                        const colorClasses = getColorClasses(category.color);

                                        return (
                                            <button
                                                key={category.name}
                                                onClick={() => setSelectedCategory(category.name)}
                                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-300 transform hover:scale-105 active:scale-95 ${isSelected
                                                    ? `bg-gradient-to-r ${colorClasses} scale-105`
                                                    : 'bg-slate-700/30 border-gray-600 text-gray-300 hover:border-cyan-400/40'
                                                    }`}
                                            >
                                                <IconComponent className="w-4 h-4" />
                                                <span className="text-sm font-medium">{category.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative">
                                    <button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white hover:border-cyan-400 transition-all duration-300"
                                    >
                                        <Filter className="w-4 h-4" />
                                        <span>Filter: {selectedFilter}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isFilterOpen && (
                                        <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-cyan-400/30 rounded-xl shadow-xl z-10 min-w-[150px]">
                                            {filters.map((filter) => (
                                                <button
                                                    key={filter}
                                                    onClick={() => {
                                                        setSelectedFilter(filter);
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 hover:bg-cyan-500/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${selectedFilter === filter ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-300'
                                                        }`}
                                                >
                                                    {filter}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>




                                {/* Events Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredEvents.map((event, index) => {
                                        const isLiked = likedEvents.includes(event.id);
                                        const isBookmarked = bookmarkedEvents.includes(event.id);
                                        const categoryColor = getCategoryColor(event.category);
                                        const colorClasses = getColorClasses(categoryColor);

                                        return (
                                            <div
                                                key={event.id}
                                                className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-cyan-400/20 overflow-hidden hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                {/* Event Image */}
                                                <div className="relative overflow-hidden">
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />

                                                    {/* Featured Badge */}
                                                    {event.featured && (
                                                        <div className="absolute top-4 left-4 flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 rounded-full">
                                                            <Zap className="w-3 h-3 text-white" />
                                                            <span className="text-white text-xs font-semibold">Featured</span>
                                                        </div>
                                                    )}

                                                    {/* Action Buttons */}
                                                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button
                                                            onClick={() => toggleLike(event.id)}
                                                            className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${isLiked
                                                                ? 'bg-red-500/80 border-red-400 text-white'
                                                                : 'bg-black/40 border-white/20 text-white hover:bg-red-500/80'
                                                                }`}
                                                        >
                                                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                                        </button>
                                                        <button
                                                            onClick={() => toggleBookmark(event.id)}
                                                            className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${isBookmarked
                                                                ? 'bg-cyan-500/80 border-cyan-400 text-white'
                                                                : 'bg-black/40 border-white/20 text-white hover:bg-cyan-500/80'
                                                                }`}
                                                        >
                                                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                                                        </button>
                                                        <button className="p-2 rounded-full bg-black/40 border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                                                            <Share2 className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Price Badge */}
                                                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                                                        <span className="text-white text-sm font-semibold">
                                                            {event.price === 0 ? 'Free' : `₹${event.price}`}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Event Content */}
                                                <div className="p-6">
                                                    {/* Category and Rating */}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className={`px-3 py-1 bg-gradient-to-r ${colorClasses} rounded-full border`}>
                                                            <span className="text-xs font-semibold">{event.category}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                            <span className="text-white text-sm font-medium">{event.rating}</span>
                                                        </div>
                                                    </div>

                                                    {/* Event Title */}
                                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                                                        {event.title}
                                                    </h3>

                                                    {/* Event Description */}
                                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                        {event.description}
                                                    </p>

                                                    {/* Event Details */}
                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex items-center space-x-2 text-gray-300 text-sm">
                                                            <Calendar className="w-4 h-4 text-cyan-400" />
                                                            <span>{new Date(event.date).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-gray-300 text-sm">
                                                            <Clock className="w-4 h-4 text-cyan-400" />
                                                            <span>{event.time}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-gray-300 text-sm">
                                                            <MapPin className="w-4 h-4 text-cyan-400" />
                                                            <span className="truncate">{event.location}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-gray-300 text-sm">
                                                            <Users className="w-4 h-4 text-cyan-400" />
                                                            <span>{event.attendees}/{event.maxAttendees} attending</span>
                                                        </div>
                                                    </div>

                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {event.tags.slice(0, 3).map((tag, tagIndex) => (
                                                            <div key={tagIndex} className="flex items-center space-x-1 px-2 py-1 bg-slate-700/50 rounded-lg">
                                                                <Tag className="w-3 h-3 text-gray-400" />
                                                                <span className="text-xs text-gray-400">{tag}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* College and Organizer */}
                                                    <div className="text-xs text-gray-500 mb-4">
                                                        <div>Organized by <span className="text-cyan-400">{event.organizer}</span></div>
                                                        <div>at <span className="text-cyan-400">{event.college}</span></div>
                                                    </div>

                                                    {/* Register Button */}
                                                    <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 active:scale-95 transition-all duration-300 font-semibold">
                                                        <span>Register Now</span>
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* No Events Found */}
                                {filteredEvents.length === 0 && (
                                    <div className="text-center py-16 animate-fadeInUp">
                                        <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-cyan-400/20 max-w-md mx-auto">
                                            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold text-white mb-2">No Events Found</h3>
                                            <p className="text-gray-400">Try adjusting your search criteria or filters to find more events.</p>
                                        </div>
                                    </div>

                                )}

                                <div className="text-gray-400 text-sm">
                                    {filteredEvents.length} events found
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event_filteSection
