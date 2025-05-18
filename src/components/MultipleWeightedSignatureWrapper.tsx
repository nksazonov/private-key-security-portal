'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR to avoid hydration issues
const MultipleWeightedSignature = dynamic(
  () => import('@/components/MultipleWeightedSignature'),
  { ssr: false }
);

export default function MultipleWeightedSignatureWrapper() {
  return <MultipleWeightedSignature />;
}