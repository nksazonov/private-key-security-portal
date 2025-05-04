import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

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
        <h1 className="text-3xl font-bold mb-6 text-blue-900">{t('title')}</h1>
        <p className="text-lg text-gray-700 mb-6">
          {t('description')}
        </p>
      </div>
    </main>
  );
}
