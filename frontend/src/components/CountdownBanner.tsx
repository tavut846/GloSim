import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Conference } from '../types';

interface CountdownBannerProps {
  conference?: Conference;
  onViewSchedule: () => void;
  onSubmitCfp: () => void;
  eyebrow: string;
  countdownLabel: string;
  viewScheduleText: string;
  submitCfpText: string;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({
  conference,
  onViewSchedule,
  onSubmitCfp,
  eyebrow,
  countdownLabel,
  viewScheduleText,
  submitCfpText,
}) => {
  if (!conference) return null;

  // Calculate days left to target start date
  const [daysLeft, setDaysLeft] = useState(54);

  useEffect(() => {
    try {
      const target = new Date(conference.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
      setDaysLeft(diff > 0 ? diff : 54);
    } catch {
      setDaysLeft(54);
    }
  }, [conference.startDate]);

  return (
    <section style={{
      backgroundColor: 'var(--symposium-blue)',
      color: 'var(--white)',
      padding: '28px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* Info */}
        <div style={{ flex: '1 1 340px' }}>
          <span style={{
            fontSize: 'var(--text-label-caps)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-caps)',
            color: 'rgba(255, 255, 255, 0.75)',
            fontWeight: 600
          }}>
            {eyebrow} · {conference.edition}
          </span>
          <h3 style={{
            margin: '6px 0 8px',
            fontSize: 'var(--text-h3)',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--white)',
            lineHeight: 1.25
          }}>
            {conference.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: 'var(--text-body-sm)', color: 'rgba(255, 255, 255, 0.85)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={15} /> {conference.startDate} ~ {conference.endDate}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={15} /> {conference.location} ({conference.venue})
            </span>
          </div>
        </div>

        {/* Countdown counter + CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', padding: '0 8px' }}>
            <div style={{
              fontSize: '2.75rem',
              fontWeight: 800,
              color: 'var(--white)',
              lineHeight: 1,
              fontFamily: 'var(--font-mono)'
            }}>
              {daysLeft}
            </div>
            <div style={{
              fontSize: '11px',
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
            >
              {viewScheduleText}
            </button>
            <button
              onClick={onSubmitCfp}
              className="btn-warm"
              style={{ padding: '11px 20px', fontSize: '14px' }}
            >
              <span>{submitCfpText}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
