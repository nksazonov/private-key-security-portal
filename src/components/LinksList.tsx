"use client"

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface LinkItem {
  title: string;
  url: string;
}

interface LinksListProps {
  links: LinkItem[];
  heading?: string;
}

export default function LinksList({ links, heading }: LinksListProps) {
  // Make sure links is an array before mapping
  const linkItems = Array.isArray(links) ? links : [];

  if (linkItems.length === 0) {
    return null;
  }

  return (
    <div>
      {heading && <h4 className="font-semibold text-lg text-blue-700 mb-4">{heading}</h4>}
      <ul className="mt-2 space-y-2">
        {linkItems.map((link, i) => (
          <li key={i} className="flex items-start">
            <FontAwesomeIcon icon={faLink} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
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