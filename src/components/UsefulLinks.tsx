"use client"

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface LinkItem {
  title: string;
  url: string;
}

interface UsefulLinksProps {
  links: LinkItem[];
}

export default function UsefulLinks({ links }: UsefulLinksProps) {
  const common = useTranslations('Common');

  // Make sure links is an array before mapping
  const linkItems = Array.isArray(links) ? links : [];

  if (linkItems.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="font-semibold text-lg text-blue-700 mb-4">{common('useful_links')}</h4>
      <ul className="mt-2 space-y-2">
        {linkItems.map((link, i) => (
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
  );
}