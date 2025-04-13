import { createContext, useContext } from 'react';

export type ContentState = {
  hasCalculatorResults: boolean;
  setHasCalculatorResults: (value: boolean) => void;
  isContentLoaded: boolean;
  setIsContentLoaded: (value: boolean) => void;
};

export const ContentStateContext = createContext<ContentState | undefined>(undefined);

export const useContentState = () => {
  const context = useContext(ContentStateContext);
  if (!context) {
    throw new Error('useContentState must be used within a ContentStateProvider');
  }
  return context;
};
