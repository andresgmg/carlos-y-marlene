/* ============================================
   CARLOS Y MARLENE - Wedding Website Scripts
   ============================================ */

// ---- Navbar scroll behaviour ----
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---- Mobile menu toggle ----
const toggle = document.querySelector('.navbar-toggle');
const links  = document.querySelector('.navbar-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- Countdown timer ----
function updateCountdown() {
  const weddingDate = new Date('2026-09-26T16:30:00');
  const now         = new Date();
  const diff        = weddingDate - now;

  const daysEl  = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl  = document.getElementById('countdown-minutes');
  const secsEl  = document.getElementById('countdown-seconds');

  if (!daysEl) return; // not on a page with countdown

  if (diff <= 0) {
    daysEl.textContent  = '0';
    hoursEl.textContent = '0';
    minsEl.textContent  = '0';
    secsEl.textContent  = '0';
    const label = document.querySelector('.countdown-section .section-subtitle');
    if (label) label.textContent = '¡Hoy es el gran día!';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent  = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minsEl.textContent  = String(minutes).padStart(2, '0');
  secsEl.textContent  = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---- Fade-in on scroll (IntersectionObserver) ----
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));
}

// ---- Modal close ----
document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === el) {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => e.stopPropagation());
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }
});

// ---- Toast notification (helper) ----
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'warning' ? '#c8a96e' : '#3a2e2a'};
    color: white;
    padding: 0.9rem 2rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    z-index: 9999;
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    animation: fadeInUp 0.3s ease;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ---- Smooth scroll for hero button ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
