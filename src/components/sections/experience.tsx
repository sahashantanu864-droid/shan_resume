"use client";

import React from "react";
import SectionWrapper from "../ui/section-wrapper";
import SectionHeader from "./section-header";
import { EXPERIENCES, UPCOMING_AREAS } from "@/data/experience";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Sparkles, Clock } from "lucide-react";
import { ScrollText } from "../ui/scroll-text";
import { ScrollFollow } from "../ui/scroll-follow";

export const ExperienceSection = () => {
  const hasEntries = EXPERIENCES.length > 0;

  return (
    <SectionWrapper id="experience">
      <SectionHeader
        id="experience"
        badge="Career & Achievements"
        title="Experience & Milestones"
        desc="Professional journey, hackathon builds, and continuous engineering contributions."
      />

      {hasEntries ? (
        <div className="space-y-6 max-w-4xl mx-auto">
          {EXPERIENCES.map((exp) => (
            <Card key={exp.id} className="border border-white/10 bg-[#08080a]/90 hover:border-white/20 transition-all backdrop-blur-md">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl text-white font-display">{exp.title}</CardTitle>
                    <p className="text-sm text-zinc-400 font-mono mt-0.5">{exp.organization}</p>
                  </div>
                  {exp.period && (
                    <Badge variant="outline" className="font-mono text-xs w-fit border-white/15 bg-white/5 text-zinc-300">
                      {exp.period}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1.5 list-disc list-inside text-sm text-zinc-400">
                  {exp.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                {exp.skills && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((s) => (
                      <Badge key={s} className="text-[11px] font-mono border-white/15 bg-white/5 text-zinc-300">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Clean Architecture Placeholder for Shantanu to expand */
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <Card className="border border-white/10 bg-[#08080a]/90 backdrop-blur-md shadow-xl">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-4 pb-5 border-b border-white/10">
                <ScrollFollow speed={-6} className="w-auto">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0 shadow-inner">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </ScrollFollow>
                <div className="w-full">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    Milestones & Current Focus
                  </h3>
                  <ScrollText
                    as="p"
                    offset={["start 0.9", "start 0.45"]}
                    className="w-full text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed"
                  >
                    Actively architecting high-performance backend systems, participating in engineering challenges, and open for full-time & internship engineering opportunities.
                  </ScrollText>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {UPCOMING_AREAS.map((area, idx) => (
                  <ScrollFollow key={idx} speed={4 + idx * 2} className="w-full block">
                    <div
                      className="p-4 rounded-xl border border-white/10 bg-[#0c0c0e]/80 hover:bg-[#111114] hover:border-white/25 transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-white font-display">
                          {area.category}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/15 shrink-0">
                          {area.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {area.note}
                      </p>
                    </div>
                  </ScrollFollow>
                ))}
              </div>

              <div className="pt-3 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-zinc-500 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Timeline architecture ready for incoming records</span>
                </span>
                <span className="text-zinc-400 font-medium">
                  Add entries anytime via src/data/experience.ts
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </SectionWrapper>
  );
};

export default ExperienceSection;
