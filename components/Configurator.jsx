// Interactive display configurator — module count → resolution/size/power
function Configurator({ t, lang, onRequestQuote }) {
  // Series specs (module 500x500mm, each with varying pixel densities)
  const SERIES = [
    { code: 'AX', pitch: 1.2, ppm: 417, modW: 500, modH: 500, resW: 416, resH: 416, weightPerMod: 7.5, powerPerMod: 180 },
    { code: 'BX', pitch: 1.5, ppm: 333, modW: 500, modH: 500, resW: 333, resH: 333, weightPerMod: 7.8, powerPerMod: 210 },
    { code: 'CX', pitch: 1.9, ppm: 263, modW: 500, modH: 500, resW: 263, resH: 263, weightPerMod: 7.2, powerPerMod: 190 },
    { code: 'DX', pitch: 3.9, ppm: 128, modW: 500, modH: 500, resW: 128, resH: 128, weightPerMod: 6.5, powerPerMod: 320 },
    { code: 'EX', pitch: 6.0, ppm: 83,  modW: 960, modH: 960, resW: 160, resH: 160, weightPerMod: 38,  powerPerMod: 420 },
    { code: 'FX', pitch: 2.6, ppm: 192, modW: 500, modH: 500, resW: 192, resH: 192, weightPerMod: 7.0, powerPerMod: 220 },
  ];
  const [seriesIdx, setSeriesIdx] = React.useState(2);
  const [cols, setCols] = React.useState(8);
  const [rows, setRows] = React.useState(4);
  const s = SERIES[seriesIdx];
  const widthM = (cols * s.modW) / 1000;
  const heightM = (rows * s.modH) / 1000;
  const area = (widthM * heightM).toFixed(2);
  const resW = cols * s.resW;
  const resH = rows * s.resH;
  const totalMods = cols * rows;
  const weight = (totalMods * s.weightPerMod).toFixed(0);
  const power = (totalMods * s.powerPerMod).toFixed(0);
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const r = gcd(resW, resH) || 1;
  const ratio = `${resW / r}:${resH / r}`;
  const lead = lang === 'tr' ? '6 – 8 hafta' : '6 – 8 weeks';

  // Aspect preview
  const previewMax = 360;
  const aspectRatio = widthM / heightM;
  let pw, ph;
  if (aspectRatio >= 1) { pw = previewMax; ph = previewMax / aspectRatio; } else { ph = previewMax; pw = previewMax * aspectRatio; }

  return (
    <section className="section bg-darker" id="configurator">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{t.configurator.eyebrow}</div>
            <h2 className="display-l">{t.configurator.title}</h2>
          </div>
          <p className="lead">{t.configurator.lead}</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 0,
          border: '1px solid var(--line)',
        }} className="config-wrap">
          {/* Left — controls */}
          <div style={{ padding: '40px 40px', borderRight: '1px solid var(--line)', background: 'var(--bg-2)' }}>
            <div style={{ marginBottom: 32 }}>
              <label className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-2)', textTransform: 'uppercase' }}>
                {t.configurator.series}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 12 }}>
                {SERIES.map((sr, i) => (
                  <button key={i} onClick={() => setSeriesIdx(i)} style={{
                    padding: '14px 8px',
                    border: seriesIdx === i ? '1px solid var(--magenta)' : '1px solid var(--line)',
                    background: seriesIdx === i ? 'rgba(230,0,126,0.08)' : 'transparent',
                    color: seriesIdx === i ? 'var(--text-0)' : 'var(--text-1)',
                    fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                    letterSpacing: '0.05em',
                    transition: 'all 0.15s',
                  }}>
                    <div>{sr.code}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-3)', marginTop: 4, fontWeight: 400 }}>{sr.pitch.toFixed(1)} mm</div>
                  </button>
                ))}
              </div>
            </div>

            <SliderRow label={t.configurator.cols} value={cols} min={2} max={20} setValue={setCols} />
            <SliderRow label={t.configurator.rows} value={rows} min={2} max={12} setValue={setRows} />

            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
              <ReadoutCell label={t.configurator.out.size} value={`${widthM.toFixed(2)} × ${heightM.toFixed(2)} m`} sub={`${area} m²`} />
              <ReadoutCell label={t.configurator.out.resolution} value={`${resW} × ${resH}`} sub={`${(resW * resH / 1_000_000).toFixed(2)} MP`} />
              <ReadoutCell label={t.configurator.out.ratio} value={ratio} sub="" />
              <ReadoutCell label={t.configurator.out.modules} value={`${totalMods}`} sub={`${cols} × ${rows}`} />
              <ReadoutCell label={t.configurator.out.power} value={`${power} W`} sub={`${(power / 1000).toFixed(1)} kW`} />
              <ReadoutCell label={t.configurator.out.weight} value={`${weight} kg`} sub={lead} />
            </div>

            <button className="btn btn-primary" style={{ marginTop: 32, width: '100%' }}
              onClick={() => {
                // map series+pitch → sizeOpts & pitchOpts index from i18n
                const s1 = t.quote.s1;
                const s2 = t.quote.s2;
                // useCase guess by series
                const useCaseBySeries = {
                  AX: s1.useCaseOpts[0], // Control room
                  BX: s1.useCaseOpts[1], // Broadcast studio
                  CX: s1.useCaseOpts[3], // Auditorium
                  DX: s1.useCaseOpts[4], // Event / stage
                  EX: s1.useCaseOpts[5], // Outdoor
                  FX: s1.useCaseOpts[2], // Corporate
                };
                const envBySeries = { EX: s1.envOpts[1] };
                // size bucket
                const a = widthM * heightM;
                const sizeBucket = a < 10 ? s2.sizeOpts[0]
                  : a < 30 ? s2.sizeOpts[1]
                  : a < 80 ? s2.sizeOpts[2]
                  : a < 200 ? s2.sizeOpts[3]
                  : s2.sizeOpts[4];
                // pitch bucket
                const p = s.pitch;
                const pitchBucket = p < 1.5 ? s2.pitchOpts[1]
                  : p < 2.5 ? s2.pitchOpts[2]
                  : p < 4 ? s2.pitchOpts[3]
                  : s2.pitchOpts[4];
                // notes
                const summary = lang === 'tr'
                  ? `Konfigüratörden geldi — ${s.code} Serisi · ${cols}×${rows} modül · ${widthM.toFixed(2)}×${heightM.toFixed(2)} m (${a.toFixed(2)} m²) · ${resW}×${resH} px · ${power} W · ${weight} kg`
                  : `From configurator — ${s.code} Series · ${cols}×${rows} modules · ${widthM.toFixed(2)}×${heightM.toFixed(2)} m (${a.toFixed(2)} m²) · ${resW}×${resH} px · ${power} W · ${weight} kg`;
                const prefill = {
                  useCase: useCaseBySeries[s.code] || '',
                  env: envBySeries[s.code] || s1.envOpts[0],
                  timeline: '',
                  size: sizeBucket,
                  pitch: pitchBucket,
                  budget: '',
                  notes: summary,
                };
                onRequestQuote && onRequestQuote(prefill);
              }}>
              {t.configurator.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5"/></svg>
            </button>
          </div>

          {/* Right — preview */}
          <div style={{ padding: 40, display: 'flex', flexDirection: 'column', background: 'radial-gradient(ellipse at center, #0e111a, #05060a)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-3)' }}>LIVE PREVIEW · SCALE 1:50</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--cyan)' }}>◉ {s.code} SERIES</div>
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {/* Ruler-like reference */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: -28, left: 0, right: 0,
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)',
                }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--text-3)' }} />
                  <span>{widthM.toFixed(2)} m</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--text-3)' }} />
                </div>
                <div style={{
                  position: 'absolute', left: -36, top: 0, bottom: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)',
                }}>
                  <div style={{ flex: 1, width: 1, background: 'var(--text-3)' }} />
                  <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{heightM.toFixed(2)} m</span>
                  <div style={{ flex: 1, width: 1, background: 'var(--text-3)' }} />
                </div>

                {/* Screen */}
                <div style={{
                  width: pw, height: ph,
                  background: '#0a0c12',
                  display: 'grid',
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`,
                  gap: 1,
                  padding: 1,
                  border: '1px solid rgba(230,0,126,0.5)',
                  boxShadow: '0 0 60px rgba(230,0,126,0.3)',
                  transition: 'width 0.3s, height 0.3s',
                }}>
                  {Array.from({ length: totalMods }).map((_, i) => (
                    <div key={i} style={{
                      background: `hsla(${320 + (i * 7) % 40}, 80%, ${30 + (i % 7) * 4}%, 0.6)`,
                      position: 'relative',
                    }}>
                      <div style={{ position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 0.8px, transparent 0.8px)',
                        backgroundSize: '4px 4px',
                      }} />
                    </div>
                  ))}
                </div>
                {/* Human silhouette for scale (1.75m) */}
                <div style={{
                  position: 'absolute', left: pw + 20, bottom: 0,
                  height: ph * (1.75 / heightM),
                  width: 10,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '5px 5px 0 0',
                  display: pw + 60 < 520 ? 'block' : 'none',
                }} />
                <div style={{
                  position: 'absolute', left: pw + 36, bottom: 0,
                  fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)',
                  display: pw + 100 < 520 ? 'block' : 'none',
                }}>1.75 m</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .config-wrap { grid-template-columns: 1fr !important; }
          .config-wrap > div:first-child { border-right: none !important; border-bottom: 1px solid var(--line); }
        }
      `}</style>
    </section>
  );
}

function SliderRow({ label, value, min, max, setValue }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <label className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-2)', textTransform: 'uppercase' }}>{label}</label>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, color: 'var(--text-0)', letterSpacing: '-0.02em' }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => setValue(+e.target.value)}
        style={{ width: '100%', accentColor: 'var(--magenta)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function ReadoutCell({ label, value, sub }) {
  return (
    <div style={{ background: 'var(--bg-2)', padding: 20 }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-3)', marginBottom: 8, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text-0)' }}>{value}</div>
      {sub && <div className="mono" style={{ fontSize: 10, color: 'var(--cyan)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

window.Configurator = Configurator;
