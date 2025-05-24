'use client';

import { useState, useEffect, useRef, MouseEvent } from 'react';
import LabeledCopyableInput from './LabeledCopyableInput';
import { keccak256 } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { useTranslations } from 'next-intl';

interface KeyGeneratorProps {
  generateButtonText: string;
  notEnoughEntropyText: string;
  copyHoverText: string;
  copiedText: string;
  entropyLevelText: string;
  moveMouseText: string;
}

export default function KeyGenerator({
  generateButtonText,
  copyHoverText,
  copiedText,
  entropyLevelText,
  moveMouseText
}: KeyGeneratorProps) {
  const t = useTranslations('UI');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [publicAddress, setPublicAddress] = useState<string>('');
  const [hasEnoughEntropy, setHasEnoughEntropy] = useState(false);

  const entropyThreshold = 32;
  const entropyDiffThreshold = 25;
  const containerRef = useRef<HTMLDivElement>(null);
  const [entropyBytes, setEntropyBytes] = useState<number[]>([]);
  const rectRef = useRef<DOMRect | null>(null);
  const lastPositionRef = useRef<{x: number, y: number} | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  const isCollectingRef = useRef(true);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isCollectingRef.current || entropyBytes.length >= entropyThreshold) {
        return;
      }

      if (rectRef.current) {
        const relativeX = e.clientX - rectRef.current.left;
        const relativeY = e.clientY - rectRef.current.top;

        const lastPos = lastPositionRef.current;
        const hasMoveEnough = !lastPos ||
          Math.abs(relativeX - lastPos.x) >= entropyDiffThreshold ||
          Math.abs(relativeY - lastPos.y) >= entropyDiffThreshold;

        if (hasMoveEnough) {
          lastPositionRef.current = { x: relativeX, y: relativeY };

          const x = Math.floor(relativeX) % 256;
          const y = Math.abs(Math.floor(relativeY) % 256);

          setEntropyBytes(prev => {
            const newBytes = [...prev, x, y];

            if (newBytes.length >= entropyThreshold) {
              setHasEnoughEntropy(true);
            }

            return newBytes.slice(0, entropyThreshold);
          });
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    isCollectingRef.current = entropyBytes.length < entropyThreshold;
  }, [entropyBytes.length, entropyThreshold]);

  const generateKey = () => {
    if (!hasEnoughEntropy || entropyBytes.length < entropyThreshold) {
      console.log('Not enough entropy to generate key. Please move your mouse more.');
      return;
    }

    try {
      const bytes = entropyBytes.slice(0, 32);

      const bytesArray = new Uint8Array(bytes);

      const hashedBytes = keccak256(bytesArray);

      const newPrivateKey = hashedBytes;

      const account = privateKeyToAccount(newPrivateKey);
      const newPublicAddress = account.address;

      setPrivateKey(newPrivateKey);
      setPublicAddress(newPublicAddress);

      setEntropyBytes([]);
      setHasEnoughEntropy(false);
      lastPositionRef.current = null;
    } catch (error) {
      console.error('Error generating key:', error);

      setEntropyBytes([]);
      setHasEnoughEntropy(false);
      lastPositionRef.current = null;
    }
  };


  return (
    <div ref={containerRef} className="w-full">
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={generateKey}
          disabled={!hasEnoughEntropy}
          className={`px-4 py-2 rounded-md font-medium ${
            hasEnoughEntropy
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-400 text-gray-100 cursor-not-allowed opacity-80"
          }`}
        >
          {generateButtonText}
        </button>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="flex flex-wrap items-center gap-5">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{entropyLevelText}</span>
            <span className="text-sm text-blue-600 font-medium">
              {Math.min(100, Math.round((entropyBytes.length / entropyThreshold) * 100))}%
            </span>
            <span className="text-sm text-gray-600">{moveMouseText}</span>
          </div>

          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${(entropyBytes.length / entropyThreshold) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <LabeledCopyableInput
          value={entropyBytes.length > 0 ? entropyBytes.map(b => b.toString(16).padStart(2, '0')).join(' ') : ''}
          placeholder={t('placeholders.dashNoValue')}
          label={t('labels.currentEntropy')}
          noCopying
          noTooltip
        />
      </div>

      <div className="flex flex-col gap-4">
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
