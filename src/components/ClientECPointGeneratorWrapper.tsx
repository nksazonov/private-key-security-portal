'use client';

import dynamic from 'next/dynamic';

const ECPointGenerator = dynamic(
  () => import('./ECPointGenerator'),
  { ssr: false }
);

interface ClientECPointGeneratorWrapperProps {
  generateButtonText: string;
  copyHoverText: string;
  copiedText: string;
}

export default function ClientECPointGeneratorWrapper({
  generateButtonText,
  copyHoverText,
  copiedText
}: ClientECPointGeneratorWrapperProps) {
  return (
    <ECPointGenerator
      generateButtonText={generateButtonText}
      copyHoverText={copyHoverText}
      copiedText={copiedText}
    />
  );
}