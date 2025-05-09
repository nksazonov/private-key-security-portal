'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import CopyableInput from './CopyableInput';
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

  // BIP-39 English wordlist
  const [wordlist, setWordlist] = useState<string[]>([]);

  // State for mnemonic validation
  const [mnemonic, setMnemonic] = useState<string>('');
  const [decimalIndices, setDecimalIndices] = useState<number[]>([]);
  const [entropyWithChecksum, setEntropyWithChecksum] = useState<string>('');
  const [entropyHex, setEntropyHex] = useState<string>('');
  const [suppliedChecksumHex, setSuppliedChecksumHex] = useState<string>('');
  const [sha256Hash, setSha256Hash] = useState<string>('');
  const [calculatedChecksumHex, setCalculatedChecksumHex] = useState<string>('');
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  // Validation state
  const [isMnemonicValid, setIsMnemonicValid] = useState<boolean>(true);
  const [mnemonicError, setMnemonicError] = useState<string>('');
  const [isChecksumValid, setIsChecksumValid] = useState<boolean>(true);

  // Fetch the BIP-39 English wordlist
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
        // Fallback to a few words for demonstration if fetch fails
        setWordlist(['abandon', 'ability', 'able', 'about', 'above']);
      }
    }

    fetchWordlist();
  }, []);

  // Generate random mnemonic
  const generateRandomMnemonic = () => {
    if (wordlist.length === 0) return;

    try {
      // Generate 16 bytes (128 bits) of random data for entropy
      const randomBytes = new Uint8Array(16);
      window.crypto.getRandomValues(randomBytes);

      // Convert entropy to mnemonic phrase using our utility function
      const mnemonicPhrase = entropyToMnemonic(randomBytes, wordlist);

      // Update state and validate
      setMnemonic(mnemonicPhrase);
      validateAndProcessMnemonic(mnemonicPhrase);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating random mnemonic:', error);
      setIsMnemonicValid(false);
      setMnemonicError('Failed to generate mnemonic');
    }
  };

  // Validate and process the mnemonic
  const validateAndProcessMnemonic = (mnemonicPhrase: string) => {
    if (!mnemonicPhrase) {
      resetState();
      return;
    }

    // Split mnemonic into words and validate format first
    const words = mnemonicPhrase.trim().split(/\s+/);

    // Always attempt to calculate indices and binary representation,
    // even if the mnemonic is invalid
    try {
      // Get decimal indices
      const indices = words.map(word => {
        const index = wordlist.indexOf(word);
        return index >= 0 ? index : 0; // Use 0 as fallback for invalid words
      });
      setDecimalIndices(indices);

      // Convert indices to binary (11 bits each)
      const binaryGroups = indices.map(index => index.toString(2).padStart(11, '0'));
      const allBits = binaryGroups.join('');
      setEntropyWithChecksum(allBits);

      // Split entropy and checksum
      // For a 12-word mnemonic, we have 132 bits (12*11=132), with 4 bits of checksum
      // So entropy is 128 bits (16 bytes)
      const checksumLengthBits = Math.floor(allBits.length / 33); // CS = ENT/32
      const entropyLengthBits = allBits.length - checksumLengthBits;

      const entropyBits = allBits.slice(0, entropyLengthBits);
      const checksumBits = allBits.slice(entropyLengthBits);

      // Convert entropy bits to hex
      let entropyHexValue = '';
      for (let i = 0; i < entropyBits.length; i += 8) {
        const byte = entropyBits.slice(i, i + 8);
        entropyHexValue += parseInt(byte, 2).toString(16).padStart(2, '0');
      }
      setEntropyHex(entropyHexValue);

      // Convert checksum bits to hex
      const checksumHexValue = parseInt(checksumBits, 2).toString(16).padStart(checksumLengthBits % 4 === 0 ? checksumLengthBits/4 : 1, '0');
      setSuppliedChecksumHex(checksumHexValue);

      // Convert entropy hex to bytes and calculate SHA-256
      const entropyBytes = new Uint8Array(entropyLengthBits / 8);
      for (let i = 0; i < entropyLengthBits; i += 8) {
        const byte = entropyBits.slice(i, i + 8);
        entropyBytes[i / 8] = parseInt(byte, 2);
      }

      // Calculate SHA-256 hash of the entropy
      const entropyHash = sha256(entropyBytes);
      const hashHex = Array.from(entropyHash)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      setSha256Hash(hashHex);

      // Extract the first N bits from the hash for the calculated checksum
      const hashBinary = parseInt(hashHex.slice(0, 2), 16).toString(2).padStart(8, '0');
      const calculatedChecksumBits = hashBinary.slice(0, checksumLengthBits);
      const calculatedChecksumHexValue = parseInt(calculatedChecksumBits, 2).toString(16).padStart(checksumLengthBits % 4 === 0 ? checksumLengthBits/4 : 1, '0');
      setCalculatedChecksumHex(calculatedChecksumHexValue);

      // Now perform the full BIP-39 validation
      const validation = validateMnemonic(mnemonicPhrase, wordlist);
      setIsMnemonicValid(validation.isValid);

      // Check if the checksum is valid specifically
      setIsChecksumValid(checksumBits === calculatedChecksumBits);

      if (validation.isValid) {
        setMnemonicError('');
      } else {
        // Process error message
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

  // Reset state for empty input
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

  // Handle mnemonic input change
  const handleMnemonicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMnemonic = e.target.value;
    setMnemonic(newMnemonic);

    if (!newMnemonic) {
      resetState();
      return;
    }

    // Only validate if wordlist is loaded
    if (wordlist.length > 0) {
      validateAndProcessMnemonic(newMnemonic);
    }
  };

  return (
    <div className="w-full">
      {/* Mnemonic Input with stable layout */}
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
        {/* Fixed-position button that doesn't move */}
        <div className="w-36 flex items-start pt-5"> {/* Aligned to input, not label */}
          <button
            onClick={generateRandomMnemonic}
            className="px-4 py-2 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer h-[42px]"
          >
            {generateButtonText}
          </button>
        </div>
      </div>

      {/* Decimal indices */}
      <div className="mb-4">
        <CopyableInput
          value={decimalIndices.length > 0 ? decimalIndices.join(' ') : ''}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.decimalIndices')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* Entropy + Checksum (Binary) */}
      <div className="mb-4">
        <CopyableInput
          value={entropyWithChecksum}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.entropyChecksum')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* Initial Entropy and Supplied Checksum */}
      <div className="mb-4 flex gap-4">
        <div className="flex-grow">
          <CopyableInput
            value={entropyHex}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.initialBitSequenceHex')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
            className={!isMnemonicValid ? 'border-red-500 bg-red-50' : ''}
          />
        </div>
        <div className="w-40">
          <CopyableInput
            value={suppliedChecksumHex}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.suppliedChecksum')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
            className={!isChecksumValid ? 'border-red-500 bg-red-50' : ''}
          />
        </div>
      </div>

      {/* SHA-256 Hash and Calculated Checksum */}
      <div className="mb-4 flex gap-4">
        <div className="flex-grow">
          <CopyableInput
            value={sha256Hash}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.sha256Hash')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
        <div className="w-40">
          <CopyableInput
            value={calculatedChecksumHex}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.calculatedChecksum')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
            className={!isChecksumValid ? 'border-red-500 bg-red-50' : ''}
          />
        </div>
      </div>
    </div>
  );
}
