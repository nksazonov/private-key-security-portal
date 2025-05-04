'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const pathname = usePathname();

  // Define the order of pages for navigation
  const pageOrder = [
    { path: '/', label: 'Головна' },
    { path: '/private-keys', label: 'Приватні ключі' },
    { path: '/key-management', label: 'Управління ключами' },
    { path: '/security-features', label: 'Функції безпеки' },
    { path: '/wallet-matrix', label: 'Матриця гаманців' }
  ];

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
                <span>Попередня стаття: {prevPage.label}</span>
              </Link>
            )}
          </div>

          <div>
            {nextPage && (
              <Link
                href={nextPage.path}
                className="flex items-center gap-2 text-blue-900 hover:text-blue-700 active:text-blue-500 transition-colors px-4 py-2 rounded-md"
              >
                <span>Наступна стаття: {nextPage.label}</span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
