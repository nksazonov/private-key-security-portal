'use client';

import { ChangeEvent } from 'react';

interface LabeledInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isError?: boolean;
  className?: string;
}

export default function LabeledInput({
  label,
  value,
  onChange,
  placeholder = '',
  isError = false,
  className = ''
}: LabeledInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border ${isError ? 'border-red-500' : 'border-gray-300'} rounded-md bg-gray-50 font-mono text-sm ${value ? 'text-gray-900' : 'text-gray-500'} transition-colors ${className}`}
      />
    </div>
  );
}