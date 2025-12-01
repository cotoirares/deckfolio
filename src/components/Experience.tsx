"use client";

import React from "react";
import { SlideLayout } from "./SlideLayout";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export const Experience = () => {
  return (
    <SlideLayout className="justify-center">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-4"
        >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4 text-foreground">my timeline.</h2>
            <p className="text-xl text-gray-500 dark:text-zinc-400 font-light leading-relaxed">
              a brief overview of my professional journey. <i>so far.</i>
            </p>
        </motion.div>

        <div className="md:col-span-8 space-y-12 relative pl-8 md:pl-0">
            <div className="absolute left-0 md:left-0 top-2 bottom-2 w-px bg-gray-200 dark:bg-zinc-800 md:hidden"></div>

            {portfolioData.experience.map((job, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.3 }}
                    className="relative"
                >
                    <div className="absolute -left-[33px] top-2 w-3 h-3 rounded-full bg-gray-300 dark:bg-zinc-700 md:hidden ring-4 ring-white dark:ring-black"></div>
                    
                    <div className="grid md:grid-cols-12 gap-4 md:gap-8">
                         <div className="md:col-span-3 text-gray-400 dark:text-zinc-500 font-medium pt-1">{job.period}</div>
                         <div className="md:col-span-9">
                             <h3 className="text-2xl font-semibold mb-1 text-foreground">{job.company}</h3>
                             <h4 className="text-lg text-blue-600 dark:text-blue-400 mb-3">{job.role}</h4>
                             <p className="text-gray-600 dark:text-zinc-400 font-light leading-relaxed">{job.description}</p>
                         </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </SlideLayout>
  );
};
