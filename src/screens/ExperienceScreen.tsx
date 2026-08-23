import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSecretsStore } from '../store/useSecretsStore';
import { getSecrets } from '../data/secrets';
import { CameraFeed } from '../components/CameraFeed';
import { TeddyBear } from '../components/TeddyBear';
import { FloatingParticles } from '../components/FloatingParticles';
import { TapRipple } from '../components/TapRipple';
import { GestureType } from '../types';

const STAR_POINTS = [
  { x: 15, y: 40 },
  { x: 30, y: 20 },
  { x: 50, y: 35 },
  { x: 70, y: 20 },
  { x: 85, y: 40 },
  { x: 70, y: 65 },
  { x: 50, y: 85 }
];

export const ExperienceScreen = () => {
  const { 
    currentBearState, setBearState, 
    currentMessage, setCurrentMessage,
    discoveredSecrets, addDiscoveredSecret,
    setScreen, isFinaleTriggered, triggerFinale,
    hasSkippedCamera, appMode
  } = useSecretsStore();
  
  const SECRETS = getSecrets(appMode);
  
  const [showIntro, setShowIntro] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [ripple, setRipple] = useState<{x: number, y: number, id: number} | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (discoveredSecrets.length >= 7 && !isFinaleTriggered) {
      triggerFinale();
    }
  }, [discoveredSecrets, isFinaleTriggered, triggerFinale]);

  useEffect(() => {
    if (isFinaleTriggered) {
      const timer = setTimeout(() => {
        setScreen('finale');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFinaleTriggered, setScreen]);

  useEffect(() => {
    if (!currentMessage) {
      setDisplayedText('');
      return;
    }
    
    let i = 0;
    setDisplayedText('');
    
    const interval = setInterval(() => {
      setDisplayedText(currentMessage.substring(0, i + 1));
      i++;
      if (i >= currentMessage.length) {
        clearInterval(interval);
      }
    }, 40); // 40ms per letter
    
    return () => clearInterval(interval);
  }, [currentMessage]);

  const handleGesture = useCallback((gesture: GestureType) => {
    if (isFinaleTriggered || gesture === 'None') return;

    const secret = SECRETS.find(s => !discoveredSecrets.includes(s.id));
    if (secret) {
      if (navigator.vibrate) navigator.vibrate(100);
      
      addDiscoveredSecret(secret.id);
      setBearState(secret.state);
      
      let randomMsg;
      if (secret.variants.length > 1) {
        do {
          randomMsg = secret.variants[Math.floor(Math.random() * secret.variants.length)];
        } while (randomMsg === currentMessage);
      } else {
        randomMsg = secret.variants[0];
      }
      
      setCurrentMessage(randomMsg);
      setShowIntro(false);
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      const typingTime = randomMsg.length * 40; // 40ms per letter typing
      const readingTime = Math.max(3000, randomMsg.length * 100); // 100ms per letter reading, min 3s
      const duration = typingTime + readingTime;
      
      timeoutRef.current = setTimeout(() => {
        setBearState('idle');
        setCurrentMessage(null);
      }, duration) as unknown as number;
    }
  }, [isFinaleTriggered, discoveredSecrets, addDiscoveredSecret, setBearState, currentMessage, setCurrentMessage, SECRETS]);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const totalSecrets = 7;

  const getGradient = (state: string) => {
    if (appMode === 'sparkle') {
        switch (state) {
            case 'love': return 'from-teal-100 via-emerald-50 to-white';
            case 'shy': return 'from-yellow-100 via-amber-50 to-white';
            case 'reading': return 'from-sky-100 via-blue-50 to-white';
            case 'happy': return 'from-emerald-100 via-teal-50 to-white';
            case 'surprise': return 'from-fuchsia-100 via-pink-50 to-white';
            default: return 'from-emerald-50 via-teal-50 to-white';
        }
    }
    if (appMode === 'dream') {
        switch (state) {
            case 'love': return 'from-purple-200 via-indigo-100 to-white';
            case 'shy': return 'from-indigo-200 via-violet-100 to-white';
            case 'reading': return 'from-blue-200 via-indigo-100 to-white';
            case 'happy': return 'from-fuchsia-200 via-purple-100 to-white';
            case 'surprise': return 'from-pink-200 via-rose-100 to-white';
            default: return 'from-indigo-100 via-purple-50 to-white';
        }
    }
    if (appMode === 'heart') {
        switch (state) {
            case 'love': return 'from-rose-200 via-pink-100 to-white';
            case 'shy': return 'from-orange-100 via-red-50 to-white';
            case 'reading': return 'from-amber-100 via-yellow-50 to-white';
            case 'happy': return 'from-pink-200 via-rose-100 to-white';
            case 'surprise': return 'from-purple-100 via-fuchsia-50 to-white';
            default: return 'from-pink-100 via-rose-50 to-white';
        }
    }
    
    // Default / soul mode
    switch (state) {
        case 'love': return 'from-pink-100 via-rose-50 to-pink-50';
        case 'shy': return 'from-orange-50 via-rose-50 to-amber-50';
        case 'reading': return 'from-amber-50 via-yellow-50 to-orange-50';
        case 'happy': return 'from-rose-50 via-pink-50 to-white';
        case 'surprise': return 'from-violet-50 via-purple-50 to-pink-50';
        default: return 'from-slate-50 via-rose-50 to-pink-50';
    }
  };

  const getParticleType = (state: string) => {
    if (state === 'love') return 'hearts';
    if (state === 'happy') return 'sparkles';
    return 'mixed';
  };

  const onBearClick = (e: React.MouseEvent) => {
    setRipple({ x: e.clientX, y: e.clientY, id: Date.now() });
    handleGesture('Open_Palm');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-between h-full p-4 relative overflow-hidden flex-1 w-full"
    >
      <div className={`absolute top-0 left-0 w-full h-full -z-20 transition-colors duration-1000 bg-gradient-to-br ${getGradient(currentBearState)}`} />
      
      <FloatingParticles type={getParticleType(currentBearState) as any} count={20} />

      <div className="w-full flex justify-center pt-2 z-10">
        <div className="relative w-48 h-24">
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {STAR_POINTS.map((p, i) => {
              if (i === 0) return null;
              const prev = STAR_POINTS[i - 1];
              const bothDiscovered = i < discoveredSecrets.length && (i - 1) < discoveredSecrets.length;
              return (
                <line 
                  key={`line-${i}`}
                  x1={prev.x} y1={prev.y} x2={p.x} y2={p.y}
                  stroke={bothDiscovered ? '#f43f5e' : '#cbd5e1'}
                  strokeWidth={bothDiscovered ? 2 : 1}
                  className="transition-colors duration-1000"
                />
              );
            })}
          </svg>
          {STAR_POINTS.map((p, i) => {
            const isDiscovered = i < discoveredSecrets.length || (i === 6 && isFinaleTriggered);
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: isDiscovered ? 1 : 0.3,
                  scale: isDiscovered ? 1.3 : 1
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-[1rem]"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                ⭐
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="h-28 w-full max-w-sm flex items-center justify-center mt-2 z-20">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-700"
            >
              عائشة... عندي 7 حاجات مخبيها لك. بس مش هقولهم إلا لما تكتشفيهم بنفسك 🧸
              <div className="text-xs text-slate-400 mt-2">اضغطي على الدبدوب 🧸</div>
            </motion.div>
          ) : currentMessage ? (
            <motion.div
              key="msg"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`px-6 py-4 rounded-2xl shadow-md text-center w-[90%] font-medium text-lg leading-relaxed ${
                currentBearState === 'love' ? 'bg-pink-100 text-pink-800 border-pink-200' :
                currentBearState === 'reading' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                'bg-white text-slate-800 border-slate-100'
              } border`}
            >
              {displayedText}
              {displayedText.length > 0 && displayedText.length < currentMessage.length && (
                <span className="inline-block animate-pulse font-bold ml-1">|</span>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div 
        className="flex-1 flex items-center justify-center my-2 relative w-full z-10 cursor-pointer"
        onClick={onBearClick}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBearState}
            animate={
              appMode === 'heart' && currentBearState === 'idle'
                ? { scale: [1, 1.03, 1] } 
                : { scale: 1 }
            }
            transition={
              appMode === 'heart' && currentBearState === 'idle'
                ? { scale: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
                : { type: 'spring', bounce: 0.5 }
            }
          >
            <TeddyBear state={currentBearState} />
          </motion.div>
        </AnimatePresence>
         
         {currentBearState === 'idle' && discoveredSecrets.length === 0 && !showIntro && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2 }}
             className="absolute bottom-0 text-slate-400 text-sm flex items-center gap-2 pointer-events-none"
           >
             <motion.span animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
               👇
             </motion.span>
             اضغطي على الدبدوب 🧸
           </motion.div>
         )}
      </div>

      {!hasSkippedCamera && (
        <div className="mb-4 z-20">
          <CameraFeed onGesture={handleGesture} isActive={!isFinaleTriggered} />
        </div>
      )}
      
      {ripple && (
        <TapRipple 
          key={ripple.id}
          x={ripple.x} 
          y={ripple.y} 
          onComplete={() => setRipple(null)} 
        />
      )}
    </motion.div>
  );
};
