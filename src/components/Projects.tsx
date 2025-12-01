"use client";

import React, { useRef } from "react";
import { SlideLayout } from "./SlideLayout";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, ArrowRight, ChevronRight, ChevronLeft, Globe, Smartphone, Code, Layers } from "lucide-react";

const getProjectIcon = (category: string) => {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes("mobile")) return <Smartphone size={22} strokeWidth={1.5} />;
  if (lowerCat.includes("wordpress")) return <Layers size={22} strokeWidth={1.5} />;
  if (lowerCat.includes("web")) return <Globe size={22} strokeWidth={1.5} />;
  return <Code size={22} strokeWidth={1.5} />;
};

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <SlideLayout className="items-start justify-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 md:mb-12 w-full flex justify-between items-end"
      >
        <div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-2 text-foreground">selected work.</h2>
          <p className="text-xl text-gray-500 dark:text-zinc-400">web & mobile experiences</p>
        </div>
        
        <div className="hidden md:flex gap-4">
           <button 
             onClick={() => scroll("left")}
             className="w-12 h-12 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
             aria-label="Scroll left"
           >
             <ChevronLeft size={20} />
           </button>
           <button 
             onClick={() => scroll("right")}
             className="w-12 h-12 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
             aria-label="Scroll right"
           >
             <ChevronRight size={20} />
           </button>
        </div>
      </motion.div>

      <div className="relative w-screen md:w-full left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0">
        <div 
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 w-full pb-12 pt-4 pl-6 pr-16 md:px-0 no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%-40px),transparent)]"
            style={{ scrollBehavior: "smooth" }}
        >
            {portfolioData.projects.map((project, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="snap-center shrink-0 w-[85vw] md:w-[45%] lg:w-[32%]"
            >
                <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between min-h-[320px]"
                >
                <div>
            <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-300 group-hover:scale-110">
                    <div className="text-zinc-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {getProjectIcon(project.category)}
                    </div>
                </div>
                <ExternalLink className="text-zinc-400 dark:text-zinc-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
            </div>

                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-zinc-900 dark:text-white">{project.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-4 font-light line-clamp-3">{project.description}</p>
                </div>
                <div className="text-sm text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">{project.category}</div>
                </a>
            </motion.div>
            ))}
            
            <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="snap-center shrink-0 w-[85vw] md:w-[25%] flex items-center justify-center"
            >
                <div className="text-center p-8">
                    <p className="text-zinc-400 mb-4">discover more work</p>
                    <a href="https://www.github.com/cotoirares" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all">
                        <span>github</span>
                        <ArrowRight size={18} />
                    </a>
                </div>
            </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
