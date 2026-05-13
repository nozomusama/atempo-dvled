// Horizontal scrolling application marquee
function Marquee({ items }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      padding: '20px 0',
      overflow: 'hidden',
      background: 'var(--bg-1)',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        display: 'flex',
        gap: 48,
        whiteSpace: 'nowrap',
        animation: 'tickerSlide 40s linear infinite',
        width: 'max-content',
      }}>
        {doubled.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <rect x="2" y="2" width="10" height="10" fill="none" stroke="var(--magenta)" strokeWidth="1"/>
              <rect x="5" y="5" width="4" height="4" fill="var(--magenta)"/>
            </svg>
            <span className="mono" style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-1)' }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
window.Marquee = Marquee;
