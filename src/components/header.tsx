"use client";

import { Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme/theme-toggle";
import { LanguageSwitcher } from "./language/language-switcher";
import { useLanguage } from "@/lib/i18n";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mx-auto mb-8 md:mb-12 gap-4">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-primary/20 dark:bg-primary/30 p-2 rounded-lg">
          <Dumbbell className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent dark:from-primary dark:to-primary/80">
            {t('appName')}
          </h1>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-center gap-2"
      >
        <LanguageSwitcher />
        <ThemeToggle />
      </motion.div>
    </header>
  );
}
