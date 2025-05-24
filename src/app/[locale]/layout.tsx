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

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppLocale } from '@/i18n/types';
import 'highlight.js/styles/github-dark.css';
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

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedScrollPosition = localStorage.getItem('scrollPosition');
                  var savedPath = localStorage.getItem('lastPath');
                  var currentPath = window.location.pathname;
                  
                  if (savedScrollPosition && savedPath === currentPath) {
                    window.scrollTo(0, parseInt(savedScrollPosition, 10));
                  }
                } catch (e) {
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
