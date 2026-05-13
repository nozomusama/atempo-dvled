// Product-specific configurator — series locked, only pitch variant + module count
function ProductConfigurator({ product, lang, pt, onRequestQuote }) {
  const [pitchIdx, setPitchIdx] = React.useState(0);
  const [cols, setCols] = React.useState(8);
  const [rows, setRows] = React.useState(4);

  // Adjust resolution by pitch variant
  const basePitch = product.pitches[0];
  const curPitch = product.pitches[pitchIdx];
  const resScale = basePitch / curPitch;
  const resW = Math.round(product.resW * resScale);
  const resH = Math.round(product.resH * resScale);

  const widthM = (cols * product.modW) / 1000;
  const heightM = (rows * product.modH) / 1000;
  const area = (widthM * heightM).toFixed(2);
  const fullResW = cols * resW;
  const fullResH = rows * resH;
  const totalMods = cols * rows;
  const weight = (totalMods * product.weightPerMod).toFixed(0);
  const power = (totalMods * product.powerPerMod).toFixed(0);
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const r = gcd(fullResW, fullResH) || 1;
  const ratio = `${fullResW / r}:${fullResH / r}`;

  const previewMax = 340;
  const aspectRatio = widthM / heightM;
  let pw, ph;
  if (aspectRatio >= 1) { pw = previewMax; ph = previewMax / aspectRatio; } else { ph = previewMax; pw = previewMax * aspectRatio; }

  return (
    <section className="section" id="configurator">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, marginBottom: 64, alignItems: 'end' }} className="pc-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{pt.configurator}</div>
            <h2 className="display-l">{lang === 'tr' ? product.code + ' konfigürasyonu' : 'Configure ' + product.code}</h2>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--text-1)', maxWidth: 560 }}>{pt.configuratorLead}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 0, border: '1px solid var(--line)' }} className="pc-wrap">
          <div style={{ padding: 40, borderRight: '1px solid var(--line)', background: 'var(--bg-2)' }}>
            {/* Pitch variant */}
            <div style={{ marginBottom: 32 }}>
              <label className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-2)', textTransform: 'uppercase' }}>
                {pt.pitchSelect}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${product.pitches.length}, 1fr)`, gap: 6, marginTop: 12 }}>
                {product.pitches.map((p, i) => (
                  <button key={i} onClick={() => setPitchIdx(i)} style={{
                    padding: '14px 8px',
                    border: pitchIdx === i ? `1px solid ${product.color}` : '1px solid var(--line)',
                    background: pitchIdx === i ? `${product.color}15` : 'transparent',
                    color: pitchIdx === i ? 'var(--text-0)' : 'var(--text-1)',
                    fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600,
                  }}>{p.toFixed(1)} mm</button>
                ))}
              </div>
            </div>

            <SliderField label={pt.cols} value={cols} min={2} max={20} setValue={setCols} color={product.color} />
            <SliderField label={pt.rows} value={rows} min={2} max={12} setValue={setRows} color={product.color} />

            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
              <Readout label={pt.size} value={`${widthM.toFixed(2)} × ${heightM.toFixed(2)} m`} sub={`${area} m²`} />
              <Readout label={pt.res} value={`${fullResW} × ${fullResH}`} sub={`${(fullResW * fullResH / 1_000_000).toFixed(2)} MP`} color={product.color} />
              <Readout label={pt.ratio} value={ratio} sub="" />
              <Readout label={pt.modules} value={`${totalMods}`} sub={`${cols} × ${rows}`} />
              <Readout label={pt.power} value={`${power} W`} sub={`${(power / 1000).toFixed(1)} kW`} />
              <Readout label={pt.weight} value={`${weight} kg`} sub="" />
            </div>

            <button className="btn btn-primary" style={{ marginTop: 32, width: '100%', background: product.color }}
              onClick={() => {
                const summary = lang === 'tr'
                  ? `${product.name} · ${curPitch.toFixed(1)} mm · ${cols}×${rows} modül · ${widthM.toFixed(2)}×${heightM.toFixed(2)} m (${area} m²) · ${fullResW}×${fullResH} px · ${power} W · ${weight} kg`
                  : `${product.name} · ${curPitch.toFixed(1)} mm · ${cols}×${rows} modules · ${widthM.toFixed(2)}×${heightM.toFixed(2)} m (${area} m²) · ${fullResW}×${fullResH} px · ${power} W · ${weight} kg`;
                onRequestQuote({ product: product.code, pitch: curPitch, cols, rows, widthM, heightM, area, fullResW, fullResH, power, weight, summary });
              }}>
              {pt.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5"/></svg>
            </button>
          </div>

          {/* Preview */}
          <div style={{ padding: 40, display: 'flex', flexDirection: 'column', background: 'radial-gradient(ellipse at center, #0e111a, #05060a)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-3)' }}>LIVE PREVIEW</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: product.color }}>◉ {product.code} · {curPitch.toFixed(1)}mm</div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: -28, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--text-3)' }} />
                  <span>{widthM.toFixed(2)} m</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--text-3)' }} />
                </div>
                <div style={{ width: pw, height: ph, background: '#0a0c12',
                  display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`,
                  gap: 1, padding: 1, border: `1px solid ${product.color}80`, boxShadow: `0 0 60px ${product.color}50`,
                  transition: 'width 0.3s, height 0.3s',
                }}>
                  {Array.from({ length: totalMods }).map((_, i) => (
                    <div key={i} style={{
                      background: `hsla(${320 + (i * 7) % 60}, 80%, ${30 + (i % 7) * 4}%, 0.6)`,
                      position: 'relative',
                    }}>
                      <div style={{ position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 0.8px, transparent 0.8px)',
                        backgroundSize: '4px 4px' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .pc-wrap { grid-template-columns: 1fr !important; }
          .pc-wrap > div:first-child { border-right: none !important; border-bottom: 1px solid var(--line); }
          .pc-header { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function SliderField({ label, value, min, max, setValue, color }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <label className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-2)', textTransform: 'uppercase' }}>{label}</label>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => setValue(+e.target.value)} style={{ width: '100%', accentColor: color }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}
function Readout({ label, value, sub, color }) {
  return (
    <div style={{ background: 'var(--bg-2)', padding: 18 }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-3)', marginBottom: 8, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>{value}</div>
      {sub && <div className="mono" style={{ fontSize: 10, color: color || 'var(--cyan)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
window.ProductConfigurator = ProductConfigurator;
