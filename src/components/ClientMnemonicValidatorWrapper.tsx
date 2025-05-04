'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled
const MnemonicValidator = dynamic(
  () => import('./MnemonicValidator'),
  { ssr: false }
);

interface ClientMnemonicValidatorWrapperProps {
  generateButtonText: string;
  copyHoverText: string;
  copiedText: string;
}

export default function ClientMnemonicValidatorWrapper({
  generateButtonText,
  copyHoverText,
  copiedText
}: ClientMnemonicValidatorWrapperProps) {
  return (
    <MnemonicValidator
      generateButtonText={generateButtonText}
      copyHoverText={copyHoverText}
      copiedText={copiedText}
    />
  );
}