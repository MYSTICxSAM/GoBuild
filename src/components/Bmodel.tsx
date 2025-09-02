import React from 'react';

function Bmodel() {
  const stakeholders = [
    { name: 'Workers', position: 'left-top', side: 'left', icon: '👷', color: 'from-orange-400 to-red-500' },
    { name: 'Home Owners', position: 'left-middle', side: 'left', icon: '🏠', color: 'from-green-400 to-emerald-500' },
    { name: 'Architects/\nDesigners', position: 'left-bottom', side: 'left', icon: '📐', color: 'from-purple-400 to-violet-500' },
    { name: 'Contractors', position: 'right-top', side: 'right', icon: '🔨', color: 'from-yellow-400 to-amber-500' },
    { name: 'Developers', position: 'right-middle', side: 'right', icon: '🏗️', color: 'from-blue-400 to-cyan-500' },
    { name: 'Material\nSuppliers', position: 'right-bottom', side: 'right', icon: '📦', color: 'from-teal-400 to-green-500' }
  ];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'left-top': return 'top-[25%] sm:top-[15%] left-[15%] sm:left-0 -translate-x-1/2 -translate-y-1/2';
      case 'left-middle': return 'top-1/2 left-[15%] sm:left-0 -translate-x-1/2 -translate-y-1/2';
      case 'left-bottom': return 'bottom-[25%] sm:bottom-[15%] left-[15%] sm:left-0 -translate-x-1/2 translate-y-1/2';
      case 'right-top': return 'top-[25%] sm:top-[15%] right-[15%] sm:right-0 translate-x-1/2 -translate-y-1/2';
      case 'right-middle': return 'top-1/2 right-[15%] sm:right-0 translate-x-1/2 -translate-y-1/2';
      case 'right-bottom': return 'bottom-[25%] sm:bottom-[15%] right-[15%] sm:right-0 translate-x-1/2 translate-y-1/2';
      default: return '';
    }
  };

  const getLineClasses = (position: string) => {
    switch (position) {
      case 'left-top': return 'top-[32%] sm:top-[15%] left-[27%] sm:left-[8%] w-[20%] sm:w-[34%] h-0.5 origin-left rotate-[10deg] sm:rotate-[25deg]';
      case 'left-middle': return 'top-1/2 left-[27%] sm:left-[8%] w-[20%] sm:w-[34%] h-0.5 -translate-y-1/2';
      case 'left-bottom': return 'bottom-[30%] sm:bottom-[15%] left-[27%] sm:left-[8%] w-[20%] sm:w-[34%] h-0.5 origin-left -rotate-[10deg] sm:-rotate-[25deg]';
      case 'right-top': return 'top-[32%] sm:top-[15%] right-[27%] sm:right-[8%] w-[20%] sm:w-[34%] h-0.5 origin-right -rotate-[10deg] sm:-rotate-[25deg]';
      case 'right-middle': return 'top-1/2 right-[27%] sm:right-[8%] w-[20%] sm:w-[34%] h-0.5 -translate-y-1/2';
      case 'right-bottom': return 'bottom-[30%] sm:bottom-[15%] right-[27%] sm:right-[8%] w-[20%] sm:w-[34%] h-0.5 origin-right rotate-[10deg] sm:rotate-[25deg]';
      default: return '';
    }
  };

  return (
    <div className="py-10 sm:py-16 lg:py-20 hero-pattern relative overflow-hidden">
      {/* Background animated elements - adjusted for light theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-400/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-purple-400/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-teal-400/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-40 right-10 w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-orange-400/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '6s' }}></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-blue-400/20 rotate-45 animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-purple-400/20 rotate-45 animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-0.5 h-0.5 sm:w-1 sm:h-1 lg:w-1 lg:h-1 bg-teal-400/30 rounded-full animate-ping" style={{ animationDelay: '5s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            GoBuild Platform Ecosystem
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            We connect all stakeholders in the construction industry through our unified digital platform
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          {/* Main container with aspect ratio */}
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] mx-auto">
            
            {/* Central Logo/Platform Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer">
              <div className="relative">
                {/* Outer energy rings */}
                <div className="absolute inset-0 w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full border-2 border-blue-400/20 -m-4 sm:-m-5 lg:-m-6 animate-ping"></div>
                <div className="absolute inset-0 w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full border border-purple-400/15 -m-3 sm:-m-4 lg:-m-4 animate-ping" style={{ animationDelay: '1s' }}></div>
                
                {/* Hover glow effect for center */}
                <div className="absolute inset-0 w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-teal-400/30 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-125 blur-2xl -m-1 sm:-m-2 lg:-m-2"></div>
                
                {/* Multiple rotating rings */}
                <div className="absolute inset-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-r from-blue-400/60 via-cyan-400/40 to-purple-400/60 opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-110" 
                     style={{ animation: 'spin 12s linear infinite' }}></div>
                <div className="absolute inset-1 w-26 h-26 sm:w-38 sm:h-38 lg:w-46 lg:h-46 rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/30 to-blue-400/40 opacity-40" 
                     style={{ animation: 'spin 8s linear infinite reverse' }}></div>
                
                {/* Inner circle with glass effect */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 m-1 sm:m-2 lg:m-2 bg-white/90 backdrop-blur-lg rounded-full shadow-2xl flex items-center justify-center border border-gray-200/50 transition-all duration-500 group-hover:shadow-blue-500/30 group-hover:scale-105">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-1 sm:mb-2 lg:mb-2 transition-all duration-500 group-hover:scale-110">G</div>
                    <div className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent transition-all duration-500">GoBuild</div>
                    <div className="text-xs sm:text-sm lg:text-sm text-gray-600 font-medium transition-all duration-500 group-hover:text-gray-800">Platform</div>
                  </div>
                </div>
                
                {/* Orbiting dots - hide on mobile */}
                <div className="hidden sm:block absolute top-1/2 left-1/2 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2" 
                     style={{ animation: 'orbit 6s linear infinite', transformOrigin: '0 0' }}></div>
                <div className="hidden sm:block absolute top-1/2 left-1/2 w-1 h-1 lg:w-1.5 lg:h-1.5 bg-purple-400 rounded-full -translate-x-1/2 -translate-y-1/2" 
                     style={{ animation: 'orbit 8s linear infinite reverse', transformOrigin: '0 0' }}></div>
              </div>
            </div>

            {/* Connecting Lines with Pulse Animation */}
            {stakeholders.map((stakeholder, index) => (
              <div key={`line-${index}`} 
                   className={`absolute ${getLineClasses(stakeholder.position)} z-10`}>
                <div className="w-full h-full relative overflow-hidden rounded-full">
                  {/* Base line with gradient */}
                  <div className={`w-full h-full bg-gradient-to-r ${stakeholder.color} opacity-50 rounded-full shadow-md`}></div>
                  
                  {/* Energy pulse effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-70 rounded-full"
                       style={{ 
                         animation: `pulseForward 4s ease-in-out infinite ${index * 0.7}s`,
                         width: '25%'
                       }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/70 to-transparent opacity-50 rounded-full"
                       style={{ 
                         animation: `pulseBackward 4s ease-in-out infinite ${index * 0.7 + 2}s`,
                         width: '20%'
                       }}></div>
                  
                  {/* Sparkle effects */}
                  <div className="absolute top-1/2 w-1 h-1 bg-white/80 rounded-full opacity-60 animate-ping"
                       style={{ 
                         left: `${20 + (index * 15)}%`,
                         animationDelay: `${index * 0.5}s`
                       }}></div>
                </div>
              </div>
            ))}

            {/* Stakeholder Circles */}
            {stakeholders.map((stakeholder, index) => (
              <div key={index} 
                   className={`absolute ${getPositionClasses(stakeholder.position)} z-30 group cursor-pointer`}>
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className={`absolute inset-0 w-24 h-24 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-r ${stakeholder.color} opacity-0 group-hover:opacity-40 transition-all duration-700 scale-125 blur-xl -m-1 sm:-m-3 lg:-m-4`}></div>
                  
                  {/* Animated border ring */}
                  <div className={`absolute inset-0 w-22 h-22 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-r ${stakeholder.color} opacity-15 animate-pulse -m-0.5 sm:-m-2 lg:-m-2`}
                       style={{ animationDelay: `${index * 0.5}s` }}></div>
                  
                  {/* Glass morphism circle */}
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-gray-200/40 flex flex-col items-center justify-center 
                                  transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl 
                                  group-hover:bg-white/90 group-hover:border-gray-300/50 group-hover:-translate-y-2 sm:group-hover:-translate-y-3">
                    
                    {/* Icon */}
                    <div className="text-lg sm:text-2xl lg:text-3xl mb-0.5 sm:mb-1 lg:mb-1 transition-all duration-300 group-hover:scale-125 group-hover:animate-bounce">
                      {stakeholder.icon}
                    </div>
                    
                    {/* Text */}
                    <div className="text-center px-0.5 sm:px-2">
                      <div className="text-xs sm:text-sm lg:text-sm font-bold text-gray-800 leading-tight whitespace-pre-line group-hover:text-gray-900 transition-all duration-300">
                        {stakeholder.name}
                      </div>
                    </div>
                    
                    {/* Connection dots */}
                    <div className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-gradient-to-r ${stakeholder.color} rounded-full animate-ping`}
                         style={{ animationDelay: `${index * 0.8}s` }}></div>
                  </div>

                  {/* Floating animation with trail effect */}
                  <div className="absolute inset-0 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full"
                       style={{ animation: `float 5s ease-in-out infinite ${index * 0.8}s` }}>
                    <div className={`w-1 h-1 sm:w-2 sm:h-2 lg:w-2 lg:h-2 bg-gradient-to-r ${stakeholder.color} rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 opacity-40 animate-ping`}
                         style={{ animationDelay: `${index * 0.3}s` }}></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Artistic decorative elements */}
            <div className="absolute top-[8%] left-[42%] sm:left-[45%] w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-20">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg rotate-45 animate-pulse blur-sm opacity-60"></div>
                <div className="absolute inset-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-lg rotate-45 opacity-80"></div>
                <svg className="absolute inset-2 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.5 8.5L22 9L17 14L18.5 22L12 18.5L5.5 22L7 14L2 9L8.5 8.5L12 2Z"/>
                </svg>
              </div>
            </div>
            
            {/* Construction crane silhouette */}
            <div className="absolute top-[5%] right-[10%] sm:right-[15%] w-12 h-16 sm:w-14 sm:h-18 lg:w-16 lg:h-20 opacity-15">
              <svg viewBox="0 0 64 80" fill="currentColor" className="text-gray-400 animate-pulse">
                <rect x="30" y="0" width="4" height="60"/>
                <rect x="10" y="15" width="40" height="3"/>
                <rect x="8" y="18" width="8" height="2"/>
                <rect x="25" y="60" width="14" height="20"/>
                <rect x="20" y="75" width="24" height="5"/>
              </svg>
            </div>
            
            {/* Building blocks pattern */}
            <div className="absolute bottom-[8%] left-[8%] sm:left-[12%] w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 opacity-20">
              <div className="grid grid-cols-2 gap-1 w-full h-full">
                <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded animate-pulse opacity-60"></div>
                <div className="bg-gradient-to-br from-purple-400 to-violet-500 rounded animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
                <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded animate-pulse opacity-60" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
            
            {/* Network nodes */}
            <div className="absolute top-[35%] left-[5%] sm:left-[8%] w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-blue-400/60 rounded-full animate-ping opacity-40"></div>
            <div className="absolute top-[65%] right-[5%] sm:right-[8%] w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2 lg:h-2 bg-purple-400/60 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-[25%] left-[20%] sm:left-[25%] w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2 lg:h-2 bg-teal-400/60 rounded-full animate-ping opacity-40" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bmodel;