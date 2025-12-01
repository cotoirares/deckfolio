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
    <SlideLayout className="justify-center">
       <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
       >
           <div className="space-y-6 md:space-y-8 text-left order-1">
               <h2 className="text-5xl md:text-8xl font-semibold tracking-tight text-foreground">let's talk.</h2>
               <p className="text-xl md:text-2xl text-gray-500 dark:text-zinc-400 font-light max-w-md leading-relaxed">
                   i'm always interested in working on new ideas. hit me up for collaborations.
               </p>
           </div>
           
           <div className="flex flex-col items-start md:items-end gap-6 md:gap-8 order-2">
             <div className="flex flex-col items-start md:items-center gap-6 w-full md:w-auto">
                 <motion.a 
                   href="mailto:hello@cotoirares.ro"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-5 rounded-full text-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg w-full md:w-auto justify-center md:justify-start"
                 >
                     <Mail size={24} />
                     <span>hello@cotoirares.ro</span>
                 </motion.a>

                 <div className="flex gap-6 justify-start md:justify-center w-full md:w-auto px-2 md:px-0">
                     {portfolioData.social.map((social, i) => {
                         const Icon = getIcon(social.name);
                         return (
                             <motion.a
                               key={i}
                               href={social.link}
                               target="_blank"
                               rel="noopener noreferrer"
                               whileHover={{ y: -5, color: theme === 'dark' ? '#fff' : '#000' }}
                               className="text-gray-400 dark:text-zinc-500 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
                               aria-label={social.name}
                             >
                                 <Icon size={28} strokeWidth={1.5} />
                             </motion.a>
                         );
                     })}
                 </div>
             </div>
           </div>
       </motion.div>
        
        <div className="absolute bottom-8 left-6 md:left-12 text-gray-300 dark:text-zinc-600 text-sm">
            designed by rares. built with next.js.
        </div>
    </SlideLayout>
  );
};
