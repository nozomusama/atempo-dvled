// Product series catalog — 6 cards with LED preview visualization
function Series({ t }) {
  const [hovered, setHovered] = React.useState(null);
  return (
    <section className="section bg-light" id="series">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{t.series.eyebrow}</div>
            <h2 className="display-l" style={{ color: '#05060A' }}>{t.series.title}</h2>
          </div>
          <p className="lead">{t.series.lead}</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
          background: '#d8dae0',
          border: '1px solid #d8dae0',
        }} className="series-grid">
          {t.series.items.map((it, i) => {
            const codes = ['AX', 'BX', 'CX', 'DX', 'EX', 'FX'];
            return (
            <a key={i} href={`Product.html?series=${codes[i]}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? '#FFFFFF' : '#F4F5F8',
                padding: '32px 28px 28px',
                display: 'flex', flexDirection: 'column', gap: 24,
                minHeight: 420,
                position: 'relative', overflow: 'hidden',
                cursor: 'pointer',
                transition: 'background 0.25s',
                textDecoration: 'none',
                color: 'inherit',
              }}>
              {/* Series visual */}
              <SeriesVisual idx={i} active={hovered === i} />

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div className="mono" style={{ fontSize: 12, letterSpacing: '0.15em', fontWeight: 600, color: '#05060A' }}>
                  {it.code}
                </div>
                <span style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.15em', color: 'var(--magenta)',
                  padding: '3px 8px', border: '1px solid var(--magenta)',
                  borderRadius: 1,
                }}>{it.hl}</span>
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#6a6f7e', marginBottom: 4, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>PIXEL PITCH</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: '#05060A' }}>{it.pitch}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 'auto' }}>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: '#6a6f7e', marginBottom: 6 }}>ORTAM</div>
                  <div style={{ fontSize: 13, color: '#05060A', fontWeight: 500 }}>{it.env}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: '#6a6f7e', marginBottom: 6 }}>PARLAKLIK</div>
                  <div style={{ fontSize: 13, color: '#05060A', fontWeight: 500 }}>{it.brightness}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#3a3f4e', lineHeight: 1.5, borderTop: '1px solid #e4e6ec', paddingTop: 14 }}>{it.apps}</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.2em', color: 'var(--magenta)',
                textTransform: 'uppercase', marginTop: 4,
              }}>
                <span>{hovered === i ? 'Detaylara git' : 'İncele'}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6 L10 6 M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
              </div>
            </a>
          );})}
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) {
          .series-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .series-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function SeriesVisual({ idx, active }) {
  // Mini pixel-pitch visualization — dot density varies by series
  const density = [18, 14, 12, 9, 7, 10][idx] || 10;
  const color = ['#E6007E', '#00B8D4', '#6A5ACD', '#FF6A00', '#FFB020', '#9333EA'][idx];
  const cells = [];
  for (let y = 0; y < density; y++) {
    for (let x = 0; x < density * 2; x++) {
      cells.push({ x, y });
    }
  }
  return (
    <div style={{
      height: 100, width: '100%',
      background: '#0A0C12',
      borderRadius: 1,
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${density * 2}, 1fr)`,
        gap: 1,
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)',
      }}>
        {cells.map((c, i) => (
          <div key={i} style={{
            background: (i * 31 + c.x * 7) % 5 === 0 ? color : `rgba(255,255,255,${(i % 7) * 0.03 + 0.04})`,
            opacity: active ? 1 : 0.7,
            transition: 'opacity 0.3s',
          }} />
        ))}
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)',
      }} />
    </div>
  );
}

window.Series = Series;
