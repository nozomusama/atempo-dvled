// Technology comparison table
function Compare({ t }) {
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{t.compare.eyebrow}</div>
            <h2 className="display-l" style={{ color: '#05060A' }}>{t.compare.title}</h2>
          </div>
          <p className="lead">{t.compare.lead}</p>
        </div>

        <div style={{ border: '1px solid #d8dae0', overflow: 'hidden' }}>
          {/* header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr',
            background: '#05060A', color: 'white',
          }}>
            {t.compare.cols.map((c, i) => (
              <div key={i} style={{
                padding: '22px 24px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500,
                color: i === 1 ? 'var(--magenta)' : 'rgba(255,255,255,0.6)',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>{c}</div>
            ))}
          </div>
          {/* rows */}
          {t.compare.rows.map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr',
              background: i % 2 === 0 ? '#FFFFFF' : '#fafbfc',
              borderTop: '1px solid #e4e6ec',
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: '18px 24px',
                  fontSize: j === 0 ? 13 : 14,
                  fontWeight: j === 0 ? 500 : j === 1 ? 500 : 400,
                  color: j === 0 ? '#3a3f4e' : j === 1 ? '#05060A' : '#6a6f7e',
                  fontFamily: j === 0 ? 'var(--font-mono)' : 'var(--font-body)',
                  letterSpacing: j === 0 ? '0.08em' : 'normal',
                  textTransform: j === 0 ? 'uppercase' : 'none',
                  borderLeft: j > 0 ? '1px solid #e4e6ec' : 'none',
                  background: j === 1 ? 'rgba(230,0,126,0.03)' : 'transparent',
                }}>
                  {j === 1 && <span style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--magenta)', borderRadius: '50%', marginRight: 10, verticalAlign: 'middle' }} />}
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Compare = Compare;
