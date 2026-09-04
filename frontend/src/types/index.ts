export type Locale = 'zh-Hans' | 'en';

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface HighlightStat {
  number: string;
  label: string;
  icon?: string;
}

export interface AgendaItem {
  day: string;
  date?: string;
  time: string;
  title: string;
  speaker?: string;
  location?: string;
  tag?: string;
}

export interface Speaker {
  name: string;
  title: string;
  affiliation?: string;
  bio?: string;
  photo?: string;
}

export interface Leader {
  id?: string | number;
  name: string;
  title: string;
  affiliation: string;
  bio: string;
  photo?: any;
  order?: number;
}

export interface MemberInstitution {
  id?: string | number;
  name: string;
  country: string;
  region: string;
  description: string;
  website?: string;
  logo?: any;
  order?: number;
}

export interface Conference {
  id?: string | number;
  title: string;
  edition: string;
  year: number;
  theme: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  status: 'upcoming' | 'current' | 'past';
  description: string;
  summary: string;
  coverImage?: any;
  gallery?: any[];
  agendaItems?: AgendaItem[];
  speakers?: Speaker[];
  attachments?: { name: string; url: string; size?: string }[];
}

export interface Notice {
  id?: string | number;
  title: string;
  category: string;
  publishDate: string;
  deadline: string;
  status: 'active' | 'closed';
  summary: string;
  body: string;
  keyDates?: { label: string; date: string }[];
  relatedConference?: any;
  attachments?: { name: string; url: string; size?: string }[];
}

export interface GlobalSettings {
  siteName: string;
  orgShort: string;
  navLabels?: NavItem[];
  footerAbout?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: SocialLink[];
  logo?: any;
}

export interface HomePageData {
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroTagline?: string;
  heroCtaPrimary?: string;
  heroCtaSecondary?: string;
  heroImage?: any;
  orgIntroTitle?: string;
  orgIntroBody?: string;
  orgVideoCaption?: string;
  orgVideo?: any;
  orgVideoUrl?: string;
  chairmanVideoCaption?: string;
  chairmanVideo?: any;
  chairmanVideoUrl?: string;
  highlights?: HighlightStat[];
}

export interface OrgOverviewData {
  title?: string;
  introText?: string;
  structureTitle?: string;
  structureDescription?: string;
  structureImage?: any;
  departments?: { name: string; role: string; desc: string }[];
}
