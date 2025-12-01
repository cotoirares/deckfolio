"use client";

import React from "react";
import { SlideLayout } from "./SlideLayout";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Book, ArrowUpRight } from "lucide-react";

export const Books = () => {
  return (
    <SlideLayout className="justify-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-12 text-left"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-2 text-foreground">published.</h2>
        <p className="text-xl text-gray-500 dark:text-zinc-400">books i contributed to.</p>
      </motion.div>

      <div className="space-y-6 max-w-3xl mx-auto md:mx-0">
        {portfolioData.books.map((book, index) => (
          <motion.a
            key={index}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
            className="flex items-start gap-6 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-colors duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="text-blue-500" size={20} />
            </div>

            <div className="hidden md:flex flex-shrink-0 w-16 h-24 bg-white dark:bg-zinc-800 rounded shadow-sm items-center justify-center border border-zinc-100 dark:border-zinc-700 group-hover:border-blue-200 dark:group-hover:border-blue-900 transition-colors relative">
                <div className="absolute left-1 top-1 bottom-1 w-0.5 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                <Book className="text-zinc-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors" size={24} strokeWidth={1.5} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-zinc-900 dark:text-white pr-8 leading-tight mb-2">
                {book.title}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                 <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-100 dark:border-blue-800">
                    {book.year}
                 </span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed text-sm">
                {book.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </SlideLayout>
  );
};
