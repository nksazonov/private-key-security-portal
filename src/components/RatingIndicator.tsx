"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface RatingIndicatorProps {
  name: string;
  icon: IconDefinition;
  themeColor: string;
  totalAmount: number;
  rating: number;
}

export default function RatingIndicator({ 
  name, 
  icon, 
  themeColor = 'text-yellow-500', 
  totalAmount = 5, 
  rating 
}: RatingIndicatorProps) {
  const validRating = Math.max(0, Math.min(Math.round(rating), totalAmount));
  
  return (
    <div className="mb-3">
      <div className={`font-medium mb-1 ${themeColor}`}>{name}</div>
      <div className="flex items-center">
        {Array.from({ length: totalAmount }).map((_, index) => (
          <span 
            key={index} 
            className={`mr-1 ${index < validRating ? themeColor : `${themeColor} opacity-20`}`}
          >
            <FontAwesomeIcon icon={icon} />
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">{validRating}/{totalAmount}</span>
      </div>
    </div>
  );
}