"use client"

import { useLanguage, Language, languages } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative overflow-hidden">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, langData]) => (
          <DropdownMenuItem 
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={`flex items-center gap-2 ${language === code ? 'font-bold bg-secondary/30' : ''}`}
          >
            <div className="w-6 h-6 overflow-hidden rounded-sm flex-shrink-0">
              {langData.flagImg ? (
                <Image 
                  src={langData.flagImg} 
                  alt={`${langData.name} flag`} 
                  width={24} 
                  height={24}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-lg" role="img" aria-label={`${langData.name} flag`}>
                  {langData.flag}
                </span>
              )}
            </div>
            <span>{langData.name}</span>
            {language === code && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
