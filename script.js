/* ═══════════════════════════════════════════════════════
   ROYAL LETTER v2 — JAVASCRIPT
   Petal canvas · Floating hearts · Sparkles · Scroll reveal
   Flip cards · Video autoplay · Parallax · Ch VII animations
═══════════════════════════════════════════════════════ */

/* ── 1. PETAL CANVAS ──────────────────────────────── */
(function () {
  const canvas = document.getElementById('petalCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, petals = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COLS = [
    'rgba(201,146,42,',
    'rgba(220,170,80,',
    'rgba(249,220,150,',
    'rgba(180,60,80,',
    'rgba(249,243,232,'
  ];

  function Petal() { this.reset(); }
  Petal.prototype.reset = function () {
    this.x       = Math.random() * W;
    this.y       = -20 - Math.random() * 80;
    this.vx      = (Math.random() - 0.5) * 1.2;
    this.vy      = 0.6 + Math.random() * 1.4;
    this.angle   = Math.random() * Math.PI * 2;
    this.spin    = (Math.random() - 0.5) * 0.06;
    this.size    = 6 + Math.random() * 12;
    this.alpha   = 0.4 + Math.random() * 0.5;
    this.colour  = COLS[Math.floor(Math.random() * COLS.length)];
    this.wobble  = Math.random() * Math.PI * 2;
    this.wobbleS = 0.03 + Math.random() * 0.04;
  };

  for (let i = 0; i < 65; i++) {
    const p = new Petal();
    p.y = Math.random() * H;
    petals.push(p);
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle   = p.colour + p.alpha + ')';
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach(function (p) {
      p.wobble += p.wobbleS;
      p.x += p.vx + Math.sin(p.wobble) * 0.6;
      p.y += p.vy;
      p.angle += p.spin;
      if (p.y > H + 20 || p.x < -40 || p.x > W + 40) p.reset();
      drawPetal(p);
    });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ── 2. GLOBAL FLOATING HEARTS ────────────────────── */
(function () {
  const layer  = document.getElementById('floatingHearts');
  const HEARTS = ['❤', '🌹', '💕', '♡', '🌸', '💖', '✿', '💗'];
  const TOTAL  = 20;

  function makeHeart() {
    const el  = document.createElement('span');
    el.className = 'fheart';
    el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    const dur   = 8 + Math.random() * 10;
    const delay = Math.random() * 15;
    el.style.cssText = [
      'left:' + (Math.random() * 100) + '%',
      'bottom:0',
      'font-size:' + (0.8 + Math.random() * 1.2) + 'rem',
      'animation-duration:' + dur + 's',
      'animation-delay:' + delay + 's'
    ].join(';');
    return el;
  }

  for (let i = 0; i < TOTAL; i++) layer.appendChild(makeHeart());
})();

/* ── 3. SPARKLES (Ch VII plea section) ───────────── */
(function () {
  const layer = document.getElementById('sparkleFg');
  if (!layer) return;
  const COUNT = 40;

  for (let i = 0; i < COUNT; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const size = 4 + Math.random() * 6;
    const dur  = 2 + Math.random() * 3;
    const dly  = Math.random() * 5;
    s.style.cssText = [
      'left:' + (Math.random() * 100) + '%',
      'top:' + (Math.random() * 100) + '%',
      'width:' + size + 'px',
      'height:' + size + 'px',
      'animation-duration:' + dur + 's',
      'animation-delay:' + dly + 's',
      'background:hsl(' + (40 + Math.random() * 30) + ',90%,' + (70 + Math.random() * 20) + '%)'
    ].join(';');
    layer.appendChild(s);
  }
})();

/* ── 4. SCROLL REVEAL ─────────────────────────────── */
(function () {
  const items = document.querySelectorAll('.reveal');
  const obs   = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { obs.observe(el); });
})();

/* ── 5. FLIP CARDS ────────────────────────────────── */
function flipCard(el) {
  el.classList.toggle('flipped');
}

/* ── 6. VIDEO AUTOPLAY ON SCROLL ──────────────────── */
(function () {
  const videos = document.querySelectorAll('video');
  const vObs   = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.play().catch(function () {});
      } else {
        e.target.pause();
      }
    });
  }, { threshold: 0.4 });
  videos.forEach(function (v) { vObs.observe(v); });
})();

/* ── 7. PARALLAX ON PORTRAIT ──────────────────────── */
(function () {
  const portrait = document.querySelector('.hero-portrait');
  const heroSeal = document.querySelector('.royal-seal');

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    if (portrait) portrait.style.transform = 'translateY(' + (y * 0.08) + 'px)';
    if (heroSeal) heroSeal.style.transform  = 'translateY(' + (y * 0.05) + 'px)';
  }, { passive: true });
})();

/* ── 8. PLEA CARDS STAGGERED ENTRY ───────────────── */
(function () {
  const bubbles = document.querySelectorAll('.plea-bubble');
  const pObs    = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.15 });
  bubbles.forEach(function (b, i) {
    b.style.animationDelay       = (i * 0.12) + 's';
    b.style.animationPlayState   = 'paused';
    pObs.observe(b);
  });
})();

/* ── 9. MISSING SECTION — icon stagger re-pop ───── */
(function () {
  const icons = document.querySelectorAll('.miss-icon');
  icons.forEach(function (ic, i) {
    ic.style.animationDelay = (i * 0.3) + 's';
  });
})();

/* ── 10. FINALE VIDEO ─────────────────────────────── */
(function () {
  const vid = document.getElementById('finaleVideo');
  if (!vid) return;
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) vid.play().catch(function () {});
    });
  }, { threshold: 0.3 });
  obs.observe(vid);
})();

/* ── 11. PARCHMENT AMBIENT GLOW ──────────────────── */
(function () {
  const parchments = document.querySelectorAll('.parchment-container');
  let angle = 0;
  setInterval(function () {
    angle += 0.5;
    const glow = 0.25 + 0.1 * Math.sin(angle * Math.PI / 180);
    parchments.forEach(function (p) {
      p.style.boxShadow = '0 30px 80px rgba(107,26,42,' + glow + '), inset 0 0 60px rgba(201,146,42,0.05)';
    });
  }, 60);
})();

/* ── 12. MISS ITEM — hover colour cycling ─────────── */
(function () {
  const BORDER_COLS = ['#e8457a', '#9b72cf', '#2dcbab', '#f5a623', '#f9a8c4', '#c9922a'];
  const items = document.querySelectorAll('.miss-item');
  items.forEach(function (item, i) {
    item.addEventListener('mouseenter', function () {
      item.style.borderColor = BORDER_COLS[i % BORDER_COLS.length];
    });
    item.addEventListener('mouseleave', function () {
      item.style.borderColor = '';
    });
  });
})();
