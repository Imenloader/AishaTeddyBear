import React, { useMemo } from 'react';

export interface FloatingParticlesProps {
  type?: 'hearts' | 'sparkles' | 'stars' | 'mixed';
  count?: number;
  className?: string;
}

const EMOJI_SETS = {
  hearts: ['💖', '💗', '💝', '🩷', '✨'],
  sparkles: ['✨', '⭐', '💫'],
  stars: ['⭐', '🌟', '✦'],
  mixed: ['💖', '💗', '💝', '🩷', '✨', '⭐', '💫', '🌟', '✦']
};

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  type = 'mixed',
  count = 20,
  className = ''
}) => {
  const particles = useMemo(() => {
    const symbols = EMOJI_SETS[type] || EMOJI_SETS.mixed;
    return Array.from({ length: count }).map((_, i) => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 10;
      const animationDuration = 8 + Math.random() * 12;
      const size = 0.5 + Math.random() * 1; // 0.5 to 1.5rem
      const opacity = 0.15 + Math.random() * 0.35;
      
      return { 
        id: i, 
        symbol, 
        left, 
        animationDelay, 
        animationDuration, 
        size, 
        opacity 
      };
    });
  }, [type, count]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute -bottom-10 text-center select-none"
          style={{
            left: `${p.left}%`,
            opacity: p.opacity,
            fontSize: `${p.size}rem`,
            animation: `float ${p.animationDuration}s linear ${p.animationDelay}s infinite`,
            willChange: 'transform'
          }}
        >
          {p.symbol}
        </span>
      ))}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-33vh) translateX(20px) rotate(120deg);
          }
          66% {
            transform: translateY(-66vh) translateX(-20px) rotate(240deg);
          }
          100% {
            transform: translateY(-120vh) translateX(0px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
