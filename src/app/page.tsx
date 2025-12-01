"use client";

import { Deck } from "@/components/Deck";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Books } from "@/components/Books";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  const slides = [
    <Hero key="hero" />,
    <Projects key="projects" />,
    <Experience key="experience" />,
    <Books key="books" />,
    <Contact key="contact" />,
  ];

  return <Deck slides={slides} />;
}
