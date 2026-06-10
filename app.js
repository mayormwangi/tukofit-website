/* ============================================================
   TukoFit Collective — Brand Website JS
   ============================================================ */

/* ── MODAL DATA ────────────────────────────────────────────────────── */
var MODALS = {
  'ai-coaches': {
    icon: '🤖', title: '4 AI Coaches',
    body: '<p>Four coaching personalities, each powered by GPT-4. Pick the one that matches your style.</p><ul><li><strong>Amara</strong> — Warm and encouraging. She celebrates every win.</li><li><strong>Jabari</strong> — Tough love. No excuses, only results.</li><li><strong>Zuri</strong> — Wellness-focused. Blends fitness with recovery and mental health.</li><li><strong>Kofi</strong> — Strategic. He reads your data, spots plateaus, builds smart plans.</li></ul><p style="margin-top:12px">Every coach responds personally after each workout — no generic advice.</p>'
  },
  'family': {
    icon: '👨‍👩‍👧', title: 'Family Plan',
    body: '<p>The only fitness app where your whole household trains together.</p><ul><li><strong>$14.99/mo</strong> — you, your partner, and one child free</li><li><strong>+ $2.99/mo</strong> per additional child under 17</li><li>Family activity dashboard — see everyone\'s streaks and workouts side by side</li><li>Accountability alerts when a family member hits a milestone</li></ul>'
  },
  'passport': {
    icon: '✈️', title: 'Travel Passport',
    body: '<p>Your fitness follows you everywhere. Train abroad and stamp your passport.</p><ul><li><strong>62+ country stamps</strong> — check in from abroad and earn the flag</li><li><strong>Flip-book design</strong> — looks and feels like a real passport</li><li><strong>Near Me</strong> — find other TukoFit members wherever you land</li><li><strong>Region filters</strong> — browse stamps by Africa, Europe, Americas, Asia</li></ul>'
  },
  'cycle': {
    icon: '🌸', title: 'Cycle Tracker',
    body: '<p>Built for the whole person — not just fitness metrics.</p><ul><li>Auto-calculates menstrual, follicular, ovulation, and luteal phases</li><li>Log mood, energy, symptoms, and flow each day</li><li><strong>Partner sharing</strong> — opt in to share your phase and energy level with your partner</li><li>AI coach adjusts workout intensity based on your current phase</li></ul><p style="margin-top:12px">No other fitness app does this.</p>'
  },
  'workouts': {
    icon: '💪', title: '50+ Workout Types',
    body: '<p>Every workout style covered, logged in one place.</p><ul><li><strong>Strength</strong> — sets, reps, weight, 1RM auto-calculated, rest timer</li><li><strong>Cardio</strong> — running, cycling, swimming, rowing</li><li><strong>Sports</strong> — pickleball, golf, MMA, boxing, CrossFit, triathlon, basketball</li><li><strong>Wellness</strong> — yoga, Pilates, meditation, stretching, mobility</li><li><strong>Progress photos</strong> — attach a photo to any workout log</li></ul>'
  },
  'nutrition': {
    icon: '🥗', title: 'Nutrition + Fasting',
    body: '<p>Track every meal without the hassle.</p><ul><li><strong>2M+ food database</strong> — search any food instantly</li><li><strong>Photo scan</strong> — point camera at any meal, AI identifies food and estimates macros</li><li><strong>Full macros</strong> — calories, protein, carbs, fat, fiber, sugar</li><li><strong>Fasting timer</strong> — circular clock-face design, supports 16:8, 18:6, OMAD, and custom windows</li></ul>'
  }
};

/* ── MODAL LOGIC ────────────────────────────────────────────────────── */
var overlay = document.getElementById('modal-overlay');
var modalClose = document.getElementById('modal-close');
var modalIcon = document.getElementById('modal-icon');
var modalTitle = document.getElementById('modal-title');
var modalBody = document.getElementById('modal-body');

