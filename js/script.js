// Modern portfolio interactions with subtle animation
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function closeMenu() {
    if (!hamburger || !navMenu) {
        return;
    }

    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
}

// Smooth scroll for in-page links with navbar offset
const stickyOffset = () => (navbar ? navbar.offsetHeight + 8 : 0);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const hash = anchor.getAttribute('href');
    if (!hash || hash === '#') {
        return;
    }

    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(hash);
        if (!target) {
            return;
        }

        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - stickyOffset();

        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    });
});

// Form behavior
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Terima kasih! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda.');
        contactForm.reset();
    });
}

// Subtle reveal animation
const heroReveal = document.querySelectorAll('.hero-content, .hero-image');
heroReveal.forEach((item) => {
    item.classList.add('reveal', 'is-visible');
});

const revealTargets = [
    '.about h2',
    '.about-text',
    '.about-stats .stat',
    '.projects h2',
    '.project-card',
    '.skills h2',
    '.skill-category',
    '.contact h2',
    '.contact-intro',
    '.contact-form',
    '.contact-info .info-item'
];

const revealElements = [];
revealTargets.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add('reveal');
        element.classList.add(`reveal-delay-${(index % 3) + 1}`);
        revealElements.push(element);
    });
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18,
            rootMargin: '0px 0px -60px 0px'
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
}

// Navbar state and active link on scroll
const sections = Array.from(document.querySelectorAll('section[id]'));

function updateScrollUI() {
    const scrollY = window.pageYOffset;

    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 8);
    }

    if (!sections.length || !navLinks.length) {
        return;
    }

    const threshold = scrollY + stickyOffset() + 120;
    let current = sections[0].id;

    sections.forEach((section) => {
        if (threshold >= section.offsetTop) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute('href')?.replace('#', '');
        link.classList.toggle('active', target === current);
    });
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (ticking) {
        return;
    }

    window.requestAnimationFrame(() => {
        updateScrollUI();
        ticking = false;
    });

    ticking = true;
});

window.addEventListener('resize', closeMenu);
updateScrollUI();

// Image fade-in
const projectImages = document.querySelectorAll('.project-image img');
projectImages.forEach((image) => {
    image.style.opacity = '0';
    image.style.transition = 'opacity 420ms ease, transform 420ms ease';

    const showImage = () => {
        image.style.opacity = '1';
    };

    if (image.complete) {
        showImage();
    } else {
        image.addEventListener('load', showImage, { once: true });
    }
});
