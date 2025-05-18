"use client"

import React, { useState } from 'react';
import { Locale, useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faUniversity,
  faLaptop,
  faKey,
  faArrowRight,
  faGlobe,
  faEquals
} from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import AdvantagesList from '@/components/AdvantagesList';
import DisadvantagesList from '@/components/DisadvantagesList';

type ConnectivityType = 'deepCold' | 'cold' | 'hot';

interface ConnectivityOption {
  id: ConnectivityType;
  icon: any;
  label: string;
}

export default function NetworkConnectivitySelector() {
  const t = useTranslations('KeyManagementPage.networkConnectivity');
  const [selectedType, setSelectedType] = useState<ConnectivityType | null>(null);

  const connectivityOptions: ConnectivityOption[] = [
    {
      id: 'deepCold',
      icon: faUniversity,
      label: t('safeDeposit')
    },
    {
      id: 'cold',
      icon: faFileAlt,
      label: t('paperHardware')
    },
    {
      id: 'hot',
      icon: faLaptop,
      label: t('yourPC')
    }
  ];

  // Non-selectable Internet option
  const internetOption = {
    icon: faGlobe,
    label: t('internet')
  };

  return (
    <div className="w-full">
      {/* Card options row */}
      <div className="flex flex-col md:flex-row items-start justify-center mb-10">
        {/* Selectable connectivity options */}
        {connectivityOptions.map((option, index) => (
          <React.Fragment key={option.id}>
            {/* Card + Label Container */}
            <div className="flex flex-col items-center w-40 md:w-48 mx-1">
              {/* Card */}
              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all w-full
                  ${selectedType === option.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'}`}
                onClick={() => setSelectedType(option.id)}
                style={{ height: '160px' }}
              >
                {/* Large Icon */}
                <FontAwesomeIcon
                  icon={option.icon}
                  size="4x"
                  className={`text-blue-${selectedType === option.id ? '600' : '500'} mb-4`}
                />

                {/* Checkbox */}
                <div
                  className={`w-8 h-8 border-2 rounded-lg flex items-center justify-center
                    ${selectedType === option.id ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                >
                  {selectedType === option.id && <FontAwesomeIcon icon={faKey} className="text-blue-500" />}
                </div>
              </div>

              {/* Label below card - using min-height to ensure consistent spacing */}
              <div
                className={`text-lg font-medium mt-3 text-center w-full ${selectedType === option.id ? 'text-blue-700 font-bold' : 'text-gray-700'}`}
                style={{ minHeight: '3rem' }}
              >
                {option.label}
              </div>
            </div>

            {/* Arrow/Symbol between cards in a container matching card height */}
            {(index < connectivityOptions.length - 1 || option.id === 'hot') && (
              <div className="hidden md:flex items-center justify-center mx-2" style={{ height: '160px' }}>
                <FontAwesomeIcon
                  icon={option.id === 'hot' ? faEquals : faArrowRight}
                  className={option.id === 'hot' ? "text-yellow-500" : "text-blue-400"}
                  size="lg"
                />
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Non-selectable Internet card (golden) */}
        <div className="flex flex-col items-center w-40 md:w-48 mx-1">
          {/* Card */}
          <div
            className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-yellow-500 bg-yellow-50 shadow-md w-full"
            style={{ height: '160px' }}
          >
            {/* Large Icon */}
            <FontAwesomeIcon
              icon={internetOption.icon}
              size="4x"
              className="text-yellow-600"
            />
          </div>

          {/* Label below card - using min-height to ensure consistent spacing */}
          <div
            className="text-lg font-medium mt-3 text-center w-full text-yellow-700"
            style={{ minHeight: '3rem' }}
          >
            {internetOption.label}
          </div>
        </div>
      </div>

      {/* Description of selected type */}
      {selectedType && (
        <div className="mt-4 p-6 bg-blue-50 rounded-lg border border-blue-200 w-full">
          <h4 className="text-xl font-semibold text-blue-800 mb-3">
            {t(`${selectedType}.name`)}
          </h4>
          <div className="text-gray-700 prose-blue mb-4">
            <ReactMarkdown>
              {t.raw(`${selectedType}.description`)}
            </ReactMarkdown>
          </div>

          {/* Advantages and Disadvantages */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* Advantages */}
            <div className="w-full md:w-1/2">
              <AdvantagesList content={t.raw(`${selectedType}.advantages`)} />
            </div>

            {/* Disadvantages */}
            <div className="w-full md:w-1/2">
              <DisadvantagesList content={t.raw(`${selectedType}.disadvantages`)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
