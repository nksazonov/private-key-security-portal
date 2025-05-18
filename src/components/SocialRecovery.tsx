'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faTimes,
  faPlus,
  faSync,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { generatePrivateKey, privateKeyToAddress } from 'viem/accounts';
import LabeledCopyableInput from './LabeledCopyableInput';

// Generate a random Ethereum address
function generateRandomAddress() {
  const fullAddress = privateKeyToAddress(generatePrivateKey());
  return fullAddress;
}

// Format address for display (shortened form)
function formatAddressForDisplay(address: string) {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

interface ParticipantBase {
  id: number;
  address: string;
  isSelected: boolean;
}

interface Owner extends ParticipantBase {}

interface Guardian extends ParticipantBase {
  markedForRemoval?: boolean;
}

type FooterState =
  | 'hidden'
  | 'changeOwner'
  | 'addGuardian'
  | 'removeGuardian'
  | 'signTransaction'
  | 'lost';

export default function SocialRecovery() {
  const t = useTranslations('SecurityFeaturesPage.authorizationScheme.socialRecoveryDemo');
  const ui = useTranslations('UI.labels');

  // State for owners and guardians
  const [owner, setOwner] = useState<Owner | null>(null);
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [footerState, setFooterState] = useState<FooterState>('hidden');
  const [nextId, setNextId] = useState(1);
  const [newAddress, setNewAddress] = useState('');
  const [guardianToRemove, setGuardianToRemove] = useState<number | null>(null);

  // Initialize with 1 owner and 3 guardians
  useEffect(() => {
    // Only initialize on first load, not when we reach the easter egg state
    if (!owner && guardians.length === 0 && footerState !== 'lost') {
      setOwner({
        id: 1,
        address: generateRandomAddress(),
        isSelected: false
      });

      const initialGuardians = [
        { id: 2, address: generateRandomAddress(), isSelected: false },
        { id: 3, address: generateRandomAddress(), isSelected: false },
        { id: 4, address: generateRandomAddress(), isSelected: false }
      ];
      setGuardians(initialGuardians);
      setNextId(5);
    }
  }, [owner, guardians.length, footerState]);

  // Reset application state
  const resetState = () => {
    setOwner({
      id: 1,
      address: generateRandomAddress(),
      isSelected: false
    });

    const initialGuardians = [
      { id: 2, address: generateRandomAddress(), isSelected: false },
      { id: 3, address: generateRandomAddress(), isSelected: false },
      { id: 4, address: generateRandomAddress(), isSelected: false }
    ];
    setGuardians(initialGuardians);
    setNextId(5);
    setFooterState('hidden');
    setNewAddress('');
    setGuardianToRemove(null);
  };

  // Check if all guardians are selected
  const allGuardiansSelected = guardians.length > 0 &&
    guardians.every(guardian => guardian.isSelected);

  // Check if owner is selected
  const isOwnerSelected = owner?.isSelected;

  // Check if everyone (owner + all guardians) is selected
  const isEveryoneSelected = isOwnerSelected && allGuardiansSelected;

  // Add new guardian
  const addGuardian = () => {
    // Generate a new address for the new guardian
    const newGuardianAddress = generateRandomAddress();
    setNewAddress(newGuardianAddress);
    setFooterState('addGuardian');

    // Reset selections
    if (owner) {
      setOwner({ ...owner, isSelected: false });
    }
    setGuardians(guardians.map(guardian => ({ ...guardian, isSelected: false })));
  };

  // Confirm add guardian
  const confirmAddGuardian = () => {
    // When there are no guardians, only check if owner is selected
    const canAddGuardian = guardians.length === 0
      ? isOwnerSelected
      : isEveryoneSelected;

    if (canAddGuardian && newAddress) {
      const newGuardian = {
        id: nextId,
        address: newAddress,
        isSelected: false
      };
      // Add new guardian
      const updatedGuardians = [...guardians, newGuardian];
      setGuardians(updatedGuardians);
      setNextId(nextId + 1);
      setFooterState('hidden');
      setNewAddress('');
      // Reset selections
      if (owner) {
        setOwner({ ...owner, isSelected: false });
      }
      // Must reset selections on the updated guardians list, not the old one
      setGuardians(updatedGuardians.map(guardian => ({ ...guardian, isSelected: false })));
    }
  };

  // Remove a guardian
  const startRemoveGuardian = (id: number) => {
    setGuardianToRemove(id);
    setFooterState('removeGuardian');

    // Reset selections
    if (owner) {
      setOwner({ ...owner, isSelected: false });
    }

    // Mark the guardian for removal and reset other selections
    setGuardians(guardians.map(guardian =>
      guardian.id === id
        ? { ...guardian, isSelected: true, markedForRemoval: true }
        : { ...guardian, isSelected: false }
    ));
  };

  // Confirm remove guardian
  const confirmRemoveGuardian = () => {
    // Check if everyone except the to-be-removed guardian is selected
    const allOtherGuardiansSelected = guardians.every(guardian =>
      guardian.id === guardianToRemove || guardian.isSelected
    );

    if (isOwnerSelected && allOtherGuardiansSelected && guardianToRemove !== null) {
      // Remove the guardian
      const updatedGuardians = guardians.filter(guardian => guardian.id !== guardianToRemove);
      setGuardians(updatedGuardians);
      setFooterState('hidden');
      setGuardianToRemove(null);
      // Reset selections
      if (owner) {
        setOwner({ ...owner, isSelected: false });
      }
      // Must reset on the updated list
      setGuardians(updatedGuardians.map(guardian => ({
        ...guardian,
        isSelected: false,
        markedForRemoval: false
      })));
    }
  };

  // Change owner
  const startChangeOwner = () => {
    // Generate a new address for the new owner
    const newOwnerAddress = generateRandomAddress();
    setNewAddress(newOwnerAddress);
    setFooterState('changeOwner');

    // Reset selections
    if (owner) {
      setOwner({ ...owner, isSelected: false });
    }
    setGuardians(guardians.map(guardian => ({ ...guardian, isSelected: false })));
  };

  // Confirm change owner
  const confirmChangeOwner = () => {
    // Only check if guardians are selected (owner approval not needed for change owner)
    if (allGuardiansSelected && newAddress) {
      setOwner({
        id: nextId,
        address: newAddress,
        isSelected: false
      });
      setNextId(nextId + 1);
      setFooterState('hidden');
      setNewAddress('');
      // Reset guardian selections
      setGuardians(guardians.map(guardian => ({ ...guardian, isSelected: false })));
    }
  };

  // Cancel request (for any operation)
  const cancelOperation = () => {
    setFooterState('hidden');
    setNewAddress('');
    setGuardianToRemove(null);
    // Reset selections
    if (owner) {
      setOwner({ ...owner, isSelected: false });
    }
    setGuardians(guardians.map(guardian => ({
      ...guardian,
      isSelected: false,
      markedForRemoval: false
    })));
  };

  // Toggle selection of a guardian
  const toggleGuardianSelection = (id: number) => {
    if (footerState === 'changeOwner' || footerState === 'addGuardian' || footerState === 'removeGuardian') {
      // Don't toggle if guardian is marked for removal
      const guardian = guardians.find(g => g.id === id);
      if (guardian && guardian.markedForRemoval) return;

      setGuardians(guardians.map(guardian =>
        guardian.id === id ? { ...guardian, isSelected: !guardian.isSelected } : guardian
      ));
    }
  };

  // Toggle selection of the owner
  const toggleOwnerSelection = () => {
    if (footerState === 'addGuardian' || footerState === 'removeGuardian' || footerState === 'signTransaction') {
      // Allow selection in add/remove guardian states and for signing transactions
      if (owner) {
        setOwner({ ...owner, isSelected: !owner.isSelected });
      }
    }
    // Never allow owner selection in change owner mode
  };

  // Remove owner (easter egg)
  const removeOwner = () => {
    setOwner(null);
    if (guardians.length === 0) {
      setFooterState('lost');
    }
  };

  // Start sign transaction process
  const startSignTransaction = () => {
    setFooterState('signTransaction');

    // Reset selections
    if (owner) {
      setOwner({ ...owner, isSelected: false });
    }
    setGuardians(guardians.map(guardian => ({ ...guardian, isSelected: false })));
  };

  // Confirm sign transaction
  const confirmSignTransaction = () => {
    if (isOwnerSelected) {
      // Just hide the footer - in a real app, this would submit the transaction
      setFooterState('hidden');

      // Reset selections
      if (owner) {
        setOwner({ ...owner, isSelected: false });
      }
    }
  };

  // Button state for the footer
  const isButtonActive = () => {
    switch (footerState) {
      case 'changeOwner':
        // For change owner, only check if all guardians are selected
        return allGuardiansSelected;
      case 'addGuardian':
        // When there are no guardians, only check if owner is selected
        return guardians.length === 0 ? isOwnerSelected : isEveryoneSelected;
      case 'removeGuardian':
        // Everyone except the to-be-removed guardian must agree
        const allOtherGuardiansSelected = guardians.every(guardian =>
          guardian.id === guardianToRemove || guardian.isSelected
        );
        return isOwnerSelected && allOtherGuardiansSelected;
      case 'signTransaction':
        // Only the owner must sign transactions
        return isOwnerSelected;
      default:
        return false;
    }
  };

  // Button text for the footer
  const getButtonText = () => {
    switch (footerState) {
      case 'changeOwner':
        return allGuardiansSelected ? t('changeOwner') : t('guardiansMustAgree');
      case 'addGuardian':
        if (guardians.length === 0) {
          return isOwnerSelected ? t('addNewGuardian') : t('ownerMustSign');
        } else {
          return isEveryoneSelected ? t('addNewGuardian') : t('everyoneMustAgree');
        }
      case 'removeGuardian':
        const allOtherGuardiansSelected = guardians.every(guardian =>
          guardian.id === guardianToRemove || guardian.isSelected
        );
        return (isOwnerSelected && allOtherGuardiansSelected) ? t('removeGuardian') : t('everyoneMustAgree');
      case 'signTransaction':
        return isOwnerSelected ? t('signTransaction') : t('ownerMustSign');
      default:
        return '';
    }
  };

  // Get button action
  const getButtonAction = () => {
    switch (footerState) {
      case 'changeOwner':
        return confirmChangeOwner;
      case 'addGuardian':
        return confirmAddGuardian;
      case 'removeGuardian':
        return confirmRemoveGuardian;
      case 'signTransaction':
        return confirmSignTransaction;
      default:
        return () => {};
    }
  };

  // Get help text for the current state
  const getHelpText = () => {
    switch (footerState) {
      case 'changeOwner':
        return guardians.length === 0 ? t('changeOwnerNoGuardiansHelp') : t('changeOwnerHelp');
      case 'addGuardian':
        return t('addGuardianHelp');
      case 'removeGuardian':
        return t('removeGuardianHelp');
      case 'signTransaction':
        return t('signTransactionHelp');
      default:
        return '';
    }
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white overflow-hidden mt-6 mb-10">
      <div className="bg-blue-50 px-4 py-3 border-b">
        <h4 className="font-semibold text-blue-800">{t('title')}</h4>
        <p className="text-sm text-gray-600">{t('description')}</p>
      </div>

      <div className="p-4">
        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Owner */}
          <div>
            <h5 className="text-base font-semibold text-gray-700 mb-3">{t('owner')}</h5>

            {/* Owner table */}
            <div className="border rounded">
              <div className="bg-gray-50 px-3 py-2 border-b text-sm font-medium text-gray-700 flex items-center">
                {(footerState === 'addGuardian' || footerState === 'removeGuardian' || footerState === 'changeOwner') && (
                  <div className="mr-2 w-6"></div>
                )}
                <div className="flex-1 text-center">{ui('account')}</div>
                <div className="w-8"></div>
              </div>

              {owner && (
                <div
                  className={`px-3 py-2 border-b flex items-center hover:bg-gray-50 transition-colors
                    ${(footerState === 'changeOwner' || (footerState === 'signTransaction' && guardians.length > 0)) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={(e) => {
                    if (
                      !(e.target instanceof HTMLInputElement) &&
                      !(e.target as HTMLElement).closest('button') &&
                      footerState !== 'changeOwner'
                    ) {
                      toggleOwnerSelection();
                    }
                  }}
                >
                  {(footerState === 'addGuardian' || footerState === 'removeGuardian' || footerState === 'signTransaction') && (
                    <div className="mr-2 w-6 flex justify-center">
                      <input
                        type="checkbox"
                        checked={owner.isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleOwnerSelection();
                        }}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {/* Empty space for alignment when in changeOwner state */}
                  {footerState === 'changeOwner' && (
                    <div className="mr-2 w-6"></div>
                  )}
                  <div className="flex-1 font-mono text-gray-600 text-center">{formatAddressForDisplay(owner.address)}</div>
                  <div className="w-8 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (footerState === 'hidden') {
                          removeOwner();
                        }
                      }}
                      className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        footerState === 'hidden'
                          ? 'text-gray-400 hover:text-red-500 hover:bg-gray-200 cursor-pointer'
                          : 'text-gray-300 cursor-not-allowed'
                      }`}
                      disabled={footerState !== 'hidden'}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </div>
              )}

              {/* Change owner button as a row */}
              <div
                className={`px-3 py-2 border-b transition-colors ${
                  footerState === 'hidden'
                    ? 'hover:bg-gray-50 cursor-pointer'
                    : 'cursor-not-allowed'
                }`}
                onClick={footerState === 'hidden' ? startChangeOwner : undefined}
              >
                <button
                  onClick={footerState === 'hidden' ? startChangeOwner : undefined}
                  className={`w-full py-1 flex items-center justify-center text-gray-500 transition-colors ${
                    footerState !== 'hidden' ? 'opacity-60' : ''
                  }`}
                  disabled={footerState !== 'hidden'}
                >
                  <FontAwesomeIcon icon={faSync} className="mr-2" />
                  <span>{t('changeOwner')}</span>
                </button>
              </div>

              {/* Sign transaction button as a row */}
              <div
                className={`px-3 py-2 transition-colors ${
                  footerState === 'hidden'
                    ? 'hover:bg-gray-50 cursor-pointer'
                    : 'cursor-not-allowed'
                }`}
                onClick={footerState === 'hidden' ? startSignTransaction : undefined}
              >
                <button
                  onClick={footerState === 'hidden' ? startSignTransaction : undefined}
                  className={`w-full py-1 flex items-center justify-center text-gray-500 transition-colors ${
                    footerState !== 'hidden' ? 'opacity-60' : ''
                  }`}
                  disabled={footerState !== 'hidden'}
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  <span>{t('signTransaction')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Guardians */}
          <div>
            <h5 className="text-base font-semibold text-gray-700 mb-3">{t('guardians')}</h5>

            {/* Guardians table */}
            <div className="border rounded">
              <div className="bg-gray-50 px-3 py-2 border-b text-sm font-medium text-gray-700 flex items-center">
                {(footerState === 'changeOwner' || footerState === 'addGuardian' || footerState === 'removeGuardian') && (
                  <div className="mr-2 w-6"></div>
                )}
                <div className="w-8 flex justify-center">#</div>
                <div className="flex-1 text-center">{ui('account')}</div>
                <div className="w-8"></div>
              </div>

              {/* Guardian rows */}
              {guardians.map((guardian, index) => (
                <div
                  key={guardian.id}
                  className={`px-3 py-2 border-b flex items-center hover:bg-gray-50 transition-colors
                    ${guardian.markedForRemoval ? 'bg-red-50 hover:bg-red-100' : ''}
                    ${footerState === 'hidden' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={(e) => {
                    if (
                      !(e.target instanceof HTMLInputElement) &&
                      !(e.target as HTMLElement).closest('button') &&
                      footerState !== 'hidden'
                    ) {
                      toggleGuardianSelection(guardian.id);
                    }
                  }}
                >
                  {(footerState === 'changeOwner' || footerState === 'addGuardian' || footerState === 'removeGuardian') && (
                    <div className="mr-2 w-6 flex justify-center">
                      <input
                        type="checkbox"
                        checked={guardian.isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleGuardianSelection(guardian.id);
                        }}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {/* Empty space for alignment when in signTransaction state */}
                  {footerState === 'signTransaction' && (
                    <div className="mr-2 w-6"></div>
                  )}
                  <div className="w-8 flex justify-center text-gray-500 font-medium">{index + 1}</div>
                  <div className="flex-1 font-mono text-gray-600 text-center">{formatAddressForDisplay(guardian.address)}</div>
                  <div className="w-8 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (footerState === 'hidden') {
                          startRemoveGuardian(guardian.id);
                        }
                      }}
                      className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        footerState === 'hidden'
                          ? 'text-gray-400 hover:text-red-500 hover:bg-gray-200 cursor-pointer'
                          : 'text-gray-300 cursor-not-allowed'
                      }`}
                      disabled={footerState !== 'hidden'}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add guardian button */}
              <div
                className={`px-3 py-2 transition-colors ${
                  footerState === 'hidden'
                    ? 'hover:bg-gray-50 cursor-pointer'
                    : 'cursor-not-allowed'
                }`}
                onClick={footerState === 'hidden' ? addGuardian : undefined}
              >
                <button
                  onClick={footerState === 'hidden' ? addGuardian : undefined}
                  className={`w-full py-1 flex items-center justify-center text-gray-500 transition-colors ${
                    footerState !== 'hidden' ? 'opacity-60' : ''
                  }`}
                  disabled={footerState !== 'hidden'}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  <span>{t('addGuardian')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer area - conditionally shown */}
      {footerState !== 'hidden' && (
        <div className="bg-gray-50 px-4 py-4 border-t">
          {footerState === 'lost' ? (
            <div className="text-center">
              <p className="text-red-600 font-medium mb-4">{t('lostMessage')}</p>
              <button
                onClick={resetState}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {t('reload')}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row items-center justify-between mb-3">
                <div className="flex items-center mb-4 md:mb-0 space-x-3">
                  {/* Main action button */}
                  {isButtonActive() ? (
                    <button
                      onClick={getButtonAction()}
                      className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faCheck} className="mr-2" />
                      {getButtonText()}
                    </button>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                      <span className="font-medium">{getButtonText()}</span>
                    </div>
                  )}

                  {/* Cancel button for all operations */}
                  <button
                    onClick={cancelOperation}
                    disabled={footerState === 'changeOwner' && !owner}
                    className={`flex items-center text-white px-4 py-2 rounded transition-colors ${
                      footerState === 'changeOwner' && !owner
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gray-400 hover:bg-gray-500'
                    }`}
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    {t('cancelRequest')}
                  </button>
                </div>

                {/* New Address Display */}
                {(footerState === 'changeOwner' || footerState === 'addGuardian') && newAddress && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      {footerState === 'changeOwner' ? t('newOwner') : t('newGuardian')}
                    </span>
                    <div className="font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded border max-w-[180px]">
                      {formatAddressForDisplay(newAddress)}
                    </div>
                  </div>
                )}
              </div>

              {/* Help text */}
              <div className="text-xs text-gray-500">
                {getHelpText()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
