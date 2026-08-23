import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSecretsStore } from '../store/useSecretsStore';
import { TeddyBear } from '../components/TeddyBear';
import { FloatingParticles } from '../components/FloatingParticles';
import { Play } from 'lucide-react';

export const WelcomeScreen = () => {
  const { setScreen, reset, appMode, setAppMode } = useSecretsStore();
  const [displayedGreeting, setDisplayedGreeting] = useState('');

  const getGreeting = () => {
    switch (appMode) {
      case 'heart': return 'يا نبض قلبي يا عائشة 💖';
      case 'sparkle': return 'يا أشطر وأجمل عائشة ✨';
      case 'dream': return 'يا حلمي الجميل يا عائشة ☁️';
      case 'soul':
      default: return 'أهلاً يا عائشة 🌷';
    }
  };

  const greeting = getGreeting();

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    const words = greeting.split(' ');
    let i = 0;
    setDisplayedGreeting('');
    
    const interval = setInterval(() => {
      setDisplayedGreeting(words.slice(0, i + 1).join(' '));
      i++;
      if (i >= words.length) {
        clearInterval(interval);
      }
    }, 400); // 400ms per word

    return () => clearInterval(interval);
  }, [greeting]);

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

  const getThemeColors = () => {
    switch(appMode) {
      case 'heart': return { 
        btn: 'bg-rose-400 hover:bg-rose-500 shadow-rose-200', 
        text: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500',
        subtext: 'text-rose-700/80'
      };
      case 'sparkle': return { 
        btn: 'bg-teal-400 hover:bg-teal-500 shadow-teal-200', 
        text: 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500',
        subtext: 'text-teal-800/80'
      };
      case 'dream': return { 
        btn: 'bg-violet-400 hover:bg-violet-500 shadow-violet-200', 
        text: 'text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600',
        subtext: 'text-violet-800/80'
      };
      case 'soul':
      default: return { 
        btn: 'bg-indigo-400 hover:bg-indigo-500 shadow-indigo-200', 
        text: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600',
        subtext: 'text-indigo-800/80'
      };
    }
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

  const theme = getThemeColors();

  const modes = [
    { id: 'soul', icon: '🌙', label: 'روحي' },
    { id: 'heart', icon: '💖', label: 'قلبي' },
    { id: 'sparkle', icon: '✨', label: 'بريقي' },
    { id: 'dream', icon: '☁️', label: 'حلمي' }
  ];

  const getSubtitle = () => {
    switch (appMode) {
      case 'heart': return 'أنا هنا عشان أطبطب عليكي وأكون دايماً جنبك وقت ما تحتاجيني..';
      case 'sparkle': return 'جاهزة تكسري الدنيا النهاردة؟ يلا بينا نكتب قصة نجاح جديدة..';
      case 'dream': return 'خدي نفس عميق، وخلينا نسافر سوا لعالم مفيش فيه غير السحر والهدوء..';
      case 'soul':
      default: return 'عندي لك مفاجأة صغيرة، حاجة معمولة مخصوص علشانك..';
    }
  };

  const hasExistingMode = Boolean(appMode);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`flex flex-col items-center justify-center h-full flex-1 p-6 relative overflow-hidden transition-all duration-1000 ${appMode === 'dream' ? 'font-serif' : 'font-sans'}`}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${getBackgroundGradient()} -z-20 transition-colors duration-1000`} />
      
      {/* Ambient background layer */}
      <div className="absolute inset-0 -z-10">
        <FloatingParticles 
          type={appMode === 'heart' ? 'hearts' : appMode === 'sparkle' ? 'sparkles' : 'mixed'} 
          count={25} 
        />
      </div>

      {/* Cute Floating Pill Menu */}
      <div className="absolute top-6 z-50 flex gap-1.5 bg-white/40 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-white/60">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => setAppMode(mode.id as any)}
            className={`px-3 py-2 rounded-full text-sm font-bold transition-all duration-500 flex items-center gap-1.5 ${
              appMode === mode.id 
                ? 'bg-white shadow-md scale-105 text-slate-800' 
                : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'
            }`}
            dir="rtl"
          >
            <span className="text-lg">{mode.icon}</span>
            <AnimatePresence>
              {appMode === mode.id && (
                <motion.span 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  عائشة {mode.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      
      {/* Bear Entrance */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
        className="mt-12"
      >
        <TeddyBear state={appMode === 'heart' ? 'love' : appMode === 'dream' ? 'sleep' : 'idle'} />
      </motion.div>
      
      <div className="mt-8 text-center z-10 flex flex-col items-center">
        {/* Name Reveal */}
        <motion.h1 
          className={`text-3xl font-extrabold mb-4 h-10 transition-colors duration-700 ${theme.text}`}
          dir="rtl"
        >
          {displayedGreeting}
          {displayedGreeting.length < greeting.length && <span className="animate-pulse inline-block ml-1 text-slate-400">|</span>}
        </motion.h1>
        
        {/* Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p 
            key={appMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className={`mb-10 max-w-xs mx-auto leading-relaxed text-lg h-16 font-medium ${theme.subtext}`}
            dir="rtl"
          >
            {getSubtitle()}
          </motion.p>
        </AnimatePresence>
        
        {/* CTA Button */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ opacity: { delay: 2.2 }, scale: { delay: 2.2, type: 'spring', bounce: 0.4 } }}
          onClick={() => setScreen('permission')}
          className={`flex items-center gap-3 text-white px-10 py-4 rounded-full font-bold transition-all duration-500 text-lg cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 ${theme.btn}`}
          dir="rtl"
        >
          <Play size={20} fill="currentColor" />
          <span>يلا نبدأ</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
