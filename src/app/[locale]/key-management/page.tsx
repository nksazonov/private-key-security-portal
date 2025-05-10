import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import AnchorHeading from '@/components/AnchorHeading';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Card from '@/components/Card';
import AdvantagesList from '@/components/AdvantagesList';
import DisadvantagesList from '@/components/DisadvantagesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMemory, faMobileScreen, faFileLines, faBrain } from '@fortawesome/free-solid-svg-icons';

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
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('description')}
          </ReactMarkdown>
        </div>

        <AnchorHeading
          as="h2"
          id="key-holder"
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          {t('keyHolder.name')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('keyHolder.description')}
          </ReactMarkdown>
        </div>

        <div className="flex flex-col gap-6 mt-8">
          {/* Hardware Wallet Card */}
          <div id="hardware-wallets">
            <Card
              icon={<FontAwesomeIcon icon={faMemory} size="lg" />}
              title={t('hardware.name')}
              description={t.raw('hardware.description')}
              carouselImages={[
                '/images/key-management/hardwareWallet_ledgerFlex.webp',
                '/images/key-management/hardwareWallet_ledgerNano.webp',
                '/images/key-management/hardwareWallet_trezorSafe.avif',
                '/images/key-management/hardwareWallet_trezorSafeNFC.jpg',
              ]}
            >
              <AdvantagesList content={t.raw('hardware.advantages')} />
              <DisadvantagesList content={t.raw('hardware.disadvantages')} />
            </Card>
          </div>

          {/* Software Wallet Card */}
          <div id="software-wallets">
            <Card
              icon={<FontAwesomeIcon icon={faMobileScreen} size="lg" />}
              title={t('software.name')}
              description={t.raw('software.description')}
              carouselImages={[
                '/images/key-management/softwareWallet_metamask.png',
                '/images/key-management/softwareWallet_phantom.webp',
                '/images/key-management/softwareWallet_rainbow.avif',
                '/images/key-management/softwareWallet_trust.avif',
              ]}
            >
              <AdvantagesList content={t.raw('software.advantages')} />
              <DisadvantagesList content={t.raw('software.disadvantages')} />
            </Card>
          </div>

          {/* Paper Wallet Card */}
          <div id="paper-wallets">
            <Card
              icon={<FontAwesomeIcon icon={faFileLines} size="lg" />}
              title={t('paper.name')}
              description={t.raw('paper.description')}
              carouselImages={[
                '/images/key-management/paperWallet_bitcoin.png',
                '/images/key-management/paperWallet_checks.jpg',
                '/images/key-management/paperWallet_myEtherWallet.ppm',
              ]}
            >
              <AdvantagesList content={t.raw('paper.advantages')} />
              <DisadvantagesList content={t.raw('paper.disadvantages')} />
            </Card>
          </div>

          {/* Memory/Brain Wallet Card */}
          <div id="memory-wallets">
            <Card
              icon={<FontAwesomeIcon icon={faBrain} size="lg" />}
              title={t('memory.name')}
              description={t.raw('memory.description')}
              carouselImages={[
                '/images/key-management/memoryWallet.webp'
              ]}
            >
              <AdvantagesList content={t.raw('memory.advantages')} />
              <DisadvantagesList content={t.raw('memory.disadvantages')} />
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
