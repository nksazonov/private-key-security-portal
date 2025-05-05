'use client';

import React from 'react';

interface SectionDividerProps {
  isLast?: boolean;
}

export default function SectionDivider({ isLast = false }: SectionDividerProps) {
  if (isLast) {
    return null;
  }

  return (
    <div className="my-12">
      <div className="w-full h-px bg-blue-200"></div>
    </div>
  );
}