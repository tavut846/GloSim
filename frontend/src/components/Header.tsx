import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Locale, NavItem } from '../types';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  locale: Locale;
  onToggleLocale: (newLocale: Locale) => void;
  navItems: NavItem[];
  orgShort: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  locale,
  onToggleLocale,
  navItems,
  orgShort
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    onNavigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'var(--white)',
      borderBottom: '1px solid var(--border-default)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand Logo & Title */}
        <div 
          onClick={() => handleNavClick('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--symposium-blue)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '14px',
            letterSpacing: '0.05em'
          }}>
            IF
          </div>
          <span style={{
            fontWeight: 'var(--weight-bold)',
            fontSize: '1.05rem',
            color: 'var(--ink-900)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em'
          }}>
            {orgShort || (locale === 'zh-Hans' ? 'GloSim 学会' : 'GloSim Federation')}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px'
        }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                style={{
                  fontSize: 'var(--text-body-md)',
                  fontWeight: isActive ? 'var(--weight-bold)' : 'var(--weight-medium)',
                  color: isActive ? 'var(--symposium-blue)' : 'var(--ink-900)',
                  borderBottom: isActive ? '2px solid var(--symposium-blue)' : '2px solid transparent',
                  padding: '8px 2px',
                  transition: 'all var(--duration-fast)'
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Language Switcher & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--limestone)',
            borderRadius: 'var(--radius-pill)',
            padding: '3px',
            border: '1px solid var(--border-default)'
          }}>
            <button
              onClick={() => onToggleLocale('en')}
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: locale === 'en' ? 700 : 500,
                color: locale === 'en' ? 'var(--symposium-blue)' : 'var(--slate-600)',
                backgroundColor: locale === 'en' ? 'var(--white)' : 'transparent',
                borderRadius: 'var(--radius-pill)',
                boxShadow: locale === 'en' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                transition: 'all var(--duration-fast)'
              }}
            >
              EN
            </button>
            <button
              onClick={() => onToggleLocale('zh-Hans')}
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: locale === 'zh-Hans' ? 700 : 500,
                color: locale === 'zh-Hans' ? 'var(--symposium-blue)' : 'var(--slate-600)',
                backgroundColor: locale === 'zh-Hans' ? 'var(--white)' : 'transparent',
                borderRadius: 'var(--radius-pill)',
                boxShadow: locale === 'zh-Hans' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                transition: 'all var(--duration-fast)'
              }}
            >
              中文
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              padding: '6px',
              display: 'none',
              color: 'var(--ink-900)'
            }}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: 0,
          right: 0,
          backgroundColor: 'var(--white)',
          borderBottom: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-dropdown)',
          padding: '16px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 49
        }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                style={{
                  fontSize: '1rem',
                  fontWeight: isActive ? 'var(--weight-bold)' : 'var(--weight-medium)',
                  color: isActive ? 'var(--symposium-blue)' : 'var(--ink-900)',
                  padding: '6px 0',
                  borderBottom: '1px solid var(--limestone)'
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
