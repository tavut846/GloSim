import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { GlobalSettings, Locale } from '../types';

interface FooterProps {
  global?: GlobalSettings | null;
  locale: Locale;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ global, locale, onNavigate }) => {
  const isZh = locale === 'zh-Hans';

  const defaultNav = [
    { label: isZh ? '首页' : 'Home', href: '/' },
    { label: isZh ? '学会架构' : 'Organization', href: '/about' },
    { label: isZh ? '会议日程' : 'Conference Schedule', href: '/schedule' },
    { label: isZh ? '论文征集' : 'Call for Papers', href: '/call-for-papers' },
    { label: isZh ? '往届会议' : 'Past Conferences', href: '/past-conferences' }
  ];

  const navLabels = global?.navLabels && global.navLabels.length > 0 ? global.navLabels : defaultNav;
  const siteName = global?.siteName || (isZh ? '国际模拟学术联合会' : 'International Federation for Global Simulation');
  const footerAbout = global?.footerAbout || (isZh ? '国际模拟学术联合会（GloSim）是致力于推动多边学术模拟、国际政策研讨与全球青年学者交流的非营利性学术联合组织。' : 'The International Federation for Global Simulation (GloSim) is a non-profit academic consortium dedicated to advancing multilateral negotiation simulations and policy research.');
  const contactEmail = global?.contactEmail || 'secretariat@glosim-conference.org';
  const contactPhone = global?.contactPhone || '+86 (010) 8832-7600';
  const address = global?.address || (isZh ? '北京市海淀区中关村南大街1号 · 国际学术交流中心 602室' : 'Room 602, International Academic Exchange Center, Beijing');

  return (
    <footer style={{
      backgroundColor: 'var(--ink-900)',
      color: '#D1D5DB',
      paddingTop: 'var(--space-3xl)',
      paddingBottom: 'var(--space-2xl)',
      marginTop: 'auto',
      borderTop: '3px solid var(--symposium-blue)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-2xl)',
          marginBottom: 'var(--space-2xl)'
        }}>
          {/* Col 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--symposium-blue)',
                color: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '13px'
              }}>
                IF
              </div>
              <span style={{ fontWeight: 'var(--weight-bold)', fontSize: '1.1rem', color: 'var(--white)' }}>
                {siteName}
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-body-sm)', lineHeight: 1.7, color: '#9CA3AF', marginBottom: '16px' }}>
              {footerAbout}
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '12px',
              color: '#E5E7EB'
            }}>
              <Globe size={14} color="#60A5FA" />
              <span>{isZh ? '140+ 全球成员院校' : '140+ Global Member Institutions'}</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Sections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLabels.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.href);
                    }}
                    style={{
                      color: '#9CA3AF',
                      fontSize: 'var(--text-body-sm)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color var(--duration-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Secretarial Office */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Secretariat
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: 'var(--text-body-sm)', color: '#9CA3AF' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} style={{ marginTop: '3px', flexShrink: 0, color: '#60A5FA' }} />
                <span>{address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ flexShrink: 0, color: '#60A5FA' }} />
                <a href={`mailto:${contactEmail}`} style={{ color: '#E5E7EB' }}>
                  {contactEmail}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} style={{ flexShrink: 0, color: '#60A5FA' }} />
                <span>{contactPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          paddingTop: 'var(--space-lg)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12px',
          color: '#6B7280'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>© {new Date().getFullYear()} {siteName} (GloSim). All rights reserved. Academic Non-Profit Organization.</span>
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 500,
              color: '#9CA3AF'
            }}>
              v{import.meta.env.VITE_APP_VERSION || '0.0.1'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Academic Code of Conduct</span>
            <span>ICP备20260825号</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
