"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface DeckProps {
  slides: React.ReactNode[];
}

export const Deck: React.FC<DeckProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);

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
      let target = e.target as HTMLElement;
      let isScrollable = false;

      while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && target.scrollHeight > target.clientHeight) {
          if (e.deltaY > 0) { // scrolling down
             if (target.scrollTop + target.clientHeight < target.scrollHeight - 1) {
               isScrollable = true;
             }
          } else { // scrolling up
             if (target.scrollTop > 0) {
               isScrollable = true;
             }
          }
          if (isScrollable) break;
        }
        if (target.parentElement) target = target.parentElement;
        else break;
      }

      if (isScrollable) return;

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

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (touchStartY.current === null || touchStartTime.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const timeElapsed = Date.now() - touchStartTime.current;
    const velocity = Math.abs(deltaY) / timeElapsed;
    const isFastSwipe = velocity > 0.5;
    const minSwipeDistance = 50;

    if (Math.abs(deltaY) < minSwipeDistance) return;

    let target = e.target as HTMLElement;
    let scrollableParent: HTMLElement | null = null;

    while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && target.scrollHeight > target.clientHeight) {
            scrollableParent = target;
            break;
        }
        if (target.parentElement) target = target.parentElement;
        else break;
    }

    if (scrollableParent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableParent;
        if (deltaY > 0) { 
            if (scrollTop + clientHeight >= scrollHeight - 1 && isFastSwipe) {
                goToSlide(activeIndex + 1);
            }
        } else {
            if (scrollTop <= 0 && isFastSwipe) {
                goToSlide(activeIndex - 1);
            }
        }
    } else {
        if (deltaY > 0) {
            goToSlide(activeIndex + 1);
        } else {
            goToSlide(activeIndex - 1);
        }
    }
    
    touchStartY.current = null;
    touchStartTime.current = null;
  }, [activeIndex, goToSlide]);

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
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd]);

  return (
    <div className="h-screen w-full overflow-hidden bg-background relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="h-full w-full absolute top-0 left-0 flex items-center justify-center"
        >
          {slides[activeIndex]}
        </motion.div>
      </AnimatePresence>

      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
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
              transition={{ delay: 0.5, duration: 0.3 }}
              className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce"
           >
             <ChevronDown size={24} />
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
