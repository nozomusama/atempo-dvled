# Hero Slider Implementation

_Started 2026-05-08 07:09 UTC_

---

## User

ana sayfada hero kısmına bir full screen hero slider implementasyonu yap

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: update_todos]_

Tüm bağlamı aldım. Şimdi `Hero.jsx`'i tam ekran crossfade slider olarak yeniden yazıyorum ve `app.jsx`'e `lang` prop'unu ekliyorum.

_[tool: write_file]_

_[tool: str_replace_edit]_

Şimdi `app.jsx`'te Hero'ya `lang` prop'unu ekleyeyim:

_[tool: done]_

_[tool: fork_verifier_agent]_

Hero slider hazır! İşte yapılanlar:

**4 slayt, her biri farklı renk teması:**
1. **Genel Bakış** — Magenta + Cyan, istatistik satırı ile
2. **BX · Broadcast & XR** — Cyan + Mavi, kamera specs tag'i
3. **AX · IndoorFine** — Mor + Cyan, kontrol odası odaklı
4. **DX Stage · EX Outdoor** — Amber + Magenta, sahne/outdoor

**Özellikler:**
- **Crossfade + scale(1.04→1)** geçiş efekti — 900ms cubic-bezier
- **Auto-advance** — 6 saniyede bir, hover'da duraklar ve devam eder (progress sıfırlanmaz)
- **Pill dot navigation** — aktif slayt genişler, aksan rengiyle boyalanır
- **Progress bar** — en altta, her slaydın kendi rengiyle dolar
- **Prev/Next okları** — hover state'li, mobilde gizlenir
- **Klavye desteği** — ← → ok tuşları
- **Swipe desteği** — dokunmatik ekranlar için

## User

Verifier agent check completed

## Assistant

✅ Verifier geçti — her şey düzgün çalışıyor.

