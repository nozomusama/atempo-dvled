function Footer({ t }) {
  return (
    <footer style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--line)', padding: '80px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <svg width="28" height="28" viewBox="0 0 32 32"><path d="M16 4 L28 26 L22 26 L16 14 L10 26 L4 26 Z" fill="var(--magenta)"/><circle cx="16" cy="22" r="1.8" fill="var(--magenta)"/></svg>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, letterSpacing: '0.08em' }}>ATEMPO</div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--magenta)', letterSpacing: '0.22em', marginTop: 2 }}>DIRECTVIEW LED</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.6, maxWidth: 340 }}>{t.footer.sub}</p>
          </div>
          <FooterCol title={t.footer.contact} items={[t.footer.address, 'info@atempo.com.tr', '+90 212 123 45 67']} />
          <FooterCol title={t.footer.nav} items={[t.nav.products, t.nav.series, t.nav.projects, t.nav.configurator]} />
          <FooterCol title={t.footer.legal} items={['Privacy Policy', 'Terms of Use', 'KVKK', 'Cookie Policy']} />
        </div>
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.1em' }}>{t.footer.copyright}</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.2em' }}>ATEMPO · SINCE 1997</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>{title}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((it, i) => (
          <li key={i} style={{ fontSize: 13, color: 'var(--text-1)' }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
window.Footer = Footer;
