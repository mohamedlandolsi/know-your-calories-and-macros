"use client";

import { Button } from "../ui/button";
import { useState } from "react";

export function SimpleLanguageSwitcher() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium">
        {language.toUpperCase()}
      </span>
    </Button>
  );
}
