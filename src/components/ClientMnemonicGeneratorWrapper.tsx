'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled
const MnemonicGenerator = dynamic(
  () => import('./MnemonicGenerator'),
  { ssr: false }
);

interface ClientMnemonicGeneratorWrapperProps {
  generateButtonText: string;
  copyHoverText: string;
  copiedText: string;
}

export default function ClientMnemonicGeneratorWrapper({
  generateButtonText,
  copyHoverText,
  copiedText
}: ClientMnemonicGeneratorWrapperProps) {
  return (
    <MnemonicGenerator
      generateButtonText={generateButtonText}
      copyHoverText={copyHoverText}
      copiedText={copiedText}
    />
  );
}