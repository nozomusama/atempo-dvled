// Trust section — client logos marquee + certifications grid
function Trust({ t }) {
  const tt = t.trust;
  const clients = [
    'TRT', 'Akbank', 'Sabancı Holding', 'TEİAŞ',
    'Zorlu PSM', 'CNN Türk', 'Anadolu Ajansı', 'Borusan',
    'Türk Telekom', 'Cumhurbaşkanlığı', 'NTV', 'Garanti BBVA',
  ];
  const doubledClients = [...clients, ...clients];

  return (
    <section id="trust" className="section bg-darker" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{tt.eyebrow}</div>
            <h2 className="display-l">{tt.title}</h2>
          </div>
          <p className="lead">{tt.lead}</p>
        </div>

        {/* Clients marquee */}
        <div style={{ marginBottom: 72 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.22em', marginBottom: 20, textTransform: 'uppercase' }}>
            {tt.clientsLabel}
          </div>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <div className="trust-track" style={{
              display: 'flex',
              gap: 56,
              padding: '28px 0',
              animation: 'trustSlide 40s linear infinite',
              width: 'max-content',
            }}>
              {doubledClients.map((c, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-2)',
                  whiteSpace: 'nowrap',
                  opacity: 0.7,
                }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications grid */}
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.22em', marginBottom: 24, textTransform: 'uppercase' }}>
            {tt.certsLabel}
          </div>
          <div className="trust-certs" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}>
            {tt.certs.map(([name, desc], i) => (
              <CertCard key={i} name={name} desc={desc} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trustSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-track { animation: none !important; }
        }
        @media (max-width: 1100px) {
          .trust-certs { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .trust-certs { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function CertCard({ name, desc }) {
  return (
    <div style={{
      background: 'var(--bg-2)',
      padding: '28px 22px',
      display: 'flex', flexDirection: 'column', gap: 10,
      minHeight: 150,
    }}>
      <div style={{
        width: 36, height: 36,
        border: '1px solid var(--magenta)',
        color: 'var(--magenta)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 6,
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1.5 L11 5.5 L15.5 6.2 L12.3 9.4 L13 14 L9 11.8 L5 14 L5.7 9.4 L2.5 6.2 L7 5.5 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        </svg>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em' }}>{name}</div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

window.Trust = Trust;
