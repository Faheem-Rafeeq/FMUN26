import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto slide for hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Welcome to FMUN 2026",
      subtitle: "Where Diplomacy Meets Leadership",
      bg: "from-blue-600 to-purple-700"
    },
    {
      title: "Registration Is Now Open!",
      subtitle: "Secure Your Spot Today",
      bg: "from-purple-600 to-pink-700"
    },
    {
      title: "Join the Diplomatic Discourse",
      subtitle: "Experience Model United Nations",
      bg: "from-indigo-600 to-blue-700"
    }
  ];

  const committees = [
    { name: "UNSC", color: "bg-red-500", desc: "Security Council" },
    { name: "UNGA", color: "bg-blue-500", desc: "UN General Assembly" },
    { name: "UNHRC", color: "bg-green-500", desc: "Human Rights" },
    { name: "WHO", color: "bg-teal-500", desc: "Health Organization" },
    { name: "SOCHUM", color: "bg-purple-500", desc: "Social Affairs" },
    { name: "PNA", color: "bg-amber-500", desc: "Pakistan National Assembly" }
  ];

  return (
    <div className="overflow-x-hidden w-full">
      {/* Hero Section - Full screen with responsive padding */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-48 sm:w-64 h-48 sm:h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center w-full max-w-7xl mx-auto">
          {/* Animated Slides - Responsive height */}
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 mb-6 sm:mb-8 overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 transform ${
                  currentSlide === index
                    ? 'opacity-100 translate-x-0'
                    : index > currentSlide
                    ? 'opacity-0 translate-x-full'
                    : 'opacity-0 -translate-x-full'
                }`}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-2 sm:mb-4 animate-fade-in px-4">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 animate-slide-up px-4">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Slide Indicators - Responsive sizing */}
          <div className="flex justify-center space-x-2 mb-8 sm:mb-12">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-blue-600 w-6 sm:w-8'
                    : 'bg-gray-300 hover:bg-gray-400 w-2 sm:w-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Registration Announcement - Responsive */}
          <div className="mb-8 sm:mb-12 animate-fade-in">
            <Link
              to="/register" 
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg md:text-xl mb-4 sm:mb-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="animate-pulse mr-2 sm:mr-3 text-xl sm:text-2xl">🔔</span>
              Register Now - Limited Spots Available!
            </Link>
            <div className="relative overflow-hidden max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 border-dashed border-blue-300">
                <p className="text-gray-700 font-medium text-sm sm:text-base">
                  ⚡ Registration is now open! Early bird discounts available
                </p>
              </div>
            </div>
          </div>

          {/* Single CTA Button - Explore Committees */}
          <div className="animate-fade-in">
            <Link
              to="/committee"
              className="inline-flex items-center px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg sm:text-xl md:text-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Explore Committees
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-2 sm:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Event Details Section - Responsive grid */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12 animate-fade-in px-4">
            Event Details
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Venue & Dates - Responsive card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all duration-300 hover:scale-[1.02] animate-slide-up">
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Event Schedule & Venue</h3>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Dates */}
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-medium text-blue-600 mb-1">Dates</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">March,2026</div>
                  <div className="text-sm sm:text-base text-gray-600 mt-2">Two Days of Diplomatic Excellence</div>
                </div>
                
                {/* Venue */}
                <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-medium text-purple-600 mb-1">Venue</div>
                  <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Fazaia Degree College, Faisal</div>
                  <div className="text-sm sm:text-base text-gray-600 mt-2">Paf base Faisal</div>
                </div>
                
                {/* Schedule - Revealed Soon - Responsive */}
                <div className="text-center p-6 sm:p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                  <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 animate-pulse">📅 Schedule Revealed Soon!</div>
                  <p className="text-sm sm:text-base md:text-lg opacity-90">Stay tuned for the detailed event schedule</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Structure - Updated with responsive design */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all duration-300 hover:scale-[1.02] animate-slide-up">
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Fee Structure</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-2">All inclusive package</p>
              </div>
              
              {/* Fee Cards - Responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl text-white transform hover:scale-105 transition-all duration-300">
                  <div className="text-xs sm:text-sm font-medium mb-1">Observer Fee</div>
                  <div className="text-xl sm:text-2xl font-bold">PKR 2,500</div>
                  <div className="text-xs opacity-90 mt-2">Observation Access Only</div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white transform hover:scale-105 transition-all duration-300">
                  <div className="text-xs sm:text-sm font-medium mb-1">Delegate Fee</div>
                  <div className="text-xl sm:text-2xl font-bold">PKR 2,000</div>
                  <div className="text-xs opacity-90 mt-2">Full Participation Access</div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-white transform hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                  <div className="text-xs sm:text-sm font-medium mb-1">Qawali Night</div>
                  <div className="text-xl sm:text-2xl font-bold">PKR 1,000</div>
                  <div className="text-xs opacity-90 mt-2">Cultural Event</div>
                </div>
              </div>
              
              {/* Package Inclusions - Responsive grid */}
              <div className="mt-6 sm:mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2 sm:mb-3 text-center sm:text-left text-sm sm:text-base">Package Inclusions</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1 sm:mr-2">✓</span>
                    <span>Conference Kit</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1 sm:mr-2">✓</span>
                    <span>Lunch & Tea</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1 sm:mr-2">✓</span>
                    <span>Certificate</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1 sm:mr-2">✓</span>
                    <span>Materials</span>
                  </div>
                </div>
              </div>

              {/* Responsive Note */}
              <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500">
                *All fees are non-refundable • Early bird discounts available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Committees Preview - Responsive grid */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12 animate-fade-in px-4">
            Our Committees
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {committees.map((committee, index) => (
              <div
                key={committee.name}
                className={`${committee.color} rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="text-center">
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{committee.name}</div>
                  <div className="text-xs sm:text-sm opacity-90">{committee.desc}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/committee"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Explore All Committees
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Final CTA - Responsive */}
      <div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 animate-fade-in px-4">
            Ready to Begin Your Diplomatic Journey?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 animate-slide-up px-4">
            Join hundreds of delegates in shaping global discourse at FMUN 2026
          </p>
          <Link
            to="/committee"
            className="inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-gray-900 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-bounce-slow"
          >
            View Committees
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2 sm:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;