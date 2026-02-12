import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, ChevronRight } from 'lucide-react';

interface BlowingCakeProps {
  onComplete: () => void;
}

const BlowingCake: React.FC<BlowingCakeProps> = ({ onComplete }) => {
  const [candles, setCandles] = useState([true, true, true, true, true]); // true = lit
  const [isListening, setIsListening] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Check if all candles are out
    if (candles.every(c => !c) && !hasCompleted) {
      completeCelebration();
    }
  }, [candles, hasCompleted]);

  const completeCelebration = () => {
    if (hasCompleted) return;
    setHasCompleted(true);
    stopListening();
    window.confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(onComplete, 2000);
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      
      // Close existing context if open
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        await audioContextRef.current.close();
      }

      audioContextRef.current = new AudioContextClass();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      setIsListening(true);
      setAudioError(null);
      detectBlow();
    } catch (err) {
      console.error("Microphone error:", err);
      setAudioError("Could not access microphone. Please enable permissions or tap candles to blow them out!");
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }

    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(e => console.error("Error closing AudioContext:", e));
    }
    
    setIsListening(false);
  };

  const detectBlow = () => {
    if (!analyserRef.current || !audioContextRef.current || audioContextRef.current.state === 'closed') {
        return;
    }

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    const average = sum / bufferLength;

    // Threshold for "blowing" sound
    if (average > 40) {
      blowRandomCandle();
    }

    animationFrameRef.current = requestAnimationFrame(detectBlow);
  };

  const blowRandomCandle = () => {
    setCandles(prev => {
      const litIndices = prev.map((lit, idx) => lit ? idx : -1).filter(idx => idx !== -1);
      if (litIndices.length === 0) return prev;
      
      // Blow one random candle at a time for realism
      const randomIndex = litIndices[Math.floor(Math.random() * litIndices.length)];
      const newCandles = [...prev];
      newCandles[randomIndex] = false;
      return newCandles;
    });
  };

  // Fallback interaction: Click to blow
  const handleCandleClick = (index: number) => {
    setCandles(prev => {
      const newCandles = [...prev];
      newCandles[index] = false;
      return newCandles;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-pink-50 p-6 relative overflow-hidden">
      <h2 className="text-3xl font-pacifico text-pink-600 mb-8 text-center animate-bounce">
        Make a Wish & Blow! 🎂
      </h2>

      {/* The Cake */}
      <div className="relative mt-10 scale-110">
        {/* Plate */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-6 bg-gray-200 rounded-full shadow-lg"></div>
        
        {/* Base Layer */}
        <div className="w-56 h-32 bg-pink-300 rounded-lg relative mx-auto shadow-inner border-b-8 border-pink-400">
           <div className="absolute top-1/2 w-full h-4 bg-white opacity-30"></div>
        </div>
        
        {/* Top Layer */}
        <div className="w-48 h-24 bg-pink-200 rounded-lg relative mx-auto -mt-6 shadow-inner border-b-8 border-pink-300">
             <div className="absolute -top-2 w-full flex justify-center space-x-2">
                 {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-6 h-8 bg-white rounded-full"></div>
                 ))}
             </div>
        </div>

        {/* Candles Container */}
        <div className="absolute -top-16 left-0 right-0 flex justify-center space-x-4 items-end h-20">
          {candles.map((isLit, i) => (
            <div 
              key={i} 
              onClick={() => handleCandleClick(i)}
              className="relative cursor-pointer group"
            >
              {/* Flame */}
              <div 
                className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-yellow-400 rounded-full blur-[2px] transition-opacity duration-300 ${isLit ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
                style={{ boxShadow: '0 0 10px #ff9900' }}
              >
                  <div className="w-2 h-3 bg-white rounded-full opacity-50 mx-auto mt-1"></div>
              </div>
              
              {/* Candle Stick */}
              <div className="w-4 h-12 bg-blue-400 rounded-sm border-b-2 border-blue-600 relative">
                  <div className="w-full h-full opacity-30 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-20 text-center z-10 flex flex-col items-center gap-6">
        {!isListening && candles.some(c => c) && (
          <button 
            onClick={startListening}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform"
          >
            <Mic size={24} /> Enable Mic to Blow
          </button>
        )}
        
        {isListening && candles.some(c => c) && (
           <div className="flex flex-col items-center animate-pulse">
               <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center border-4 border-pink-300 mb-2">
                   <Mic size={32} className="text-pink-500" />
               </div>
               <p className="text-gray-500 font-semibold">Blow into your mic!</p>
           </div>
        )}

        {audioError && (
          <p className="mt-2 text-red-400 text-sm max-w-xs mx-auto bg-white/80 p-2 rounded-lg shadow-sm">
            {audioError}
          </p>
        )}

        {/* Move to next page button */}
        {candles.some(c => c) && (
          <button 
            onClick={completeCelebration}
            className="flex items-center gap-1 text-gray-500 hover:text-pink-600 font-fredoka text-sm transition-colors mt-2"
          >
            Skip to Surprise <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BlowingCake;