function ProductSpecs({ product, lang, pt }) {
  const rows = product.specs[lang];
  return (
    <section className="section bg-darker">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, marginBottom: 56, alignItems: 'end' }} className="ps-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{pt.specs}</div>
            <h2 className="display-l">{product.code}</h2>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--text-1)', maxWidth: 560 }}>{pt.specsLead}</p>
        </div>
        <div style={{ border: '1px solid var(--line)' }}>
          {rows.map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 2fr',
              padding: '18px 28px',
              borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
            }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-2)', textTransform: 'uppercase' }}>{row[0]}</div>
              <div style={{ fontSize: 14, color: 'var(--text-0)', fontWeight: 500 }}>{row[1]}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .ps-header { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.ProductSpecs = ProductSpecs;
