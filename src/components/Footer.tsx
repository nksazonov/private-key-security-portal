'use client';

import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const footerT = useTranslations('Footer');

  // Define the order of pages for navigation
  const pageOrder = [
    { path: '/', label: t('home') },
    { path: '/private-keys', label: t('privateKeys') },
    { path: '/key-management', label: t('keyManagement') },
    { path: '/security-features', label: t('securityFeatures') },
    { path: '/wallet-matrix', label: t('walletMatrix') }
  ] as const;

  // Find current page index
  const currentIndex = pageOrder.findIndex(page => page.path === pathname);

  // Determine previous and next pages
  const prevPage = currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
  const nextPage = currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null;

  return (
    <footer className="border-t border-gray-200 py-6 bg-white shadow-sm w-full mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          <div>
            {prevPage && (
              <Link
                href={prevPage.path}
                className="flex items-center gap-2 text-blue-900 hover:text-blue-700 active:text-blue-500 transition-colors px-4 py-2 rounded-md"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                <span>Previous article: {prevPage.label}</span>
              </Link>
            )}
          </div>

          <div>
            {nextPage && (
              <Link
                href={nextPage.path}
                className="flex items-center gap-2 text-blue-900 hover:text-blue-700 active:text-blue-500 transition-colors px-4 py-2 rounded-md"
              >
                <span>Next article: {nextPage.label}</span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </Link>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-gray-600">
          {footerT('text')}
        </div>
      </div>
    </footer>
  );
}
