// Product page main app
const { useState, useEffect } = React;

function ProductApp() {
  const params = new URLSearchParams(window.location.search);
  const seriesCode = (params.get('series') || 'AX').toUpperCase();
  const product = window.PRODUCTS[seriesCode] || window.PRODUCTS.AX;
  const [lang, setLang] = useState(window.TWEAKS?.language || 'tr');
  const t = window.I18N[lang];
  const pt = window.P_I18N[lang];

  useEffect(() => {
    document.title = `Atempo ${product.name} — DirectView LED`;
  }, [product]);

  const handleDownload = () => {
    window.generateBrochure(product, lang).catch(console.error);
  };

  const handleRequestQuote = (config) => {
    // Persist in sessionStorage, jump to main page contact
    sessionStorage.setItem('atempo_prefill', JSON.stringify(config));
    window.location.href = 'DirectView LED.html#contact';
  };

  return (
    <div data-screen-label={`Product · ${product.code}`}>
      <Nav lang={lang} setLang={setLang} t={t} />
      <ProductHero product={product} lang={lang} pt={pt} onDownload={handleDownload} />
      <ProductFeatures product={product} lang={lang} pt={pt} />
      <ProductConfigurator product={product} lang={lang} pt={pt} onRequestQuote={handleRequestQuote} />
      <ProductApplications product={product} lang={lang} pt={pt} />
      <ProductSpecs product={product} lang={lang} pt={pt} />
      <Footer t={t} />
      <WhatsApp lang={lang} />
    </div>
  );
}

const loader = document.getElementById('root-loading');
if (loader) loader.remove();
ReactDOM.createRoot(document.getElementById('root')).render(<ProductApp />);
