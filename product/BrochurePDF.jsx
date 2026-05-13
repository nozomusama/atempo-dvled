// PDF brochure generator — uses jsPDF with Roboto font for full Turkish character support
async function generateBrochure(product, lang) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pw = 210, ph = 297;

  // Register Roboto font for Turkish character support
  if (window.ROBOTO_FONT_B64) {
    doc.addFileToVFS('Roboto-Regular.ttf', window.ROBOTO_FONT_B64);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  }
  const font = window.ROBOTO_FONT_B64 ? 'Roboto' : 'helvetica';

  const hex2rgb = (h) => {
    const x = h.replace('#', '');
    return [parseInt(x.substr(0, 2), 16), parseInt(x.substr(2, 2), 16), parseInt(x.substr(4, 2), 16)];
  };
  const [r, g, b] = hex2rgb(product.color);

  // Convert SVG to PNG data URL for embedding
  async function svgToPng(svgPath, w, h) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(null);
      img.src = svgPath;
    });
  }

  // Preload panel image
  const panelPng = await svgToPng(`uploads/panel-${product.code}-front.svg`, 600, 480);

  // ===== PAGE 1 — COVER =====
  doc.setFillColor(5, 6, 10);
  doc.rect(0, 0, pw, ph, 'F');

  // Accent band
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, 8, ph, 'F');

  // Atempo mark
  doc.setFillColor(r, g, b);
  doc.triangle(20, 35, 32, 35, 26, 20, 'F');
  doc.setTextColor(244, 245, 248);
  doc.setFont(font, 'normal');
  doc.setFontSize(14);
  doc.text('ATEMPO', 38, 32);
  doc.setFontSize(7);
  doc.setTextColor(r, g, b);
  doc.text('DIRECTVIEW LED', 38, 37);

  // Series label
  doc.setTextColor(r, g, b);
  doc.setFont(font, 'normal');
  doc.setFontSize(9);
  doc.text('PRODUCT BROCHURE · ' + product.code + ' SERIES · 2026', 20, 70);

  // Product name
  doc.setTextColor(244, 245, 248);
  doc.setFontSize(40);
  doc.text(product.name.split(' · ')[1] || product.code, 20, 108);

  // Tagline
  doc.setFontSize(20);
  doc.setTextColor(r, g, b);
  doc.text(product.tagline[lang], 20, 126);

  // Sub description
  doc.setTextColor(184, 188, 200);
  doc.setFontSize(10);
  const subLines = doc.splitTextToSize(product.sub[lang], pw - 110);
  doc.text(subLines, 20, 142);

  // Panel image (right side of cover)
  if (panelPng) {
    doc.addImage(panelPng, 'PNG', 115, 58, 80, 64);
  }

  // Spec grid on cover
  const specs = product.specs[lang];
  const keyRows = [specs[0], specs[1], specs[2], specs[specs.length - 1]];
  let yy = 200;
  keyRows.forEach((row) => {
    doc.setDrawColor(60, 65, 78);
    doc.line(20, yy, pw - 20, yy);
    doc.setTextColor(122, 127, 142);
    doc.setFontSize(8);
    doc.text(row[0].toUpperCase(), 20, yy + 8);
    doc.setTextColor(244, 245, 248);
    doc.setFontSize(13);
    doc.text(row[1], pw - 20, yy + 8, { align: 'right' });
    yy += 18;
  });

  // Footer strip
  doc.setFillColor(r, g, b);
  doc.rect(0, ph - 15, pw, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('atempo.com.tr  ·  info@atempo.com.tr  ·  +90 212 123 45 67', 20, ph - 6);
  doc.text('© 2026 ATEMPO', pw - 20, ph - 6, { align: 'right' });

  // ===== PAGE 2 — FEATURES =====
  doc.addPage();
  doc.setFillColor(10, 12, 18);
  doc.rect(0, 0, pw, ph, 'F');

  doc.setTextColor(r, g, b);
  doc.setFont(font, 'normal');
  doc.setFontSize(9);
  doc.text(lang === 'tr' ? 'ÖZELLİKLER' : 'KEY FEATURES', 20, 25);

  doc.setTextColor(244, 245, 248);
  doc.setFontSize(26);
  doc.text(lang === 'tr' ? 'Neden ' + product.code + '?' : 'Why ' + product.code + '?', 20, 44);

  doc.setDrawColor(60, 65, 78);
  doc.line(20, 53, pw - 20, 53);

  let fy = 68;
  product.features.forEach((f, i) => {
    doc.setTextColor(r, g, b);
    doc.setFontSize(8);
    doc.text(`0${i + 1} / 0${product.features.length}`, 20, fy);
    doc.setTextColor(244, 245, 248);
    doc.setFontSize(14);
    doc.text(f[lang][0], 20, fy + 9);
    doc.setTextColor(184, 188, 200);
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(f[lang][1], pw - 40);
    doc.text(lines, 20, fy + 17);
    fy += 17 + lines.length * 5 + 10;
  });

  doc.setFillColor(r, g, b);
  doc.rect(0, ph - 12, pw, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('ATEMPO DIRECTVIEW LED  ·  ' + product.code + ' SERIES', 20, ph - 4);
  doc.text('2 / 3', pw - 20, ph - 4, { align: 'right' });

  // ===== PAGE 3 — SPECS =====
  doc.addPage();
  doc.setFillColor(10, 12, 18);
  doc.rect(0, 0, pw, ph, 'F');

  doc.setTextColor(r, g, b);
  doc.setFont(font, 'normal');
  doc.setFontSize(9);
  doc.text(lang === 'tr' ? 'TEKNİK SPESİFİKASYONLAR' : 'TECHNICAL SPECIFICATIONS', 20, 25);
  doc.setTextColor(244, 245, 248);
  doc.setFontSize(26);
  doc.text(product.code, 20, 44);

  let sy = 62;
  specs.forEach((row, i) => {
    if (sy > ph - 35) return;
    doc.setFillColor(i % 2 === 0 ? 16 : 22, i % 2 === 0 ? 19 : 26, i % 2 === 0 ? 28 : 34);
    doc.rect(20, sy - 5, pw - 40, 10, 'F');
    doc.setTextColor(122, 127, 142);
    doc.setFontSize(8);
    doc.text(row[0].toUpperCase(), 24, sy + 1);
    doc.setTextColor(244, 245, 248);
    doc.setFontSize(10);
    doc.text(row[1], pw - 24, sy + 1, { align: 'right' });
    sy += 11;
  });

  const appsY = Math.min(sy + 8, ph - 48);
  doc.setDrawColor(r, g, b);
  doc.line(20, appsY, pw - 20, appsY);
  doc.setTextColor(r, g, b);
  doc.setFontSize(8);
  doc.text(lang === 'tr' ? 'ÖNERİLEN UYGULAMA ALANLARI' : 'RECOMMENDED APPLICATIONS', 20, appsY + 8);
  doc.setTextColor(184, 188, 200);
  doc.setFontSize(10);
  const idealText = product.ideal[lang].join('  ·  ');
  const idealLines = doc.splitTextToSize(idealText, pw - 40);
  doc.text(idealLines, 20, appsY + 16);

  doc.setFillColor(r, g, b);
  doc.rect(0, ph - 12, pw, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('atempo.com.tr  ·  info@atempo.com.tr  ·  +90 212 123 45 67', 20, ph - 4);
  doc.text('3 / 3', pw - 20, ph - 4, { align: 'right' });

  doc.save(`Atempo-${product.code}-Brochure.pdf`);
}

window.generateBrochure = generateBrochure;
