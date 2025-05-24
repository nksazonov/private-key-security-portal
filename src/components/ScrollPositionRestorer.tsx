'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

export default function ScrollPositionRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    const savedPath = localStorage.getItem('lastPath');

    const performScrollRestoration = () => {
      if (savedScrollPosition && savedPath === pathname) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
        
        localStorage.removeItem('scrollPosition');
        localStorage.removeItem('lastPath');
      }
    };

    
    performScrollRestoration();
    
    window.requestAnimationFrame(() => {
      performScrollRestoration();
    });
    
    const timeoutId = window.setTimeout(performScrollRestoration, 10);
    
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}