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
  
  // Enable ads now that we have fixed the policy violation
  const showAds = true;
  
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
        
        {/* Desktop side ads - only shown when content is available */}
        {showAds && (
          <>
            <div className="fixed hidden xl:block z-10" style={{ 
              left: 'calc(50% - 700px)',
              maxWidth: '160px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}>
              <AdBanner 
                slot="5486274173" 
                format="vertical" 
                responsive={false} 
                className="w-[160px]"
                requiresResults={true}
              />
            </div>
            
            <div className="fixed hidden xl:block z-10" style={{
              right: 'calc(50% - 700px)',
              maxWidth: '160px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}>
              <AdBanner 
                slot="2913748569" 
                format="vertical" 
                responsive={false}
                className="w-[160px]"
                requiresResults={true}
              />
            </div>
          </>
        )}
        
        {/* Main content */}
        <div className="relative w-full max-w-4xl mx-auto">
          <motion.div 
            className="w-full"
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
          
          {/* Mobile-only bottom ad - only shown after calculator has results */}
          {showAds && (
            <div className="mt-8 xl:hidden">
              <AdBanner 
                slot="8293141276" 
                format="rectangle" 
                className="max-w-4xl mx-auto"
                requiresResults={true}
              />
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </main>
  );
}
