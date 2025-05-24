'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import LinksList from './LinksList';

interface Implementation {
  title: string;
  url: string;
}

interface UsefulLink {
  title: string;
  url: string;
}

interface WalletType {
  title: string;
  description: string;
  implementations: Implementation[];
  useful_links: UsefulLink[];
}

interface CriteriaData {
  title: string;
  description: string;
  types: Record<string, WalletType>;
}

interface ModalData {
  criteriaTitle: string;
  typeTitle: string;
  description: string;
  implementations: Implementation[];
  useful_links: UsefulLink[];
}

export default function WalletMatrix() {
  const t = useTranslations('WalletMatrixPage');
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const criteria = t.raw('criteria') as Record<string, CriteriaData>;
  const criteriaKeys = Object.keys(criteria);

  const handleCellClick = (criteriaKey: string, typeKey: string) => {
    const criteriaData = criteria[criteriaKey];
    const typeData = criteriaData.types[typeKey];
    
    setModalData({
      criteriaTitle: criteriaData.title,
      typeTitle: typeData.title,
      description: typeData.description,
      implementations: typeData.implementations || [],
      useful_links: typeData.useful_links || []
    });
  };

  const closeModal = () => {
    setModalData(null);
  };


  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            {criteriaKeys.map(criteriaKey => {
              const criteriaData = criteria[criteriaKey];
              const typeKeys = Object.keys(criteriaData.types);
              return (
                <tr key={criteriaKey}>
                  <td className="border border-gray-300 p-4 bg-gray-50 min-w-48">
                    <div className="font-bold text-blue-900">{criteriaData.title}</div>
                    <div className="text-sm text-gray-600 mt-1 prose prose-sm max-w-none">
                      <ReactMarkdown>{criteriaData.description}</ReactMarkdown>
                    </div>
                  </td>
                  {typeKeys.map(typeKey => {
                    const typeData = criteriaData.types[typeKey];
                    return (
                      <td
                        key={`${criteriaKey}-${typeKey}`}
                        className="border border-gray-300 p-4 text-center cursor-pointer hover:bg-gray-100 transition-colors min-w-32"
                        onClick={() => handleCellClick(criteriaKey, typeKey)}
                      >
                        <div className="font-medium text-blue-800">
                          {typeData.title}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalData && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                {modalData.criteriaTitle}: {modalData.typeTitle}
              </h2>
              
              <div className="text-gray-700 mb-6 prose prose-lg max-w-none">
                <ReactMarkdown>{modalData.description}</ReactMarkdown>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LinksList 
                  links={modalData.implementations} 
                  heading={modalData.implementations.length > 0 ? t('modal.popularImplementations') : undefined}
                />
                
                <LinksList 
                  links={modalData.useful_links} 
                  heading={modalData.useful_links.length > 0 ? t('modal.usefulLinks') : undefined}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}