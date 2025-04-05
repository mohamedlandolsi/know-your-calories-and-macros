"use client";

import { useLanguage, languages } from '@/lib/i18n';
import Head from 'next/head';

export function LanguageMetadata() {
  const { language } = useLanguage();
  const baseUrl = 'https://know-your-calories-and-macros.vercel.app';
  
  return (
    <Head>
      <link rel="canonical" href={`${baseUrl}/${language}`} />
      {Object.keys(languages).map((lang) => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang} 
          href={`${baseUrl}/${lang}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
    </Head>
  );
}
