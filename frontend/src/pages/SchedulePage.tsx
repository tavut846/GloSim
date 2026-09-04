import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User } from 'lucide-react';
import { Conference, Locale } from '../types';
import { zhUi } from '../locales/zh';
import { enUi } from '../locales/en';

interface SchedulePageProps {
  locale: Locale;
  conference?: Conference;
  onOpenRegister: (type: 'delegate' | 'paper') => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  locale,
  conference,
  onOpenRegister
}) => {
  const ui = locale === 'zh-Hans' ? zhUi : enUi;
  const [activeDay, setActiveDay] = useState<string>('Day 1');

  if (!conference) {
    return (
      <div className="container" style={{ padding: '64px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--slate-600)' }}>
          {ui.schedule.noSchedule}
        </p>
      </div>
    );
  }

  const agendaItems = conference.agendaItems || [];
  const days = Array.from(new Set(agendaItems.map(item => item.day)));

  const filteredAgenda = activeDay === 'ALL'
    ? agendaItems
    : agendaItems.filter(item => item.day === activeDay);

  const getTagStyle = (tag?: string) => {
    switch (tag) {
      case 'PLENARY': return { bg: '#E0E7FF', text: '#3730A3' };
      case 'SIMULATION': return { bg: '#FEE2E2', text: '#991B1B' };
      case 'NEGOTIATION': return { bg: '#FEF3C7', text: '#92400E' };
      case 'PANEL': return { bg: '#ECFDF5', text: '#065F46' };
      default: return { bg: 'var(--limestone)', text: 'var(--ink-700)' };
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      {/* Header Banner */}
      <section style={{
        padding: '56px 0 48px',
        backgroundColor: 'var(--limestone)',
        borderBottom: '1px solid var(--border-default)'
      }} className="bg-network">
        <div className="container" style={{ maxWidth: '960px' }}>
          <span className="badge-caps" style={{ color: 'var(--symposium-blue)', marginBottom: '8px' }}>
            {ui.schedule.eyebrow} · {conference.edition}
          </span>
          <h1 style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 'var(--weight-extrabold)',
            color: 'var(--ink-900)',
            margin: '10px 0 16px',
            lineHeight: 1.2
          }}>
            {conference.title}
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            backgroundColor: 'var(--white)',
            padding: '20px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            boxShadow: 'var(--shadow-card)',
            marginTop: '24px'
          }}>
            <div>
              <span className="badge-caps" style={{ color: 'var(--slate-600)' }}>{ui.schedule.dateLabel}</span>
              <p style={{ fontWeight: 600, color: 'var(--ink-900)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} color="var(--symposium-blue)" />
                <span>{conference.startDate} ~ {conference.endDate}</span>
              </p>
            </div>
            <div>
              <span className="badge-caps" style={{ color: 'var(--slate-600)' }}>{ui.schedule.venueLabel}</span>
              <p style={{ fontWeight: 600, color: 'var(--ink-900)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="var(--symposium-blue)" />
                <span>{conference.location} {conference.venue && `(${conference.venue})`}</span>
              </p>
            </div>
            <div>
              <span className="badge-caps" style={{ color: 'var(--slate-600)' }}>{ui.schedule.themeLabel}</span>
              <p style={{ fontWeight: 600, color: 'var(--symposium-blue)', marginTop: '4px' }}>
                {conference.theme}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Agenda Timeline */}
      <section style={{ padding: '56px 0 72px' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            borderBottom: '2px solid var(--slate-200)',
            paddingBottom: '16px',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  style={{
                    padding: '10px 22px',
                    fontSize: '15px',
                    fontWeight: activeDay === day ? 700 : 500,
                    backgroundColor: activeDay === day ? 'var(--symposium-blue)' : 'var(--limestone)',
                    color: activeDay === day ? 'var(--white)' : 'var(--ink-700)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: activeDay === day ? 'var(--symposium-blue)' : 'var(--border-default)'
                  }}
                >
                  {day}
                </button>
              ))}
              <button
                onClick={() => setActiveDay('ALL')}
                style={{
                  padding: '10px 22px',
                  fontSize: '15px',
                  fontWeight: activeDay === 'ALL' ? 700 : 500,
                  backgroundColor: activeDay === 'ALL' ? 'var(--symposium-blue)' : 'var(--limestone)',
                  color: activeDay === 'ALL' ? 'var(--white)' : 'var(--ink-700)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  borderColor: activeDay === 'ALL' ? 'var(--symposium-blue)' : 'var(--border-default)'
                }}
              >
                {ui.schedule.filterAllDays}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => onOpenRegister('delegate')}
                className="btn-warm"
                style={{ padding: '10px 20px', fontSize: '14px' }}
              >
                {ui.schedule.registerCta}
              </button>
            </div>
          </div>

          {/* Agenda Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredAgenda.map((item, idx) => {
              const tagStyle = getTagStyle(item.tag);
              return (
                <div
                  key={idx}
                  className="card-academic"
                  style={{
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr',
                    gap: '24px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--symposium-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Clock size={16} />
                      <span>{item.time}</span>
                    </div>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '6px',
                      fontSize: '12px',
                      color: 'var(--slate-600)',
                      fontWeight: 500
                    }}>
                      {item.day} {item.date && `· ${item.date}`}
                    </span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.3 }}>
                        {item.title}
                      </h3>
                      {item.tag && (
                        <span style={{
                          backgroundColor: tagStyle.bg,
                          color: tagStyle.text,
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          flexShrink: 0
                        }}>
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: 'var(--slate-600)', marginTop: '8px' }}>
                      {item.speaker && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <User size={14} color="var(--symposium-blue)" />
                          <strong style={{ color: 'var(--ink-900)' }}>{item.speaker}</strong>
                        </span>
                      )}
                      {item.location && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={14} color="var(--warm-accent)" />
                          <span>{item.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Keynote Speakers */}
          {conference.speakers && conference.speakers.length > 0 && (
            <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid var(--border-default)' }}>
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
                <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                  DISTINGUISHED FACULTY
                </span>
                <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-bold)', color: 'var(--ink-900)', marginTop: '4px' }}>
                  {ui.schedule.speakersTitle}
                </h2>
                <p style={{ fontSize: 'var(--text-body-md)', color: 'var(--slate-600)' }}>
                  {ui.schedule.speakersSubtitle}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {conference.speakers.map((spk, idx) => (
                  <div key={idx} className="card-academic" style={{ padding: '24px', textAlign: 'center' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--symposium-blue)',
                      color: '#FFF',
                      fontSize: '20px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px'
                    }}>
                      {spk.name.slice(0, 1)}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink-900)' }}>{spk.name}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--symposium-blue)', fontWeight: 600, marginTop: '2px' }}>{spk.title}</p>
                    <p style={{ fontSize: '12px', color: 'var(--slate-600)', marginTop: '2px' }}>{spk.affiliation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
