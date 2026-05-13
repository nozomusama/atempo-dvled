// PDF brochure generator — uses jsPDF to produce a per-product brochure
function generateBrochure(product, lang) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pw = 210, ph = 297;

  // hex → rgb
  const hex2rgb = (h) => {
    const x = h.replace('#', '');
    return [parseInt(x.substr(0, 2), 16), parseInt(x.substr(2, 2), 16), parseInt(x.substr(4, 2), 16)];
  };
  const [r, g, b] = hex2rgb(product.color);
  const [r2, g2, b2] = hex2rgb(product.accent2);

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
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('ATEMPO', 38, 32);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(r, g, b);
  doc.text('DIRECTVIEW LED', 38, 37);

  // Series label
  doc.setTextColor(r, g, b);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('◉ PRODUCT BROCHURE · ' + product.code + ' SERIES · 2026', 20, 70);

  // Product name
  doc.setTextColor(244, 245, 248);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(44);
  doc.text(product.name.split(' · ')[1] || product.code, 20, 110);

  // Tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(22);
  doc.setTextColor(r, g, b);
  doc.text(product.tagline[lang], 20, 130);

  // Sub
  doc.setTextColor(184, 188, 200);
  doc.setFontSize(11);
  const subLines = doc.splitTextToSize(product.sub[lang], pw - 40);
  doc.text(subLines, 20, 148);

  // Spec grid on cover
  const specs = product.specs[lang];
  const keyRows = [specs[0], specs[1], specs[2], specs[specs.length - 1]];
  let yy = 200;
  keyRows.forEach((row, i) => {
    doc.setDrawColor(60, 65, 78);
    doc.line(20, yy, pw - 20, yy);
    doc.setTextColor(122, 127, 142);
    doc.setFontSize(8);
    doc.text(row[0].toUpperCase(), 20, yy + 8);
    doc.setTextColor(244, 245, 248);
    doc.setFontSize(14);
    doc.text(row[1], pw - 20, yy + 8, { align: 'right' });
    yy += 18;
  });

  // Footer strip
  doc.setFillColor(r, g, b);
  doc.rect(0, ph - 15, pw, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('atempo.com.tr · info@atempo.com.tr · +90 212 123 45 67', 20, ph - 6);
  doc.text('© 2026 ATEMPO', pw - 20, ph - 6, { align: 'right' });

  // ===== PAGE 2 — FEATURES =====
  doc.addPage();
  doc.setFillColor(10, 12, 18);
  doc.rect(0, 0, pw, ph, 'F');

  doc.setTextColor(r, g, b);
  doc.setFontSize(9);
  doc.text('◉ ' + (lang === 'tr' ? 'ÖZELLIKLER' : 'KEY FEATURES'), 20, 25);

  doc.setTextColor(244, 245, 248);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text(lang === 'tr' ? 'Neden ' + product.code + '?' : 'Why ' + product.code + '?', 20, 45);

  doc.setDrawColor(60, 65, 78);
  doc.line(20, 55, pw - 20, 55);

  let fy = 70;
  product.features.forEach((f, i) => {
    doc.setTextColor(r, g, b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`0${i + 1} / 0${product.features.length}`, 20, fy);
    doc.setTextColor(244, 245, 248);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text(f[lang][0], 20, fy + 10);
    doc.setTextColor(184, 188, 200);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(f[lang][1], pw - 40);
    doc.text(lines, 20, fy + 18);
    fy += 18 + lines.length * 5 + 10;
  });

  // Footer
  doc.setFillColor(r, g, b);
  doc.rect(0, ph - 12, pw, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('ATEMPO DIRECTVIEW LED · ' + product.code + ' SERIES', 20, ph - 4);
  doc.text('Page 2', pw - 20, ph - 4, { align: 'right' });

  // ===== PAGE 3 — SPECS =====
  doc.addPage();
  doc.setFillColor(10, 12, 18);
  doc.rect(0, 0, pw, ph, 'F');

  doc.setTextColor(r, g, b);
  doc.setFontSize(9);
  doc.text('◉ ' + (lang === 'tr' ? 'TEKNİK SPESİFİKASYONLAR' : 'TECHNICAL SPECIFICATIONS'), 20, 25);
  doc.setTextColor(244, 245, 248);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text(product.code, 20, 45);

  let sy = 65;
  specs.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 16 : 24, i % 2 === 0 ? 19 : 28, i % 2 === 0 ? 28 : 36);
    doc.rect(20, sy - 5, pw - 40, 10, 'F');
    doc.setTextColor(122, 127, 142);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(row[0].toUpperCase(), 24, sy + 1);
    doc.setTextColor(244, 245, 248);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(row[1], pw - 24, sy + 1, { align: 'right' });
    sy += 11;
    if (sy > ph - 30) return;
  });

  // Applications bottom strip
  const appsY = Math.min(sy + 10, ph - 50);
  doc.setDrawColor(r, g, b);
  doc.line(20, appsY, pw - 20, appsY);
  doc.setTextColor(r, g, b);
  doc.setFontSize(8);
  doc.text(lang === 'tr' ? 'ÖNERİLEN UYGULAMA ALANLARI' : 'RECOMMENDED APPLICATIONS', 20, appsY + 8);
  doc.setTextColor(184, 188, 200);
  doc.setFontSize(10);
  doc.text(product.ideal[lang].join(' · '), 20, appsY + 16);

  // Footer
  doc.setFillColor(r, g, b);
  doc.rect(0, ph - 12, pw, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('atempo.com.tr · info@atempo.com.tr · +90 212 123 45 67', 20, ph - 4);
  doc.text('Page 3', pw - 20, ph - 4, { align: 'right' });

  doc.save(`Atempo-${product.code}-Brochure.pdf`);
}

window.generateBrochure = generateBrochure;
