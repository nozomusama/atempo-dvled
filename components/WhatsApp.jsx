function WhatsApp({ lang }) {
  const [open, setOpen] = React.useState(false);
  const label = lang === 'tr' ? 'Canlı destek · WhatsApp' : 'Live support · WhatsApp';
  const hint = lang === 'tr' ? 'Çevrim içi — ort. 2 dk yanıt' : 'Online — avg. 2 min reply';

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 90 }}>
      {open && (
        <div style={{
          position: 'absolute', bottom: 72, right: 0, width: 300,
          background: 'var(--bg-2)', border: '1px solid var(--line-strong)',
          padding: 20, borderRadius: 2,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          animation: 'fadeInUp 0.25s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 8px var(--success)' }} />
            <span className="mono" style={{ fontSize: 10, color: 'var(--success)', letterSpacing: '0.15em' }}>{hint}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, marginBottom: 10 }}>{label}</div>
          <p style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5, marginBottom: 16 }}>
            {lang === 'tr' ? 'Teknik ekibimize doğrudan soru sorun. Pixel pitch, fiyatlandırma veya kurulum.' : 'Ask our technical team directly. Pixel pitch, pricing or installation.'}
          </p>
          <a href="https://wa.me/905551234567" target="_blank" rel="noopener" className="btn btn-primary" style={{ width: '100%', background: '#25D366', color: 'white', fontSize: 13 }}>
            {lang === 'tr' ? 'WhatsApp\'ta aç' : 'Open in WhatsApp'}
          </a>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{
        width: 56, height: 56, borderRadius: '50%',
        background: '#25D366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5 L17 17 M17 5 L5 17" stroke="white" strokeWidth="2"/></svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.6 6.3A8 8 0 0 0 4 11.8a8 8 0 0 0 1.1 4L4 20l4.3-1.1a8 8 0 0 0 11.3-7 8 8 0 0 0-2-5.6zm-5.6 12.3a6.6 6.6 0 0 1-3.4-.9l-.2-.1-2.5.6.7-2.4-.2-.2a6.6 6.6 0 1 1 5.6 3zm3.6-5a47 47 0 0 0-1.3-.6c-.2 0-.3 0-.4.2l-.6.7c-.1.1-.2.1-.4 0a5.4 5.4 0 0 1-2.7-2.3c-.2-.4.2-.3.5-1 0-.1 0-.3-.1-.4l-.5-1.3c-.1-.3-.3-.3-.4-.3h-.4c-.1 0-.4 0-.6.3a2.3 2.3 0 0 0-.7 1.7 4 4 0 0 0 .8 2.1 9 9 0 0 0 3.5 3.1c1.3.5 1.8.6 2.4.5a2 2 0 0 0 1.3-1c.2-.3.2-.6 0-.7l-.4-.1z"/></svg>
        )}
      </button>
    </div>
  );
}
window.WhatsApp = WhatsApp;
