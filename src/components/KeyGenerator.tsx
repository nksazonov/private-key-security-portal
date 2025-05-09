'use client';

import { useState, useEffect, useRef, MouseEvent } from 'react';
import CopyableInput from './CopyableInput';
import { keccak256 } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

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
  const [privateKey, setPrivateKey] = useState<string>('');
  const [publicAddress, setPublicAddress] = useState<string>('');
  const [hasEnoughEntropy, setHasEnoughEntropy] = useState(false);

  const entropyThreshold = 32; // Number of mouse movements needed for entropy (16 pairs of x,y)
  const entropyDiffThreshold = 25; // Minimum pixel difference required to collect new entropy
  const containerRef = useRef<HTMLDivElement>(null);
  const [entropyBytes, setEntropyBytes] = useState<number[]>([]);
  const rectRef = useRef<DOMRect | null>(null);
  const lastPositionRef = useRef<{x: number, y: number} | null>(null);

  // Get container dimensions when component mounts
  useEffect(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  // Track collecting state with ref to prevent dependency issues in the effect
  const isCollectingRef = useRef(true);

  // Set up/tear down mouse move listener once on mount
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      // Skip if we're not collecting or already have enough entropy
      if (!isCollectingRef.current || entropyBytes.length >= entropyThreshold) {
        return;
      }

      if (rectRef.current) {
        const relativeX = e.clientX - rectRef.current.left;
        const relativeY = e.clientY - rectRef.current.top;

        // Check if mouse has moved enough from last position to collect new entropy
        const lastPos = lastPositionRef.current;
        const hasMoveEnough = !lastPos ||
          Math.abs(relativeX - lastPos.x) >= entropyDiffThreshold ||
          Math.abs(relativeY - lastPos.y) >= entropyDiffThreshold;

        if (hasMoveEnough) {
          // Update last position reference
          lastPositionRef.current = { x: relativeX, y: relativeY };

          const x = Math.floor(relativeX) % 256;
          const y = Math.abs(Math.floor(relativeY) % 256);

        console.log(`x: ${x}, y: ${y}`);

          setEntropyBytes(prev => {
            // Calculate the new array first
            const newBytes = [...prev, x, y];

            // Update state if we've reached the threshold
            if (newBytes.length >= entropyThreshold) {
              setHasEnoughEntropy(true);
            }

            return newBytes.slice(0, entropyThreshold); // Never exceed threshold
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
  }, []); // Empty dependency array - only run on mount and unmount

  // Update collecting ref when needed
  useEffect(() => {
    // If we have enough entropy or reset after key generation, update the ref
    isCollectingRef.current = entropyBytes.length < entropyThreshold;
  }, [entropyBytes.length, entropyThreshold]);

  // Generate private key using viem's keccak256 and entropy from mouse movements
  const generateKey = () => {
    if (!hasEnoughEntropy || entropyBytes.length < entropyThreshold) {
      console.log('Not enough entropy to generate key. Please move your mouse more.');
      return;
    }

    try {
      // Ensure we have exactly 32 bytes (for a valid private key)
      const bytes = entropyBytes.slice(0, 32);

      // Convert our array of numbers to a Uint8Array
      const bytesArray = new Uint8Array(bytes);

      // Hash the bytes using keccak256 to get a private key
      // Note: We take the first 32 bytes of the hash as our private key
      const hashedBytes = keccak256(bytesArray);

      // Format the private key with '0x' prefix
      const newPrivateKey = hashedBytes;

      // Use privateKeyToAccount to get the Ethereum address
      const account = privateKeyToAccount(newPrivateKey);
      const newPublicAddress = account.address;

      setPrivateKey(newPrivateKey);
      setPublicAddress(newPublicAddress);

      // Reset for next generation
      setEntropyBytes([]);
      setHasEnoughEntropy(false);
      lastPositionRef.current = null;
    } catch (error) {
      console.error('Error generating key:', error);

      // Reset for next generation
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

          {/* Horizontal progress bar with percentage */}
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${(entropyBytes.length / entropyThreshold) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Display entropy bytes */}
      <div className="mb-4">
        <CopyableInput
          value={entropyBytes.length > 0 ? entropyBytes.map(b => b.toString(16).padStart(2, '0')).join(' ') : ''}
          placeholder="No entropy collected yet"
          label="Current Entropy:"
          noCopying
          noTooltip
        />
      </div>

      <div className="flex flex-col gap-4">
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
