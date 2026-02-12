import React, { useState, useRef, useEffect } from 'react';
import { AppStage } from './types';
import { SLIDES, BACKGROUND_MUSIC_URL } from './constants';
import FloatingElements from './components/FloatingElements';
import BlowingCake from './components/BlowingCake';
import MemoryLane from './components/MemoryLane';
import Letter from './components/Letter';
import { Volume2, VolumeX, ChevronRight, Sparkles, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.WELCOME);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio
    audioRef.current = new Audio(BACKGROUND_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Try to auto-play (might be blocked by browser policy until interaction)
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsMusicPlaying(true);
      }).catch(error => {
        console.log("Auto-play prevented. User interaction required.");
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const startCelebration = () => {
    setStage(AppStage.NARRATIVE);
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
      setIsMusicPlaying(true);
    }
  };

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setStage(AppStage.CAKE);
    }
  };

  const handleCakeComplete = () => {
    setStage(AppStage.MEMORY_LANE);
  };

  const handleMemoryLaneComplete = () => {
    setStage(AppStage.FINAL_MESSAGE);
  };

  // --- Render Helpers ---

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-pink-50 p-6 text-center relative z-20">
      <div className="animate-bounce mb-6">
        <span className="text-6xl">🎂</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-pacifico text-pink-600 mb-4 drop-shadow-sm leading-tight">
        Happy Birthday<br/>Kratika!
      </h1>
      <p className="text-xl md:text-2xl font-fredoka text-gray-600 mb-10 max-w-md mx-auto">
        aka Shinchan 🖍️
      </p>
      
      <button 
        onClick={startCelebration}
        className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl font-bold rounded-full shadow-xl hover:scale-105 transition-all duration-300 z-30 cursor-pointer"
      >
        <span className="flex items-center gap-2">
          Start the Magic <Sparkles size={20} className="animate-spin-slow" />
        </span>
        <div className="absolute inset-0 rounded-full bg-white opacity-20 group-hover:animate-ping"></div>
      </button>

      <p className="mt-8 text-sm text-gray-400 font-poppins">
        Turn up your volume 🔊
      </p>
    </div>
  );

  const renderNarrative = () => {
    const slide = SLIDES[currentSlideIndex];
    return (
      <div className={`h-screen w-full flex flex-col transition-colors duration-700 bg-gradient-to-br ${slide.bgGradient} relative overflow-hidden`}>
        {/* Image Section - Takes remaining height */}
        <div className="flex-1 relative w-full h-1/2 overflow-hidden bg-gray-200">
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover animate-fade-in absolute inset-0"
            key={slide.image}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600?text=Image+Loading...";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        </div>

        {/* Text Section - Fixed at bottom */}
        <div className="bg-white/95 backdrop-blur-md rounded-t-3xl -mt-6 p-8 pb-12 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-500">
           <div className="max-w-md mx-auto">
             <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">
                  Chapter {currentSlideIndex + 1}/{SLIDES.length}
                </span>
                <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={20} />
             </div>
             
             <h2 key={`title-${slide.id}`} className="text-3xl font-pacifico text-gray-800 mb-4 animate-slide-up leading-tight">
               {slide.title}
             </h2>
             
             <p key={`desc-${slide.id}`} className="text-gray-600 font-fredoka text-lg leading-relaxed mb-8 animate-slide-up-delay min-h-[4rem]">
               {slide.description}
             </p>

             <button 
               onClick={nextSlide}
               className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-gray-800 shadow-lg cursor-pointer"
             >
               {currentSlideIndex === SLIDES.length - 1 ? "Make a Wish ✨" : "Next ❤️"} 
               {currentSlideIndex !== SLIDES.length - 1 && <ChevronRight size={20} />}
             </button>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen relative font-sans text-gray-900 overflow-hidden bg-white">
      {/* Background Floating Elements (Balloons/Sparkles) */}
      <div className="absolute inset-0 z-0">
        <FloatingElements />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 h-full w-full">
        {stage === AppStage.WELCOME && renderWelcome()}
        {stage === AppStage.NARRATIVE && renderNarrative()}
        {stage === AppStage.CAKE && <BlowingCake onComplete={handleCakeComplete} />}
        {stage === AppStage.MEMORY_LANE && <MemoryLane onNext={handleMemoryLaneComplete} />}
        {stage === AppStage.FINAL_MESSAGE && <Letter />}
      </div>

      {/* Music Toggle Control */}
      <button 
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur p-3 rounded-full shadow-lg hover:bg-white transition-colors border border-gray-100 cursor-pointer"
        aria-label="Toggle Music"
      >
        {isMusicPlaying ? <Volume2 size={24} className="text-pink-600" /> : <VolumeX size={24} className="text-gray-400" />}
      </button>

      {/* Global CSS for Animations */}
      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        .animate-slide-up-delay {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;