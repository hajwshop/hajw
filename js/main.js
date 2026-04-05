// Size selector
document.addEventListener('click', e => {
  if (e.target.classList.contains('size-btn')) {
    e.target.closest('.size-options')?.querySelectorAll('.size-btn')
      .forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  }

  if (e.target.classList.contains('color-swatch')) {
    e.target.closest('.color-options')?.querySelectorAll('.color-swatch')
      .forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  }

  // Tab navigation
  if (e.target.classList.contains('tab-btn')) {
    const panel = e.target.dataset.tab;
    e.target.closest('.product-tabs')?.querySelectorAll('.tab-btn')
      .forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(panel)?.classList.add('active');
  }
});

// Quantity control
document.addEventListener('click', e => {
  if (e.target.classList.contains('qty-btn')) {
    const numEl = e.target.closest('.qty-control')?.querySelector('.qty-num');
    if (!numEl) return;
    let val = parseInt(numEl.textContent) || 1;
    if (e.target.dataset.action === 'plus') val = Math.min(val + 1, 99);
    if (e.target.dataset.action === 'minus') val = Math.max(val - 1, 1);
    numEl.textContent = val;
  }
});

// ── WhatsApp number ─────────────────────────────────────────
// Replace with your WhatsApp number (include country code, no + or spaces)
const WHATSAPP_NUMBER = '919876543210';

// Hex → readable colour name map
const COLOR_NAMES = {
  '#2c2c2e': 'Charcoal Black',
  '#4a5568': 'Slate Gray',
  '#ffffff': 'White',
  '#c9a96e': 'Golden Tan',
  '#1c1c1e': 'Jet Black',
  '#3d3028': 'Dark Mocha',
  '#3b5998': 'Classic Blue',
  '#8a8580': 'Stone Gray',
  '#f5f5dc': 'Beige',
  '#2c1810': 'Dark Brown',
  '#8b7355': 'Tan Brown',
  '#556b2f': 'Olive Green',
  '#8a3324': 'Burgundy',
  '#faf7f2': 'Off White',
};

function getColorName(swatch) {
  if (!swatch) return 'Not selected';
  const hex = (swatch.title || swatch.style.background || '').toLowerCase().trim();
  return COLOR_NAMES[hex] || hex || 'Not selected';
}

// Buy Now → WhatsApp
document.addEventListener('click', e => {
  if (e.target.classList.contains('btn-buy-now')) {
    const productName  = document.querySelector('.product-name')?.textContent?.trim() || 'Product';
    const activeSize   = document.querySelector('.size-btn.active')?.textContent?.trim() || 'Not selected';
    const activeSwatch = document.querySelector('.color-swatch.active');
    const colorName    = getColorName(activeSwatch);
    const qty          = document.querySelector('.qty-num')?.textContent?.trim() || '1';

    const message =
      `Hello! I'd like to order:\n\n` +
      `🛍 *Product:* ${productName}\n` +
      `📏 *Size:* ${activeSize}\n` +
      `🎨 *Colour:* ${colorName}\n` +
      `🔢 *Quantity:* ${qty}\n\n` +
      `Please confirm availability and payment details. Thank you!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }


});

// Header scroll shadow + hamburger (now that header is inlined)
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }
});
