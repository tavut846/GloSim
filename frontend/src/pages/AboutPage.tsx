import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Landmark } from 'lucide-react';
import { OrgOverviewData, Leader, MemberInstitution, Locale } from '../types';
import { HeroHeader } from '../components/HeroHeader';
import { zhUi } from '../locales/zh';
import { enUi } from '../locales/en';

interface AboutPageProps {
  data: OrgOverviewData | null;
  locale: Locale;
  leaders: Leader[];
  members: MemberInstitution[];
}

export const AboutPage: React.FC<AboutPageProps> = ({
  data,
  locale,
  leaders,
  members
}) => {
  const ui = locale === 'zh-Hans' ? zhUi : enUi;
  const isZh = locale === 'zh-Hans';
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [expandedLeaderId, setExpandedLeaderId] = useState<string | number | null>(1);

  const title = data?.title || (isZh ? '组织架构与学术治理' : 'Organization & Governance');
  const subtitle = isZh ? '以严谨的学术共同体机制，构筑全球决策模拟与国际关系实证研究桥梁。' : 'Bridging computational social science and multilateral decision-making through an independent academic consortium.';
  const intro = data?.introText || (isZh ? '国际模拟学术联合会实行学术委员会领导下的理事会常务负责制，设有国际法与多边协商分委会、计算模拟与AI决策分委会、青年学者发展委员会等专业学术机构。' : 'Governed by the Academic Council and standing Board of Trustees, GloSim operates specialized academic committees.');
  const structureTitle = data?.structureTitle || (isZh ? '核心学术治理体系' : 'Academic Governance Framework');
  const structureDescription = data?.structureDescription || (isZh ? '各分委会协同运作，确保学术评审独立性、学术伦理与模拟规则的全球规范化。' : 'Collaborative oversight bodies ensuring rigorous peer review, academic neutrality, and standardized protocols.');

  const defaultDepartments = [
    { name: isZh ? '学术评议委员会' : 'Academic Review Council', role: isZh ? '最高学术审定机构' : 'Supreme Scholarly Body', desc: isZh ? '负责大会核心主题确立、大会特邀发言人遴选及论文终审。' : 'Sets annual conference thematic focus, keynote selection, and final paper approvals.' },
    { name: isZh ? '计算与多边模拟实验室' : 'Computational Simulation Lab', role: isZh ? '模型研发与验证' : 'Model Engineering & Validation', desc: isZh ? '提供多方博弈算法、危机仿真引擎及实验数据集支持。' : 'Maintains game-theoretic simulation engines, crisis scenario datasets, and experimental sandbox environments.' },
    { name: isZh ? '国际青年学者发展部' : 'Junior Scholar Division', role: isZh ? '学术孵化与培训' : 'Fellowships & Training', desc: isZh ? '举办博士生论坛、跨国联合研讨班并设立专项学术资助基金。' : 'Hosts doctoral colloquiums, cross-institutional seminars, and distributes dedicated travel grants.' },
    { name: isZh ? '秘书处与多边联络处' : 'Secretariat & Liaison Office', role: isZh ? '日常运营与协同' : 'Operations & Publishing', desc: isZh ? '统筹140+成员高校联络、会务落地及全球双语出版物发行。' : 'Coordinates with 140+ member universities and oversees bilingual annual proceedings publication.' }
  ];

  const departments = data?.departments && data.departments.length > 0 ? data.departments : defaultDepartments;

  const regions = ['ALL', ...Array.from(new Set(members.map(m => m.region).filter(Boolean)))];
  const filteredMembers = selectedRegion === 'ALL'
    ? members
    : members.filter(m => m.region === selectedRegion);

  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      {/* Header Banner */}
      <HeroHeader
        locale={locale}
        activePageTitle={isZh ? '组织机构' : 'Organization'}
        compact={true}
      />

      {/* 1. Overview & Charter */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--border-default)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{
            padding: '32px',
            backgroundColor: 'var(--limestone)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '4px solid var(--symposium-blue)',
            marginBottom: '48px'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '12px' }}>
              {isZh ? '学会宗旨与学术公约' : 'Academic Charter & Guiding Principles'}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--ink-700)', lineHeight: 1.7 }}>
              {intro}
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
              {ui.about.governanceEyebrow}
            </span>
            <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-bold)', color: 'var(--ink-900)', margin: '6px 0 8px' }}>
              {structureTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-body-md)', color: 'var(--slate-600)', marginBottom: '28px' }}>
              {structureDescription}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {departments.map((dept, idx) => (
              <div key={idx} className="card-academic" style={{ padding: '24px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--symposium-blue-tint)',
                  color: 'var(--symposium-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  fontWeight: 700
                }}>
                  0{idx + 1}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '4px' }}>
                  {dept.name}
                </h3>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--symposium-blue)', display: 'block', marginBottom: '10px' }}>
                  {dept.role}
                </span>
                <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                  {dept.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Leadership Roster */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--limestone)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
            <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
              {ui.about.councilEyebrow}
            </span>
            <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-bold)', color: 'var(--ink-900)', margin: '6px 0 8px' }}>
              {isZh ? '联合会核心领导成员' : 'Governing Leadership'}
            </h2>
            <p style={{ fontSize: 'var(--text-body-md)', color: 'var(--slate-600)' }}>
              {isZh ? '汇聚来自全球顶尖学府与研究机构的国际关系与计算系统学者。' : 'Distinguished faculty across international affairs and decision sciences.'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {leaders.map((leader) => {
              const isExpanded = expandedLeaderId === leader.id;
              const photoUrl = (typeof leader.photo === 'string' ? leader.photo : leader.photo?.url) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
              return (
                <div key={leader.id} className="card-academic" style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', gap: '20px', padding: '24px', alignItems: 'center' }}>
                    <img
                      src={photoUrl}
                      alt={leader.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--slate-200)',
                        flexShrink: 0
                      }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink-900)' }}>
                        {leader.name}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--symposium-blue)', fontWeight: 600, marginTop: '2px' }}>
                        {leader.title}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--slate-600)', marginTop: '2px' }}>
                        {leader.affiliation}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: '0 24px 20px',
                    borderTop: '1px solid var(--slate-200)',
                    paddingTop: '16px'
                  }}>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--ink-700)',
                      lineHeight: 1.6,
                      display: isExpanded ? 'block' : '-webkit-box',
                      WebkitLineClamp: isExpanded ? 'unset' : 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {leader.bio}
                    </p>
                    <button
                      onClick={() => setExpandedLeaderId(isExpanded ? null : (leader.id || null))}
                      style={{
                        marginTop: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--symposium-blue)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>{isExpanded ? ui.about.collapseBio : ui.about.readBio}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Member Institutions */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div>
              <span className="badge-caps" style={{ color: 'var(--symposium-blue)' }}>
                {ui.about.networkEyebrow}
              </span>
              <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-bold)', color: 'var(--ink-900)', marginTop: '4px' }}>
                {isZh ? '成员院校与合作研究机构' : 'Member Institutions & Partners'}
              </h2>
            </div>

            {/* Region Filter */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '13px',
                    fontWeight: selectedRegion === reg ? 600 : 500,
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: selectedRegion === reg ? 'var(--symposium-blue)' : 'var(--limestone)',
                    color: selectedRegion === reg ? 'var(--white)' : 'var(--ink-700)',
                    border: '1px solid var(--border-default)',
                    transition: 'all var(--duration-fast)'
                  }}
                >
                  {reg === 'ALL' ? ui.about.filterAll : reg}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {filteredMembers.map((member) => (
              <div key={member.id} className="card-academic" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge-caps" style={{ color: 'var(--slate-600)' }}>
                    {member.region} · {member.country}
                  </span>
                  <Landmark size={18} color="var(--symposium-blue)" />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '8px' }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
