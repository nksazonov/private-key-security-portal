import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Font Awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Освітній портал з безпеки криптовалютних гаманців",
  description: "Портал для вивчення основ безпеки криптовалютних гаманців",
};

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white`}
      >
        <Navigation />
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 flex-grow">
          <div className="max-w-7xl w-full mx-auto">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
