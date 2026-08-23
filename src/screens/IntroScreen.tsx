import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSecretsStore } from '../store/useSecretsStore';
import { FloatingParticles } from '../components/FloatingParticles';

export const IntroScreen: React.FC = () => {
  const setScreen = useSecretsStore((state) => state.setScreen);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startIntro = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play().catch(() => {});
    }
    
    // Show the "Enter App" button after 12 seconds (near the end of the 15s song)
    setTimeout(() => {
      setShowButton(true);
    }, 12000);
  };

  const skipIntro = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setScreen('welcome');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full flex-1 p-6 relative overflow-hidden bg-rose-50"
    >
      <audio ref={audioRef} src="/intro-song.mp3" preload="auto" />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-100 to-pink-200 -z-20" />
      
      {/* Ambient background layer */}
      <div className="absolute inset-0 -z-10">
        <FloatingParticles type="mixed" count={30} />
      </div>

      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div 
            key="start-screen"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl drop-shadow-lg"
            >
              🎁
            </motion.div>
            
            <h2 className="text-2xl font-bold text-rose-800 text-center" dir="rtl">
              دبدوبك جايبلك هدية! 🧸
            </h2>
            
            <button
              onClick={startIntro}
              className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
              dir="rtl"
            >
              <span>افتحي الهدية</span>
              <span className="text-2xl">✨</span>
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="playing-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-sm w-full"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl mb-8 drop-shadow-xl"
            >
              🧸
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl font-bold text-rose-800 mb-6 leading-relaxed"
              dir="rtl"
            >
              أنا دبدوبك يا عائشة.. <br/>
              شايلك جوايا حكاية 💖
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 2 }}
              className="text-lg text-rose-700 font-medium mb-12 leading-relaxed"
              dir="rtl"
            >
              كل ما تضغطي زرار، <br/>
              تلاقي قلبي معاكي في المشوار...
            </motion.p>

            <AnimatePresence>
              {showButton && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={skipIntro}
                  className="px-10 py-4 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full font-bold text-xl shadow-xl shadow-rose-300/50 transition-all flex items-center gap-3 animate-bounce"
                  dir="rtl"
                >
                  <span>يلا بينا!</span>
                  <span className="text-2xl">🧸💖</span>
                </motion.button>
              )}
            </AnimatePresence>
            
            {/* Skip button before the end */}
            {!showButton && (
              <button
                onClick={skipIntro}
                className="absolute bottom-10 px-6 py-2 bg-white/40 hover:bg-white/70 text-rose-600 rounded-full text-sm font-bold shadow-sm backdrop-blur-sm transition-all"
              >
                تخطي الأغنية 🐾
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
