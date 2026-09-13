"use client";

import React from "react";
import SectionWrapper from "../ui/section-wrapper";
import SectionHeader from "./section-header";
import { EDUCATION } from "@/data/education";
import { Card, CardContent } from "../ui/card";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollText } from "../ui/scroll-text";
import { ScrollFollow } from "../ui/scroll-follow";

export const EducationSection = () => {
  return (
    <SectionWrapper id="education">
      <SectionHeader
        id="education"
        badge="Academic Foundation"
        title="Education"
        desc="Undergraduate engineering curriculum emphasizing computing fundamentals, data structures, and distributed systems."
      />

      <div className="w-full max-w-3xl mx-auto">
        {EDUCATION.map((edu, index) => (
          <Card
            key={index}
            className="border border-white/10 bg-[#08080a]/90 hover:border-white/25 transition-all duration-300 shadow-xl backdrop-blur-md"
          >
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-start gap-4">
                  <ScrollFollow speed={-6} className="w-auto">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center shrink-0 text-white shadow-inner">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                  </ScrollFollow>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-zinc-300 font-mono mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <ScrollFollow speed={6} className="w-auto">
                  <Badge className="w-fit font-mono text-xs border border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10">
                    {edu.field}
                  </Badge>
                </ScrollFollow>
              </div>

              {/* Description with Skiper31 Line-by-Line Animation */}
              <ScrollText
                as="p"
                offset={["start 0.9", "start 0.45"]}
                className="w-full text-sm sm:text-base text-zinc-400 leading-relaxed font-normal"
              >
                {edu.description}
              </ScrollText>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 block">
                  Core Highlights & Focus Areas
                </span>
                <ul className="space-y-2.5">
                  {edu.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default EducationSection;
