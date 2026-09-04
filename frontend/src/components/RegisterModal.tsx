import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { Locale } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  initialType?: 'delegate' | 'paper';
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  locale,
  initialType = 'delegate'
}) => {
  const [type, setType] = useState<'delegate' | 'paper'>(initialType);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [title, setTitle] = useState('');

  if (!isOpen) return null;

  const isZh = locale === 'zh-Hans';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // In production, would post to Strapi /api/registrations or /api/submissions
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(10, 10, 10, 0.65)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backdropFilter: 'blur(3px)'
    }}>
      <div style={{
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        maxWidth: '540px',
        width: '100%',
        boxShadow: 'var(--shadow-raised)',
        border: '1px solid var(--border-default)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-default)',
          backgroundColor: 'var(--limestone)'
        }}>
          <div>
            <span style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              color: 'var(--symposium-blue)'
            }}>
              {isZh ? '全球模拟大会 2026' : 'GloSim Summit 2026'}
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink-900)', marginTop: '2px' }}>
              {type === 'delegate'
                ? (isZh ? '参会代表在线预注册' : 'Delegate Registration')
                : (isZh ? '论文摘要快速投递' : 'Fast Abstract Submission')}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--slate-600)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '24px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle size={48} color="#16A34A" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '8px' }}>
                {isZh ? '提交成功！' : 'Submission Received!'}
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '24px' }}>
                {isZh
                  ? '秘书处已收到您的信息，我们将于 2 个工作日内通过邮件发送确认函及材料。'
                  : 'The secretariat has received your registration. A confirmation notice will be dispatched to your email within 2 business days.'}
              </p>
              <button
                onClick={handleReset}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                {isZh ? '完成' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Type Switch */}
              <div style={{
                display: 'flex',
                gap: '8px',
                padding: '4px',
                backgroundColor: 'var(--limestone)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '4px'
              }}>
                <button
                  type="button"
                  onClick={() => setType('delegate')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontSize: '13px',
                    fontWeight: type === 'delegate' ? 600 : 500,
                    backgroundColor: type === 'delegate' ? 'var(--white)' : 'transparent',
                    color: type === 'delegate' ? 'var(--symposium-blue)' : 'var(--slate-600)',
                    borderRadius: 'var(--radius-xs)',
                    boxShadow: type === 'delegate' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  {isZh ? '参会代表 (Delegate)' : 'Delegate'}
                </button>
                <button
                  type="button"
                  onClick={() => setType('paper')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontSize: '13px',
                    fontWeight: type === 'paper' ? 600 : 500,
                    backgroundColor: type === 'paper' ? 'var(--white)' : 'transparent',
                    color: type === 'paper' ? 'var(--symposium-blue)' : 'var(--slate-600)',
                    borderRadius: 'var(--radius-xs)',
                    boxShadow: type === 'paper' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  {isZh ? '投稿学者 (Author)' : 'Paper Author'}
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink-700)', marginBottom: '6px' }}>
                  {isZh ? '姓名 (Full Name) *' : 'Full Name *'}
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isZh ? '例如：王学者 / Dr. Jane Doe' : 'e.g. Dr. Jane Doe'}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-default)',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink-700)', marginBottom: '6px' }}>
                  {isZh ? '学术/机构邮箱 (Institutional Email) *' : 'Institutional Email *'}
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-default)',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink-700)', marginBottom: '6px' }}>
                  {isZh ? '所属院校 / 机构 (Affiliation) *' : 'Affiliation / Institution *'}
                </label>
                <input
                  required
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder={isZh ? '例如：北京大学国际关系学院' : 'e.g. Oxford Global Governance Lab'}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-default)',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {type === 'paper' && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink-700)', marginBottom: '6px' }}>
                    {isZh ? '论文暂定题目 (Tentative Paper Title) *' : 'Tentative Paper Title *'}
                  </label>
                  <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={isZh ? '例如：基于多智能体的跨境危机推演' : 'e.g. Agent-based Multilateral Crisis Gaming'}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-default)',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '8px', padding: '12px' }}
              >
                <Send size={16} />
                <span>{isZh ? '确认提交申请' : 'Confirm Registration'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
