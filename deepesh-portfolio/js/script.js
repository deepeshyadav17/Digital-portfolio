// ───────────────────────────────────────────
//  DEEPESH YADAV — PORTFOLIO  |  script.js
// ───────────────────────────────────────────

// ─── CUSTOM CURSOR ───
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;   // real mouse position
let ringX  = 0, ringY  = 0;   // lagging ring position

// Move dot cursor instantly
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
});

// Smoothly animate the ring behind the cursor
function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateRing);
}
animateRing();

// Grow ring on hover over interactive elements
const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-category, .stat-box, .cert-card, .position-item');

hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.width  = '52px';
        cursorRing.style.height = '52px';
        cursorRing.style.borderColor = 'rgba(124, 92, 255, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.style.width  = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.borderColor = 'rgba(124, 92, 255, 0.5)';
    });
});


// ─── SCROLL REVEAL (Intersection Observer) ───
const fadeElements = document.querySelectorAll('.fade-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered delay so elements animate in sequence
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach((el) => revealObserver.observe(el));


// ─── ACTIVE NAV HIGHLIGHT on scroll ───
const sections = document.querySelectorAll('section, #skills, #contact');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = 'var(--text)';
                }
            });
        }
    });
}, {
    threshold: 0.4
});

sections.forEach((s) => navObserver.observe(s));


// ─── SMOOTH SCROLL for nav links ───
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// ─── TYPING EFFECT on hero eyebrow ───
const eyebrow = document.querySelector('.hero-eyebrow');
if (eyebrow) {
    const originalText = eyebrow.textContent.trim();
    eyebrow.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < originalText.length) {
            eyebrow.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        }
    }

    // Start after a short delay so page loads first
    setTimeout(typeWriter, 500);
}


// ─── STAT COUNTER ANIMATION ───
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        // Preserve the inner <span> (accent symbol)
        const span = el.querySelector('span');
        const spanText = span ? span.outerHTML : '';
        el.innerHTML = Math.floor(current) + spanText;
    }, 20);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const numEl = entry.target.querySelector('.stat-num');
            if (!numEl || numEl.dataset.animated) return;
            numEl.dataset.animated = 'true';

            const rawText = numEl.textContent.trim();
            // Extract number (ignore letters like K, +)
            const number = parseInt(rawText.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(number)) animateCounter(numEl, number);

            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach((box) => statObserver.observe(box));


// ─── PROJECT CARD — tilt effect on hover ───
document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        const rotateX = ((y - midY) / midY) * -5;
        const rotateY = ((x - midX) / midX) * 5;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});


// ─── CONSOLE EASTER EGG ───
console.log('%c👋 Hey there, fellow developer!', 'color: #7c5cff; font-size: 1.2rem; font-weight: bold;');
console.log('%cThis portfolio was built by Deepesh Yadav.', 'color: #5cffcb; font-size: 0.9rem;');
console.log('%c🚀 Open to opportunities — deepeshyadav4567@gmail.com', 'color: #ff5c8a; font-size: 0.85rem;');
