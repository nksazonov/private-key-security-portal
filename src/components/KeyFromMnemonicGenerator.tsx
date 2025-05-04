'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import LabeledCopyableInput from './LabeledCopyableInput';
import MnemonicInput from './MnemonicInput';
import { keccak256 } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sha256 } from '@noble/hashes/sha2';
import { pbkdf2 } from '@noble/hashes/pbkdf2';
import { validateMnemonic, entropyToMnemonic } from '@/utils/bip39';

interface KeyFromMnemonicGeneratorProps {
  generateButtonText: string;
  copyHoverText: string;
  copiedText: string;
}

export default function KeyFromMnemonicGenerator({
  generateButtonText,
  copyHoverText,
  copiedText
}: KeyFromMnemonicGeneratorProps) {
  const t = useTranslations('UI');
  // BIP-39 English wordlist
  const [wordlist, setWordlist] = useState<string[]>([]);

  // State for mnemonic-to-key process
  const [mnemonic, setMnemonic] = useState<string>('');
  const [salt, setSalt] = useState<string>('mnemonic');
  const [passphrase, setPassphrase] = useState<string>('');
  const [seed, setSeed] = useState<Uint8Array>(new Uint8Array(64)); // 512 bits
  const [privateKey, setPrivateKey] = useState<string>('');
  const [publicAddress, setPublicAddress] = useState<string>('');
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  // Validation state
  const [isMnemonicValid, setIsMnemonicValid] = useState<boolean>(true);
  const [mnemonicError, setMnemonicError] = useState<string>('');

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

      // Reset validation state
      setIsMnemonicValid(true);
      setMnemonicError('');

      // Update state
      setMnemonic(mnemonicPhrase);
      calculateSeed(mnemonicPhrase, salt, passphrase);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating random mnemonic:', error);
      setIsMnemonicValid(false);
      setMnemonicError('Failed to generate mnemonic');
    }
  };

  // Calculate the seed from mnemonic phrase, salt, and passphrase
  const calculateSeed = (mnemonic: string, salt: string, passphrase: string) => {
    if (!mnemonic) return;

    try {
      // PBKDF2-HMAC-SHA512 with 2048 iterations
      const saltValue = `${salt}${passphrase ? passphrase : ''}`;
      const seedBytes = pbkdf2(sha256,
                              new TextEncoder().encode(mnemonic),
                              new TextEncoder().encode(saltValue),
                              { c: 2048, dkLen: 64 }); // 512 bits (64 bytes)

      setSeed(seedBytes);

      // Generate private key from seed using keccak256
      const newPrivateKey = keccak256(seedBytes);
      setPrivateKey(newPrivateKey);

      // Generate public address from private key
      const account = privateKeyToAccount(newPrivateKey);
      setPublicAddress(account.address);
    } catch (error) {
      console.error('Error calculating seed:', error);
    }
  };

  // Handle input changes
  const handleMnemonicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMnemonic = e.target.value;
    setMnemonic(newMnemonic);

    // Don't validate empty input
    if (!newMnemonic) {
      setIsMnemonicValid(true);
      setMnemonicError('');
      setPrivateKey('-');
      setPublicAddress('-');
      setSeed(new Uint8Array(64)); // Reset the seed
      setHasGenerated(false);
      return;
    }

    // Validate mnemonic if wordlist is loaded
    if (wordlist.length > 0) {
      const validation = validateMnemonic(newMnemonic, wordlist);
      setIsMnemonicValid(validation.isValid);

      if (validation.isValid) {
        setMnemonicError('');
        calculateSeed(newMnemonic, salt, passphrase);
        setHasGenerated(true);
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

        // Reset derived values if invalid
        setPrivateKey('-');
        setPublicAddress('-');
        setSeed(new Uint8Array(64)); // Reset the seed
        setHasGenerated(false);
      }
    }
  };

  const handleSaltChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSalt = e.target.value;
    setSalt(newSalt);
    if (isMnemonicValid && mnemonic) {
      calculateSeed(mnemonic, newSalt, passphrase);
    }
  };

  const handlePassphraseChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassphrase = e.target.value;
    setPassphrase(newPassphrase);
    if (isMnemonicValid && mnemonic) {
      calculateSeed(mnemonic, salt, newPassphrase);
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

      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <LabeledCopyableInput
            label={t('labels.salt')}
            value={salt}
            onChange={handleSaltChange}
            placeholder={t('placeholders.enterSalt')}
            editable
            noCopying
          />
        </div>
        <div className="flex-1">
          <LabeledCopyableInput
            label={t('labels.passphrase')}
            value={passphrase}
            onChange={handlePassphraseChange}
            placeholder={t('placeholders.enterPassphrase')}
            editable={true}
          />
        </div>
      </div>

      <div className="mb-4">
        <LabeledCopyableInput
          value={hasGenerated ? Array.from(seed).map(b => b.toString(16).padStart(2, '0')).join('') : ''}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.finalSeed')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <LabeledCopyableInput
          value={privateKey}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.privateKey')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />

        <LabeledCopyableInput
          value={publicAddress}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.publicAddress')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>
    </div>
  );
}
