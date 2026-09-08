import React, { useMemo } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Conference, Locale } from '../types';
import { HeroHeader } from '../components/HeroHeader';

interface SchedulePageProps {
  locale: Locale;
  conference?: Conference;
  onOpenRegister: (type: 'delegate' | 'paper') => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  locale,
  onOpenRegister
}) => {
  const isZh = locale === 'zh-Hans';

  // Calculate days remaining to conference opening (2026-11-13)
  const daysLeft = useMemo(() => {
    const target = new Date('2026-11-13T09:00:00+08:00').getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, []);

  const parallelForumsZh = [
    '1. 物理AI、智能仿真与数据治理专题论坛',
    '2. 航空航天、汽车与运载装备仿真专题论坛',
    '3. 工业仿真软件与工业大模型专题论坛',
    '4. 具身智能、机器人和AI玩具专题论坛',
    '5. 虚拟实验仿真与产教融合专题论坛',
    '6. 智慧医疗仿真与脑机接口专题论坛',
    '7. 先进EDA、多物理场仿真专题论坛',
    '8. 低空交通技术与可靠性专题论坛',
    '9. 社会环境与数字经济专题论坛',
    '10. 青年创新发展专题论坛'
  ];

  const parallelForumsEn = [
    '1. Physical AI, Intelligent Simulation & Data Governance',
    '2. Aerospace, Automotive & Transportation Equipment Simulation',
    '3. Industrial Simulation Software & Industrial Foundation Models',
    '4. Embodied Intelligence, Robotics & AI Toys',
    '5. Virtual Experimental Simulation & Industry-Education Integration',
    '6. Smart Healthcare Simulation & Brain-Computer Interfaces',
    '7. Advanced EDA & Multiphysics Simulation',
    '8. Low-Altitude Transportation Technologies & Reliability',
    '9. Social Environments & Digital Economy',
    '10. Youth Innovation & Academic Development'
  ];

  const venueText = isZh 
    ? '浙江省杭州市 北京航空航天大学 杭州创新研究院'
    : 'Hangzhou International Innovation Institute of Beihang University, Hangzhou, China';

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* 1. Header Banner */}
      <HeroHeader 
        locale={locale} 
        activePageTitle={isZh ? '会议日程' : 'Conference Schedule'} 
        compact={true} 
      />

      {/* 2. Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Agenda Table (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Table Title Bar */}
            <div className="bg-[#00186b] text-white px-6 py-4 flex flex-col items-center justify-center text-center">
              <h2 className="text-lg sm:text-xl font-bold tracking-wide leading-snug flex flex-col items-center">
                {isZh ? (
                  <>
                    <div>2026世界仿真大会</div>
                    <span className="w-8 h-[2px] bg-[#38bdf8] rounded-full my-2 inline-block"></span>
                    <div>日程表</div>
                  </>
                ) : (
                  <>
                    <div>GloSim 2026 Conference</div>
                    <span className="w-8 h-[2px] bg-[#38bdf8] rounded-full my-2 inline-block"></span>
                    <div>Schedule & Agenda</div>
                  </>
                )}
              </h2>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 bg-[#0f2d78] text-white font-bold py-3 text-center text-sm sm:text-base border-b border-blue-900">
              <div className="col-span-3 sm:col-span-2 border-r border-blue-800/80 px-2">
                {isZh ? '日期' : 'Date'}
              </div>
              <div className="col-span-6 sm:col-span-7 border-r border-blue-800/80 px-4">
                {isZh ? '内容' : 'Content'}
              </div>
              <div className="col-span-3 sm:col-span-3 px-2">
                {isZh ? '会议地点' : 'Venue'}
              </div>
            </div>

            {/* Table Rows (Light blue line between each day) */}
            <div className="divide-y-2 divide-sky-200 text-slate-800 text-sm sm:text-[15px]">
              
              {/* Row 1: 11月13日 (周五) */}
              <div className="grid grid-cols-12 items-center hover:bg-slate-50/80 transition-colors">
                <div className="col-span-3 sm:col-span-2 p-3 sm:p-4 text-center font-bold text-[#00186b] border-r border-slate-200 bg-slate-50/50">
                  <div>{isZh ? '11月13日' : 'Nov 13'}</div>
                  <div className="text-xs text-slate-500 font-medium">{isZh ? '周五' : 'Friday'}</div>
                </div>
                <div className="col-span-6 sm:col-span-7 p-3 sm:p-4 border-r border-slate-200">
                  <span className="inline-block bg-blue-50 text-[#00186b] font-bold px-3 py-1 rounded text-sm sm:text-base">
                    {isZh ? '代表报到' : 'Delegate Registration'}
                  </span>
                </div>
                <div className="col-span-3 sm:col-span-3 p-3 sm:p-4 text-xs sm:text-sm text-slate-600 text-center sm:text-left leading-relaxed">
                  {venueText}
                </div>
              </div>

              {/* Row 2: 11月14日 (周六) */}
              <div className="grid grid-cols-12 items-center hover:bg-slate-50/80 transition-colors">
                <div className="col-span-3 sm:col-span-2 p-3 sm:p-4 text-center font-bold text-[#00186b] border-r border-slate-200 bg-slate-50/50 self-stretch flex flex-col justify-center">
                  <div>{isZh ? '11月14日' : 'Nov 14'}</div>
                  <div className="text-xs text-slate-500 font-medium">{isZh ? '周六' : 'Saturday'}</div>
                </div>
                <div className="col-span-6 sm:col-span-7 p-3 sm:p-4 border-r border-slate-200 space-y-4">
                  
                  {/* Group 1: 开幕式 */}
                  <div>
                    <div className="font-bold text-[#00186b] text-base mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-4 bg-[#0f2d78] rounded-full inline-block" />
                      {isZh ? '开幕式' : 'Opening Ceremony'}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs sm:text-sm pl-1">
                      <li>{isZh ? '领导/嘉宾致辞' : 'Opening Remarks by Leaders and Distinguished Guests'}</li>
                      <li>{isZh ? '《仿真科学与技术十大前沿问题进展2026》发布' : 'Release of "2026 Advances in Top 10 Frontier Issues in Simulation Science & Technology"'}</li>
                      <li>{isZh ? '新标准新产品新技术发布会' : 'New Standards, Products & Technologies Launch Event'}</li>
                      <li>{isZh ? '优秀国际仿真案例发布' : 'Outstanding International Simulation Cases Presentation'}</li>
                      <li>{isZh ? '仿真艺术设计大赛颁奖仪式' : 'Simulation Art & Design Competition Awards Ceremony'}</li>
                      <li>{isZh ? '2026国际仿真创新大赛颁奖仪式' : '2026 International Simulation Innovation Competition Awards'}</li>
                      <li>{isZh ? '合作签约仪式' : 'Strategic Cooperation Agreement Signing Ceremony'}</li>
                    </ul>
                  </div>

                  {/* Group 2: 主论坛 */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="font-bold text-[#00186b] text-base mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-4 bg-[#0f2d78] rounded-full inline-block" />
                      {isZh ? '主论坛' : 'Plenary Forum'}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs sm:text-sm pl-1">
                      <li>{isZh ? '诺贝尔奖/院士/专家论坛' : 'Nobel Laureates, Academicians & Distinguished Experts Forum'}</li>
                      <li>{isZh ? '特邀主旨报告' : 'Keynote Speeches'}</li>
                      <li>{isZh ? '高端对话：AI驱动的全球仿真创新与协同治理' : 'High-Level Dialogue: AI-Driven Global Simulation Innovation & Collaborative Governance'}</li>
                    </ul>
                  </div>

                  {/* Group 3: 洽谈活动 */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="font-bold text-[#00186b] text-base mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-4 bg-[#0f2d78] rounded-full inline-block" />
                      {isZh ? '洽谈活动' : 'Business Matchmaking'}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs sm:text-sm pl-1">
                      <li>{isZh ? '“出海”亚洲新机遇对接洽谈活动' : '"Going Global" Asian Market Opportunities Matchmaking'}</li>
                    </ul>
                  </div>

                </div>
                <div className="col-span-3 sm:col-span-3 p-3 sm:p-4 text-xs sm:text-sm text-slate-600 text-center sm:text-left leading-relaxed">
                  {venueText}
                </div>
              </div>

              {/* Row 3: 11月15日 (周日) */}
              <div className="grid grid-cols-12 items-center hover:bg-slate-50/80 transition-colors">
                <div className="col-span-3 sm:col-span-2 p-3 sm:p-4 text-center font-bold text-[#00186b] border-r border-slate-200 bg-slate-50/50 self-stretch flex flex-col justify-center">
                  <div>{isZh ? '11月15日' : 'Nov 15'}</div>
                  <div className="text-xs text-slate-500 font-medium">{isZh ? '周日' : 'Sunday'}</div>
                </div>
                <div className="col-span-6 sm:col-span-7 p-3 sm:p-4 border-r border-slate-200">
                  <div className="font-bold text-[#00186b] text-base mb-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-4 bg-[#0f2d78] rounded-full inline-block" />
                    {isZh ? '平行分论坛' : 'Parallel Thematic Sessions'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    {(isZh ? parallelForumsZh : parallelForumsEn).map((forum, idx) => (
                      <div key={idx} className="bg-slate-50 hover:bg-blue-50/60 p-2 rounded border border-slate-100 transition-colors">
                        {forum}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-3 p-3 sm:p-4 text-xs sm:text-sm text-slate-600 text-center sm:text-left leading-relaxed">
                  {venueText}
                </div>
              </div>

              {/* Row 4: 11月14日-15日 */}
              <div className="grid grid-cols-12 items-center hover:bg-slate-50/80 transition-colors">
                <div className="col-span-3 sm:col-span-2 p-3 sm:p-4 text-center font-bold text-[#00186b] border-r border-slate-200 bg-slate-50/50">
                  <div>{isZh ? '11月14日-15日' : 'Nov 14–15'}</div>
                  <div className="text-xs text-slate-500 font-medium">{isZh ? '全天' : 'All Day'}</div>
                </div>
                <div className="col-span-6 sm:col-span-7 p-3 sm:p-4 border-r border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded text-xs">
                      {isZh ? '展览' : 'Exhibition'}
                    </span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {isZh ? '2026国际仿真科技展' : '2026 International Simulation Science & Technology Exhibition'}
                    </span>
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-3 p-3 sm:p-4 text-xs sm:text-sm text-slate-600 text-center sm:text-left leading-relaxed">
                  {venueText}
                </div>
              </div>

              {/* Row 5: 11月16日 (周一) */}
              <div className="grid grid-cols-12 items-center hover:bg-slate-50/80 transition-colors">
                <div className="col-span-3 sm:col-span-2 p-3 sm:p-4 text-center font-bold text-[#00186b] border-r border-slate-200 bg-slate-50/50">
                  <div>{isZh ? '11月16日' : 'Nov 16'}</div>
                  <div className="text-xs text-slate-500 font-medium">{isZh ? '周一' : 'Monday'}</div>
                </div>
                <div className="col-span-6 sm:col-span-7 p-3 sm:p-4 border-r border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded text-xs">
                      {isZh ? '参访交流' : 'Site Visit'}
                    </span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {isZh ? '标杆企业参观' : 'Benchmark Enterprise Technical Tour'}
                    </span>
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-3 p-3 sm:p-4 text-xs sm:text-sm text-slate-600 text-center sm:text-left leading-relaxed">
                  {venueText}
                </div>
              </div>

            </div>

            {/* Footer Ribbon */}
            <div className="bg-[#0f2d78] text-white text-center py-3.5 px-4 text-xs sm:text-sm font-semibold rounded-b-lg flex items-center justify-center gap-2">
              <MapPin size={16} className="text-cyan-300 shrink-0" />
              <span>
                {isZh 
                  ? '会议地点：浙江省杭州市北京航空航天大学杭州创新研究院' 
                  : 'Conference Venue: Hangzhou International Innovation Institute of Beihang University, Hangzhou, China'}
              </span>
            </div>

          </div>

          {/* Right Sidebar (lg:col-span-4) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* 1. Single Countdown Box (Optimized font, gradient and hierarchy) */}
            <div 
              className="rounded-2xl p-6 text-center relative overflow-hidden border border-cyan-400/35 shadow-xl"
              style={{
                background: 'linear-gradient(145deg, #020d2b 0%, #00186b 55%, #082b82 100%)',
                color: '#ffffff'
              }}
            >
              {/* Subtle background glow effect */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Top Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2.5">
                <Clock className="w-3.5 h-3.5 text-cyan-300" />
                <span>{isZh ? '大会倒计时 · COUNTDOWN' : 'CONFERENCE COUNTDOWN'}</span>
              </div>

              {/* Lead-in Text */}
              <div className="text-xs sm:text-sm text-slate-200 font-medium mb-2 tracking-wide">
                {isZh ? '距离2026世界仿真大会开幕还有' : 'Remaining until GloSim 2026 Opening'}
              </div>

              {/* Digital Glass Display Plate */}
              <div className="bg-black/30 border border-white/10 rounded-xl py-3 px-4 my-2 flex items-baseline justify-center gap-2 shadow-inner">
                <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_14px_rgba(56,189,248,0.45)]">
                  {daysLeft}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-cyan-300 font-sans">
                  {isZh ? '天' : 'Days'}
                </span>
              </div>

              {/* Bottom Date Anchor */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-cyan-200/90 font-medium">
                <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                <span>{isZh ? '2026.11.13–16 · 杭州' : 'Nov 13–16, 2026 · Hangzhou'}</span>
              </div>
            </div>

            {/* 2. Conference Registration Button */}
            <button
              type="button"
              onClick={() => onOpenRegister('delegate')}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-3.5 px-4 rounded-lg w-full text-center block shadow-md text-base sm:text-lg transition-all hover:shadow-lg cursor-pointer"
            >
              {isZh ? '会议注册 · 参会报名' : 'Conference Registration'}
            </button>

            {/* 3. 主办单位 Card */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h3 className="text-base font-bold text-[#00186b] mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#00186b] rounded-full inline-block" />
                {isZh ? '主办单位' : 'Host & Organizer'}
              </h3>
              <p className="font-semibold text-slate-800 text-sm">
                {isZh ? '亚洲仿真联盟 (ASIASIM)' : 'Asia Simulation Federation (ASIASIM)'}
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {isZh 
                  ? '亚洲仿真联盟以“开放、创新、协同、包容、共赢”为理念，致力于构建高质量国际交流平台。' 
                  : 'ASIASIM is dedicated to advancing simulation science, international collaboration, and high-quality global exchange.'}
              </p>
            </div>

            {/* 4. 重要日期 Card */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h3 className="text-base font-bold text-[#00186b] mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#00186b] rounded-full inline-block" />
                {isZh ? '重要日期' : 'Important Dates'}
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-700">{isZh ? '大会报到' : 'Registration'}:</span>
                  <span className="font-bold text-[#00186b]">{isZh ? '11月13日' : 'Nov 13, 2026'}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-700">{isZh ? '开幕及主论坛' : 'Opening & Plenary'}:</span>
                  <span className="font-bold text-[#00186b]">{isZh ? '11月14日' : 'Nov 14, 2026'}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-700">{isZh ? '特色分论坛' : 'Thematic Sessions'}:</span>
                  <span className="font-bold text-[#00186b]">{isZh ? '11月15日' : 'Nov 15, 2026'}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium text-slate-700">{isZh ? '标杆企业参访' : 'Site Visit'}:</span>
                  <span className="font-bold text-[#00186b]">{isZh ? '11月16日上午' : 'Nov 16 (Morning)'}</span>
                </div>
              </div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
};
