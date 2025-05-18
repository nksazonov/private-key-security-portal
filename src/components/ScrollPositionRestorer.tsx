'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

export default function ScrollPositionRestorer() {
  const pathname = usePathname();

  // This effect runs to handle scroll restoration
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if there's a saved scroll position and path
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    const savedPath = localStorage.getItem('lastPath');

    // Function to handle the actual restoration
    const performScrollRestoration = () => {
      if (savedScrollPosition && savedPath === pathname) {
        // Use scrollTo with minimal options to avoid hydration issues
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
        
        // Clear the saved position after restoring
        localStorage.removeItem('scrollPosition');
        localStorage.removeItem('lastPath');
      }
    };

    // Apply multiple strategies to reduce flicker while avoiding hydration issues
    
    // Strategy 1: Before paint
    performScrollRestoration();
    
    // Strategy 2: requestAnimationFrame for just after first paint
    window.requestAnimationFrame(() => {
      performScrollRestoration();
    });
    
    // Strategy 3: Backup with a minimal timeout
    const timeoutId = window.setTimeout(performScrollRestoration, 10);
    
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]); // Run when the path changes

  return null; // This component doesn't render anything
}