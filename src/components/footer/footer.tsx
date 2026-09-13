"use client";

import React from "react";
import Link from "next/link";
import { config } from "@/data/config";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-white/10 bg-[#030303]/90 backdrop-blur-md py-12 px-4 md:px-8 mt-20 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <span className="font-display font-bold text-lg text-white tracking-tight">
            {config.author}
          </span>
          <p className="text-xs text-zinc-400 font-mono">
            {config.headline} • Nashik, India
          </p>
          <p className="text-[11px] text-zinc-600 mt-1">
            © {new Date().getFullYear()} {config.author}. All rights reserved.
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-2">
          <Link
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-zinc-400 hover:text-white hover:bg-white/10">
              <Github className="w-4 h-4" />
            </Button>
          </Link>
          <Link
            href={config.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-zinc-400 hover:text-white hover:bg-white/10">
              <Linkedin className="w-4 h-4 text-zinc-300" />
            </Button>
          </Link>
          <a href={`mailto:${config.email}`} aria-label="Email">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-zinc-400 hover:text-white hover:bg-white/10">
              <Mail className="w-4 h-4" />
            </Button>
          </a>
        </div>

        {/* Right: Back to top button */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="gap-2 rounded-full text-xs font-mono border-white/15 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
