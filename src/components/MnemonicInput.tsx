'use client';

import { ChangeEvent } from 'react';

interface MnemonicInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isValid: boolean;
  errorMessage?: string;
}

export default function MnemonicInput({
  label,
  value,
  onChange,
  placeholder = '',
  isValid,
  errorMessage
}: MnemonicInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 border ${isValid ? 'border-gray-300 bg-gray-50' : 'border-red-500 bg-red-50'} rounded-md font-mono text-sm ${isValid ? 'text-gray-900' : 'text-red-900'} transition-colors`}
        />
        {/* Use an absolute positioned error message that doesn't affect layout */}
        <div className="h-5"> {/* Fixed height container for error message */}
          {!isValid && errorMessage && (
            <p className="text-sm text-red-600 absolute">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}