"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextFlippingBoardProps {
  phrases?: string[];
  interval?: number;
  className?: string;
  charClassName?: string;
}

const DEFAULT_PHRASES = [
  "FULL-STACK DEVELOPER",
  "PYTHON BACKEND ENGINEER",
  "GEOSPATIAL & REST ARCHITECT",
  "DISTRIBUTED SYSTEMS BUILDER",
];

const flapVariants: Variants = {
  initial: {
    rotateX: -90,
    opacity: 0,
    y: -4,
  },
  animate: (i: number) => ({
    rotateX: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      delay: i * 0.018,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  exit: (i: number) => ({
    rotateX: 90,
    opacity: 0,
    y: 4,
    transition: {
      duration: 0.2,
      delay: i * 0.01,
      ease: [0.36, 0, 0.66, -0.56] as const,
    },
  }),
};

const FlapChar = ({
  char,
  index,
  charClassName,
}: {
  char: string;
  index: number;
  charClassName?: string;
}) => {
  const isSpace = char === " ";

  if (isSpace) {
    return <span className="w-1.5 sm:w-2 md:w-3 inline-block" aria-hidden="true" />;
  }

  return (
    <motion.div
      custom={index}
      variants={flapVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "relative inline-flex items-center justify-center select-none overflow-hidden rounded-[3px] sm:rounded-[4px] mx-[1px]",
        "w-3.5 h-5 sm:w-4.5 sm:h-7 md:w-5.5 md:h-8 lg:w-6 lg:h-9",
        "bg-[#0a0a0c] border border-white/15 shadow-sm shadow-black",
        charClassName
      )}
      style={{ perspective: "500px", transformStyle: "preserve-3d" }}
    >
      {/* Horizontal mechanical flap split line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-black/90 z-20 pointer-events-none" />
      <div className="absolute top-[calc(50%+1px)] left-0 right-0 h-px bg-white/15 z-20 pointer-events-none" />

      {/* Top half subtle gradient sheen */}
      <div className="absolute top-0 left-0 right-0 bottom-1/2 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none z-10" />

      <span className="font-mono font-bold text-[10px] sm:text-xs md:text-sm lg:text-base text-zinc-100 z-10 block tracking-tight">
        {char}
      </span>
    </motion.div>
  );
};

/**
 * TextFlippingBoard - Cinematic Mechanical Storm Style
 * Cycles through portfolio titles with realistic split-flap mechanical animations.
 * Words are grouped into horizontal blocks to prevent vertical stacking.
 */
export const TextFlippingBoard = ({
  phrases = DEFAULT_PHRASES,
  interval = 3500,
  className,
  charClassName,
}: TextFlippingBoardProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % phrases.length);
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  const currentPhrase = phrases[currentIdx];
  const words = currentPhrase.split(" ");
  let globalCharIndex = 0;

  return (
    <div
      className={cn(
        "w-full max-w-4xl mx-auto flex items-center justify-center py-2 px-2 min-h-[44px] sm:min-h-[56px] md:min-h-[64px]",
        className
      )}
      aria-label={currentPhrase}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhrase}
          className="flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-3.5 gap-y-2"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {words.map((word, wordIdx) => {
            const wordChars = word.split("");
            return (
              <div
                key={wordIdx}
                className="inline-flex items-center whitespace-nowrap"
              >
                {wordChars.map((char) => {
                  const idx = globalCharIndex++;
                  return (
                    <FlapChar
                      key={idx}
                      char={char}
                      index={idx}
                      charClassName={charClassName}
                    />
                  );
                })}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextFlippingBoard;
