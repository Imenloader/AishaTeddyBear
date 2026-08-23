import { useEffect, useRef, useState } from 'react';
import { useGestureRecognizer } from '../lib/useGestureRecognizer';
import { GestureType } from '../types';

interface CameraFeedProps {
  onGesture: (gesture: GestureType) => void;
  isActive: boolean;
}

export const CameraFeed = ({ onGesture, isActive }: CameraFeedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const { isReady, error } = useGestureRecognizer({
    videoRef,
    onGestureDetected: onGesture,
    isActive: isActive && hasPermission === true
  });

  const requestCamera = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setHasPermission(false);
      return;
    }

    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: "user", 
        width: { ideal: 640 }, 
        height: { ideal: 480 } 
      } 
    })
      .then((s) => {
        setStream(s);
        setHasPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
        setHasPermission(false);
      });
  };

  useEffect(() => {
    if (isActive && !stream && hasPermission === null) {
      requestCamera();
    }
  }, [isActive, stream, hasPermission]);
  
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [stream]);

  if (hasPermission === false) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 text-center text-slate-700 shadow-lg border border-rose-100 w-full max-w-md mx-auto">
        <p className="text-sm font-medium text-slate-800 mb-2">تعذر تشغيل الكاميرا في هذا المتصفح</p>
        <p className="text-xs text-slate-500 mb-4">لا تقلقي! يمكنكِ التفاعل مباشرة بالضغط على الحركات التالية أو تجربة تفعيل الكاميرا:</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button 
            type="button"
            onClick={() => onGesture('Open_Palm')} 
            className="flex flex-col items-center gap-1 p-2 bg-rose-50 hover:bg-rose-100 rounded-2xl text-xs font-medium text-rose-800 transition-all border border-rose-100 active:scale-95"
          >
            <span className="text-xl">👋</span>
            <span>تلويح</span>
          </button>
          <button 
            type="button"
            onClick={() => onGesture('Thumb_Up')} 
            className="flex flex-col items-center gap-1 p-2 bg-rose-50 hover:bg-rose-100 rounded-2xl text-xs font-medium text-rose-800 transition-all border border-rose-100 active:scale-95"
          >
            <span className="text-xl">👍</span>
            <span>إعجاب</span>
          </button>
          <button 
            type="button"
            onClick={() => onGesture('Pointing_Up')} 
            className="flex flex-col items-center gap-1 p-2 bg-rose-50 hover:bg-rose-100 rounded-2xl text-xs font-medium text-rose-800 transition-all border border-rose-100 active:scale-95"
          >
            <span className="text-xl">☝️</span>
            <span>إشارة</span>
          </button>
          <button 
            type="button"
            onClick={() => onGesture('Victory')} 
            className="flex flex-col items-center gap-1 p-2 bg-rose-50 hover:bg-rose-100 rounded-2xl text-xs font-medium text-rose-800 transition-all border border-rose-100 active:scale-95"
          >
            <span className="text-xl">✌️</span>
            <span>علامة V</span>
          </button>
          <button 
            type="button"
            onClick={() => onGesture('ILoveYou')} 
            className="flex flex-col items-center gap-1 p-2 bg-rose-50 hover:bg-rose-100 rounded-2xl text-xs font-medium text-rose-800 transition-all border border-rose-100 active:scale-95"
          >
            <span className="text-xl">🤟</span>
            <span>بحبك</span>
          </button>
          <button 
            type="button"
            onClick={() => onGesture('Closed_Fist')} 
            className="flex flex-col items-center gap-1 p-2 bg-rose-50 hover:bg-rose-100 rounded-2xl text-xs font-medium text-rose-800 transition-all border border-rose-100 active:scale-95"
          >
            <span className="text-xl">✊</span>
            <span>خجل</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setHasPermission(null);
            requestCamera();
          }}
          className="text-xs text-rose-600 hover:text-rose-700 underline font-medium"
        >
          إعادة محاولة طلب إذن الكاميرا
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-slate-200 shrink-0 mx-auto">
      <video 
        ref={videoRef}
        autoPlay 
        playsInline 
        muted 
        className="w-full h-full object-cover scale-x-[-1]"
      />
      
      {!isReady && hasPermission && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-rose-100/90 text-xs text-rose-800 text-center p-2">
          {error}
        </div>
      )}
    </div>
  );
};
