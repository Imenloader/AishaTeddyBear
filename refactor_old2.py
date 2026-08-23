import re

file_path = "src/screens/ExperienceScreen_old.tsx"
with open(file_path, "r", encoding="utf-16") as f:
    content = f.read()

# 1. Imports
import_repl = "import { OPEN_WHEN_LETTERS, OpenWhenLetter } from '../data/openWhen';\nimport { getDailyQuestion } from '../data/dailyContent';"
content = content.replace("import { getDailyMessage } from '../data/dailyContent';", "import { getDailyMessage } from '../data/dailyContent';\n" + import_repl)

# 2. State
state_insertion = """
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
"""
content = content.replace("const [showThoughtSent, setShowThoughtSent] = useState(false);", "const [showThoughtSent, setShowThoughtSent] = useState(false);\n" + state_insertion)

# 3. Functions
func_insertion = """
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
"""
content = content.replace("const sendThought = async () => {", func_insertion + "\n  const sendThought = async () => {")

# 4. Action Toolbar Additions
open_when_btn = """
               <button
                 onClick={() => setIsOpenWhenMenuOpen(true)}
                 className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-md w-14 h-14 rounded-2xl shadow-sm border border-white/50 hover:bg-white transition-colors"
                 title="جوابات افتحيها لما"
               >
                 <span className="text-xl">📬</span>
               </button>
"""
toolbar_div = '<div className="flex justify-center gap-3 w-full flex-wrap">'
content = content.replace(toolbar_div, toolbar_div + open_when_btn)


# 5. Connection Buttons (Thought & Prayed)
thought_btn_regex = re.compile(r'\{\/\* Thought of you Button \*\/\}.*?\<\/motion\.button\>', re.DOTALL)
connection_btns = """
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
"""
content = thought_btn_regex.sub(connection_btns, content)

# 6. Daily Card (Question Toggle)
daily_h3_p = """<h3 className="text-slate-800 font-bold mb-2">{dailyMsg.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{dailyMsg.content}</p>"""

daily_replacement = """{/* Toggle Button */}
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
                  )}"""

content = content.replace(daily_h3_p, daily_replacement)

# Make the daily card relative
content = content.replace("className={`backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50 text-center ${", "className={`relative backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50 text-center ${")

# 7. Modals
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
"""
insertion_point = content.find("{/* Countdown to Halal */}")
content = content[:insertion_point] + modals + "\n      " + content[insertion_point:]

with open("src/screens/ExperienceScreen.tsx", "w", encoding="utf-8") as f:
    f.write(content)