function openModal(key) {
  var d = MODALS[key];
  if (!d || !overlay) return;
  modalIcon.textContent = d.icon;
  modalTitle.textContent = d.title;
  modalBody.innerHTML = d.body;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (overlay) overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('.app-feature[data-modal]').forEach(function(el) {
  el.addEventListener('click', function() { openModal(el.getAttribute('data-modal')); });
});

/* ── LIVE REVIEWS ───────────────────────────────────────────────────── */
var FALLBACK_REVIEWS = [
  { name: 'JC Brandon', location: '📍 Texas, USA', stars: 5, review_text: 'I\'ve tried every fitness app out there. Nothing comes close to the TukoFit Collective App. Jabari doesn\'t let me make excuses. 8 weeks consistent and going strong.', featured: true },
  { name: 'Bridget Wanjiku', location: '📍 Nairobi, Kenya', stars: 5, review_text: 'The Family Plan is a game-changer. My husband and I hold each other accountable now. The cycle tracker alone is worth it — no other app respects that part of our lives.', featured: true },
  { name: 'Gilbert Sumba', location: '📍 Helsinki, Finland', stars: 5, review_text: 'The Travel Passport made my fitness feel like an adventure. 7 countries stamped this year. The TukoFit Collective App is always with me wherever I go.', featured: true },
];

function renderStars(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }

function renderReviews(reviews) {
  var grid = document.getElementById('reviews-grid');
  if (!grid || !reviews.length) return;
  var colors = ['linear-gradient(135deg,#D4A017,#8B6914)', 'linear-gradient(135deg,#C084FC,#7C3AED)', 'linear-gradient(135deg,#34D399,#059669)'];
  grid.innerHTML = reviews.slice(0, 3).map(function(r, i) {
    var initials = r.name.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
    var loc = r.location || '';
    if (loc && loc.indexOf('📍') === -1) loc = '📍 ' + loc;
    return '<div class="review-card fade-up ' + (r.featured ? 'review-featured' : '') + '">' +
      (r.featured ? '<div class="review-badge">Top Review</div>' : '') +
      '<div class="review-stars">' + renderStars(r.stars) + '</div>' +
      '<blockquote class="review-text">\u201c' + r.review_text + '\u201d</blockquote>' +
      '<div class="review-author">' +
        '<div class="review-avatar" style="background:' + colors[i % 3] + '">' + initials + '</div>' +
        '<div><div class="review-name">' + r.name + '</div><div class="review-location">' + loc + '</div></div>' +
      '</div></div>';
  }).join('');
  // Re-observe newly created fade-up elements
  grid.querySelectorAll('.fade-up').forEach(function(el) { io.observe(el); });
}

fetch('https://tukofit-collective.onrender.com/api/reviews?featured=true&limit=3')
  .then(function(r) { return r.ok ? r.json() : []; })
  .then(function(data) { renderReviews(data && data.length >= 2 ? data : FALLBACK_REVIEWS); })
  .catch(function() { renderReviews(FALLBACK_REVIEWS); });

/* ── NAV ────────────────────────────────────────────────────────────── */
var nav = document.getElementById('nav');
var hamburger = document.getElementById('hamburger');
var navMobile = document.getElementById('nav-mobile');
var lastScroll = 0;
var ticking = false;

function updateNav() {
  var cur = window.scrollY;
  nav.classList.toggle('scrolled', cur > 60);
  nav.classList.toggle('hidden', cur > lastScroll && cur > 120);
  lastScroll = cur <= 0 ? 0 : cur;
  ticking = false;
}
window.addEventListener('scroll', function() {
  if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
}, { passive: true });

if (hamburger) {
  hamburger.addEventListener('click', function() {
    var open = navMobile.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  navMobile.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      navMobile.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

/* ── STAT COUNTERS ──────────────────────────────────────────────────── */
var statsAnimated = false;
function animateCounter(el, target, duration) {
  var start = performance.now();
  (function tick(now) {
    var p = Math.min((now - start) / duration, 1);
    var ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * ease);
    if (p < 1) requestAnimationFrame(tick);
  })(performance.now());
}
function runCounters() {
  if (statsAnimated) return;
  statsAnimated = true;
  document.querySelectorAll('.stat-num[data-target]').forEach(function(el) {
    animateCounter(el, parseInt(el.getAttribute('data-target'), 10), 1800);
  });
}
var statObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) { runCounters(); statObserver.disconnect(); } });
}, { threshold: 0.5 });
var statsBar = document.querySelector('.hero-stats-bar');
if (statsBar) statObserver.observe(statsBar);

