"use client"

import NutritionCalculator from "@/components/nutrition/calculator";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { JsonLd } from "@/components/seo/json-ld";
import AdBanner from "@/components/ads/ad-banner";

export default function Home() {
  const { t } = useLanguage();
  
  // Structured data for the calculator
  const calculatorJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t("appName"),
    "description": t("appDescription"),
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "url": "https://know-your-calories-and-macros.vercel.app",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Calculate daily calorie needs",
      "Calculate macronutrient ratios",
      "Support for weight loss, maintenance, and muscle gain goals",
      "Personalized nutrition recommendations"
    ]
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      <JsonLd data={calculatorJsonLd} />
      <div className="w-full max-w-6xl mx-auto">
        <Header />
        
        {/* Top ad banner before calculator */}
        <AdBanner 
          slot="5486274173" 
          format="horizontal" 
          className="mb-8" 
        />
        
        <motion.div 
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <NutritionCalculator />
        </motion.div>
        
        {/* Bottom ad banner after calculator */}
        <AdBanner 
          slot="8293141276" 
          format="rectangle" 
          className="mt-8 max-w-4xl mx-auto" 
        />
        
        <Footer />
      </div>
    </main>
  );
}
