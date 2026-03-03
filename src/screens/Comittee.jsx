import React from "react";
import pna from "../assets/pna.png";
import sochum from "../assets/sohum.png";
import unsc from "../assets/unsc.png";
import unwomen from "../assets/unwomen.png";
import who from "../assets/who.png";

const Committees = () => {
  const committees = [
    {
      acronym: "PNA",
      fullForm: "Pakistan National Assembly",
      description: "The lower house of the Parliament of Pakistan, responsible for legislation, oversight of the executive, and representation of the people. Simulates the actual political dynamics of Pakistan's parliamentary system with representation from major political parties.",
      icon: "🇵🇰",
      focus: "National Legislation & Governance",
      image: pna,
      alt: "Pakistan National Assembly"
    },
    {
      acronym: "UNSC",
      fullForm: "United Nations Security Council",
      description: "The primary body responsible for maintaining international peace and security. Has the power to make decisions that member states are obligated to implement under the UN Charter. Comprises 5 permanent members with veto power and 10 non-permanent members.",
      icon: "🛡️",
      focus: "International Peace & Security",
      image: unsc,
      alt: "UN Security Council"
    },
    {
      acronym: "UN Women",
      fullForm: "United Nations Entity for Gender Equality",
      description: "A United Nations entity dedicated to gender equality and the empowerment of women. Works to eliminate discrimination against women and girls, empower women, and achieve equality between women and men as partners and beneficiaries of development, human rights, humanitarian action and peace and security.",
      icon: "👩",
      focus: "Gender Equality & Women Empowerment",
      image: unwomen,
      alt: "UN Women"
    },
    {
      acronym: "SOCHUM",
      fullForm: "Social, Cultural & Humanitarian Committee",
      description: "The Social, Humanitarian & Cultural Committee (SOCHUM) is the Third Committee of the UN General Assembly. It deals with a range of social, humanitarian affairs and human rights issues that affect people all over the world.",
      icon: "🌍",
      focus: "Social & Humanitarian Issues",
      image: sochum,
      alt: "SOCHUM Committee"
    },
    {
      acronym: "WHO",
      fullForm: "World Health Organization",
      description: "The directing and coordinating authority on international health within the United Nations system. Responsible for providing leadership on global health matters, shaping the health research agenda, setting norms and standards, and monitoring health trends.",
      icon: "⚕️",
      focus: "Global Health & Pandemic Response",
      image: who,
      alt: "World Health Organization"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            FMUN Committees 2026
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our diverse committee structure with realistic representation and diplomatic challenges.
          </p>
          <div className="mt-6 inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium">
            <span className="mr-2">🏛️</span>
            5 Dynamic Committees
          </div>
        </div>

        {/* Committees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {committees.map((committee, index) => (
            <div 
              key={committee.acronym}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Committee Image - No overlay */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                <img 
                  src={committee.image} 
                  alt={committee.alt}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x400?text=Committee+Image";
                  }}
                />
                {/* Committee name overlay - clean without colored overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                  <div className="flex items-center text-white">
                    <span className="text-3xl mr-3 drop-shadow-lg">{committee.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold drop-shadow-lg">{committee.acronym}</h2>
                      <p className="text-sm opacity-90 drop-shadow-md">{committee.fullForm}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="mr-2 text-blue-600">📋</span> About the Committee
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {committee.description}
                  </p>
                </div>

                {/* Focus Area */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="mr-2 text-purple-600">🎯</span> Primary Focus
                  </h3>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                    <span className="text-sm font-medium text-gray-700">{committee.focus}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Committee Selection Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl mb-4 text-blue-500">🎯</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose Your Interest</h3>
                <p className="text-gray-600">Select a committee that aligns with your interests - from global security to national politics.</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-4 text-purple-500">🏛️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Realistic Simulation</h3>
                <p className="text-gray-600">Each committee follows real-world procedures and dynamics of their respective bodies.</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-4 text-green-500">🎓</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Experience Required</h3>
                <p className="text-gray-600">Beginners and experienced delegates both will find suitable challenges in our committees.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 md:p-8 text-white animate-slide-up">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">
            💡 Committee Selection Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">1</span>
              <p><span className="font-semibold">PNA:</span> Best for those interested in Pakistani politics and parliamentary procedures</p>
            </div>
            <div className="flex items-start bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">2</span>
              <p><span className="font-semibold">UNSC:</span> Ideal for delegates interested in international security and crisis management</p>
            </div>
            <div className="flex items-start bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">3</span>
              <p><span className="font-semibold">UN Women:</span> Perfect for those passionate about gender equality and social justice</p>
            </div>
            <div className="flex items-start bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">4</span>
              <p><span className="font-semibold">SOCHUM:</span> Great for delegates interested in humanitarian and cultural issues</p>
            </div>
            <div className="flex items-start bg-white/10 p-3 rounded-lg backdrop-blur-sm md:col-span-2 md:w-1/2 md:mx-auto">
              <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">5</span>
              <p><span className="font-semibold">WHO:</span> Suitable for those interested in global health and pandemic response</p>
            </div>
          </div>
        </div>

        {/* Registration CTA */}
        <div className="mt-12 text-center">
          <a
            href="/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Register for Your Preferred Committee
            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Add CSS animations */}
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
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2rem;
          }
          
          .aspect-\[16\/9\] {
            aspect-ratio: 16/9;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .aspect-\[16\/9\] {
            aspect-ratio: 16/9;
          }
        }
      `}</style>
    </div>
  );
};

export default Committees;