import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSecretsStore } from '../store/useSecretsStore';
import { getSecrets } from '../data/secrets';
import { getDailyMessage } from '../data/dailyContent';
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

  const [dailyMsg] = useState(() => getDailyMessage(appMode));
  const [isDhikrMode, setIsDhikrMode] = useState(false);
  const [dhikrStep, setDhikrStep] = useState(0);

  const dhikrWords = ['سبحان الله', 'الحمد لله', 'الله أكبر'];

  useEffect(() => {
    let dhikrInterval: NodeJS.Timeout;
    if (isDhikrMode) {
      dhikrInterval = setInterval(() => {
        setDhikrStep((prev) => (prev + 1) % dhikrWords.length);
      }, 4000); // Change word every 4 seconds (matches breathing scale)
    }
    return () => clearInterval(dhikrInterval);
  }, [isDhikrMode]);

  const onBearClick = (e: React.MouseEvent) => {
    if (isDhikrMode) return;
    setRipple({ x: e.clientX, y: e.clientY, id: Date.now() });
    handleGesture('Open_Palm');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center h-full p-4 relative overflow-hidden flex-1 w-full"
    >
      <div className={`absolute top-0 left-0 w-full h-full -z-20 transition-colors duration-1000 bg-gradient-to-br ${isDhikrMode ? 'from-slate-900 via-indigo-900 to-slate-800' : getGradient(currentBearState)}`} />
      
      {!isDhikrMode && <FloatingParticles type={getParticleType(currentBearState) as any} count={20} />}

      {/* Constellations (Hidden in Dhikr Mode) */}
      {!isDhikrMode && (
        <div className="w-full flex justify-center pt-2 z-10 shrink-0">
          {/* ... existing constellation code ... */}
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
      )}

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
              (isDhikrMode || (appMode === 'heart' && currentBearState === 'idle'))
                ? { scale: [1, 1.05, 1] } 
                : { scale: 1 }
            }
            transition={
              (isDhikrMode || (appMode === 'heart' && currentBearState === 'idle'))
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

      {/* Daily Dashboard & Dhikr Toggle */}
      <AnimatePresence mode="wait">
        {isDhikrMode ? (
          <motion.div
            key="dhikr"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex-1 flex flex-col items-center justify-center z-20"
          >
            <motion.h2
              key={dhikrStep}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
              className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg"
              dir="rtl"
            >
              {dhikrWords[dhikrStep]}
            </motion.h2>
            <p className="text-indigo-200 text-sm mt-8 opacity-80" dir="rtl">خدي نفس عميق مع الدبدوب...</p>
            <button
              onClick={() => setIsDhikrMode(false)}
              className="mt-10 px-6 py-2 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 pointer-events-auto"
            >
              رجوع
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full px-4 mb-4 z-20 flex flex-col gap-4"
          >
            {/* Dhikr Button */}
            <div className="flex justify-center w-full">
               <button
                 onClick={() => setIsDhikrMode(true)}
                 className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-indigo-800 text-sm font-bold border border-white/50"
                 dir="rtl"
               >
                 <span>📿</span>
                 <span>جلسة تسبيح وهدوء</span>
               </button>
            </div>

            {/* Daily Message Card */}
            <div className={`backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50 text-center ${dailyMsg.type === 'friday_letter' ? 'bg-rose-50' : 'bg-white/80'}`} dir="rtl">
              <h3 className="text-slate-800 font-bold mb-2">{dailyMsg.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{dailyMsg.content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
