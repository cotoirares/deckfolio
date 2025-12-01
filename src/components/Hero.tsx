"use client";

import React from "react";
import { SlideLayout } from "./SlideLayout";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export const Hero = () => {
  const { greeting, name, title, description } = portfolioData.hero;

  return (
    <SlideLayout className="items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="mb-8 relative"
      >
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-6xl shadow-sm mx-auto overflow-hidden transition-colors duration-500">
          <span role="img" aria-label="animoji">👨🏻‍💻</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-5xl md:text-8xl font-semibold tracking-tight mb-4 text-foreground"
      >
        {greeting} <span className="text-gray-400 dark:text-zinc-500 font-normal">i'm {name}.</span>
      </motion.h1>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium mb-6"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="text-xl text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed"
      >
        {description}
      </motion.p>
    </SlideLayout>
  );
};
