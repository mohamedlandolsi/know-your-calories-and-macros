"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="mt-12 mb-8 w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="border-t border-border pt-6">
          <div className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} Know Your Calories and Macros
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
