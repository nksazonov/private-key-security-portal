'use client';

import { ChangeEvent } from 'react';

interface LabeledInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function LabeledInput({
  label,
  value,
  onChange,
  placeholder = ''
}: LabeledInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm text-gray-900 transition-colors"
      />
    </div>
  );
}