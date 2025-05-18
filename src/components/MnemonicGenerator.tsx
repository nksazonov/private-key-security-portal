'use client';

import { useState, useEffect } from 'react';
import LabeledCopyableInput from './LabeledCopyableInput';
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
  const [wordlist, setWordlist] = useState<string[]>([]);

  const [initialEntropy, setInitialEntropy] = useState<Uint8Array>(new Uint8Array(16));
  const [entropyHex, setEntropyHex] = useState<string>('');
  const [entropyBinary, setEntropyBinary] = useState<string>('');
  const [checksumBits, setChecksumBits] = useState<string>('');
  const [checksumHex, setChecksumHex] = useState<string>('');
  const [entropyWithChecksum, setEntropyWithChecksum] = useState<string>('');
  const [groups11Bits, setGroups11Bits] = useState<string[]>([]);
  const [groupsDecimal, setGroupsDecimal] = useState<number[]>([]);
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

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

  const generateRandomEntropy = () => {
    try {
      const randomBytes = new Uint8Array(16);
      window.crypto.getRandomValues(randomBytes);

      processEntropy(randomBytes);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating random entropy:', error);
    }
  };

  const processEntropy = (entropyBytes: Uint8Array) => {
    setInitialEntropy(entropyBytes);

    const entropyHexStr = Array.from(entropyBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    setEntropyHex(entropyHexStr);

    const entropyBinaryStr = Array.from(entropyBytes)
      .map(b => b.toString(2).padStart(8, '0'))
      .join('');
    setEntropyBinary(entropyBinaryStr);

    const entropyHash = sha256(entropyBytes);

    // For 128 bits of entropy, we need 4 bits of checksum (128/32 = 4)
    const checksumLength = entropyBytes.length * 8 / 32;

    const hashBinary = entropyHash[0].toString(2).padStart(8, '0');
    const checksumBitsStr = hashBinary.slice(0, checksumLength);
    setChecksumBits(checksumBitsStr);

    const checksumHexStr = (parseInt(checksumBitsStr, 2) & 0xF).toString(16);
    setChecksumHex(checksumHexStr);

    const allBits = entropyBinaryStr + checksumBitsStr;
    setEntropyWithChecksum(allBits);

    const groups: string[] = [];
    for (let i = 0; i < allBits.length; i += 11) {
      groups.push(allBits.slice(i, i + 11));
    }
    setGroups11Bits(groups);

    const decimals = groups.map(group => parseInt(group, 2));
    setGroupsDecimal(decimals);

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
        <LabeledCopyableInput
          value={hasGenerated ? Array.from(sha256(initialEntropy))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('') : ''}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.sha256Hash')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* Initial Entropy in Hex and Checksum in Hex in one row */}
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
        <div className="w-36">
          <LabeledCopyableInput
            value={checksumHex}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.checksumHex')}
            noCopying
            noTooltip
          />
        </div>
      </div>

      {/* Initial Entropy in Binary and Checksum in Binary in one row */}
      <div className="mb-4 flex gap-4">
        <div className="flex-grow">
          <LabeledCopyableInput
            value={entropyBinary}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.initialBitSequenceBinary')}
            noCopying
            noTooltip
          />
        </div>
        <div className="w-36">
          <LabeledCopyableInput
            value={checksumBits}
            placeholder={t('placeholders.dashNoValue')}
            label={t('labels.checksumBinary')}
            noCopying
            noTooltip
          />
        </div>
      </div>

      {/* Entropy with Checksum (bin) */}
      <div className="mb-4">
        <LabeledCopyableInput
          value={entropyWithChecksum}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.entropyChecksum')}
          noCopying
          noTooltip
        />
      </div>

      {/* 11-bit Groups in Binary */}
      <div className="mb-4">
        <LabeledCopyableInput
          value={hasGenerated ? groups11Bits.join(' ') : ''}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.splitBitGroups')}
          noCopying
          noTooltip
        />
      </div>

      {/* 11-bit Groups in Decimal */}
      <div className="mb-4">
        <LabeledCopyableInput
          value={hasGenerated ? groupsDecimal.join(' ') : ''}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.decimalIndices')}
          noCopying
          noTooltip
        />
      </div>

      {/* Mnemonic Words */}
      <div className="mb-4">
        <LabeledCopyableInput
          value={hasGenerated ? mnemonicWords.join(' ') : ''}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.mnemonicPhrase')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>
    </div>
  );
}
