'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import CopyableInput from './CopyableInput';
import LabeledInput from './LabeledInput';
import { secp256k1 } from '@noble/curves/secp256k1';
import { bytesToHex, hexToBytes } from '@noble/curves/abstract/utils';
import { keccak_256 } from '@noble/hashes/sha3';
import { useTranslations } from 'next-intl';

interface ECPointGeneratorProps {
  generateButtonText: string;
  copyHoverText: string;
  copiedText: string;
}

export default function ECPointGenerator({
  generateButtonText,
  copyHoverText,
  copiedText,
}: ECPointGeneratorProps) {
  const t = useTranslations('UI');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [publicKeyX, setPublicKeyX] = useState<string>('');
  const [publicKeyY, setPublicKeyY] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');
  const [publicKeyHash, setPublicKeyHash] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [privateKeyError, setPrivateKeyError] = useState<string>('');

  // Validate and compute when private key changes
  useEffect(() => {
    // Don't validate empty input
    if (!privateKey) {
      setPrivateKeyError('');
      resetOutputs();
      return;
    }

    // Validate and compute
    validateAndComputeKey();
  }, [privateKey]);

  const handlePrivateKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrivateKey(value);
  };

  const resetOutputs = () => {
    setPublicKeyX('');
    setPublicKeyY('');
    setPublicKey('');
    setPublicKeyHash('');
    setAddress('');
  };

  const validateAndComputeKey = () => {
    // Reset outputs before validation
    resetOutputs();
    
    // Strip 0x prefix if present
    let keyHex = privateKey.startsWith('0x') ? privateKey.slice(2) : privateKey;
    
    // Check if it's a valid hex string
    if (!/^[0-9a-fA-F]+$/.test(keyHex)) {
      setPrivateKeyError('Private key must contain only hexadecimal characters (0-9, a-f, A-F)');
      return;
    }

    // Check length
    if (keyHex.length < 64) {
      setPrivateKeyError('Private key must be at least 256 bits (64 hex characters)');
      return;
    }

    // If it's longer than 64 characters, take only the last 64
    if (keyHex.length > 64) {
      keyHex = keyHex.slice(-64);
      // Update the displayed value with the trimmed one
      setPrivateKey('0x' + keyHex);
    }

    try {
      // Convert hex to bytes
      const privateKeyBytes = hexToBytes(keyHex);
      
      // Verify it's a valid private key for secp256k1
      if (!secp256k1.utils.isValidPrivateKey(privateKeyBytes)) {
        setPrivateKeyError('Invalid private key for secp256k1');
        return;
      }

      // Key is valid, compute results
      setPrivateKeyError('');
      computeResults(keyHex, privateKeyBytes);
    } catch (error) {
      console.error('Error validating key:', error);
      setPrivateKeyError('Invalid private key format');
    }
  };

  // Generate a random private key and compute EC multiplication
  const generateRandomKey = () => {
    try {
      // Generate a random private key
      const privateKeyBytes = secp256k1.utils.randomPrivateKey();
      const privateKeyHex = bytesToHex(privateKeyBytes);
      
      // Update state with the new private key
      setPrivateKey('0x' + privateKeyHex);
      setPrivateKeyError('');
      
      // Computation will happen in the useEffect
    } catch (error) {
      console.error('Error generating key:', error);
      setPrivateKeyError('Failed to generate key');
    }
  };

  const computeResults = (keyHex: string, privateKeyBytes: Uint8Array) => {
    try {
      // Calculate public key point by multiplying the private key by the generator point G
      const publicKeyPoint = secp256k1.ProjectivePoint.fromPrivateKey(privateKeyBytes);
      const x = publicKeyPoint.x.toString(16).padStart(64, '0');
      const y = publicKeyPoint.y.toString(16).padStart(64, '0');
      
      // Format the full public key (in hex format without 0x04 prefix)
      const fullPublicKey = `0x${x}${y}`;
      
      // Calculate Ethereum address: keccak256(public_key)[12:32]
      // Ethereum needs uncompressed public key without the 0x04 prefix
      const publicKeyBytes = hexToBytes(`${x}${y}`);
      const hashBytes = keccak_256(publicKeyBytes);
      const hashHex = bytesToHex(hashBytes);
      
      // Take the last 20 bytes of the hash to create the Ethereum address
      const ethereumAddress = `0x${hashHex.slice(hashHex.length - 40)}`;
      
      // Update all states
      setPublicKeyX(x);
      setPublicKeyY(y);
      setPublicKey(fullPublicKey);
      setPublicKeyHash(`0x${hashHex}`);
      setAddress(ethereumAddress);
    } catch (error) {
      console.error('Error computing results:', error);
      resetOutputs();
      setPrivateKeyError('Failed to compute public key from private key');
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Private key input with button */}
        <div className="mb-4 flex gap-4">
          <div className="flex-grow">
            <LabeledInput
              label={t('labels.privateKey')}
              value={privateKey}
              onChange={handlePrivateKeyChange}
              placeholder="0x..."
              isError={!!privateKeyError}
            />
            {privateKeyError && (
              <p className="text-red-500 text-sm mt-1">{privateKeyError}</p>
            )}
          </div>
          <div className="w-36 flex items-start pt-5">
            <button
              onClick={generateRandomKey}
              className="px-4 py-2 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer h-[42px]"
            >
              {generateButtonText}
            </button>
          </div>
        </div>

        {/* Results section - always visible */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('labels.publicKeyX')}</label>
          <input
            type="text"
            readOnly
            value={publicKeyX || t('placeholders.dashNoValue')}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm text-gray-900"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('labels.publicKeyY')}</label>
          <input
            type="text"
            readOnly
            value={publicKeyY || t('placeholders.dashNoValue')}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm text-gray-900"
          />
        </div>

        <CopyableInput
          value={publicKey}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.publicKey')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />

        <CopyableInput
          value={publicKeyHash}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.keccakHash')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />

        <CopyableInput
          value={address}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.ethereumAddress')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>
    </div>
  );
}