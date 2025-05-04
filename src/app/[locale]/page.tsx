import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faShield, faTable, faArrowRight, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IndexPage' });
  
  return {
    title: t('title')
  };
}

export default function Home({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('IndexPage');
  const n = useTranslations('Navigation');
  const ft = useTranslations('FeatureCards');

  return (
    <main className="py-8 w-full">
      <section className="my-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">{t('title')}</h1>
        <p className="text-gray-700 text-xl mb-8 max-w-3xl mx-auto">
          {t('description')}
        </p>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">{t('features')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link href="/private-keys" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow h-full flex flex-col">
              <FontAwesomeIcon icon={faKey} className="text-blue-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-blue-900">{n('privateKeys')}</h3>
              <p className="mb-4 text-gray-700 flex-grow">{t('PrivateKeysPage.description')}</p>
              <div className="text-blue-700 group-hover:text-blue-500 font-medium transition-colors inline-flex items-center">
                {ft('learnMore')}
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
              </div>
            </div>
          </Link>

          <Link href="/key-management" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow h-full flex flex-col">
              <FontAwesomeIcon icon={faShield} className="text-blue-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-blue-900">{n('keyManagement')}</h3>
              <p className="mb-4 text-gray-700 flex-grow">{t('KeyManagementPage.description')}</p>
              <div className="text-blue-700 group-hover:text-blue-500 font-medium transition-colors inline-flex items-center">
                {ft('learnMore')}
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
              </div>
            </div>
          </Link>

          <Link href="/security-features" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow h-full flex flex-col">
              <FontAwesomeIcon icon={faSquarePlus} className="text-blue-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-blue-900">{n('securityFeatures')}</h3>
              <p className="mb-4 text-gray-700 flex-grow">{t('SecurityFeaturesPage.description')}</p>
              <div className="text-blue-700 group-hover:text-blue-500 font-medium transition-colors inline-flex items-center">
                {ft('learnMore')}
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
              </div>
            </div>
          </Link>

          <Link href="/wallet-matrix" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow h-full flex flex-col">
              <FontAwesomeIcon icon={faTable} className="text-blue-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-blue-900">{n('walletMatrix')}</h3>
              <p className="mb-4 text-gray-700 flex-grow">{t('WalletMatrixPage.description')}</p>
              <div className="text-blue-700 group-hover:text-blue-500 font-medium transition-colors inline-flex items-center">
                {ft('learnMore')}
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}