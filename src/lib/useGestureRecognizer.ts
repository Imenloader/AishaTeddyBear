import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';
import { GestureType } from '../types';

interface UseGestureRecognizerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onGestureDetected: (gesture: GestureType) => void;
  isActive: boolean;
}

export const useGestureRecognizer = ({ videoRef, onGestureDetected, isActive }: UseGestureRecognizerProps) => {
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const requestRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef<number>(-1);
  const lastGestureRef = useRef<string>('None');
  const gestureStartTimeRef = useRef<number>(0);
  const cooldownEndTimeRef = useRef<number>(0);
  const noneFramesRef = useRef<number>(0);
  
  const GESTURE_HOLD_TIME = 500; // ms to hold a gesture
  const COOLDOWN_TIME = 1200; // ms cooldown after triggering
  const CONFIDENCE_THRESHOLD = 0.55;
  const FPS_THROTTLE = 1000 / 15; // ~15 fps (66ms)
  const lastFrameTimeRef = useRef<number>(0);
  
  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm"
        );
        
        if (!isMounted) return;

        let recognizer: GestureRecognizer;
        try {
          recognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numHands: 1,
          });
          console.log("GestureRecognizer initialized with GPU delegate");
        } catch (gpuError) {
          console.warn("Failed to initialize with GPU, falling back to CPU", gpuError);
          recognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
              delegate: "CPU",
            },
            runningMode: "VIDEO",
            numHands: 1,
          });
          console.log("GestureRecognizer initialized with CPU delegate");
        }
        
        if (!isMounted) {
          recognizer.close();
          return;
        }
        
        recognizerRef.current = recognizer;
        setIsReady(true);
      } catch (err) {
        console.error("Failed to init gesture recognizer", err);
        setError("فشل تحميل نظام التعرف على الحركات");
      }
    };
    
    init();
    
    return () => {
      isMounted = false;
      if (recognizerRef.current) {
        recognizerRef.current.close();
      }
    };
  }, []);

  const detectFrame = useCallback((now: number) => {
    if (!isActive || !recognizerRef.current || !videoRef.current || videoRef.current.readyState < 2) {
      requestRef.current = requestAnimationFrame(detectFrame);
      return;
    }

    if (now - lastFrameTimeRef.current < FPS_THROTTLE) {
      requestRef.current = requestAnimationFrame(detectFrame);
      return;
    }
    lastFrameTimeRef.current = now;

    const video = videoRef.current;
    
    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      
      try {
        const results = recognizerRef.current.recognizeForVideo(video, performance.now());
        
        if (results.gestures.length > 0) {
          const topGesture = results.gestures[0][0];
          
          if (topGesture && topGesture.score > CONFIDENCE_THRESHOLD) {
            const gestureName = topGesture.categoryName as GestureType;
            
            if (now < cooldownEndTimeRef.current) {
               // In cooldown
            } else if (gestureName !== 'None') {
              noneFramesRef.current = 0; // Reset tolerance
              
              if (gestureName === lastGestureRef.current) {
                const holdDuration = now - gestureStartTimeRef.current;
                
                if (holdDuration >= GESTURE_HOLD_TIME) {
                  onGestureDetected(gestureName);
                  cooldownEndTimeRef.current = now + COOLDOWN_TIME;
                  lastGestureRef.current = 'None'; 
                }
              } else {
                lastGestureRef.current = gestureName;
                gestureStartTimeRef.current = now;
              }
            } else {
              noneFramesRef.current += 1;
              if (noneFramesRef.current > 8) {
                lastGestureRef.current = 'None';
              }
            }
          } else {
             noneFramesRef.current += 1;
             if (noneFramesRef.current > 8) {
               lastGestureRef.current = 'None';
             }
          }
        } else {
          noneFramesRef.current += 1;
          if (noneFramesRef.current > 8) {
            lastGestureRef.current = 'None';
          }
        }
      } catch (e) {
        console.warn(e);
      }
    }
    
    requestRef.current = requestAnimationFrame(detectFrame);
  }, [isActive, onGestureDetected, videoRef]);

  useEffect(() => {
    if (isActive && isReady) {
      requestRef.current = requestAnimationFrame(detectFrame);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive, isReady, detectFrame]);

  return { isReady, error };
};
