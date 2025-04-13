"use client"

import React, { useState, useEffect } from 'react';
import { ContentStateContext } from '@/lib/content-state';

interface ContentProviderProps {
  children: React.ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  const [hasCalculatorResults, setHasCalculatorResults] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  // Mark content as loaded after initial render
  useEffect(() => {
    // Short delay to ensure content has actually rendered
    const timer = setTimeout(() => {
      setIsContentLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ContentStateContext.Provider value={{ 
      hasCalculatorResults, 
      setHasCalculatorResults,
      isContentLoaded,
      setIsContentLoaded
    }}>
      {children}
    </ContentStateContext.Provider>
  );
}
