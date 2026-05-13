// Reference projects grid
function Projects({ t }) {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{t.projects.eyebrow}</div>
            <h2 className="display-l">{t.projects.title}</h2>
          </div>
          <p className="lead">{t.projects.lead}</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
          background: 'var(--line)', border: '1px solid var(--line)',
        }} className="projects-grid">
          {t.projects.items.map((p, i) => (
            <ProjectCard key={i} p={p} idx={i} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function ProjectCard({ p, idx }) {
  const [hover, setHover] = React.useState(false);
  // Abstract placeholder visuals — varied
  const palettes = [
    ['#2a1a3a', '#E6007E'],
    ['#0a2a3a', '#00E5FF'],
    ['#1a1a2a', '#6A5ACD'],
    ['#2a201a', '#FFB020'],
    ['#1a2a2a', '#00D68F'],
    ['#2a1a2a', '#E6007E'],
  ];
  const [bg, accent] = palettes[idx % palettes.length];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-0)',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
      }}>
      {/* Image placeholder */}
      <div style={{
        aspectRatio: '4/3',
        background: `linear-gradient(135deg, ${bg}, #05060a)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* schematic LED wall */}
        <div style={{
          position: 'absolute', top: '25%', left: '20%', right: '20%', bottom: '35%',
          background: `radial-gradient(ellipse at center, ${accent}40, transparent 70%)`,
          border: `1px solid ${accent}60`,
          boxShadow: `0 0 40px ${accent}40`,
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.4s',
        }}>
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 4px)' }} />
        </div>
        {/* scanline */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)',
          mixBlendMode: 'multiply',
        }} />
        {/* label chip */}
        <div className="mono" style={{
          position: 'absolute', top: 16, left: 16,
          fontSize: 9, letterSpacing: '0.2em',
          color: 'white',
          background: 'rgba(0,0,0,0.6)',
          padding: '5px 9px',
          textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>{p.cat}</div>
        {/* image note */}
        <div className="mono" style={{
          position: 'absolute', bottom: 14, right: 14,
          fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em',
        }}>PROJECT RENDER</div>
      </div>

      <div style={{ padding: '24px 24px 28px' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 14, gap: 16,
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500,
            letterSpacing: '-0.015em',
          }}>{p.t}</h3>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{
            opacity: hover ? 1 : 0.3, transform: hover ? 'translate(2px, -2px)' : 'none',
            transition: 'all 0.2s', flexShrink: 0,
          }}>
            <path d="M4 10 L10 4 M10 4 L10 8 M10 4 L6 4" stroke="var(--magenta)" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase' }}>
          {p.loc}
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.08em' }}>
          {p.spec}
        </div>
      </div>
    </div>
  );
}

window.Projects = Projects;
