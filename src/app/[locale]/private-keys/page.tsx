import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import AnchorHeading from '@/components/AnchorHeading';
import ExternalLink from '@/components/ExternalLink';
import SectionDivider from '@/components/SectionDivider';

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
      <div className="bg-white p-8 rounded-lg">
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
          {t('whatArePrivateKeys.title')}
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          {t('whatArePrivateKeys.description')}
        </p>

        <SectionDivider />

        <AnchorHeading
          as="h2"
          id="generation-process"
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          {t('generationProcess.title')}
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          {t('generationProcess.description')}
        </p>

        <SectionDivider />

        <AnchorHeading
          as="h2"
          id="entropy-sources"
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          {t('entropySources.title')}
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          {t('entropySources.description')}
        </p>

        <div className="mt-8 mb-6">
          <h3 className="text-xl font-medium mt-6 mb-3 text-blue-700">
            {t('entropySources.useful_links')}
          </h3>
          <ul className="space-y-2 pl-4">
            <li>
              <ExternalLink href="https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator">
                Wikipedia: CSPRNG
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://en.bitcoin.it/wiki/Secp256k1">
                Bitcoin Wiki: Secp256k1
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://eth.wiki/fundamentals/private-keys">
                Ethereum Wiki: Private Keys
              </ExternalLink>
            </li>
          </ul>
        </div>

        <SectionDivider />

        <AnchorHeading
          as="h2"
          id="next-section"
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          {t('nextSection.title')}
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-6">
          {t('nextSection.description')}
        </p>

        <SectionDivider isLast={true} />
      </div>
    </main>
  );
}
