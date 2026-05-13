// Product Hero — series-specific with download + quote CTAs
function ProductHero({ product, lang, pt, onDownload }) {
  const [view, setView] = React.useState('front');
  const views = ['front', 'back', 'side'];
  const viewLabels = { front: 'FRONT', back: 'REAR', side: 'SIDE' };
  return (
    <section style={{
      position: 'relative',
      paddingTop: 72,
      minHeight: '90vh',
      overflow: 'hidden',
      background: `radial-gradient(ellipse 80% 60% at 50% 30%, #12141f 0%, #05060a 70%)`,
    }}>
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${product.color}2a 1.2px, transparent 1.2px)`,
          backgroundSize: '10px 10px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)',
        }} />
        <div style={{ position: 'absolute', top: '15%', right: '10%',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${product.color}33, transparent 70%)`,
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 5, paddingTop: 80, paddingBottom: 80 }}>
        <a href="DirectView LED.html#series" style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
          color: 'var(--text-2)', marginBottom: 48, display: 'inline-block',
        }}>{pt.backToAll}</a>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'center' }} className="prod-hero-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', color: product.color, textTransform: 'uppercase' }}>◉ {product.name}</span>
              <div style={{ width: 40, height: 1, background: product.color }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', color: 'var(--text-3)' }}>{product.env[lang]}</span>
            </div>

            <h1 className="display-xl" style={{ marginBottom: 32, maxWidth: 800 }}>
              <span style={{
                background: `linear-gradient(90deg, ${product.color}, ${product.accent2})`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }}>{product.tagline[lang]}</span>
            </h1>

            <p style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--text-1)', maxWidth: 560, marginBottom: 44, fontWeight: 300 }}>{product.sub[lang]}</p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#configurator" className="btn btn-primary" style={{ background: product.color }}>
                {pt.requestQuote}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5"/></svg>
              </a>
              <button onClick={onDownload} className="btn btn-ghost">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2 L7 10 M3 7 L7 11 L11 7 M2 12 L12 12" stroke="currentColor" strokeWidth="1.5"/></svg>
                {pt.downloadPDF}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 64, borderTop: '1px solid var(--line)', paddingTop: 28 }} className="prod-stats">
              {[[pt.pitch, product.pitchRange], [pt.brightness, product.brightness], [pt.mtbf, product.mtbf], [pt.env, product.env[lang]]].map((s, i) => (
                <div key={i} style={{ paddingRight: 20, borderRight: i < 3 ? '1px solid var(--line)' : 'none', paddingLeft: i > 0 ? 20 : 0 }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 10 }}>{s[0]}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>{s[1]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              aspectRatio: view === 'side' ? '3/5' : '4/5',
              background: `linear-gradient(135deg, #1a1d2a, #05060a)`,
              border: `1px solid ${product.color}40`,
              boxShadow: `0 20px 80px ${product.color}30`,
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src={product.images[view]}
                alt={`${product.name} ${view} view`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
            {/* View switcher */}
            <div style={{ display: 'flex', gap: 2 }}>
              {views.map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  flex: 1, padding: '8px 0',
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em',
                  background: 'transparent',
                  border: `1px solid ${v === view ? product.color : product.color + '30'}`,
                  borderBottom: `2px solid ${v === view ? product.color : 'transparent'}`,
                  color: v === view ? product.color : 'var(--text-3)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  {viewLabels[v]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .prod-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .prod-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 20px; }
          .prod-stats > div { border-right: none !important; padding: 0 !important; }
        }
      `}</style>
    </section>
  );
}
window.ProductHero = ProductHero;
