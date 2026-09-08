'use strict';

const seedData = {
  global: {
    siteName: '国际模拟学术联合会',
    orgShort: 'GloSim 学会',
    contactEmail: 'secretariat@glosim-conference.org',
    contactPhone: '+86 (010) 8832-7600',
    address: '北京市海淀区中关村南大街1号 · 国际学术交流中心 602室',
    footerAbout: '国际模拟学术联合会（GloSim）是致力于推动多边学术模拟、国际政策研讨与全球青年学者交流的非营利性学术联合组织。',
    navLabels: [
      { label: '首页', href: '/' },
      { label: '学会架构', href: '/about' },
      { label: '会议日程', href: '/schedule' },
      { label: '论文征集', href: '/call-for-papers' },
      { label: '往届会议', href: '/past-conferences' }
    ]
  },
  homePage: {
    heroEyebrow: '第十届全球多边政策模拟大会 · 2026',
    heroTitle: '世界仿真大会',
    heroSubtitle: 'GLOBAL SIMULATION CONFERENCE',
    heroDescription: 'AI驱动的全球仿真创新与协同治理',
    heroTagline: '“在理性交锋与学术实证中，预见未来全球协同秩序。”',
    heroCtaPrimary: '查阅会议日程',
    heroCtaSecondary: '提交论文摘要',
    orgIntroTitle: '联合会学术使命与组织概况',
    orgIntroBody: '国际模拟学术联合会（GloSim）由全球四十余所知名高校国际关系与计算社会科学学者于2017年共同发起。我们倡导以数据驱动模拟、政策情景博弈和博弈论模型为核心，为学术界及国际组织提供严谨的模拟决策实证支撑。',
    orgVideoCaption: '联合会十周年学术纪实片（中英双语字幕）',
    chairmanVideoCaption: '学术委员会主席张博林教授致辞：面向复杂系统的学术模拟',
    highlights: [
      { number: '48+', label: '成员国家与地区', icon: 'globe' },
      { number: '140+', label: '顶尖理事院校', icon: 'landmark' },
      { number: '9 届', label: '已成功举办年会', icon: 'award' },
      { number: '3,200+', label: '发表高水平模拟成果', icon: 'file-text' }
    ]
  },
  orgOverview: {
    title: '组织架构与学术治理',
    introText: '国际模拟学术联合会实行学术委员会领导下的理事会常务负责制，设有国际法与多边协商分委会、计算模拟与AI决策分委会、青年学者发展委员会等专业学术机构。',
    structureTitle: '核心学术治理体系',
    structureDescription: '各分委会协同运作，确保学术评审独立性、学术伦理与模拟规则的全球规范化。'
  },
  leaders: [
    {
      name: '张博林 教授',
      title: '学术委员会主席 · 联合会共同发起人',
      affiliation: '清华大学 国际关系研究院',
      bio: '主要研究方向为多边安全协商模型、计算国际政治学及博弈论推演。在国际顶级期刊发表学术论文40余篇，长期担任联合国多边模拟顾问。',
      order: 1
    },
    {
      name: 'Dr. Eleanor Vance',
      title: '副主席 · 国际多边协同分委会主任',
      affiliation: '牛津大学 纳菲尔德学院 (Oxford)',
      bio: '专注于全球环境治理仿真、气候变化跨国谈判策略建模，多次主导欧洲跨国政策模拟实验。',
      order: 2
    },
    {
      name: '李承载 教授',
      title: '秘书长 · 计算模拟实验室主任',
      affiliation: '新加坡国立大学 (NUS) 李光耀公共政策学院',
      bio: '致力于公共危机复杂系统模拟、人工智能在公共决策中的伦理规范研究，主持多项跨国科研项目。',
      order: 3
    }
  ],
  members: [
    { name: '北京大学 国际关系学院', country: '中国', region: '亚太', description: '首批创始理事单位，主持东亚多边安全模拟项目。', order: 1 },
    { name: '清华大学 战略与安全研究中心', country: '中国', region: '亚太', description: '联合会计算模拟实验室联合承建单位。', order: 2 },
    { name: 'Oxford Global Governance Lab', country: '英国', region: '欧洲', description: '欧洲多边气候政策模型研究核心协作机构。', order: 3 },
    { name: 'Sciences Po (巴黎政治大学)', country: '法国', region: '欧洲', description: '欧洲外交模拟与国际组织治理合作基地。', order: 4 },
    { name: 'Harvard Belfer Center', country: '美国', region: '北美', description: '全球危机沙盘模拟核心合作学者网络。', order: 5 },
    { name: 'National University of Singapore', country: '新加坡', region: '亚太', description: '东南亚地区多边贸易与航行安全模拟基地。', order: 6 }
  ],
  conferences: [
    {
      title: '第十届全球模拟大会（GloSim 2026）',
      edition: '第十届年会',
      year: 2026,
      theme: '多极化背景下的全球治理韧性与复杂系统博弈模拟',
      startDate: '2026-10-18',
      endDate: '2026-10-21',
      location: '中国 · 北京',
      venue: '国家会议中心 · 第三报告厅',
      status: 'upcoming',
      summary: '汇聚来自全球 40 余个国家和地区的 500 余位代表，围绕地缘政治、供应链韧性与人工智能治理展开多轨学术模拟。',
      description: '第十届年会聚焦于新兴技术革命与多边制度演进的交互影响。大会设置三大主会场与六个平行工作组，通过结合博弈推演平台与定量数据模型，推演多边国际争端调解路径。',
      agendaItems: [
        { day: 'Day 1', date: '2026-10-18', time: '09:00 - 10:30', title: '开幕式暨主旨演讲：多极秩序下的制度韧性', speaker: '张博林 教授', location: '主报告厅 A', tag: 'PLENARY' },
        { day: 'Day 1', date: '2026-10-18', time: '10:45 - 12:15', title: '专题讨论：全球供应链安全与多边干预模拟', speaker: 'Dr. Eleanor Vance', location: '分会场 2B', tag: 'PANEL' },
        { day: 'Day 1', date: '2026-10-18', time: '14:00 - 17:30', title: '青年学者论文宣读分会（Track A / B / C）', speaker: '入选学者宣讲', location: '研讨厅 1-3', tag: 'PAPER' },
        { day: 'Day 2', date: '2026-10-19', time: '09:00 - 12:00', title: '危机推演模拟实战：跨境数据与人工智能治理', speaker: '计算模拟实验室指导组', location: '模拟演练厅', tag: 'SIMULATION' },
        { day: 'Day 2', date: '2026-10-19', time: '14:00 - 16:30', title: '多边谈判文本磋商闭门会议', speaker: '各代表团首席谈判代表', location: '圆桌会议室', tag: 'NEGOTIATION' },
        { day: 'Day 3', date: '2026-10-20', time: '09:30 - 11:30', title: '大会联合公报审议与学术决议表决', speaker: '全体代表', location: '主报告厅 A', tag: 'PLENARY' },
        { day: 'Day 3', date: '2026-10-20', time: '14:00 - 15:30', title: '闭幕式与优秀青年论文颁奖典礼', speaker: '学术委员会全员', location: '主报告厅 A', tag: 'CEREMONY' }
      ]
    },
    {
      title: '第九届全球模拟大会（GloSim 2025）',
      edition: '第九届年会',
      year: 2025,
      theme: '数字主权与跨境治理：算法时代的国际协调机制',
      startDate: '2025-10-15',
      endDate: '2025-10-18',
      location: '瑞士 · 日内瓦',
      venue: '日内瓦国际会议中心 (CICG)',
      status: 'past',
      summary: '聚焦跨国数据流动与人工智能风险监管，共收录学术论文 128 篇，达成 4 份模拟治理范本框架。',
      description: '在日内瓦举行的第九届年会吸引了全球 420 位学者及政策分析师，系统展示了大型语言模型在多边文本协商中的辅助作用。',
      agendaItems: []
    }
  ],
  notices: [
    {
      title: '关于第十届全球模拟大会（GloSim 2026）论文全文与摘要征集的通告',
      category: '年度年会征文',
      publishDate: '2026-03-01',
      deadline: '2026-08-30',
      status: 'active',
      summary: '征集关于多边谈判模型、复杂决策模拟、博弈论在国际政策中应用的学术论文。入选论文将受邀赴北京现场宣读。',
      body: '第十届全球模拟学术大会组委会现面向全球高校学者及硕博研究生征集高质量学术论文。主题涵盖：多边协同谈判模型、国际危机沙盘推演、人工智能驱动的政策模拟及多边制度演化分析。'
    },
    {
      title: '2026年度‘计算多边模拟’青年学者专项研究基金申报指南',
      category: '基金资助',
      publishDate: '2026-02-15',
      deadline: '2026-05-31',
      status: 'closed',
      summary: '资助 35 周岁以下青年学者开展基于计算模拟的国际公共政策与危机仿真跨学科研究。',
      body: '专项基金重点支持跨学科交叉项目，每个入选项目提供 50,000–100,000 元科研经费资助及联合会算力平台资源支持。'
    }
  ]
};

