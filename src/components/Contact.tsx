"use client";

import React from "react";
import { SlideLayout } from "./SlideLayout";
import { motion } from "framer-motion";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";

export const Contact = () => {
  const { theme } = useTheme();
  
  const getIcon = (name: string) => {
    switch (name) {
      case "GitHub": return Github;
      case "Twitter": return Twitter;
      case "LinkedIn": return Linkedin;
      default: return Github;
    }
  };

  return (
    <SlideLayout className="items-center justify-center text-center">
       <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
       >
           <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground">let's talk.</h2>
           <p className="text-2xl text-gray-500 dark:text-zinc-400 font-light max-w-xl mx-auto">
               i'm always interested in working on new ideas. hit me up for collaborations.
           </p>
           
           <motion.a 
             href="mailto:hello@cotoirares.ro"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
           >
               <Mail size={20} />
               <span>hello@cotoirares.ro</span>
           </motion.a>

           <div className="flex gap-6 justify-center pt-12">
               {portfolioData.social.map((social, i) => {
                   const Icon = getIcon(social.name);
                   return (
                       <motion.a
                         key={i}
                         href={social.link}
                         target="_blank"
                         rel="noopener noreferrer"
                         whileHover={{ y: -5, color: theme === 'dark' ? '#fff' : '#000' }}
                         className="text-gray-400 dark:text-zinc-500 transition-colors"
                         aria-label={social.name}
                       >
                           <Icon size={28} />
                       </motion.a>
                   );
               })}
           </div>
       </motion.div>
        
        <div className="absolute bottom-8 text-gray-300 dark:text-zinc-600 text-sm">
            designed by rares. built with next.js.
        </div>
    </SlideLayout>
  );
};
