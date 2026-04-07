/**
 * loadComponents.js
 * Dynamically loads header and footer HTML into every page.
 * Works from any depth (root or pages/) via a basePath attribute.
 */

(function () {

  async function loadHTML(url, selector) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();

      const target = document.querySelector(selector);

      if (target) {
        target.innerHTML = html;

        if (selector === "#site-header-placeholder") {
          fixHeader();
        }

        if (selector === "#site-footer-placeholder") {
          fixFooter();
        }
      }

    } catch (e) {
      console.warn(`Could not load ${url}:`, e);
    }
  }

  function getBase() {
    const el = document.querySelector('[data-base]');
    if (el) return el.dataset.base;

    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    return depth > 1 ? '../' : './';
  }

  function fixHeader() {
    const base = getBase();

    const logoLink = document.getElementById("header-logo-link");
    const logoWrapper = document.getElementById("logo-img-wrapper");

    if (logoLink) logoLink.href = base + "index.html";

    const img = new Image();
    img.onload = function () {
      if (logoWrapper) {
        logoWrapper.innerHTML = "";
        logoWrapper.style.width = "72px";
        logoWrapper.style.height = "72px";

        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        logoWrapper.appendChild(img);
      }
    };

    img.src = base + "images/logo/Logo.png";
  }

  function fixFooter() {
    const base = getBase();

    const about = document.getElementById("footer-about-link");
    const contact = document.getElementById("footer-contact-link");

    if (about) about.href = base + "pages/about.html";
    if (contact) contact.href = base + "pages/contact.html";
  }

  document.addEventListener("DOMContentLoaded", async () => {

    const base = getBase();

    await loadHTML(`${base}components/header.html`, "#site-header-placeholder");
    await loadHTML(`${base}components/footer.html`, "#site-footer-placeholder");

  });

})();