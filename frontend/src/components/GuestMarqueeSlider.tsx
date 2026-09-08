import React from 'react';
import { Locale, GuestItem } from '../types';

interface GuestMarqueeSliderProps {
  locale: Locale;
  title?: string;
  subtitle?: string;
  guests?: GuestItem[];
}

const STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_URL as string) || 'http://localhost:1337';

const DEFAULT_GUESTS_ZH: GuestItem[] = [
  {
    name: '张霖 教授',
    title: '大会总主席 · 亚洲仿真联盟主席',
    affiliation: '北京航空航天大学',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Dr. Eleanor Vance',
    title: '特邀主旨演讲嘉宾',
    affiliation: '牛津大学 纳菲尔德学院',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: '李承载 教授',
    title: '计算决策分论坛主席',
    affiliation: '新加坡国立大学 李光耀公共政策学院',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Prof. Takao Terano',
    title: '国际学术顾问委员会委员',
    affiliation: '东京工业大学 / 日本仿真学会 (JSST)',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Prof. Agostino Bruzzone',
    title: '复杂系统仿真先锋',
    affiliation: '热那亚大学 / 欧洲仿真联盟 (EUROSIM)',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Dr. Marcus Thorne',
    title: '生成式数字孪生实验室主任',
    affiliation: 'MIT Media Lab / SCS Fellow',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: '王军平 教授',
    title: '虚拟仿真与沉浸交互首席科学家',
    affiliation: '虚拟现实技术与系统全国重点实验室',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Dr. Sophie Laurent',
    title: '多边协商推演分会主席',
    affiliation: '巴黎政治大学 (Sciences Po)',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  }
];

const DEFAULT_GUESTS_EN: GuestItem[] = [
  {
    name: 'Prof. Lin Zhang',
    title: 'General Congress Chair · President of ASIASIM',
    affiliation: 'Beihang University',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Dr. Eleanor Vance',
    title: 'Distinguished Keynote Speaker',
    affiliation: 'Nuffield College, University of Oxford',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Prof. Seung-Jae Lee',
    title: 'Chair of Computational Governance Track',
    affiliation: 'Lee Kuan Yew School of Public Policy, NUS',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Prof. Takao Terano',
    title: 'Member of International Advisory Board',
    affiliation: 'Tokyo Tech / Past President of JSST',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Prof. Agostino Bruzzone',
    title: 'Pioneer of Complex System Simulation',
    affiliation: 'University of Genoa / Board Member of EUROSIM',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Dr. Marcus Thorne',
    title: 'Director of Generative Digital Twins Lab',
    affiliation: 'MIT Media Lab / SCS Fellow',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Prof. Junping Wang',
    title: 'Chief Scientist of Immersive Simulation',
    affiliation: 'State Key Lab of Virtual Reality Technology',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Dr. Sophie Laurent',
    title: 'Chair of Multilateral Modeling Symposia',
    affiliation: 'Sciences Po Paris',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  }
];

function resolveImageUrl(photo: any, fallbackUrl?: string): string {
  if (photo) {
    if (typeof photo === 'string') {
      return photo.startsWith('http') ? photo : `${STRAPI_BASE_URL}${photo}`;
    }
    const rawUrl = photo.data?.attributes?.url || photo.url;
    if (rawUrl) {
      return rawUrl.startsWith('http') ? rawUrl : `${STRAPI_BASE_URL}${rawUrl}`;
    }
  }
  return fallbackUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
}

export const GuestMarqueeSlider: React.FC<GuestMarqueeSliderProps> = ({
  locale,
  title,
  subtitle,
  guests
}) => {
  const isZh = locale === 'zh-Hans';

  const sectionEyebrow = isZh
    ? '2025 GUEST SPOTLIGHT · 往届重磅嘉宾'
    : '2025 GUEST SPOTLIGHT';

  const defaultTitle = isZh
    ? '重磅嘉宾回顾 · 2025世界仿真大会'
    : 'Spotlight on Guests: 2025 International Simulation Conference';

  const defaultSubtitle = isZh
    ? '汇聚全球顶尖仿真科学家、知名学者与产业创新先锋，共享学术前沿思想'
    : 'Convening leading international simulation scientists, esteemed faculty, and industry pioneers.';

  const displayTitle = title || defaultTitle;
  const displaySubtitle = subtitle || defaultSubtitle;

  const guestList = guests && guests.length > 0 ? guests : (isZh ? DEFAULT_GUESTS_ZH : DEFAULT_GUESTS_EN);

  // Duplicate guests for seamless infinite marquee loop
  const marqueeGuests = [...guestList, ...guestList];

  return (
    <section className="relative w-full py-16 bg-white overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="badge-caps inline-block text-[var(--symposium-blue)] mb-2 tracking-wider">
          {sectionEyebrow}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#00186b] tracking-tight">
          {displayTitle}
        </h2>
        <div className="w-16 h-1 bg-[#1B3A6B] mx-auto mt-3 rounded-full mb-3" />
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600">
          {displaySubtitle}
        </p>
      </div>

      {/* Marquee Container with subtle gradient edge fades */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex w-max guest-marquee-track hover:[animation-play-state:paused]">
          {marqueeGuests.map((guest, idx) => {
            const imgUrl = resolveImageUrl(guest.photo, guest.photoUrl);
            return (
              <div
                key={`${guest.name}-${idx}`}
                className="flex-shrink-0 w-64 sm:w-72 mx-3 sm:mx-4 p-5 rounded-2xl bg-[#f8fafc] border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Image Container with Subtle Hover Zoom */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 rounded-full overflow-hidden p-1 bg-gradient-to-br from-[#1B3A6B] via-[#0284c7] to-[#38bdf8] shadow-sm">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                    <img
                      src={imgUrl}
                      alt={guest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Name directly underneath image */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#00186b] transition-colors leading-snug mb-1">
                  {guest.name}
                </h3>

                {/* Title */}
                {guest.title && (
                  <p className="text-xs sm:text-[13px] font-medium text-[#0284c7] mb-1 line-clamp-2">
                    {guest.title}
                  </p>
                )}

                {/* Affiliation */}
                {guest.affiliation && (
                  <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1">
                    {guest.affiliation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee Animation Styles */}
      <style>{`
        @keyframes guestMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .guest-marquee-track {
          animation: guestMarquee 35s linear infinite;
        }
        .guest-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
