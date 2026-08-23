import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useSecretsStore } from '../store/useSecretsStore';
import { TeddyBear } from '../components/TeddyBear';
import { FloatingParticles } from '../components/FloatingParticles';
import { Play } from 'lucide-react';

export const WelcomeScreen = () => {
  const { setScreen, reset, appMode, setAppMode } = useSecretsStore();
  const [displayedGreeting, setDisplayedGreeting] = useState('');

  const greeting = "أهلاً يا عائشة 🌷";
  const words = greeting.split(' ');

  useEffect(() => {
    reset();
    
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedGreeting(words.slice(0, i + 1).join(' '));
      i++;
      if (i >= words.length) {
        clearInterval(interval);
      }
    }, 400); // 400ms per word

    return () => clearInterval(interval);
  }, [reset]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.8 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getModeLabel = (m: string) => {
    switch(m) {
      case 'heart': return 'عائشة قلبي 💖';
      case 'sparkle': return 'عائشة بريقي ✨';
      case 'dream': return 'عائشة حلمي ☁️';
      case 'soul':
      default: return 'عائشة روحي 🌙';
    }
  };

  const cycleMode = () => {
    const modes = ['soul', 'heart', 'sparkle', 'dream'] as const;
    const currentIndex = modes.indexOf(appMode);
    setAppMode(modes[(currentIndex + 1) % modes.length]);
  };

  const getBackgroundGradient = () => {
    switch(appMode) {
      case 'heart': return 'from-pink-100 via-rose-50 to-white';
      case 'sparkle': return 'from-emerald-50 via-teal-50 to-white';
      case 'dream': return 'from-indigo-100 via-purple-50 to-white';
      case 'soul':
      default: return 'from-rose-100 via-fuchsia-100 to-white';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full flex-1 p-6 relative overflow-hidden transition-colors duration-1000"
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${getBackgroundGradient()} -z-20 transition-all duration-1000`} />
      
      {/* Ambient background layer */}
      <div className="absolute inset-0 -z-10">
        <FloatingParticles type="mixed" count={25} />
      </div>

      {/* Mode Toggle Button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={cycleMode}
          className="bg-white/60 backdrop-blur-md border border-white/50 shadow-sm text-slate-700 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:bg-white/80 active:scale-95 flex items-center gap-2"
          dir="rtl"
        >
          {getModeLabel(appMode)}
        </button>
      </div>
      
      {/* Bear Entrance */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
      >
        <TeddyBear state="idle" />
      </motion.div>
      
      <div className="mt-8 text-center z-10 flex flex-col items-center">
        {/* Name Reveal */}
        <motion.h1 
          className="text-3xl font-extrabold mb-4 shimmer-gold text-slate-800 h-10"
          dir="rtl"
        >
          {displayedGreeting}
          {displayedGreeting.length < greeting.length && <span className="animate-pulse inline-block ml-1">|</span>}
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-slate-600 mb-10 max-w-xs mx-auto leading-relaxed text-lg"
          dir="rtl"
        >
          عندي لك مفاجأة صغيرة، حاجة معمولة مخصوص علشانك..
        </motion.p>
        
        {/* CTA Button */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            boxShadow: ["0px 0px 0px rgba(244, 63, 94, 0)", "0px 0px 20px rgba(244, 63, 94, 0.5)", "0px 0px 0px rgba(244, 63, 94, 0)"]
          }}
          transition={{ 
            opacity: { delay: 2.2 },
            scale: { delay: 2.2, type: 'spring', bounce: 0.4 },
            boxShadow: { delay: 2.5, duration: 2, repeat: Infinity }
          }}
          onClick={() => setScreen('permission')}
          className="flex items-center gap-3 bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full font-bold transition-colors text-lg cursor-pointer"
          dir="rtl"
        >
          <Play size={20} fill="currentColor" />
          <span>يلا نبدأ</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
