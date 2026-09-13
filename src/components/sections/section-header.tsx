"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollText } from "../ui/scroll-text";
import { ScrollFollow } from "../ui/scroll-follow";

interface SectionHeaderProps {
  id: string;
  badge?: string;
  title: string | ReactNode;
  desc?: string;
  className?: string;
  align?: "center" | "left";
}

export const SectionHeader = ({
  id,
  badge,
  title,
  desc,
  className,
  align = "center",
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "w-full mb-12 md:mb-16 flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && (
        <ScrollFollow speed={-6} className="w-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-[#0d0d10] text-zinc-300 border border-white/15 shadow-sm shadow-black">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
            {badge}
          </span>
        </ScrollFollow>
      )}

      <Link href={`#${id}`} className="group inline-block">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-display text-white group-hover:text-zinc-300 transition-colors">
          {title}
        </h2>
      </Link>

      {desc && (
        <div className={cn("w-full max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
          <ScrollText
            as="p"
            offset={["start 0.95", "start 0.55"]}
            className={cn(
              "w-full text-sm sm:text-base text-zinc-400 leading-relaxed font-sans",
              align === "center" ? "text-center" : "text-left"
            )}
          >
            {desc}
          </ScrollText>
        </div>
      )}

      <div
        className={cn(
          "w-16 h-1 rounded-full bg-gradient-to-r from-white/60 via-white/20 to-transparent mt-1",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
};

export default SectionHeader;
