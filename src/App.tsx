/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { useSecretsStore, ScreenState } from './store/useSecretsStore';
import { IntroScreen } from './screens/IntroScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PermissionScreen } from './screens/PermissionScreen';
import { ExperienceScreen } from './screens/ExperienceScreen';
import { FinaleScreen } from './screens/FinaleScreen';
import { GuideScreen } from './screens/GuideScreen';
import { useEffect, useState } from 'react';

export default function App() {
  const currentScreen = useSecretsStore(state => state.currentScreen);
  const isFinaleTriggered = useSecretsStore(state => state.isFinaleTriggered);
  const setScreen = useSecretsStore(state => state.setScreen);
  const appMode = useSecretsStore(state => state.appMode);

  useEffect(() => {
    if (isFinaleTriggered && currentScreen === 'welcome') {
      setScreen('finale');
    }
  }, [isFinaleTriggered, currentScreen, setScreen]);

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const showBottomNav = currentScreen === 'experience' || currentScreen === 'guide';

  const NavButton = ({ screen, icon, label }: { screen: ScreenState | 'welcome', icon: string, label: string }) => {
    const isActive = currentScreen === screen;
    const isWelcome = screen === 'welcome';
    return (
      <button 
        onClick={() => {
          setScreen(screen as ScreenState);
          setIsNavExpanded(false); // Close menu on select
        }}
        className={`flex items-center gap-3 px-4 py-3 w-full rounded-2xl transition-all ${isActive ? 'bg-rose-100 text-rose-700 font-extrabold' : 'hover:bg-rose-50 text-slate-600 font-bold'}`}
        title={label}
      >
        <span className="text-2xl">{icon}</span>
        <span className="text-sm">{label}</span>
      </button>
    );
  };

  return (
    <div className="w-full min-h-[100dvh] bg-rose-100 font-tajawal selection:bg-rose-200 flex items-center justify-center md:py-8">
      <div className="w-full h-[100dvh] md:h-full md:max-w-[400px] md:max-h-[850px] md:rounded-[40px] md:shadow-2xl md:border-[8px] md:border-white relative overflow-hidden bg-rose-50 flex flex-col">
        <AnimatePresence mode="wait">
          {currentScreen === 'intro' && <IntroScreen key="intro" />}
          {currentScreen === 'welcome' && <WelcomeScreen key="welcome" />}
          {currentScreen === 'permission' && <PermissionScreen key="permission" />}
          {currentScreen === 'experience' && <ExperienceScreen key="experience" />}
          {currentScreen === 'guide' && <GuideScreen key="guide" />}
          {currentScreen === 'finale' && <FinaleScreen key="finale" />}
        </AnimatePresence>

        {/* Top Right Menu */}
        <AnimatePresence>
          {showBottomNav && (
            <div className="absolute top-4 right-4 z-50 flex flex-col items-end" dir="rtl">
              {/* Menu Toggle Button */}
              <button
                onClick={() => setIsNavExpanded(!isNavExpanded)}
                className="bg-white/70 backdrop-blur-md shadow-sm border border-white/50 w-12 h-12 rounded-2xl flex items-center justify-center text-xl text-rose-500 hover:bg-white hover:scale-105 transition-all"
                title="القائمة"
              >
                {isNavExpanded ? '✖' : '☰'}
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isNavExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10, transformOrigin: 'top right' }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                    className="mt-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-3 flex flex-col gap-2"
                  >
                    <NavButton screen="experience" icon="🧸" label="الرئيسية" />
                    <NavButton screen="guide" icon="📖" label="الدليل" />
                    <NavButton screen="welcome" icon="✨" label="المزاج" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
