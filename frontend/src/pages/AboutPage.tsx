import React from 'react';
import { 
  Building2, 
  Award, 
  Globe, 
  Landmark, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { OrgOverviewData, Leader, MemberInstitution, Locale } from '../types';
import { HeroHeader } from '../components/HeroHeader';

interface AboutPageProps {
  data: OrgOverviewData | null;
  locale: Locale;
  leaders: Leader[];
  members: MemberInstitution[];
}

export const AboutPage: React.FC<AboutPageProps> = ({
  locale
}) => {
  const isZh = locale === 'zh-Hans';

  // 1. Host (主办单位)
  const hostData = {
    nameZh: '亚洲仿真联盟 (ASIASIM)',
    nameEn: 'Asia Simulation Federation (ASIASIM)',
    roleZh: '主办单位 · HOST',
    roleEn: 'CONFERENCE HOST',
    descZh: '亚洲最具学术权威的建模与仿真联合组织，致力于促进亚太及全球学术界、工业界的协同创新与深度合作。',
    descEn: 'The premier federated academic organization in Asia dedicated to advancing modeling and simulation across science, engineering, and global multilateral governance.'
  };

  // 2. Organizers (承办单位)
  const organizers = [
    {
      nameZh: '杭州市北京航空航天大学国际创新研究院',
      nameEn: 'Hangzhou International Innovation Institute of Beihang University',
      roleZh: '承办单位',
      roleEn: 'ORGANIZER',
      tagZh: '北航国新院',
      tagEn: 'Beihang 6IN',
    },
    {
      nameZh: '中国工业合作协会仿真技术产业分会',
      nameEn: 'Simulation Technology Committee of China Industrial Cooperation Association',
      roleZh: '承办单位',
      roleEn: 'ORGANIZER',
      tagZh: '行业分会',
      tagEn: 'Industry Branch',
    },
    {
      nameZh: '杭州云枢国创科技有限公司',
      nameEn: 'Hangzhou Yunshu Guochuang Technology Co., Ltd.',
      roleZh: '承办单位',
      roleEn: 'ORGANIZER',
      tagZh: '产研协同',
      tagEn: 'Tech Partner',
    }
  ];

  // 3. Co-Organizers: International (协办单位 - 国际机构)
  const coOrganizersIntl = [
    { nameZh: '日本仿真学会', nameEn: 'Japan Society for Simulation Technology', abbr: 'JSST', country: isZh ? '日本' : 'Japan' },
    { nameZh: '韩国仿真学会', nameEn: 'Korea Society for Simulation', abbr: 'KSS', country: isZh ? '韩国' : 'South Korea' },
    { nameZh: '新加坡仿真学会', nameEn: 'Society of Simulation and Gaming of Singapore', abbr: 'SSAGS', country: isZh ? '新加坡' : 'Singapore' },
    { nameZh: '马来西亚仿真学会', nameEn: 'Malaysian Simulation Society', abbr: 'MSS', country: isZh ? '马来西亚' : 'Malaysia' },
    { nameZh: '国际建模与仿真学会', nameEn: 'The Society for Modeling & Simulation International', abbr: 'SCS', country: isZh ? '国际组织' : 'International' },
    { nameZh: '欧洲仿真联盟', nameEn: 'Federation of European Simulation Societies', abbr: 'EUROSIM', country: isZh ? '欧洲联盟' : 'Europe' },
    { nameZh: '联合国可持续发展目标与领导力发展中心', nameEn: 'Global SDGs and Leadership Development Center', abbr: 'UN SDGs', country: isZh ? '联合国机构' : 'UN Affiliated' },
    { nameZh: '联合国附属空间科技教育亚太区域中心 (中国)', nameEn: 'Regional Centre for Space Science and Technology Education in Asia and the Pacific (China) (Affiliated to the United Nations)', abbr: 'RCSSTEAP', country: isZh ? '联合国机构' : 'UN Affiliated' }
  ];

  // 4. Co-Organizers: Domestic (协办单位 - 国内机构)
  const coOrganizersDomestic = [
    { nameZh: '中国仿真学会', nameEn: 'China Simulation Federation', level: isZh ? '国家一级学会' : 'National First-tier Society' },
    { nameZh: '中国工业合作协会', nameEn: 'China Industrial Cooperation Association', level: isZh ? '全国性社会团体' : 'National Association' },
    { nameZh: '天目山实验室', nameEn: 'Tianmushan Laboratory', level: isZh ? '浙江省高能级实验室' : 'Provincial Key Laboratory' },
    { nameZh: '虚拟现实技术与系统全国重点实验室', nameEn: 'State Key Laboratory of Virtual Reality Technology and Systems', level: isZh ? '全国重点实验室' : 'State Key Laboratory' },
    { nameZh: '可靠性与环境工程技术国家级重点实验室', nameEn: 'National Key Laboratory of Reliability and Environmental Engineering', level: isZh ? '国家级重点实验室' : 'National Key Laboratory' },
    { nameZh: '自旋芯片与技术全国重点实验室', nameEn: 'National Key Laboratory of Spintronics', level: isZh ? '全国重点实验室' : 'State Key Laboratory' }
  ];

  // 5. Advisory Committee (咨询委员会)
  const advisoryCommittee = [
    {
      nameZh: '李伯虎',
      nameEn: 'Bohu Li',
      titleZh: '中国工程院院士',
      titleEn: 'Academician of the Chinese Academy of Engineering',
      honorZh: '中国工程院院士',
      honorEn: 'CAE Academician',
    },
    {
      nameZh: '赵沁平',
      nameEn: 'Qinping Zhao',
      titleZh: '中国工程院院士',
      titleEn: 'Academician of the Chinese Academy of Engineering',
      honorZh: '中国工程院院士',
      honorEn: 'CAE Academician',
    },
    {
      nameZh: '王自力',
      nameEn: 'Zili Wang',
      titleZh: '中国工程院院士',
      titleEn: 'Academician of the Chinese Academy of Engineering',
      honorZh: '中国工程院院士',
      honorEn: 'CAE Academician',
    },
    {
      nameZh: 'Axel Lehmann',
      nameEn: 'Axel Lehmann',
      titleZh: '德国慕尼黑国防军大学 教授',
      titleEn: 'Professor, Bundeswehr University Munich, Germany',
      honorZh: '国际仿真著名学者',
      honorEn: 'Distinguished Professor',
    },
    {
      nameZh: 'M. Jamal Deen',
      nameEn: 'M. Jamal Deen',
      titleZh: '中国科学院外籍院士 / 加拿大科学院与工程院两院院士',
      titleEn: 'Foreign Member of Chinese Academy of Sciences / Fellow of RSC & CAE',
      honorZh: '中科院外籍院士 · 加拿大两院院士',
      honorEn: 'CAS Foreign Member · RSC/CAE Fellow',
    },
    {
      nameZh: '龚维希',
      nameEn: 'Weixi Gong',
      titleZh: '联合国工业发展组织前司长 / 北航中欧合作委员会委员',
      titleEn: 'Former Director, UNIDO / Member of Beihang Europe-China Cooperation Committee',
      honorZh: '联合国高级国际专家',
      honorEn: 'UN Senior Expert',
    }
  ];

  // 6. Conference Chairs (大会主席)
  const conferenceChairs = [
    {
      nameZh: '张霖',
      nameEn: 'Lin Zhang',
      titlesZh: [
        '亚洲仿真联盟理事长',
        '北京航空航天大学 教授',
        '北航国新院国际仿真技术科创中心 主任'
      ],
      titlesEn: [
        'President of Asia Simulation Federation (AsiaSim)',
        'Professor at Beihang University',
        'Director of International Simulation Technology Innovation Center (Hangzhou International Innovation Institute of Beihang University)'
      ],
      badgeZh: '大会主席 · General Chair',
      badgeEn: 'General Conference Chair'
    },
    {
      nameZh: 'Gregory Zacharewicz',
      nameEn: 'Gregory Zacharewicz',
      titlesZh: [
        '国际建模与仿真学会SCS现任主席',
        '法国阿莱斯国立高等矿业学校 教授'
      ],
      titlesEn: [
        'Current President of The Society for Modeling & Simulation International (SCS)',
        'Professor at IMT Mines Alès, France'
      ],
      badgeZh: '大会主席 · General Chair',
      badgeEn: 'General Conference Chair'
    }
  ];

  // 7. Academic Committee (学术委员会)
  const academicCommittee = [
    { nameZh: '张霖', nameEn: 'Lin Zhang', instZh: '北京航空航天大学', instEn: 'Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: 'Gregory Zacharewicz', nameEn: 'Gregory Zacharewicz', instZh: '法国阿莱斯国立高等矿业学校', instEn: 'IMT Mines Alès', countryZh: '法国', countryEn: 'France' },
    { nameZh: '翁敬农', nameEn: 'Jingnong Weng', instZh: '北京航空航天大学', instEn: 'Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: 'Wentong Cai', nameEn: 'Wentong Cai', instZh: '新加坡南洋理工大学', instEn: 'Nanyang Technological University', countryZh: '新加坡', countryEn: 'Singapore' },
    { nameZh: 'Gary Tan', nameEn: 'Gary Tan', instZh: '新加坡国立大学', instEn: 'National University of Singapore', countryZh: '新加坡', countryEn: 'Singapore' },
    { nameZh: 'Zaharuddin Mohamed', nameEn: 'Zaharuddin Mohamed', instZh: '马来西亚理工大学', instEn: 'Universiti Teknologi Malaysia', countryZh: '马来西亚', countryEn: 'Malaysia' },
    { nameZh: '潘志庚', nameEn: 'Zhigeng Pan', instZh: '杭州市北京航空航天大学国际创新研究院 (北航国新院)', instEn: 'Hangzhou International Innovation Institute of Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: '毕司峰', nameEn: 'Sifeng Bi', instZh: '北京航空航天大学', instEn: 'Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: 'Satoshi Tanaka', nameEn: 'Satoshi Tanaka', instZh: '日本立命馆大学', instEn: 'Ritsumeikan University', countryZh: '日本', countryEn: 'Japan' },
    { nameZh: 'Chang Byeong Yun', nameEn: 'Chang Byeong Yun', instZh: '韩国成均馆大学', instEn: 'Sungkyunkwan University', countryZh: '韩国', countryEn: 'South Korea' },
    { nameZh: '任磊', nameEn: 'Lei Ren', instZh: '北京航空航天大学', instEn: 'Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: '赖李媛君', nameEn: 'Liyuanjun Lai', instZh: '北京航空航天大学', instEn: 'Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: 'José L. Risco-Martín', nameEn: 'José L. Risco-Martín', instZh: '马德里康普顿斯大学', instEn: 'Complutense University of Madrid', countryZh: '西班牙', countryEn: 'Spain' },
    { nameZh: '王瑞平', nameEn: 'Ruiping Wang', instZh: '杭州市北京航空航天大学国际创新研究院 (北航国新院)', instEn: 'Hangzhou International Innovation Institute of Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: '赵淳', nameEn: 'Chun Zhao', instZh: '北京信息科技大学', instEn: 'Beijing Information Science and Technology University', countryZh: '中国', countryEn: 'China' },
    { nameZh: '刘永奎', nameEn: 'Yongkui Liu', instZh: '西安电子科技大学', instEn: 'Xidian University', countryZh: '中国', countryEn: 'China' },
    { nameZh: 'June-Seok Lee', nameEn: 'June-Seok Lee', instZh: '韩国檀国大学', instEn: 'Dankook University', countryZh: '韩国', countryEn: 'South Korea' },
    { nameZh: 'Marco Gotelli', nameEn: 'Marco Gotelli', instZh: '意大利热那亚大学', instEn: 'University of Genoa', countryZh: '意大利', countryEn: 'Italy' },
    { nameZh: '王昆玉', nameEn: 'Kunyu Wang', instZh: '杭州市北京航空航天大学国际创新研究院 (北航国新院)', instEn: 'Hangzhou International Innovation Institute of Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: '陆涵', nameEn: 'Han Lu', instZh: '杭州市北京航空航天大学国际创新研究院 (北航国新院)', instEn: 'Hangzhou International Innovation Institute of Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: '古鹏飞', nameEn: 'Pengfei Gu', instZh: '杭州市北京航空航天大学国际创新研究院 (北航国新院)', instEn: 'Hangzhou International Innovation Institute of Beihang University', countryZh: '中国', countryEn: 'China' },
    { nameZh: '谢堃钰', nameEn: 'Kunyu Xie', instZh: '杭州市北京航空航天大学国际创新研究院 (北航国新院)', instEn: 'Hangzhou International Innovation Institute of Beihang University', countryZh: '中国', countryEn: 'China' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Header Banner */}
      <HeroHeader
        locale={locale}
        activePageTitle={isZh ? '组织机构' : 'Organization'}
        compact={true}
      />

      {/* Sticky Anchor Quick Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto py-3 gap-3 sm:gap-6 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <a href="#host-organizers" className="text-slate-600 hover:text-[#00186b] px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
            {isZh ? '主办与承办' : 'Host & Organizers'}
          </a>
          <a href="#co-organizers" className="text-slate-600 hover:text-[#00186b] px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
            {isZh ? '协办单位' : 'Co-Organizers'}
          </a>
          <a href="#chairs" className="text-slate-600 hover:text-[#00186b] px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
            {isZh ? '大会主席' : 'Conference Chairs'}
          </a>
          <a href="#advisory" className="text-slate-600 hover:text-[#00186b] px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
            {isZh ? '咨询委员会' : 'Advisory Committee'}
          </a>
          <a href="#academic" className="text-slate-600 hover:text-[#00186b] px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
            {isZh ? '学术委员会' : 'Academic Committee'}
          </a>
        </div>
      </nav>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-14 sm:space-y-20">

        {/* SECTION 1: 主办与承办单位 (HOST & ORGANIZERS) */}
        <section id="host-organizers" className="scroll-mt-16 space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold tracking-widest text-[#00186b] uppercase bg-blue-50 px-2.5 py-1 rounded">
              {isZh ? '权威背书 · 核心主办' : 'GOVERNANCE & HOST'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {isZh ? '主办与承办单位' : 'Host & Organizers'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {isZh 
                ? '汇聚全球顶尖仿真联合组织与国家高能级科技科创平台，共同打造国际一流学术盛会。' 
                : 'Convened by AsiaSim with premier national laboratories and industry innovation institutes.'}
            </p>
          </div>

          {/* Host Card (Featured) */}
          <div 
            className="relative overflow-hidden rounded-2xl text-white p-6 sm:p-10 shadow-xl border border-cyan-400/35"
            style={{
              background: 'linear-gradient(135deg, #010a26 0%, #00186b 50%, #062b8c 100%)',
              color: '#ffffff'
            }}
          >
            {/* Ambient decorative glow */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl space-y-3.5">
              <div className="inline-flex items-center gap-2 bg-cyan-400/20 border border-cyan-300/40 text-cyan-200 text-xs sm:text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Landmark className="w-4 h-4 text-cyan-300" />
                <span>{isZh ? hostData.roleZh : hostData.roleEn}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                {isZh ? hostData.nameZh : hostData.nameEn}
              </h3>
              {!isZh && (
                <div className="text-sm sm:text-base font-semibold text-cyan-300 tracking-wide">
                  {hostData.nameZh}
                </div>
              )}
              {isZh && (
                <div className="text-sm sm:text-base font-semibold text-cyan-300 tracking-wide">
                  {hostData.nameEn}
                </div>
              )}
              <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed pt-1.5 max-w-3xl">
                {isZh ? hostData.descZh : hostData.descEn}
              </p>
            </div>
            
            {/* Background watermarked emblem */}
            <div className="absolute -right-8 -bottom-10 opacity-20 pointer-events-none select-none text-cyan-200">
              <Globe className="w-72 h-72" />
            </div>
          </div>

          {/* Organizers Grid */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#00186b]" />
              <span>{isZh ? '承办单位' : 'Organizers'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {organizers.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-blue-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                        {isZh ? item.tagZh : item.tagEn}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {isZh ? item.nameZh : item.nameEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                      {isZh ? item.nameEn : item.nameZh}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#00186b]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{isZh ? '官方正式承办' : 'Official Organizer'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 2: 协办单位 (CO-ORGANIZERS) */}
        <section id="co-organizers" className="scroll-mt-16 space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold tracking-widest text-[#00186b] uppercase bg-blue-50 px-2.5 py-1 rounded">
              {isZh ? '多边协作 · 鼎力支持' : 'CO-ORGANIZING PARTNERS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {isZh ? '协办单位' : 'Co-Organizing Institutions'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {isZh 
                ? '涵盖国际权威学术学会、联合国附属中心以及国内国家级全国重点实验室。' 
                : 'International societies, UN-affiliated centers, and National Key Laboratories.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* International Institutions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <Globe className="w-6 h-6 text-sky-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {isZh ? '协办单位（国际机构）' : 'Co-Organizers (International)'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isZh ? '国际专业仿真学会与国际多边组织' : 'International simulation societies & global consortia'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {coOrganizersIntl.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-sky-50/50 border border-slate-100 transition-colors flex items-start justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="text-sm sm:text-[15px] font-bold text-slate-900">
                        {isZh ? item.nameZh : item.nameEn}
                      </div>
                      <div className="text-xs text-slate-500">
                        {isZh ? item.nameEn : item.nameZh}
                      </div>
                    </div>
                    {item.abbr && (
                      <span className="shrink-0 text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.abbr}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Domestic Institutions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <Landmark className="w-6 h-6 text-indigo-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {isZh ? '协办单位（国内机构）' : 'Co-Organizers (Domestic)'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isZh ? '国家级学会、国家级/全国重点实验室与新型研发机构' : 'National societies and State Key Laboratories'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {coOrganizersDomestic.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 transition-colors flex items-start justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="text-sm sm:text-[15px] font-bold text-slate-900">
                        {isZh ? item.nameZh : item.nameEn}
                      </div>
                      <div className="text-xs text-slate-500">
                        {isZh ? item.nameEn : item.nameZh}
                      </div>
                    </div>
                    <span className="shrink-0 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 3: 大会主席 (CONFERENCE CHAIRS) */}
        <section id="chairs" className="scroll-mt-16 space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold tracking-widest text-[#00186b] uppercase bg-blue-50 px-2.5 py-1 rounded">
              {isZh ? '学术领航 · 大会主席' : 'CONFERENCE LEADERSHIP'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {isZh ? '大会主席' : 'General Conference Chairs'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {isZh 
                ? '由亚洲仿真联盟理事长与国际建模与仿真学会现任主席联合挂帅。' 
                : 'Jointly led by the President of AsiaSim and President of SCS.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {conferenceChairs.map((chair, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200/70">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{isZh ? chair.badgeZh : chair.badgeEn}</span>
                    </span>
                    <span className="text-xs font-bold text-slate-400">CHAIR 0{idx + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {isZh ? chair.nameZh : chair.nameEn}
                    </h3>
                    <div className="text-sm font-semibold text-[#00186b] mt-0.5">
                      {isZh ? chair.nameEn : chair.nameZh}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {(isZh ? chair.titlesZh : chair.titlesEn).map((t, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00186b] mt-2 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{isZh ? '大会全权学术与组织主持' : 'Executive Academic Oversight'}</span>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* SECTION 4: 咨询委员会 (ADVISORY COMMITTEE) */}
        <section id="advisory" className="scroll-mt-16 space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold tracking-widest text-[#00186b] uppercase bg-blue-50 px-2.5 py-1 rounded">
              {isZh ? '顶尖智库 · 咨询委员会' : 'DISTINGUISHED ADVISORY COUNCIL'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {isZh ? '咨询委员会' : 'Advisory Committee'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {isZh 
                ? '汇聚两院院士、国际顶尖学府资深教授与联合国高级国际专家，为大会战略方向提供权威指导。' 
                : 'Academicians of the Chinese Academy of Engineering, international fellows, and senior international advisors.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advisoryCommittee.map((member, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-md">
                      {isZh ? member.honorZh : member.honorEn}
                    </span>
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {isZh ? member.nameZh : member.nameEn}
                  </h4>
                  <div className="text-xs font-medium text-slate-400 mb-2">
                    {isZh ? member.nameEn : member.nameZh}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    {isZh ? member.titleZh : member.titleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* SECTION 5: 学术委员会 (ACADEMIC COMMITTEE) */}
        <section id="academic" className="scroll-mt-16 space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold tracking-widest text-[#00186b] uppercase bg-blue-50 px-2.5 py-1 rounded">
              {isZh ? '同行评议 · 学术把关' : 'TECHNICAL PROGRAM & REVIEW'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {isZh ? '学术委员会' : 'Academic Committee'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {isZh 
                ? '汇集全球22位建模与仿真知名学者，负责论文同行评审、专刊推荐及主旨报告遴选。' 
                : 'Distinguished 22-member international technical committee ensuring peer review and scientific rigor.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {academicCommittee.map((member, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {isZh ? member.countryZh : member.countryEn}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-slate-300">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    {isZh ? member.nameZh : member.nameEn}
                  </div>
                  {member.nameZh !== member.nameEn && (
                    <div className="text-xs text-slate-400 font-medium">
                      {isZh ? member.nameEn : member.nameZh}
                    </div>
                  )}
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-snug">
                    {isZh ? member.instZh : member.instEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
