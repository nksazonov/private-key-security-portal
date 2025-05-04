'use client';

import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">{t('title')}</h1>
      <p className="text-lg text-gray-700 text-center max-w-lg">
        {t('description')}
      </p>
    </div>
  );
}