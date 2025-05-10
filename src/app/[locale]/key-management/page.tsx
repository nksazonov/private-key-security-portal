import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
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
  faLock
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

export default function KeyManagement({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('KeyManagementPage');
  const ui = useTranslations('UI.labels');

  // Define the wallet types with their data
  const walletTypes = [
    {
      id: 'hardware-wallets',
      icon: <FontAwesomeIcon icon={faMemory} size="lg" />,
      title: t('hardware.name'),
      description: t.raw('hardware.description'),
      advantages: t.raw('hardware.advantages'),
      disadvantages: t.raw('hardware.disadvantages'),
      carouselImages: [
        '/images/key-management/hardwareWallet_ledgerFlex.webp',
        '/images/key-management/hardwareWallet_ledgerNano.webp',
        '/images/key-management/hardwareWallet_trezorSafe.avif',
        '/images/key-management/hardwareWallet_trezorSafeNFC.jpg',
      ],
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 5 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 3 },
        { name: ui('security'), icon: faLock, rating: 5 },
      ]
    },
    {
      id: 'software-wallets',
      icon: <FontAwesomeIcon icon={faMobileScreen} size="lg" />,
      title: t('software.name'),
      description: t.raw('software.description'),
      advantages: t.raw('software.advantages'),
      disadvantages: t.raw('software.disadvantages'),
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
      ]
    },
    {
      id: 'paper-wallets',
      icon: <FontAwesomeIcon icon={faFileLines} size="lg" />,
      title: t('paper.name'),
      description: t.raw('paper.description'),
      advantages: t.raw('paper.advantages'),
      disadvantages: t.raw('paper.disadvantages'),
      carouselImages: [
        '/images/key-management/paperWallet_bitcoin.png',
        '/images/key-management/paperWallet_checks.jpg',
        '/images/key-management/paperWallet_myEtherWallet.ppm',
      ],
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 4 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 2 },
        { name: ui('security'), icon: faLock, rating: 4 },
      ]
    },
    {
      id: 'memory-wallets',
      icon: <FontAwesomeIcon icon={faBrain} size="lg" />,
      title: t('memory.name'),
      description: t.raw('memory.description'),
      advantages: t.raw('memory.advantages'),
      disadvantages: t.raw('memory.disadvantages'),
      carouselImages: [
        '/images/key-management/memoryWallet.webp'
      ],
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 2 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 3 },
        { name: ui('security'), icon: faLock, rating: 3 },
      ]
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

        <div className="flex flex-col gap-12 mt-8">
          {walletTypes.map((wallet, index) => (
            <div 
              id={wallet.id}
              key={wallet.id}
              className="flex flex-col md:flex-row items-start gap-8"
            >
              {/* Carousel - position left on odd indexes */}
              {index % 2 !== 0 && wallet.carouselImages && wallet.carouselImages.length > 0 && (
                <div className="flex-shrink-0 order-1 md:order-none">
                  <Carousel images={wallet.carouselImages} height={320} width={320} />
                </div>
              )}

              {/* Card content */}
              <div className="flex-1">
                <Card
                  icon={wallet.icon}
                  title={wallet.title}
                  description={wallet.description}
                >
                  {/* Ratings section with border before and after */}
                  <div className="my-6 py-6 border-y border-gray-200">
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}