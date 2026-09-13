"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { config } from "@/data/config";
import { Button } from "../ui/button";
import { MagneticButton } from "../ui/magnetic-button";
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { title: "About", href: "#about" },
  { title: "Skills", href: "#skills" },
  { title: "Projects", href: "#projects" },
  { title: "Education", href: "#education" },
  { title: "Experience", href: "#experience" },
  { title: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#030303]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/80 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="#hero"
          className="group flex items-center gap-2.5 text-white font-display font-bold text-lg md:text-xl tracking-tight"
        >
          <span className="w-8 h-8 rounded-lg bg-[#0e0e11] border border-white/20 flex items-center justify-center text-white group-hover:border-white/50 transition-colors font-mono text-xs font-bold shadow-sm shadow-black">
            SS
          </span>
          <span className="tracking-tight">
            {config.author}
            <span className="text-zinc-500 font-mono ml-1 text-xs">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation in Storm Charcoal Capsule */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0a0a0d]/85 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="px-3.5 py-1 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link href={config.social.github} target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="icon"
              aria-label="GitHub Profile"
              className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg"
            >
              <Github className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={config.social.linkedin} target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="icon"
              aria-label="LinkedIn Profile"
              className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg"
            >
              <Linkedin className="w-4 h-4" />
            </Button>
          </Link>
          <MagneticButton strength={0.25}>
            <Link href="#contact">
              <Button
                size="sm"
                className="ml-2 gap-1.5 rounded-full px-4 text-xs font-semibold bg-white text-black hover:bg-zinc-200 border border-white/30 shadow-sm"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
            className="rounded-lg text-zinc-300 hover:text-white hover:bg-white/10"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#030303]/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl transition-all duration-300 max-h-[calc(100vh-60px)] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-medium text-zinc-200 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.title}</span>
                <span className="text-xs text-zinc-500 font-mono">→</span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 mt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-around gap-2">
              <Link
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full gap-2 text-xs bg-[#0c0c0e] border-white/15 text-zinc-200"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </Button>
              </Link>
              <Link
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full gap-2 text-xs bg-[#0c0c0e] border-white/15 text-zinc-200"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </Button>
              </Link>
            </div>
            <Link href="#contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full gap-2 text-sm bg-white text-black hover:bg-zinc-200 font-semibold">
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
