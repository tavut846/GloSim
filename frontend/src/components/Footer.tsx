import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { GlobalSettings, Locale } from '../types';
import asiasimLogo from '../assets/asiasim.png';

interface FooterProps {
  global?: GlobalSettings | null;
  locale: Locale;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ locale, onNavigate }) => {
  const isZh = locale === 'zh-Hans';

  const defaultNav = [
    { label: isZh ? '首页' : 'Home', href: '/' },
    { label: isZh ? '组织机构' : 'Organization', href: '/about' },
    { label: isZh ? '会议日程' : 'Conference Schedule', href: '/schedule' },
    { label: isZh ? '论文征集' : 'Call for Papers', href: '/call-for-papers' },
    { label: isZh ? '往届会议' : 'Past Conferences', href: '/past-conferences' }
  ];

  return (
    <footer style={{
      backgroundColor: '#050c1e',
      color: '#D1D5DB',
      paddingTop: '48px',
      paddingBottom: '32px',
      marginTop: 'auto',
      borderTop: '3px solid #1B3A6B'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Col 1: 主办单位 / Host */}
          <div>
            <h4 style={{ 
              color: '#FFFFFF', 
              fontSize: '1rem', 
              fontWeight: 700, 
              letterSpacing: '0.04em', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ width: '4px', height: '16px', backgroundColor: '#38bdf8', borderRadius: '2px', display: 'inline-block' }} />
              {isZh ? '主办单位' : 'Host'}
            </h4>
            
            <a
              href="http://www.asiasim.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 12px',
                backgroundColor: '#020817',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                marginBottom: '14px',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#38bdf8')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
              title={isZh ? '访问亚洲仿真联盟官网' : 'Visit Asia Simulation Federation Website'}
            >
              <img
                src={asiasimLogo}
                alt="ASIASIM 亚洲仿真联盟"
                style={{ height: '32px', width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </a>
            
            <div style={{ marginBottom: '6px' }}>
              <a
                href="http://www.asiasim.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#38bdf8',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#7dd3fc')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#38bdf8')}
              >
                <span>{isZh ? '亚洲仿真联盟 (ASIASIM)' : 'Asia Simulation Federation (ASIASIM)'}</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <p style={{ fontSize: '0.825rem', color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>
              {isZh 
                ? '以“开放、创新、协同、包容、共赢”为理念，致力于促进全球仿真技术进步与产业交流。' 
                : 'Guided by "Openness, Innovation, Collaboration, Inclusiveness, and Mutual Benefit" to advance global simulation technologies.'}
            </p>
          </div>

          {/* Col 2: 菜单 / Menu */}
          <div>
            <h4 style={{ 
              color: '#FFFFFF', 
              fontSize: '1rem', 
              fontWeight: 700, 
              letterSpacing: '0.04em', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ width: '4px', height: '16px', backgroundColor: '#38bdf8', borderRadius: '2px', display: 'inline-block' }} />
              {isZh ? '菜单' : 'Menu'}
            </h4>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {defaultNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.href);
                    }}
                    style={{
                      color: '#9CA3AF',
                      fontSize: '0.875rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: 联系我们 / Contact us */}
          <div>
            <h4 style={{ 
              color: '#FFFFFF', 
              fontSize: '1rem', 
              fontWeight: 700, 
              letterSpacing: '0.04em', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ width: '4px', height: '16px', backgroundColor: '#38bdf8', borderRadius: '2px', display: 'inline-block' }} />
              {isZh ? '联系我们' : 'Contact us'}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#E5E7EB' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} style={{ flexShrink: 0, color: '#38bdf8' }} />
                <span>
                  <strong style={{ color: '#F3F4F6' }}>{isZh ? '孙老师' : 'Teacher Sun'}:</strong> +86-13588210860
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} style={{ flexShrink: 0, color: '#38bdf8' }} />
                <span>
                  <strong style={{ color: '#F3F4F6' }}>{isZh ? '赵老师' : 'Teacher Zhao'}:</strong> +86-15540158851
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ flexShrink: 0, color: '#38bdf8' }} />
                <span>
                  <strong style={{ color: '#F3F4F6' }}>{isZh ? '邮箱' : 'Email'}:</strong>{' '}
                  <a href="mailto:asiasim0106@163.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>
                    asiasim0106@163.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          paddingTop: '24px',
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
            <span>© {new Date().getFullYear()} {isZh ? '亚洲仿真联盟 (ASIASIM) · 2026世界仿真大会 (GloSim 2026)' : 'Asia Simulation Federation (ASIASIM) · 2026 Global Simulation Conference (GloSim 2026)'}. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Hangzhou, China</span>
            <span>2026.11.13–16</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
