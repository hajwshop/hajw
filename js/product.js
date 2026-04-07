/**
 * product.js
 * Handles:
 *  - Thumbnail gallery (click to change main image)
 *  - Color swatch selection (also changes main image)
 *  - Color ↔ thumbnail sync
 *  - Quantity stepper
 *  - Buy Now → WhatsApp
 *  - Form validation (size, colour, quantity must be selected)
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {

    /* ── Gallery ── */
    const mainImg = document.getElementById('main-product-img');
    const thumbs  = document.querySelectorAll('.gallery-thumbs .thumb');

    function setMainImage(src, alt) {
      if (!mainImg) return;
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = src || '';
        if (alt) mainImg.alt = alt;
        mainImg.style.opacity = '1';
      }, 150);
    }

    function activateThumb(index) {
      thumbs.forEach(t => t.classList.remove('active'));
      if (thumbs[index]) thumbs[index].classList.add('active');
    }

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => {
        const img = thumb.querySelector('img');
        if (img) setMainImage(img.src, img.alt);
        activateThumb(i);

        // Sync colour swatch if thumb has data-color-index
        const ci = thumb.dataset.colorIndex;
        if (ci !== undefined) selectColor(parseInt(ci, 10), false);
      });
    });

    if (thumbs.length) {
      thumbs[0].classList.add('active');
    }

    /* ── Colour swatches ── */
    const swatches   = document.querySelectorAll('.color-swatch');
    const colorLabel = document.getElementById('color-name-label');
    let selectedColorIndex = -1;

    function selectColor(index, updateThumb = true) {
      if (index < 0 || index >= swatches.length) return;
      swatches.forEach(s => s.classList.remove('selected'));
      swatches[index].classList.add('selected');
      selectedColorIndex = index;

      if (colorLabel) {
        colorLabel.textContent = swatches[index].dataset.colorName || '';
      }

      // Change main image to linked thumb
      if (updateThumb) {
        const linkedThumb = swatches[index].dataset.thumbIndex;
        if (linkedThumb !== undefined) {
          const ti = parseInt(linkedThumb, 10);
          const img = thumbs[ti] ? thumbs[ti].querySelector('img') : null;
          if (img) setMainImage(img.src, img.alt);
          activateThumb(ti);
        }
      }
    }

    swatches.forEach((swatch, i) => {
      swatch.addEventListener('click', () => selectColor(i));
    });

    /* ── Size buttons ── */
    const sizeBtns = document.querySelectorAll('.size-btn');
    let selectedSize = '';

    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSize = btn.dataset.size;
      });
    });

    /* ── Quantity stepper ── */
    const qtyDisplay = document.getElementById('qty-display');
    const qtyMinus   = document.getElementById('qty-minus');
    const qtyPlus    = document.getElementById('qty-plus');
    let qty = 1;

    function updateQty(val) {
      qty = Math.max(1, Math.min(99, val));
      if (qtyDisplay) qtyDisplay.textContent = qty;
    }

    if (qtyMinus) qtyMinus.addEventListener('click', () => updateQty(qty - 1));
    if (qtyPlus)  qtyPlus.addEventListener('click',  () => updateQty(qty + 1));

    /* ── Buy Now → WhatsApp ── */
    const buyBtn = document.getElementById('buy-now-btn');

    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        const productName  = document.getElementById('product-name')?.textContent?.trim()  || 'Product';
        const productPrice = document.getElementById('product-price')?.textContent?.trim() || '';

        const sizeValid   = !!selectedSize;
        const colourValid = selectedColorIndex >= 0;
        const qtyValid    = qty >= 1;

        // Show validation messages
        document.querySelectorAll('.validation-msg').forEach(m => m.classList.remove('visible'));

        if (!sizeValid)   document.getElementById('size-error')?.classList.add('visible');
        if (!colourValid) document.getElementById('color-error')?.classList.add('visible');

        if (!sizeValid || !colourValid) return;

        const colourName = swatches[selectedColorIndex]?.dataset?.colorName || '';

        const phone = '919876543210'; // ← REPLACE with your WhatsApp number (country code + number, no +)
        const msg = encodeURIComponent(
          `Hello! I'd like to order:\n\n` +
          `*Product:* ${productName}\n` +
          `*Size:* ${selectedSize}\n` +
          `*Colour:* ${colourName}\n` +
          `*Quantity:* ${qty}\n` +
          `*Price:* ${productPrice}\n\n` +
          `Please confirm availability. Thank you!`
        );

        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
      });
    }

  });
})();
