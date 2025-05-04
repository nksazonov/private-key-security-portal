import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'KeyManagementPage' });

  return {
    title: t('title')
  };
}

export default function KeyManagement({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('KeyManagementPage');

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
