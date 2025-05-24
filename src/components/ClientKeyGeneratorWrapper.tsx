'use client';

import dynamic from 'next/dynamic';

const KeyGenerator = dynamic(
  () => import('./KeyGenerator'),
  { ssr: false }
);

interface ClientKeyGeneratorWrapperProps {
  generateButtonText: string;
  notEnoughEntropyText: string;
  copyHoverText: string;
  copiedText: string;
  entropyLevelText: string;
  moveMouseText: string;
}

export default function ClientKeyGeneratorWrapper({
  generateButtonText,
  notEnoughEntropyText,
  copyHoverText,
  copiedText,
  entropyLevelText,
  moveMouseText
}: ClientKeyGeneratorWrapperProps) {
  return (
    <KeyGenerator
      generateButtonText={generateButtonText}
      notEnoughEntropyText={notEnoughEntropyText}
      copyHoverText={copyHoverText}
      copiedText={copiedText}
      entropyLevelText={entropyLevelText}
      moveMouseText={moveMouseText}
    />
  );
}