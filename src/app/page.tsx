'use client';

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faShield, faTable, faArrowRight, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main className="py-8 w-full">
      <section className="my-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">Освітній портал з безпеки криптовалютних гаманців</h1>
        <p className="text-gray-700 text-xl mb-8 max-w-3xl mx-auto">
          Вітаємо у нашому освітньому порталі, присвяченому важливості
          генерації приватних ключів та забезпечення безпеки в блокчейні
        </p>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Функціональні можливості</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link href="/private-keys" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow h-full flex flex-col">
              <FontAwesomeIcon icon={faKey} className="text-blue-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Генерація приватних ключів</h3>
              <p className="mb-4 text-gray-700 flex-grow">Дізнайтеся про процес генерації приватних ключів у блокчейні</p>
              <div className="text-blue-700 group-hover:text-blue-500 font-medium transition-colors inline-flex items-center">
                Дізнатися більше
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
              </div>
            </div>
          </Link>

          <Link href="/key-management" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow h-full flex flex-col">
              <FontAwesomeIcon icon={faShield} className="text-blue-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Захист приватних ключів</h3>
              <p className="mb-4 text-gray-700 flex-grow">Вивчіть методи безпечного зберігання та управління ключами</p>
              <div className="text-blue-700 group-hover:text-blue-500 font-medium transition-colors inline-flex items-center">
                Дізнатися більше
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
              </div>
            </div>
          </Link>

          <Link href="/security-features" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow h-full flex flex-col">
              <FontAwesomeIcon icon={faSquarePlus} className="text-blue-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Додаткові функції безпеки</h3>
              <p className="mb-4 text-gray-700 flex-grow">Ознайомтеся з просунутими методами захисту криптовалютних акаунтів</p>
              <div className="text-blue-700 group-hover:text-blue-500 font-medium transition-colors inline-flex items-center">
                Дізнатися більше
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
              </div>
            </div>
          </Link>

          <Link href="/wallet-matrix" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow h-full flex flex-col">
              <FontAwesomeIcon icon={faTable} className="text-blue-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Матриця характеристик гаманців</h3>
              <p className="mb-4 text-gray-700 flex-grow">Порівняйте різні типи гаманців та їх функціональні можливості</p>
              <div className="text-blue-700 group-hover:text-blue-500 font-medium transition-colors inline-flex items-center">
                Дізнатися більше
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
