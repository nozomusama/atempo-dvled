// Tweaks panel — host-integrated design controls
function Tweaks({ tweaks, setTweaks, active }) {
  if (!active) return null;

  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  const accentOptions = [
    { v: '#E6007E', name: 'Magenta' },
    { v: '#00E5FF', name: 'Cyan' },
    { v: '#FF4D00', name: 'Orange' },
    { v: '#00D68F', name: 'Green' },
    { v: '#6A5ACD', name: 'Violet' },
  ];

  return (
    <div style={{
      position: 'fixed', right: 24, bottom: 96, zIndex: 95,
      width: 280,
      background: 'var(--bg-2)',
      border: '1px solid var(--line-strong)',
      padding: 20, borderRadius: 2,
      boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--text-0)' }}>◉ TWEAKS</span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--text-2)', marginBottom: 10 }}>ACCENT</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {accentOptions.map(o => (
            <button key={o.v} onClick={() => update('accent', o.v)} title={o.name} style={{
              width: 32, height: 32,
              background: o.v,
              border: tweaks.accent === o.v ? '2px solid white' : '2px solid transparent',
              outline: tweaks.accent === o.v ? '1px solid var(--text-3)' : 'none',
              borderRadius: 2,
              cursor: 'pointer',
            }} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--text-2)', marginBottom: 10 }}>THEME</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {['dark', 'light'].map(m => (
            <button key={m} onClick={() => update('theme', m)} style={{
              padding: '10px 14px',
              background: tweaks.theme === m ? 'var(--text-0)' : 'transparent',
              color: tweaks.theme === m ? 'var(--bg-0)' : 'var(--text-1)',
              border: '1px solid var(--line-strong)',
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>{m}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--text-2)', marginBottom: 10 }}>DENSITY</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {['comfortable', 'compact'].map(m => (
            <button key={m} onClick={() => update('density', m)} style={{
              padding: '10px 14px',
              background: tweaks.density === m ? 'var(--text-0)' : 'transparent',
              color: tweaks.density === m ? 'var(--bg-0)' : 'var(--text-1)',
              border: '1px solid var(--line-strong)',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>{m}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
window.Tweaks = Tweaks;
