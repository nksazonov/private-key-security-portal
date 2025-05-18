"use client"

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faThumbsUp,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import AdvantagesList from '@/components/AdvantagesList';
import DisadvantagesList from '@/components/DisadvantagesList';
import RatingIndicator from '@/components/RatingIndicator';
import SectionDivider from '@/components/SectionDivider';

type CustodyType = 'self' | 'thirdParty' | 'combined';

interface RatingItem {
  name: string;
  icon: any;
  rating: number;
}

interface CustodyModel {
  id: CustodyType;
  ratings: RatingItem[];
}

interface CustodyModelProps {
  onSelect?: (type: CustodyType) => void;
}

export default function CustodyModelSelector({ onSelect }: CustodyModelProps) {
  const t = useTranslations('KeyManagementPage.custodyModel');
  const ui = useTranslations('UI.labels');
  const [selectedType, setSelectedType] = useState<CustodyType | null>(null);

  const custodyModels: CustodyModel[] = [
    {
      id: 'self',
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 3 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 3 },
        { name: ui('security'), icon: faLock, rating: 5 },
      ]
    },
    {
      id: 'thirdParty',
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 3 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 5 },
        { name: ui('security'), icon: faLock, rating: 2 },
      ]
    },
    {
      id: 'combined',
      ratings: [
        { name: ui('reliability'), icon: faShieldHalved, rating: 4 },
        { name: ui('comfort'), icon: faThumbsUp, rating: 4 },
        { name: ui('security'), icon: faLock, rating: 4 },
      ]
    }
  ];

  const handleSelect = (type: CustodyType) => {
    setSelectedType(type);
    if (onSelect) onSelect(type);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-8">
        {/* Circle diagram */}
        <div className="relative w-full max-w-2xl h-52 md:h-64">
          {/* Two overlapping circles container */}
          <div className="relative w-full h-full">
            {/* Left circle - 3rd Party */}
            <div
              className={`absolute top-0 left-0 w-2/3 h-full rounded-full cursor-pointer transition-all duration-300 z-10
                ${selectedType === 'thirdParty'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'}`}
              onClick={() => handleSelect('thirdParty')}
              aria-label={t('thirdParty.name')}
            >
              <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl font-semibold px-3 text-center max-w-[160px]">
                {t('thirdParty.name')}
              </div>
            </div>

            {/* Right circle - Yourself */}
            <div
              className={`absolute top-0 right-0 w-2/3 h-full rounded-full cursor-pointer transition-all duration-300 z-10
                ${selectedType === 'self'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'}`}
              onClick={() => handleSelect('self')}
              aria-label={t('self.name')}
            >
              <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl font-semibold px-3 text-center max-w-[160px]">
                {t('self.name')}
              </div>
            </div>

            {/* Intersection area (SVG clip path approach) */}
            <div
              className={`absolute top-0 left-1/3 w-1/3 h-full cursor-pointer transition-all duration-300 z-20
                ${selectedType === 'combined'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-900'}`}
              onClick={() => handleSelect('combined')}
              aria-label={t('combined.name')}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl md:text-2xl font-semibold px-3">
                {t('combined.name')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description of selected type */}
      {selectedType && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 w-full hover:border-blue-300 transition-colors shadow-sm">
          <h4 className="text-xl font-semibold text-blue-800 mb-3">
            {t(`${selectedType}.name`)}
          </h4>
          <div className="text-gray-700 prose-blue mb-6">
            <ReactMarkdown>
              {t.raw(`${selectedType}.description`) || ''}
            </ReactMarkdown>
          </div>

          {/* Reliability, Comfort and Security Ratings */}
          <hr className="border-t border-gray-200 my-4" />
          <div className="my-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center text-center">
              {custodyModels.find(model => model.id === selectedType)?.ratings.map((rating, index) => (
                <RatingIndicator
                  key={index}
                  name={rating.name}
                  icon={rating.icon}
                  themeColor="text-yellow-500"
                  totalAmount={5}
                  rating={rating.rating}
                />
              ))}
            </div>
          </div>
          <hr className="border-t border-gray-200 my-4" />

          {/* Advantages and Disadvantages */}
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            {/* Advantages */}
            <div className="w-full md:w-1/2">
              <AdvantagesList content={t.raw(`${selectedType}.advantages`) || ''} />
            </div>

            {/* Disadvantages */}
            <div className="w-full md:w-1/2">
              <DisadvantagesList content={t.raw(`${selectedType}.disadvantages`) || ''} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
