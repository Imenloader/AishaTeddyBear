import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export interface TapRippleProps {
  x: number;
  y: number;
  onComplete: () => void;
}

const HEARTS = ['💖', '💗', '💝', '🩷'];

export const TapRipple: React.FC<TapRippleProps> = ({ x, y, onComplete }) => {
  const [hearts, setHearts] = useState<Array<{ id: number; tx: number; ty: number; symbol: string }>>([]);

  useEffect(() => {
    // Generate 8-12 hearts
    const numHearts = Math.floor(Math.random() * 5) + 8;
    const newHearts = Array.from({ length: numHearts }).map((_, i) => {
      // Distribute evenly in a circle with some randomness
      const angle = (Math.PI * 2 * i) / numHearts + (Math.random() - 0.5);
      const velocity = 60 + Math.random() * 60; // Spread distance
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      const symbol = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      
      return { id: i, tx, ty, symbol };
    });
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts.map((h, i) => (
        <motion.span
          key={h.id}
          className="absolute text-2xl select-none origin-center"
          // Center the heart exactly on the tap coordinates
          style={{ left: -14, top: -14 }}
          initial={{ x, y, scale: 0.2, opacity: 1 }}
          animate={{ 
            x: x + h.tx, 
            y: y + h.ty, 
            scale: 1.5 + Math.random() * 0.5, 
            opacity: 0 
          }}
          transition={{ 
            duration: 0.8 + Math.random() * 0.4, 
            ease: "easeOut" 
          }}
          onAnimationComplete={() => {
            // Trigger onComplete when the last animation finishes
            if (i === hearts.length - 1) {
              onComplete();
            }
          }}
        >
          {h.symbol}
        </motion.span>
      ))}
    </div>
  );
};
