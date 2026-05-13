function ProductFeatures({ product, lang, pt }) {
  return (
    <section className="section bg-darker">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, marginBottom: 64, alignItems: 'end' }} className="pf-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{pt.features}</div>
            <h2 className="display-l">{lang === 'tr' ? 'Neden ' + product.code + '?' : 'Why ' + product.code + '?'}</h2>
          </div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)',
        }} className="pf-grid">
          {product.features.map((f, i) => (
            <div key={i} style={{
              padding: '36px 32px',
              borderRight: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
              minHeight: 220,
            }}>
              <div className="mono" style={{ fontSize: 11, color: product.color, letterSpacing: '0.2em', marginBottom: 24 }}>
                0{i + 1} / 0{product.features.length}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em', marginBottom: 14 }}>
                {f[lang][0]}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-1)' }}>{f[lang][1]}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .pf-grid { grid-template-columns: 1fr !important; }
          .pf-header { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.ProductFeatures = ProductFeatures;
