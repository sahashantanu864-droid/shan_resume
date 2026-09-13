"use client";

import React from "react";
import SectionWrapper from "../ui/section-wrapper";
import SectionHeader from "./section-header";
import { SKILL_CATEGORIES } from "@/data/skills";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const SkillsSection = () => {
  return (
    <SectionWrapper id="skills">
      <SectionHeader
        id="skills"
        badge="Technical Expertise"
        title="Skills & Tooling"
        desc="Verified tools, technologies, and frameworks I leverage to build robust applications."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((category) => (
          <Card
            key={category.id}
            className="border-white/10 bg-[#08080a]/90 backdrop-blur-md hover:border-white/20 transition-all duration-300 shadow-xl shadow-black"
          >
            <CardHeader className="pb-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white font-display">
                  {category.title}
                </CardTitle>
                <span className="text-xs font-mono text-zinc-400 bg-[#121216] px-2.5 py-0.5 rounded-full border border-white/10">
                  {category.skills.length} Technologies
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {category.description}
              </p>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative flex flex-col p-3.5 rounded-xl border border-white/10 bg-[#0a0a0d] hover:bg-[#121216] hover:border-white/25 transition-all duration-200 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {skill.iconPath ? (
                        <div className="w-8 h-8 rounded-lg bg-[#141418] border border-white/10 p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-zinc-200">
                          <span
                            role="img"
                            aria-label={skill.label}
                            className="block w-full h-full bg-current"
                            style={{
                              WebkitMaskImage: `url(${skill.iconPath})`,
                              maskImage: `url(${skill.iconPath})`,
                              WebkitMaskRepeat: "no-repeat",
                              maskRepeat: "no-repeat",
                              WebkitMaskPosition: "center",
                              maskPosition: "center",
                              WebkitMaskSize: "contain",
                              maskSize: "contain",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-[#141418] border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-white shrink-0">
                          {skill.label.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-zinc-200 font-sans block truncate group-hover:text-white transition-colors">
                          {skill.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
