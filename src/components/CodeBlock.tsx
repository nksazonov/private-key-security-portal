"use client"

import React from 'react';

interface CodeBlockProps {
  code: string;
  label: string;
  language?: string;
}

export default function CodeBlock({ code, label, language = 'solidity' }: CodeBlockProps) {
  // Split code into lines and trim trailing whitespace
  const lines = code.split('\n').map(line => line.trimEnd());

  return (
    <div className="bg-gray-800 rounded-md overflow-hidden shadow-sm mt-2 mb-4">
      <div className="flex items-center px-4 py-2 bg-gray-900 text-xs text-gray-300 border-b border-gray-700">
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
        <span className="text-xs ml-auto text-gray-500">{language}</span>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className="font-mono">
            {lines.map((line, index) => (
              <div key={index} className="whitespace-pre table-row">
                <span className="text-gray-500 table-cell pr-4 text-right select-none">{index + 1}</span>
                <span className="text-gray-200 table-cell">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}