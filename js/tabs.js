/**
 * tabs.js
 * Handles Description / Specifications tab switching on product pages.
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const tabBtns   = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(target)?.classList.add('active');
      });
    });
  });
})();
