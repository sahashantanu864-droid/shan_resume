"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Github, ArrowUpRight } from "lucide-react";
import { config } from "@/data/config";

export interface MagneticButtonProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  disabled?: boolean;
}

/**
 * Aceternity UI Magnetic Button - Storm Aesthetic
 * Attracts the wrapped element toward the cursor with physics-based spring return.
 */
export const MagneticButton = ({
  children,
  className,
  strength = 0.35,
  stiffness = 150,
  damping = 15,
  mass = 0.1,
  disabled = false,
  ...props
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness, damping, mass };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    mouseX.set(middleX * strength);
    mouseY.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Aceternity UI Styled Follow Button - Storm Aesthetic
 * Deep charcoal obsidian base with hairline silver border and lightning reflection on hover.
 */
export const MagneticFollowButton = ({
  className,
  label = "Follow @sahashantanu864-droid",
  href = config.social.github,
}: {
  className?: string;
  label?: string;
  href?: string;
}) => {
  return (
    <MagneticButton strength={0.35}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-zinc-100",
          "bg-[#0e0e11] border border-white/15 ring-1 ring-white/5 ring-inset shadow-md shadow-black/80",
          "transition-all duration-200 hover:border-white/40 hover:bg-[#18181c] hover:text-white hover:shadow-white/5 active:scale-[0.98] text-sm",
          className
        )}
      >
        <Github className="w-4 h-4 text-zinc-200" />
        <span>{label}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
      </Link>
    </MagneticButton>
  );
};

export default MagneticButton;
