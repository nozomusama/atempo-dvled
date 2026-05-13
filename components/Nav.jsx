// Navigation bar with language toggle
const { useState, useEffect } = React;

function Nav({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Detect if we're on a sub-page — prefix hash links with main page
  const isSubPage = !/DirectView%20LED\.html$|DirectView LED\.html$|index\.html$|\/$/i.test(window.location.pathname);
  const prefix = isSubPage ? 'DirectView LED.html' : '';
  const links = [
    { href: prefix + '#features', label: t.nav.products },
    { href: prefix + '#series', label: t.nav.series },
    { href: prefix + '#applications', label: t.nav.applications },
    { href: prefix + '#projects', label: t.nav.projects },
    { href: prefix + '#configurator', label: t.nav.configurator },
    { href: prefix + '#contact', label: t.nav.contact },
    { href: 'Downloads.html', label: lang === 'tr' ? 'İndirmeler' : 'Downloads' },
    { href: 'Support.html', label: lang === 'tr' ? 'Teknik Destek' : 'Support' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(5, 6, 10, 0.78)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72,
      }}>
        <a href="DirectView LED.html" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AtempoMark />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600,
              letterSpacing: '0.08em',
            }}>ATEMPO</span>
            <span className="mono" style={{ fontSize: 9, color: 'var(--magenta)', marginTop: 3, letterSpacing: '0.22em' }}>DIRECTVIEW LED</span>
          </div>
        </a>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 32,
        }} className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: 13, fontWeight: 500, color: 'var(--text-1)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-0)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-1)'}>{l.label}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 2,
            border: '1px solid var(--line)', borderRadius: 2,
            padding: 2,
          }}>
            {['tr', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: '4px 10px', fontSize: 10, fontWeight: 600,
                letterSpacing: '0.08em', fontFamily: 'var(--font-mono)',
                background: lang === l ? 'var(--text-0)' : 'transparent',
                color: lang === l ? 'var(--bg-0)' : 'var(--text-2)',
                borderRadius: 1,
                transition: 'all 0.15s',
              }}>{l.toUpperCase()}</button>
            ))}
          </div>
          <a href={prefix + '#contact'} className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>{t.nav.quote}</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

function AtempoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L28 26 L22 26 L16 14 L10 26 L4 26 Z" fill="var(--magenta)"/>
      <circle cx="16" cy="22" r="1.8" fill="var(--magenta)"/>
    </svg>
  );
}

window.Nav = Nav;
