'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import LinksList from './LinksList';
import AnchorHeading from './AnchorHeading';

type KeyHolderType = 'hardware' | 'software' | 'paper' | 'brain';
type NetworkConnectivityType = 'hot' | 'cold' | 'deepCold';
type CustodyModelType = 'custodial' | 'selfCustody' | 'sharedCustody';
type AccountType = 'eoa' | 'smartContract' | 'erc4337';
type AuthorizationSchemeType = 'singleSig' | 'multiSig' | 'mpcTss' | 'socialRecovery';

type CriteriaKey = 'keyHolder' | 'networkConnectivity' | 'custodyModel' | 'accountType' | 'authorizationScheme';

type CriteriaTypeMap = {
  keyHolder: KeyHolderType;
  networkConnectivity: NetworkConnectivityType;
  custodyModel: CustodyModelType;
  accountType: AccountType;
  authorizationScheme: AuthorizationSchemeType;
};

type CompatibilityData = {
  [K in CriteriaKey]?: CriteriaTypeMap[K][];
};

type CompatibilityMatrix = {
  [K in CriteriaKey]: {
    [V in CriteriaTypeMap[K]]: Partial<CompatibilityData>;
  };
};

type ScenarioConfig = {
  [K in CriteriaKey]: CriteriaTypeMap[K];
};

const SCENARIO_CONFIGS: Record<string, ScenarioConfig> = {
  daily: {
    keyHolder: "software",
    networkConnectivity: "hot",
    custodyModel: "selfCustody",
    accountType: "erc4337",
    authorizationScheme: "singleSig"
  },
  regular: {
    keyHolder: "hardware",
    networkConnectivity: "cold",
    custodyModel: "selfCustody",
    accountType: "erc4337",
    authorizationScheme: "multiSig"
  },
  rare: {
    keyHolder: "hardware",
    networkConnectivity: "deepCold",
    custodyModel: "selfCustody",
    accountType: "erc4337",
    authorizationScheme: "mpcTss"
  }
};

const COMPATIBILITY_MATRIX: CompatibilityMatrix = {
  keyHolder: {
    hardware: {
      networkConnectivity: ['cold', 'deepCold'],
      custodyModel: ['selfCustody'],
      accountType: ['eoa', 'smartContract', 'erc4337'],
      authorizationScheme: ['singleSig', 'multiSig', 'mpcTss', 'socialRecovery']
    },
    software: {
      networkConnectivity: ['hot', 'cold'],
      custodyModel: ['custodial', 'selfCustody', 'sharedCustody'],
      accountType: ['eoa', 'smartContract', 'erc4337'],
      authorizationScheme: ['singleSig', 'multiSig', 'mpcTss', 'socialRecovery']
    },
    paper: {
      networkConnectivity: ['deepCold'],
      custodyModel: ['selfCustody'],
      accountType: ['eoa', 'smartContract', 'erc4337'],
      authorizationScheme: ['singleSig']
    },
    brain: {
      networkConnectivity: ['cold', 'deepCold'],
      custodyModel: ['selfCustody'],
      accountType: ['eoa', 'smartContract', 'erc4337'],
      authorizationScheme: ['singleSig']
    }
  },
  networkConnectivity: {
    hot: {
      keyHolder: ['software'],
      custodyModel: ['custodial', 'selfCustody', 'sharedCustody'],
      accountType: ['eoa', 'smartContract', 'erc4337'],
      authorizationScheme: ['singleSig', 'multiSig', 'mpcTss', 'socialRecovery']
    },
    cold: {
      keyHolder: ['hardware', 'software'],
      custodyModel: ['selfCustody', 'sharedCustody'],
      accountType: ['eoa', 'smartContract', 'erc4337'],
      authorizationScheme: ['singleSig', 'multiSig', 'mpcTss', 'socialRecovery']
    },
    deepCold: {
      keyHolder: ['hardware', 'paper', 'brain'],
      custodyModel: ['selfCustody'],
      accountType: ['eoa', 'smartContract', 'erc4337'],
      authorizationScheme: ['singleSig', 'multiSig', 'mpcTss', 'socialRecovery']
    }
  },
  custodyModel: {
    custodial: {
      keyHolder: ['software'],
      networkConnectivity: ['hot'],
      accountType: ['eoa', 'smartContract'],
      authorizationScheme: ['singleSig', 'multiSig', 'socialRecovery']
    },
    selfCustody: {
      keyHolder: ['hardware', 'software', 'paper', 'brain'],
      networkConnectivity: ['hot', 'cold', 'deepCold'],
      accountType: ['eoa', 'smartContract', 'erc4337'],
      authorizationScheme: ['singleSig', 'multiSig', 'mpcTss', 'socialRecovery']
    },
    sharedCustody: {
      keyHolder: ['software'],
      networkConnectivity: ['hot', 'cold'],
      accountType: ['smartContract', 'erc4337'],
      authorizationScheme: ['multiSig', 'mpcTss', 'socialRecovery']
    }
  },
  accountType: {
    eoa: {
      keyHolder: ['hardware', 'software', 'paper', 'brain'],
      networkConnectivity: ['hot', 'cold', 'deepCold'],
      custodyModel: ['custodial', 'selfCustody'],
      authorizationScheme: ['singleSig']
    },
    smartContract: {
      keyHolder: ['hardware', 'software', 'paper', 'brain'],
      networkConnectivity: ['hot', 'cold'],
      custodyModel: ['selfCustody', 'sharedCustody'],
      authorizationScheme: ['singleSig', 'multiSig', 'mpcTss', 'socialRecovery']
    },
    erc4337: {
      keyHolder: ['software', 'hardware', 'paper', 'brain'],
      networkConnectivity: ['hot', 'cold', 'deepCold'],
      custodyModel: ['sharedCustody', 'selfCustody'],
      authorizationScheme: ['singleSig', 'multiSig', 'mpcTss', 'socialRecovery']
    }
  },
  authorizationScheme: {
    singleSig: {
      keyHolder: ['hardware', 'software', 'paper', 'brain'],
      networkConnectivity: ['hot', 'cold', 'deepCold'],
      custodyModel: ['custodial', 'selfCustody'],
      accountType: ['eoa', 'erc4337']
    },
    multiSig: {
      keyHolder: ['hardware', 'software'],
      networkConnectivity: ['hot', 'cold'],
      custodyModel: ['custodial', 'selfCustody', 'sharedCustody'],
      accountType: ['smartContract', 'erc4337']
    },
    mpcTss: {
      keyHolder: ['software', 'hardware'],
      networkConnectivity: ['hot', 'cold', 'deepCold'],
      custodyModel: ['selfCustody', 'sharedCustody'],
      accountType: ['smartContract', 'erc4337']
    },
    socialRecovery: {
      keyHolder: ['software', 'hardware'],
      networkConnectivity: ['hot', 'cold'],
      custodyModel: ['sharedCustody', 'selfCustody'],
      accountType: ['smartContract', 'erc4337']
    }
  }
};

