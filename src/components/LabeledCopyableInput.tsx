'use client';

import { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';

interface LabeledCopyableInputProps {
  label: string;
  value: string;
  placeholder?: string;
  copyHoverText?: string;
  copiedText?: string;
  isError?: boolean | string;
  editable?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  noTooltip?: boolean;
  noCopying?: boolean;
}

export default function LabeledCopyableInput({
  label,
  value,
  placeholder = '',
  copyHoverText,
  copiedText,
  isError = false,
  editable = false,
  onChange,
  className = '',
  noTooltip = false,
  noCopying = false
}: LabeledCopyableInputProps) {
  const t = useTranslations('UI');
  const [isHovering, setIsHovering] = useState(false);
  const [copyTooltip, setCopyTooltip] = useState<{visible: boolean, text: string, x: number, y: number}>(
    { visible: false, text: '', x: 0, y: 0 }
  );
  
  // Use translations or fallback to provided values or defaults
  const hoverText = copyHoverText || t('tooltips.clickToCopy');
  const textCopied = copiedText || t('tooltips.copied');

  // Validate props - if editable is true, onChange must be provided
  useEffect(() => {
    if (editable && !onChange) {
      console.error('LabeledCopyableInput: onChange prop is required when editable is true');
    }
  }, [editable, onChange]);

  const handleCopy = (e: MouseEvent) => {
    e.stopPropagation(); // Prevent triggering input focus
    
    if (value && value.length > 0 && !noCopying) {
      copyToClipboard(value, e);
    }
  };
  
  // Handle click on the input field (for non-editable inputs)
  const handleInputClick = (e: MouseEvent) => {
    if (!editable && value && value.length > 0 && !noCopying) {
      copyToClipboard(value, e);
    }
  };
  
  // Copy text to clipboard
  const copyToClipboard = (text: string, e: MouseEvent) => {
    if (noTooltip) return navigator.clipboard.writeText(text);
    
    const x = e.clientX;
    const y = e.clientY - 30; // Position above cursor

    navigator.clipboard.writeText(text).then(() => {
      setCopyTooltip({
        visible: true,
        text: textCopied,
        x,
        y
      });

      setTimeout(() => {
        setCopyTooltip({
          visible: false,
          text: '',
          x: 0,
          y: 0
        });
      }, 2000);
    });
  };

  // Show tooltip on hover of copy icon
  const showTooltip = (e: MouseEvent) => {
    if (!copyTooltip.visible || copyTooltip.text === hoverText) {
      const x = e.clientX;
      const y = e.clientY - 30; // Position above cursor

      setCopyTooltip({
        visible: true,
        text: hoverText,
        x,
        y
      });
    }
  };

  // Hide tooltip
  const hideTooltip = () => {
    if (copyTooltip.text === hoverText) {
      setCopyTooltip({
        visible: false,
        text: '',
        x: 0,
        y: 0
      });
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div 
        className="relative flex items-center group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          if (!noTooltip) hideTooltip();
        }}
      >
        <input
          type="text"
          value={value}
          onChange={editable ? onChange : undefined}
          readOnly={!editable}
          placeholder={placeholder}
          className={`labeled-copyable-input w-full p-2 border ${isError ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md bg-gray-50 font-mono text-sm ${value ? 'text-gray-900' : 'text-gray-500'} transition-colors ${!noCopying && !editable ? 'cursor-pointer' : ''} ${className}`}
          onClick={!editable ? handleInputClick : undefined}
          onMouseMove={!editable && !noTooltip ? showTooltip : undefined}
        />
        {value && value.length > 0 && !noCopying && (
          <div 
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${isHovering ? 'text-gray-600' : 'text-gray-300'}`}
            onClick={handleCopy}
            onMouseMove={!noTooltip ? showTooltip : undefined}
          >
            <FontAwesomeIcon icon={faCopy} />
          </div>
        )}
      </div>
      
      {/* Error message */}
      {isError && typeof isError === 'string' && (
        <p className="text-red-500 text-sm mt-1">{isError}</p>
      )}
      
      {/* Floating tooltip that follows the cursor */}
      {!noTooltip && copyTooltip.visible && (
        <div
          className="fixed bg-gray-800 text-white px-2 py-1 rounded text-xs z-50 pointer-events-none"
          style={{
            left: `${copyTooltip.x}px`,
            top: `${copyTooltip.y}px`,
            transform: 'translateX(-50%)' // Center horizontally
          }}
        >
          {copyTooltip.text}
        </div>
      )}
    </div>
  );
}