'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import LabeledCopyableInput from './LabeledCopyableInput';
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

  useEffect(() => {
    if (!privateKey) {
      setPrivateKeyError('');
      resetOutputs();
      return;
    }

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
    resetOutputs();

    let keyHex = privateKey.startsWith('0x') ? privateKey.slice(2) : privateKey;

    if (!/^[0-9a-fA-F]+$/.test(keyHex)) {
      setPrivateKeyError('Private key must contain only hexadecimal characters (0-9, a-f, A-F)');
      return;
    }

    if (keyHex.length < 64) {
      setPrivateKeyError('Private key must be at least 256 bits (64 hex characters)');
      return;
    }

    if (keyHex.length > 64) {
      keyHex = keyHex.slice(-64);
      setPrivateKey('0x' + keyHex);
    }

    try {
      const privateKeyBytes = hexToBytes(keyHex);

      if (!secp256k1.utils.isValidPrivateKey(privateKeyBytes)) {
        setPrivateKeyError('Invalid private key for secp256k1');
        return;
      }

      setPrivateKeyError('');
      computeResults(keyHex, privateKeyBytes);
    } catch (error) {
      console.error('Error validating key:', error);
      setPrivateKeyError('Invalid private key format');
    }
  };

  const generateRandomKey = () => {
    try {
      const privateKeyBytes = secp256k1.utils.randomPrivateKey();
      const privateKeyHex = bytesToHex(privateKeyBytes);

      setPrivateKey('0x' + privateKeyHex);
      setPrivateKeyError('');
    } catch (error) {
      console.error('Error generating key:', error);
      setPrivateKeyError('Failed to generate key');
    }
  };

  const computeResults = (keyHex: string, privateKeyBytes: Uint8Array) => {
    try {
      const publicKeyPoint = secp256k1.ProjectivePoint.fromPrivateKey(privateKeyBytes);
      const x = publicKeyPoint.x.toString(16).padStart(64, '0');
      const y = publicKeyPoint.y.toString(16).padStart(64, '0');

      const fullPublicKey = `0x${x}${y}`;

      const publicKeyBytes = hexToBytes(`${x}${y}`);
      const hashBytes = keccak_256(publicKeyBytes);
      const hashHex = bytesToHex(hashBytes);

      const ethereumAddress = `0x${hashHex.slice(hashHex.length - 40)}`;

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
        <div className="mb-4 flex gap-4">
          <div className="flex-grow">
            <LabeledCopyableInput
              label={t('labels.privateKey')}
              value={privateKey}
              onChange={handlePrivateKeyChange}
              placeholder="0x..."
              isError={!!privateKeyError ? privateKeyError : false}
              editable={true}
              copyHoverText={copyHoverText}
              copiedText={copiedText}
            />
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
        <LabeledCopyableInput
          label={t('labels.publicKeyX')}
          value={publicKeyX}
          placeholder={t('placeholders.dashNoValue')}
          noCopying={true}
          noTooltip
          className="mb-4"
        />

        <LabeledCopyableInput
          label={t('labels.publicKeyY')}
          value={publicKeyY}
          placeholder={t('placeholders.dashNoValue')}
          noCopying={true}
          noTooltip
          className="mb-4"
        />

        <LabeledCopyableInput
          label={t('labels.publicKey')}
          value={publicKey}
          placeholder={t('placeholders.dashNoValue')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
          className="mb-4"
        />

        <LabeledCopyableInput
          label={t('labels.keccakHash')}
          value={publicKeyHash}
          placeholder={t('placeholders.dashNoValue')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
          className="mb-4"
        />

        <LabeledCopyableInput
          label={t('labels.ethereumAddress')}
          value={address}
          placeholder={t('placeholders.dashNoValue')}
          copyHoverText={copyHoverText}
          copiedText={copiedText}
        />
      </div>
    </div>
  );
}
