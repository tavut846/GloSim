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

  // Calculate days left to target start date from backend conference
  const [daysLeft, setDaysLeft] = useState<number>(() => {
    if (!conference?.startDate) return 0;
    try {
      const target = new Date(`${conference.startDate}T09:00:00+08:00`).getTime();
      const now = Date.now();
      const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      return Math.max(0, diff);
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    if (!conference?.startDate) return;
    try {
      const target = new Date(`${conference.startDate}T09:00:00+08:00`).getTime();
      const now = Date.now();
      const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      setDaysLeft(Math.max(0, diff));
    } catch {
      setDaysLeft(0);
    }
  }, [conference?.startDate]);

  // Robust dynamic conference data mapping from backend
  const defaultEditionZh = '第十届年会';
  const defaultEditionEn = '10th Annual Assembly';
  const rawEdition = conference.edition || (isEn ? defaultEditionEn : defaultEditionZh);
  const edition = isEn
    ? (rawEdition.includes('第十届') ? '10th Annual Assembly' : rawEdition)
    : rawEdition;

  const defaultTitleZh = '世界仿真大会（GloSim 2026）';
  const defaultTitleEn = '10th Global Simulation Conference (GloSim 2026)';
  const rawTitle = conference.title || (isEn ? defaultTitleEn : defaultTitleZh);
  const title = isEn
    ? (/[\u4e00-\u9fa5]/.test(rawTitle) ? '10th Global Simulation Conference (GloSim 2026)' : rawTitle)
    : rawTitle;

  const defaultLocationZh = '中国 · 杭州';
  const defaultLocationEn = 'Hangzhou, China';
  const rawLocation = conference.location || (isEn ? defaultLocationEn : defaultLocationZh);
  const location = isEn
    ? (/[\u4e00-\u9fa5]/.test(rawLocation) 
        ? (rawLocation.includes('杭州') ? 'Hangzhou, China' : (rawLocation.includes('北京') ? 'Beijing, China' : 'Hangzhou, China')) 
        : rawLocation)
    : rawLocation;

  const defaultVenueZh = '杭州市北京航空航天大学国际创新研究院';
  const defaultVenueEn = 'Hangzhou International Innovation Institute of Beihang University';
  const rawVenue = conference.venue || (isEn ? defaultVenueEn : defaultVenueZh);
  const venue = isEn
    ? (/[\u4e00-\u9fa5]/.test(rawVenue) 
        ? (rawVenue.includes('创新研究院') || rawVenue.includes('北航') ? 'Hangzhou International Innovation Institute of Beihang University' : (rawVenue.includes('国家会议中心') ? 'China National Convention Center · Auditorium 3' : rawVenue)) 
        : rawVenue)
    : rawVenue;

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
            {eyebrow}{edition ? ` · ${edition}` : ''}
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
