import { motion, Variants } from 'motion/react';
import { BearState } from '../types';

export const TeddyBear = ({ state }: { state: BearState }) => {
  const bodyVariants: Variants = {
    idle: { 
      scaleX: [1, 1.02, 1],
      scaleY: [1, 0.98, 1], 
      y: 0,
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } 
    },
    happy: { 
      scaleX: 1, scaleY: 1,
      y: [0, -15, 0], 
      transition: { repeat: Infinity, duration: 0.6, ease: "easeOut" } 
    },
    shy: { scaleX: 1, scaleY: 0.95, y: 5 },
    love: { 
      scaleX: [1, 1.03, 1], 
      scaleY: [1, 0.97, 1], 
      y: 0,
      transition: { repeat: Infinity, duration: 1.5 } 
    },
    reading: { scaleX: 1, scaleY: 1, y: 5 },
    surprise: { 
      scaleX: 1, scaleY: [1, 1.1, 1], 
      y: -10, 
      transition: { type: "spring", stiffness: 300 } 
    },
    sleep: { 
      scaleX: [1, 1.02, 1], 
      scaleY: [1, 0.98, 1], 
      y: 0,
      transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
    }
  };

  const headVariants: Variants = {
    idle: { rotate: [-2, 2, -2], y: 0, transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    happy: { rotate: [-5, 5, -5], y: [0, -15, 0], transition: { repeat: Infinity, duration: 0.6 } },
    shy: { rotate: 8, y: 5 },
    love: { rotate: [-3, 3, -3], y: 0, transition: { repeat: Infinity, duration: 2 } },
    reading: { rotate: -15, y: 5 }, 
    surprise: { rotate: 0, y: -10 },
    sleep: { rotate: 12, y: 0 }
  };

  const armLeftVariants: Variants = {
    idle: { rotate: 0, x: 0, y: 0 },
    happy: { rotate: [-10, -120, -10], x: 0, y: [0, -15, 0], transition: { repeat: Infinity, duration: 0.6 } },
    shy: { rotate: -150, x: 0, y: 5 }, 
    love: { rotate: [-10, -30, -10], x: 0, y: 0, transition: { repeat: Infinity, duration: 1.5 } }, 
    reading: { rotate: -60, x: 0, y: 5 }, 
    surprise: { rotate: -130, x: 0, y: -10 },
    sleep: { rotate: 10, x: 0, y: 0 }
  };

  const armRightVariants: Variants = {
    idle: { rotate: 0, x: 0, y: 0 },
    happy: { rotate: [10, 120, 10], x: 0, y: [0, -15, 0], transition: { repeat: Infinity, duration: 0.6 } },
    shy: { rotate: 150, x: 0, y: 5 }, 
    love: { rotate: [10, 30, 10], x: 0, y: 0, transition: { repeat: Infinity, duration: 1.5 } }, 
    reading: { rotate: 60, x: 0, y: 5 }, 
    surprise: { rotate: 130, x: 0, y: -10 },
    sleep: { rotate: -10, x: 0, y: 0 }
  };
  
  const eyeVariants: Variants = {
    idle: { scaleX: 1, scaleY: [1, 1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 3.5, times: [0, 0.45, 0.5, 0.55, 1] } }, 
    happy: { scaleX: 1, scaleY: [1, 0.2, 1], transition: { repeat: Infinity, duration: 2 } },
    shy: { scaleX: 1, scaleY: 0.4 },
    love: { scaleX: 1, scaleY: 1 },
    reading: { scaleX: 1, scaleY: 0.8 },
    surprise: { scaleY: 1.5, scaleX: 1.2 },
    sleep: { scaleX: 1, scaleY: 0.1 } 
  };

  const blushVariants: Variants = {
    idle: { opacity: 0.3 },
    happy: { opacity: 0.5 },
    shy: { opacity: 0.9 },
    love: { opacity: 0.8 },
    surprise: { opacity: 0.6 },
    sleep: { opacity: 0.4 },
    reading: { opacity: 0.3 }
  };

  const glowVariants: Variants = {
    idle: { scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4], transition: { repeat: Infinity, duration: 3 } },
    happy: { scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6], transition: { repeat: Infinity, duration: 0.6 } },
    shy: { scale: 0.9, opacity: 0.4 },
    love: { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5], transition: { repeat: Infinity, duration: 1.5 } },
    reading: { scale: 1, opacity: 0.3 },
    surprise: { scale: 1.3, opacity: 0.8 },
    sleep: { scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2], transition: { repeat: Infinity, duration: 4 } },
  };

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Golden glow halo */}
      <motion.div 
        variants={glowVariants}
        initial="idle"
        animate={state}
        className="absolute w-48 h-48 rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(255,215,0,0) 70%)' }}
      />

      {/* Particle Emitters */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {state === 'love' && [...Array(6)].map((_, i) => (
          <motion.div
            key={`love-${i}`}
            initial={{ opacity: 0, y: 20, x: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], y: -100 - (Math.random() * 50), x: (Math.random() - 0.5) * 100, scale: [0.5, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: Math.random() * 2, ease: "easeOut" }}
            className="absolute top-1/4 left-1/2 -ml-3 text-xl drop-shadow-md"
          >💖</motion.div>
        ))}

        {state === 'happy' && [...Array(5)].map((_, i) => (
          <motion.div
            key={`happy-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: (Math.random() - 0.5) * 150, x: (Math.random() - 0.5) * 150, scale: [0, 1.5, 0] }}
            transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: Math.random() }}
            className="absolute top-1/2 left-1/2 -ml-3 -mt-3 text-xl drop-shadow-md"
          >✨</motion.div>
        ))}

        {state === 'sleep' && [...Array(3)].map((_, i) => (
          <motion.div
            key={`sleep-${i}`}
            initial={{ opacity: 0, y: 0, x: 20, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], y: -80 - (Math.random() * 40), x: 40 + (Math.random() * 30), scale: [0.5, 1.5, 2] }}
            transition={{ repeat: Infinity, duration: 3 + Math.random(), delay: i * 1.5, ease: "linear" }}
            className="absolute top-1/3 left-1/2 text-2xl font-bold text-blue-300 drop-shadow-sm"
          >Z</motion.div>
        ))}

        {state === 'surprise' && [...Array(4)].map((_, i) => (
          <motion.div
            key={`surprise-${i}`}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: (Math.random() - 0.5) * 120, x: (Math.random() - 0.5) * 120, scale: [0, 1.5, 1], rotate: 180 }}
            transition={{ duration: 0.8, delay: Math.random() * 0.2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -ml-3 -mt-3 text-xl drop-shadow-md"
          >⭐</motion.div>
        ))}
      </div>

      {/* SVG Scroll for 'reading' state */}
      {state === 'reading' && (
        <motion.div 
          initial={{ opacity: 0, y: 20, rotate: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotate: -5, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute z-20 top-32 drop-shadow-lg"
        >
          <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="10" width="50" height="50" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="2" />
            <path d="M5 15C5 12.2386 7.23858 10 10 10H50V15H5Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
            <path d="M5 60C5 57.2386 7.23858 55 10 55H50V60H5Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
            <line x1="15" y1="25" x2="45" y2="25" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="35" x2="40" y2="35" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="45" x2="30" y2="45" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      <motion.svg viewBox="0 0 200 200" className="w-full h-full overflow-visible relative z-10">
        <motion.g animate={state} initial="idle">
          {/* Body */}
          <motion.g variants={bodyVariants} style={{ transformOrigin: '100px 150px' }}>
            <path d="M 60 135 C 60 180, 140 180, 140 135 C 140 100, 60 100, 60 135" fill="#A87B51" stroke="#8A613C" strokeWidth="2" />
            <path d="M 75 140 C 75 170, 125 170, 125 140 C 125 115, 75 115, 75 140" fill="#E5C3A6" />
          </motion.g>

          {/* Head Group */}
          <motion.g variants={headVariants} style={{ transformOrigin: '100px 100px' }}>
            {/* Left Ear */}
            <circle cx="65" cy="65" r="15" fill="#A87B51" stroke="#8A613C" strokeWidth="2" />
            <circle cx="65" cy="65" r="8" fill="#E5C3A6" />
            
            {/* Right Ear */}
            <circle cx="135" cy="65" r="15" fill="#A87B51" stroke="#8A613C" strokeWidth="2" />
            <circle cx="135" cy="65" r="8" fill="#E5C3A6" />

            {/* Head */}
            <ellipse cx="100" cy="90" rx="42" ry="36" fill="#A87B51" stroke="#8A613C" strokeWidth="2" />
            
            {/* Muzzle */}
            <ellipse cx="100" cy="102" rx="22" ry="16" fill="#E5C3A6" />
            
            {/* Nose */}
            <ellipse cx="100" cy="96" rx="7" ry="5" fill="#332211" />
            <path d="M 100 100 L 100 106" stroke="#332211" strokeWidth="2" strokeLinecap="round" />
            
            {/* Mouth Expressions */}
            {state === 'idle' && (
              <path d="M 93 107 Q 100 112 107 107" fill="transparent" stroke="#332211" strokeWidth="2" strokeLinecap="round" />
            )}
            {state === 'happy' && (
              <path d="M 90 106 Q 100 116 110 106" fill="transparent" stroke="#332211" strokeWidth="2" strokeLinecap="round" />
            )}
            {state === 'shy' && (
              <circle cx="100" cy="108" r="2.5" fill="transparent" stroke="#332211" strokeWidth="2" />
            )}
            {state === 'love' && (
              <path d="M 96 107 Q 100 105 104 107 Q 100 111 96 107" fill="#FF9EAA" stroke="#332211" strokeWidth="1" strokeLinejoin="round" />
            )}
            {state === 'reading' && (
              <line x1="95" y1="108" x2="105" y2="108" stroke="#332211" strokeWidth="2" strokeLinecap="round" />
            )}
            {state === 'surprise' && (
              <circle cx="100" cy="110" r="4.5" fill="#332211" />
            )}
            {state === 'sleep' && (
              <line x1="95" y1="108" x2="105" y2="108" stroke="#332211" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Eyes */}
            <motion.g variants={eyeVariants} style={{ transformOrigin: '100px 80px' }}>
              <circle cx="82" cy="80" r="4.5" fill="#332211" />
              <circle cx="118" cy="80" r="4.5" fill="#332211" />
            </motion.g>
            
            {/* Blushes */}
            <motion.g variants={blushVariants} style={{ transformOrigin: '100px 95px' }}>
              <circle cx="75" cy="95" r="8" fill="#FFB5B5" />
              <circle cx="125" cy="95" r="8" fill="#FFB5B5" />
            </motion.g>
          </motion.g>

          {/* Left Arm (In front of body and head) */}
          <motion.g variants={armLeftVariants} style={{ transformOrigin: '70px 120px' }}>
             <path d="M 60 110 C 40 110, 30 140, 45 160 C 55 170, 75 145, 75 125" fill="#A87B51" stroke="#8A613C" strokeWidth="2" strokeLinejoin="round" />
          </motion.g>

          {/* Right Arm (In front of body and head) */}
          <motion.g variants={armRightVariants} style={{ transformOrigin: '130px 120px' }}>
            <path d="M 140 110 C 160 110, 170 140, 155 160 C 145 170, 125 145, 125 125" fill="#A87B51" stroke="#8A613C" strokeWidth="2" strokeLinejoin="round" />
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
};
