import React from 'react';
import { Locale } from '../types';
import heroBg from '../assets/background.jpg';

export interface HeroHeaderProps {
  lang?: 'zh' | 'en';
  locale?: Locale;
  activePageTitle?: string;
  compact?: boolean;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  lang,
  locale,
  activePageTitle,
  compact = true
}) => {
  const isZh = lang ? lang === 'zh' : locale !== 'en';

  return (
    <section 
      className="relative w-full overflow-hidden text-white flex flex-col justify-center items-center select-none"
      style={{
        backgroundColor: '#02081a',
        backgroundImage: `radial-gradient(ellipse at 75% 20%, rgba(30, 110, 220, 0.22) 0%, transparent 55%), linear-gradient(180deg, rgba(2, 8, 26, 0.55) 0%, rgba(2, 8, 26, 0.35) 45%, rgba(2, 8, 26, 0.9) 100%), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: compact ? '220px' : '320px',
        padding: compact ? '24px 36px' : '40px 36px'
      }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* 3-Column Conference Lockup Row */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 sm:gap-8 md:gap-8 lg:gap-10">
          
          {/* Left Column: 2026 GLOSIM Key Art */}
          <div className="flex flex-col items-center md:items-start shrink-0 text-center md:text-left justify-center select-none">
            <span 
              className={`font-black tracking-tight leading-none text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] ${compact ? 'text-5xl sm:text-6xl md:text-7xl lg:text-[76px]' : 'text-6xl sm:text-7xl md:text-8xl lg:text-[96px]'}`}
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 55%, #CBD5E1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              2026
            </span>
            <span className={`font-black tracking-[0.24em] leading-none text-white/95 mt-1.5 drop-shadow-md ${compact ? 'text-xl sm:text-2xl md:text-[28px]' : 'text-2xl sm:text-3xl md:text-4xl'}`}>
              GLOSIM
            </span>
          </div>

          {/* Center Divider Line (Desktop only) */}
          <div className="hidden md:block w-px bg-gradient-to-b from-white/10 via-white/50 to-white/10 shrink-0 self-stretch my-1" />

          {/* Center Column: Titles & Active Subpage Indicator */}
          <div className="flex-1 w-full flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              {isZh ? (
                <>
                  <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                    <h1 className={`font-black tracking-[0.08em] text-white leading-tight drop-shadow-md ${compact ? 'text-2xl sm:text-3xl md:text-[36px]' : 'text-3xl sm:text-4xl md:text-[46px]'}`}>
                      世界仿真大会
                    </h1>
                    {activePageTitle && (
                      <span className="bg-[#38bdf8]/20 border border-[#38bdf8]/50 text-[#38bdf8] text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md">
                        {activePageTitle}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-[0.06em] uppercase text-slate-200 mt-1.5 not-italic">
                    GLOBAL SIMULATION CONFERENCE
                  </h2>
                  
                  <p className="text-xs sm:text-sm font-medium text-[#38bdf8] mt-1.5 drop-shadow">
                    AI驱动的全球仿真创新与协同治理
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                    <h1 className={`font-black tracking-[0.04em] uppercase text-white leading-tight drop-shadow-md not-italic ${compact ? 'text-xl sm:text-2xl md:text-[30px]' : 'text-2xl sm:text-3xl md:text-[38px]'}`}>
                      GLOBAL SIMULATION CONFERENCE
                    </h1>
                    {activePageTitle && (
                      <span className="bg-[#38bdf8]/20 border border-[#38bdf8]/50 text-[#38bdf8] text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md">
                        {activePageTitle}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-[0.06em] text-slate-200 mt-1.5">
                    世界仿真大会
                  </h2>
                  
                  <p className="text-xs sm:text-sm font-medium text-[#38bdf8] mt-1.5 drop-shadow">
                    AI-Driven Global Simulation Innovation & Collaborative Governance
                  </p>
                </>
              )}
            </div>

            {/* Right Column: Anchored Date & Location to Far Right */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right shrink-0 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-6">
              <div className="text-lg sm:text-xl md:text-[22px] font-extrabold text-white tracking-tight drop-shadow whitespace-nowrap">
                {isZh ? '2026.11.13–16' : 'Nov 13–16, 2026'}
              </div>
              <div className="text-xs sm:text-sm md:text-[14px] font-semibold text-[#38bdf8] tracking-wide mt-1 whitespace-nowrap">
                {isZh ? '中国 · 杭州' : 'Hangzhou, China'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
