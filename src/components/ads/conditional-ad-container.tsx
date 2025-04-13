"use client"

import { ReactNode } from 'react';
import { useContentState } from '@/lib/content-state';

interface ConditionalAdContainerProps {
  children: ReactNode;
  requiresResults?: boolean;
}

export default function ConditionalAdContainer({ 
  children, 
  requiresResults = true 
}: ConditionalAdContainerProps) {
  const { hasCalculatorResults, isContentLoaded } = useContentState();
  
  // Don't show ads until content is loaded
  if (!isContentLoaded) {
    return null;
  }
  
  // If this ad requires calculator results and we don't have them, don't show the ad
  if (requiresResults && !hasCalculatorResults) {
    return null;
  }
  
  // Otherwise, show the ad
  return <>{children}</>;
}
