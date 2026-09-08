import React, { useState } from 'react';
import { Play, ArrowRight, FileText, Globe, Landmark, Award } from 'lucide-react';
import { HomePageData, Conference, Notice, Locale } from '../types';
import { ConferenceHero } from '../components/ConferenceHero';
import { CountdownBanner } from '../components/CountdownBanner';
import { VideoModal } from '../components/VideoModal';
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
  const heroTitle = data?.heroTitle || (isZh ? '学术权威 · 严谨理性 · 汇聚全球青年学者' : 'Academic Authority · Analytical Rigor · Global Delegate Assembly');
  const heroSubtitle = data?.heroSubtitle || (isZh ? '推动跨学科决策模拟、国际法理推演与全球治理多边协商的国际学术平台。' : 'An international consortium for empirical policy simulation and multilateral diplomatic foresight.');
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

  return (
    <div>
      {/* 1. Hero Section */}
      <ConferenceHero locale={locale} />

      {/* 2. Countdown Banner */}
      {currentConference && (
        <CountdownBanner
          conference={currentConference}
          onViewSchedule={() => onNavigate('/schedule')}
          onSubmitCfp={() => onOpenRegister('paper')}
          eyebrow={ui.home.countdownEyebrow}
          countdownLabel={ui.home.countdownDaysLabel}
          viewScheduleText={ui.home.viewSchedule}
          submitCfpText={ui.home.submitAbstract}
        />
      )}

      {/* 3. Organization Intro & Dual Video Section */}
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

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {/* Video 1 */}
            <div className="card-academic" style={{ overflow: 'hidden' }}>
              <div 
                onClick={() => setVideoModalData({ isOpen: true, title: orgVideoCaption, url: orgVideoUrl })}
                style={{ position: 'relative', cursor: 'pointer', height: '240px', backgroundColor: 'var(--ink-900)' }}
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
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(27, 58, 107, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  <Play size={24} color="#FFF" style={{ marginLeft: '3px' }} />
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <span className="badge-caps" style={{ color: 'var(--slate-600)' }}>
                  DOCUMENTARY
                </span>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink-900)', marginTop: '4px' }}>
                  {orgVideoCaption}
                </h4>
              </div>
            </div>

            {/* Video 2 */}
            <div className="card-academic" style={{ overflow: 'hidden' }}>
              <div 
                onClick={() => setVideoModalData({ isOpen: true, title: chairmanVideoCaption, url: chairmanVideoUrl })}
                style={{ position: 'relative', cursor: 'pointer', height: '240px', backgroundColor: 'var(--ink-900)' }}
              >
                <img
                  src={chairmanVideoPoster}
                  alt={chairmanVideoCaption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(181, 101, 46, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  <Play size={24} color="#FFF" style={{ marginLeft: '3px' }} />
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <span className="badge-caps" style={{ color: 'var(--warm-accent)' }}>
                  KEYNOTE ADDRESS
                </span>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink-900)', marginTop: '4px' }}>
                  {chairmanVideoCaption}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Highlights Stats Bar */}
      <section style={{
        padding: '48px 0',
        backgroundColor: 'var(--limestone)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            {highlights.map((item, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: '16px',
                backgroundColor: 'var(--white)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                  {getIcon(item.icon)}
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--ink-900)',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-mono)'
                }}>
                  {item.number}
                </div>
                <div style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--slate-600)',
                  fontWeight: 500,
                  marginTop: '6px'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
