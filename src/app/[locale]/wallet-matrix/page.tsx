import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import AnchorHeading from '@/components/AnchorHeading';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Cast locale to allowed types for getTranslations
  const t = await getTranslations({
    locale: locale as AppLocale,
    namespace: 'WalletMatrixPage'
  });

  return {
    title: t('title')
  };
}

export default function WalletMatrixPage({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('WalletMatrixPage');

  return (
    <main className="py-8 w-full">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          {t('description')}
        </p>

        <AnchorHeading 
          as="h2" 
          id="wallet-types" 
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          Types of Wallets
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          There are several types of cryptocurrency wallets, each with unique security and accessibility characteristics.
        </p>

        <AnchorHeading 
          as="h3" 
          id="hardware-wallets-comparison" 
          className="text-xl font-medium mt-6 mb-3 text-blue-700"
        >
          Hardware Wallets
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          Physical devices that store private keys offline, offering high security but requiring the physical device for transactions.
        </p>

        <AnchorHeading 
          as="h3" 
          id="software-wallets" 
          className="text-xl font-medium mt-6 mb-3 text-blue-700"
        >
          Software Wallets
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          Applications installed on computers or smartphones that provide convenient access but are vulnerable to malware if the device is compromised.
        </p>
      </div>
    </main>
  );
}
