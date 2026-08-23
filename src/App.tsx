/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { useSecretsStore, ScreenState } from './store/useSecretsStore';
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

  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const showBottomNav = currentScreen === 'experience' || currentScreen === 'guide';

  const NavButton = ({ screen, icon, label }: { screen: ScreenState | 'welcome', icon: string, label: string }) => {
    const isActive = currentScreen === screen;
    const isWelcome = screen === 'welcome';
    return (
      <button 
        onClick={() => setScreen(screen as ScreenState)}
        className={`flex flex-col items-center justify-center w-16 sm:w-20 transition-all ${isActive ? 'text-rose-600 scale-110' : 'text-slate-500 hover:text-rose-400'}`}
        title={label}
      >
        <span className="text-2xl mb-1">{icon}</span>
        <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="w-full min-h-[100dvh] bg-rose-100 font-tajawal selection:bg-rose-200 flex items-center justify-center md:py-8">
      <div className="w-full h-[100dvh] md:h-full md:max-w-[400px] md:max-h-[850px] md:rounded-[40px] md:shadow-2xl md:border-[8px] md:border-white relative overflow-hidden bg-rose-50 flex flex-col">
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && <WelcomeScreen key="welcome" />}
          {currentScreen === 'permission' && <PermissionScreen key="permission" />}
          {currentScreen === 'experience' && <ExperienceScreen key="experience" />}
          {currentScreen === 'guide' && <GuideScreen key="guide" />}
          {currentScreen === 'finale' && <FinaleScreen key="finale" />}
        </AnimatePresence>

        {/* Persistent Bottom Navigation */}
        <AnimatePresence>
          {showBottomNav && isNavExpanded && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center z-50 rounded-t-3xl md:rounded-b-[32px] md:rounded-t-none pb-4 pt-2"
              dir="rtl"
            >
              <button 
                onClick={() => setIsNavExpanded(false)}
                className="w-12 h-1.5 bg-slate-200 rounded-full mb-3 hover:bg-slate-300 transition-colors cursor-pointer"
                title="إخفاء القائمة"
              />
              <div className="flex items-center justify-around w-full px-4">
                <NavButton screen="experience" icon="🧸" label="الرئيسية" />
                <NavButton screen="guide" icon="📖" label="الدليل" />
                <NavButton screen="welcome" icon="✨" label="المزاج" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Expand Button when collapsed */}
        <AnimatePresence>
          {showBottomNav && !isNavExpanded && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute bottom-6 right-1/2 translate-x-1/2 z-50"
            >
              <button
                onClick={() => setIsNavExpanded(true)}
                className="bg-white/90 backdrop-blur-md shadow-xl border border-white/50 w-14 h-14 rounded-full flex items-center justify-center text-2xl hover:scale-105 transition-transform"
                title="إظهار القائمة"
              >
                🎀
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
