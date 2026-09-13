"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollFollowProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Positive = moves up faster, Negative = lags behind (parallax)
  direction?: "vertical" | "horizontal" | "both";
  rotate?: boolean;
  offset?: [string, string];
}

/**
 * Skiper19-inspired Scroll Follow Container
 * Gives visual elements a smooth, damped scroll-following reaction.
 */
export const ScrollFollow = ({
  children,
  className,
  speed = 25,
  direction = "vertical",
  rotate = false,
  offset = ["start end", "end start"],
}: ScrollFollowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const rawX = useTransform(scrollYProgress, [0, 1], [-speed * 0.5, speed * 0.5]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  // Spring damping for high-end organic fluidity
  const y = useSpring(rawY, { stiffness: 120, damping: 20 });
  const x = useSpring(rawX, { stiffness: 120, damping: 20 });
  const r = useSpring(rawRotate, { stiffness: 120, damping: 20 });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y: direction === "vertical" || direction === "both" ? y : 0,
        x: direction === "horizontal" || direction === "both" ? x : 0,
        rotate: rotate ? r : 0,
      }}
      className={cn("block w-full transform-gpu will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
};

/**
 * Skiper19-inspired Scroll Stroke Connector
 * An ambient SVG stroke that draws progressively as the user scrolls through a container or section.
 */
export const ScrollFollowStroke = ({
  className,
  strokeColor = "rgba(255, 255, 255, 0.35)",
  strokeWidth = 2,
  height = 200,
}: {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  height?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.2"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  const smoothPathLength = useSpring(pathLength, { stiffness: 100, damping: 22 });

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none select-none overflow-visible", className)}
      aria-hidden="true"
    >
      <svg
        width="24"
        height={height}
        viewBox={`0 0 24 ${height}`}
        fill="none"
        className="overflow-visible"
      >
        {/* Background track line */}
        <path
          d={`M12 0 C20 ${height * 0.25}, 4 ${height * 0.75}, 12 ${height}`}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth={strokeWidth}
          strokeDasharray="4 4"
        />

        {/* Animated progressive follow stroke */}
        <motion.path
          d={`M12 0 C20 ${height * 0.25}, 4 ${height * 0.75}, 12 ${height}`}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            pathLength: smoothPathLength,
          }}
        />

        {/* Floating pulse point at the head of the stroke */}
        <motion.circle
          cx="12"
          cy={useTransform(smoothPathLength, [0, 1], [0, height])}
          r="3"
          fill={strokeColor}
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

export default ScrollFollow;
