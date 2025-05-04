'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">{t('title')}</h1>
      <div className="text-lg text-gray-700 text-center max-w-lg">
        {t.rich('description', {
          p: (chunks) => <p className="mb-4">{chunks}</p>,
          retry: (chunks) => (
            <button
              onClick={reset}
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              {chunks}
            </button>
          )
        })}
      </div>
    </div>
  );
}