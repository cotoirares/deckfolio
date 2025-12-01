"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [showQuote, setShowQuote] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    if (newTheme === "dark") {
      setShowQuote(true);
      setTimeout(() => setShowQuote(false), 4000);
    } else {
      setShowQuote(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <motion.button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-zinc-800 shadow-xl flex items-center justify-center border border-zinc-700 transition-colors hover:scale-105 active:scale-95"
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {resolvedTheme === "dark" ? (
              <Sun size={20} className="text-white" />
            ) : (
              <Moon size={20} className="text-white" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-24 right-8 z-40 max-w-xs md:max-w-md pointer-events-none"
          >
            <div className="bg-zinc-900/90 backdrop-blur text-white p-4 rounded-2xl shadow-2xl border border-zinc-800">
              <p className="font-light italic text-sm md:text-base leading-relaxed">
                "i like dark mode too, because my code is the only thing that should shine."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
