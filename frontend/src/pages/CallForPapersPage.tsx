import React, { useState } from 'react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { Notice, Locale } from '../types';
import { HeroHeader } from '../components/HeroHeader';
import { zhUi } from '../locales/zh';
import { enUi } from '../locales/en';

interface CallForPapersPageProps {
  locale: Locale;
  notices: Notice[];
  onOpenRegister: (type: 'delegate' | 'paper') => void;
}

export const CallForPapersPage: React.FC<CallForPapersPageProps> = ({
  locale,
  notices,
  onOpenRegister
}) => {
  const ui = locale === 'zh-Hans' ? zhUi : enUi;
  const isZh = locale === 'zh-Hans';
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(notices[0] || null);

  const filteredNotices = notices.filter(n => {
    if (filter === 'active') return n.status === 'active';
    if (filter === 'closed') return n.status === 'closed';
    return true;
  });

  const defaultGuidelines = [
    isZh ? '论文语言为中文或英文，全文建议 6,000–10,000 字（英文 5,000–8,000 词）。' : 'Manuscripts must be in English or Chinese. Full paper recommendations: 5,000–8,000 words.',
    isZh ? '所有投稿均须包含：研究背景、模型方法、模拟推演过程及实证结论。' : 'All submissions must state research problem, model design, simulation trajectory, and empirical validation.',
    isZh ? '采用双向匿名盲审（Double-blind Review）机制，确保学术公正。' : 'Strict double-blind peer review process ensuring institutional and regional fairness.',
    isZh ? '入选优秀论文将收录于联合会学术论文集，并推荐至国际权威期刊发表。' : 'Selected papers will be published in the GloSim Conference Proceedings and indexed in leading scholarly databases.'
  ];

  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      {/* Header Banner */}
      <HeroHeader
        locale={locale}
        activePageTitle={isZh ? '论文征集' : 'Call for Papers'}
        compact={true}
      />

      {/* Main Content */}
      <section style={{ padding: '56px 0 72px' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'flex-start'
        }}>
          {/* Left Column: Notices List */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid var(--slate-200)',
              paddingBottom: '12px'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink-900)' }}>
                {ui.cfp.activeTitle}
              </h2>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setFilter('all')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: filter === 'all' ? 700 : 500,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: filter === 'all' ? 'var(--symposium-blue)' : 'var(--limestone)',
                    color: filter === 'all' ? 'var(--white)' : 'var(--slate-600)'
                  }}
                >
                  {ui.cfp.filterAll}
                </button>
                <button
                  onClick={() => setFilter('active')}
                  style={{
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: filter === 'active' ? 700 : 500,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: filter === 'active' ? 'var(--symposium-blue)' : 'var(--limestone)',
                    color: filter === 'active' ? 'var(--white)' : 'var(--slate-600)'
                  }}
                >
                  {ui.cfp.filterActive}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredNotices.map((notice) => {
                const isSelected = selectedNotice?.id === notice.id;
                return (
                  <div
                    key={notice.id}
                    onClick={() => setSelectedNotice(notice)}
                    className="card-academic"
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      borderLeft: isSelected ? '4px solid var(--symposium-blue)' : '1px solid var(--border-default)',
                      backgroundColor: isSelected ? 'var(--symposium-blue-tint)' : 'var(--white)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                        {notice.category}
                      </span>
                      <span className={`badge-pill ${notice.status === 'active' ? 'badge-active' : 'badge-closed'}`}>
                        {notice.status === 'active' ? ui.cfp.statusOpen : ui.cfp.statusClosed}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '8px' }}>
                      {notice.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '12px' }}>
                      {notice.summary}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--slate-600)' }}>
                      <span>{ui.cfp.deadlineLabel}: <strong>{notice.deadline}</strong></span>
                      <span style={{ color: 'var(--symposium-blue)', fontWeight: 600 }}>{ui.cfp.viewDetails} →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Notice Detail */}
          {selectedNotice && (
            <div>
              <div className="card-academic" style={{ padding: '32px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                    {selectedNotice.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--slate-600)' }}>
                    {ui.cfp.publishLabel}: {selectedNotice.publishDate}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink-900)', marginBottom: '16px', lineHeight: 1.3 }}>
                  {selectedNotice.title}
                </h2>
                <div style={{ fontSize: '14px', color: 'var(--ink-700)', lineHeight: 1.7, marginBottom: '24px' }}>
                  {selectedNotice.body}
                </div>

                {/* Key Dates Timeline */}
                {selectedNotice.keyDates && selectedNotice.keyDates.length > 0 && (
                  <div style={{
                    backgroundColor: 'var(--limestone)',
                    padding: '20px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '24px'
                  }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-900)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                      {ui.cfp.keyDatesTitle}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedNotice.keyDates.map((kd, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                          <span style={{ color: 'var(--slate-600)' }}>{kd.label}</span>
                          <strong style={{ color: 'var(--symposium-blue)', fontFamily: 'var(--font-mono)' }}>{kd.date}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => onOpenRegister('paper')}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px 24px', justifyContent: 'center' }}
                >
                  <span>{ui.cfp.submitCta}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Guidelines Box */}
              <div style={{
                padding: '24px',
                backgroundColor: 'var(--limestone)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '12px' }}>
                  {ui.cfp.guidelinesTitle}
                </h3>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--ink-700)', lineHeight: 1.6 }}>
                  {defaultGuidelines.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
