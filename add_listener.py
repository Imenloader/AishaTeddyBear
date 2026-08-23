import re

file_path = "src/screens/ExperienceScreen.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add state for live message
state_insertion = """
  const [liveMessage, setLiveMessage] = useState<string | null>(null);

  useEffect(() => {
    // Listen for live messages from fiancé
    const eventSource = new EventSource('https://ntfy.sh/aisha_teddy_love_secret_2026_live/sse');
    
    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.event === 'message' && data.message) {
          setLiveMessage(data.message);
          setBearState('love');
        }
      } catch (err) {
        console.error('Error parsing live message', err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [setBearState]);
"""
content = content.replace("const [showPrayedSent, setShowPrayedSent] = useState(false);", "const [showPrayedSent, setShowPrayedSent] = useState(false);\n" + state_insertion)

# 2. Add Live Message UI Modal
# Find where the Selected Open When Letter Modal is, and append the Live Message Modal
live_message_modal = """
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
content = content.replace("{/* Countdown to Halal */}", live_message_modal + "\n      {/* Countdown to Halal */}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
