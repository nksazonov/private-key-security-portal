import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import AnchorHeading from '@/components/AnchorHeading';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Cast locale to allowed types for getTranslations
  const t = await getTranslations({
    locale: locale as AppLocale,
    namespace: 'SecurityFeaturesPage'
  });

  return {
    title: t('title')
  };
}

export default function SecurityFeaturesPage({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('SecurityFeaturesPage');

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
          id="two-factor-authentication" 
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          Two-Factor Authentication (2FA)
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          2FA adds an additional layer of security by requiring a second form of verification beyond just a password.
          This can include authenticator apps, SMS codes, or hardware security keys.
        </p>

        <AnchorHeading 
          as="h2" 
          id="multi-signature" 
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          Multi-Signature Wallets
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          Multi-signature wallets require multiple private keys to authorize a transaction.
          For example, a 2-of-3 multisig setup requires any 2 of 3 designated keys to sign off on transactions,
          increasing security by distributing trust.
        </p>
      </div>
    </main>
  );
}
