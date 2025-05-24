'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import LabeledCopyableInput from './LabeledCopyableInput';
import MnemonicInput from './MnemonicInput';
import { sha256 } from '@noble/hashes/sha2';
import { validateMnemonic, entropyToMnemonic } from '@/utils/bip39';

interface MnemonicValidatorProps {
  generateButtonText: string;
  copyHoverText: string;
  copiedText: string;
}

export default function MnemonicValidator({
  generateButtonText,
  copyHoverText,
  copiedText
}: MnemonicValidatorProps) {
  const t = useTranslations('UI');

  const [wordlist, setWordlist] = useState<string[]>([]);
  const [mnemonic, setMnemonic] = useState<string>('');
  const [decimalIndices, setDecimalIndices] = useState<number[]>([]);
  const [entropyWithChecksum, setEntropyWithChecksum] = useState<string>('');
  const [entropyHex, setEntropyHex] = useState<string>('');
  const [suppliedChecksumHex, setSuppliedChecksumHex] = useState<string>('');
  const [sha256Hash, setSha256Hash] = useState<string>('');
  const [calculatedChecksumHex, setCalculatedChecksumHex] = useState<string>('');
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [isMnemonicValid, setIsMnemonicValid] = useState<boolean>(true);
  const [mnemonicError, setMnemonicError] = useState<string>('');
  const [isChecksumValid, setIsChecksumValid] = useState<boolean>(true);

  useEffect(() => {
    async function fetchWordlist() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt');
        if (!response.ok) throw new Error('Failed to fetch wordlist');
        const text = await response.text();
        const words = text.trim().split('\n');
        setWordlist(words);
      } catch (error) {
        console.error('Error fetching wordlist:', error);
        setWordlist(['abandon', 'ability', 'able', 'about', 'above']);
      }
    }

    fetchWordlist();
  }, []);

  const generateRandomMnemonic = () => {
    if (wordlist.length === 0) return;

    try {
      const randomBytes = new Uint8Array(16);
      window.crypto.getRandomValues(randomBytes);

      const mnemonicPhrase = entropyToMnemonic(randomBytes, wordlist);

      setMnemonic(mnemonicPhrase);
      validateAndProcessMnemonic(mnemonicPhrase);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating random mnemonic:', error);
      setIsMnemonicValid(false);
      setMnemonicError('Failed to generate mnemonic');
    }
  };

  const validateAndProcessMnemonic = (mnemonicPhrase: string) => {
    if (!mnemonicPhrase) {
      resetState();
      return;
    }

    const words = mnemonicPhrase.trim().split(/\s+/);

    try {
      const indices = words.map(word => {
        const index = wordlist.indexOf(word);
        return index >= 0 ? index : 0;
      });
      setDecimalIndices(indices);

      const binaryGroups = indices.map(index => index.toString(2).padStart(11, '0'));
      const allBits = binaryGroups.join('');
      setEntropyWithChecksum(allBits);

      const checksumLengthBits = Math.floor(allBits.length / 33);
      const entropyLengthBits = allBits.length - checksumLengthBits;

      const entropyBits = allBits.slice(0, entropyLengthBits);
      const checksumBits = allBits.slice(entropyLengthBits);

      let entropyHexValue = '';
      for (let i = 0; i < entropyBits.length; i += 8) {
        const byte = entropyBits.slice(i, i + 8);
        entropyHexValue += parseInt(byte, 2).toString(16).padStart(2, '0');
      }
      setEntropyHex(entropyHexValue);

      const checksumHexValue = parseInt(checksumBits, 2).toString(16).padStart(checksumLengthBits % 4 === 0 ? checksumLengthBits/4 : 1, '0');
      setSuppliedChecksumHex(checksumHexValue);

      const entropyBytes = new Uint8Array(entropyLengthBits / 8);
      for (let i = 0; i < entropyLengthBits; i += 8) {
        const byte = entropyBits.slice(i, i + 8);
        entropyBytes[i / 8] = parseInt(byte, 2);
      }

      const entropyHash = sha256(entropyBytes);
      const hashHex = Array.from(entropyHash)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      setSha256Hash(hashHex);

      const hashBinary = parseInt(hashHex.slice(0, 2), 16).toString(2).padStart(8, '0');
      const calculatedChecksumBits = hashBinary.slice(0, checksumLengthBits);
      const calculatedChecksumHexValue = parseInt(calculatedChecksumBits, 2).toString(16).padStart(checksumLengthBits % 4 === 0 ? checksumLengthBits/4 : 1, '0');
      setCalculatedChecksumHex(calculatedChecksumHexValue);

      const validation = validateMnemonic(mnemonicPhrase, wordlist);
      setIsMnemonicValid(validation.isValid);
      setIsChecksumValid(checksumBits === calculatedChecksumBits);

      if (validation.isValid) {
        setMnemonicError('');
      } else {
        let errorMsg = '';
        if (validation.reason) {
          if (validation.reason === 'emptyMnemonic') {
            errorMsg = t('validationErrors.emptyMnemonic');
          } else if (validation.reason === 'invalidLength') {
            errorMsg = t('validationErrors.invalidLength');
          } else if (validation.reason === 'invalidChecksum') {
            errorMsg = t('validationErrors.invalidChecksum');
          } else if (validation.reason.startsWith('invalidWords:')) {
            const invalidWords = validation.reason.substring('invalidWords:'.length);
            errorMsg = `${t('validationErrors.invalidWords')} ${invalidWords}`;
          } else {
            errorMsg = validation.reason;
          }
        }
        setMnemonicError(errorMsg);
      }
    } catch (error) {
      console.error('Error validating mnemonic:', error);
      resetState();
      setIsMnemonicValid(false);
      setMnemonicError(t('validationErrors.failedGeneration'));
    }
  };

  const resetState = () => {
    setDecimalIndices([]);
    setEntropyWithChecksum('');
    setEntropyHex('');
    setSuppliedChecksumHex('');
    setSha256Hash('');
    setCalculatedChecksumHex('');
    setIsMnemonicValid(true);
    setMnemonicError('');
    setIsChecksumValid(true);
    setHasGenerated(false);
  };

  const handleMnemonicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMnemonic = e.target.value;
    setMnemonic(newMnemonic);

    if (!newMnemonic) {
      resetState();
      return;
    }

    if (wordlist.length > 0) {
      validateAndProcessMnemonic(newMnemonic);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex gap-4">
        <div className="flex-grow">
          <MnemonicInput
            label={t('labels.mnemonicPhrase')}
            value={mnemonic}
            onChange={handleMnemonicChange}
            placeholder={t('placeholders.noMnemonicPhrase')}
            isValid={isMnemonicValid}
            errorMessage={mnemonicError}
          />
        </div>
        <div className="w-36 flex items-start pt-5">
          <button
            onClick={generateRandomMnemonic}
            className="px-4 py-2 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer h-[42px]"
          >
            {generateButtonText}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <LabeledCopyableInput
          value={decimalIndices.length > 0 ? decimalIndices.join(' ') : ''}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.decimalIndices')}
          noCopying
          noTooltip
        />
      </div>

      <div className="mb-4">
        <LabeledCopyableInput
          value={entropyWithChecksum}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.entropyChecksum')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      <div className="mb-4 flex gap-4">
        <div className="flex-grow">
          <LabeledCopyableInput
            value={entropyHex}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.initialBitSequenceHex')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
        <div className="w-40">
          <LabeledCopyableInput
            value={suppliedChecksumHex}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.suppliedChecksum')}
            isError={!isChecksumValid}
            noCopying
            noTooltip
          />
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <div className="flex-grow">
          <LabeledCopyableInput
            value={sha256Hash}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.sha256Hash')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
        <div className="w-40">
          <LabeledCopyableInput
            value={calculatedChecksumHex}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.calculatedChecksum')}
            isError={!isChecksumValid}
            noCopying
            noTooltip
          />
        </div>
      </div>
    </div>
  );
}
