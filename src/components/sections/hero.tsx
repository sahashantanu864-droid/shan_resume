"use client";

import React from "react";
import Link from "next/link";
import { config } from "@/data/config";
import { Button } from "../ui/button";
import { MagneticButton, MagneticFollowButton } from "../ui/magnetic-button";
import { ScrollText } from "../ui/scroll-text";
import { ScrollFollow, ScrollFollowStroke } from "../ui/scroll-follow";
import { TextFlippingBoard } from "../ui/text-flipping-board";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[94vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 md:px-8 overflow-hidden bg-transparent"
    >
      {/* Skiper19 Ambient Storm Stroke */}
      <div className="hidden lg:block absolute right-8 top-1/4 opacity-25 pointer-events-none">
        <ScrollFollowStroke height={320} strokeWidth={2} strokeColor="rgba(255,255,255,0.4)" />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Availability Badge in Pitch-Black Storm Capsule */}
        <ScrollFollow speed={-10} className="w-auto">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium border border-white/15 bg-[#09090b]/80 backdrop-blur-md mb-6 shadow-sm shadow-black"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-300 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-200"></span>
            </span>
            <span className="text-zinc-200 font-sans font-medium">
              Available for Opportunities
            </span>
            <span className="text-zinc-600">•</span>
            <span className="inline-flex items-center gap-1 text-zinc-400">
              <MapPin className="w-3 h-3 text-zinc-300" />
              {config.location}
            </span>
          </motion.div>
        </ScrollFollow>

        {/* Main Name Heading: Strong, Clean Cinematic White Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight text-white leading-[1.05] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Shantanu <span className="text-zinc-300 inline-block">Saha</span>
          </h1>
        </motion.div>

        {/* Horizontal Mechanical Split-Flap Typography Board */}
        <div className="mb-6 w-full max-w-3xl mx-auto flex justify-center">
          <TextFlippingBoard
            phrases={[
              "FULL-STACK DEVELOPER",
              "PYTHON BACKEND ENGINEER",
              "GEOSPATIAL & REST ARCHITECT",
              "DISTRIBUTED SYSTEMS BUILDER",
            ]}
          />
        </div>

        {/* Professional Statement: Natural Horizontal Paragraph Flow */}
        <div className="w-full max-w-3xl mx-auto mb-10 px-2 sm:px-4">
          <ScrollText
            as="p"
            offset={["start 0.92", "start 0.55"]}
            className="w-full text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-sans text-center"
          >
            Focused on building high-performance Python backend architectures, scalable REST APIs, robust databases, and modern full-stack web applications that solve practical, real-world problems.
          </ScrollText>
        </div>

        {/* Call to Action Buttons - Storm Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-12 w-full sm:w-auto"
        >
          {/* View Projects Button (Primary CTA: Pure White with Pitch Black Text) */}
          <MagneticButton strength={0.25} className="w-full sm:w-auto">
            <Link href="#projects" className="w-full sm:w-auto block">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 rounded-xl text-sm font-semibold bg-white text-black hover:bg-zinc-200 border border-white/30 shadow-lg shadow-black/80 hover:shadow-white/10 transition-all"
              >
                <Code2 className="w-4 h-4" />
                <span>View Projects</span>
              </Button>
            </Link>
          </MagneticButton>

          {/* Aceternity UI Magnetic Follow Button in Storm Obsidian */}
          <MagneticFollowButton
            href={config.social.github}
            label="Follow @sahashantanu864-droid"
            className="w-full sm:w-auto justify-center py-2.5 px-4 rounded-xl text-sm"
          />

          {/* LinkedIn Button (Storm Obsidian Outline) */}
          <MagneticButton strength={0.2} className="w-full sm:w-auto">
            <Link
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto block"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 rounded-xl text-sm font-medium bg-[#0c0c0e] border border-white/15 text-zinc-100 hover:border-white/40 hover:bg-[#16161a] hover:text-white transition-all shadow-md shadow-black"
              >
                <Linkedin className="w-4 h-4 text-zinc-300" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </Button>
            </Link>
          </MagneticButton>

          {/* Contact Me Button */}
          <MagneticButton strength={0.2} className="w-full sm:w-auto">
            <Link href="#contact" className="w-full sm:w-auto block">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 rounded-xl text-sm font-medium bg-[#0c0c0e] border border-white/15 text-zinc-100 hover:border-white/40 hover:bg-[#16161a] hover:text-white transition-all shadow-md shadow-black"
              >
                <Mail className="w-4 h-4 text-zinc-300" />
                <span>Contact Me</span>
              </Button>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Quick Tech Highlight Pills: Horizontal Storm Charcoal Capsules */}
        <ScrollFollow speed={8} className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-white/10 max-w-xl mx-auto text-xs text-zinc-400"
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mr-1">
              Core Focus:
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#0b0b0e] border border-white/10 text-zinc-200 font-mono">
              Python & FastAPI
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#0b0b0e] border border-white/10 text-zinc-200 font-mono">
              PostGIS & SQL
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#0b0b0e] border border-white/10 text-zinc-200 font-mono">
              React & TypeScript
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#0b0b0e] border border-white/10 text-zinc-200 font-mono">
              Docker & REST
            </span>
          </motion.div>
        </ScrollFollow>
      </div>

      {/* Scroll Down Indicator in Storm Silver */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
