function ProductApplications({ product, lang, pt }) {
  const items = product.ideal[lang];
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 20 }}>{pt.applications}</div>
        <h2 className="display-l" style={{ marginBottom: 48 }}>
          {lang === 'tr' ? 'Ideal kullanım alanları' : 'Ideal applications'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }} className="pa-grid">
          {items.map((it, i) => (
            <div key={i} style={{ background: 'var(--bg-0)', padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 400, color: product.color, marginBottom: 12, letterSpacing: '-0.02em' }}>
                0{i + 1}
              </div>
              <div style={{ fontSize: 15, color: 'var(--text-0)', fontWeight: 500 }}>{it}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .pa-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
window.ProductApplications = ProductApplications;
