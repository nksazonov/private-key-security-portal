'use client';

import dynamic from 'next/dynamic';

const KeyFromMnemonicGenerator = dynamic(
  () => import('./KeyFromMnemonicGenerator'),
  { ssr: false }
);

interface ClientKeyFromMnemonicGeneratorWrapperProps {
  generateButtonText: string;
  copyHoverText: string;
  copiedText: string;
}

export default function ClientKeyFromMnemonicGeneratorWrapper({
  generateButtonText,
  copyHoverText,
  copiedText
}: ClientKeyFromMnemonicGeneratorWrapperProps) {
  return (
    <KeyFromMnemonicGenerator
      generateButtonText={generateButtonText}
      copyHoverText={copyHoverText}
      copiedText={copiedText}
    />
  );
}