'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Team {
  title: string;
  icon: string;
  color: string;
  border: string;
  glow: string;
  badge: string;
  wheelColor: string;
  members: string[];
}

interface Member {
  name: string;
  team: Team;
}

const ChristmasPage = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [revealedTeam, setRevealedTeam] = useState<Team | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('name-select');
  const [showAllTeams, setShowAllTeams] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateCountdown = () => {
      const celebration = new Date('2025-12-20T00:00:00');
      const now = new Date();
      const diff = celebration.getTime() - now.getTime();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const teams: Team[] = [
    {
      title: 'Ho Ho Heroes',
      icon: '🎅',
      color: 'from-blue-700/40 to-blue-900/40',
      border: 'border-blue-400/60',
      glow: 'shadow-blue-500/30',
      badge: 'bg-blue-500',
      wheelColor: '#3b82f6',
      members: ['Sabari Krishnan', 'Nisanth', 'Melda', 'Kader Riyaz', 'Dhanusiya', 'ArunNathan', 'Sornalatha']
    },
    {
      title: 'Snowman Buddies',
      icon: '⛄',
      color: 'from-red-700/40 to-red-900/40',
      border: 'border-red-400/60',
      glow: 'shadow-red-500/30',
      badge: 'bg-red-500',
      wheelColor: '#ef4444',
      members: ['Tony Walter', 'Vaikundamani', 'Prem Kumar', 'Sornalakshmi', 'Ignecia Rathna', 'Raja Prabu', 'Maharaja']
    },
    {
      title: 'Sugar Plum Fairies',
      icon: '🧚',
      color: 'from-slate-300/40 to-slate-500/40',
      border: 'border-slate-300/60',
      glow: 'shadow-slate-400/30',
      badge: 'bg-slate-100',
      // wheelColor: '#94a3b8',
      wheelColor: '#f9fafcff',
      members: ['Srinath', 'Muthu Rathi', 'Maria Arokia Peno', 'Pon Abishek', 'Jamuna', 'Thangaraja', 'Selva Lakshmi', 'Akshaya']
    },
    {
      title: "Santa's Snow Rockers",
      icon: '🎸',
      color: 'from-green-700/40 to-green-900/40',
      border: 'border-green-400/60',
      glow: 'shadow-green-500/30',
      badge: 'bg-green-500',
      wheelColor: '#22c55e',
      members: ['Manikandan', 'Dulcy Navaroj', 'Muthu Kannan', 'Michal Felix', 'Deepa', 'Harish Praveen', 'Arun', 'Raj Kumar']
    }
  ];

  const allMembers: Member[] = teams.flatMap(team => 
    team.members.map(member => ({ name: member, team }))
  );

  const filteredMembers = allMembers.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNameSelect = useCallback((name: string) => {
    setSelectedName(name);
    setSearchQuery('');
    setCurrentPage('welcome');
    
    setTimeout(() => {
      setCurrentPage('spin');
    }, 3000);
  }, []);

  const handleSpinClick = useCallback(() => {
    if (spinning || revealedTeam) return;
    
    const memberData = allMembers.find(m => m.name === selectedName);
    if (!memberData) return;
    
    const teamIndex = teams.findIndex(t => t.title === memberData.team.title);
    
    setSpinning(true);
    
    const segmentAngle = 360 / teams.length;
    const targetAngle = teamIndex * segmentAngle;
    const spins = 5;
    const finalRotation = (spins * 360) + (360 - targetAngle) + (segmentAngle / 2);
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      setSpinning(false);
      setRevealedTeam(memberData.team);
      setCurrentPage('result');
    }, 4000);
  }, [spinning, revealedTeam, selectedName, allMembers, teams]);

  const resetExperience = useCallback(() => {
    setSelectedName('');
    setCurrentPage('name-select');
    setSpinning(false);
    setRotation(0);
    setRevealedTeam(null);
    setSearchQuery('');
    setShowAllTeams(false);
  }, []);

  const BackgroundElements = () => (
    <>
      {/* Realistic Background Texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,215,0,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(220,38,38,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(34,197,94,0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Realistic Snowfall */}
      {mounted && [...Array(50)].map((_, i) => (
        <div
          key={`snow-${i}`}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            animation: `snowfall ${8 + Math.random() * 15}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
            opacity: 0.4 + Math.random() * 0.6,
            boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            filter: 'blur(0.5px)'
          }}
        />
      ))}

      {/* Glowing Golden Ornaments */}
      {mounted && [...Array(20)].map((_, i) => (
        <div
          key={`ornament-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `gentle-float ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-600 shadow-2xl border-2 border-yellow-300/50">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gradient-to-b from-amber-700 to-amber-600 rounded-t-full"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-100/50 to-transparent"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Realistic String Lights */}
      <div className="absolute top-0 w-full pointer-events-none">
        <svg width="100%" height="100" className="absolute top-0">
          <path d="M 0,30 Q 50,20 100,30 T 200,30 T 300,30 T 400,30 T 500,30 T 600,30 T 700,30 T 800,30 T 900,30 T 1000,30 T 1100,30 T 1200,30 T 1300,30 T 1400,30 T 1500,30 T 1600,30 T 1700,30 T 1800,30 T 1900,30 T 2000,30" 
                stroke="#1a4d1a" strokeWidth="2" fill="none" />
        </svg>
        <div className="flex justify-around items-start px-4 pt-8">
          {[...Array(25)].map((_, i) => {
            const colors = [
              { bg: 'bg-red-500', shadow: 'shadow-red-500/80', glow: 'bg-red-400' },
              { bg: 'bg-yellow-400', shadow: 'shadow-yellow-400/80', glow: 'bg-yellow-300' },
              { bg: 'bg-green-500', shadow: 'shadow-green-500/80', glow: 'bg-green-400' },
              { bg: 'bg-blue-500', shadow: 'shadow-blue-500/80', glow: 'bg-blue-400' }
            ];
            const color = colors[i % 4];
            return (
              <div
                key={`light-${i}`}
                className="relative flex-shrink-0"
                style={{
                  animation: `twinkle ${1.5 + Math.random() * 1.5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                <div className="w-1 h-12 bg-green-900 mx-auto"></div>
                <div className="relative">
                  <div className={`absolute inset-0 ${color.glow} rounded-full blur-md opacity-60`}></div>
                  <div className={`relative w-5 h-7 ${color.bg} rounded-full ${color.shadow} shadow-2xl border-t-2 border-white/30`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  const CompanyLogos = ({ showAll = false }: { showAll?: boolean }) => (
    <>
      {/* Top Center Logo - Zoifintech.png */}
      <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-20 w-full px-4 flex justify-center">
        <div className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl p-1 sm:p-1.5 md:p-3 shadow-xl sm:shadow-2xl border border-yellow-300/40 sm:border-2 sm:border-yellow-300/50 max-w-[90px] xs:max-w-[100px] sm:max-w-[140px] md:max-w-[180px] lg:max-w-[200px]">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-lg sm:rounded-xl md:rounded-2xl blur-sm"></div>
          <div className="relative">
            <img 
              src="/Zoifintech.png" 
              alt="Zoifintech Logo" 
              className="h-4 sm:h-5 md:h-7 lg:h-8 w-auto object-contain mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTI4IDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjgiIGhl/";
              }}
            />
          </div>
        </div>
      </div>

      {/* Left Bottom Logo - trakzo.png */}
      {(showAll || currentPage !== 'name-select') && (
        <div className="fixed bottom-4 sm:bottom-6 left-2 sm:left-4 md:left-6 lg:left-8 z-20">
          <div className="relative backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-1 sm:p-1.5 md:p-2 shadow-lg sm:shadow-xl border border-white/20 sm:border-2 sm:border-white/30 max-w-[70px] xs:max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-lg sm:rounded-xl md:rounded-2xl blur-sm"></div>
            <div className="relative">
              <img 
                src="/trakzo.png" 
                alt="Trakzo Logo" 
                className="h-4 sm:h-5 md:h-6 lg:h-7 w-auto object-contain mx-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iMzIiIHZpZXdCYW94PSIwIDAgOTYgMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzAwNjZGMyIvPjx0ZXh0IHg9IjQ4IiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+VHJha3pvPC90ZXh0Pjwvc3ZnPg==";
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Right Bottom Logo - Jademoney.png */}
      {(showAll || currentPage !== 'name-select') && (
        <div className="fixed bottom-4 sm:bottom-6 right-2 sm:right-4 md:right-6 lg:right-8 z-20">
          <div className="relative backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-1 sm:p-1.5 md:p-2 shadow-lg sm:shadow-xl border border-white/20 sm:border-2 sm:border-white/30 max-w-[70px] xs:max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px]">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-lg sm:rounded-xl md:rounded-2xl blur-sm"></div>
            <div className="relative">
              <img 
                src="/Jademoney.png" 
                alt="Jademoney Logo" 
                className="h-4 sm:h-5 md:h-6 lg:h-7 w-auto object-contain mx-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iMzIiIHZpZXdCYW94PSIwIDAgOTYgMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzEwQjUyMCIvPjx0ZXh0IHg9IjQ4IiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+SmFkZW1vbnk8L3RleHQ+PC9zdmc+";
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTI4IDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjgiIGhlLz48L3N2Zz4=";
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-emerald-950 via-red-950 to-amber-950">
      <BackgroundElements />
      
      {/* Show all logos on all screens except name-select */}
      {currentPage !== 'name-select' && <CompanyLogos />}
      
      {/* Name Selection Screen */}
      {currentPage === 'name-select' && (
        <div className="min-h-screen relative z-10 flex items-center justify-center px-4 py-20 sm:py-24">
          <div className="w-full max-w-2xl">
            {/* Only show Zoifintech logo on name-select screen */}
            <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-20 w-full px-4 flex justify-center">
              <div className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl p-1 sm:p-1.5 md:p-3 shadow-xl sm:shadow-2xl border border-yellow-300/40 sm:border-2 sm:border-yellow-300/50 max-w-[90px] xs:max-w-[100px] sm:max-w-[140px] md:max-w-[180px] lg:max-w-[200px]">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-lg sm:rounded-xl md:rounded-2xl blur-sm"></div>
                <div className="relative">
                  <img 
                    src="/Zoifintech.png" 
                    alt="Zoifintech Logo" 
                    className="h-4 sm:h-5 md:h-7 lg:h-8 w-auto object-contain mx-auto"
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-40 animate-pulse"></div>
                <svg width="120" height="120" viewBox="0 0 120 120" className="relative drop-shadow-2xl w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <defs>
                    <linearGradient id="treeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#2d5016', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#1a3d0a', stopOpacity: 1}} />
                    </linearGradient>
                    <radialGradient id="starGrad2">
                      <stop offset="0%" style={{stopColor: '#ffed4e', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#ffd700', stopOpacity: 1}} />
                    </radialGradient>
                  </defs>
                  <polygon points="60,15 80,50 70,50 90,80 30,80 50,50 40,50" fill="url(#treeGrad2)" stroke="#0f2308" strokeWidth="2"/>
                  <polygon points="60,20 75,50 45,50" fill="#4a7c23" opacity="0.6"/>
                  <rect x="55" y="80" width="10" height="20" fill="#5c3317" stroke="#3d2211" strokeWidth="1"/>
                  <circle cx="60" cy="30" r="3" fill="#ff0000" className="animate-pulse"/>
                  <circle cx="50" cy="55" r="3" fill="#ffd700"/>
                  <circle cx="70" cy="60" r="3" fill="#0066ff" className="animate-pulse"/>
                  <circle cx="45" cy="70" r="2.5" fill="#ff0000"/>
                  <circle cx="75" cy="72" r="2.5" fill="#ffd700" className="animate-pulse"/>
                  <path d="M 60,5 L 63,12 L 70,12 L 65,17 L 67,24 L 60,19 L 53,24 L 55,17 L 50,12 L 57,12 Z" 
                        fill="url(#starGrad2)" stroke="#ffa500" strokeWidth="1" className="animate-pulse"/>
                </svg>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-3 sm:mb-4"
                style={{
                  fontFamily: 'Georgia, serif',
                  textShadow: '3px 3px 0px rgba(139, 0, 0, 0.3), 6px 6px 15px rgba(255, 215, 0, 0.4)',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #ffa500 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                  animation: 'shimmer 3s linear infinite'
                }}>
              Welcome to Christmas 2025! 🎄
            </h1>

            <p className="text-yellow-100 text-base sm:text-lg md:text-xl text-center mb-6 sm:mb-8 font-serif italic">
              Select your name to discover your team
            </p>

            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 rounded-2xl blur-xl opacity-30"></div>
              <input
                type="text"
                placeholder="🔍 Search your name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-yellow-400/40 text-yellow-50 placeholder-yellow-300/60 focus:outline-none focus:border-yellow-400 focus:bg-white/20 transition-all duration-300"
                style={{fontFamily: 'Georgia, serif'}}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-green-900/40 to-red-900/40 rounded-2xl blur-xl opacity-40"></div>
              <div className="relative bg-gradient-to-br from-red-900/60 via-green-900/60 to-red-900/60 backdrop-blur-xl rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-yellow-400/40 max-h-80 sm:max-h-96 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  {filteredMembers.map((member, i) => (
                    <button
                      key={i}
                      onClick={() => handleNameSelect(member.name)}
                      className="relative group px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-600/20 backdrop-blur-sm border-2 border-yellow-400/30 hover:border-yellow-400/60 hover:from-yellow-400/30 hover:to-amber-600/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                      <span className="relative text-yellow-50 font-semibold text-sm sm:text-base block"
                            style={{fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                        ⭐ {member.name}
                      </span>
                    </button>
                  ))}
                </div>
                {filteredMembers.length === 0 && (
                  <p className="text-yellow-300/60 text-center py-4 sm:py-6 text-sm sm:text-base font-serif">
                    No names found. Try a different search! 🎅
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Animation Screen */}
      {currentPage === 'welcome' && (
        <div className="min-h-screen relative z-10 flex items-center justify-center px-4 pt-16 sm:pt-20">
          <div className="text-center">
            <div className="mb-4 sm:mb-6 animate-bounce" style={{animationDuration: '2s'}}>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">🎅</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4"
                style={{
                  fontFamily: 'Georgia, serif',
                  textShadow: '3px 3px 0px rgba(139, 0, 0, 0.3), 6px 6px 15px rgba(255, 215, 0, 0.4)',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #ffa500 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                  animation: 'shimmer 3s linear infinite, fadeInScale 0.8s ease-out'
                }}>
              Merry Christmas!
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-yellow-100 font-serif mb-2 sm:mb-3"
                style={{animation: 'fadeInScale 0.8s ease-out 0.3s both'}}>
              Welcome, {selectedName}! 🎄
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-300 font-serif italic"
               style={{animation: 'fadeInScale 0.8s ease-out 0.6s both'}}>
              Let's discover your team... ✨
            </p>
          </div>
        </div>
      )}

      {/* Spin Wheel Screen */}
      {currentPage === 'spin' && (
        <div className="min-h-screen relative z-10 flex flex-col items-center justify-center px-4 pt-16 sm:pt-20 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-300 mb-6 sm:mb-8 md:mb-10 text-center font-serif px-2"
              style={{textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)'}}>
            🎰 Click to Spin the Christmas Wheel! 🎰
          </h2>
          
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute -top-10 sm:-top-12 md:-top-14 left-1/2 transform -translate-x-1/2 z-20">
              <div className="relative">
                <div className="w-0 h-0 border-l-[16px] sm:border-l-[20px] md:border-l-[24px] border-l-transparent border-r-[16px] sm:border-r-[20px] md:border-r-[24px] border-r-transparent border-t-[30px] sm:border-t-[40px] md:border-t-[50px] border-t-yellow-400 drop-shadow-2xl"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-red-600 rounded-full border-2 sm:border-3 border-yellow-300 shadow-2xl"></div>
              </div>
            </div>

            <button
              onClick={handleSpinClick}
              disabled={spinning}
              className="relative cursor-pointer disabled:cursor-not-allowed transition-transform duration-300 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-full blur-xl sm:blur-2xl opacity-50 animate-pulse"></div>
              
              <svg 
                width="280" 
                height="280" 
                viewBox="0 0 400 400"
                className="relative drop-shadow-2xl w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'transform 0.3s ease-out'
                }}
              >
                <defs>
                  {teams.map((team, i) => (
                    <linearGradient key={i} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: team.wheelColor, stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: team.wheelColor, stopOpacity: 0.7}} />
                    </linearGradient>
                  ))}
                </defs>
                
                {teams.map((team, i) => {
                  const startAngle = (i * 360) / teams.length;
                  const endAngle = ((i + 1) * 360) / teams.length;
                  const largeArcFlag = 0;
                  
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  
                  const x1 = 200 + 180 * Math.cos(startRad);
                  const y1 = 200 + 180 * Math.sin(startRad);
                  const x2 = 200 + 180 * Math.cos(endRad);
                  const y2 = 200 + 180 * Math.sin(endRad);
                  
                  return (
                    <g key={i}>
                      <path
                        d={`M 200 200 L ${x1} ${y1} A 180 180 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={`url(#gradient-${i})`}
                        stroke="#ffd700"
                        strokeWidth="4"
                      />
                      <text
                        x="200"
                        y="200"
                        fill="white"
                        fontSize="36"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${startAngle + 45} 200 200) translate(0 -110)`}
                        style={{fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}
                      >
                        {team.icon}
                      </text>
                    </g>
                  );
                })}
                
                <circle cx="200" cy="200" r="60" fill="#ffd700" stroke="#ff0000" strokeWidth="6"/>
                <circle cx="200" cy="200" r="50" fill="#ff0000" stroke="#ffd700" strokeWidth="4"/>
                <text x="200" y="210" fill="white" fontSize="28" textAnchor="middle" fontWeight="bold" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                  {spinning ? '...' : 'SPIN'}
                </text>
              </svg>
            </button>
          </div>
          
          {!spinning && (
            <p className="text-yellow-200 text-base sm:text-lg md:text-xl lg:text-2xl text-center mt-4 sm:mt-6 font-serif italic animate-pulse px-2">
              Click the wheel to reveal your team! ✨
            </p>
          )}
        </div>
      )}

      {/* Result Screen */}
      {currentPage === 'result' && revealedTeam && (
        <div className="min-h-screen relative z-10 flex items-center justify-center px-4 pt-16 sm:pt-20 py-12 sm:py-16">
          <div className="text-center max-w-2xl w-full" style={{animation: 'fadeInScale 0.8s ease-out'}}>
            <div className="mb-4 sm:mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-bounce" style={{animationDuration: '1s'}}>
              {revealedTeam.icon}
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4"
                style={{
                  fontFamily: 'Georgia, serif',
                  textShadow: '3px 3px 0px rgba(139, 0, 0, 0.3), 6px 6px 15px rgba(255, 215, 0, 0.4)',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #ffa500 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                  animation: 'shimmer 3s linear infinite'
                }}>
              You're in...
            </h2>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-yellow-300 mb-4 sm:mb-6 md:mb-8 font-serif"
                style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'}}>
              {revealedTeam.title}! 🎉
            </h3>
            
            <div className={`relative bg-gradient-to-br ${revealedTeam.color} backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 sm:border-3 md:border-4 ${revealedTeam.border} shadow-xl sm:shadow-2xl mb-4 sm:mb-6 md:mb-8 mx-2`}>
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-yellow-300 mb-3 sm:mb-4 md:mb-6 font-serif">Your Amazing Teammates:</h4>
              <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                {revealedTeam.members.map((member, i) => (
                  <div 
                    key={i}
                    className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg sm:rounded-xl text-yellow-50 text-sm sm:text-base md:text-lg lg:text-xl font-semibold border transition-all duration-300 ${
                      member === selectedName 
                        ? 'bg-gradient-to-r from-yellow-400/40 to-amber-600/40 border-yellow-400 shadow-lg shadow-yellow-400/50 scale-[1.02]' 
                        : 'bg-white/15 border-yellow-400/20 hover:bg-white/20'
                    }`}
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      animation: member === selectedName ? 'pulse 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    {member === selectedName ? '👑 ' : '⭐ '}{member}
                    {member === selectedName && ' (You!)'}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-2">
              <button
                onClick={() => setShowAllTeams(true)}
                className="relative group px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 lg:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl shadow-lg sm:shadow-xl hover:shadow-green-400/50 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 border-2 sm:border-3 md:border-4 border-green-300"
                style={{fontFamily: 'Georgia, serif'}}
              >
                <span className="relative z-10">👥 View All Teams</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
              </button>
              
              <button
                onClick={resetExperience}
                className="relative group px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 lg:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-red-900 font-bold text-sm sm:text-base md:text-lg lg:text-xl shadow-lg sm:shadow-xl hover:shadow-yellow-400/50 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 border-2 sm:border-3 md:border-4 border-yellow-200"
                style={{fontFamily: 'Georgia, serif'}}
              >
                <span className="relative z-10">🔄 Start Over</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Teams View Modal */}
      {showAllTeams && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-950 via-red-950 to-amber-950">
          <BackgroundElements />
          <CompanyLogos showAll={true} />
          
          <div className="relative z-10 h-full w-full overflow-y-auto">
            <div className="min-h-full px-3 sm:px-4 pt-16 sm:pt-20 pb-20 sm:pb-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <div className="mb-3 sm:mb-4 md:mb-5">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-yellow-400 blur-xl sm:blur-2xl opacity-30 animate-pulse"></div>
                      <svg width="60" height="60" className="sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px] relative drop-shadow-2xl mx-auto" viewBox="0 0 120 120">
                        <defs>
                          <linearGradient id="treeGradAll" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#2d5016', stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: '#1a3d0a', stopOpacity: 1}} />
                          </linearGradient>
                          <radialGradient id="starGradAll">
                            <stop offset="0%" style={{stopColor: '#ffed4e', stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: '#ffd700', stopOpacity: 1}} />
                          </radialGradient>
                        </defs>
                        <polygon points="60,15 80,50 70,50 90,80 30,80 50,50 40,50" fill="url(#treeGradAll)" stroke="#0f2308" strokeWidth="2"/>
                        <polygon points="60,20 75,50 45,50" fill="#4a7c23" opacity="0.6"/>
                        <rect x="55" y="80" width="10" height="20" fill="#5c3317" stroke="#3d2211" strokeWidth="1"/>
                        <circle cx="60" cy="30" r="3" fill="#ff0000" className="animate-pulse"/>
                        <circle cx="50" cy="55" r="3" fill="#ffd700"/>
                        <circle cx="70" cy="60" r="3" fill="#0066ff" className="animate-pulse"/>
                        <circle cx="45" cy="70" r="2.5" fill="#ff0000"/>
                        <circle cx="75" cy="72" r="2.5" fill="#ffd700" className="animate-pulse"/>
                        <path d="M 60,5 L 63,12 L 70,12 L 65,17 L 67,24 L 60,19 L 53,24 L 55,17 L 50,12 L 57,12 Z" 
                              fill="url(#starGradAll)" stroke="#ffa500" strokeWidth="1" className="animate-pulse"/>
                      </svg>
                    </div>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4"
                      style={{
                        fontFamily: 'Georgia, serif',
                        textShadow: '3px 3px 0px rgba(139, 0, 0, 0.3), 6px 6px 15px rgba(255, 215, 0, 0.4)',
                        background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #ffa500 75%, #ffd700 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% auto',
                        animation: 'shimmer 3s linear infinite'
                      }}>
                    All Christmas Teams 🎄
                  </h1>
                  
                  <p className="text-yellow-100 text-sm sm:text-base md:text-lg lg:text-xl font-serif italic">
                    ✨ Our Amazing Holiday Squads ✨
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  {teams.map((team, i) => (
                    <div
                      key={i}
                      className={`relative bg-gradient-to-br ${team.color} backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg sm:shadow-xl hover:shadow-2xl border-2 ${team.border} transform hover:scale-[1.02] transition-all duration-300 ${team.glow} cursor-default`}
                    >
                      <div className="text-4xl sm:text-5xl md:text-6xl text-center mb-2 sm:mb-3 md:mb-4 animate-bounce" style={{animationDuration: '2s', animationDelay: `${i * 0.2}s`}}>
                        {team.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-300 text-center mb-3 sm:mb-4 md:mb-5 font-serif" 
                          style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                        {team.title}
                      </h3>
                      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                        {team.members.map((member, j) => (
                          <div 
                            key={j} 
                            className={`backdrop-blur-sm rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-2.5 text-yellow-50 text-center font-medium border transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-x-0.5 text-xs sm:text-sm md:text-base ${
                              member === selectedName
                                ? 'bg-gradient-to-r from-yellow-400/40 to-amber-600/40 border-yellow-400 shadow-lg shadow-yellow-400/50'
                                : 'bg-white/15 border-yellow-400/20 hover:bg-white/20 hover:border-yellow-400/40'
                            }`}
                            style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
                          >
                            {member === selectedName ? '👑 ' : '⭐ '}{member}
                            {member === selectedName && ' (You!)'}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 pb-20 sm:pb-24">
                  <p className="text-yellow-200 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif italic px-2"
                     style={{textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)'}}>
                    🎄 Wishing Everyone a Magical Holiday Season! 🎄
                  </p>
                  <p className="text-yellow-300/80 text-xs sm:text-sm md:text-base lg:text-lg font-serif mb-4 sm:mb-6 md:mb-8 px-2">
                    Let's make this Christmas celebration unforgettable! 🎉
                  </p>
                  
                  <button
                    onClick={() => setShowAllTeams(false)}
                    className="relative group px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 lg:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl shadow-lg sm:shadow-xl hover:shadow-red-400/50 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 border-2 sm:border-3 md:border-4 border-red-300 mx-auto"
                    style={{fontFamily: 'Georgia, serif'}}
                  >
                    <span className="relative z-10">← Back to My Team</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-500 to-red-400 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes snowfall {
          0% { 
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(110vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes gentle-float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% { 
            transform: translateY(-15px) translateX(10px) rotate(5deg);
          }
          50% { 
            transform: translateY(-25px) translateX(-5px) rotate(-3deg);
          }
          75% { 
            transform: translateY(-10px) translateX(-10px) rotate(3deg);
          }
        }
        @keyframes twinkle {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.4;
            transform: scale(0.9);
          }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 215, 0, 0.05);
          border-radius: 8px;
          margin: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ffd700, #ffa500);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ffed4e, #ff8c00);
          transform: scale(1.1);
        }
        
        /* Responsive breakpoints */
        @media (max-width: 480px) {
          .xs\:max-w-\[100px\] {
            max-width: 100px;
          }
        }
        
        /* Better touch experience on mobile */
        @media (hover: none) and (pointer: coarse) {
          button, 
          .custom-scrollbar::-webkit-scrollbar-thumb {
            min-height: 44px;
            min-width: 44px;
          }
          
          input {
            font-size: 16px;
          }
        }
        
        /* Performance optimizations */
        .transform {
          will-change: transform;
        }
        
        .backdrop-blur-xl {
          will-change: backdrop-filter;
        }
      `}</style>
    </div>
  );
};

export default ChristmasPage;