type Mode = 'description' | 'compatibility';
type SelectionState = Record<string, string>; // criteriaKey -> typeKey

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
  const [mode, setMode] = useState<Mode>('description');
  const [selectedTypes, setSelectedTypes] = useState<SelectionState>({});
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const criteria = t.raw('criteria') as Record<string, CriteriaData>;
  const criteriaKeys = Object.keys(criteria);

  const handleCellClick = (criteriaKey: string, typeKey: string) => {
    if (mode === 'description') {
      const criteriaData = criteria[criteriaKey];
      const typeData = criteriaData.types[typeKey];

      setModalData({
        criteriaTitle: criteriaData.title,
        typeTitle: typeData.title,
        description: typeData.description,
        implementations: typeData.implementations || [],
        useful_links: typeData.useful_links || []
      });
    } else {
      const isCompatible = isTypeCompatible(criteriaKey, typeKey);
      if (!isCompatible) {
        return;
      }

      setSelectedTypes(prev => {
        const newSelection = { ...prev };
        if (newSelection[criteriaKey] === typeKey) {
          delete newSelection[criteriaKey];
        } else {
          newSelection[criteriaKey] = typeKey;
        }
        return newSelection;
      });
    }
  };

  const closeModal = () => {
    setModalData(null);
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'description' ? 'compatibility' : 'description';
    setMode(newMode);
    if (newMode === 'description') {
      setSelectedTypes({});
      setSelectedScenario(null);
    }
  };

  const handleScenarioSelect = (scenario: string) => {
    const scenarioConfig = SCENARIO_CONFIGS[scenario];
    if (scenarioConfig) {
      setSelectedTypes(scenarioConfig);
      setSelectedScenario(scenario);
      setMode('compatibility');

      setTimeout(() => {
        const matrixElement = document.querySelector('.overflow-x-auto');
        if (matrixElement) {
          const yOffset = -80;
          const y = matrixElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const getCompatibilityDataForType = (criteriaKey: string, typeKey: string): Partial<CompatibilityData> | undefined => {
    const matrix = COMPATIBILITY_MATRIX as any;
    return matrix[criteriaKey]?.[typeKey];
  };

  const getCompatibleTypes = (): Set<string> => {
    if (Object.keys(selectedTypes).length === 0) {
      return new Set();
    }

    let compatibleSets: Set<string>[] = [];

    Object.entries(selectedTypes).forEach(([criteriaKey, typeKey]) => {
      const compatibilityData = getCompatibilityDataForType(criteriaKey, typeKey);
      if (compatibilityData) {
        const compatibleForThisSelection = new Set<string>();

        compatibleForThisSelection.add(`${criteriaKey}.${typeKey}`);

        Object.entries(compatibilityData).forEach(([otherCriteriaKey, compatibleTypeKeys]) => {
          (compatibleTypeKeys as string[]).forEach((compatibleTypeKey: string) => {
            compatibleForThisSelection.add(`${otherCriteriaKey}.${compatibleTypeKey}`);
          });
        });

        compatibleSets.push(compatibleForThisSelection);
      }
    });

    if (compatibleSets.length === 0) return new Set();

    return compatibleSets.reduce((intersection, currentSet) => {
      return new Set([...intersection].filter(x => currentSet.has(x)));
    });
  };

  const isTypeCompatible = (criteriaKey: string, typeKey: string): boolean => {
    if (mode === 'description') return true;
    if (Object.keys(selectedTypes).length === 0) return true;

    const compatibleTypes = getCompatibleTypes();
    const typeIdentifier = `${criteriaKey}.${typeKey}`;
    return compatibleTypes.has(typeIdentifier);
  };

  const isTypeSelected = (criteriaKey: string, typeKey: string): boolean => {
    return selectedTypes[criteriaKey] === typeKey;
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
                    const isCompatible = isTypeCompatible(criteriaKey, typeKey);
                    const isSelected = isTypeSelected(criteriaKey, typeKey);
                    const canHover = mode === 'description' || isCompatible;
                    const cursorClass = mode === 'compatibility' && !isCompatible ? 'cursor-not-allowed' : 'cursor-pointer';
                    
                    const hoverClass = canHover 
                      ? (isSelected ? 'hover:bg-blue-200' : 'hover:bg-gray-100')
                      : '';

                    return (
                      <td
                        key={`${criteriaKey}-${typeKey}`}
                        className={`border border-gray-300 p-4 text-center transition-colors min-w-32 ${
                          cursorClass
                        } ${
                          hoverClass
                        } ${
                          isSelected ? 'bg-blue-100' : ''
                        }`}
                        onClick={() => handleCellClick(criteriaKey, typeKey)}
                      >
                        <div className={`font-medium transition-colors ${
                          isCompatible ? 'text-blue-800' : 'text-gray-400'
                        }`}>
                          {typeData.title}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            <tr>
              <td
                className="border border-gray-300 p-4 bg-gray-100 transition-colors"
                colSpan={100}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">{t('modes.mode')}</span>
                      <div className="relative inline-flex bg-gray-200 rounded-full p-1 w-48">
                        <div className={`absolute top-1 bottom-1 w-1/2 bg-blue-600 rounded-full transition-transform duration-200 ease-in-out ${
                          mode === 'compatibility' ? 'transform translate-x-[calc(100%-0.25rem)]' : ''
                        }`}></div>
                        <button
                          onClick={handleModeSwitch}
                          className={`relative z-10 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 w-1/2 ${
                            mode === 'description' ? 'text-white' : 'text-gray-600'
                          }`}
                        >
                          {t('modes.description')}
                        </button>
                        <button
                          onClick={handleModeSwitch}
                          className={`relative z-10 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 w-1/2 ${
                            mode === 'compatibility' ? 'text-white' : 'text-gray-600'
                          }`}
                        >
                          {t('modes.compatibility')}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">Сценарії:</span>
                      <div className="flex space-x-3">
                        {['daily', 'regular', 'rare'].map((scenario) => {
                          const scenarioData = t.raw('popularScenarios.scenarios')[scenario];
                          return (
                            <label key={scenario} className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="scenario"
                                value={scenario}
                                checked={selectedScenario === scenario}
                                onChange={() => handleScenarioSelect(scenario)}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                              />
                              <span className="ml-2 text-xs text-gray-700">
                                {scenarioData.title}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {mode === 'description' && (
                    <div className="text-xs text-gray-600 text-center">
                      {t('modes.descriptionHint')}
                    </div>
                  )}
                  {mode === 'compatibility' && (
                    <div className="text-xs text-gray-600 text-center">
                      {Object.keys(selectedTypes).length === 0
                        ? t('modes.noSelection')
                        : `${Object.keys(selectedTypes).length} ${t('modes.selectionActive')}`
                      }
                    </div>
                  )}
                </div>
              </td>
            </tr>
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

      <div className="mt-8">
        <AnchorHeading as="h2" id="popular-scenarios" className="text-2xl font-bold text-blue-900 mb-4">
          {t('popularScenarios.title')}
        </AnchorHeading>
        <div className="text-gray-700 mb-6">
          <ReactMarkdown>{t('popularScenarios.description')}</ReactMarkdown>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['daily', 'regular', 'rare'].map((scenario) => {
            const scenarioData = t.raw('popularScenarios.scenarios')[scenario];
            return (
              <div
                key={scenario}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md group"
                onClick={() => handleScenarioSelect(scenario)}
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  {scenarioData.title}
                  <span className="block text-sm font-normal text-gray-600">{scenarioData.subtitle}</span>
                </h3>
                <div className="text-gray-700 text-sm mb-4">
                  <ReactMarkdown>{scenarioData.description}</ReactMarkdown>
                </div>
                <button
                  className="w-full border-2 border-blue-600 text-blue-600 bg-white px-4 py-2 rounded-md transition-colors text-sm font-medium group-hover:bg-blue-600 group-hover:text-white"
                >
                  {t('popularScenarios.applyScenario')}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
