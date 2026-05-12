import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ismaindra. | Full-stack Developer Portfolio",
  description: "Ahmad Maulana Ismaindra — Full-stack Developer spesialis Laravel & API Architecture.",
};

import ScrollReveal from "@/components/ScrollReveal";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
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
