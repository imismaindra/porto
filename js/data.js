const portfolioData = {
    services: [
        {
            title: "Web App Development",
            icon: "fa-laptop-code",
            problem: "Website lambat dan sulit dikelola menghambat pertumbuhan bisnis.",
            benefit: "Aplikasi web kustom yang responsif, cepat, dan mudah dioperasikan."
        },
        {
            title: "Backend & API Development",
            icon: "fa-server",
            problem: "Sistem yang tidak sinkron dan data yang berantakan.",
            benefit: "Arsitektur API yang kokoh untuk integrasi antar platform yang mulus."
        },
        {
            title: "System Optimization",
            icon: "fa-database",
            problem: "Loading lama karena struktur database yang tidak efisien.",
            benefit: "Optimasi query dan skema database untuk kecepatan maksimal."
        },
        {
            title: "Maintenance & Support",
            icon: "fa-tools",
            problem: "Bug yang menumpuk dan fitur yang ketinggalan zaman.",
            benefit: "Pemeliharaan rutin agar sistem Anda tetap relevan dan aman."
        }
    ],
    projects: [
        {
            title: "Masjidina (Enterprise SaaS)",
            image: "https://placehold.co/600x400/0f172a/ffffff?text=Masjidina+SaaS",
            problem: "Pengelolaan donasi dan keuangan masjid yang manual dan tidak transparan.",
            solusi: "Membangun platform SaaS dengan dashboard manajemen real-time.",
            dampak: "Transparansi meningkat di ratusan masjid di Indonesia.",
            tech: ["Laravel", "MySQL", "Bootstrap"]
        },
        {
            title: "AI Reservation Engine",
            image: "https://placehold.co/600x400/0f172a/ffffff?text=AI+Reservation",
            problem: "Beban kerja staf restoran tinggi melayani reservasi via chat manual.",
            solusi: "Chatbot AI yang terintegrasi otomatis dengan sistem inventaris meja.",
            dampak: "Mengurangi beban operasional 40% dan booking lebih cepat.",
            tech: ["Node.js", "DialogFlow", "PostgreSQL"]
        }
    ],
    testimonials: [
        {
            text: "Ahmad adalah developer yang sangat profesional. Dia memahami kebutuhan proyek kami dengan cepat dan memberikan hasil yang melampaui ekspektasi.",
            author: "Budi Santoso",
            position: "Product Manager, PT Universal Big Data",
            avatar: "https://i.pravatar.cc/150?img=1"
        },
        {
            text: "Sangat terkesan dengan ketajaman teknisnya. Ahmad tidak hanya menulis kode, tapi memberikan saran bisnis yang berharga untuk produk kami.",
            author: "Reza Pratama",
            position: "Founder, StartUp Tech",
            avatar: "https://i.pravatar.cc/150?img=3"
        }
    ]
};

window.portfolioData = portfolioData;
