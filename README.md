# Web Portfolio Blueprint

Ini adalah blueprint (struktur dasar) untuk website portfolio profesional Anda.

## 📁 Struktur Folder

```
porto/
├── index.html           # Halaman utama
├── css/
│   └── style.css       # Styling utama
├── js/
│   └── script.js       # JavaScript interaktif
├── images/             # Folder untuk gambar proyek
├── README.md           # File ini
└── assets/             # Folder tambahan untuk asset lainnya
```

## 🎯 Fitur yang Tersedia

### 1. **Navigation Bar**
   - Menu responsif dengan hamburger menu untuk mobile
   - Sticky navigation untuk akses mudah

### 2. **Hero Section**
   - Headline yang menarik
   - Call-to-action buttons
   - Placeholder untuk foto profil

### 3. **About Section**
   - Deskripsi diri profesional
   - Statistik pengalaman dan projek

### 4. **Projects Section**
   - Grid layout untuk menampilkan proyek
   - Kartu proyek dengan gambar dan deskripsi
   - Tag teknologi untuk setiap proyek

### 5. **Skills Section**
   - Kategori keahlian (Frontend, Backend, Tools)
   - Daftar skills yang terorganisir

### 6. **Contact Section**
   - Form kontak interaktif
   - Informasi kontak lengkap
   - Social media links

### 7. **Responsive Design**
   - Mobile-first approach
   - Optimal untuk semua ukuran layar
   - Smooth animations dan transitions

## 🚀 Cara Menggunakan

### 1. Personalisasi Data
Edit file `index.html` dan ganti:
- "Nama Anda" dengan nama lengkap Anda
- "email@anda.com" dengan email Anda
- "+62 XXX-XXXX-XXXX" dengan nomor telepon
- Deskripsi dan informasi lainnya sesuai kebutuhan

### 2. Tambah Proyek
Di section projects, tambahkan lebih banyak kartu proyek dengan format:
```html
<div class="project-card">
    <div class="project-image">
        <img src="images/projectX.jpg" alt="Proyek X">
    </div>
    <div class="project-info">
        <h3>Nama Proyek</h3>
        <p>Deskripsi proyek</p>
        <div class="project-tags">
            <span class="tag">Teknologi</span>
        </div>
        <a href="#" class="project-link">Lihat Proyek</a>
    </div>
</div>
```

### 3. Tambah Gambar
- Letakkan gambar proyek di folder `images/`
- Update src pada `<img>` tag sesuai nama file

### 4. Customize Warna
Edit file `css/style.css` dan ubah warna di bagian `:root`:
```css
:root {
    --primary-color: #6366f1;      /* Ubah warna utama */
    --secondary-color: #8b5cf6;    /* Ubah warna sekunder */
    --dark-color: #1f2937;
    --light-color: #f9fafb;
    /* ... */
}
```

## 🎨 Color Palette (Default)
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Dark**: `#1f2937` (Dark Gray)
- **Light**: `#f9fafb` (Light Gray)

## 📦 Dependencies
- Font Awesome Icons (CDN dari CDNJS)
- Tidak perlu install package apapun

## ✨ Fitur Interaktif
- Smooth scrolling saat navigasi
- Mobile menu toggle
- Scroll animation untuk sections
- Form submission handling
- Social media links

## 🔧 Customize Lebih Lanjut

### Tambah Dark Mode
Edit `css/style.css` dan tambahkan:
```css
body.dark-mode {
    background: #1f2937;
    color: #f9fafb;
}
```

### Integrasikan dengan Backend
Di `js/script.js`, ganti form handling dengan:
```javascript
// Kirim ke backend/email service
fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data)
})
```

### Tambah Analytics
Tambahkan Google Analytics atau Umami ke dalam `<head>` tag di `index.html`

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚀 Deployment Options
1. **Netlify** - Drag & drop deploy
2. **Vercel** - Connected git deploy
3. **GitHub Pages** - Free hosting
4. **Traditional Hosting** - Upload via FTP

## 💡 Tips
- Gunakan gambar berkualitas tinggi untuk proyek
- Update portfolio secara berkala dengan proyek terbaru
- Pastikan semua link eksternal bekerja dengan baik
- Test di berbagai device sebelum launch
- Optimize gambar untuk loading cepat

## 📝 To-Do Checklist
- [ ] Ganti nama dan informasi pribadi
- [ ] Tambah foto profil
- [ ] Update daftar skills
- [ ] Tambah proyek aktual
- [ ] Ganti link social media
- [ ] Setup form kontak (backend)
- [ ] Test responsiveness
- [ ] Optimize untuk SEO
- [ ] Deploy ke hosting

---
**Happy coding! 🎉**
