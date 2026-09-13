"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export { ScrollFollow, ScrollFollowStroke } from "../scroll-follow";

export const LinePath = ({
  className,
  scrollYProgress,
  strokeColor = "rgba(255, 255, 255, 0.35)",
}: {
  className?: string;
  scrollYProgress: MotionValue<number>;
  strokeColor?: string;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

  return (
    <svg
      width="600"
      height="1200"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258"
        stroke={strokeColor}
        strokeWidth="14"
        strokeLinecap="round"
        strokeOpacity="0.4"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};

export const Skiper19 = ({
  className,
}: {
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      <LinePath
        className="absolute left-1/2 -translate-x-1/2 top-0 opacity-60"
        scrollYProgress={scrollYProgress}
      />
    </div>
  );
};

export default Skiper19;
