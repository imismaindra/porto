/* ============================================================
   NAVBAR
   ============================================================ */

/* --- TAG COLOR UTILITY --- */
const TAG_COLORS = {
    // Languages
    'C#': 'tag-purple', 'C++': 'tag-purple', 'TypeScript': 'tag-purple', 'JavaScript': 'tag-purple',
    'PHP': 'tag-purple', 'Dart': 'tag-purple', 'Python': 'tag-purple',
    // Frameworks & Platforms
    'Laravel': 'tag-green', 'ASP.NET': 'tag-green', 'React Native': 'tag-green',
    'Expo SDK 54': 'tag-green', 'WordPress': 'tag-green', 'Botpress': 'tag-green',
    // Databases & Data
    'MySQL': 'tag-orange', 'SQL Server': 'tag-orange', 'AsyncStorage': 'tag-orange',
    // Runtimes & Build
    'Expo': 'tag-cyan', 'React Native 0.81': 'tag-cyan',
    // Services / Tools
    'DialogFlow': 'tag-teal', 'Manychat': 'tag-teal',
    // Mobile label
    'Mobile App': 'tag-cyan', 'Reader': 'tag-cyan',
};

function getTagClass(tech) {
    return TAG_COLORS[tech] || '';
}

function renderTag(tech) {
    const cls = getTagClass(tech);
    return `<span class="tag ${cls}">${tech}</span>`;
}

/* --- ROLE BADGE HELPER --- */
const ROLE_BADGES = {
    'dev':    { cls: 'badge-dev',    icon: 'fa-code',       label: 'Developer' },
    'intern': { cls: 'badge-intern', icon: 'fa-seedling',   label: 'Magang' },
    'lab':    { cls: 'badge-lab',    icon: 'fa-flask',      label: 'Lab Asisten' },
    'org':    { cls: 'badge-org',    icon: 'fa-people-group', label: 'Organisasi' },
};

function getRoleBadgeKey(role) {
    const r = role.toLowerCase();
    if (r.includes('magang') || r.includes('intern')) return 'intern';
    if (r.includes('asisten') || r.includes('lab')) return 'lab';
    if (r.includes('himpunan') || r.includes('divisi') || r.includes('anggota')) return 'org';
    return 'dev';
}


