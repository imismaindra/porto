const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function closeMenu() {
    if (!hamburger || !navMenu) {
        return;
    }

    if (hamburger.hasAttribute('aria-expanded')) {
        hamburger.setAttribute('aria-expanded', 'false');
    }
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
}

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

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;

        // Nomor WhatsApp tujuan (format internasional: 62...)
        const phoneNumber = '6285173329189';

        // Format pesan
        const text = `Halo Ahmad Maulana Ismaindra,\n\nPerkenalkan saya ${name} (${email}).\n${subject ? `\nSubjek: ${subject}\n` : ''}\nPesan:\n${message}`;
        const encodedText = encodeURIComponent(text);

        // Arahkan ke WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');

        // Tampilkan pesan dan reset form
        showToast('Mengalihkan Anda ke WhatsApp...', 'success');
        contactForm.reset();
    });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const projectTabs = Array.from(document.querySelectorAll('.project-tab'));
const projectPanels = Array.from(document.querySelectorAll('.project-panel'));

function activateProjectTab(targetId) {
    if (!targetId) {
        return;
    }

    projectTabs.forEach((tab) => {
        const isActive = tab.dataset.tabTarget === targetId;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    projectPanels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
    });
}

projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        activateProjectTab(tab.dataset.tabTarget);
    });
});

const initialProjectTab = projectTabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || projectTabs[0];
if (initialProjectTab) {
    activateProjectTab(initialProjectTab.dataset.tabTarget);
}

const galleryModal = document.getElementById('galleryModal');
const galleryGrid = document.getElementById('galleryGrid');
const galleryTitle = document.getElementById('galleryTitle');
const galleryDialog = galleryModal?.querySelector('.gallery-dialog');
const galleryOpenButtons = document.querySelectorAll('.app-popup-btn');
const galleryCloseButtons = document.querySelectorAll('[data-gallery-close]');
let lastFocusedElement = null;

function closeGallery() {
    if (!galleryModal) {
        return;
    }

    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (galleryGrid) {
        galleryGrid.innerHTML = '';
    }

    if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
    }
}

function openGallery(title, imageSources) {
    if (!galleryModal || !galleryGrid) {
        return;
    }

    galleryGrid.innerHTML = '';

    imageSources.forEach((src, index) => {
        const image = document.createElement('img');
        image.src = src;
        image.alt = `${title} screenshot ${index + 1}`;
        image.loading = 'lazy';
        galleryGrid.appendChild(image);
    });

    if (galleryTitle) {
        galleryTitle.textContent = `Galeri ${title}`;
    }

    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    galleryDialog?.focus();
}

galleryOpenButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const sources = (button.dataset.gallery || '')
            .split('|')
            .map((item) => item.trim())
            .filter(Boolean);

        if (!sources.length) {
            return;
        }

        lastFocusedElement = button;
        openGallery(button.dataset.appName || 'Proyek', sources);
    });
});

galleryCloseButtons.forEach((button) => {
    button.addEventListener('click', closeGallery);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && galleryModal?.classList.contains('is-open')) {
        closeGallery();
    }
});

const heroReveal = document.querySelectorAll('.hero-content, .hero-media');
heroReveal.forEach((item) => {
    item.classList.add('reveal', 'is-visible');
});

const revealTargets = [
    '.section-head',
    '.quick-item',
    '.about-layout .card',
    '.timeline-item',
    '.edu-card',
    '.cert-card',
    '.project-tabs',
    '.project-card',
    '.app-card',
    '.app-preview-shot',
    '.contact-wrapper .card',
    '.hero-note'
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
            threshold: 0.16,
            rootMargin: '0px 0px -64px 0px'
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
}

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
