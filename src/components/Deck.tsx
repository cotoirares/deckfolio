"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface DeckProps {
  slides: React.ReactNode[];
}

export const Deck: React.FC<DeckProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < slides.length && !isAnimating) {
        setIsAnimating(true);
        setActiveIndex(index);
        setTimeout(() => setIsAnimating(false), 800);
      }
    },
    [slides.length, isAnimating]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          goToSlide(activeIndex + 1);
        } else {
          goToSlide(activeIndex - 1);
        }
      }
    },
    [activeIndex, goToSlide]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        goToSlide(activeIndex + 1);
      } else if (e.key === "ArrowUp") {
        goToSlide(activeIndex - 1);
      }
    },
    [activeIndex, goToSlide]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);

  return (
    <div className="h-screen w-full overflow-hidden bg-background relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="h-full w-full absolute top-0 left-0 flex items-center justify-center"
        >
          {slides[activeIndex]}
        </motion.div>
      </AnimatePresence>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === activeIndex 
                ? "bg-foreground scale-125" 
                : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-500"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeIndex === 0 && (
           <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce"
           >
             <ChevronDown size={24} />
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
