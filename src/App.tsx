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
import { useEffect } from 'react';

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

  const showBottomNav = currentScreen === 'experience' || currentScreen === 'guide';

  const NavButton = ({ screen, icon, label }: { screen: ScreenState | 'welcome', icon: string, label: string }) => {
    const isActive = currentScreen === screen;
    const isWelcome = screen === 'welcome';
    return (
      <button 
        onClick={() => setScreen(screen as ScreenState)}
        className={`flex flex-col items-center justify-center w-20 transition-all ${isActive ? 'text-rose-600 scale-110' : 'text-slate-500 hover:text-rose-400'}`}
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
          {showBottomNav && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="absolute bottom-0 left-0 w-full h-20 bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex items-center justify-around px-4 z-50 rounded-t-3xl md:rounded-b-[32px] md:rounded-t-none"
              dir="rtl"
            >
              <NavButton screen="experience" icon="🧸" label="الرئيسية" />
              <NavButton screen="guide" icon="📖" label="الدليل" />
              <NavButton screen="welcome" icon="✨" label="المزاج" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
