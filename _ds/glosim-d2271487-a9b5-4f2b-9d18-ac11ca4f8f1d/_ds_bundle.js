/* @ds-bundle: {"format":4,"namespace":"Glosim_d22714","components":[{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"AgendaScreen","sourcePath":"ui_kits/conference-website/AgendaScreen.jsx"},{"name":"Footer","sourcePath":"ui_kits/conference-website/Footer.jsx"},{"name":"Header","sourcePath":"ui_kits/conference-website/Header.jsx"},{"name":"Hero","sourcePath":"ui_kits/conference-website/Hero.jsx"},{"name":"RegisterDrawer","sourcePath":"ui_kits/conference-website/RegisterDrawer.jsx"},{"name":"SpeakersScreen","sourcePath":"ui_kits/conference-website/SpeakersScreen.jsx"}],"sourceHashes":{"components/data-display/Badge.jsx":"b025cecaa0bb","components/data-display/Card.jsx":"d6f083bb162f","components/forms/Button.jsx":"b6a291171bca","components/forms/Checkbox.jsx":"d8728c009514","components/forms/Input.jsx":"d42cd01628e1","components/forms/Select.jsx":"35f39edd959f","components/navigation/Tabs.jsx":"27e26821f596","ui_kits/conference-website/AgendaScreen.jsx":"c20edb75e868","ui_kits/conference-website/Footer.jsx":"5665fb52da37","ui_kits/conference-website/Header.jsx":"11d7bbacd7b7","ui_kits/conference-website/Hero.jsx":"0d0ae610206d","ui_kits/conference-website/RegisterDrawer.jsx":"7515f678c7a7","ui_kits/conference-website/SpeakersScreen.jsx":"71e084a01aa8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Glosim_d22714 = window.Glosim_d22714 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data-display/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = 'neutral'
}) {
  const tones = {
    neutral: {
      background: 'var(--limestone)',
      color: 'var(--slate-600)'
    },
    accent: {
      background: 'var(--symposium-blue-tint)',
      color: 'var(--symposium-blue)'
    },
    warm: {
      background: 'var(--warm-accent-tint)',
      color: 'var(--warm-accent)'
    }
  };
  return React.createElement('span', {
    style: {
      ...tones[tone],
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      fontWeight: 'var(--weight-semibold)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function Card({
  eyebrow,
  title,
  description,
  footer,
  children
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)',
      padding: 'var(--space-lg)',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, eyebrow && React.createElement('span', {
    style: {
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      color: 'var(--symposium-blue)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, eyebrow), title && React.createElement('h3', {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--ink-900)'
    }
  }, title), description && React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-md)',
      color: 'var(--slate-600)',
      lineHeight: 'var(--leading-body)'
    }
  }, description), children, footer && React.createElement('div', {
    style: {
      marginTop: '8px',
      paddingTop: '8px',
      borderTop: '1px solid var(--border-default)',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--slate-600)'
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  children,
  onClick
}) {
  const base = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-semibold)',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid transparent',
    transition: 'background var(--duration-standard) var(--ease-standard), color var(--duration-standard) var(--ease-standard)',
    opacity: disabled ? 0.45 : 1
  };
  const sizes = {
    sm: {
      padding: '6px 14px',
      fontSize: 'var(--text-body-sm)'
    },
    md: {
      padding: '10px 18px',
      fontSize: 'var(--text-body-md)'
    },
    lg: {
      padding: '13px 24px',
      fontSize: 'var(--text-body-lg)'
    }
  };
  const variants = {
    primary: {
      background: 'var(--symposium-blue)',
      color: '#fff'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--symposium-blue)',
      borderColor: 'var(--symposium-blue)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-900)'
    },
    warm: {
      background: 'var(--warm-accent)',
      color: '#fff'
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    primary: 'var(--symposium-blue-hover)',
    secondary: 'var(--symposium-blue-tint)',
    ghost: 'var(--limestone)',
    warm: '#9c5426'
  };
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    background: hover && !disabled ? hoverBg[variant] : variants[variant].background
  };
  return React.createElement('button', {
    style,
    disabled,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body-md)',
      color: disabled ? 'var(--slate-400)' : 'var(--ink-900)',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, React.createElement('span', {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: '18px',
      height: '18px',
      borderRadius: '4px',
      border: '1px solid ' + (checked ? 'var(--symposium-blue)' : 'var(--border-default)'),
      background: checked ? 'var(--symposium-blue)' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, checked && React.createElement('svg', {
    width: 11,
    height: 9,
    viewBox: '0 0 11 9'
  }, React.createElement('path', {
    d: 'M1 4.5L4 7.5L10 1',
    stroke: '#fff',
    strokeWidth: 1.6,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }))), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  value,
  onChange
}) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-sans)'
    }
  }, label && React.createElement('label', {
    style: {
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      color: 'var(--slate-600)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, label), React.createElement('input', {
    type,
    placeholder,
    disabled,
    value,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body-md)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid ' + (error ? '#B23B3B' : focus ? 'var(--symposium-blue)' : 'var(--border-default)'),
      outline: 'none',
      background: disabled ? 'var(--limestone)' : '#fff',
      color: 'var(--ink-900)',
      boxShadow: focus ? '0 0 0 3px var(--symposium-blue-tint)' : 'none',
      transition: 'border var(--duration-fast), box-shadow var(--duration-fast)'
    }
  }), error && React.createElement('span', {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: '#B23B3B'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  disabled = false
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-sans)'
    }
  }, label && React.createElement('label', {
    style: {
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      color: 'var(--slate-600)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, label), React.createElement('select', {
    value,
    onChange,
    disabled,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body-md)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      background: disabled ? 'var(--limestone)' : '#fff',
      color: 'var(--ink-900)',
      outline: 'none'
    }
  }, options.map((o, i) => React.createElement('option', {
    key: i,
    value: o.value ?? o
  }, o.label ?? o))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 'var(--space-lg)',
      borderBottom: '1px solid var(--border-default)',
      fontFamily: 'var(--font-sans)'
    }
  }, tabs.map((t, i) => {
    const isActive = (active ?? 0) === i;
    return React.createElement('button', {
      key: i,
      onClick: () => onChange && onChange(i),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '12px 2px',
        fontSize: 'var(--text-body-md)',
        fontWeight: isActive ? 'var(--weight-semibold)' : 'var(--weight-regular)',
        color: isActive ? 'var(--ink-900)' : 'var(--slate-600)',
        borderBottom: isActive ? '2px solid var(--symposium-blue)' : '2px solid transparent',
        marginBottom: '-1px'
      }
    }, t);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/conference-website/AgendaScreen.jsx
try { (() => {
const DAYS = {
  0: [{
    time: '09:00–10:30',
    title: 'Opening Plenary: The State of Multilateralism',
    track: 'Plenary',
    hall: 'Hall A'
  }, {
    time: '11:00–12:30',
    title: 'Trade Harmonization Working Group',
    track: 'Trade',
    hall: 'Hall B'
  }, {
    time: '14:00–15:30',
    title: 'Carbon Border Adjustment Simulation',
    track: 'Climate',
    hall: 'Hall C'
  }],
  1: [{
    time: '09:00–10:30',
    title: 'Digital Governance Roundtable',
    track: 'Digital',
    hall: 'Hall B'
  }, {
    time: '11:00–12:30',
    title: 'Regional Bloc Caucus',
    track: 'Trade',
    hall: 'Hall A'
  }],
  2: [{
    time: '09:00–10:30',
    title: 'Closing Simulation: Joint Communiqué Drafting',
    track: 'Plenary',
    hall: 'Hall A'
  }]
};
const TONE = {
  Plenary: 'neutral',
  Trade: 'accent',
  Climate: 'accent',
  Digital: 'warm'
};
function AgendaScreen() {
  const [day, setDay] = React.useState(0);
  return React.createElement('section', {
    style: {
      padding: '56px 48px',
      fontFamily: 'var(--font-sans)',
      maxWidth: '900px',
      margin: '0 auto'
    }
  }, React.createElement('h2', {
    style: {
      fontSize: 'var(--text-h2)',
      fontWeight: 700,
      color: 'var(--ink-900)',
      margin: '0 0 24px'
    }
  }, 'Agenda'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: '24px',
      borderBottom: '1px solid var(--border-default)',
      marginBottom: '24px'
    }
  }, ['Day 1', 'Day 2', 'Day 3'].map((d, i) => React.createElement('button', {
    key: i,
    onClick: () => setDay(i),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '12px 2px',
      fontSize: 'var(--text-body-md)',
      fontWeight: day === i ? 600 : 400,
      color: day === i ? 'var(--ink-900)' : 'var(--slate-600)',
      borderBottom: day === i ? '2px solid var(--symposium-blue)' : '2px solid transparent',
      marginBottom: '-1px'
    }
  }, d))), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, DAYS[day].map((s, i) => React.createElement('div', {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      background: '#fff',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)'
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--slate-600)',
      marginBottom: '6px'
    }
  }, s.time + ' · ' + s.hall), React.createElement('div', {
    style: {
      fontSize: 'var(--text-body-lg)',
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, s.title)), React.createElement('span', {
    style: {
      background: s.track === 'Digital' ? 'var(--warm-accent-tint)' : 'var(--symposium-blue-tint)',
      color: s.track === 'Digital' ? 'var(--warm-accent)' : 'var(--symposium-blue)',
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      fontWeight: 600,
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)'
    }
  }, s.track)))));
}
Object.assign(__ds_scope, { AgendaScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/conference-website/AgendaScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/conference-website/Footer.jsx
try { (() => {
function Footer() {
  return React.createElement('footer', {
    style: {
      padding: '40px 48px',
      background: 'var(--ink-900)',
      color: 'var(--slate-400)',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, React.createElement('span', {
    style: {
      color: '#fff',
      fontWeight: 600
    }
  }, 'Global Simulation Conference'), React.createElement('span', {
    style: {
      fontSize: 'var(--text-body-sm)'
    }
  }, '© 2026 · Geneva, Switzerland'));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/conference-website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/conference-website/Header.jsx
try { (() => {
function Header({
  page,
  onNavigate,
  onRegister
}) {
  const links = [['Home', 'home'], ['Agenda', 'agenda'], ['Speakers', 'speakers']];
  return React.createElement('header', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 48px',
      borderBottom: '1px solid var(--border-default)',
      fontFamily: 'var(--font-sans)',
      background: '#fff'
    }
  }, React.createElement('div', {
    style: {
      fontWeight: 'var(--weight-bold)',
      fontSize: '18px',
      color: 'var(--ink-900)',
      cursor: 'pointer'
    },
    onClick: () => onNavigate('home')
  }, 'Global Simulation Conference'), React.createElement('nav', {
    style: {
      display: 'flex',
      gap: '32px'
    }
  }, links.map(([label, key]) => React.createElement('a', {
    key,
    onClick: () => onNavigate(key),
    style: {
      fontSize: 'var(--text-body-md)',
      color: page === key ? 'var(--symposium-blue)' : 'var(--ink-900)',
      fontWeight: page === key ? 'var(--weight-semibold)' : 'var(--weight-regular)',
      cursor: 'pointer',
      textDecoration: 'none',
      borderBottom: page === key ? '2px solid var(--symposium-blue)' : '2px solid transparent',
      paddingBottom: '4px'
    }
  }, label))), React.createElement('button', {
    onClick: onRegister,
    style: {
      background: 'var(--symposium-blue)',
      color: '#fff',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 20px',
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, 'Register'));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/conference-website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/conference-website/Hero.jsx
try { (() => {
function Hero({
  onRegister
}) {
  return React.createElement('section', {
    style: {
      position: 'relative',
      padding: '96px 48px',
      background: 'var(--limestone)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)'
    }
  }, React.createElement('img', {
    src: '../../assets/patterns/network-lines.svg',
    style: {
      position: 'absolute',
      right: '-60px',
      top: '-40px',
      width: '640px',
      opacity: 0.6,
      pointerEvents: 'none'
    }
  }), React.createElement('div', {
    style: {
      maxWidth: '640px',
      position: 'relative'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      color: 'var(--symposium-blue)',
      fontWeight: 600
    }
  }, '12–15 March 2027 · Geneva'), React.createElement('h1', {
    style: {
      fontSize: 'var(--text-h1)',
      fontWeight: 'var(--weight-extrabold)',
      lineHeight: 'var(--leading-tight)',
      color: 'var(--ink-900)',
      margin: '12px 0 16px'
    }
  }, 'Global Simulation Conference'), React.createElement('p', {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--slate-600)',
      lineHeight: 'var(--leading-body)',
      margin: '0 0 28px'
    }
  }, 'Four days of simulated multilateral negotiation across trade, climate, and digital governance — convening delegates from 140 institutions.'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: '12px'
    }
  }, React.createElement('button', {
    onClick: onRegister,
    style: {
      background: 'var(--symposium-blue)',
      color: '#fff',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '13px 24px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: 'var(--text-body-lg)'
    }
  }, 'Register as Delegate'), React.createElement('button', {
    style: {
      background: 'transparent',
      color: 'var(--symposium-blue)',
      border: '1px solid var(--symposium-blue)',
      borderRadius: 'var(--radius-sm)',
      padding: '13px 24px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: 'var(--text-body-lg)'
    }
  }, 'View Agenda'))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/conference-website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/conference-website/RegisterDrawer.jsx
try { (() => {
function RegisterDrawer({
  open,
  onClose
}) {
  if (!open) return null;
  return React.createElement('div', {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(10,10,10,0.45)',
      display: 'flex',
      justifyContent: 'flex-end',
      zIndex: 50
    },
    onClick: onClose
  }, React.createElement('div', {
    onClick: e => e.stopPropagation(),
    style: {
      width: '420px',
      height: '100%',
      background: '#fff',
      padding: '40px',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, React.createElement('h3', {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)',
      color: 'var(--ink-900)'
    }
  }, 'Register as Delegate'), React.createElement('span', {
    onClick: onClose,
    style: {
      cursor: 'pointer',
      color: 'var(--slate-600)',
      fontSize: '20px'
    }
  }, '\u2715')), React.createElement('label', {
    style: {
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      color: 'var(--slate-600)',
      fontWeight: 600
    }
  }, 'Full name'), React.createElement('input', {
    placeholder: 'Jane Delegate',
    style: {
      fontSize: 'var(--text-body-md)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      outline: 'none'
    }
  }), React.createElement('label', {
    style: {
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      color: 'var(--slate-600)',
      fontWeight: 600
    }
  }, 'Institution email'), React.createElement('input', {
    placeholder: 'you@institution.org',
    style: {
      fontSize: 'var(--text-body-md)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      outline: 'none'
    }
  }), React.createElement('label', {
    style: {
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      color: 'var(--slate-600)',
      fontWeight: 600
    }
  }, 'Track'), React.createElement('select', {
    style: {
      fontSize: 'var(--text-body-md)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      outline: 'none'
    }
  }, ['Trade', 'Climate', 'Digital Governance'].map(o => React.createElement('option', {
    key: o
  }, o))), React.createElement('button', {
    style: {
      marginTop: '12px',
      background: 'var(--symposium-blue)',
      color: '#fff',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: 'var(--text-body-md)'
    }
  }, 'Submit Application')));
}
Object.assign(__ds_scope, { RegisterDrawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/conference-website/RegisterDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/conference-website/SpeakersScreen.jsx
try { (() => {
const SPEAKERS = [{
  name: 'Amara Odutola',
  role: 'Chief Negotiator, African Union Simulation Bloc',
  track: 'Trade'
}, {
  name: 'Lukas Reiner',
  role: 'Director, Climate Policy Institute',
  track: 'Climate'
}, {
  name: 'Priya Nataraj',
  role: 'Fellow, Digital Governance Lab',
  track: 'Digital'
}, {
  name: 'Someone Chen',
  role: 'Rapporteur, Plenary Sessions',
  track: 'Plenary'
}];
function SpeakersScreen() {
  return React.createElement('section', {
    style: {
      padding: '56px 48px',
      fontFamily: 'var(--font-sans)',
      maxWidth: '900px',
      margin: '0 auto'
    }
  }, React.createElement('h2', {
    style: {
      fontSize: 'var(--text-h2)',
      fontWeight: 700,
      color: 'var(--ink-900)',
      margin: '0 0 24px'
    }
  }, 'Speakers'), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    }
  }, SPEAKERS.map((s, i) => React.createElement('div', {
    key: i,
    style: {
      display: 'flex',
      gap: '16px',
      padding: '20px',
      background: '#fff',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)'
    }
  }, React.createElement('div', {
    style: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'var(--symposium-blue-tint)',
      color: 'var(--symposium-blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '18px',
      flexShrink: 0
    }
  }, s.name.split(' ').map(w => w[0]).join('')), React.createElement('div', null, React.createElement('div', {
    style: {
      fontWeight: 600,
      color: 'var(--ink-900)',
      fontSize: 'var(--text-body-lg)'
    }
  }, s.name), React.createElement('div', {
    style: {
      color: 'var(--slate-600)',
      fontSize: 'var(--text-body-sm)',
      margin: '2px 0 8px'
    }
  }, s.role), React.createElement('span', {
    style: {
      fontSize: 'var(--text-label-caps)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      color: 'var(--symposium-blue)',
      fontWeight: 600
    }
  }, s.track))))));
}
Object.assign(__ds_scope, { SpeakersScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/conference-website/SpeakersScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.AgendaScreen = __ds_scope.AgendaScreen;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.RegisterDrawer = __ds_scope.RegisterDrawer;

__ds_ns.SpeakersScreen = __ds_scope.SpeakersScreen;

})();