const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function closeMenu() {
    if (!hamburger || !navMenu) return;
    hamburger.setAttribute('aria-expanded', 'false');
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
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
}
window.addEventListener('resize', closeMenu);

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
const stickyOffset = () => (navbar ? navbar.offsetHeight + 8 : 0);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const hash = anchor.getAttribute('href');
    if (!hash || hash === '#') return;
    anchor.addEventListener('click', event => {
        const target = document.querySelector(hash);
        if (!target) return;
        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - stickyOffset();
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ============================================================
   CONTACT FORM → WHATSAPP
   ============================================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        const phoneNumber = '6285173329189';
        const text = `Halo Ahmad Maulana Ismaindra,\n\nPerkenalkan saya ${name} (${email}).${subject ? `\nSubjek: ${subject}` : ''}\n\nPesan:\n${message}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
        showToast('Mengalihkan Anda ke WhatsApp...', 'success');
        contactForm.reset();
    });
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 80);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 360);
    }, 3200);
}

/* ============================================================
   PROJECT TABS
   ============================================================ */
const projectTabs = Array.from(document.querySelectorAll('.project-tab'));
const projectPanels = Array.from(document.querySelectorAll('.project-panel'));

function activateProjectTab(targetId) {
    if (!targetId) return;
    projectTabs.forEach(tab => {
        const isActive = tab.dataset.tabTarget === targetId;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    projectPanels.forEach(panel => {
        const isActive = panel.id === targetId;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
    });
}
projectTabs.forEach(tab => tab.addEventListener('click', () => activateProjectTab(tab.dataset.tabTarget)));
const initialTab = projectTabs.find(t => t.getAttribute('aria-selected') === 'true') || projectTabs[0];
if (initialTab) activateProjectTab(initialTab.dataset.tabTarget);

/* ============================================================
   GALLERY MODAL
   ============================================================ */
const galleryModal = document.getElementById('galleryModal');
const galleryGrid = document.getElementById('galleryGrid');
const galleryTitle = document.getElementById('galleryTitle');
const galleryDialog = galleryModal?.querySelector('.gallery-dialog');
const galleryCloseButtons = document.querySelectorAll('[data-gallery-close]');
let lastFocusedElement = null;
let projectSwiper = null;

function closeGallery() {
    if (!galleryModal) return;
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (galleryGrid) galleryGrid.innerHTML = '';
    if (projectSwiper) { projectSwiper.destroy(true, true); projectSwiper = null; }
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

function openGallery(title, imageSources) {
    if (!galleryModal || !galleryGrid) return;
    galleryGrid.innerHTML = '';
    imageSources.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const image = document.createElement('img');
        image.src = src;
        image.alt = `${title} — screenshot tampilan ${index + 1} dari ${imageSources.length}`;
        image.loading = 'lazy';
        slide.appendChild(image);
        galleryGrid.appendChild(slide);
    });
    if (galleryTitle) galleryTitle.textContent = `Galeri ${title}`;
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    galleryDialog?.focus();
    projectSwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1, spaceBetween: 18,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 480: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }
    });
}

document.addEventListener('click', event => {
    const btn = event.target.closest('.app-popup-btn');
    if (btn) {
        const sources = (btn.dataset.gallery || '').split('|').map(s => s.trim()).filter(Boolean);
        if (!sources.length) return;
        lastFocusedElement = btn;
        openGallery(btn.dataset.appName || 'Proyek', sources);
    }
});
galleryCloseButtons.forEach(btn => btn.addEventListener('click', closeGallery));
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && galleryModal?.classList.contains('is-open')) closeGallery();
});

/* ============================================================
   RENDER DYNAMIC DATA
   ============================================================ */
const renderDynamicData = () => {
    if (typeof portfolioData === 'undefined') return;

    // Experience
    const expTimeline = document.getElementById('experience-timeline');
    if (expTimeline) {
        expTimeline.innerHTML = portfolioData.experience.map((exp, i) => {
            const badgeKey = getRoleBadgeKey(exp.role);
            const badge = ROLE_BADGES[badgeKey];
            return `
            <article class="timeline-item card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}" role="listitem">
                <div class="timeline-meta">
                    <span class="timeline-role-badge ${badge.cls}"><i class="fas ${badge.icon}"></i>${badge.label}</span>
                    <span style="display:block;margin-bottom:.55rem;">${exp.period}</span>
                    <strong>${exp.role}</strong>
                    <div class="company-brand">
                        <img src="${exp.companyLogo}" alt="Logo ${exp.companyName}" class="company-logo" loading="lazy">
                        <p>${exp.companyName}</p>
                    </div>
                </div>
                <div class="timeline-content">
                    <p>${exp.description}</p>
                    <ul>${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
                </div>
            </article>`;
        }).join('');
    }

    // Education
    const eduGrid = document.getElementById('education-grid');
    if (eduGrid) {
        eduGrid.innerHTML = portfolioData.education.map((edu, i) => `
            <article class="edu-card card" data-aos="zoom-in-up" data-aos-delay="${i * 120}">
                <span class="edu-year">${edu.period}</span>
                <h3>${edu.degree}</h3>
                <div class="edu-school">
                    <img src="${edu.schoolLogo}" alt="Logo ${edu.schoolName}" class="edu-logo ${edu.schoolLogoClass || ''}" loading="lazy">
                    <p>${edu.schoolName}</p>
                </div>
                <small>${edu.description}</small>
            </article>`).join('');
    }

    // Certifications
    const certGrid = document.getElementById('certifications-grid');
    if (certGrid) {
        certGrid.innerHTML = portfolioData.certifications.map((cert, i) => `
            <article class="cert-card card" data-provider="${cert.provider}" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
                <div>
                    <h3>${cert.title}</h3>
                    <p class="cert-issuer">${cert.issuer}</p>
                    <p class="cert-date">${cert.date}</p>
                    <p class="cert-id">${cert.credentialId}</p>
                </div>
                <span>${cert.year}</span>
            </article>`).join('');
    }

    // Web Projects
    const webGrid = document.getElementById('web-projects-grid');
    if (webGrid) {
        webGrid.innerHTML = portfolioData.projects.web.map((proj, i) => `
            <article class="project-card card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
                <div class="project-image ${proj.bgClass}">
                    <span>${proj.shortName}</span>
                    <div class="project-overlay" aria-hidden="true">
                        <a href="${proj.link}" class="project-overlay-btn" title="Lihat Proyek" tabindex="-1">
                            <i class="fas fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${proj.title}</h3>
                    <p>${proj.description}</p>
                    <div class="project-tags">${proj.tags.map(renderTag).join('')}</div>
                    <a href="${proj.link}" class="project-link">Lihat Proyek <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>`).join('');
    }

    // App Projects
    const appGrid = document.getElementById('app-projects-grid');
    if (appGrid) {
        appGrid.innerHTML = portfolioData.projects.app.map((proj, i) => `
            <article class="app-card card" data-aos="fade-up" data-aos-delay="${(i % 2) * 100}">
                <div class="app-card-main">
                    <div class="app-card-head">
                        <h3>${proj.title}</h3>
                    </div>
                    <p class="app-desc">${proj.description}</p>
                    <div class="project-tags">${proj.tags.map(renderTag).join('')}</div>
                    ${proj.metaData ? `
                    <div class="app-meta">
                        ${proj.metaData.map(meta => `<p><strong>${meta.label}:</strong> ${meta.code ? `<code>${meta.code}</code>` : ''} ${meta.trailing || ''}</p>`).join('')}
                    </div>` : ''}
                    <div class="app-actions">
                        <button type="button" class="app-popup-btn" data-app-name="${proj.title}" data-gallery="${proj.galleryImages.join('|')}">
                            <i class="fas fa-images"></i> Galeri Foto
                        </button>
                        <a href="${proj.repoLink}" target="_blank" rel="noopener noreferrer" class="app-repo-btn">
                            <i class="fab fa-github"></i> Repository
                        </a>
                    </div>
                </div>
                <div class="app-card-media fan-out-gallery">
                    <div class="app-preview-3d">
                        ${proj.previewImages.map((img, idx) => `<img src="${img}" alt="${proj.title} — tampilan screenshot ${idx + 1}" class="app-shot-3d shot-${idx + 1}" loading="lazy">`).join('')}
                    </div>
                </div>
            </article>`).join('');
    }
};

renderDynamicData();

/* ============================================================
   AOS INIT
   ============================================================ */
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 750, once: true, offset: 75, easing: 'ease-out-cubic' });
}

/* ============================================================
   ACTIVE NAV — IntersectionObserver
   ============================================================ */
const sections = Array.from(document.querySelectorAll('section[id]'));

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: `-${navbar?.offsetHeight || 70}px 0px -60% 0px`, threshold: 0 });

sections.forEach(s => navObserver.observe(s));

/* Navbar scroll state via IntersectionObserver on hero */
const heroEl = document.getElementById('home');
if (heroEl && navbar) {
    const scrollObserver = new IntersectionObserver(([entry]) => {
        navbar.classList.toggle('scrolled', !entry.isIntersecting);
    }, { threshold: 0.1 });
    scrollObserver.observe(heroEl);
}

/* ============================================================
   COUNTER ANIMATION (hero quick stats)
   ============================================================ */
function animateCountUp(el, target, suffix) {
    const duration = 1400;
    const start = performance.now();
    const update = now => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(2, -10 * progress);
        const current = Math.round(eased * target);
        el.textContent = current + (suffix || '');
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const rawTarget = el.dataset.countTarget;
        const suffix = el.dataset.countSuffix || '';
        if (!rawTarget) return;
        animateCountUp(el, parseInt(rawTarget, 10), suffix);
        statObserver.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count-target]').forEach(el => statObserver.observe(el));
