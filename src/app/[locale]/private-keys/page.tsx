import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import AnchorHeading from '@/components/AnchorHeading';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Cast locale to allowed types for getTranslations
  const t = await getTranslations({
    locale: locale as AppLocale,
    namespace: 'PrivateKeysPage'
  });

  return {
    title: t('title')
  };
}

export default function PrivateKeysPage({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('PrivateKeysPage');

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
          id="what-are-private-keys" 
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          What are Private Keys?
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          Private keys are essentially long, randomly generated numbers that serve as a user's password 
          to access and manage their cryptocurrency. They are mathematically related to your public 
          address but remain secret.
        </p>

        <AnchorHeading 
          as="h2" 
          id="generation-process" 
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          The Generation Process
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          The generation of private keys typically involves creating secure random numbers using 
          cryptographically secure pseudorandom number generators (CSPRNGs). Quality wallets use 
          multiple sources of entropy to ensure true randomness.
        </p>

        <AnchorHeading 
          as="h3" 
          id="entropy-sources" 
          className="text-xl font-medium mt-6 mb-3 text-blue-700"
        >
          Sources of Entropy
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          Entropy sources might include mouse movements, keyboard timings, hardware random number 
          generators, and system metrics to create unpredictable keys.
        </p>
      </div>
    </main>
  );
}
