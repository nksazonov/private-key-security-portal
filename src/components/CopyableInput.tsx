'use client';

import { useState, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

interface CopyableInputProps {
  value: string;
  placeholder: string;
  label: string;
  copyHoverText?: string;
  copiedText?: string;
  noTooltip?: boolean;
  noCopying?: boolean;
}

export default function CopyableInput({
  value,
  placeholder,
  label,
  copyHoverText = 'Click to copy',
  copiedText = 'Copied!',
  noTooltip = false,
  noCopying = false
}: CopyableInputProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [copyTooltip, setCopyTooltip] = useState<{visible: boolean, text: string, x: number, y: number}>(
    { visible: false, text: '', x: 0, y: 0 }
  );

  const handleMouseMove = (e: MouseEvent) => {
    if (value && !noTooltip) {
      showTooltip(e);
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (value && !noCopying) {
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
        text: copiedText,
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

  // Show tooltip on hover
  const showTooltip = (e: MouseEvent) => {
    if (!copyTooltip.visible || copyTooltip.text === copyHoverText) {
      const x = e.clientX;
      const y = e.clientY - 30; // Position above cursor

      setCopyTooltip({
        visible: true,
        text: copyHoverText,
        x,
        y
      });
    }
  };

  // Hide tooltip
  const hideTooltip = () => {
    if (copyTooltip.text === copyHoverText) {
      setCopyTooltip({
        visible: false,
        text: '',
        x: 0,
        y: 0
      });
    }
  };

  const preventFocus = (e: React.MouseEvent) => {
    // Prevent focus and blur immediately
    e.preventDefault();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div 
        className="relative flex items-center group"
        onMouseDown={preventFocus}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          if (!noTooltip) hideTooltip();
        }}
      >
        <input
          type="text"
          readOnly
          value={value || placeholder}
          className={`copyable-input w-full p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm text-gray-900 ${!noCopying ? 'cursor-pointer' : ''} hover:bg-gray-100 transition-colors`}
          style={{ WebkitAppearance: 'none' }}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
        {value && !noCopying && (
          <div 
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${isHovering ? 'text-gray-600' : 'text-gray-300'} pointer-events-none`}
          >
            <FontAwesomeIcon icon={faCopy} />
          </div>
        )}
      </div>
      
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