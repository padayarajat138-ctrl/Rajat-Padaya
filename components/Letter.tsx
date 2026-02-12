import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const LETTER_CONTENT = `My Dearest Shinchan,

Happy Birthday! 🎉

Today isn't just about growing a year older; it's about celebrating the amazing soul you are. From our endless masti to your serious CA dreams, I've watched you grow stronger and brighter every day.

You remind me of Geet, not just because you love yourself (which you totally should!), but because you have this infectious energy that lights up the room. And just like in 12th Fail, remember that "Haar nahi maanunga". Your CA journey is tough, but you are tougher.

I am so proud of the woman you are becoming. Keep smiling, keep dreaming, and never let that spark fade.

Trust you always,
Your Kazama`;

const Letter: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [showFinale, setShowFinale] = useState(false);

  useEffect(() => {
    if (index < LETTER_CONTENT.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + LETTER_CONTENT.charAt(index));
        setIndex((prev) => prev + 1);
      }, 50); // Typing speed
      return () => clearTimeout(timer);
    }
  }, [index]);

  const skipTyping = () => {
    if (index < LETTER_CONTENT.length) {
        setDisplayedText(LETTER_CONTENT);
        setIndex(LETTER_CONTENT.length);
    }
  };

  const triggerFinale = () => {
    setShowFinale(true);
    
    // Fireworks Loop
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#fffdf0] flex flex-col items-center justify-center p-6 relative overflow-hidden">
       {/* Finale Overlay */}
       {showFinale && (
         <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-fade-in">
           <div className="text-center p-4">
              <h1 className="text-4xl md:text-6xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse drop-shadow-[0_0_15px_rgba(255,255,0,0.5)] mb-8">
                Happy Birthday <br /> CA Kratika Gupta! 🎓✨
              </h1>
              <p className="text-white/80 font-fredoka text-xl">The Sky is the Limit!</p>
           </div>
         </div>
       )}

       {/* Paper Texture Effect */}
       <div 
            onClick={skipTyping}
            className={`w-full max-w-2xl bg-white shadow-2xl p-8 md:p-12 relative overflow-hidden transition-all duration-1000 cursor-pointer ${showFinale ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`} 
            style={{ 
                backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)',
                backgroundSize: '100% 2rem',
                lineHeight: '2rem'
            }}>
          
          <div className="absolute top-0 left-0 w-full h-2 bg-red-400 opacity-20"></div>
          
          <h2 className="text-3xl font-pacifico text-gray-800 mb-6 text-center">To Kratika...</h2>
          
          <div className="font-fredoka text-lg md:text-xl text-gray-700 whitespace-pre-wrap min-h-[50vh]">
            {displayedText}
            {!showFinale && index < LETTER_CONTENT.length && <span className="animate-pulse">|</span>}
          </div>

          <div className="mt-8 flex justify-center h-16">
            {index >= LETTER_CONTENT.length && !showFinale && (
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    triggerFinale();
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-xl hover:scale-110 transition-transform animate-bounce"
              >
                Open Surprise! <Sparkles size={20} />
              </button>
            )}
            {index < LETTER_CONTENT.length && (
                <span className="text-gray-300 text-sm italic">Click to skip typing</span>
            )}
          </div>
       </div>

       <div className="mt-8 text-gray-500 font-fredoka text-sm">
          With lots of love & masti ✨
       </div>
    </div>
  );
};

export default Letter;