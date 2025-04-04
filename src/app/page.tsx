"use client"

import NutritionCalculator from "@/components/nutrition/calculator";
import { Header } from "@/components/header";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-6xl mx-auto">
        <Header />
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
      </div>
    </main>
  );
}
