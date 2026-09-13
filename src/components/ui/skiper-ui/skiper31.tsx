"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---
export type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  isAccent?: boolean;
};

export interface TechStackItem {
  name: string;
  label: string;
  iconPath: string;
  color: string;
}

export const CORE_TECH_STACK: TechStackItem[] = [
  {
    name: "python",
    label: "Python",
    iconPath: "/assets/logos/python-mono.svg",
    color: "#ffffff",
  },
  {
    name: "fastapi",
    label: "FastAPI",
    iconPath: "/assets/logos/fastapi-mono.svg",
    color: "#f4f4f5",
  },
  {
    name: "postgresql",
    label: "PostgreSQL",
    iconPath: "/assets/logos/postgresql-mono.svg",
    color: "#e4e4e7",
  },
  {
    name: "docker",
    label: "Docker",
    iconPath: "/assets/logos/docker-mono.svg",
    color: "#d4d4d8",
  },
  {
    name: "react",
    label: "React",
    iconPath: "/assets/logos/react-mono.svg",
    color: "#f4f4f5",
  },
  {
    name: "typescript",
    label: "TypeScript",
    iconPath: "/assets/logos/typescript-mono.svg",
    color: "#ffffff",
  },
  {
    name: "tailwind",
    label: "Tailwind CSS",
    iconPath: "/assets/logos/tailwind-css-mono.svg",
    color: "#e4e4e7",
  },
  {
    name: "git",
    label: "Git",
    iconPath: "/assets/logos/git-mono.svg",
    color: "#d4d4d8",
  },
];

// --- Bracket SVG adapted in storm aesthetic ---
export const Bracket = ({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={cn("shrink-0", flip && "scale-x-[-1]", className)}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

// --- Kinetic Character 3D Assembly Component - Storm Monochrome ---
export const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  isAccent = false,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0.05, 0.42],
    [distanceFromCenter * 24, 0]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0.05, 0.42],
    [distanceFromCenter * 14, 0]
  );
  const rotateY = useTransform(
    scrollYProgress,
    [0.05, 0.42],
    [-distanceFromCenter * 8, 0]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.02, 0.28],
    [0.2, 1]
  );

  return (
    <motion.span
      className={cn(
        "inline-block transform-gpu font-display font-black tracking-tight",
        isSpace ? "w-2 sm:w-3 md:w-4" : "",
        isAccent ? "text-white" : "text-zinc-300"
      )}
      style={{
        x,
        rotateX,
        rotateY,
        opacity,
      }}
    >
      {char}
    </motion.span>
  );
};

// --- Kinetic Tech Stack Logo Assembly Component - Pitch-Black Glass ---
export const TechIconV2 = ({
  item,
  index,
  centerIndex,
  scrollYProgress,
}: {
  item: TechStackItem;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0.28, 0.68],
    [distanceFromCenter * 36, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0.28, 0.68],
    [-Math.abs(distanceFromCenter) * 16, 0]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0.28, 0.68],
    [distanceFromCenter * 12, 0]
  );
  const scale = useTransform(scrollYProgress, [0.28, 0.68], [0.72, 1]);
  const opacity = useTransform(scrollYProgress, [0.22, 0.45], [0, 1]);

  return (
    <motion.div
      className="group relative inline-flex flex-col items-center justify-center transform-gpu mx-1 sm:mx-1.5"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        transformOrigin: "center",
      }}
    >
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl border border-white/15 bg-[#0a0a0d]/90 backdrop-blur-md shadow-lg shadow-black flex items-center justify-center p-2 sm:p-2.5 transition-all duration-200 group-hover:border-white/40 group-hover:scale-105"
      >
        <span
          role="img"
          aria-label={item.label}
          className="block w-full h-full bg-current text-white"
          style={{
            WebkitMaskImage: `url(${item.iconPath})`,
            maskImage: `url(${item.iconPath})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </div>
      <span className="text-[10px] sm:text-xs font-mono font-medium text-zinc-400 mt-1.5 opacity-0 sm:group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {item.label}
      </span>
    </motion.div>
  );
};

// --- Skiper31 Main Component - Pitch-Black Cinematic Storm ---
export const Skiper31 = ({
  headline = "ENGINEERING SCALABLE SYSTEMS",
  subheadline = "Integrated Full-Stack & Python Architecture",
  className,
}: {
  headline?: string;
  subheadline?: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const characters = headline.split("");
  const centerIndex = Math.floor(characters.length / 2);
  const iconCenterIndex = Math.floor(CORE_TECH_STACK.length / 2);

  const stageOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0, 1, 1, 0]
  );
  const stageScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.96, 1, 1, 0.96]
  );

  return (
    <section
      ref={containerRef}
      id="architecture-transition"
      className={cn(
        "relative w-full min-h-[160vh] bg-transparent border-y border-white/10 overflow-x-hidden",
        className
      )}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 pointer-events-auto select-none">
        <motion.div
          style={{ opacity: stageOpacity, scale: stageScale }}
          className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center py-8"
        >
          {/* Scroll Cue Badge in Storm Charcoal */}
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wider uppercase bg-[#0d0d10] text-zinc-300 border border-white/15 shadow-sm shadow-black">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
              Scroll Kinetic Interaction
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </div>

          {/* Part 1: Kinetic 3D Typography Convergence */}
          <div
            className="w-full max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2 text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight mb-8 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
            style={{ perspective: "600px" }}
            aria-label={headline}
          >
            {headline.split(" ").map((word, wordIdx, allWords) => {
              const prevOffset = allWords.slice(0, wordIdx).join(" ").length + (wordIdx > 0 ? 1 : 0);
              return (
                <span key={wordIdx} className="inline-flex items-center whitespace-nowrap">
                  {word.split("").map((char, charIdx) => {
                    const globalIdx = prevOffset + charIdx;
                    return (
                      <CharacterV1
                        key={globalIdx}
                        char={char}
                        index={globalIdx}
                        centerIndex={centerIndex}
                        scrollYProgress={scrollYProgress}
                        isAccent={globalIdx > 11}
                      />
                    );
                  })}
                </span>
              );
            })}
          </div>

          {/* Part 2: Tech Stack Header with Skiper Brackets */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.22, 0.45], [0, 1]),
            }}
            className="flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg font-medium tracking-tight text-zinc-400 mb-6"
          >
            <Bracket className="h-8 sm:h-10 text-zinc-600" />
            <span className="font-mono text-xs sm:text-sm md:text-base text-zinc-200 font-medium">
              {subheadline}
            </span>
            <Bracket className="h-8 sm:h-10 text-zinc-600" flip />
          </motion.div>

          {/* Part 3: 3D Converging Tech Stack Dock */}
          <div
            className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2 py-4"
            style={{ perspective: "600px" }}
          >
            {CORE_TECH_STACK.map((item, index) => (
              <TechIconV2
                key={item.name}
                item={item}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Bottom Progress Pulse */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.65, 0.85], [0, 1]),
            }}
            className="mt-8 flex items-center gap-2 text-xs font-mono text-zinc-500"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
            <span>Architecture Assembled • Continue Scrolling</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { ScrollText } from "../scroll-text";
export default Skiper31;
