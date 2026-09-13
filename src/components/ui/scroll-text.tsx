"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollTextProps {
  children: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  containerClassName?: string;
  offset?: [string, string];
  lineClassName?: string;
  stagger?: number;
}

interface LineProps {
  words: string[];
  index: number;
  totalLines: number;
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
  lineClassName?: string;
}

const AnimatedLine = ({
  words,
  index,
  totalLines,
  scrollYProgress,
  shouldReduceMotion,
  lineClassName,
}: LineProps) => {
  // Stagger the progress window for each line
  const segment = totalLines > 1 ? 0.6 / totalLines : 0.5;
  const start = Math.min(index * segment, 0.45);
  const end = Math.min(start + 0.45, 1);

  const y = useTransform(
    scrollYProgress,
    [start, end],
    shouldReduceMotion ? ["0%", "0%"] : ["100%", "0%"]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [start, end],
    shouldReduceMotion ? [0, 0] : [20, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    shouldReduceMotion ? [1, 1] : [0.15, 1]
  );

  return (
    <span className="block w-full overflow-hidden py-0.5" style={{ perspective: "1000px" }}>
      <motion.span
        className={cn("inline-block transform-gpu origin-bottom will-change-transform", lineClassName)}
        style={{
          y,
          rotateX,
          opacity,
        }}
      >
        {words.join(" ")}
      </motion.span>
    </span>
  );
};

/**
 * Skiper31-inspired Responsive Line-by-Line Scroll Animation
 * Guarantees natural horizontal paragraph flow.
 * Measures visual lines based on responsive container width without collapsing or stacking.
 */
export const ScrollText = ({
  children,
  className,
  as: Component = "p",
  containerClassName,
  offset = ["start 0.92", "start 0.45"],
  lineClassName,
}: ScrollTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [lines, setLines] = useState<string[][]>([]);
  const [isMeasured, setIsMeasured] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  const words = React.useMemo(() => {
    return children.trim().split(/\s+/).filter(Boolean);
  }, [children]);

  const measureLines = useCallback(() => {
    if (!wordsContainerRef.current) return;
    const wordSpans = wordsContainerRef.current.querySelectorAll<HTMLSpanElement>("[data-word-idx]");
    if (wordSpans.length === 0) return;

    const newLines: string[][] = [];
    let currentLine: string[] = [];
    let lastTop: number | null = null;

    wordSpans.forEach((span, idx) => {
      const rect = span.getBoundingClientRect();
      const top = Math.round(rect.top);

      // Same visual line if vertical offset is within 6px threshold
      if (lastTop === null || Math.abs(top - lastTop) <= 6) {
        currentLine.push(words[idx]);
      } else {
        newLines.push(currentLine);
        currentLine = [words[idx]];
      }
      lastTop = top;
    });

    if (currentLine.length > 0) {
      newLines.push(currentLine);
    }

    setLines(newLines);
    setIsMeasured(true);
  }, [words]);

  useEffect(() => {
    // Initial measurement
    measureLines();

    if (!containerRef.current) return;
    let lastWidth = Math.round(containerRef.current.getBoundingClientRect().width);

    // Re-measure ONLY when container WIDTH changes (e.g. window resize/orientation)
    // Never re-measure on height changes to eliminate any cyclic collapse
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = Math.round(entry.contentRect.width);
        if (newWidth > 0 && Math.abs(newWidth - lastWidth) >= 6) {
          lastWidth = newWidth;
          measureLines();
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [measureLines]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full block relative", containerClassName)}
      style={{ width: "100%" }}
    >
      {/* Invisible measurement container: mirrors exact width & typography without breaking flow */}
      <div
        ref={wordsContainerRef}
        aria-hidden="true"
        className={cn(
          "w-full invisible absolute pointer-events-none top-0 left-0 select-none leading-relaxed",
          className
        )}
        style={{ width: "100%" }}
      >
        {words.map((word, idx) => (
          <React.Fragment key={idx}>
            <span data-word-idx={idx} className="inline-block">
              {word}
            </span>
            {idx < words.length - 1 ? " " : ""}
          </React.Fragment>
        ))}
      </div>

      {/* Rendered View */}
      {isMeasured && lines.length > 0 ? (
        <Component
          className={cn("w-full leading-relaxed", className)}
          aria-label={children}
          style={{ width: "100%" }}
        >
          {lines.map((lineWords, lineIdx) => (
            <AnimatedLine
              key={lineIdx}
              words={lineWords}
              index={lineIdx}
              totalLines={lines.length}
              scrollYProgress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
              lineClassName={lineClassName}
            />
          ))}
        </Component>
      ) : (
        /* SSR & Pre-measurement fallback: 100% natural horizontal text flow */
        <Component
          className={cn("w-full leading-relaxed", className)}
          style={{ width: "100%" }}
        >
          {children}
        </Component>
      )}
    </div>
  );
};

export default ScrollText;
