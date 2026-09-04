import { Locale, GlobalSettings, HomePageData, OrgOverviewData, Leader, MemberInstitution, Conference, Notice } from '../types';

const STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_URL as string) || 'http://localhost:1337';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private async get<T>(endpoint: string, locale: Locale): Promise<T | null> {
    try {
      const strapiLocale = locale === 'zh-Hans' ? 'zh-Hans' : 'en';
      const sep = endpoint.includes('?') ? '&' : '?';
      const url = `${this.baseUrl}/api/${endpoint}${sep}locale=${strapiLocale}&populate=*`;

      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        console.warn(`[API] Failed to fetch ${url}: HTTP ${res.status}`);
        return null;
      }

      const json = await res.json();
      return json;
    } catch (err) {
      console.warn(`[API] Network error fetching ${endpoint}:`, err);
      return null;
    }
  }

  // Unwrap Strapi Single Type response
  private unwrapSingle<T>(response: any): T | null {
    if (!response || !response.data) return null;
    return (response.data.attributes ? { id: response.data.id, ...response.data.attributes } : response.data) as T;
  }

  // Unwrap Strapi Collection Type response
  private unwrapCollection<T>(response: any): T[] {
    if (!response || !response.data || !Array.isArray(response.data)) return [];
    return response.data.map((item: any) =>
      item.attributes ? { id: item.id, ...item.attributes } : item
    ) as T[];
  }

  // 1. Global Settings
  async getGlobal(locale: Locale): Promise<GlobalSettings | null> {
    const res = await this.get('global', locale);
    return this.unwrapSingle<GlobalSettings>(res);
  }

  // 2. Home Page Data
  async getHomePage(locale: Locale): Promise<HomePageData | null> {
    const res = await this.get('home-page', locale);
    return this.unwrapSingle<HomePageData>(res);
  }

  // 3. Organization Overview Data
  async getOrgOverview(locale: Locale): Promise<OrgOverviewData | null> {
    const res = await this.get('org-overview', locale);
    return this.unwrapSingle<OrgOverviewData>(res);
  }

  // 4. Leaders List
  async getLeaders(locale: Locale): Promise<Leader[]> {
    const res = await this.get('leaders?sort=order:asc', locale);
    return this.unwrapCollection<Leader>(res);
  }

  // 5. Member Institutions List
  async getMembers(locale: Locale): Promise<MemberInstitution[]> {
    const res = await this.get('member-institutions?sort=order:asc', locale);
    return this.unwrapCollection<MemberInstitution>(res);
  }

  // 6. Conferences List
  async getConferences(locale: Locale): Promise<Conference[]> {
    const res = await this.get('conferences?sort=year:desc', locale);
    return this.unwrapCollection<Conference>(res);
  }

  // 7. Notices (Call for Papers) List
  async getNotices(locale: Locale): Promise<Notice[]> {
    const res = await this.get('notices?sort=publishDate:desc', locale);
    return this.unwrapCollection<Notice>(res);
  }
}

export const api = new ApiService(STRAPI_BASE_URL);
