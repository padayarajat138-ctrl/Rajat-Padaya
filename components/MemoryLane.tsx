import React from 'react';
import { MEMORIES } from '../constants';

interface MemoryLaneProps {
  onNext: () => void;
}

const MemoryLane: React.FC<MemoryLaneProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col py-10 relative overflow-hidden">
      
      <div className="text-center mb-6 z-10 px-4">
        <h2 className="text-4xl font-pacifico text-purple-600 mb-2">Memory Lane 📸</h2>
        <p className="text-gray-600">Some moments are forever...</p>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex-1 flex items-center overflow-x-auto hide-scrollbar px-8 gap-6 pb-8 snap-x snap-mandatory">
        {MEMORIES.map((mem, index) => (
          <div 
            key={mem.id} 
            className="snap-center shrink-0 w-[280px] md:w-[320px] bg-white p-4 pb-12 shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300 rounded-sm transform"
            style={{ 
                transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
            }}
          >
            <div className="w-full h-[350px] bg-gray-200 overflow-hidden mb-4 relative">
              <img 
                src={mem.src} 
                alt={mem.caption} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <p className="font-fredoka text-xl text-center text-gray-700">{mem.caption}</p>
          </div>
        ))}
        
        {/* Spacer for end of scroll */}
        <div className="w-4 shrink-0"></div>
      </div>

      <div className="text-center mt-4 z-10">
        <button 
          onClick={onNext}
          className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-50 transition-colors border-2 border-purple-200"
        >
          Read My Letter ❤️
        </button>
      </div>
    </div>
  );
};

export default MemoryLane;