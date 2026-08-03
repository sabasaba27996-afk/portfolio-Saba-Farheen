Console.log("JavaScript is working!");
/* ============================================
   Saba Farheen — Portfolio JS
   Features: mobile nav, active link highlight,
   scroll reveal, typing effect, back-to-top,
   dark mode toggle
============================================ */

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- 1. MOBILE NAV TOGGLE ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close menu after clicking a link (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', false);
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    /* ---------- 2. ACTIVE LINK ON SCROLL ---------- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => a.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));

    /* ---------- 3. SCROLL REVEAL ---------- */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));

    // Also fade in individual skill/project cards with a slight stagger
    const staggerGroups = [
        document.querySelectorAll('.skill-box p'),
        document.querySelectorAll('.project-card')
    ];

    staggerGroups.forEach(group => {
        group.forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.08}s`;
        });
    });

    /* ---------- 4. TYPING EFFECT ---------- */
    const typingTarget = document.querySelector('.hero h1 .name');

    if (typingTarget) {
        const fullText = typingTarget.textContent;
        typingTarget.textContent = '';

        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        typingTarget.after(cursor);

        let i = 0;
        const typeSpeed = 90;

        function typeChar() {
            if (i < fullText.length) {
                typingTarget.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeChar, typeSpeed);
            } else {
                // Remove cursor blink after a pause, or leave it — your call
                setTimeout(() => cursor.remove(), 1400);
            }
        }

        typeChar();
    }

    /* ---------- 5. BACK TO TOP BUTTON ---------- */
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- 6. DARK MODE TOGGLE ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    // Priority: saved user choice > system preference > light default
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        root.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            if (isDark) {
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                updateThemeIcon(false);
            } else {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon(true);
            }
        });
    }

    function updateThemeIcon(isDark) {
        if (!themeToggle) return;
        themeToggle.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }

});