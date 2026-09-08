import React, { useState } from 'react';
import { Play, ArrowRight, FileText, Globe, Landmark, Award } from 'lucide-react';
import { HomePageData, Conference, Notice, Locale } from '../types';
import { ConferenceHero } from '../components/ConferenceHero';
import { CountdownBanner } from '../components/CountdownBanner';
import { WelcomeAddress } from '../components/WelcomeAddress';
import { VideoModal } from '../components/VideoModal';
import { GuestMarqueeSlider } from '../components/GuestMarqueeSlider';
import { zhUi } from '../locales/zh';
import { enUi } from '../locales/en';

interface HomePageProps {
  data: HomePageData | null;
  locale: Locale;
  currentConference?: Conference;
  pastConferences: Conference[];
  notices: Notice[];
  onNavigate: (path: string) => void;
  onOpenRegister: (type: 'delegate' | 'paper') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  data,
  locale,
  currentConference,
  pastConferences,
  notices,
  onNavigate,
  onOpenRegister
}) => {
  const ui = locale === 'zh-Hans' ? zhUi : enUi;
  const isZh = locale === 'zh-Hans';

  const [videoModalData, setVideoModalData] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: '',
    url: ''
  });
  const [activeActivityTab, setActiveActivityTab] = useState<number>(0);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'globe': return <Globe size={24} color="var(--symposium-blue)" />;
      case 'landmark': return <Landmark size={24} color="var(--symposium-blue)" />;
      case 'award': return <Award size={24} color="var(--symposium-blue)" />;
      case 'file-text': return <FileText size={24} color="var(--symposium-blue)" />;
      default: return <Award size={24} color="var(--symposium-blue)" />;
    }
  };

  const heroEyebrow = data?.heroEyebrow || ui.home.heroEyebrowDefault;
  const heroTitle = data?.heroTitle || (isZh ? '世界仿真大会' : 'GLOBAL SIMULATION CONFERENCE');
  const heroSubtitle = data?.heroSubtitle || (isZh ? 'GLOBAL SIMULATION CONFERENCE' : '世界仿真大会');
  const heroDescription = data?.heroDescription || (isZh ? 'AI驱动的全球仿真创新与协同治理' : 'AI-Driven Global Simulation Innovation & Collaborative Governance');
  const heroTagline = data?.heroTagline || (isZh ? '“在理性交锋与学术实证中，预见未来全球协同秩序。”' : '"Foreseeing resilient global coordination through rigorous analytical discourse."');
  const heroCtaPrimary = data?.heroCtaPrimary || ui.home.viewSchedule;
  const heroCtaSecondary = data?.heroCtaSecondary || ui.home.submitAbstract;

  const orgIntroTitle = data?.orgIntroTitle || (isZh ? '联合会学术使命与组织概况' : 'Institutional Mission & Academic Governance');
  const orgIntroBody = data?.orgIntroBody || (isZh ? '国际模拟学术联合会（GloSim）由全球四十余所知名高校国际关系与计算社会科学学者于2017年共同发起。' : 'Founded in 2017 by faculty from leading international affairs and computational social science institutions worldwide.');
  const orgVideoCaption = data?.orgVideoCaption || (isZh ? '联合会十周年学术纪实片（中英双语字幕）' : 'Federation Decennial Academic Documentary');
  const orgVideoUrl = data?.orgVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  const orgVideoPoster = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80';

  const chairmanVideoCaption = data?.chairmanVideoCaption || (isZh ? '学术委员会主席致辞：面向复杂系统的学术模拟' : 'Opening Address by Academic Council Chair');
  const chairmanVideoUrl = data?.chairmanVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const chairmanVideoPoster = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';

  const defaultHighlights = [
    { number: '48+', label: isZh ? '成员国家与地区' : 'Member Countries', icon: 'globe' },
    { number: '140+', label: isZh ? '顶尖理事院校' : 'Governing Universities', icon: 'landmark' },
    { number: '9 届', label: isZh ? '已成功举办年会' : 'Annual Assemblies', icon: 'award' },
    { number: '3,200+', label: isZh ? '发表高水平模拟成果' : 'Peer-Reviewed Models', icon: 'file-text' }
  ];
  const highlights = data?.highlights && data.highlights.length > 0 ? data.highlights : defaultHighlights;

  const fallbackConf: Conference = {
    id: 1,
    title: isZh ? '第十届全球模拟大会（GloSim 2026）' : '10th Global Simulation Conference (GloSim 2026)',
    edition: isZh ? '第十届年会' : '10th Annual Assembly',
    year: 2026,
    theme: isZh ? '多极化背景下的全球治理韧性与复杂系统博弈模拟' : 'Global Governance Resilience & Complex Multi-Agent Simulation Under Multipolarity',
    startDate: '2026-10-18',
    endDate: '2026-10-21',
    location: isZh ? '中国 · 北京' : 'Beijing, China',
    venue: isZh ? '国家会议中心 · 第三报告厅' : 'China National Convention Center · Auditorium 3',
    status: 'upcoming',
    summary: '',
    description: '',
    agendaItems: []
  };
  const activeConference = currentConference || fallbackConf;

  return (
    <div>
      {/* 1. Hero & Countdown Container */}
      <div className={`flex flex-col ${isZh ? 'min-h-0' : 'min-h-[calc(100vh-64px)] lg:min-h-[calc(80vh-52px)]'}`}>
        <ConferenceHero
          locale={locale}
          title={heroTitle}
          subtitle={heroSubtitle}
          description={heroDescription}
        />
        <CountdownBanner
          conference={activeConference}
          onViewSchedule={() => onNavigate('/schedule')}
          onSubmitCfp={() => onOpenRegister('paper')}
          eyebrow={ui.home.countdownEyebrow}
          countdownLabel={ui.home.countdownDaysLabel}
          viewScheduleText={ui.home.viewSchedule}
          submitCfpText={ui.home.submitAbstract}
          locale={locale}
        />
      </div>

      {/* 3. Welcome Address */}
      <WelcomeAddress locale={locale} />

      {/* 4. Organization Intro & Dual Video Section */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
            <span className="badge-caps" style={{ color: 'var(--symposium-blue)', marginBottom: '8px' }}>
              {isZh ? '学会宗旨 · ACADEMIC CHARTER' : 'ACADEMIC MISSION & CHARTER'}
            </span>
            <h2 style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 'var(--weight-bold)',
              color: 'var(--ink-900)',
              margin: '8px 0 16px'
            }}>
              {orgIntroTitle}
            </h2>
            <p style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--ink-700)',
              lineHeight: 'var(--leading-body)',
              marginBottom: '20px'
            }}>
              {orgIntroBody}
            </p>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/about');
              }}
              style={{
                color: 'var(--symposium-blue)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: 'var(--text-body-md)'
              }}
            >
              <span>{isZh ? '深入了解联合会组织架构与学术委员会' : 'Explore Governance Structure'}</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Single Video Card */}
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div className="card-academic" style={{ overflow: 'hidden' }}>
              <div 
                onClick={() => setVideoModalData({ isOpen: true, title: orgVideoCaption, url: orgVideoUrl })}
                style={{ position: 'relative', cursor: 'pointer', height: '300px', backgroundColor: 'var(--ink-900)' }}
              >
                <img
                  src={orgVideoPoster}
                  alt={orgVideoCaption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(27, 58, 107, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.35)'
                }}>
                  <Play size={28} color="#FFF" style={{ marginLeft: '3px' }} />
                </div>
              </div>
              <div style={{ padding: '16px 24px', textAlign: 'center' }}>
                <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                  DOCUMENTARY
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink-900)', marginTop: '4px' }}>
                  {orgVideoCaption}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Activities & Important Dates */}
      <section className="bg-[#f8fafc] py-12 border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: 重点活动 (lg:col-span-8) */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-[#00186b] mb-6 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#00186b] rounded-full inline-block" />
                {isZh ? '重点活动' : 'Featured Activities'}
              </h3>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                {/* 3 Tab Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveActivityTab(0)}
                    className={
                      activeActivityTab === 0
                        ? 'bg-[#0f1d6b] text-white font-semibold py-3 px-6 text-center cursor-pointer transition-colors rounded-lg shadow-sm'
                        : 'bg-[#eef2ff] text-slate-700 hover:bg-[#e0e7ff] py-3 px-6 text-center cursor-pointer transition-colors rounded-lg font-medium'
                    }
                  >
                    {isZh ? '主论坛日程' : 'Plenary Forum'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveActivityTab(1)}
                    className={
                      activeActivityTab === 1
                        ? 'bg-[#0f1d6b] text-white font-semibold py-3 px-6 text-center cursor-pointer transition-colors rounded-lg shadow-sm'
                        : 'bg-[#eef2ff] text-slate-700 hover:bg-[#e0e7ff] py-3 px-6 text-center cursor-pointer transition-colors rounded-lg font-medium'
                    }
                  >
                    {isZh ? '特色主题分论坛日程' : 'Thematic Sub-Forums'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveActivityTab(2)}
                    className={
                      activeActivityTab === 2
                        ? 'bg-[#0f1d6b] text-white font-semibold py-3 px-6 text-center cursor-pointer transition-colors rounded-lg shadow-sm'
                        : 'bg-[#eef2ff] text-slate-700 hover:bg-[#e0e7ff] py-3 px-6 text-center cursor-pointer transition-colors rounded-lg font-medium'
                    }
                  >
                    {isZh ? '论文征集' : 'Call for Papers'}
                  </button>
                </div>

                {/* Tab Content States */}
                {activeActivityTab === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#0f1d6b] text-white p-6 rounded-lg text-center font-bold flex flex-col justify-center min-h-[140px] shadow-sm">
                      <div className="text-xl mb-2">{isZh ? '开幕式日程' : 'Opening Ceremony'}</div>
                      <div className="text-cyan-200 text-sm font-normal">{isZh ? '11月14日 (星期六) 上午' : 'Nov 14 (Saturday) Morning'}</div>
                    </div>
                    <div className="bg-[#0f1d6b] text-white p-6 rounded-lg text-center font-bold flex flex-col justify-center min-h-[140px] shadow-sm">
                      <div className="text-xl mb-2">{isZh ? '主论坛日程' : 'Plenary Forum Schedule'}</div>
                      <div className="text-cyan-200 text-sm font-normal">{isZh ? '11月14日 (星期六) 下午' : 'Nov 14 (Saturday) Afternoon'}</div>
                    </div>
                  </div>
                )}

                {activeActivityTab === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#0f1d6b] text-white p-6 rounded-lg text-center font-bold flex flex-col justify-center min-h-[140px] shadow-sm">
                      <div className="text-xl mb-2">{isZh ? '特色主题分论坛日程' : 'Thematic Sub-Forums'}</div>
                      <div className="text-cyan-200 text-sm font-normal">{isZh ? '11月15日 (星期日) 上午' : 'Nov 15 (Sunday) Morning'}</div>
                    </div>
                    <div className="bg-[#0f1d6b] text-white p-6 rounded-lg text-center font-bold flex flex-col justify-center min-h-[140px] shadow-sm">
                      <div className="text-xl mb-2">{isZh ? '特色主题分论坛日程' : 'Thematic Sub-Forums'}</div>
                      <div className="text-cyan-200 text-sm font-normal">{isZh ? '11月15日 (星期日) 下午' : 'Nov 15 (Sunday) Afternoon'}</div>
                    </div>
                  </div>
                )}

                {activeActivityTab === 2 && (
                  <div className="mt-6">
                    <p className="text-slate-700 leading-relaxed text-[15px]">
                      {isZh 
                        ? '仿真技术已成为破解全球复杂系统难题、推动可持续发展的关键支撑，“仿真赋能全球协同创新”已成为国际社会的广泛共识。为深化全球仿真领域科技治理，推动该领域学术交流与产业协作，加速前沿技术从实验室走向规模化落地，引领仿真科技向更高精度、更广维度、更深融合方向发展，2026世界仿真大会（2026 Global Simulation Conference, GloSim 2026）拟定于11月13日（星期五）至16日（星期一）在浙江省杭州市举行（11月13日报到，11月16日参观），同期举办第二届国际仿真科技展览。'
                        : 'Simulation technology has become a vital support in addressing global complex-system challenges and advancing sustainable development. To strengthen global governance in simulation science and technology, promote academic exchange and industrial collaboration, and accelerate the transition of cutting-edge research to scale applications, the 2026 Global Simulation Conference (GloSim 2026) is scheduled to convene from November 13 to 16, 2026 in Hangzhou, Zhejiang Province, China, accompanied by the 2nd International Simulation Science & Technology Exhibition.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigate('/call-for-papers')}
                      className="w-full mt-6 py-3.5 bg-[#0f1d6b] hover:bg-[#1a2d96] text-white font-bold text-center rounded-lg block transition-colors shadow-sm"
                    >
                      {isZh ? '查看征文通知' : 'View Call for Papers'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: 重要日期 (lg:col-span-4) */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-[#00186b] mb-6 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#00186b] rounded-full inline-block" />
                {isZh ? '重要日期' : 'Important Dates'}
              </h3>

              <div className="space-y-4">
                {/* Card 1 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="font-bold text-slate-800 text-base">
                    {isZh ? '大会报到日期' : 'Delegate Registration Date'}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {isZh ? '2026年11月13日' : 'November 13, 2026'}
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="font-bold text-slate-800 text-base">
                    {isZh ? '开幕式及主论坛' : 'Opening Ceremony & Plenary Forum'}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {isZh ? '2026年11月14日全天' : 'November 14, 2026 (All Day)'}
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="font-bold text-slate-800 text-base">
                    {isZh ? '特色分论坛' : 'Thematic Sub-Forums'}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {isZh ? '2026年11月15日全天' : 'November 15, 2026 (All Day)'}
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="font-bold text-slate-800 text-base">
                    {isZh ? '参访' : 'Site Visit & Technical Tour'}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {isZh ? '2026年11月16日上午' : 'November 16, 2026 (Morning)'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Spotlight on Guests: 2025 International Simulation Conference */}
      <GuestMarqueeSlider
        locale={locale}
        title={data?.spotlightTitle}
        subtitle={data?.spotlightSubtitle}
        guests={data?.spotlightGuests}
      />

      {/* 5. Latest Notices (CFP) */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '36px'
          }}>
            <div>
              <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                CALL FOR PAPERS & ANNOUNCEMENTS
              </span>
              <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-bold)', color: 'var(--ink-900)', marginTop: '4px' }}>
                {ui.home.updatesTitle}
              </h2>
              <p style={{ fontSize: 'var(--text-body-md)', color: 'var(--slate-600)' }}>
                {ui.home.updatesSubtitle}
              </p>
            </div>
            <button
              onClick={() => onNavigate('/call-for-papers')}
              className="btn-secondary"
              style={{ padding: '8px 18px', fontSize: '14px' }}
            >
              <span>{ui.home.viewAllCfp}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {notices.map((notice) => (
              <div key={notice.id} className="card-academic" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                    {notice.category}
                  </span>
                  <span className={`badge-pill ${notice.status === 'active' ? 'badge-active' : 'badge-closed'}`}>
                    {notice.status === 'active' ? ui.cfp.statusOpen : ui.cfp.statusClosed}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '10px', lineHeight: 1.3 }}>
                  {notice.title}
                </h3>
                <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                  {notice.summary}
                </p>
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--slate-200)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px'
                }}>
                  <span style={{ color: 'var(--slate-600)' }}>
                    {ui.home.deadlinePrefix} <strong style={{ color: 'var(--ink-900)' }}>{notice.deadline}</strong>
                  </span>
                  <button
                    onClick={() => onNavigate('/call-for-papers')}
                    style={{ color: 'var(--symposium-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>{ui.home.readNotice}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Past Conferences Preview */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--limestone)', borderTop: '1px solid var(--border-default)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '36px'
          }}>
            <div>
              <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                ANNUAL ASSEMBLY ARCHIVE
              </span>
              <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-bold)', color: 'var(--ink-900)', marginTop: '4px' }}>
                {ui.home.pastPreviewTitle}
              </h2>
              <p style={{ fontSize: 'var(--text-body-md)', color: 'var(--slate-600)' }}>
                {ui.home.pastPreviewSubtitle}
              </p>
            </div>
            <button
              onClick={() => onNavigate('/past-conferences')}
              className="btn-secondary"
              style={{ padding: '8px 18px', fontSize: '14px' }}
            >
              <span>{ui.home.viewAllConferences}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {pastConferences.map((conf) => (
              <div
                key={conf.id}
                className="card-academic"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => onNavigate('/past-conferences')}
              >
                <div style={{ height: '160px', overflow: 'hidden', backgroundColor: 'var(--ink-900)' }}>
                  <img
                    src={conf.coverImage || 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80'}
                    alt={conf.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                      {conf.edition}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--slate-600)', fontFamily: 'var(--font-mono)' }}>
                      {conf.year}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '8px' }}>
                    {conf.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {conf.summary}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--symposium-blue)', fontWeight: 600 }}>
                    <span>{isZh ? '查看学术纪要' : 'View Summary'}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModalData.isOpen}
        onClose={() => setVideoModalData({ ...videoModalData, isOpen: false })}
        title={videoModalData.title}
        videoUrl={videoModalData.url}
      />
    </div>
  );
};
