const fs = require('fs');
let code = fs.readFileSync('src/screens/ExperienceScreen.tsx', 'utf8');

const start = code.indexOf('{/* Constellations (Hidden in Dhikr & Sleep Mode) */}');
const end = code.indexOf('{/* Teddy Bear Container */}');

const newConstellation = {/* Constellations (Hidden in Dhikr & Sleep Mode) */}
      {!isDhikrMode && !isSleepGuardian && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-0 opacity-80 mt-12 transition-all duration-1000 ease-in-out">
          <div className="relative w-48 h-24">
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {STAR_POINTS.map((p, i) => {
                if (i === 0) return null;
                const prev = STAR_POINTS[i - 1];
                const modeUnlockedCount = SECRETS.filter((s: any) => discoveredSecrets.includes(s.id)).length;
                const visualCount = modeUnlockedCount % 7 === 0 && modeUnlockedCount > 0 && isFinaleTriggered ? 7 : modeUnlockedCount % 7;
                
                const bothDiscovered = i < visualCount && (i - 1) < visualCount;
                return (
                  <line 
                    key={\line-\\}
                    x1={prev.x} y1={prev.y} x2={p.x} y2={p.y}
                    stroke={bothDiscovered ? '#f43f5e' : '#cbd5e1'}
                    strokeWidth={bothDiscovered ? 2 : 1}
                    className="transition-colors duration-1000"
                  />
                );
              })}
            </svg>
            {STAR_POINTS.map((p, i) => {
              const modeUnlockedCount = SECRETS.filter((s: any) => discoveredSecrets.includes(s.id)).length;
              const visualCount = modeUnlockedCount % 7 === 0 && modeUnlockedCount > 0 && isFinaleTriggered ? 7 : modeUnlockedCount % 7;
              
              const isDiscovered = i < visualCount || (i === 6 && isFinaleTriggered && modeUnlockedCount % 7 === 0);
              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: isDiscovered ? 1 : 0.3,
                    scale: isDiscovered ? 1.3 : 1
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-[1rem]"
                  style={{ left: \\%\, top: \\%\ }}
                >
                  ??
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      ;

code = code.substring(0, start) + newConstellation + code.substring(end);
fs.writeFileSync('src/screens/ExperienceScreen.tsx', code);
console.log('Fixed!');
