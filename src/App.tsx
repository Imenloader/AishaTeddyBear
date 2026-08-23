/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence } from 'motion/react';
import { useSecretsStore } from './store/useSecretsStore';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PermissionScreen } from './screens/PermissionScreen';
import { ExperienceScreen } from './screens/ExperienceScreen';
import { FinaleScreen } from './screens/FinaleScreen';
import { useEffect } from 'react';

export default function App() {
  const currentScreen = useSecretsStore(state => state.currentScreen);
  const isFinaleTriggered = useSecretsStore(state => state.isFinaleTriggered);
  const setScreen = useSecretsStore(state => state.setScreen);

  useEffect(() => {
    if (isFinaleTriggered && currentScreen === 'welcome') {
      setScreen('finale');
    }
  }, [isFinaleTriggered, currentScreen, setScreen]);

  return (
    <div className="w-full min-h-[100dvh] bg-rose-100 font-tajawal selection:bg-rose-200 flex items-center justify-center md:py-8">
      <div className="w-full h-[100dvh] md:h-full md:max-w-[400px] md:max-h-[850px] md:rounded-[40px] md:shadow-2xl md:border-[8px] md:border-white relative overflow-hidden bg-rose-50 flex flex-col">
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && <WelcomeScreen key="welcome" />}
          {currentScreen === 'permission' && <PermissionScreen key="permission" />}
          {currentScreen === 'experience' && <ExperienceScreen key="experience" />}
          {currentScreen === 'finale' && <FinaleScreen key="finale" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