/* ── SCROLL ANIMATIONS ──────────────────────────────────────────────── */
var ANIMATE_SELECTORS = [
  '.hero-eyebrow', '.hero-title', '.hero-body', '.hero-actions',
  '.manifesto-label', '.manifesto-title',
  '.pillar',
  '.collective-text',
  '.app-header', '.app-phone-wrap', '.app-feature',
  '.family-tag', '.family-title', '.family-desc', '.family-price',
  '.section-label', '.section-title',
  '.pricing-card',
  '.review-card',
  '.cta-logo', '.cta-title', '.cta-sub', '.cta-buttons',
];

ANIMATE_SELECTORS.forEach(function(sel) {
  document.querySelectorAll(sel).forEach(function(el) {
    if (!el.classList.contains('fade-up')) el.classList.add('fade-up');
  });
});

// Stagger siblings in grids
['.pillars', '.pricing-grid', '.app-features'].forEach(function(parent) {
  var container = document.querySelector(parent);
  if (!container) return;
  container.querySelectorAll('.fade-up').forEach(function(el, i) {
    el.style.transitionDelay = (i * 80) + 'ms';
  });
});

var io = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(function(el) { io.observe(el); });

/* ── PHONE CAROUSEL ─────────────────────────────────────────────────── */
var phoneImg = document.getElementById('phone-img');
var dotsWrap = document.getElementById('phone-dots');
var currentDot = 0;
var carouselTimer;

function setSlide(idx) {
  if (!phoneImg || !dotsWrap) return;
  var dots = dotsWrap.querySelectorAll('.dot');
  idx = ((idx % dots.length) + dots.length) % dots.length;
  currentDot = idx;
  phoneImg.style.opacity = '0';
  phoneImg.style.transform = 'scale(0.97)';
  setTimeout(function() {
    phoneImg.src = dots[idx].getAttribute('data-img');
    phoneImg.style.opacity = '1';
    phoneImg.style.transform = 'scale(1)';
  }, 200);
  dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
}

if (phoneImg) phoneImg.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

function startCarousel() {
  carouselTimer = setInterval(function() {
    var dots = dotsWrap ? dotsWrap.querySelectorAll('.dot') : [];
    setSlide((currentDot + 1) % dots.length);
  }, 3000);
}

if (dotsWrap) {
  dotsWrap.querySelectorAll('.dot').forEach(function(dot, idx) {
    dot.addEventListener('click', function() {
      clearInterval(carouselTimer);
      setSlide(idx);
      startCarousel();
    });
  });
  startCarousel();
}

/* ── SMOOTH SCROLL ──────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    var offset = nav ? nav.offsetHeight + 12 : 80;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

/* ── ACTIVE NAV LINKS ───────────────────────────────────────────────── */
var sections = ['manifesto', 'collective', 'app', 'pricing', 'reviews'].map(function(id) {
  return document.getElementById(id);
}).filter(Boolean);
var navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', function() {
  var mid = window.scrollY + window.innerHeight / 2;
  var active = null;
  sections.forEach(function(s) { if (s.offsetTop <= mid) active = s.id; });
  navLinks.forEach(function(a) {
    a.classList.toggle('active-link', a.getAttribute('href') === '#' + active);
  });
}, { passive: true });
