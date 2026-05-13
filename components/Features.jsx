// Features grid — numbered items in a two-column layout
function Features({ t }) {
  const title = t.features.title.split('\n');
  return (
    <section className="section bg-darker" id="features" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{t.features.eyebrow}</div>
            <h2 className="display-l">
              {title[0]}<br/>
              <span style={{ color: 'var(--magenta)' }}>{title[1]}</span>
            </h2>
          </div>
          <p className="lead">{t.features.lead}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid var(--line)',
          borderLeft: '1px solid var(--line)',
        }} className="features-grid">
          {t.features.items.map((it, i) => (
            <div key={i} style={{
              padding: '40px 32px',
              borderRight: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
              position: 'relative',
              minHeight: 260,
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.015)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div className="mono" style={{
                fontSize: 11, color: 'var(--magenta)', letterSpacing: '0.2em',
                marginBottom: 32,
              }}>{it.k} / 06</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22, fontWeight: 500,
                letterSpacing: '-0.01em',
                marginBottom: 16,
              }}>{it.t}</h3>
              <p style={{
                fontSize: 14, lineHeight: 1.6,
                color: 'var(--text-1)',
              }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1200px) and (min-width: 901px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
window.Features = Features;
