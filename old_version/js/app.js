/**
 * Portfolio Dynamic Loading
 * Using Local MySQL API
 */

document.addEventListener('DOMContentLoaded', () => {
    const pjGrid = document.getElementById('pj-grid');
    const pjTotal = document.getElementById('pj-total');
    const pjResult = document.getElementById('pj-result');
    const API_URL = 'http://localhost:3000/api/projects';

    function renderProjects(data) {
        if (!pjGrid) return;
        
        pjGrid.innerHTML = '';
        data.forEach((pj, index) => {
            const delay = (index % 3) * 80;
            // Parse tags if they come as string from MySQL JSON column
            let tags = pj.tags;
            if (typeof tags === 'string') {
                try { tags = JSON.parse(tags); } catch(e) { tags = []; }
            }
            const tagsHtml = tags ? tags.map(t => `<span class="tag">${t}</span>`).join('') : '';
            
            const card = document.createElement('div');
            card.className = 'pj-card reveal';
            card.style.setProperty('--d', `${delay}ms`);
            card.setAttribute('data-cat', pj.category);
            
            card.innerHTML = `
                <div class="pj-thumb pj-thumb--${pj.thumb_color || 'teal'}">
                    <i class="${pj.thumb_icon || 'fas fa-code'}"></i>
                    <span class="pj-badge">${pj.badge || ''}</span>
                </div>
                <div class="pj-body">
                    <h3>${pj.title}</h3>
                    <p class="pj-sub">${pj.sub_title || ''}</p>
                    <div class="pj-tags">${tagsHtml}</div>
                </div>
                <div class="pj-hover">
                    <p>${pj.description || ''}</p>
                    <div class="pj-impact-row">
                        <div class="pj-impact-item"><strong>${pj.impact_value_1 || ''}</strong><span>${pj.impact_label_1 || ''}</span></div>
                        <div class="pj-impact-item"><strong>${pj.impact_value_2 || ''}</strong><span>${pj.impact_label_2 || ''}</span></div>
                    </div>
                    <a href="${pj.detail_link || '#'}" class="pj-detail-link">Lihat Detail <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            pjGrid.appendChild(card);
        });

        // Update counts
        if (pjTotal) pjTotal.textContent = data.length;
        if (pjResult) pjResult.textContent = data.length + ' proyek ditampilkan';

        // Re-init reveal animations
        if (window.observer) {
            document.querySelectorAll('.pj-card').forEach(el => window.observer.observe(el));
        }
    }

    async function fetchProjects() {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            renderProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
            if (pjGrid) pjGrid.innerHTML = '<p style="text-align:center; grid-column:1/-1;">Gagal memuat data. Pastikan server API menyala.</p>';
        }
    }

    // --- FILTERING ---
    const pjFilters = document.querySelectorAll('.pj-filter');
    pjFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            pjFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.cat;
            
            let visible = 0;
            const cards = document.querySelectorAll('.pj-card');
            cards.forEach(card => {
                const show = cat === 'all' || card.dataset.cat === cat;
                card.classList.toggle('pj-hidden', !show);
                if (show) visible++;
            });
            if (pjResult) pjResult.textContent = visible + ' proyek ditampilkan';
        });
    });

    fetchProjects();
    
    // Polling for "Real-time" effect without WebSockets for now
    setInterval(fetchProjects, 10000); 
});
