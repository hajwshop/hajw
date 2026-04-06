// Determine the root path based on current page depth
function getRootPath() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  if (depth <= 1) return './';
  if (depth === 2) return '../';
  return '../../';
}

async function loadComponent(id, file) {
  const root = getRootPath();
  try {
    const res = await fetch(root + 'components/' + file);
    if (!res.ok) return;
    let html = await res.text();
    html = html.replace(/href="\/([^"]*?)"/g, `href="${root}$1"`);
    html = html.replace(/src="\/([^"]*?)"/g, `src="${root}$1"`);
    document.getElementById(id).innerHTML = html;
    return html;
  } catch(e) {
    console.warn('Could not load component:', file);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('header-placeholder', 'header.html');
  await loadComponent('footer-placeholder', 'footer.html');

  // Highlight active nav link
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-page]').forEach(el => {
    if (el.dataset.page === page) el.classList.add('active');
  });

  // Back to Home button — all pages except home
  if (page !== 'home') {
    const root = getRootPath();

    const btn = document.createElement('a');
    btn.href = root + 'index.html';
    btn.innerHTML = '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" style="margin-right:5px;vertical-align:middle;flex-shrink:0"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>Back to Home';
    btn.style.cssText = 'display:inline-flex;align-items:center;font-size:12px;font-weight:500;letter-spacing:0.04em;color:var(--charcoal);background:var(--white);border:1px solid var(--border);border-radius:6px;padding:6px 14px;text-decoration:none;transition:background 0.2s,border-color 0.2s,color 0.2s;white-space:nowrap;margin-right:8px';
    btn.onmouseover = () => { btn.style.background='var(--cream)'; btn.style.borderColor='var(--accent)'; btn.style.color='var(--accent)'; };
    btn.onmouseout  = () => { btn.style.background='var(--white)'; btn.style.borderColor='var(--border)'; btn.style.color='var(--charcoal)'; };

    const icons = document.querySelector('.header-icons');
    if (icons) icons.insertBefore(btn, icons.firstChild);

    // Mobile nav
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) {
      const mobileLink = document.createElement('a');
      mobileLink.href = root + 'index.html';
      mobileLink.textContent = '← Back to Home';
      mobileNav.insertBefore(mobileLink, mobileNav.firstChild);
    }
  }

  // Sticky header shadow
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }
});
