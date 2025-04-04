"use client"

import { ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "./theme/theme-toggle"

export function Header() {
  return (
    <header className="flex justify-between w-full max-w-6xl mx-auto mb-8 md:mb-12">
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ThumbsUp className="h-6 w-6 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Know Your Calories and Macros</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ThemeToggle />
      </motion.div>
    </header>
  )
}