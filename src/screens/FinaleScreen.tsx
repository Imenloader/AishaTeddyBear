import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSecretsStore } from '../store/useSecretsStore';
import { getFinalSecret } from '../data/secrets';
import { TeddyBear } from '../components/TeddyBear';
import { RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const heartEmojis = ['💖', '💗', '💝'];

export const FinaleScreen = () => {
  const { currentBearState, setBearState, reset, appMode } = useSecretsStore();
  
  const FINAL_SECRET = getFinalSecret(appMode);
  
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [typedMessage, setTypedMessage] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  
  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 90 + 5}%`,
      left: `${Math.random() * 90 + 5}%`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 2 + 1}px`,
    }));
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      left: `${Math.random() * 80 + 10}%`,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 3,
    }));
  }, []);

  useEffect(() => {
    setPhase(1);
    setBearState('surprise');
    
    const duration = 3000;
    const end = Date.now() + duration;

    let heartShape: confetti.Shape | undefined;
    try {
      if (typeof confetti.shapeFromText === 'function') {
        heartShape = confetti.shapeFromText({ text: '❤️', scalar: 2 });
      }
    } catch (e) {
      // ignore
    }

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fbbf24', '#38bdf8'],
        shapes: heartShape ? [heartShape, 'circle'] : undefined
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#fbbf24', '#38bdf8'],
        shapes: heartShape ? [heartShape, 'circle'] : undefined
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    const phase2Timer = setTimeout(() => {
      setPhase(2);
      setBearState('love');
    }, 3000);

    const phase3Timer = setTimeout(() => {
      setPhase(3);
      setBearState('sleep');
    }, 5000);

    return () => {
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
    };
  }, [setBearState]);

  useEffect(() => {
    if (phase === 3) {
      const message = FINAL_SECRET.message;
      let index = 0;
      setTypedMessage('');
      setTypingComplete(false);
      
      const interval = setInterval(() => {
        setTypedMessage(message.substring(0, index + 1));
        index++;
        
        if (index >= message.length) {
          clearInterval(interval);
          setTypingComplete(true);
        }
      }, 30); // 30ms per letter
      
      return () => clearInterval(interval);
    }
  }, [phase]);

  let bgClass = 'bg-rose-100';
  if (phase === 2 || phase === 3) {
    bgClass = 'bg-indigo-950';
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={`flex flex-col items-center h-full flex-1 w-full p-6 pb-24 relative transition-colors duration-[3000ms] ${bgClass} overflow-y-auto overflow-x-hidden`}
    >
      <button 
        onClick={reset}
        className="absolute top-6 left-6 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold border border-white/20 transition-all z-50 flex items-center gap-2"
      >
        رجوع <span>↩</span>
      </button>

      <AnimatePresence>
        {(phase === 2 || phase === 3) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  animationDelay: star.delay,
                  animationDuration: '3s',
                  animationIterationCount: 'infinite'
                }}
              />
            ))}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent to-black/30" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 1 && (
          <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ y: -50, opacity: 0, rotate: 0 }}
                animate={{ y: '100dvh', opacity: [0, 1, 1, 0], rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: heart.duration, 
                  delay: heart.delay,
                  ease: "linear",
                  repeat: Infinity
                }}
                className="absolute text-3xl"
                style={{ left: heart.left }}
              >
                {heart.emoji}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="z-20 mt-8 shrink-0">
        <TeddyBear state={currentBearState} />
      </div>
      
      <div className="flex-1 mt-8 flex flex-col items-center w-full z-20 max-w-sm relative pb-8">
        <AnimatePresence mode="wait">
          {phase === 3 && (
            <motion.div
              key="finale-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="text-center w-full flex flex-col items-center"
            >
              <h2 className="text-4xl font-extrabold mb-4 shimmer-gold text-indigo-100 py-2 leading-relaxed">عائشة</h2>
              <div className="text-indigo-200 leading-loose mx-auto bg-indigo-900/40 p-6 rounded-3xl backdrop-blur-md border border-indigo-700/50 shadow-2xl mb-8 min-h-[160px] w-full text-right glass-dark" dir="rtl">
                <p>
                  {typedMessage}
                  {!typingComplete && typedMessage.length > 0 && <span className="animate-pulse inline-block ml-1">|</span>}
                </p>
              </div>
              
              {typingComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="flex flex-col items-center gap-6"
                >
                  <p className="text-indigo-300/60 italic font-medium">من قلبي ليكي 💝</p>
                  
                  <button 
                    onClick={reset}
                    className="flex items-center gap-2 text-indigo-300/60 hover:text-indigo-200 text-sm transition-colors"
                  >
                    <RotateCcw size={16} />
                    <span>إعادة التجربة</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
