// Multi-step quote form
function Quote({ t, lang, prefill, onConsumePrefill }) {
  const [step, setStep] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [form, setForm] = React.useState({
    useCase: '', env: '', timeline: '',
    size: '', pitch: '', budget: '',
    name: '', company: '', email: '', phone: '', notes: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Absorb prefill from configurator
  React.useEffect(() => {
    if (prefill) {
      setForm(f => ({ ...f, ...prefill }));
      setDone(false);
      setStep(2); // jump to contact step
      onConsumePrefill && onConsumePrefill();
    }
  }, [prefill]);

  const canNext = () => {
    if (step === 0) return form.useCase && form.env && form.timeline;
    if (step === 1) return form.size;
    return form.name && form.email && form.company;
  };

  return (
    <section className="section" id="contact" style={{ background: 'linear-gradient(180deg, var(--bg-0), #0a0c12)' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{t.quote.eyebrow}</div>
            <h2 className="display-l">{t.quote.title}</h2>
          </div>
          <p className="lead">{t.quote.lead}</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0,
          border: '1px solid var(--line)',
        }} className="quote-wrap">
          {/* Step indicator */}
          <div style={{ padding: 40, background: 'var(--bg-2)', borderRight: '1px solid var(--line)' }}>
            {t.quote.steps.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 0',
                opacity: done ? 0.5 : 1,
              }}>
                <div style={{
                  width: 32, height: 32,
                  border: step >= i ? '1px solid var(--magenta)' : '1px solid var(--line-strong)',
                  background: step > i || done ? 'var(--magenta)' : 'transparent',
                  color: step > i || done ? 'white' : step === i ? 'var(--magenta)' : 'var(--text-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
                  transition: 'all 0.25s',
                }}>
                  {step > i || done ? '✓' : i + 1}
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-3)' }}>STEP 0{i + 1}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: step === i && !done ? 'var(--text-0)' : 'var(--text-1)' }}>{s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ padding: '48px 48px', background: 'var(--bg-1)', minHeight: 520 }}>
            {done ? (
              <SuccessView t={t} />
            ) : (
              <>
                {step === 0 && <Step1 t={t} form={form} set={set} />}
                {step === 1 && <Step2 t={t} form={form} set={set} />}
                {step === 2 && <Step3 t={t} form={form} set={set} />}

                <div style={{ display: 'flex', gap: 12, marginTop: 40, justifyContent: 'space-between' }}>
                  <button className="btn btn-ghost" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
                    style={{ opacity: step === 0 ? 0.4 : 1, cursor: step === 0 ? 'not-allowed' : 'pointer' }}>
                    ← {t.quote.prev}
                  </button>
                  {step < 2 ? (
                    <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canNext()}
                      style={{ opacity: canNext() ? 1 : 0.5 }}>
                      {t.quote.next} →
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => setDone(true)} disabled={!canNext()}
                      style={{ opacity: canNext() ? 1 : 0.5 }}>
                      {t.quote.submit}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .quote-wrap { grid-template-columns: 1fr !important; }
          .quote-wrap > div:first-child { border-right: none !important; border-bottom: 1px solid var(--line); }
        }
      `}</style>
    </section>
  );
}

function FieldLabel({ children }) {
  return <label className="mono" style={{ display: 'block', fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-2)', textTransform: 'uppercase', marginBottom: 12 }}>{children}</label>;
}

function ChipGroup({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{
          padding: '10px 16px',
          border: value === o ? '1px solid var(--magenta)' : '1px solid var(--line-strong)',
          background: value === o ? 'rgba(230,0,126,0.1)' : 'transparent',
          color: value === o ? 'var(--text-0)' : 'var(--text-1)',
          fontSize: 13, fontWeight: 500,
          transition: 'all 0.15s',
          borderRadius: 2,
        }}>{o}</button>
      ))}
    </div>
  );
}

function Step1({ t, form, set }) {
  const s = t.quote.s1;
  return (
    <div>
      <h3 className="display-m" style={{ marginBottom: 32 }}>{s.title}</h3>
      <div style={{ marginBottom: 28 }}>
        <FieldLabel>{s.useCase}</FieldLabel>
        <ChipGroup options={s.useCaseOpts} value={form.useCase} onChange={v => set('useCase', v)} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <FieldLabel>{s.env}</FieldLabel>
        <ChipGroup options={s.envOpts} value={form.env} onChange={v => set('env', v)} />
      </div>
      <div>
        <FieldLabel>{s.timeline}</FieldLabel>
        <ChipGroup options={s.timelineOpts} value={form.timeline} onChange={v => set('timeline', v)} />
      </div>
    </div>
  );
}
function Step2({ t, form, set }) {
  const s = t.quote.s2;
  return (
    <div>
      <h3 className="display-m" style={{ marginBottom: 32 }}>{s.title}</h3>
      <div style={{ marginBottom: 28 }}>
        <FieldLabel>{s.size}</FieldLabel>
        <ChipGroup options={s.sizeOpts} value={form.size} onChange={v => set('size', v)} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <FieldLabel>{s.pitch}</FieldLabel>
        <ChipGroup options={s.pitchOpts} value={form.pitch} onChange={v => set('pitch', v)} />
      </div>
      <div>
        <FieldLabel>{s.budget}</FieldLabel>
        <ChipGroup options={s.budgetOpts} value={form.budget} onChange={v => set('budget', v)} />
      </div>
    </div>
  );
}
function Step3({ t, form, set }) {
  const s = t.quote.s3;
  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'var(--bg-2)',
    border: '1px solid var(--line-strong)',
    color: 'var(--text-0)',
    fontSize: 14, fontFamily: 'var(--font-body)',
    borderRadius: 2,
    outline: 'none',
    transition: 'border-color 0.15s',
  };
  return (
    <div>
      <h3 className="display-m" style={{ marginBottom: 32 }}>{s.title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div><FieldLabel>{s.name}</FieldLabel><input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} onFocus={e => e.target.style.borderColor = 'var(--magenta)'} onBlur={e => e.target.style.borderColor = 'var(--line-strong)'} /></div>
        <div><FieldLabel>{s.company}</FieldLabel><input style={inputStyle} value={form.company} onChange={e => set('company', e.target.value)} onFocus={e => e.target.style.borderColor = 'var(--magenta)'} onBlur={e => e.target.style.borderColor = 'var(--line-strong)'} /></div>
        <div><FieldLabel>{s.email}</FieldLabel><input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} onFocus={e => e.target.style.borderColor = 'var(--magenta)'} onBlur={e => e.target.style.borderColor = 'var(--line-strong)'} /></div>
        <div><FieldLabel>{s.phone}</FieldLabel><input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} onFocus={e => e.target.style.borderColor = 'var(--magenta)'} onBlur={e => e.target.style.borderColor = 'var(--line-strong)'} /></div>
        <div style={{ gridColumn: '1 / -1' }}><FieldLabel>{s.notes}</FieldLabel><textarea rows="4" style={{ ...inputStyle, resize: 'vertical' }} value={form.notes} onChange={e => set('notes', e.target.value)} onFocus={e => e.target.style.borderColor = 'var(--magenta)'} onBlur={e => e.target.style.borderColor = 'var(--line-strong)'} /></div>
      </div>
    </div>
  );
}

function SuccessView({ t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%', minHeight: 440 }}>
      <div style={{
        width: 56, height: 56, borderRadius: 2,
        background: 'var(--magenta)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28,
        boxShadow: '0 0 40px var(--magenta-glow)',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12 L10 17 L19 8" stroke="white" strokeWidth="2"/></svg>
      </div>
      <h3 className="display-l" style={{ marginBottom: 16, maxWidth: 500 }}>
        {t.quote.success[0]}<br/>
        <span style={{ color: 'var(--magenta)' }}>{t.quote.success[1]}</span>
      </h3>
      <p style={{ fontSize: 16, color: 'var(--text-1)', maxWidth: 480, lineHeight: 1.6 }}>{t.quote.successSub}</p>
    </div>
  );
}

window.Quote = Quote;
