// Detailed spec table — all series compared
function SpecTable({ t, lang }) {
  const rows = lang === 'tr' ? [
    ['Pixel pitch', '0.9 – 1.5 mm', '1.2 – 1.9 mm', '1.5 – 2.5 mm', '2.6 – 3.9 mm', '4.0 – 10 mm', '1.9 – 6.0 mm'],
    ['Parlaklık (nit)', '600', '1500', '800', '4500', '6000', '800'],
    ['Refresh rate', '3840 Hz', '7680 Hz', '3840 Hz', '3840 Hz', '1920 Hz', '3840 Hz'],
    ['Renk derinliği', '16-bit', '16-bit', '14-bit', '14-bit', '14-bit', '14-bit'],
    ['Görüş açısı', '160° / 160°', '160° / 160°', '160° / 160°', '140° / 140°', '140° / 120°', '160° / 140°'],
    ['Modül boyutu', '500 × 500 mm', '500 × 500 mm', '500 × 500 mm', '500 × 500 mm', '960 × 960 mm', '500 × 500 mm'],
    ['Modül ağırlığı', '7.5 kg', '7.8 kg', '7.2 kg', '6.5 kg', '38 kg', '7.0 kg'],
    ['IP koruması', 'IP30', 'IP30', 'IP30', 'IP54 (ön)', 'IP65', 'IP31'],
    ['Servis', 'Ön servis', 'Ön servis', 'Ön / arka', 'Ön servis', 'Arka servis', 'Ön servis'],
    ['MTBF', '100.000 s', '100.000 s', '80.000 s', '60.000 s', '60.000 s', '80.000 s'],
  ] : [
    ['Pixel pitch', '0.9 – 1.5 mm', '1.2 – 1.9 mm', '1.5 – 2.5 mm', '2.6 – 3.9 mm', '4.0 – 10 mm', '1.9 – 6.0 mm'],
    ['Brightness (nit)', '600', '1500', '800', '4500', '6000', '800'],
    ['Refresh rate', '3840 Hz', '7680 Hz', '3840 Hz', '3840 Hz', '1920 Hz', '3840 Hz'],
    ['Color depth', '16-bit', '16-bit', '14-bit', '14-bit', '14-bit', '14-bit'],
    ['Viewing angle', '160° / 160°', '160° / 160°', '160° / 160°', '140° / 140°', '140° / 120°', '160° / 140°'],
    ['Module size', '500 × 500 mm', '500 × 500 mm', '500 × 500 mm', '500 × 500 mm', '960 × 960 mm', '500 × 500 mm'],
    ['Module weight', '7.5 kg', '7.8 kg', '7.2 kg', '6.5 kg', '38 kg', '7.0 kg'],
    ['IP rating', 'IP30', 'IP30', 'IP30', 'IP54 (front)', 'IP65', 'IP31'],
    ['Service', 'Front', 'Front', 'Front / rear', 'Front', 'Rear', 'Front'],
    ['MTBF', '100,000 hrs', '100,000 hrs', '80,000 hrs', '60,000 hrs', '60,000 hrs', '80,000 hrs'],
  ];
  const cols = [lang === 'tr' ? 'Özellik' : 'Feature', 'AX', 'BX', 'CX', 'DX', 'EX', 'FX'];

  return (
    <section className="section bg-darker">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{t.specs.eyebrow}</div>
            <h2 className="display-l">{t.specs.title}</h2>
          </div>
          <p className="lead">{t.specs.lead}</p>
        </div>

        <div style={{ border: '1px solid var(--line)', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 920 }}>
            <thead>
              <tr>
                {cols.map((c, i) => (
                  <th key={i} style={{
                    background: 'var(--bg-2)',
                    padding: '20px 20px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: i === 0 ? 'var(--text-2)' : 'var(--magenta)',
                    borderBottom: '1px solid var(--line)',
                    borderRight: i < cols.length - 1 ? '1px solid var(--line)' : 'none',
                    minWidth: i === 0 ? 180 : 120,
                  }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '16px 20px',
                      fontSize: 13,
                      fontFamily: j === 0 ? 'var(--font-mono)' : 'var(--font-body)',
                      letterSpacing: j === 0 ? '0.08em' : 'normal',
                      textTransform: j === 0 ? 'uppercase' : 'none',
                      color: j === 0 ? 'var(--text-2)' : 'var(--text-0)',
                      fontWeight: j === 0 ? 500 : 400,
                      borderBottom: '1px solid var(--line)',
                      borderRight: j < row.length - 1 ? '1px solid var(--line)' : 'none',
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
window.SpecTable = SpecTable;
