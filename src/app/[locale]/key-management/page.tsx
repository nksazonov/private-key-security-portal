import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import AnchorHeading from '@/components/AnchorHeading';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import AdvantagesList from '@/components/AdvantagesList';
import DisadvantagesList from '@/components/DisadvantagesList';
import RatingIndicator from '@/components/RatingIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMemory,
  faMobileScreen,
  faFileLines,
  faBrain,
  faShieldHalved,
  faThumbsUp,
  faLock,
  faLink
} from '@fortawesome/free-solid-svg-icons';

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

// Types for wallet data
interface RatingItem {
  name: string;
  icon: any;
  rating: number;
}

interface LinkItem {
  title: string;
  url: string;
}

interface WalletType {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  advantages: string;
  disadvantages: string;
  carouselImages: string[];
  ratings: RatingItem[];
  examples?: string[];
  useful_links: LinkItem[];
}

export default function KeyManagement({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('KeyManagementPage');
  const ui = useTranslations('UI.labels');
  const common = useTranslations('Common');

  // Define the wallet types with their data
  const walletTypes: WalletType[] = [
    {
      id: 'hardware-wallets',
      icon: <FontAwesomeIcon icon={faMemory} size="lg" />,
      title: t('keyHolder.hardware.name'),
      description: t.raw('keyHolder.hardware.description'),
      advantages: t.raw('keyHolder.hardware.advantages'),
      disadvantages: t.raw('keyHolder.hardware.disadvantages'),
      carouselImages: [
        '/images/key-management/hardwareWallet_ledgerFlex.webp',
        '/images/key-management/hardwareWallet_ledgerNano.webp',
        '/images/key-management/hardwareWallet_trezorSafe.avif',
        '/images/key-management/hardwareWallet_trezorSafeNFC.jpg',
      ],
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 4 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 3 },
        { name: ui('security'), icon: faLock, rating: 5 },
      ],
      examples: t.raw('keyHolder.hardware.examples'),
      useful_links: t.raw('keyHolder.hardware.useful_links')
    },
    {
      id: 'software-wallets',
      icon: <FontAwesomeIcon icon={faMobileScreen} size="lg" />,
      title: t('keyHolder.software.name'),
      description: t.raw('keyHolder.software.description'),
      advantages: t.raw('keyHolder.software.advantages'),
      disadvantages: t.raw('keyHolder.software.disadvantages'),
      carouselImages: [
        '/images/key-management/softwareWallet_metamask.png',
        '/images/key-management/softwareWallet_phantom.webp',
        '/images/key-management/softwareWallet_rainbow.avif',
        '/images/key-management/softwareWallet_trust.avif',
      ],
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 3 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 5 },
        { name: ui('security'), icon: faLock, rating: 2 },
      ],
      examples: t.raw('keyHolder.software.examples'),
      useful_links: t.raw('keyHolder.software.useful_links')
    },
    {
      id: 'paper-wallets',
      icon: <FontAwesomeIcon icon={faFileLines} size="lg" />,
      title: t('keyHolder.paper.name'),
      description: t.raw('keyHolder.paper.description'),
      advantages: t.raw('keyHolder.paper.advantages'),
      disadvantages: t.raw('keyHolder.paper.disadvantages'),
      carouselImages: [
        '/images/key-management/paperWallet_bitcoin.png',
        '/images/key-management/paperWallet_checks.jpg',
        '/images/key-management/paperWallet_myEtherWallet.ppm',
      ],
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 4 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 2 },
        { name: ui('security'), icon: faLock, rating: 4 },
      ],
      examples: t.raw('keyHolder.paper.examples'),
      useful_links: t.raw('keyHolder.paper.useful_links')
    },
    {
      id: 'memory-wallets',
      icon: <FontAwesomeIcon icon={faBrain} size="lg" />,
      title: t('keyHolder.memory.name'),
      description: t.raw('keyHolder.memory.description'),
      advantages: t.raw('keyHolder.memory.advantages'),
      disadvantages: t.raw('keyHolder.memory.disadvantages'),
      carouselImages: [
        '/images/key-management/memoryWallet.webp'
      ],
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 2 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 1 },
        { name: ui('security'), icon: faLock, rating: 5 },
      ],
      useful_links: t.raw('keyHolder.memory.useful_links')
    }
  ];

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

        <div className="flex flex-col gap-16 mt-8">
          {walletTypes.map((wallet, index) => (
            <div key={wallet.id} className="space-y-8">
              {/* Card and Carousel container */}
              <div
                id={wallet.id}
                className="flex flex-col md:flex-row items-start gap-8"
              >
                {/* Carousel - position left on odd indexes */}
                {index % 2 !== 0 && wallet.carouselImages && wallet.carouselImages.length > 0 && (
                  <div className="flex-shrink-0 order-1 md:order-none">
                    <Carousel images={wallet.carouselImages} height={320} width={320} />
                    <div className="mt-4 space-y-4">
                      {/* Examples section - not for Memory wallet */}
                      {wallet.examples && (
                        <div>
                          <h4 className="font-semibold text-lg text-blue-700">{ui('examples')}</h4>
                          <ul className="mt-2 space-y-1">
                            {wallet.examples.map((example: string, i: number) => (
                              <li key={i} className="text-gray-600">• {example}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Useful links section */}
                      {wallet.useful_links && (
                        <div>
                          <h4 className="font-semibold text-lg text-blue-700">{common('useful_links')}</h4>
                          <ul className="mt-2 space-y-2">
                            {wallet.useful_links.map((link: LinkItem, i: number) => (
                              <li key={i} className="flex items-center">
                                <FontAwesomeIcon icon={faLink} className="text-blue-500 mr-2" />
                                <Link
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {link.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Card content */}
                <div className="flex-1">
                  <Card
                    icon={wallet.icon}
                    title={wallet.title}
                    description={wallet.description}
                  >
                    {/* Ratings section */}
                    <div className="my-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center text-center">
                        {wallet.ratings.map((rating, ratingIndex) => (
                          <RatingIndicator
                            key={ratingIndex}
                            name={rating.name}
                            icon={rating.icon}
                            themeColor="text-yellow-500"
                            totalAmount={5}
                            rating={rating.rating}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Advantages and disadvantages */}
                    <AdvantagesList content={wallet.advantages} />
                    <DisadvantagesList content={wallet.disadvantages} />
                  </Card>
                </div>

                {/* Carousel - position right on even indexes */}
                {index % 2 === 0 && wallet.carouselImages && wallet.carouselImages.length > 0 && (
                  <div className="flex-shrink-0 order-1">
                    <Carousel images={wallet.carouselImages} height={320} width={320} />
                    <div className="mt-4 space-y-4">
                      {/* Examples section - not for Memory wallet */}
                      {wallet.examples && (
                        <div>
                          <h4 className="font-semibold text-lg text-blue-700">{ui('examples')}</h4>
                          <ul className="mt-2 space-y-1">
                            {wallet.examples.map((example: string, i: number) => (
                              <li key={i} className="text-gray-600">• {example}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Useful links section */}
                      {wallet.useful_links && (
                        <div>
                          <h4 className="font-semibold text-lg text-blue-700">{common('useful_links')}</h4>
                          <ul className="mt-2 space-y-2">
                            {wallet.useful_links.map((link: LinkItem, i: number) => (
                              <li key={i} className="flex items-center">
                                <FontAwesomeIcon icon={faLink} className="text-blue-500 mr-2" />
                                <Link
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {link.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
