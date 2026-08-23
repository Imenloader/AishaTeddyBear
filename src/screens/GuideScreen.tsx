import { motion } from 'motion/react';
import { useSecretsStore } from '../store/useSecretsStore';

export const GuideScreen = () => {
  const appMode = useSecretsStore(state => state.appMode);
  
  const getThemeColors = () => {
    switch(appMode) {
      case 'heart': return 'bg-rose-50 text-rose-800';
      case 'sparkle': return 'bg-teal-50 text-teal-800';
      case 'dream': return 'bg-violet-50 text-violet-800';
      case 'soul':
      default: return 'bg-indigo-50 text-indigo-800';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className={`flex flex-col h-full w-full overflow-y-auto pb-24 ${getThemeColors()}`}
    >
      <div className="p-6 relative">
        <button 
          onClick={() => useSecretsStore.getState().setScreen('experience')}
          className="absolute top-2 left-6 px-4 py-2 bg-white/70 hover:bg-white backdrop-blur-sm text-slate-600 rounded-full text-sm font-bold shadow-sm border border-white/60 transition-all z-50 flex items-center gap-2"
        >
          رجوع <span>↩</span>
        </button>

        <h1 className="text-3xl font-extrabold mb-8 text-center mt-12 drop-shadow-sm" dir="rtl">
          📖 دليل الدبدوب السحري
        </h1>
        
        <div className="space-y-6" dir="rtl">
          
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>🧸</span> إيه هو الدبدوب؟
            </h2>
            <p className="opacity-90 leading-relaxed font-medium">
              الدبدوب ده مش مجرد أبلكيشن، ده أنا، خطيبك اللي بيحبك وبيخاف عليكي. صممته مخصوص عشان يكون دايماً جنبك يطبطب عليكي ويفكرك بربنا وبيا.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>💍</span> العداد السحري
            </h2>
            <p className="opacity-90 leading-relaxed font-medium">
              العداد اللي فوق ده بيحسب الأيام والشهور والساعات لحد اليوم اللي هقول فيه "قبلت". لحد يوم ٨ فبراير ٢٠٢٨، اليوم اللي هنبني فيه بيتنا في طاعة ربنا.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>📿</span> جلسة التسبيح
            </h2>
            <p className="opacity-90 leading-relaxed font-medium">
              لما تحسي بضغط أو توتر، اضغطي على زرار السبحة. الدبدوب هيتنفس معاكي بهدوء، وهيفكرك بذكر الله عشان قلبك يطمن.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>🫙</span> برطمان الحب
            </h2>
            <p className="opacity-90 leading-relaxed font-medium">
              كل ما تحسي إنك محتاجة كلمة حلوة، افتحي البرطمان، هتلاقيني كاتبلك سبب من ملايين الأسباب اللي مخليني بحبك وبحترمك.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>📖</span> حارس النوم
            </h2>
            <p className="opacity-90 leading-relaxed font-medium">
              قبل ما تنامي، شغلي حارس النوم. الشاشة هتضلم عشان عينيكي، وهنقرأ مع بعض آية الكرسي والمعوذات عشان الملايكة تحرسك.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>🤲</span> زرار الطوارئ
            </h2>
            <p className="opacity-90 leading-relaxed font-medium">
              لو في يوم زعلتي أوي أو حسيتي بوجع، اضغطي على زرار الإيدين. هبعتلك دعوة من قلبي لقلبك فوراً تطبطب عليكي.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/50 mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>💌</span> رسالة الجمعة
            </h2>
            <p className="opacity-90 leading-relaxed font-medium">
              دلوقتي تقدري تفتحي جواب الجمعة في أي وقت من زرار الجواب (💌). هتلاقي رسالة خاصة ومختلفة تماماً بتفكرك بقد إيه أنا بحبك وبدعي ربنا يجمعنا على خير.
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};
