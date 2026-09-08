import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Conference, Locale } from '../types';

interface CountdownBannerProps {
  conference?: Conference;
  onViewSchedule: () => void;
  onSubmitCfp: () => void;
  eyebrow: string;
  countdownLabel: string;
  viewScheduleText: string;
  submitCfpText: string;
  locale?: Locale;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({
  conference,
  onViewSchedule,
  onSubmitCfp,
  eyebrow,
  countdownLabel,
  viewScheduleText,
  submitCfpText,
  locale = 'zh-Hans',
}) => {
  if (!conference) return null;

  const isEn = locale === 'en';

  // Calculate days left to target start date
  const [daysLeft, setDaysLeft] = useState(40);

  useEffect(() => {
    try {
      const target = new Date(conference.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
      setDaysLeft(diff > 0 ? diff : 40);
    } catch {
      setDaysLeft(40);
    }
  }, [conference.startDate]);

  // Robust bilingual mapping
  const edition = isEn
    ? (conference.edition.includes('第十届') ? '10th Annual Assembly' : conference.edition)
    : conference.edition;

  const title = isEn
    ? (conference.title.includes('第十届') ? '10th Global Simulation Conference (GloSim 2026)' : conference.title)
    : conference.title;

  const location = isEn
    ? (conference.location.includes('北京') ? 'Beijing, China' : conference.location)
    : conference.location;

  const venue = isEn
    ? (conference.venue.includes('国家会议中心') ? 'China National Convention Center · Auditorium 3' : conference.venue)
    : conference.venue;

  return (
    <section style={{
      backgroundColor: 'var(--symposium-blue)',
      color: 'var(--white)',
      padding: '20px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px 24px'
      }}>
        {/* Info */}
        <div style={{ flex: '1 1 340px' }}>
          <span style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'rgba(255, 255, 255, 0.75)',
            fontWeight: 600
          }}>
            {eyebrow} · {edition}
          </span>
          <h3 style={{
            margin: '4px 0 6px',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--white)',
            lineHeight: 1.3
          }}>
            {title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={14} /> {conference.startDate} ~ {conference.endDate}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={14} /> {location} ({venue})
            </span>
          </div>
        </div>

        {/* Countdown counter + CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', padding: '0 8px' }}>
            <div style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              color: 'var(--white)',
              lineHeight: 1,
              fontFamily: 'var(--font-mono)'
            }}>
              {daysLeft}
            </div>
            <div style={{
              fontSize: '10.5px',
              color: 'rgba(255, 255, 255, 0.75)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginTop: '4px'
            }}>
              {countdownLabel}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={onViewSchedule}
              className="btn-ghost-white"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              {viewScheduleText}
            </button>
            <button
              onClick={onSubmitCfp}
              className="btn-warm"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              <span>{submitCfpText}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
