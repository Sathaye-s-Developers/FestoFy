import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, DollarSign, Tag, Image, FileText, Save, Send, ArrowLeft, Plus, X, Upload, Eye, Star, Trophy, Music, Palette, Code, Gamepad2, BookOpen, Mic, Camera, Zap, CheckCircle } from 'lucide-react';

const CreateEventPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newTag, setNewTag] = useState('');

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    college: '',
    price: '',
    maxAttendees: '',
    tags: [],
    organizer: '',
    contactEmail: '',
    contactPhone: '',
    eventImage: '',
    requirements: '',
    agenda: '',
    featured: false
  });

  const categories = [
    { name: 'Technical', icon: Code, color: 'blue', description: 'Tech talks, hackathons, coding competitions' },
    { name: 'Cultural', icon: Music, color: 'pink', description: 'Dance, music, traditional performances' },
    { name: 'Sports', icon: Trophy, color: 'green', description: 'Athletic competitions and tournaments' },
    { name: 'Arts', icon: Palette, color: 'purple', description: 'Creative workshops and exhibitions' },
    { name: 'Gaming', icon: Gamepad2, color: 'orange', description: 'Gaming tournaments and competitions' },
    { name: 'Academic', icon: BookOpen, color: 'indigo', description: 'Conferences, seminars, workshops' },
    { name: 'Entertainment', icon: Mic, color: 'red', description: 'Shows, concerts, entertainment events' }
  ];

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Event details and category' },
    { number: 2, title: 'Schedule & Location', description: 'When and where' },
    { number: 3, title: 'Additional Details', description: 'Tags, requirements, agenda' },
    { number: 4, title: 'Contact & Review', description: 'Final review and submission' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEventForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategorySelect = (categoryName) => {
    setEventForm((prev) => ({
      ...prev,
      category: categoryName
    }));
  };
  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !eventForm.tags.includes(trimmed)) {
      setEventForm((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setEventForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getCategoryColor = (color) => {
    const colorMap = {
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-400',
      pink: 'from-pink-500/20 to-pink-600/20 border-pink-400/30 text-pink-400',
      green: 'from-green-500/20 to-green-600/20 border-green-400/30 text-green-400',
      purple: 'from-purple-500/20 to-purple-600/20 border-purple-400/30 text-purple-400',
      orange: 'from-orange-500/20 to-orange-600/20 border-orange-400/30 text-orange-400',
      indigo: 'from-indigo-500/20 to-indigo-600/20 border-indigo-400/30 text-indigo-400',
      red: 'from-red-500/20 to-red-600/20 border-red-400/30 text-red-400'
    };

    return colorMap[color] || colorMap.blue;
  };


  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center animate-fadeInUp">
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl border border-cyan-400/20 p-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Event Created Successfully!</h1>
            <p className="text-gray-300 mb-8">
              Your event "{eventForm.title}" has been submitted for review. You'll receive a confirmation email shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setEventForm({
                    title: '', description: '', category: '', date: '', time: '', location: '',
                    college: '', price: '', maxAttendees: '', tags: [], organizer: '',
                    contactEmail: '', contactPhone: '', eventImage: '', requirements: '', agenda: '', featured: false
                  });
                }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                Create Another Event
              </button>
              <button
                onClick={() => window.location.href = '#events'}
                className="px-6 py-3 bg-slate-700/50 border border-gray-600 text-gray-300 rounded-xl hover:border-cyan-400/40 hover:text-white transition-all duration-300"
              >
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-white bg-clip-text text-transparent">
              Create Amazing
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              College Events
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bring your ideas to life and create memorable experiences for students across colleges
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-cyan-400/20 p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${currentStep >= step.number
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-slate-700 text-gray-400'
                      }`}>
                      {step.number}
                    </div>
                    <div className="mt-2 text-center">
                      <div className={`text-sm font-medium ${currentStep >= step.number ? 'text-cyan-400' : 'text-gray-400'
                        }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${currentStep > step.number ? 'bg-cyan-400' : 'bg-slate-600'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-cyan-400/20 p-8 animate-fadeInUp" style={{ animationDelay: '400ms' }}>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Basic Event Information</h2>

              {/* Event Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  value={eventForm.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  placeholder="Enter a catchy event title"
                />
              </div>

              {/* Event Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Description *</label>
                <textarea
                  name="description"
                  value={eventForm.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  placeholder="Describe your event in detail..."
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">Event Category *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    const isSelected = eventForm.category === category.name;
                    const colorClasses = getCategoryColor(category.color);

                    return (
                      <button
                        key={category.name}
                        type="button"
                        onClick={() => handleCategorySelect(category.name)}
                        className={`p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 active:scale-95 text-left ${isSelected
                          ? `bg-gradient-to-r ${colorClasses} scale-105`
                          : 'bg-slate-700/30 border-gray-600 text-gray-300 hover:border-cyan-400/40'
                          }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <IconComponent className="w-6 h-6" />
                          <span className="font-semibold">{category.name}</span>
                        </div>
                        <p className="text-xs opacity-80">{category.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Schedule & Location */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Schedule & Location</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Event Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={eventForm.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Event Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={eventForm.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Location *</label>
                <input
                  type="text"
                  name="location"
                  value={eventForm.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  placeholder="e.g., Main Auditorium, Tech Campus"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">College/Institution *</label>
                <input
                  type="text"
                  name="college"
                  value={eventForm.college}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  placeholder="Your college or institution name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Entry Fee</label>
                  <input
                    type="number"
                    name="price"
                    value={eventForm.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="0 for free event"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Maximum Attendees</label>
                  <input
                    type="number"
                    name="maxAttendees"
                    value={eventForm.maxAttendees}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="Maximum number of participants"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Additional Details */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Additional Details</h2>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {eventForm.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center space-x-2 px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-lg text-cyan-400 text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-400 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="Add tags (e.g., AI, Workshop, Competition)"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-400 transition-colors duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Requirements/Prerequisites</label>
                <textarea
                  name="requirements"
                  value={eventForm.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  placeholder="Any specific requirements or prerequisites for participants..."
                />
              </div>

              {/* Agenda */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Agenda/Schedule</label>
                <textarea
                  name="agenda"
                  value={eventForm.agenda}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  placeholder="Detailed agenda or schedule of the event..."
                />
              </div>

              {/* Featured Event */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={eventForm.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-cyan-500 bg-slate-700 border-cyan-400/30 rounded focus:ring-cyan-400/20"
                />
                <label className="text-gray-300">
                  Mark as featured event (will be highlighted in listings)
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Contact & Review */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information & Review</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Organizer Name *</label>
                  <input
                    type="text"
                    name="organizer"
                    value={eventForm.organizer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="Your name or organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={eventForm.contactEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="contact@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={eventForm.contactPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Event Preview */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-cyan-400/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span>Event Preview</span>
                </h3>

                <div className="space-y-3 text-sm">
                  <div><span className="text-gray-400">Title:</span> <span className="text-white">{eventForm.title || 'Not specified'}</span></div>
                  <div><span className="text-gray-400">Category:</span> <span className="text-white">{eventForm.category || 'Not specified'}</span></div>
                  <div><span className="text-gray-400">Date & Time:</span> <span className="text-white">{eventForm.date} at {eventForm.time || 'Not specified'}</span></div>
                  <div><span className="text-gray-400">Location:</span> <span className="text-white">{eventForm.location || 'Not specified'}</span></div>
                  <div><span className="text-gray-400">College:</span> <span className="text-white">{eventForm.college || 'Not specified'}</span></div>
                  <div><span className="text-gray-400">Price:</span> <span className="text-white">{eventForm.price ? `₹${eventForm.price}` : 'Free'}</span></div>
                  <div><span className="text-gray-400">Max Attendees:</span> <span className="text-white">{eventForm.maxAttendees || 'Unlimited'}</span></div>
                  <div><span className="text-gray-400">Organizer:</span> <span className="text-white">{eventForm.organizer || 'Not specified'}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-600">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${currentStep === 1
                ? 'bg-slate-700/30 text-gray-500 cursor-not-allowed'
                : 'bg-slate-700/50 border border-gray-600 text-gray-300 hover:border-cyan-400/40 hover:text-white'
                }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                <span>Next</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${isSubmitting
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Event...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Create Event</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

  export default CreateEventPage