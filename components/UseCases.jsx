// Use cases — split-pane showcase with tabs
function UseCases({ t }) {
  const [active, setActive] = React.useState(0);
  const items = t.useCases.items;
  const cur = items[active];

  return (
    <section className="section" id="applications" style={{ background: 'var(--bg-0)', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{t.useCases.eyebrow}</div>
            <h2 className="display-l">{t.useCases.title}</h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 0,
          border: '1px solid var(--line)',
          minHeight: 560,
        }} className="usecase-wrap">
          {/* Left tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--line)' }}>
            {items.map((it, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                textAlign: 'left',
                padding: '28px 28px',
                borderBottom: i < items.length - 1 ? '1px solid var(--line)' : 'none',
                background: active === i ? 'var(--bg-2)' : 'transparent',
                borderLeft: active === i ? '3px solid var(--magenta)' : '3px solid transparent',
                transition: 'all 0.2s',
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18, fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: active === i ? 'var(--text-0)' : 'var(--text-1)',
                }}>{it.t}</span>
                <span className="mono" style={{
                  fontSize: 10, color: active === i ? 'var(--magenta)' : 'var(--text-3)',
                  letterSpacing: '0.2em',
                }}>0{i + 1}</span>
              </button>
            ))}
          </div>

          {/* Right detail pane */}
          <div style={{
            padding: '48px 48px',
            background: 'linear-gradient(180deg, var(--bg-1), var(--bg-0))',
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            <UseCaseVisual id={cur.id} />
            <div style={{ marginTop: 40 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', color: 'var(--magenta)', marginBottom: 16 }}>
                USE CASE · 0{active + 1}
              </div>
              <h3 className="display-m" style={{ marginBottom: 16 }}>{cur.t}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-1)', maxWidth: 560, marginBottom: 28 }}>{cur.d}</p>
              <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 16, borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-3)' }}>{cur.stat[0]}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: 'var(--cyan)' }}>{cur.stat[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .usecase-wrap { grid-template-columns: 1fr !important; }
          .usecase-wrap > div:first-child { border-right: none !important; border-bottom: 1px solid var(--line) !important; flex-direction: row !important; overflow-x: auto !important; }
          .usecase-wrap > div:first-child button { min-width: 200px !important; border-bottom: none !important; border-right: 1px solid var(--line) !important; }
        }
      `}</style>
    </section>
  );
}

function UseCaseVisual({ id }) {
  // Abstract scene — stacked LED panels, rack of modules, etc
  const visuals = {
    corporate: <SceneLobby />,
    broadcast: <SceneBroadcast />,
    control: <SceneControl />,
    auditorium: <SceneAudio />,
    stage: <SceneStage />,
  };
  return (
    <div style={{
      flex: 1, minHeight: 300,
      background: 'var(--bg-2)',
      border: '1px solid var(--line)',
      position: 'relative', overflow: 'hidden',
    }}>
      {visuals[id] || <SceneLobby />}
    </div>
  );
}

// Scene placeholders — simplified schematic/isometric shapes
function SceneBase({ children, label }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {children}
      <div style={{
        position: 'absolute', top: 16, right: 20,
        fontFamily: 'var(--font-mono)', fontSize: 10,
        letterSpacing: '0.15em', color: 'var(--text-3)',
      }}>{label}</div>
    </div>
  );
}
function SceneLobby() {
  return (
    <SceneBase label="CORPORATE LOBBY · 8×3m">
      {/* floor */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(180deg, transparent, rgba(230,0,126,0.06))' }} />
      {/* LED wall */}
      <div style={{ position: 'absolute', top: '22%', left: '15%', right: '15%', bottom: '22%',
        background: 'linear-gradient(135deg, #1a1d2a, #0a0c12)',
        boxShadow: '0 0 80px rgba(230,0,126,0.3), inset 0 0 60px rgba(230,0,126,0.15)',
        border: '1px solid rgba(230,0,126,0.4)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 6px, rgba(230,0,126,0.08) 6px, rgba(230,0,126,0.08) 7px), repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(0,229,255,0.05) 6px, rgba(0,229,255,0.05) 7px)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>ATEMPO</div>
      </div>
      {/* people silhouettes */}
      <div style={{ position: 'absolute', bottom: 30, left: '35%', width: 6, height: 28, background: 'rgba(255,255,255,0.25)', borderRadius: 3 }} />
      <div style={{ position: 'absolute', bottom: 30, left: '50%', width: 6, height: 32, background: 'rgba(255,255,255,0.3)', borderRadius: 3 }} />
      <div style={{ position: 'absolute', bottom: 30, left: '62%', width: 6, height: 24, background: 'rgba(255,255,255,0.22)', borderRadius: 3 }} />
    </SceneBase>
  );
}
function SceneBroadcast() {
  return (
    <SceneBase label="XR STUDIO · CURVED LED">
      {/* curved led wall */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="bcGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#E6007E" stopOpacity="0.5"/>
            <stop offset="1" stopColor="#00E5FF" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <path d="M 40 80 Q 200 40 360 80 L 360 220 Q 200 180 40 220 Z" fill="url(#bcGrad)" opacity="0.6"/>
        <path d="M 40 80 Q 200 40 360 80 L 360 220 Q 200 180 40 220 Z" fill="none" stroke="rgba(230,0,126,0.6)" strokeWidth="1"/>
        {/* horizontal lines */}
        {[100, 120, 140, 160, 180, 200].map(y => (
          <path key={y} d={`M 40 ${y} Q 200 ${y - 20} 360 ${y}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
        ))}
        {/* camera */}
        <rect x="180" y="240" width="40" height="24" fill="#1a1d2a" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        <circle cx="200" cy="252" r="6" fill="none" stroke="rgba(0,229,255,0.5)" strokeWidth="0.5"/>
        <rect x="196" y="232" width="8" height="8" fill="#1a1d2a"/>
      </svg>
    </SceneBase>
  );
}
function SceneControl() {
  return (
    <SceneBase label="CONTROL ROOM · VIDEO WALL">
      <div style={{ position: 'absolute', top: '20%', left: '12%', right: '12%', bottom: '35%',
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: 1,
        background: 'rgba(0,229,255,0.15)', padding: 1, border: '1px solid rgba(0,229,255,0.4)',
      }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            background: `rgba(${i % 3 === 0 ? '0,229,255' : i % 5 === 0 ? '230,0,126' : '255,255,255'},${0.08 + (i % 5) * 0.03})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: '60%', height: 2, background: 'rgba(255,255,255,0.2)' }} />
          </div>
        ))}
      </div>
      {/* desks */}
      <div style={{ position: 'absolute', bottom: '10%', left: '20%', right: '20%', height: 24,
        background: 'linear-gradient(180deg, #181c28, #0a0c12)', border: '1px solid var(--line)' }} />
    </SceneBase>
  );
}
function SceneAudio() {
  return (
    <SceneBase label="AUDITORIUM · 12m WIDE">
      <div style={{ position: 'absolute', top: '18%', left: '10%', right: '10%', bottom: '45%',
        background: 'radial-gradient(ellipse, rgba(230,0,126,0.35), rgba(10,12,18,0.9))',
        border: '1px solid rgba(230,0,126,0.4)',
        boxShadow: '0 0 60px rgba(230,0,126,0.3)',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 4px, rgba(255,255,255,0.06) 4px, rgba(255,255,255,0.06) 5px)' }} />
      </div>
      {/* seating */}
      {[0, 1, 2, 3].map(r => (
        <div key={r} style={{
          position: 'absolute', left: `${14 + r * 2}%`, right: `${14 + r * 2}%`,
          bottom: `${10 + r * 6}%`, height: 4,
          background: 'rgba(255,255,255,0.1)',
        }} />
      ))}
    </SceneBase>
  );
}
function SceneStage() {
  return (
    <SceneBase label="CONCERT STAGE · DX3.9">
      <div style={{ position: 'absolute', bottom: '20%', left: '15%', right: '15%', top: '25%',
        display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2,
      }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} style={{
            background: 'linear-gradient(180deg, #2a1a3a, #0a0c12)',
            border: '1px solid rgba(230,0,126,0.2)',
          }} />
        ))}
      </div>
      {/* lights */}
      <div style={{ position: 'absolute', top: '8%', left: '25%', width: 40, height: 2, background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.8), transparent)' }} />
      <div style={{ position: 'absolute', top: '8%', right: '25%', width: 40, height: 2, background: 'linear-gradient(90deg, transparent, rgba(230,0,126,0.8), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 20, left: '45%', width: 10, height: 24, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
    </SceneBase>
  );
}

window.UseCases = UseCases;
