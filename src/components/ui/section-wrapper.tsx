"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id: string;
}

const SectionWrapper = ({
  id,
  className,
  children,
  ...props
}: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative w-full py-16 md:py-24 px-4 md:px-8", className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
