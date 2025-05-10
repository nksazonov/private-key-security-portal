"use client"

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-gray-50 rounded-lg border border-gray-200 p-8 h-full hover:border-blue-300 transition-colors shadow-sm ${className}`}>
      {children}
    </div>
  );
}