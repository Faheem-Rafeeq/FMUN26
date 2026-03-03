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
    { name: "PNA", color: "bg-amber-500", desc: "Pakistan National Assembly", fullName: "Pakistan National Assembly" },
    { name: "UNSC", color: "bg-red-500", desc: "Security Council", fullName: "UN Security Council" },
    { name: "UN Women", color: "bg-purple-500", desc: "UN Women", fullName: "UN Women" },
    { name: "SOCHUM", color: "bg-blue-500", desc: "Social, Cultural & Humanitarian", fullName: "Social, Cultural & Humanitarian" },
    { name: "WHO", color: "bg-green-500", desc: "Health Organization", fullName: "World Health Organization" }
  ];

  const feeStructure = [
    { category: "Delegate", price: "PKR 2,500", description: "All Access + Dinner", icon: "🎯", color: "from-blue-500 to-purple-600" },
    { category: "Observer", price: "PKR 3,000", description: "All Access + Dinner", icon: "👁️", color: "from-green-500 to-teal-600" },
    { category: "Qawali Night", price: "PKR 1,250", description: "Base Faisal/Ex-Fazains Only", icon: "🎵", color: "from-purple-500 to-pink-600" },
    { category: "Concert Only", price: "PKR 1,250", description: "Base Residents Only", icon: "🎸", color: "from-pink-500 to-rose-600" },
    { category: "Both Events", price: "PKR 2,000", description: "Qawali + Concert", icon: "🎉", color: "from-amber-500 to-orange-600" }
  ];

  const bankDetails = {
    account: "22837900341203",
    name: "Bilqees Fatima",
    bank: "HBL Prestige",
    whatsapp: "03076646639"
  };

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
                  ⚡ Early bird discounts available! Register today.
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

      {/* Committees Section - Updated with new committees */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 animate-fade-in px-4">
            Our Committees
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Choose from five prestigious committees with no capacity limits
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {committees.map((committee, index) => (
              <div
                key={committee.name}
                className={`${committee.color} rounded-xl p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">{committee.name}</div>
                  <div className="text-sm opacity-90">{committee.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Structure Section - Updated with new fees */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 animate-fade-in px-4">
            Fee Structure 2026
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            All Access + Dinner included for Delegates and Observers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feeStructure.map((fee, index) => (
              <div
                key={fee.category}
                className={`bg-gradient-to-r ${fee.color} rounded-2xl p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{fee.icon}</span>
                  <span className="text-sm font-medium opacity-90">{fee.category}</span>
                </div>
                <div className="text-3xl font-bold mb-2">{fee.price}</div>
                <p className="text-sm opacity-90">{fee.description}</p>
              </div>
            ))}
          </div>

          {/* Eligibility Notes */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                <span className="text-lg mr-2">🎵</span>
                Qawali Night Eligibility
              </h4>
              <p className="text-sm text-blue-700">Base Faisal residents and Ex-Fazains only</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
              <h4 className="font-bold text-pink-800 mb-2 flex items-center">
                <span className="text-lg mr-2">🎸</span>
                Concert Eligibility
              </h4>
              <p className="text-sm text-pink-700">Base residents only</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Details Section */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 animate-fade-in px-4">
            Payment Information
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            For bank transfers, use the following account details
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100">
              {/* Bank Account Card */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">🏦</span>
                  <span className="text-sm font-medium opacity-90">Bank Transfer</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm opacity-90">Account Number</p>
                    <p className="text-2xl font-mono font-bold">{bankDetails.account}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Account Name</p>
                    <p className="text-xl font-bold">{bankDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Bank</p>
                    <p className="text-lg font-semibold">{bankDetails.bank}</p>
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-600 mr-3 text-xl">📱</span>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">After Payment</h4>
                    <p className="text-sm text-green-700">
                      Send payment screenshot with your name and email to:
                    </p>
                    <p className="text-lg font-bold text-green-700 mt-1">{bankDetails.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="text-amber-600 mr-3 text-xl">💰</span>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Onsite Registration</h4>
                    <p className="text-sm text-amber-700">
                      Please bring cash payment to the registration desk on the event day
                    </p>
                  </div>
                </div>

                {/* Copy Account Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(bankDetails.account);
                    alert("Account number copied to clipboard!");
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <span>📋</span>
                  Copy Account Number
                </button>
              </div>

              {/* Important Note */}
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-700 font-medium flex items-center">
                  <span className="mr-2">⚠️</span>
                  All payments are non-refundable under any circumstances
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12 animate-fade-in px-4">
            Event Details
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Venue & Dates */}
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
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-medium text-blue-600 mb-1">Dates</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">March 2026</div>
                  <div className="text-sm sm:text-base text-gray-600 mt-2">Two Days of Diplomatic Excellence</div>
                </div>
                
                <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-xl">
                  <div className="text-xs sm:text-sm font-medium text-purple-600 mb-1">Venue</div>
                  <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Fazaia Degree College, Faisal</div>
                  <div className="text-sm sm:text-base text-gray-600 mt-2">Paf Base Faisal</div>
                </div>
                
                <div className="text-center p-6 sm:p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                  <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 animate-pulse">📅 Schedule Revealed Soon!</div>
                  <p className="text-sm sm:text-base md:text-lg opacity-90">Stay tuned for the detailed event schedule</p>
                </div>
              </div>
            </div>

            {/* Why Join Us */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all duration-300 hover:scale-[1.02] animate-slide-up">
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Why Join FMUN 2026?</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 mr-3 text-xl">🎯</span>
                  <div>
                    <h4 className="font-semibold text-blue-800">Five Committees</h4>
                    <p className="text-sm text-blue-700">Choose from PNA, UNSC, UN Women, SOCHUM, or WHO</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-green-50 rounded-lg">
                  <span className="text-green-600 mr-3 text-xl">🎉</span>
                  <div>
                    <h4 className="font-semibold text-green-800">Cultural Events</h4>
                    <p className="text-sm text-green-700">Qawali Night and Concert with special performances</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-purple-50 rounded-lg">
                  <span className="text-purple-600 mr-3 text-xl">🏆</span>
                  <div>
                    <h4 className="font-semibold text-purple-800">Awards & Recognition</h4>
                    <p className="text-sm text-purple-700">Best Delegate, Best Speaker, and Special Mentions</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-amber-50 rounded-lg">
                  <span className="text-amber-600 mr-3 text-xl">🤝</span>
                  <div>
                    <h4 className="font-semibold text-amber-800">Networking</h4>
                    <p className="text-sm text-amber-700">Connect with delegates from across the country</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-gray-900 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Register Now
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/status"
              className="inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-transparent border-2 border-white text-white rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-gray-900"
            >
              Check Status
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </Link>
          </div>
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