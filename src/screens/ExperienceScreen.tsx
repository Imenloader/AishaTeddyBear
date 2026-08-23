import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSecretsStore } from '../store/useSecretsStore';
import { getSecrets } from '../data/secrets';
import { getDailyMessage, FRIDAY_LETTERS, getDailyQuestion } from '../data/dailyContent';
import { OPEN_WHEN_LETTERS, OpenWhenLetter } from '../data/openWhen';
import { LOVE_REASONS, EMERGENCY_DUAAS } from '../data/loveJar';
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
  const [secretSetIndex] = useState(() => Math.floor(Math.random() * 100));
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
      
      // Use the session's random set index to ensure we pull from a consistent 'set' of secrets
      let randomMsg = secret.variants[0];
      if (secret.variants.length > 0) {
        randomMsg = secret.variants[secretSetIndex % secret.variants.length];
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

  const [isLoveJarOpen, setIsLoveJarOpen] = useState(false);
  const [currentLoveReason, setCurrentLoveReason] = useState("");
  
  const [isSleepGuardian, setIsSleepGuardian] = useState(false);
  const [sleepGuardianStep, setSleepGuardianStep] = useState(0);
  
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [panicDuaa, setPanicDuaa] = useState("");

  const [isFridayLetterOpen, setIsFridayLetterOpen] = useState(false);
  const [fridayLetterContent, setFridayLetterContent] = useState("");

  const [showThoughtSent, setShowThoughtSent] = useState(false);

  const [isOpenWhenMenuOpen, setIsOpenWhenMenuOpen] = useState(false);
  const [selectedOpenWhen, setSelectedOpenWhen] = useState<OpenWhenLetter | null>(null);
  const [dailyQuestion] = useState(() => getDailyQuestion());
  const [showDailyMsg, setShowDailyMsg] = useState(true);
  const [showPrayedSent, setShowPrayedSent] = useState(false);
  const [liveMessage, setLiveMessage] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource('https://ntfy.sh/aisha_teddy_love_secret_2026_live/sse');
    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.event === 'message' && data.message) {
          setLiveMessage(data.message);
          setBearState('love');
        }
      } catch (err) {}
    };
    return () => eventSource.close();
  }, [setBearState]);


  const [countdown, setCountdown] = useState({ months: 0, days: 0, hours: 0 });

  useEffect(() => {
    // Countdown to Feb 8, 2028
    const targetDate = new Date('2028-02-08T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;
        
        setCountdown({ months, days: remainingDays, hours });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let dhikrInterval: NodeJS.Timeout;
    if (isDhikrMode) {
      dhikrInterval = setInterval(() => {
        setDhikrStep((prev) => (prev + 1) % dhikrWords.length);
      }, 4000); // Change word every 4 seconds (matches breathing scale)
    }
    return () => clearInterval(dhikrInterval);
  }, [isDhikrMode]);

  const openLoveJar = () => {
    setCurrentLoveReason(LOVE_REASONS[Math.floor(Math.random() * LOVE_REASONS.length)]);
    setIsLoveJarOpen(true);
  };

  const openFridayLetter = () => {
    setFridayLetterContent(FRIDAY_LETTERS[Math.floor(Math.random() * FRIDAY_LETTERS.length)]);
    setIsFridayLetterOpen(true);
  };

  
  const sendPrayedForYou = async () => {
    try {
      setShowPrayedSent(true);
      await fetch(`https://ntfy.sh/aisha_teddy_love_secret_2026?title=${encodeURIComponent('دعيتلك يا دبدوب 🤲')}&message=${encodeURIComponent('عائشة لسه مخلصة صلاة ودعتلك دلوقتي حالاً! ❤️')}&tags=pray,sparkles`, { method: 'POST' });
      setTimeout(() => setShowPrayedSent(false), 5000);
    } catch (e) {
      setTimeout(() => setShowPrayedSent(false), 5000);
    }
  };
  
  const sendOpenWhenNotification = async (topic: string, title: string) => {
    try {
      await fetch(`https://ntfy.sh/aisha_teddy_love_secret_2026?title=${encodeURIComponent('رسالة: ' + title)}&message=${encodeURIComponent('عائشة فتحت جواب: ' + title + ' 💌')}&tags=envelope`, { method: 'POST' });
    } catch (e) {}
  };

  const sendThought = async () => {
    // Make the bear blush and show confirmation
    setBearState('shy');
    setShowThoughtSent(true);
    
    try {
      // Send the silent push notification via ntfy.sh (using URL params avoids CORS preflights)
      const title = encodeURIComponent('رسالة من أميرة أحلامك 🎀');
      await fetch(`https://ntfy.sh/aisha_teddy_love_secret_2026?title=${title}&tags=heart,sparkles`, {
        method: 'POST',
        body: 'عائشة بتفكر فيك دلوقتي يا دبدوب! ❤️'
      });
    } catch (e) {
      console.error("Failed to send thought:", e);
    }
    
    setTimeout(() => {
      setShowThoughtSent(false);
      setBearState('idle');
    }, 4000);
  };

  const triggerPanic = () => {
    setPanicDuaa(EMERGENCY_DUAAS[Math.floor(Math.random() * EMERGENCY_DUAAS.length)]);
    setIsPanicMode(true);
    setBearState('love');
  };

  const closePanic = () => {
    setIsPanicMode(false);
    setBearState('idle');
  };

  const SLEEP_SURAHS = [
    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\nاللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\nقُلْ هُوَ اللَّهُ أَحَدٌ ﴿1﴾ اللَّهُ الصَّمَدُ ﴿2﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿3﴾ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ﴿4﴾",
    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿1﴾ مِن شَرِّ مَا خَلَقَ ﴿2﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿3﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿4﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿5﴾",
    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿1﴾ مَلِكِ النَّاسِ ﴿2﴾ إِلَٰهِ النَّاسِ ﴿3﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿4﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿5﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿6﴾",
    "قرأتهم؟ يلا نامي بقى، الملائكة هتحرسك وأنا هستودعك ربنا. تصبحي على خير يا روحي 💖"
  ];

  const triggerSleepGuardian = () => {
    setIsSleepGuardian(true);
    setSleepGuardianStep(0);
  };

  const nextSleepStep = () => {
    if (sleepGuardianStep < SLEEP_SURAHS.length - 1) {
      setSleepGuardianStep(prev => prev + 1);
    } else {
      setIsSleepGuardian(false);
    }
  };

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
      className="flex flex-col items-center h-full p-2 sm:p-4 pb-24 sm:pb-24 relative overflow-y-auto overflow-x-hidden flex-1 w-full"
    >
      <div className={`fixed inset-0 -z-20 transition-colors duration-1000 bg-gradient-to-br ${isSleepGuardian ? 'from-black via-slate-950 to-black' : getGradient(currentBearState)}`} />
      
      {!isDhikrMode && !isSleepGuardian && <FloatingParticles type={getParticleType(currentBearState) as any} count={20} />}

      {/* Sleep Guardian Overlay */}
      <AnimatePresence>
        {isSleepGuardian && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md overflow-y-auto"
            onClick={nextSleepStep}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setIsSleepGuardian(false); setBearState('idle'); }}
              className="absolute top-6 right-6 px-4 py-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-full text-sm font-bold transition-colors z-50 flex items-center gap-2"
            >
              رجوع <span>↩</span>
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={sleepGuardianStep}
              className="text-white text-center font-serif text-base sm:text-lg md:text-xl leading-loose max-w-lg mx-auto my-auto"
              dir="rtl"
            >
              <pre className="whitespace-pre-wrap font-serif leading-loose text-center text-indigo-100">
                {SLEEP_SURAHS[sleepGuardianStep]}
              </pre>
            </motion.div>
            
            {sleepGuardianStep < SLEEP_SURAHS.length - 1 && (
              <motion.div 
                animate={{ y: [0, 5, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 text-slate-400 text-sm"
              >
                اضغطي للتالي 👆
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Love Jar Modal */}
      <AnimatePresence>
        {isLoveJarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsLoveJarOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-pink-500" />
              <div className="text-4xl mb-4">🫙💌</div>
              <h3 className="font-bold text-slate-800 mb-4" dir="rtl">سبب من مليون سبب يخليني أحبك:</h3>
              <p className="text-rose-700 text-lg leading-relaxed font-medium" dir="rtl">{currentLoveReason}</p>
              <button 
                onClick={() => setIsLoveJarOpen(false)}
                className="mt-6 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors"
              >
                رجوع ↩
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Friday Letter Modal */}
      <AnimatePresence>
        {isFridayLetterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsFridayLetterOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-400 to-indigo-500" />
              <div className="text-4xl mb-4">💌</div>
              <h3 className="text-lg font-bold text-slate-800 mb-4" dir="rtl">رسالة الجمعة</h3>
              <p className="text-slate-600 leading-relaxed font-medium" dir="rtl">
                {fridayLetterContent}
              </p>
              <button 
                onClick={() => setIsFridayLetterOpen(false)}
                className="mt-6 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors"
              >
                رجوع ↩
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* Open When Menu Modal */}
      <AnimatePresence>
        {isOpenWhenMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsOpenWhenMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-rose-50 p-6 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-4xl mb-2">📬</div>
              <h3 className="text-xl font-bold text-slate-800 mb-6" dir="rtl">جوابات افتحيها لما...</h3>
              
              <div className="flex flex-col gap-3" dir="rtl">
                {OPEN_WHEN_LETTERS.map(letter => (
                  <button
                    key={letter.id}
                    onClick={() => {
                      setIsOpenWhenMenuOpen(false);
                      setSelectedOpenWhen(letter);
                      sendOpenWhenNotification(letter.notificationTopic || 'general', letter.title);
                    }}
                    className="flex items-center gap-4 w-full p-4 bg-white hover:bg-rose-100 rounded-2xl shadow-sm transition-colors border border-rose-100"
                  >
                    <span className="text-2xl">{letter.emoji}</span>
                    <span className="font-bold text-slate-700 text-right">{letter.title}</span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setIsOpenWhenMenuOpen(false)}
                className="mt-6 px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full text-sm font-bold transition-colors"
              >
                رجوع ↩
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Open When Letter Modal */}
      <AnimatePresence>
        {selectedOpenWhen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedOpenWhen(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-pink-500" />
              <div className="text-5xl mb-4">{selectedOpenWhen.emoji}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-4" dir="rtl">{selectedOpenWhen.title}</h3>
              <p className="text-slate-700 leading-relaxed font-medium text-lg" dir="rtl">
                {selectedOpenWhen.message}
              </p>
              <button 
                onClick={() => setSelectedOpenWhen(null)}
                className="mt-8 px-6 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-full text-sm font-bold transition-colors"
              >
                اقفلي الجواب ↩
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Message Modal */}
      <AnimatePresence>
        {liveMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setLiveMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse" />
              <div className="text-5xl mb-4 animate-bounce">💬</div>
              <h3 className="text-lg font-bold text-emerald-600 mb-4" dir="rtl">رسالة عاجلة من حبيبك دلوقتي!</h3>
              <p className="text-slate-700 leading-relaxed font-bold text-2xl" dir="rtl">
                {liveMessage}
              </p>
              <button 
                onClick={() => setLiveMessage(null)}
                className="mt-8 px-6 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full text-sm font-bold transition-colors"
              >
                رجوع ↩
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Countdown to Halal */}
      {!isDhikrMode && !isSleepGuardian && (
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/40 backdrop-blur-sm border border-white/50 px-6 py-2 rounded-full shadow-sm z-20 mt-2 mb-2 flex items-center gap-4"
          dir="rtl"
        >
          <span className="text-xl">💍</span>
          <div className="flex gap-2 sm:gap-4 text-center">
            <div><div className="font-bold text-slate-800">{countdown.months}</div><div className="text-[10px] text-slate-500">شهر</div></div>
            <div className="text-slate-300 font-light">|</div>
            <div><div className="font-bold text-slate-800">{countdown.days}</div><div className="text-[10px] text-slate-500">يوم</div></div>
            <div className="text-slate-300 font-light">|</div>
            <div><div className="font-bold text-slate-800">{countdown.hours}</div><div className="text-[10px] text-slate-500">ساعة</div></div>
          </div>
        </motion.div>
      )}

      {/* Constellations (Hidden in Dhikr & Sleep Mode) */}
      {!isDhikrMode && !isSleepGuardian && (
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
                💖
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
            className="w-full px-6 py-8 mb-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-3xl shadow-sm flex flex-col items-center justify-center z-20"
          >
            <motion.h2
              key={dhikrStep}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
              className="text-5xl font-extrabold text-indigo-900 text-center mb-6"
              dir="rtl"
            >
              {dhikrWords[dhikrStep]}
            </motion.h2>
            <p className="text-indigo-700/80 font-bold text-sm mt-2" dir="rtl">خدي نفس عميق مع الدبدوب...</p>
            <button
              onClick={() => setIsDhikrMode(false)}
              className="mt-8 px-8 py-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-bold border border-indigo-200 transition-colors pointer-events-auto"
            >
              رجوع ↩
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
            {/* Action Toolbar */}
            <div className="flex justify-center gap-3 w-full flex-wrap">
               <button
                 onClick={() => setIsOpenWhenMenuOpen(true)}
                 className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-md w-14 h-14 rounded-2xl shadow-sm border border-white/50 hover:bg-white transition-colors"
                 title="جوابات افتحيها لما"
               >
                 <span className="text-xl">📬</span>
               </button>

               <button
                 onClick={() => setIsDhikrMode(true)}
                 className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-md w-14 h-14 rounded-2xl shadow-sm border border-white/50 hover:bg-white transition-colors"
                 title="جلسة تسبيح"
               >
                 <span className="text-xl">📿</span>
               </button>
               <button
                 onClick={openLoveJar}
                 className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-md w-14 h-14 rounded-2xl shadow-sm border border-white/50 hover:bg-white transition-colors"
                 title="برطمان الحب"
               >
                 <span className="text-xl">🫙</span>
               </button>
               <button
                 onClick={triggerSleepGuardian}
                 className="flex flex-col items-center justify-center bg-slate-800/80 backdrop-blur-md w-14 h-14 rounded-2xl shadow-sm border border-slate-700 hover:bg-slate-900 transition-colors"
                 title="حارس النوم"
               >
                 <span className="text-xl">📖</span>
               </button>
               <button
                 onClick={openFridayLetter}
                 className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-md w-14 h-14 rounded-2xl shadow-sm border border-white/50 hover:bg-white transition-colors"
                 title="رسالة الجمعة"
               >
                 <span className="text-xl">💌</span>
               </button>
               <button
                 onClick={triggerPanic}
                 className="flex flex-col items-center justify-center bg-rose-50/80 backdrop-blur-md w-14 h-14 rounded-2xl shadow-sm border border-rose-200 hover:bg-rose-100 transition-colors relative overflow-hidden group"
                 title="محتاجة دعوة"
               >
                 <div className="absolute inset-0 bg-rose-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                 <span className="text-xl animate-pulse">🤲</span>
               </button>
            </div>

            
            {/* Connection Buttons */}
            <div className="flex gap-3 w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendThought}
                disabled={showThoughtSent}
                className={`flex-1 py-3 rounded-2xl shadow-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  showThoughtSent 
                    ? 'bg-white/80 text-rose-500 border border-rose-200'
                    : 'bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white border border-white/50'
                }`}
              >
                <span className="text-sm">{showThoughtSent ? 'فرح بيها!' : 'فكرت فيك'}</span>
                <span className="text-xl">{showThoughtSent ? '🥰' : '💭'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendPrayedForYou}
                disabled={showPrayedSent}
                className={`flex-1 py-3 rounded-2xl shadow-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  showPrayedSent 
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white border border-white/50'
                }`}
              >
                <span className="text-sm">{showPrayedSent ? 'وصلتله!' : 'دعيتلك'}</span>
                <span className="text-xl">{showPrayedSent ? '🤍' : '🤲'}</span>
              </motion.button>
            </div>


            {/* Daily Message Card */}
            <AnimatePresence mode="wait">
              {isPanicMode ? (
                <motion.div 
                  key="panic"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-rose-100 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-rose-300 text-center" 
                  dir="rtl"
                >
                  <h3 className="text-rose-800 font-bold mb-2">رسالة طوارئ من حبيبك 💌</h3>
                  <p className="text-rose-900 font-medium leading-relaxed">{panicDuaa}</p>
                  <button 
                    onClick={closePanic}
                    className="mt-4 px-6 py-2 bg-rose-200 hover:bg-rose-300 text-rose-800 rounded-full text-sm font-bold transition-colors"
                  >
                    رجوع ↩
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="daily"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`relative backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50 text-center ${dailyMsg.type === 'friday_letter' ? 'bg-rose-50' : 'bg-white/80'}`} 
                  dir="rtl"
                >
                  {/* Toggle Button */}
                  <button 
                    onClick={() => setShowDailyMsg(!showDailyMsg)}
                    className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-black/5 rounded-full hover:bg-black/10 transition-colors text-lg shadow-sm"
                  >
                    {showDailyMsg ? '🤔' : '💌'}
                  </button>
                  
                  {showDailyMsg ? (
                    <>
                      <h3 className="text-slate-800 font-bold mb-2 pr-8">{dailyMsg.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{dailyMsg.content}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-indigo-800 font-bold mb-2 pr-8">سؤال النهاردة 🤔</h3>
                      <p className="text-indigo-900 font-medium leading-relaxed">{dailyQuestion}</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
