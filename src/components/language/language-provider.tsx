"use client"

import React, { useState, useEffect } from 'react';
import { LanguageContext, Language, languages, translations, TranslationKey } from '@/lib/i18n';

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [dir, setDir] = useState<string>('ltr');
  
  // Update the document direction when language changes
  useEffect(() => {
    const newDir = languages[language].dir;
    setDir(newDir);
    document.documentElement.dir = newDir;
    document.documentElement.lang = language;
  }, [language]);
  
  // Function to get translation
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}
