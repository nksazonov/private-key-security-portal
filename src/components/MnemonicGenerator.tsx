'use client';

import { useState, useEffect } from 'react';
import CopyableInput from './CopyableInput';
import { sha256 } from '@noble/hashes/sha2';
import { entropyToMnemonic } from '@/utils/bip39';
import { useTranslations } from 'next-intl';

interface MnemonicGeneratorProps {
  generateButtonText: string;
  copyHoverText: string;
  copiedText: string;
}

export default function MnemonicGenerator({
  generateButtonText,
  copyHoverText,
  copiedText
}: MnemonicGeneratorProps) {
  const t = useTranslations('UI');
  // BIP-39 English wordlist
  const [wordlist, setWordlist] = useState<string[]>([]);
  
  // State for all the BIP-39 steps to generate mnemonic
  const [initialEntropy, setInitialEntropy] = useState<Uint8Array>(new Uint8Array(16));
  const [entropyHex, setEntropyHex] = useState<string>('-');
  const [entropyBinary, setEntropyBinary] = useState<string>('-');
  const [checksumBits, setChecksumBits] = useState<string>('-');
  const [checksumHex, setChecksumHex] = useState<string>('-');
  const [entropyWithChecksum, setEntropyWithChecksum] = useState<string>('-');
  const [groups11Bits, setGroups11Bits] = useState<string[]>([]);
  const [groupsDecimal, setGroupsDecimal] = useState<number[]>([]);
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

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

  // Generate initial random 128 bits (16 bytes) entropy
  const generateRandomEntropy = () => {
    try {
      // Generate 16 bytes (128 bits) of random data
      const randomBytes = new Uint8Array(16);
      window.crypto.getRandomValues(randomBytes);
      
      // Process the entropy and generate the entire chain
      processEntropy(randomBytes);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating random entropy:', error);
    }
  };

  // Process the entropy and generate all the BIP-39 steps
  const processEntropy = (entropyBytes: Uint8Array) => {
    // Store the initial entropy
    setInitialEntropy(entropyBytes);
    
    // Convert to hex string for display
    const entropyHexStr = Array.from(entropyBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    setEntropyHex(entropyHexStr);

    // Convert entropy to binary string for display
    const entropyBinaryStr = Array.from(entropyBytes)
      .map(b => b.toString(2).padStart(8, '0'))
      .join('');
    setEntropyBinary(entropyBinaryStr);

    // Calculate SHA-256 hash of the entropy
    const entropyHash = sha256(entropyBytes);
    
    // For 128 bits of entropy, we need 4 bits of checksum (128/32 = 4)
    const checksumLength = entropyBytes.length * 8 / 32;
    
    // Convert the first byte of the hash to binary and take first checksumLength bits
    const hashBinary = entropyHash[0].toString(2).padStart(8, '0');
    const checksumBitsStr = hashBinary.slice(0, checksumLength);
    setChecksumBits(checksumBitsStr);
    
    // Display checksum in hex
    const checksumHexStr = (parseInt(checksumBitsStr, 2) & 0xF).toString(16);
    setChecksumHex(checksumHexStr);

    // Combine entropy bits with checksum bits
    const allBits = entropyBinaryStr + checksumBitsStr;
    setEntropyWithChecksum(allBits);

    // Split into 11-bit groups
    const groups: string[] = [];
    for (let i = 0; i < allBits.length; i += 11) {
      groups.push(allBits.slice(i, i + 11));
    }
    setGroups11Bits(groups);

    // Convert groups to decimal
    const decimals = groups.map(group => parseInt(group, 2));
    setGroupsDecimal(decimals);

    // Convert to mnemonic using our utility function
    if (wordlist.length > 0) {
      try {
        const mnemonicPhrase = entropyToMnemonic(entropyBytes, wordlist);
        const words = mnemonicPhrase.split(' ');
        setMnemonicWords(words);
      } catch (error) {
        console.error('Error generating mnemonic:', error);
        setMnemonicWords([]);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={generateRandomEntropy}
          className="px-4 py-2 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          {generateButtonText}
        </button>
      </div>

      {/* SHA-256 Hash of Random Bits */}
      <div className="mb-4">
        <CopyableInput
          value={hasGenerated ? Array.from(sha256(initialEntropy))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('') : '-'}
          placeholder={t('placeholders.noSha256')}
          label={t('labels.sha256Hash')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* Initial Entropy in Hex and Checksum in Hex in one row */}
      <div className="mb-4 flex gap-4">
        <div className="flex-grow">
          <CopyableInput
            value={entropyHex}
            placeholder={t('placeholders.noEntropyGenerated')}
            label={t('labels.initialBitSequenceHex')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
        <div className="w-36">
          <CopyableInput
            value={checksumHex}
            placeholder={t('placeholders.noChecksumGenerated')}
            label={t('labels.checksumHex')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
      </div>

      {/* Initial Entropy in Binary and Checksum in Binary in one row */}
      <div className="mb-4 flex gap-4">
        <div className="flex-grow">
          <CopyableInput
            value={entropyBinary}
            placeholder={t('placeholders.noEntropyGenerated')}
            label={t('labels.initialBitSequenceBinary')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
        <div className="w-36">
          <CopyableInput
            value={checksumBits}
            placeholder={t('placeholders.noChecksumGenerated')}
            label={t('labels.checksumBinary')}
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
      </div>

      {/* Entropy with Checksum (Binary) */}
      <div className="mb-4">
        <CopyableInput
          value={entropyWithChecksum}
          placeholder={t('placeholders.noEntropyChecksumGenerated')}
          label={t('labels.entropyChecksum')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* 11-bit Groups in Binary */}
      <div className="mb-4">
        <CopyableInput
          value={hasGenerated ? groups11Bits.join(' ') : '-'}
          placeholder={t('placeholders.noBitGroups')}
          label={t('labels.splitBitGroups')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* 11-bit Groups in Decimal */}
      <div className="mb-4">
        <CopyableInput
          value={hasGenerated ? groupsDecimal.join(' ') : '-'}
          placeholder={t('placeholders.noDecimalValues')}
          label={t('labels.decimalValues')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* Mnemonic Words */}
      <div className="mb-4">
        <CopyableInput
          value={hasGenerated ? mnemonicWords.join(' ') : '-'}
          placeholder={t('placeholders.noMnemonicWords')}
          label={t('labels.bip39Words')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>
    </div>
  );
}