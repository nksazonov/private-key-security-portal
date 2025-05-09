'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import CopyableInput from './CopyableInput';
import LabeledInput from './LabeledInput';
import { keccak256 } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sha256 } from '@noble/hashes/sha2';
import { pbkdf2 } from '@noble/hashes/pbkdf2';
import { hmac } from '@noble/hashes/hmac';

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
  // BIP-39 English wordlist
  const [wordlist, setWordlist] = useState<string[]>([]);

  // State for all the BIP-39 steps
  const [initialEntropy, setInitialEntropy] = useState<Uint8Array>(new Uint8Array(16));
  const [entropyHex, setEntropyHex] = useState<string>('-');
  const [entropyBinary, setEntropyBinary] = useState<string>('-');
  const [checksumBits, setChecksumBits] = useState<string>('-');
  const [checksumHex, setChecksumHex] = useState<string>('-');
  const [entropyWithChecksum, setEntropyWithChecksum] = useState<string>('-');
  const [groups11Bits, setGroups11Bits] = useState<string[]>([]);
  const [groupsDecimal, setGroupsDecimal] = useState<number[]>([]);
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
  const [salt, setSalt] = useState<string>('mnemonic');
  const [passphrase, setPassphrase] = useState<string>('');
  const [seed, setSeed] = useState<Uint8Array>(new Uint8Array(64)); // 512 bits
  const [privateKey, setPrivateKey] = useState<string>('-');
  const [publicAddress, setPublicAddress] = useState<string>('-');
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

    // Convert decimals to words
    if (wordlist.length > 0) {
      const words = decimals.map(index => {
        // Handle case where index is out of range
        return index < wordlist.length ? wordlist[index] : '-';
      });
      setMnemonicWords(words);

      // Calculate seed from mnemonic phrase
      if (words.every(word => word !== '-')) {
        calculateSeed(words.join(' '), salt, passphrase);
      }
    }
  };

  // Calculate the seed from mnemonic phrase, salt, and passphrase
  const calculateSeed = (mnemonic: string, salt: string, passphrase: string) => {
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

  // Handle salt and passphrase input changes
  const handleSaltChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSalt = e.target.value;
    setSalt(newSalt);
    if (hasGenerated && mnemonicWords.length > 0 && mnemonicWords.every(word => word !== '-')) {
      calculateSeed(mnemonicWords.join(' '), newSalt, passphrase);
    }
  };

  const handlePassphraseChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassphrase = e.target.value;
    setPassphrase(newPassphrase);
    if (hasGenerated && mnemonicWords.length > 0 && mnemonicWords.every(word => word !== '-')) {
      calculateSeed(mnemonicWords.join(' '), salt, newPassphrase);
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
          placeholder="No SHA-256 hash generated yet"
          label="SHA-256(Initial bit sequence):"
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* Initial Entropy in Hex and Checksum in Hex in one row */}
      <div className="mb-4 flex gap-4">
        <div className="flex-grow">
          <CopyableInput
            value={entropyHex}
            placeholder="No entropy generated yet"
            label="Initial bit sequence (HEX, 128 bits):"
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
        <div className="w-36">
          <CopyableInput
            value={checksumHex}
            placeholder="No checksum generated yet"
            label="Checksum (HEX):"
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
            placeholder="No entropy generated yet"
            label="Initial bit sequence (Binary, 128 bits):"
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
        <div className="w-36">
          <CopyableInput
            value={checksumBits}
            placeholder="No checksum generated yet"
            label="Checksum (Binary):"
            copyHoverText={copyHoverText}
            copiedText={copiedText}
          />
        </div>
      </div>

      {/* 11-bit Groups in Binary */}
      <div className="mb-4">
        <CopyableInput
          value={hasGenerated ? groups11Bits.join(' ') : '-'}
          placeholder="No 11-bit groups generated yet"
          label="Split in 11-bit groups (Binary):"
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* 11-bit Groups in Decimal */}
      <div className="mb-4">
        <CopyableInput
          value={hasGenerated ? groupsDecimal.join(' ') : '-'}
          placeholder="No decimal values generated yet"
          label="Decimal values (0-2047):"
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* Mnemonic Words */}
      <div className="mb-6">
        <CopyableInput
          value={hasGenerated ? mnemonicWords.join(' ') : '-'}
          placeholder="No mnemonic words generated yet"
          label="BIP-39 Mnemonic Words:"
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* Salt and Passphrase Inputs */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <LabeledInput
            label="Salt:"
            value={salt}
            onChange={handleSaltChange}
            placeholder="Enter salt"
          />
        </div>
        <div className="flex-1">
          <LabeledInput
            label="Passphrase:"
            value={passphrase}
            onChange={handlePassphraseChange}
            placeholder="Enter passphrase (optional)"
          />
        </div>
      </div>

      {/* Final Seed */}
      <div className="mb-4">
        <CopyableInput
          value={hasGenerated ? Array.from(seed).map(b => b.toString(16).padStart(2, '0')).join('') : '-'}
          placeholder="No seed generated yet"
          label="Final seed (512 bits):"
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>

      {/* Private Key and Public Address */}
      <div className="flex flex-col gap-4 mb-4">
        <CopyableInput
          value={privateKey}
          placeholder="No private key generated yet"
          label="Private Key:"
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />

        <CopyableInput
          value={publicAddress}
          placeholder="No public address generated yet"
          label="Public Address:"
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>
    </div>
  );
}
