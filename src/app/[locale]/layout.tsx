import { notFound } from 'next/navigation';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, getMessages, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import { routing } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollPositionRestorer from '@/components/ScrollPositionRestorer';
import "@/app/globals.css";

// Font Awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppLocale } from '@/i18n/types';
// Syntax highlighting
import 'highlight.js/styles/github-dark.css';
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

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Cast locale to allowed types for getTranslations
  const t = await getTranslations({
    locale: locale as AppLocale,
    namespace: 'LocaleLayout'
  });

  return {
    title: t('title')
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get the messages for the locale
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <head>
        {/* Inline script to prevent scroll flicker - runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedScrollPosition = localStorage.getItem('scrollPosition');
                  var savedPath = localStorage.getItem('lastPath');
                  var currentPath = window.location.pathname;
                  
                  if (savedScrollPosition && savedPath === currentPath) {
                    // Set scroll immediately, before any rendering
                    // Use scrollTo without changing document styles
                    window.scrollTo(0, parseInt(savedScrollPosition, 10));
                  }
                } catch (e) {
                  // Fail silently - localStorage might be unavailable
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white`}>
        <NextIntlClientProvider messages={messages}>
          <ScrollPositionRestorer />
          <Navigation />
          <div className="flex-grow">
            <div className="max-w-5xl w-full mx-auto">
              {children}
            </div>
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
