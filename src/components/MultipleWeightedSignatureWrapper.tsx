'use client';

import dynamic from 'next/dynamic';

const MultipleWeightedSignature = dynamic(
  () => import('@/components/MultipleWeightedSignature'),
  { ssr: false }
);

export default function MultipleWeightedSignatureWrapper() {
  return <MultipleWeightedSignature />;
}