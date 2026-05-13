// Main app — wires all components
const { useState, useEffect } = React;

function App() {
  const [lang, setLang] = window.useLang(window.TWEAKS?.language || 'tr');
  const [tweaks, setTweaks] = useState(window.TWEAKS || {});
  const [editMode, setEditMode] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState(null);
  const t = window.I18N[lang];

  // Consume sessionStorage prefill from Product.html configurator
  useEffect(() => {
    const raw = sessionStorage.getItem('atempo_prefill');
    if (raw) {
      try {
        const config = JSON.parse(raw);
        sessionStorage.removeItem('atempo_prefill');
        // Map configurator data → quote form fields
        const envLabel = lang === 'tr' ? 'İç mekan' : 'Indoor';
        const outdoorSeries = ['EX'];
        const env = outdoorSeries.includes(config.product)
          ? (lang === 'tr' ? 'Dış mekan' : 'Outdoor')
          : envLabel;
        const areaNum = parseFloat(config.area);
        let size = '';
        if (areaNum < 5) size = lang === 'tr' ? '< 5 m²' : '< 5 m²';
        else if (areaNum < 15) size = '5–15 m²';
        else if (areaNum < 40) size = '15–40 m²';
        else size = lang === 'tr' ? '> 40 m²' : '> 40 m²';
        const pitch = config.pitch < 1.5 ? '< 1.5 mm'
          : config.pitch < 2.5 ? '1.5–2.5 mm'
          : config.pitch < 4 ? '2.5–4 mm'
          : '> 4 mm';
        setQuotePrefill({
          size, pitch, env,
          notes: config.summary || '',
        });
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      } catch (e) { console.warn('prefill parse failed', e); }
    }
  }, []);

  const requestQuote = (data) => {
    setQuotePrefill(data);
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  // Apply accent to CSS
  useEffect(() => {
    if (tweaks.accent) {
      document.documentElement.style.setProperty('--magenta', tweaks.accent);
      // glow = same color @ 0.45 alpha
      const hex = tweaks.accent.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      document.documentElement.style.setProperty('--magenta-glow', `rgba(${r}, ${g}, ${b}, 0.45)`);
    }
    if (tweaks.density === 'compact') {
      document.documentElement.style.setProperty('--container', '1200px');
    } else {
      document.documentElement.style.setProperty('--container', '1360px');
    }
    if (tweaks.theme === 'light') {
      document.documentElement.style.setProperty('--bg-0', '#F4F5F8');
      document.documentElement.style.setProperty('--bg-1', '#EAECF0');
      document.documentElement.style.setProperty('--bg-2', '#FFFFFF');
      document.documentElement.style.setProperty('--text-0', '#05060A');
      document.documentElement.style.setProperty('--text-1', '#3a3f4e');
      document.documentElement.style.setProperty('--text-2', '#6a6f7e');
      document.documentElement.style.setProperty('--text-3', '#9aa0b0');
      document.documentElement.style.setProperty('--line', 'rgba(0,0,0,0.1)');
      document.documentElement.style.setProperty('--line-strong', 'rgba(0,0,0,0.18)');
    } else {
      document.documentElement.style.setProperty('--bg-0', '#05060A');
      document.documentElement.style.setProperty('--bg-1', '#0A0C12');
      document.documentElement.style.setProperty('--bg-2', '#10131C');
      document.documentElement.style.setProperty('--text-0', '#F4F5F8');
      document.documentElement.style.setProperty('--text-1', '#B8BCC8');
      document.documentElement.style.setProperty('--text-2', '#7A7F8E');
      document.documentElement.style.setProperty('--text-3', '#4A4F5E');
      document.documentElement.style.setProperty('--line', 'rgba(255,255,255,0.08)');
      document.documentElement.style.setProperty('--line-strong', 'rgba(255,255,255,0.14)');
    }
  }, [tweaks]);

  // Edit mode
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setEditMode(true);
      if (e.data?.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div id="top" data-screen-label="DirectView LED Home">
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <Marquee items={t.marquee} />
      <Features t={t} />
      <Series t={t} />
      <UseCases t={t} />
      <Configurator t={t} lang={lang} onRequestQuote={requestQuote} />
      <Compare t={t} />
      <SpecTable t={t} lang={lang} />
      <Projects t={t} />
      <Trust t={t} />
      <Quote t={t} lang={lang} prefill={quotePrefill} onConsumePrefill={() => setQuotePrefill(null)} />
      <Footer t={t} />
      <WhatsApp lang={lang} />
      <Tweaks tweaks={tweaks} setTweaks={setTweaks} active={editMode} />
    </div>
  );
}

// Remove loader + mount
const loader = document.getElementById('root-loading');
if (loader) loader.remove();
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
