import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import AnchorHeading from '@/components/AnchorHeading';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Cast locale to allowed types for getTranslations
  const t = await getTranslations({
    locale: locale as AppLocale,
    namespace: 'KeyManagementPage'
  });

  return {
    title: t('title')
  };
}

export default function KeyManagement({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('KeyManagementPage');

  return (
    <main className="py-8 w-full">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          {t('description')}
        </p>

        <AnchorHeading 
          as="h2" 
          id="storage-methods" 
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          Storage Methods
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          There are several methods for storing private keys, each with different security and convenience trade-offs.
        </p>

        <AnchorHeading 
          as="h3" 
          id="hardware-wallets" 
          className="text-xl font-medium mt-6 mb-3 text-blue-700"
        >
          Hardware Wallets
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          Hardware wallets are physical devices designed to securely store private keys offline.
          They generate and store keys in a secure element that prevents extraction.
        </p>

        <AnchorHeading 
          as="h3" 
          id="paper-wallets" 
          className="text-xl font-medium mt-6 mb-3 text-blue-700"
        >
          Paper Wallets
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          Paper wallets involve printing private keys or seed phrases on physical paper and
          storing them in secure locations like safes or safety deposit boxes.
        </p>
      </div>
    </main>
  );
}
