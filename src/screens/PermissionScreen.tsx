import { motion } from 'motion/react';
import { useSecretsStore } from '../store/useSecretsStore';
import { Camera, ArrowLeft, Hand } from 'lucide-react';
import { TeddyBear } from '../components/TeddyBear';
import { FloatingParticles } from '../components/FloatingParticles';

export const PermissionScreen = () => {
  const setScreen = useSecretsStore(state => state.setScreen);
  const setHasSkippedCamera = useSecretsStore(state => state.setHasSkippedCamera);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center h-full flex-1 w-full p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100 via-rose-50 to-white -z-10" />
      
      <FloatingParticles type="sparkles" count={15} />

      <motion.div variants={itemVariants} className="z-10">
        <TeddyBear state="shy" />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-8 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-slate-200/50 max-w-sm w-full text-center border border-white/50 z-10"
      >
        <motion.div variants={itemVariants} className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
          <Camera size={24} />
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-xl font-bold text-slate-800 mb-2">عشان تشوفي المفاجأة</motion.h2>
        <motion.p variants={itemVariants} className="text-slate-600 mb-6 text-sm leading-relaxed">
          الدبدوب محتاج يشوفك عشان يتفاعل معاكي بحركات إيدك. الصور مابتتسجلش ولا بتتبعت لأي مكان، كل حاجة بتحصل على موبايلك بس.
        </motion.p>
        
        <div className="flex flex-col gap-3">
          <motion.button 
            variants={itemVariants}
            onClick={() => {
              setHasSkippedCamera(false);
              setScreen('experience');
            }}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white px-6 py-4 rounded-xl font-medium transition-all shadow-md active:scale-95"
          >
            موافقة، افتح الكاميرا
          </motion.button>
          
          <motion.button 
            variants={itemVariants}
            onClick={() => {
              setHasSkippedCamera(true);
              setScreen('experience');
            }}
            className="w-full flex items-center justify-center gap-2 bg-transparent text-rose-500 border border-rose-300 hover:bg-rose-50 px-6 py-4 rounded-xl font-medium transition-all active:scale-95"
          >
            <Hand size={18} />
            <span>تخطي الكاميرا واللعب بالضغط</span>
          </motion.button>
        </div>
        
        <motion.button 
          variants={itemVariants}
          onClick={() => setScreen('welcome')}
          className="mt-4 w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 px-6 py-2 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          <span>رجوع</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
