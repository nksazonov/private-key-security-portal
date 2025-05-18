"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CarouselProps {
  images: string[];
  height?: number;
  width?: number;
}

export default function Carousel({ images, height = 300, width = 300 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const slideRef = useRef<HTMLDivElement>(null);

  const goToNext = () => {
    if (currentIndex < images.length - 1 && !isAnimating) {
      setPreviousIndex(currentIndex);
      setSlideDirection('next');
      setIsAnimating(true);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0 && !isAnimating) {
      setPreviousIndex(currentIndex);
      setSlideDirection('prev');
      setIsAnimating(true);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (index !== currentIndex && !isAnimating) {
      setPreviousIndex(currentIndex);
      setSlideDirection(index > currentIndex ? 'next' : 'prev');
      setIsAnimating(true);
      setCurrentIndex(index);
    }
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    const slide = slideRef.current;
    if (slide) {
      slide.addEventListener('animationend', handleAnimationEnd);
      return () => {
        slide.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, []);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center" style={{ height, width }}>
      <div className="overflow-hidden w-full h-full rounded-lg relative">
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={images[previousIndex]}
              alt={`Previous Slide`}
              fill
              style={{ objectFit: 'contain' }}
              className={`slide-out-${slideDirection}`}
            />
          </div>
        )}
        
        <div 
          ref={slideRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={images[currentIndex]}
            alt={`Current Slide`}
            fill
            style={{ objectFit: 'contain' }}
            className={isAnimating ? `slide-in-${slideDirection}` : ''}
            onAnimationEnd={handleAnimationEnd}
          />
        </div>
        
        <button
          onClick={goToPrevious}
          className={`absolute left-0 top-0 h-full w-[15%] flex items-center justify-start pl-2 z-10 group ${
            currentIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          disabled={currentIndex === 0}
          aria-label="Previous slide"
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            currentIndex === 0 ? 'opacity-0 group-hover:opacity-0' : ''
          }`}></div>
          
          <div className={`bg-white/70 text-gray-800 p-2 rounded-full hover:bg-white transition-colors z-10 ${
            currentIndex === 0 ? 'opacity-40' : 'opacity-80 hover:opacity-100'
          }`}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        </button>
        
        <button
          onClick={goToNext}
          className={`absolute right-0 top-0 h-full w-[15%] flex items-center justify-end pr-2 z-10 group ${
            currentIndex === images.length - 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          disabled={currentIndex === images.length - 1}
          aria-label="Next slide"
        >
          <div className={`absolute inset-0 bg-gradient-to-l from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            currentIndex === images.length - 1 ? 'opacity-0 group-hover:opacity-0' : ''
          }`}></div>
          
          <div className={`bg-white/70 text-gray-800 p-2 rounded-full hover:bg-white transition-colors z-10 ${
            currentIndex === images.length - 1 ? 'opacity-40' : 'opacity-80 hover:opacity-100'
          }`}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideInFromLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideOutToLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        
        @keyframes slideOutToRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        
        :global(.slide-in-next) {
          animation: slideInFromRight 0.5s forwards;
        }
        
        :global(.slide-in-prev) {
          animation: slideInFromLeft 0.5s forwards;
        }
        
        :global(.slide-out-next) {
          animation: slideOutToLeft 0.5s forwards;
        }
        
        :global(.slide-out-prev) {
          animation: slideOutToRight 0.5s forwards;
        }
      `}</style>
    </div>
  );
}