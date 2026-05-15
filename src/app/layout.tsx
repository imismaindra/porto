import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jasa Web Developer Laravel Surabaya — Ahmad Maulana Ismaindra",
  description: "Full-stack developer spesialis Laravel & REST API di Surabaya. Bangun website bisnis yang scalable, aman, dan berorientasi ROI. Konsultasi gratis via WhatsApp.",
  keywords: ["web developer Surabaya", "Laravel developer Indonesia", "full stack developer", "jasa pembuatan website", "freelance developer", "REST API developer"],
  authors: [{ name: "Ahmad Maulana Ismaindra" }],
  alternates: {
    canonical: "https://ismaindra.my.id/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Ismaindra — Web Developer",
    title: "Ahmad Maulana Ismaindra — Full-stack Developer Laravel Surabaya",
    description: "Spesialis Laravel & REST API di Surabaya. Bangun website bisnis yang scalable, aman, dan berorientasi ROI. Konsultasi gratis.",
    url: "https://ismaindra.my.id/",
    images: [
      {
        url: "https://ismaindra.my.id/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmad Maulana Ismaindra — Full-stack Laravel Developer Surabaya",
      },
    ],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Maulana Ismaindra — Full-stack Developer Laravel Surabaya",
    description: "Spesialis Laravel & REST API di Surabaya. Website bisnis scalable & berorientasi ROI. Konsultasi gratis.",
    images: ["https://ismaindra.my.id/images/og-cover.jpg"],
    creator: "@ismaindra",
  },
  manifest: "/site.webmanifest",
  other: {
    "geo.region": "ID-JI",
    "geo.placename": "Surabaya, Jawa Timur, Indonesia",
    "language": "Indonesian",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

import ScrollReveal from "@/components/ScrollReveal";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        
        {/* Preload LCP Image */}
        <link rel="preload" as="image" href="/images/profile2.png" fetchPriority="high" />

        {/* Structured Data / JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Ahmad Maulana Ismaindra",
                "alternateName": "Ismaindra",
                "url": "https://ismaindra.my.id/",
                "image": "https://ismaindra.my.id/images/profile2.png",
                "email": "imismaindra@gmail.com",
                "telephone": "+6285173329189",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Surabaya",
                  "addressRegion": "Jawa Timur",
                  "addressCountry": "ID"
                },
                "jobTitle": "Full-stack Web Developer",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Freelance"
                },
                "knowsAbout": ["Laravel", "PHP", "REST API", "MySQL", "JavaScript", "Web Development", "Full-stack Development"],
                "sameAs": [
                  "https://www.linkedin.com/in/ismaindra",
                  "https://github.com/imismaindra",
                  "mailto:imismaindra@gmail.com"
                ],
                "description": "Full-stack web developer spesialis Laravel & API Architecture di Surabaya, Indonesia."
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "Ismaindra — Jasa Web Developer Surabaya",
                "url": "https://ismaindra.my.id/",
                "telephone": "+6285173329189",
                "email": "imismaindra@gmail.com",
                "image": "https://ismaindra.my.id/images/og-cover.jpg",
                "description": "Jasa pembuatan website bisnis profesional spesialis Laravel & REST API di Surabaya. Fokus pada performa, keamanan, dan skalabilitas.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Surabaya",
                  "addressRegion": "Jawa Timur",
                  "postalCode": "60000",
                  "addressCountry": "ID"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -7.2575,
                  "longitude": 112.7521
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Indonesia"
                },
                "priceRange": "$$",
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "21:00"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Layanan Web Development",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Pembuatan Website Bisnis",
                        "description": "Website bisnis profesional berbasis Laravel dengan desain modern dan performa tinggi"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "REST API Development",
                        "description": "Pengembangan REST API yang scalable and aman menggunakan Laravel"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Web Application Development",
                        "description": "Pengembangan aplikasi web full-stack dengan teknologi modern"
                      }
                    }
                  ]
                },
                "sameAs": [
                  "https://www.linkedin.com/in/ismaindra",
                  "https://github.com/imismaindra"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Ismaindra — Web Developer Portfolio",
                "url": "https://ismaindra.my.id/",
                "description": "Portfolio Ahmad Maulana Ismaindra, Full-stack developer spesialis Laravel & API Architecture di Surabaya",
                "inLanguage": "id",
                "author": {
                  "@type": "Person",
                  "name": "Ahmad Maulana Ismaindra"
                }
              }
            ])
          }}
        />
      </head>
      <body>
        <div className="grain"></div>
        <ScrollReveal />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}

