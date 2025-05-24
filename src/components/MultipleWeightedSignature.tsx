'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { generatePrivateKey, privateKeyToAddress } from 'viem/accounts';

function generateRandomAddress() {
  const fullAddress = privateKeyToAddress(generatePrivateKey());
  return `${fullAddress.substring(0, 6)}...${fullAddress.substring(fullAddress.length - 4)}`;
}

interface Account {
  id: number;
  address: string;
  isSigning: boolean;
  weight: number;
}

export default function MultipleWeightedSignature() {
  const t = useTranslations('SecurityFeaturesPage.authorizationScheme.multiWeightedSig');
  const ui = useTranslations('UI.labels');

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [threshold, setThreshold] = useState(3);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    if (accounts.length === 0) {
      const initialAccounts = [
        { id: 1, address: generateRandomAddress(), isSigning: false, weight: 1 },
        { id: 2, address: generateRandomAddress(), isSigning: false, weight: 1 },
        { id: 3, address: generateRandomAddress(), isSigning: false, weight: 1 }
      ];
      setAccounts(initialAccounts);
      setNextId(4);
    }
  }, [accounts.length]);

  const totalPossibleWeight = accounts.reduce((sum, account) => sum + account.weight, 0);
  const currentWeight = accounts.reduce((sum, account) => sum + (account.isSigning ? account.weight : 0), 0);
  const isThresholdMet = currentWeight >= threshold;

  const addAccount = () => {
    const newAccount = {
      id: nextId,
      address: generateRandomAddress(),
      isSigning: false,
      weight: 1
    };
    setAccounts([...accounts, newAccount]);
    setNextId(nextId + 1);
  };

  const removeAccount = (id: number) => {
    if (accounts.length <= 1) return;
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const toggleSigning = (id: number) => {
    setAccounts(accounts.map(account =>
      account.id === id ? { ...account, isSigning: !account.isSigning } : account
    ));
  };

  const updateWeight = (id: number, weight: number) => {
    setAccounts(accounts.map(account =>
      account.id === id ? { ...account, weight } : account
    ));
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white overflow-hidden mt-6 mb-10">
      <div className="bg-blue-50 px-4 py-3 border-b">
        <h4 className="font-semibold text-blue-800">{t('title')}</h4>
        <p className="text-sm text-gray-600">{t('description')}</p>
      </div>

      <div className="p-4 pb-0">
        <div className="mb-2 text-sm font-medium text-gray-700 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-1">{ui('sign')}</div>
          <div className="col-span-1">#</div>
          <div className="col-span-4">{ui('account')}</div>
          <div className="col-span-5">{ui('weight')}</div>
          <div className="col-span-1"></div>
        </div>

        {accounts.map(account => (
          <div
            key={account.id}
            className="py-2 border-t grid grid-cols-12 gap-4 items-center hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={(e) => {
              if (
                e.target instanceof HTMLInputElement ||
                (e.target as HTMLElement).closest('button')
              ) return;
              toggleSigning(account.id);
            }}
          >
            <div className="col-span-1 flex justify-center">
              <input
                type="checkbox"
                checked={account.isSigning}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSigning(account.id);
                }}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="col-span-1 font-medium text-gray-700">{account.id}</div>
            <div className="col-span-4 font-mono text-gray-600">{account.address}</div>
            <div className="col-span-5 flex items-center">
              <input
                type="range"
                min="0"
                max="10"
                value={account.weight}
                onChange={(e) => {
                  e.stopPropagation();
                  updateWeight(account.id, parseInt(e.target.value));
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-2 w-6 text-center text-gray-700">{account.weight}</span>
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeAccount(account.id);
                }}
                disabled={accounts.length <= 1}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 disabled:opacity-50 rounded-full hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        ))}

        <div className="border-t">
          <button
            onClick={addAccount}
            className="w-full py-2 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            <span>{t('addAccount')}</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-4 border-t">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="flex items-center mb-3 md:mb-0 mr-4 w-[35%]">
            {isThresholdMet
              ? <FontAwesomeIcon icon={faCheckCircle} className="text-xl text-green-500 mr-2" />
              : <FontAwesomeIcon icon={faTimesCircle} className="text-xl text-red-500 mr-2" />
            }
            <span className={isThresholdMet ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {isThresholdMet
                ? t('enoughWeight')
                : t('notEnoughWeight')
              }
            </span>
          </div>

          <div className="w-[54%] flex flex-col">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">
                {currentWeight}/{threshold}
              </span>

              <div className="relative flex-1 h-6 mx-[8px]">
                <div
                  className="absolute left-0 top-2 h-2 w-full rounded-lg bg-gray-200 z-0"
                ></div>

                <div
                  className="absolute left-0 top-2 h-2 rounded-l-lg bg-blue-500"
                  style={{
                    width: `${(currentWeight / Math.max(totalPossibleWeight, 1)) * 100}%`,
                    zIndex: 5
                  }}
                ></div>

                <div
                  className="absolute top-0 w-0.5 h-6 bg-red-500"
                  style={{
                    left: `${(threshold / Math.max(totalPossibleWeight, 1)) * 100}%`,
                    zIndex: 15
                  }}
                ></div>

                <input
                  type="range"
                  min="1"
                  max={Math.max(totalPossibleWeight, 1)}
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  className="absolute top-0 w-full h-6 opacity-0 cursor-pointer z-20"
                />
              </div>
            </div>

          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-xs text-gray-500">
            {t('weightNote')}
          </div>
          <span className="text-xs text-gray-600 whitespace-nowrap">
            {t('threshold')}: {threshold}/{totalPossibleWeight}
          </span>
        </div>
      </div>
    </div>
  );
}
