import React, { useState } from 'react';
import { MapPin, Download, FileText } from 'lucide-react';
import { Conference, Locale } from '../types';
import { zhUi } from '../locales/zh';
import { enUi } from '../locales/en';

interface PastConferencesPageProps {
  locale: Locale;
  pastConferences: Conference[];
}

export const PastConferencesPage: React.FC<PastConferencesPageProps> = ({
  locale,
  pastConferences
}) => {
  const ui = locale === 'zh-Hans' ? zhUi : enUi;
  const [activeConfId, setActiveConfId] = useState<string | number>(pastConferences[0]?.id || '');

  const selectedConf = pastConferences.find(c => c.id === activeConfId) || pastConferences[0];

  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      {/* Header Banner */}
      <section style={{
        padding: '56px 0 48px',
        backgroundColor: 'var(--limestone)',
        borderBottom: '1px solid var(--border-default)'
      }} className="bg-network">
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span className="badge-caps" style={{ color: 'var(--symposium-blue)', marginBottom: '8px' }}>
            {ui.past.eyebrow}
          </span>
          <h1 style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 'var(--weight-extrabold)',
            color: 'var(--ink-900)',
            margin: '12px 0 16px'
          }}>
            {ui.past.title}
          </h1>
          <p style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--ink-700)',
            lineHeight: 'var(--leading-body)'
          }}>
            {ui.past.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '56px 0 72px' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'flex-start'
        }}>
          {/* Left: Past Conference Editions */}
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '20px', borderBottom: '1px solid var(--slate-200)', paddingBottom: '10px' }}>
              {ui.past.listTitle}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pastConferences.map((conf) => {
                const isSelected = (activeConfId === conf.id) || (!activeConfId && selectedConf?.id === conf.id);
                return (
                  <div
                    key={conf.id}
                    onClick={() => setActiveConfId(conf.id || '')}
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
                        {conf.edition}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--ink-900)' }}>
                        {conf.year}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '6px' }}>
                      {conf.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--slate-600)', marginBottom: '10px' }}>
                      <MapPin size={13} />
                      <span>{conf.location} {conf.venue && `(${conf.venue})`}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--ink-700)', lineHeight: 1.5 }}>
                      {conf.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Conference Detail */}
          {selectedConf && (
            <div>
              <div className="card-academic" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                      {selectedConf.edition} · {selectedConf.year}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--slate-600)' }}>
                      {selectedConf.startDate} ~ {selectedConf.endDate}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink-900)', marginBottom: '12px' }}>
                    {selectedConf.title}
                  </h2>

                  <div style={{
                    backgroundColor: 'var(--limestone)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '20px',
                    fontSize: '13px',
                    color: 'var(--symposium-blue)',
                    fontWeight: 600
                  }}>
                    {ui.past.themePrefix} {selectedConf.theme}
                  </div>

                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-900)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    {ui.past.recapTitle}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--ink-700)', lineHeight: 1.7, marginBottom: '28px' }}>
                    {selectedConf.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
