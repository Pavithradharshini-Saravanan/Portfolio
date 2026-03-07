/* ============================================
   PAVITHRADHARSHINI SARAVANAN — Portfolio JS
   Dynamic interactions, animations, particles
   ============================================ */

'use strict';

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 400);
  updateActiveNav();
});

// ---- ACTIVE NAV LINKS ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ---- BACK TO TOP ----
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- TYPING EFFECT ----
const typedEl = document.getElementById('typed-text');
const roles = ['Full Stack Developer', 'MERN Stack Engineer', 'Web App Builder', 'Problem Solver'];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeRole, delay);
}

typeRole();

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  const isDecimal = suffix.includes('.');

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    let val;

    if (isDecimal) {
      val = (target + parseFloat(suffix)).toFixed(2);
      const partialTarget = eased * (target + parseFloat(suffix));
      val = partialTarget.toFixed(2);
    } else {
      val = Math.floor(eased * target);
    }

    el.textContent = isDecimal ? val : val + (suffix && !isDecimal ? suffix : '');
    if (progress < 1) requestAnimationFrame(update);
    else {
      if (isDecimal) {
        el.textContent = (target + parseFloat(suffix)).toFixed(2);
      } else {
        el.textContent = target + (suffix && !isDecimal ? suffix : '');
      }
    }
  }

  requestAnimationFrame(update);
}

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const skillBars = document.querySelectorAll('.skill-bar-fill');
const counters = document.querySelectorAll('.stat-number');

let countersStarted = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Skill bars observer
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      setTimeout(() => {
        fill.style.width = fill.dataset.width + '%';
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(c => animateCounter(c));
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ---- CURSOR GLOW ----
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ---- PARTICLES ----
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.1,
    hue: 260 + Math.random() * 60  // purple to pink range
  };
}

for (let i = 0; i < 100; i++) particles.push(createParticle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 70%, 75%, ${p.opacity})`;
    ctx.fill();

    // Draw lines between nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[j].x - p.x;
      const dy = particles[j].y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `hsla(270, 60%, 70%, ${0.1 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  animFrame = requestAnimationFrame(drawParticles);
}

drawParticles();

// ---- CONTACT FORM ----
function handleContact() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const feedback = document.getElementById('form-feedback');
  const btn = document.getElementById('sendBtn');

  if (!name || !email || !message) {
    feedback.textContent = '⚠️ Please fill in your name, email, and message.';
    feedback.style.color = '#f87171';
    feedback.style.display = 'block';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    feedback.textContent = '⚠️ Please enter a valid email address.';
    feedback.style.color = '#f87171';
    feedback.style.display = 'block';
    return;
  }

  // Simulate send
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    feedback.textContent = '✅ Thanks! Your message has been received. I\'ll get back to you soon!';
    feedback.style.color = 'var(--accent-secondary)';
    feedback.style.display = 'block';
    btn.innerHTML = '<span>Message Sent!</span><span>✅</span>';
    btn.disabled = false;

    // Reset
    setTimeout(() => {
      document.getElementById('contact-name').value = '';
      document.getElementById('contact-email').value = '';
      document.getElementById('contact-subject').value = '';
      document.getElementById('contact-message').value = '';
      btn.innerHTML = '<span>Send Message</span><span>✉️</span>';
      feedback.style.display = 'none';
    }, 4000);
  }, 1200);
}

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- TILT EFFECT ON PROJECT CARDS ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = (y - cy) / cy * -6;
    const rotateY = (x - cx) / cx * 6;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.4s ease';
  });
});

// ---- HERO IMAGE PARALLAX ----
window.addEventListener('scroll', () => {
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    const scrolled = window.scrollY;
    heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});

// ---- PAGE LOAD INTRO ----
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
