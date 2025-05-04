'use client';

import { ReactNode, createElement, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface AnchorHeadingProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  id: string;
  children: ReactNode;
  className?: string;
}

export default function AnchorHeading({ as, id, children, className = '' }: AnchorHeadingProps) {
  // Handle scrolling to account for sticky header
  useEffect(() => {
    // Check if the URL hash matches this heading's id
    if (window.location.hash === `#${id}`) {
      // Get the height of the sticky header
      const header = document.querySelector('nav');
      const headerHeight = header ? header.offsetHeight : 0;
      
      // Add a slight delay to ensure the DOM is fully loaded
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Get the element's position
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          // Scroll to the element minus the header height plus a small padding
          window.scrollTo({
            top: elementPosition - headerHeight - 20,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [id]);

  // Handle click without page reload
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Update URL with hash
    window.history.pushState(null, '', `#${id}`);
    
    // Get the height of the sticky header
    const header = document.querySelector('nav');
    const headerHeight = header ? header.offsetHeight : 0;
    
    // Calculate the position to scroll to
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight - 20,
        behavior: 'smooth'
      });
    }
  };

  return createElement(
    as,
    {
      id,
      className: `group relative ${className}`.trim(),
    },
    <>
      <a
        href={`#${id}`}
        onClick={handleClick}
        className="flex items-center"
      >
        <span className="cursor-pointer">{children}</span>
        <FontAwesomeIcon 
          icon={faLink} 
          className="text-current opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-sm" 
          aria-hidden="true"
        />
      </a>
    </>
  );
}