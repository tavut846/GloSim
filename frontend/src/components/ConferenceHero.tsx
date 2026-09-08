import React from 'react';
import { Locale } from '../types';
import heroBg from '../assets/background.jpg';


interface ConferenceHeroProps {
  lang?: 'zh' | 'en';
  locale?: Locale;
}

export function ConferenceHero({ lang, locale }: ConferenceHeroProps) {
  const isZh = lang ? lang === 'zh' : locale !== 'en';

  return (
    <section 
      className="relative w-full overflow-hidden text-white flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-16 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 select-none"
      style={{
        backgroundColor: '#02081a',
        backgroundImage: `radial-gradient(ellipse at 75% 20%, rgba(30, 110, 220, 0.22) 0%, transparent 55%), linear-gradient(180deg, rgba(2, 8, 26, 0.45) 0%, rgba(2, 8, 26, 0.25) 45%, rgba(2, 8, 26, 0.85) 100%), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        

        {/* Master Conference Title Lockup */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 sm:gap-8 md:gap-8 lg:gap-12">
          
          {/* Left Column: 2026 GLOSIM Key Art */}
          <div className="flex flex-col items-center md:items-start shrink-0 text-center md:text-left justify-center select-none">
            <span 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black tracking-tight leading-none text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 55%, #CBD5E1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              2026
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-[0.24em] leading-none text-white/95 mt-2 drop-shadow-md">
              GLOSIM
            </span>
          </div>

          {/* Center Divider (Desktop) */}
          <div className="hidden md:block w-[2px] bg-gradient-to-b from-white/20 via-white/80 to-white/20 shrink-0 self-stretch my-1 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" />

          {/* Right Column: Titles & Inline Metadata */}
          <div className="flex-1 w-full flex flex-col justify-center">
            {isZh ? (
              <>
                {/* Row 1: Chinese Title + Date */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-wider text-white leading-tight drop-shadow-md whitespace-nowrap">
                    世界仿真大会
                  </h1>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-white tracking-tight shrink-0 drop-shadow">
                    2026.11.13–16
                  </span>
                </div>

                {/* Row 2: Chinese Slogan + Location */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mt-1.5 sm:mt-2">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide text-cyan-300 drop-shadow">
                    AI驱动的全球仿真创新与协同治理
                  </p>
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white tracking-wide shrink-0">
                    中国 · 杭州
                  </span>
                </div>

                {/* Row 3: English Title + Date */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mt-4 sm:mt-5">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[32px] font-black italic tracking-wider text-white uppercase leading-tight drop-shadow-md whitespace-nowrap">
                    GLOBAL SIMULATION CONFERENCE
                  </h2>
                  <span className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-tight shrink-0">
                    2026.11.13–16
                  </span>
                </div>

                {/* Row 4: English Slogan + Location */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mt-1">
                  <div className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider text-slate-300/90 uppercase leading-snug max-w-xl">
                    <div>AI-DRIVEN GLOBAL SIMULATION INNOVATION &amp;</div>
                    <div>COLLABORATIVE GOVERNANCE</div>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-300 shrink-0">
                    China · Hangzhou
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* English Dominant */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black italic tracking-wider text-white uppercase leading-tight drop-shadow-md whitespace-nowrap">
                    GLOBAL SIMULATION CONFERENCE
                  </h1>
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight shrink-0 drop-shadow">
                    Nov 13–16, 2026
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mt-1.5 sm:mt-2">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-wide text-cyan-300 drop-shadow">
                    AI-Driven Global Simulation Innovation &amp; Collaborative Governance
                  </p>
                  <span className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide shrink-0">
                    Hangzhou, China
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mt-4 sm:mt-5">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-wider text-slate-100 leading-tight drop-shadow-md whitespace-nowrap">
                    世界仿真大会
                  </h2>
                  <span className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-tight shrink-0">
                    2026.11.13–16
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mt-1">
                  <p className="text-xs sm:text-sm md:text-base font-medium text-slate-300">
                    AI驱动的全球仿真创新与协同治理
                  </p>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-300 shrink-0">
                    中国 · 杭州
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Academic Conference Organization Credits (Matching Poster) */}
        <div className="w-full mt-10 sm:mt-14 pt-6 border-t border-white/15 text-white/80 text-[11px] sm:text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            
            {/* 1. Host */}
            <div className="md:col-span-3 flex flex-col gap-1">
              <div className="font-bold text-white tracking-wider uppercase text-xs sm:text-[13px] text-cyan-200/90">
                {isZh ? '主办单位 HOST' : 'HOST'}
              </div>
              <div className="font-semibold text-white/95 mt-1">
                {isZh ? '亚洲仿真联盟' : 'ASIA SIMULATION FEDERATION'}
              </div>
              <div className="text-[10px] text-slate-400 tracking-wide">
                ASIA SIMULATION FEDERATION
              </div>
            </div>

            {/* 2. Organizers */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <div className="font-bold text-white tracking-wider uppercase text-xs sm:text-[13px] text-cyan-200/90">
                {isZh ? '承办单位 ORGANIZERS' : 'ORGANIZERS'}
              </div>
              <div className="mt-1">
                <div className="font-semibold text-white/95">
                  {isZh ? '杭州市北京航空航天大学国际创新研究院' : 'Hangzhou Int. Innovation Inst. of Beihang University'}
                </div>
                <div className="text-[10px] text-slate-400 tracking-wide">
                  HANGZHOU INTERNATIONAL INNOVATION INSTITUTE OF BEIHANG UNIVERSITY
                </div>
              </div>
              <div className="mt-1.5">
                <div className="font-semibold text-white/95">
                  {isZh ? '中国工业合作协会仿真技术产业分会' : 'Simulation Tech Committee of CICA'}
                </div>
                <div className="text-[10px] text-slate-400 tracking-wide">
                  SIMULATION TECHNOLOGY COMMITTEE OF CHINA INDUSTRIAL COOPERATION ASSOCIATION
                </div>
              </div>
            </div>

            {/* 3. Co-Organizers */}
            <div className="md:col-span-5 flex flex-col gap-1">
              <div className="font-bold text-white tracking-wider uppercase text-xs sm:text-[13px] text-cyan-200/90">
                {isZh ? '协办单位 CO-ORGANIZERS' : 'CO-ORGANIZERS'}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-1 text-[10px] sm:text-[11px] text-slate-300">
                <div>• 中国仿真学会</div>
                <div>• 欧洲仿真联盟</div>
                <div>• 日本仿真学会</div>
                <div>• 天目山实验室</div>
                <div>• 韩国仿真学会</div>
                <div>• 虚拟现实技术全国重点实验室</div>
                <div>• 新加坡仿真学会</div>
                <div>• 可靠性国家级重点实验室</div>
                <div>• 马来西亚仿真学会</div>
                <div>• 自旋芯片全国重点实验室</div>
                <div className="col-span-2 text-slate-400 text-[9px] sm:text-[10px] mt-0.5">
                  • 联合国可持续发展目标创新领导力发展中心 / 亚太区域中心
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export const Hero = ConferenceHero;
