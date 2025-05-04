'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faKey, faShield, faTable, faPlus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
  return (
    <nav className="bg-white text-gray-800 py-4 sticky top-0 z-50 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-wrap justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center gap-2 text-blue-900">
          <FontAwesomeIcon icon={faHome} />
          <span>Освітній портал</span>
        </Link>

        <div className="flex">
          <Link
            href="/private-keys"
            className="flex items-center gap-1 text-blue-900 hover:text-blue-700 active:text-blue-500 transition-colors px-4 py-2 font-medium"
          >
            <FontAwesomeIcon icon={faKey} className="mr-1" />
            <span>Приватні ключі</span>
          </Link>

          <Link
            href="/key-management"
            className="flex items-center gap-1 text-blue-900 hover:text-blue-700 active:text-blue-500 transition-colors px-4 py-2 font-medium"
          >
            <FontAwesomeIcon icon={faShield} className="mr-1" />
            <span>Управління ключами</span>
          </Link>

          <Link
            href="/security-features"
            className="flex items-center gap-1 text-blue-900 hover:text-blue-700 active:text-blue-500 transition-colors px-4 py-2 font-medium"
          >
            <FontAwesomeIcon icon={faSquarePlus} className="mr-1" />
            <span>Функції безпеки</span>
          </Link>

          <Link
            href="/wallet-matrix"
            className="flex items-center gap-1 text-blue-900 hover:text-blue-700 active:text-blue-500 transition-colors px-4 py-2 font-medium"
          >
            <FontAwesomeIcon icon={faTable} className="mr-1" />
            <span>Матриця гаманців</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
