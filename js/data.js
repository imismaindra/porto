const portfolioData = {
    experience: [
        {
            period: "Januari 2022 - Oktober 2023",
            role: "Web Developer (Pegawai Tetap)",
            companyLogo: "images/pt-universal-big-data.svg",
            companyName: "PT Universal Big Data - Tasikmadu, Malang",
            description: "Mengembangkan sistem informasi manajemen masjid melalui masjidina.com berbasis Serenity Framework (ASP.NET).",
            responsibilities: [
                "Membuat modul kegiatan, donasi, laporan keuangan, dan dashboard admin interaktif.",
                "Menulis script SQL untuk reporting dan integrasi data.",
                "Menguatkan kemampuan C#, TypeScript, jQuery, dan SQL Server."
            ]
        },
        {
            period: "Juni 2021 - Desember 2021",
            role: "WordPress & ChatBot Developer (Magang)",
            companyLogo: "images/pt-universal-big-data.svg",
            companyName: "PT Universal Big Data - Tasikmadu, Malang",
            description: "Mengembangkan AI Chatbot untuk pemesanan restoran dan mendukung pengembangan web WordPress untuk produk perusahaan.",
            responsibilities: [
                "Menggunakan DialogFlow, Manychat, dan Botpress dalam pengembangan chatbot.",
                "Membuat video tutorial teknis menggunakan Camtasia.",
                "Berkontribusi pada website LINK.ID Marketplace dan eNotaris."
            ]
        },
        {
            period: "2024 - Sekarang",
            role: "Asisten Laboratorium",
            companyLogo: "images/logo-lab.png",
            companyName: "Lab Bahasa Pemrograman ITATS - Surabaya",
            description: "Membimbing mahasiswa pada praktikum Pemrograman Terstruktur dan Struktur Data.",
            responsibilities: [
                "Menjelaskan konsep algoritma, problem solving, dan implementasi C++.",
                "Memberikan asistensi selama praktik dan membantu evaluasi tugas/ujian."
            ]
        },
        {
            period: "2023 - Sekarang",
            role: "Anggota Divisi Kewirausahaan",
            companyLogo: "images/logo-himpunan.png",
            companyName: "Himpunan Mahasiswa Teknik Informatika (HMIF) - Surabaya",
            description: "Berkontribusi dalam operasional dan kegiatan kewirausahaan internal organisasi.",
            responsibilities: [
                "Bertanggung jawab atas penjualan merchandise resmi himpunan.",
                "Mengelola distribusi dan penjualan PDH jurusan serta PDH himpunan."
            ]
        }
    ],
    education: [
        {
            period: "Sedang Berjalan",
            degree: "S1 Teknik Informatika",
            schoolLogo: "images/logo-itats.png",
            schoolLogoClass: "edu-logo-itats",
            schoolName: "Institut Teknologi Adhi Tama Surabaya (ITATS)",
            description: "Aktif sebagai mahasiswa dan asisten laboratorium pemrograman."
        },
        {
            period: "2019 - 2022",
            degree: "SMK Rekayasa Perangkat Lunak (RPL)",
            schoolLogo: "images/logo-smk.png",
            schoolLogoClass: "edu-logo-smk",
            schoolName: "SMK Negeri 1 Bangil",
            description: "Bangil, Pasuruan - fondasi dasar pemrograman dan pengembangan web."
        }
    ],
    certifications: [
        {
            provider: "dicoding",
            title: "Belajar Dasar Pemrograman JavaScript",
            issuer: "Dicoding Indonesia",
            date: "Diterbitkan Sep 2025 · Kedaluwarsa Sep 2028",
            credentialId: "ID Kredensial: 1RXYQ66WQZVM",
            year: "2025"
        },
        {
            provider: "dicoding",
            title: "Belajar Dasar Pemrograman Web",
            issuer: "Dicoding Indonesia",
            date: "Diterbitkan Sep 2024 · Kedaluwarsa Sep 2027",
            credentialId: "ID Kredensial: 53XEOVQOYZRN",
            year: "2024"
        },
        {
            provider: "dicoding",
            title: "Belajar Dasar Visualisasi Data",
            issuer: "Dicoding Indonesia",
            date: "Diterbitkan Jun 2024 · Kedaluwarsa Jun 2027",
            credentialId: "ID Kredensial: 07Z6044DRZQR",
            year: "2024"
        },
        {
            provider: "dts",
            title: "Junior Web Developer (Vocational School Graduate Academy)",
            issuer: "Digital Talent Scholarship",
            date: "Diterbitkan Jul 2025 · Kedaluwarsa Sep 2028",
            credentialId: "ID Kredensial: 193106961160-4",
            year: "2025"
        },
        {
            provider: "dts",
            title: "Mindset Digital (Micro Skill)",
            issuer: "Digital Talent Scholarship",
            date: "Diterbitkan Jul 2025 · Kedaluwarsa Jul 2030",
            credentialId: "ID Kredensial: 2299815850-4130/MS/BLSDM.Komdigi/2025",
            year: "2025"
        }
    ],
    projects: {
        web: [
            {
                bgClass: "project-bg-1",
                shortName: "Masjidina.com",
                title: "Sistem Informasi Manajemen Masjid",
                description: "Pengembangan modul kegiatan, donasi, laporan keuangan, dan dashboard admin interaktif berbasis Serenity Framework.",
                tags: ["ASP.NET", "C#", "SQL Server"],
                link: "#"
            },
            {
                bgClass: "project-bg-2",
                shortName: "AI Restaurant ChatBot",
                title: "Chatbot Pemesanan Restoran",
                description: "Pengembangan chatbot untuk alur pemesanan restoran dengan integrasi platform percakapan populer.",
                tags: ["DialogFlow", "Manychat", "Botpress"],
                link: "#"
            },
            {
                bgClass: "project-bg-3",
                shortName: "WordPress Project",
                title: "LINK.ID & eNotaris",
                description: "Berkontribusi dalam pengembangan website WordPress untuk proyek marketplace dan layanan legal digital.",
                tags: ["WordPress", "PHP", "MySQL"],
                link: "#"
            }
        ],
        app: [
            {
                title: "AlQuranApp",
                repoLink: "https://github.com/imismaindra/AlQuranApp.git",
                description: "Aplikasi mobile Al-Quran dengan fokus pada pengalaman membaca, progress baca otomatis, resume chapter, dan reader interaktif.",
                tags: ["Mobile App", "Reader", "AsyncStorage"],
                previewImages: [
                    "images/alquranapp/screen-01.jpg",
                    "images/alquranapp/screen-02.jpg",
                    "images/alquranapp/screen-03.jpg"
                ],
                galleryImages: [
                    "images/alquranapp/screen-01.jpg",
                    "images/alquranapp/screen-02.jpg",
                    "images/alquranapp/screen-03.jpg",
                    "images/alquranapp/screen-04.jpg",
                    "images/alquranapp/screen-05.jpg",
                    "images/alquranapp/screen-06.jpg",
                    "images/alquranapp/screen-07.jpg"
                ]
            },
            {
                title: "Komikuy",
                repoLink: "https://github.com/imismaindra/komikuy",
                description: "Aplikasi baca komik berbasis Expo + React Native dengan feed komik, rekomendasi format, reader chapter, bookmark update, dan riwayat baca.",
                tags: ["Expo SDK 54", "React Native 0.81", "TypeScript", "AsyncStorage"],
                metaData: [
                    { label: "API", code: "https://api.shngm.io" },
                    { label: "Client", code: "src/api/shngmClient.ts", trailing: " (timeout, retry, cache memory + persist GET)" },
                    { label: "Data Lokal", code: "", trailing: "bookmark, history/progress, tema, profil, dan simulasi sync cloud." }
                ],
                previewImages: [
                    "images/komikuy/screen-01.jpg",
                    "images/komikuy/screen-02.jpg",
                    "images/komikuy/screen-03.jpg"
                ],
                galleryImages: [
                    "images/komikuy/screen-01.jpg",
                    "images/komikuy/screen-02.jpg",
                    "images/komikuy/screen-03.jpg",
                    "images/komikuy/screen-04.jpg",
                    "images/komikuy/screen-05.jpg",
                    "images/komikuy/screen-06.jpg",
                    "images/komikuy/screen-07.jpg",
                    "images/komikuy/screen-08.jpg"
                ]
            }
        ]
    }
};

// Make it available globally
window.portfolioData = portfolioData;