async function seedDatabase(strapi) {
  try {
    // 1. Seed Global
    const globalCount = await strapi.entityService.count('api::global.global');
    if (globalCount === 0) {
      await strapi.entityService.create('api::global.global', {
        data: seedData.global,
      });
      strapi.log.info('Seeded Global settings');
    }

    // 2. Seed HomePage
    const homeCount = await strapi.entityService.count('api::home-page.home-page');
    if (homeCount === 0) {
      await strapi.entityService.create('api::home-page.home-page', {
        data: seedData.homePage,
      });
      strapi.log.info('Seeded Home Page');
    }

    // 3. Seed OrgOverview
    const orgCount = await strapi.entityService.count('api::org-overview.org-overview');
    if (orgCount === 0) {
      await strapi.entityService.create('api::org-overview.org-overview', {
        data: seedData.orgOverview,
      });
      strapi.log.info('Seeded Org Overview');
    }

    // 4. Seed Leaders
    const leaderCount = await strapi.entityService.count('api::leader.leader');
    if (leaderCount === 0) {
      for (const leader of seedData.leaders) {
        await strapi.entityService.create('api::leader.leader', {
          data: { ...leader, publishedAt: new Date() },
        });
      }
      strapi.log.info('Seeded Leaders');
    }

    // 5. Seed Members
    const memberCount = await strapi.entityService.count('api::member-institution.member-institution');
    if (memberCount === 0) {
      for (const m of seedData.members) {
        await strapi.entityService.create('api::member-institution.member-institution', {
          data: { ...m, publishedAt: new Date() },
        });
      }
      strapi.log.info('Seeded Member Institutions');
    }

    // 6. Seed Conferences
    const confCount = await strapi.entityService.count('api::conference.conference');
    if (confCount === 0) {
      for (const conf of seedData.conferences) {
        await strapi.entityService.create('api::conference.conference', {
          data: { ...conf, publishedAt: new Date() },
        });
      }
      strapi.log.info('Seeded Conferences');
    }

    // 7. Seed Notices
    const noticeCount = await strapi.entityService.count('api::notice.notice');
    if (noticeCount === 0) {
      for (const notice of seedData.notices) {
        await strapi.entityService.create('api::notice.notice', {
          data: { ...notice, publishedAt: new Date() },
        });
      }
      strapi.log.info('Seeded Notices');
    }
  } catch (err) {
    strapi.log.warn('Seed database warning: ' + err.message);
  }
}

module.exports = { seedDatabase };
