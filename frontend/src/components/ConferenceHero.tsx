import React from 'react';
import { Locale } from '../types';
import heroBg from '../assets/background.jpg';

interface ConferenceHeroProps {
  lang?: 'zh' | 'en';
  locale?: Locale;
  title?: string;
  subtitle?: string;
  description?: string;
}

export function ConferenceHero({ lang, locale, title, subtitle, description }: ConferenceHeroProps) {
  const isZh = lang ? lang === 'zh' : locale !== 'en';

  const defaultTitleZh = '世界仿真大会';
  const defaultSubtitleZh = 'GLOBAL SIMULATION CONFERENCE';
  const defaultDescZh = 'AI驱动的全球仿真创新与协同治理';

  const defaultTitleEn = 'GLOBAL SIMULATION CONFERENCE';
  const defaultSubtitleEn = '世界仿真大会';
  const defaultDescEn = 'AI-Driven Global Simulation Innovation & Collaborative Governance';

  const displayTitle = title || (isZh ? defaultTitleZh : defaultTitleEn);
  const displaySubtitle = subtitle || (isZh ? defaultSubtitleZh : defaultSubtitleEn);
  const displayDescription = description || (isZh ? defaultDescZh : defaultDescEn);

  const coOrganizersZh = [
    '中国仿真学会',
    '日本仿真学会',
    '韩国仿真学会',
    '新加坡仿真学会',
    '马来西亚仿真学会',
    '欧洲仿真联盟',
    '虚拟现实技术与系统全国重点实验室',
    '可靠性与环境工程技术国家级重点实验室',
    '联合国可持续发展目标与领导力发展中心',
    '天目山实验室',
    '中国工业合作协会',
    '自旋芯片与技术全国重点实验室',
    '联合国附属空间科技教育亚太区域中心 (中国)',
  ];

  const coOrganizersEn = [
    'China Simulation Federation',
    'Japan Society for Simulation Technology',
    'Korea Society for Simulation',
    'Society of Simulation and Gaming of Singapore',
    'Malaysian Simulation Society',
    'Federation of European Simulation',
    'State Key Laboratory of Virtual Reality Technology and Systems',
    'National Key Laboratory of Reliability and Environmental Engineering',
    'Global SDGs and Leadership Development Center',
    'Tianmushan Laboratory',
    'China Industrial Cooperation Association',
    'National Key Laboratory of Spintronics',
    'Regional Centre for Space Science and Technology Education in Asia and the Pacific (China) (Affiliated to the United Nations)',
  ];

  const organizersZh = [
    '1. 杭州市北京航空航天大学国际创新研究院',
    '2. 杭州云枢国创科技有限公司',
    '3. 中国工业合作协会仿真技术产业分会',
  ];

  const organizersEn = [
    '1. Hangzhou International Innovation Institute of Beihang University',
    '2. Hangzhou Yunshu Guochuang Technology Co., Ltd.',
    '3. Simulation Technology Committee of China Industrial Cooperation Association',
  ];

  return (
    <section 
      className="relative w-full flex-1 overflow-hidden text-white flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-16 py-4 sm:py-6 select-none"
      style={{
        backgroundColor: '#02081a',
        backgroundImage: `radial-gradient(ellipse at 75% 20%, rgba(30, 110, 220, 0.22) 0%, transparent 55%), linear-gradient(180deg, rgba(2, 8, 26, 0.45) 0%, rgba(2, 8, 26, 0.25) 45%, rgba(2, 8, 26, 0.85) 100%), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Master Conference Lockup Row */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 sm:gap-8 md:gap-8 lg:gap-10">
          
          {/* Left Column: 2026 GLOSIM Key Art */}
          <div className="flex flex-col items-center md:items-start shrink-0 text-center md:text-left justify-center select-none">
            <span 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-black tracking-tight leading-none text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 55%, #CBD5E1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              2026
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-[0.24em] leading-none text-white/95 mt-2 drop-shadow-md">
              GLOSIM
            </span>
          </div>

          {/* Center Divider Line (Desktop only) */}
          <div className="hidden md:block w-px bg-gradient-to-b from-white/10 via-white/50 to-white/10 shrink-0 self-stretch my-1" />

          {/* Right Column: Titles (Left) & Anchored Date/Location (Far Right) */}
          <div className="flex-1 w-full flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            
            {/* Titles & Hierarchy */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              {isZh ? (
                <>
                  {/* Primary Title: 世界仿真大会 (Bold, 44px–52px, letter-spacing: 0.08em) */}
                  <h1 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-black tracking-[0.08em] text-white leading-tight drop-shadow-md">
                    {displayTitle}
                  </h1>
                  
                  {/* Secondary English Title directly below: GLOBAL SIMULATION CONFERENCE */}
                  {displaySubtitle && (
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-[20px] font-bold tracking-[0.06em] uppercase text-slate-200 mt-2 not-italic">
                      {displaySubtitle}
                    </h2>
                  )}
                  
                  {/* Slogan / Description: AI驱动的全球仿真创新与协同治理 */}
                  {displayDescription && (
                    <p className="text-sm sm:text-base font-medium text-[#38bdf8] mt-2 drop-shadow">
                      {displayDescription}
                    </p>
                  )}
                </>
              ) : (
                <>
                  {/* Primary Title: GLOBAL SIMULATION CONFERENCE */}
                  <h1 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] font-black tracking-[0.04em] uppercase text-white leading-tight drop-shadow-md not-italic">
                    {displayTitle}
                  </h1>
                  
                  {/* Secondary Title directly below: 世界仿真大会 */}
                  {displaySubtitle && (
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-[20px] font-bold tracking-[0.06em] text-slate-200 mt-2">
                      {displaySubtitle}
                    </h2>
                  )}
                  
                  {/* Slogan / Description */}
                  {displayDescription && (
                    <p className="text-sm sm:text-base font-medium text-[#38bdf8] mt-2 drop-shadow max-w-xl">
                      {displayDescription}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Anchored Date & Location to the Far Right */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right shrink-0 border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-8">
              {/* Top line: Date (Bold, 22px–26px) */}
              <div className="text-xl sm:text-2xl md:text-[24px] lg:text-[26px] font-extrabold text-white tracking-tight drop-shadow whitespace-nowrap">
                {isZh ? '2026.11.13–16' : 'Nov 13–16, 2026'}
              </div>
              {/* Bottom line: City (Cyan #38bdf8, 14px–16px) */}
              <div className="text-sm sm:text-base md:text-[15px] font-semibold text-[#38bdf8] tracking-wide mt-1 whitespace-nowrap">
                {isZh ? '中国 · 杭州' : 'Hangzhou, China'}
              </div>
            </div>

          </div>

        </div>

        {/* Academic Conference Organization Credits */}
        <div className="w-full mt-6 sm:mt-8 pt-4 border-t border-white/15 text-white/80 text-[11px] sm:text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            
            {/* 1. Host */}
            <div className="md:col-span-3 flex flex-col gap-1">
              <div className="font-bold tracking-wider uppercase text-xs sm:text-[13px] text-cyan-200/90">
                {isZh ? '主办单位' : 'HOST'}
              </div>
              <div className="font-semibold text-white/95 mt-1">
                {isZh ? '亚洲仿真联盟 (ASIASIM)' : 'Asia Simulation Federation (ASIASIM)'}
              </div>
            </div>

            {/* 2. Organizers */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <div className="font-bold tracking-wider uppercase text-xs sm:text-[13px] text-cyan-200/90">
                {isZh ? '承办单位' : 'ORGANIZERS'}
              </div>
              <div className="flex flex-col gap-1.5 mt-1 text-white/95 font-medium leading-snug text-[11px] sm:text-xs">
                {(isZh ? organizersZh : organizersEn).map((org, idx) => (
                  <div key={idx}>{org}</div>
                ))}
              </div>
            </div>

            {/* 3. Co-Organizers */}
            <div className="md:col-span-5 flex flex-col gap-1">
              <div className="font-bold tracking-wider uppercase text-xs sm:text-[13px] text-cyan-200/90">
                {isZh ? '协办单位' : 'CO-ORGANIZERS'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-1 text-[10px] sm:text-[11px] text-slate-300 leading-snug">
                {(isZh ? coOrganizersZh : coOrganizersEn).map((item, idx) => (
                  <div 
                    key={idx} 
                    className={idx === (isZh ? coOrganizersZh : coOrganizersEn).length - 1 ? 'sm:col-span-2' : ''}
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export const Hero = ConferenceHero;
