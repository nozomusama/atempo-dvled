// Hero — full-screen crossfade slider (4 slides, auto-advance, keyboard + touch nav)

function Hero({ t, lang }) {
  const isTr = lang === 'tr';

  const slides = React.useMemo(() => [
    {
      idx: 0,
      eyebrow: 'Atempo · DirectView LED',
      title1: isTr ? 'Gerçekten' : 'Truly',
      title2: isTr ? 'sınırsız' : 'borderless',
      title3: isTr ? 'görüntü.' : 'imagery.',
      sub: isTr
        ? 'Profesyonel DirectView LED ekran çözümleri — broadcast stüdyodan kontrol odasına, kurumsal lobiye sahne tasarımına. Pixel-perfect netlik, 24/7 dayanıklılık.'
        : 'Professional DirectView LED display solutions — from broadcast studios to control rooms, corporate lobbies to stage design. Pixel-perfect clarity, 24/7 durability.',
      cta1: isTr ? 'Teklif Al' : 'Get a Quote',       cta1Href: '#contact',
      cta2: isTr ? 'Ürünleri İncele' : 'Explore Products', cta2Href: '#series',
      accent: '#E6007E', accent2: '#00E5FF',
      orb1: 'rgba(230,0,126,0.26)', orb2: 'rgba(0,229,255,0.15)',
      tag: null, showStats: true,
    },
    {
      idx: 1,
      eyebrow: isTr ? 'BX · Broadcast Serisi' : 'BX · Broadcast Series',
      title1: isTr ? 'Broadcast &' : 'Built for',
      title2: isTr ? 'XR stüdyo' : 'broadcast &',
      title3: isTr ? 'çözümleri.' : 'XR studios.',
      sub: isTr
        ? 'Kamera-uyumlu, flicker-free paneller. Unreal Engine entegrasyonu ile XR sanal set ve film prodüksiyonu için optimize edilmiş 1.5–1.9 mm pitch.'
        : 'Camera-matched, flicker-free panels. Unreal Engine integration for XR virtual sets and film production. 1.5–1.9 mm pitch.',
      cta1: isTr ? 'BX Serisini Gör' : 'Explore BX Series', cta1Href: '#series',
      cta2: isTr ? 'Teklif Al' : 'Get a Quote',              cta2Href: '#contact',
      accent: '#00E5FF', accent2: '#004CE8',
      orb1: 'rgba(0,229,255,0.26)', orb2: 'rgba(0,76,232,0.2)',
      tag: isTr ? '1.5 mm · 3840 Hz · Kamera-uyumlu' : '1.5 mm · 3840 Hz · Camera-matched',
      showStats: false,
    },
    {
      idx: 2,
      eyebrow: isTr ? 'AX · IndoorFine Serisi' : 'AX · IndoorFine Series',
      title1: isTr ? 'Kontrol odasının' : 'The new standard',
      title2: isTr ? 'yeni' : 'for every',
      title3: isTr ? 'standardı.' : 'control room.',
      sub: isTr
        ? '7/24 operasyon için tasarlandı. 100.000+ saat MTBF, ön servis, sıcak değiştirilebilir modüller ve redundant güç kaynağı. 0.9 mm\'den başlayan pitch.'
        : 'Engineered for 24/7 operation. 100,000+ hour MTBF, front-service, hot-swap modules and redundant power supplies. Starting from 0.9 mm pitch.',
      cta1: isTr ? 'AX Serisini Gör' : 'Explore AX Series', cta1Href: '#series',
      cta2: isTr ? 'Teklif Al' : 'Get a Quote',              cta2Href: '#contact',
      accent: '#7B61FF', accent2: '#00E5FF',
      orb1: 'rgba(123,97,255,0.28)', orb2: 'rgba(0,229,255,0.12)',
      tag: isTr ? '0.9 mm · 100K MTBF · 7/24 Operasyon' : '0.9 mm · 100K MTBF · 24/7 Operation',
      showStats: false,
    },
    {
      idx: 3,
      eyebrow: isTr ? 'DX Stage · EX Outdoor' : 'DX Stage · EX Outdoor',
      title1: isTr ? 'Sahnede ve' : 'Commanding every',
      title2: isTr ? 'açık havada' : 'stage and',
      title3: isTr ? 'zirve.' : 'open sky.',
      sub: isTr
        ? 'DX Stage serisi 4500 nit parlaklıkla konser ve festival sahnelerinde. EX Outdoor IP65 koruması ve 6000 nit ile dijital tabela ve fasad uygulamalarında.'
        : 'DX Stage at 4500 nit for concerts and festivals. EX Outdoor with IP65 protection and 6000 nit for digital signage and facade applications.',
      cta1: isTr ? 'Serileri Gör' : 'View All Series', cta1Href: '#series',
      cta2: isTr ? 'Teklif Al' : 'Get a Quote',        cta2Href: '#contact',
      accent: '#FFB020', accent2: '#E6007E',
      orb1: 'rgba(255,176,32,0.26)', orb2: 'rgba(230,0,126,0.18)',
      tag: isTr ? '4500–6000 nit · IP54/IP65 · Outdoor' : '4500–6000 nit · IP54/IP65 · Outdoor',
      showStats: false,
    },
  ], [isTr]);

  const DURATION = 6000;
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [paused, setPaused]   = React.useState(false);
  const rafRef   = React.useRef(null);
  const savedPct = React.useRef(0);
  const touchX   = React.useRef(null);

  // ── Auto-advance (resumable on hover-pause) ──────────────────────────────
  React.useEffect(() => {
    if (paused) return;
    const offset = (savedPct.current / 100) * DURATION;
    let t0 = null;
    const tick = (ts) => {
      if (t0 === null) t0 = ts - offset;
      const pct = Math.min(((ts - t0) / DURATION) * 100, 100);
      savedPct.current = pct;
      setProgress(pct);
      if (pct >= 100) {
        savedPct.current = 0;
        setCurrent(c => (c + 1) % slides.length);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [current, paused, slides.length]);

  // ── Keyboard navigation ─────────────────────────────────────────────────
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') advance(1);
      else if (e.key === 'ArrowLeft') advance(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slides.length]);

  const advance = (dir) => {
    savedPct.current = 0;
    setProgress(0);
    setCurrent(c => (c + dir + slides.length) % slides.length);
  };
  const goTo = (idx) => { savedPct.current = 0; setProgress(0); setCurrent(idx); };

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 50) advance(delta < 0 ? 1 : -1);
    touchX.current = null;
  };

  const s = slides[current];

  return (
    <section
      style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', background: '#05060A' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slide stack ──────────────────────────────────────────────────── */}
      {slides.map((slide, i) => (
        <HeroSlide key={i} slide={slide} active={i === current} t={t} />
      ))}

      {/* ── Scanline film grain ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 8,
        background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)',
      }} />

      {/* ── Arrows ──────────────────────────────────────────────────────── */}
      <HeroArrow dir="prev" onClick={() => advance(-1)} />
      <HeroArrow dir="next" onClick={() => advance(1)} />

      {/* ── Dot navigation ──────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 6, height: 6,
              padding: 0, border: 'none', cursor: 'pointer', borderRadius: 0,
              background: i === current ? s.accent : 'rgba(255,255,255,0.22)',
              transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1), background 0.35s',
            }}
          />
        ))}
      </div>

      {/* ── Slide counter ───────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 32, right: 36, zIndex: 20,
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
        color: 'var(--text-3)', userSelect: 'none',
      }}>
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* ── Progress bar ────────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 2, background: 'rgba(255,255,255,0.06)', zIndex: 20 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: s.accent, transition: 'width 0.04s linear' }} />
      </div>

      <style>{`
        @media (max-width: 800px) {
          .hero-stats { grid-template-columns: repeat(2,1fr) !important; }
          .hero-stats > div { border-right: none !important; padding: 0 !important; padding-bottom: 16px !important; border-bottom: 1px solid var(--line); }
          .hero-stats > div:nth-child(3),
          .hero-stats > div:nth-child(4) { border-bottom: none; }
        }
        @media (max-width: 600px) {
          .hero-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ── Single slide ─────────────────────────────────────────────────────────────
function HeroSlide({ slide, active, t }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: active ? 1 : 0,
      transform: active ? 'scale(1)' : 'scale(1.04)',
      transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)',
      zIndex: active ? 2 : 1,
      pointerEvents: active ? 'auto' : 'none',
    }}>
      <HeroBackdrop slide={slide} />

      {/* Radial vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 120% 85% at 50% 50%, transparent 15%, rgba(5,6,10,0.88) 82%)',
      }} />

      <div className="container" style={{
        position: 'relative', zIndex: 3, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingTop: 72, paddingBottom: 80,
      }}>

        {/* Eyebrow + tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          <span style={{ width: 5, height: 5, background: slide.accent, display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-2)', textTransform: 'uppercase' }}>
            {slide.eyebrow}
          </span>
          {slide.tag && (
            <React.Fragment>
              <div style={{ width: 1, height: 10, background: 'var(--line-strong)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: slide.accent, textTransform: 'uppercase' }}>
                {slide.tag}
              </span>
            </React.Fragment>
          )}
        </div>

        {/* Headline */}
        <h1 className="display-xl" style={{ maxWidth: 1100, marginBottom: 28, lineHeight: 0.95 }}>
          <span style={{ color: 'var(--text-0)' }}>{slide.title1} </span>
          <span style={{
            background: `linear-gradient(95deg, ${slide.accent}, ${slide.accent2})`,
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            fontStyle: 'italic', fontWeight: 300,
            display: 'inline-block',
            paddingRight: '0.3em', marginRight: '-0.15em',
            overflow: 'visible',
          }}>{slide.title2}</span>
          <span style={{ color: 'var(--text-0)' }}> {slide.title3}</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-1)', maxWidth: 580, marginBottom: 40, fontWeight: 300 }}>
          {slide.sub}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: slide.showStats ? 72 : 0, flexWrap: 'wrap' }}>
          <a href={slide.cta1Href} className="btn btn-primary" style={{
            background: slide.accent,
            color: slide.accent === '#FFB020' ? '#05060A' : '#fff',
          }}>
            {slide.cta1}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </a>
          <a href={slide.cta2Href} className="btn btn-ghost">{slide.cta2}</a>
        </div>

        {/* Stats row — slide 0 only */}
        {slide.showStats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--line)', paddingTop: 28 }} className="hero-stats">
            {[t.hero.stat1, t.hero.stat2, t.hero.stat3, t.hero.stat4].map((st, i) => (
              <div key={i} style={{
                paddingLeft: i === 0 ? 0 : 24, paddingRight: 24,
                borderRight: i < 3 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 10 }}>
                  {st[0]}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text-0)' }}>
                  {st[1]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Animated backdrop ─────────────────────────────────────────────────────────
function HeroBackdrop({ slide }) {
  const pid = `hbp${slide.idx}`;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 80% 60% at 50% 30%, #12141f 0%, #05060a 70%)' }}>
      {/* Pixel dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.05) 1.2px, transparent 1.2px)',
        backgroundSize: '10px 10px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)',
      }} />
      {/* Primary glow orb — top right */}
      <div style={{
        position: 'absolute', top: '8%', right: '3%', width: 520, height: 520, borderRadius: '50%',
        background: `radial-gradient(circle, ${slide.orb1}, transparent 70%)`, filter: 'blur(70px)',
      }} />
      {/* Secondary glow orb — bottom left */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-2%', width: 640, height: 640, borderRadius: '50%',
        background: `radial-gradient(circle, ${slide.orb2}, transparent 70%)`, filter: 'blur(80px)',
      }} />
      {/* Horizontal sweep */}
      <div style={{
        position: 'absolute', top: '22%', left: 0, right: 0, height: 240,
        background: `linear-gradient(90deg, transparent, ${slide.orb2}, transparent)`,
        filter: 'blur(55px)', animation: 'sweepBar 18s ease-in-out infinite alternate',
      }} />
      {/* LED module grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
        <defs>
          <pattern id={pid} width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    </div>
  );
}

// ── Arrow button ──────────────────────────────────────────────────────────────
function HeroArrow({ dir, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      className="hero-arrow"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
      style={{
        position: 'absolute',
        [dir === 'prev' ? 'left' : 'right']: 24,
        top: '50%', transform: 'translateY(-50%)', zIndex: 20,
        width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
        color: hov ? '#F4F5F8' : 'rgba(255,255,255,0.4)',
        cursor: 'pointer', transition: 'all 0.2s ease', borderRadius: 0,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {dir === 'prev'
          ? <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
          : <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
        }
      </svg>
    </button>
  );
}

window.Hero = Hero;
