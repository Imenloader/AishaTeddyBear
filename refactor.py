import re

file_path = "src/screens/ExperienceScreen.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add imports
import_repl = "import { OPEN_WHEN_LETTERS, OpenWhenLetter } from '../data/openWhen';\nimport { getDailyQuestion } from '../data/dailyContent';"
content = content.replace("import { getDailyMessage } from '../data/dailyContent';", "import { getDailyMessage } from '../data/dailyContent';\n" + import_repl)

# 2. Add states for Open When and Question of the Day
state_insertion = """
  const [isOpenWhenMenuOpen, setIsOpenWhenMenuOpen] = useState(false);
  const [selectedOpenWhen, setSelectedOpenWhen] = useState<OpenWhenLetter | null>(null);
  const [dailyQuestion] = useState(() => getDailyQuestion());
  const [showDailyMsg, setShowDailyMsg] = useState(true); // Toggle between msg and question
  const [showPrayedSent, setShowPrayedSent] = useState(false);
"""
content = content.replace("const [showThoughtSent, setShowThoughtSent] = useState(false);", "const [showThoughtSent, setShowThoughtSent] = useState(false);\n" + state_insertion)

# 3. Add sendPrayedForYou function
func_insertion = """
  const sendPrayedForYou = async () => {
    try {
      setShowPrayedSent(true);
      await fetch(`https://ntfy.sh/aisha_teddy_love_secret_2026?title=${encodeURIComponent('دعيتلك يا دبدوب 🤲')}&message=${encodeURIComponent('عائشة لسه مخلصة صلاة ودعتلك دلوقتي حالاً! ❤️')}&tags=pray,sparkles`, {
        method: 'POST'
      });
      setTimeout(() => setShowPrayedSent(false), 5000);
    } catch (e) {
      console.error(e);
      setTimeout(() => setShowPrayedSent(false), 5000);
    }
  };
  
  const sendOpenWhenNotification = async (topic: string, title: string) => {
    try {
      await fetch(`https://ntfy.sh/aisha_teddy_love_secret_2026?title=${encodeURIComponent('رسالة: ' + title)}&message=${encodeURIComponent('عائشة فتحت جواب: ' + title + ' 💌')}&tags=envelope`, {
        method: 'POST'
      });
    } catch (e) {
      console.error(e);
    }
  };
"""
content = content.replace("const sendThought = async () => {", func_insertion + "\n  const sendThought = async () => {")

# 4. Redesign dashboard layout
# We want to replace the entire `key="dashboard"` block.
dashboard_regex = re.compile(r'(\<motion\.div\s*key="dashboard".*?className="w-full px-4 mb-4 z-20 flex flex-col gap-4"\s*\>)(.*?)(\<\/motion\.div\>)', re.DOTALL)

