import React, { useEffect, useState } from 'react';

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<Array<{ id: number; left: number; delay: number; type: string }>>([]);

  useEffect(() => {
    // Generate random floating elements
    const items = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      type: Math.random() > 0.6 ? 'balloon' : 'sparkle'
    }));
    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className={`absolute animate-float opacity-60 ${
            el.type === 'balloon' ? 'bottom-[-50px]' : 'top-0'
          }`}
          style={{
            left: `${el.left}%`,
            animationDuration: `${6 + Math.random() * 4}s`,
            animationDelay: `${el.delay}s`,
            fontSize: el.type === 'balloon' ? '2rem' : '1.5rem',
          }}
        >
          {el.type === 'balloon' ? '🎈' : '✨'}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;