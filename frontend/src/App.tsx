import React, { useState, useEffect } from 'react';
import { Locale, GlobalSettings, HomePageData, OrgOverviewData, Leader, MemberInstitution, Conference, Notice } from './types';
import { api } from './services/api';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RegisterModal } from './components/RegisterModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SchedulePage } from './pages/SchedulePage';
import { CallForPapersPage } from './pages/CallForPapersPage';
import { PastConferencesPage } from './pages/PastConferencesPage';
import { zhUi } from './locales/zh';
import { enUi } from './locales/en';
import asiasimLogo from './assets/asiasim.png';
import glosimLogo from './assets/glosim.png';

export const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>('zh-Hans');
  const [currentPath, setCurrentPath] = useState<string>('/');
  const ui = locale === 'zh-Hans' ? zhUi : enUi;

  // Backend API data state
  const [global, setGlobal] = useState<GlobalSettings | null>(null);
  const [homePage, setHomePage] = useState<HomePageData | null>(null);
  const [orgOverview, setOrgOverview] = useState<OrgOverviewData | null>(null);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [members, setMembers] = useState<MemberInstitution[]>([]);
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Register Modal state
  const [registerModal, setRegisterModal] = useState<{ isOpen: boolean; type: 'delegate' | 'paper' }>({
    isOpen: false,
    type: 'delegate'
  });

  // URL route parsing on popstate/mount
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/en')) {
        setLocale('en');
        const subPath = path.replace(/^\/en/, '') || '/';
        setCurrentPath(subPath);
      } else if (path.startsWith('/zh')) {
        setLocale('zh-Hans');
        const subPath = path.replace(/^\/zh/, '') || '/';
        setCurrentPath(subPath);
      } else {
        setCurrentPath(path || '/');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch data from Strapi API on locale change
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const [g, hp, oo, l, m, confs, n] = await Promise.all([
        api.getGlobal(locale),
        api.getHomePage(locale),
        api.getOrgOverview(locale),
        api.getLeaders(locale),
        api.getMembers(locale),
        api.getConferences(locale),
        api.getNotices(locale)
      ]);

      if (isMounted) {
        setGlobal(g);
        setHomePage(hp);
        setOrgOverview(oo);
        setLeaders(l);
        setMembers(m);
        setConferences(confs);
        setNotices(n);
        setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [locale]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    const prefix = locale === 'en' ? '/en' : '/zh';
    const fullPath = path === '/' ? prefix : `${prefix}${path}`;
    window.history.pushState({}, '', fullPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    const prefix = newLocale === 'en' ? '/en' : '/zh';
    const fullPath = currentPath === '/' ? prefix : `${prefix}${currentPath}`;
    window.history.pushState({}, '', fullPath);
  };

  const defaultNav = [
    { label: ui.nav.home, href: '/' },
    { label: ui.nav.about, href: '/about' },
    { label: ui.nav.schedule, href: '/schedule' },
    { label: ui.nav.cfp, href: '/call-for-papers' },
    { label: ui.nav.past, href: '/past-conferences' }
  ];
  const rawNavItems = (locale === 'zh-Hans' && global?.navLabels && global.navLabels.length > 0)
    ? global.navLabels
    : defaultNav;
  const navItems = rawNavItems.map(item => {
    if (item.href === '/about' || item.label === '学会架构') {
      return { ...item, label: ui.nav.about };
    }
    return item;
  });

  const currentConf = conferences.find(c => c.status === 'upcoming' || c.status === 'current') || conferences[0];
  const pastConfs = conferences.filter(c => c.status === 'past');

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--limestone)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          fontFamily: 'var(--font-sans)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--symposium-blue)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            height: '44px',
            boxSizing: 'border-box'
          }}>
            <img
              src={asiasimLogo}
              alt="AsiaSim"
              style={{ height: '28px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
            <img
              src={glosimLogo}
              alt="GloSim"
              style={{ height: '28px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>
          <span style={{ fontSize: '14px', color: 'var(--slate-600)', letterSpacing: '0.05em' }}>
            {ui.loading}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        locale={locale}
        onToggleLocale={handleToggleLocale}
        navItems={navItems}
        orgShort={global?.orgShort || ''}
      />

      {/* Main Routed Page */}
      <main style={{ flex: 1 }}>
        {currentPath === '/' && (
          <HomePage
            data={homePage}
            locale={locale}
            currentConference={currentConf}
            pastConferences={pastConfs}
            notices={notices}
            onNavigate={handleNavigate}
            onOpenRegister={(type) => setRegisterModal({ isOpen: true, type })}
          />
        )}
        {currentPath === '/about' && (
          <AboutPage
            data={orgOverview}
            locale={locale}
            leaders={leaders}
            members={members}
          />
        )}
        {currentPath === '/schedule' && (
          <SchedulePage
            locale={locale}
            conference={currentConf}
            onOpenRegister={(type) => setRegisterModal({ isOpen: true, type })}
          />
        )}
        {currentPath === '/call-for-papers' && (
          <CallForPapersPage
            locale={locale}
            notices={notices}
            onOpenRegister={(type) => setRegisterModal({ isOpen: true, type })}
          />
        )}
        {currentPath === '/past-conferences' && (
          <PastConferencesPage
            locale={locale}
            pastConferences={pastConfs}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        global={global}
        locale={locale}
        onNavigate={handleNavigate}
      />

      {/* Registration & Abstract Modal */}
      <RegisterModal
        isOpen={registerModal.isOpen}
        onClose={() => setRegisterModal({ ...registerModal, isOpen: false })}
        locale={locale}
        initialType={registerModal.type}
      />
    </div>
  );
};