new_dashboard = """
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full px-4 mb-4 z-20 flex flex-col gap-4"
          >
            {/* Daily Connection (Thought & Prayed) */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendThought}
                disabled={showThoughtSent}
                className={`py-3 rounded-2xl shadow-sm font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                  showThoughtSent 
                    ? 'bg-rose-50 text-rose-500 border border-rose-200'
                    : 'bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white border border-white/50'
                }`}
              >
                <span className="text-2xl">{showThoughtSent ? '🥰' : '💭'}</span>
                <span className="text-xs">{showThoughtSent ? 'وصلتله وفرح!' : 'فكرت فيك دلوقتي'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendPrayedForYou}
                disabled={showPrayedSent}
                className={`py-3 rounded-2xl shadow-sm font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                  showPrayedSent 
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white border border-white/50'
                }`}
              >
                <span className="text-2xl">{showPrayedSent ? '🤍' : '🤲'}</span>
                <span className="text-xs">{showPrayedSent ? 'دعوتك وصلتله!' : 'دعيتلك النهاردة'}</span>
              </motion.button>
            </div>

            {/* Daily Message & Question Card */}
            <AnimatePresence mode="wait">
              {isPanicMode ? (
                <motion.div 
                  key="panic"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-rose-100 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-rose-300 text-center relative overflow-hidden" 
                  dir="rtl"
                >
                  <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
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
                  key="daily-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50 text-center relative ${showDailyMsg ? (dailyMsg.type === 'friday_letter' ? 'bg-rose-50' : 'bg-white/80') : 'bg-indigo-50/80'}`} 
                  dir="rtl"
                >
                  {/* Toggle Button */}
                  <button 
                    onClick={() => setShowDailyMsg(!showDailyMsg)}
                    className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-white/50 rounded-full hover:bg-white transition-colors text-lg shadow-sm"
                    title="تغيير البطاقة"
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

            {/* Horizontal Feature Drawer */}
            <div className="flex gap-3 overflow-x-auto pb-2 pt-1 px-1 snap-x hide-scrollbar" dir="rtl">
               <button onClick={() => setIsOpenWhenMenuOpen(true)} className="flex-none snap-center flex flex-col items-center justify-center bg-white/80 backdrop-blur-md w-20 h-20 rounded-2xl shadow-sm border border-white/50 hover:bg-white transition-all hover:-translate-y-1">
                 <span className="text-2xl mb-1">📬</span>
                 <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">جوابات<br/>افتحيها لما</span>
               </button>
               <button onClick={openLoveJar} className="flex-none snap-center flex flex-col items-center justify-center bg-white/80 backdrop-blur-md w-20 h-20 rounded-2xl shadow-sm border border-white/50 hover:bg-white transition-all hover:-translate-y-1">
                 <span className="text-2xl mb-1">🫙</span>
                 <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">برطمان<br/>الحب</span>
               </button>
               <button onClick={() => setIsDhikrMode(true)} className="flex-none snap-center flex flex-col items-center justify-center bg-white/80 backdrop-blur-md w-20 h-20 rounded-2xl shadow-sm border border-white/50 hover:bg-white transition-all hover:-translate-y-1">
                 <span className="text-2xl mb-1">📿</span>
                 <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">جلسة<br/>تسبيح</span>
               </button>
               <button onClick={triggerSleepGuardian} className="flex-none snap-center flex flex-col items-center justify-center bg-slate-800/80 backdrop-blur-md w-20 h-20 rounded-2xl shadow-sm border border-slate-700 hover:bg-slate-900 transition-all hover:-translate-y-1">
                 <span className="text-2xl mb-1">📖</span>
                 <span className="text-[10px] font-bold text-slate-300 text-center leading-tight">حارس<br/>النوم</span>
               </button>
               <button onClick={openFridayLetter} className="flex-none snap-center flex flex-col items-center justify-center bg-white/80 backdrop-blur-md w-20 h-20 rounded-2xl shadow-sm border border-white/50 hover:bg-white transition-all hover:-translate-y-1">
                 <span className="text-2xl mb-1">💌</span>
                 <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">رسالة<br/>الجمعة</span>
               </button>
               <button onClick={triggerPanic} className="flex-none snap-center flex flex-col items-center justify-center bg-rose-50/90 backdrop-blur-md w-20 h-20 rounded-2xl shadow-sm border border-rose-200 hover:bg-rose-100 transition-all hover:-translate-y-1">
                 <span className="text-2xl mb-1 animate-pulse">🚨</span>
                 <span className="text-[10px] font-bold text-rose-600 text-center leading-tight">رسالة<br/>طوارئ</span>
               </button>
            </div>
          </motion.div>
"""
content = dashboard_regex.sub(new_dashboard, content)

# 5. Add Open When Modals (Menu & Letter)
# Find the end of `</AnimatePresence>` before `{/* Countdown to Halal */}`
insertion_point = content.find("{/* Countdown to Halal */}")
modals = """
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
                اقفلي الجواب (رجوع ↩)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

"""
content = content[:insertion_point] + modals + content[insertion_point:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
